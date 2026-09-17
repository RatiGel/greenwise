# GREENWISE — Technical Implementation Plan

Environmental consulting company website.

**Stack:** Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Mongoose · NextAuth · Georgian (`ka`)

## Locked decisions

| Topic | Decision |
|---|---|
| Contact form | `wa.me` deep link only — no backend, no lead storage |
| Content source | Hardcoded typed files in Phase 1 → migrated to MongoDB in Phase 2 |
| AI integration | Admin content assistant only (internal, never public-facing) |
| Auth | Admin-only. No public signup, no client portal |

## Design tokens

```
--color-forest-900 #14301F   deep green — headings, footer
--color-forest-700 #1E5E3C   primary brand
--color-forest-500 #3A8A5F   accent, hover
--color-bark-600   #6B5B4A   earthy secondary
--color-clay-300   #C9BCA8   borders, muted
--color-sand-50    #FAF8F4   neutral page background
--color-ink-900    #1A1D1B   body text
```

Radius `0.5rem`. Container max `1200px`. Section rhythm `py-20 md:py-28`.

Typography: **Noto Sans Georgian** headings (600/700) + body (400). Georgian glyph coverage is mandatory — Inter/Geist have none.

---

## Phase 0 — Scaffold

- `create-next-app` (TS, Tailwind, App Router, ESLint, src dir)
- `shadcn init` + add: button card input textarea select form label sheet accordion separator badge dialog table sonner
- `next.config.ts`: AVIF/WebP image formats, remote patterns
- `<html lang="ka">` in root layout
- Fonts via `next/font/local`, `display: swap`, subsets `georgian` + `latin`
- `src/config/site.ts` — name, phone, email, address, WhatsApp number
- `.env.example` — `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`
- Design tokens in `globals.css` `@theme`

---

## Phase 1 — Frontend (static, all pages)

### 1.1 Layout shell
- `Header` — sticky, transparent on hero → solid on scroll, nav, CTA button, mobile `Sheet` drawer
- `Footer` — 3 columns: contacts, service links, licenses
- `Section` — reusable spacing + heading wrapper

### 1.2 Animation primitive
`components/ui/Reveal.tsx` — IntersectionObserver, `opacity-0 translate-y-4` → visible, 600ms ease-out, `once: true`, optional stagger delay. Respects `prefers-reduced-motion`. No animation library.

### 1.3 Content layer
`src/content/` → `services.ts`, `team.ts`, `clients.ts`, `methodology.ts`, `certifications.ts`.
Types in `src/types/content.ts`.

**Critical:** these types are the exact shapes the Phase 2 Mongoose models use. Get them right or Phase 2 becomes a rewrite.

### 1.4 Pages

| Route | Contents |
|---|---|
| `/` | Hero (h1, subcopy, 2 CTAs, priority image) · 4 service cards · client logo strip · methodology teaser · CTA band |
| `/about` | Mission · experience timeline · team grid (photo, role, bio) · certifications |
| `/services` | Overview + 4 anchor blocks |
| `/services/[slug]` | 4 static routes: description / რას მოიცავს / რატომ გჭირდებათ / CTA |
| `/clients` | Logo grid tabbed by sector: დეველოპერები, მუნიციპალიტეტები, NGO, არქიტექტორები |
| `/methodology` | 4-step vertical timeline with animated connector |
| `/contact` | Form + contacts + map |

### 1.5 Contact form → WhatsApp
- `react-hook-form` + `zod`, Georgian error messages
- Fields: სახელი, კომპანია, ტელეფონი, ელ-ფოსტა, პროექტის ტიპი (select), შეტყობინება
- Submit → build message template → `encodeURIComponent` → open `wa.me/<number>?text=...`
- Client-side only. Visible `tel:` / `mailto:` fallbacks below form.

### 1.6 Map
Google Maps `<iframe>`, `loading="lazy"`, aspect-ratio box. No map JS SDK — avoids bundle cost.

### 1.7 SEO
- Per-route `generateMetadata`: title, description, openGraph, canonical, `locale: ka_GE`
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- JSON-LD: `Organization` + `LocalBusiness` in layout, `Service` per service page
- Semantic HTML, one `h1` per page, correct heading hierarchy

### 1.8 Performance
- `next/image` everywhere with explicit dimensions + `sizes`; hero `priority`, rest lazy
- Images pre-resized to render size before commit
- `blurDataURL` on hero and team photos
- Targets: LCP < 2.0s, CLS < 0.05, Lighthouse ≥ 95

**Exit:** all pages complete in Georgian, responsive 360→1440px, keyboard navigable, WhatsApp handoff works, Lighthouse green. Deployable as-is.

---

## Phase 2 — Backend + Mongoose

### 2.1 Connection
`src/lib/mongodb.ts` — cached connection via `global._mongoose` to survive hot-reload and serverless invocations.

### 2.2 Models
- `Service` — slug, title, shortDesc, description, covers[], whyNeeded[], icon, order, published
- `TeamMember` — name, role, bio, photo, order, published
- `Client` — name, logo, sector, website, order
- `Certification` — title, issuer, year, file
- `MethodologyStep` — step, title, description, order
- `User` — email, passwordHash, role, createdAt
- `Lead` — dormant; only if lead capture is added later

### 2.3 Data access + migration
- `src/lib/queries/*.ts` returning the same types as Phase 1 content files
- Swap page imports `@/content/x` → `await getX()`. UI untouched.
- `scripts/seed.ts` seeds Mongo from Phase 1 content. Idempotent.
- `unstable_cache` + `revalidateTag` so public pages stay static-fast; admin writes revalidate.

### 2.4 API routes
`app/api/admin/[resource]/route.ts` — REST CRUD, zod-validated, session-guarded. Public pages read via server components directly, no API hop.

**Exit:** content in Mongo, public site renders identically, seed reproducible.

---

## Phase 3 — Auth (admin-only)

- NextAuth v5, Credentials provider, `bcryptjs`, JWT sessions
- No public signup. `scripts/create-admin.ts` creates first user
- `middleware.ts` protects `/admin/*`
- Role check inside every mutating API route — never trust middleware alone
- Rate-limit login; generic failure message (no user enumeration)
- `/admin` shell: sidebar, resource tables, edit forms reusing Phase 2 zod schemas

**Exit:** admin edits content, changes appear publicly after revalidation.

---

## Phase 4 — AI admin content assistant

Internal-only. Not exposed to public visitors — no prompt-injection surface, no public cost.

- `@anthropic-ai/sdk`, model `claude-sonnet-5`, key server-side only
- `app/api/admin/ai/route.ts` — auth-guarded, per-user rate limited, streaming
- Capabilities:
  1. Draft Georgian service copy (brief → description + covers[] + whyNeeded[])
  2. SEO meta generator (title ≤60ch, description ≤160ch, Georgian)
  3. Tone/clarity rewrite to professional consulting register
  4. Translate EN/RU → Georgian
- UI: generate button per field → draft in preview panel → admin must click Accept. AI never writes to DB directly.
- System prompt pins Georgian output, domain context, and forbids fabricating certifications, licenses, or figures.

**Exit:** admin generates, reviews, accepts. Nothing auto-published.

---

## Phase 5 — Hardening + launch

- Clean `next build`, zero TS errors, ESLint clean
- Lighthouse all categories on `/` and `/services/[slug]`
- a11y: axe pass, focus-visible rings, contrast ≥ 4.5:1, bound form labels, skip link
- Georgian 404 + error boundary pages
- Security headers in `next.config.ts`: CSP, HSTS, X-Frame-Options, Referrer-Policy
- Verify no secret leaks into `NEXT_PUBLIC_*`
- Deploy Vercel, custom domain, Search Console + sitemap, Analytics

---

## Build order rationale

Phase 1 ships a complete, sellable site with zero infrastructure. Phases 2–4 are additive; each ends deployable and none blocks the site being live.

**Critical path:** Georgian fonts (Phase 0) → content types (1.3) → Mongoose models mirroring those types (2.2).
