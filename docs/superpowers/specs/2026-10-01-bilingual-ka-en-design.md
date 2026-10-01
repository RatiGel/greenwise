# Bilingual site: Georgian default, English secondary

**Date:** 2026-10-01
**Status:** Approved, pending implementation plan

## Goal

Serve the GREENWISE marketing site in Georgian (default) and English (secondary),
without changing any existing Georgian URL.

Georgian is the primary audience. English exists for international donors, banks
and partner organisations who require documentation in English.

## Decisions

Three decisions were taken before design and are fixed:

1. **URL structure** — Georgian at bare paths (`/services`), English prefixed
   (`/en/services`). Existing Georgian URLs must not move.
2. **Translation** — English copy drafted during implementation, reviewed by the
   site owner before launch. Regulatory terms flagged for sign-off.
3. **Content shape** — per-field locale objects, one record per entity. Chosen so
   the Phase 2 Mongoose models in `plan.md` stay a direct mirror of the content
   types.

## Constraints discovered

Read from `node_modules/next/dist/docs/` rather than assumed, per `AGENTS.md`.

- Next.js 16 expects every route nested under `app/[lang]`. Bare-path Georgian is
  therefore a deliberate deviation from the documented default and needs a rewrite
  layer; it is not the stock recipe.
- `next/root-params` lets any **Server Component** read the locale without prop
  drilling. This avoids changing ~30 component signatures.
- `next/root-params` **cannot be used in Client Components**, Server Actions or
  Route Handlers. The header, mobile sheet and contact form are `"use client"`, so
  they need the locale through React context instead.
- Fonts already handle both scripts: Noto Sans Georgian covers Georgian + Latin;
  Manrope is display-only and Latin-only. No font work required.

## Architecture

### Routing

All routes move under `src/app/[lang]/`. A proxy **rewrite** preserves bare
Georgian paths — the URL bar keeps showing `/services` while the router resolves
`[lang]=ka`:

```
/services      → rewrite      → /ka/services   (URL unchanged)
/en/services   → passthrough  → [lang]=en
/ka/services   → 301 redirect → /services      (one canonical URL per page)
```

`generateStaticParams` returns `[{lang:'ka'},{lang:'en'}]`. Both trees stay fully
static — the site currently builds 16 static pages and must continue to.

The explicit `/ka/*` → bare redirect exists to prevent a duplicate-content split
between `/ka/services` and `/services`.

### Content types

`src/types/content.ts` gains:

```ts
export type Locale = "ka" | "en"
export type Localized<T> = Record<Locale, T>
```

Text fields become `Localized<T>`. Non-text fields stay single:

```ts
export interface Service {
  slug: ServiceSlug            // not localized — shared across locales
  icon: "leaf" | "trees" | "microscope" | "sprout"
  order: number
  published: boolean
  title: Localized<string>
  shortDescription: Localized<string>
  description: Localized<string>
  covers: Localized<string[]>
  whyNeeded: Localized<string[]>
  audience: Localized<string[]>
}
```

Same treatment for `TeamMember`, `Client`, `Certification`, `MethodologyStep`,
`Milestone`, `SectorLabel`.

Keeping `slug`, `icon`, `order` and `published` unduplicated is the point of this
shape: there is one record per entity, so the two languages cannot drift apart in
ordering or publication state.

### Dictionaries

UI chrome strings — nav labels, button text, form labels and validation messages,
404 and error copy, section headings — live in
`src/content/dictionaries/{ka,en}.ts`.

TypeScript objects, not JSON: a missing English key then fails `next build`
rather than rendering `undefined` in production.

### Locale delivery

| Consumer | Mechanism |
|---|---|
| Server Components (most of the site) | `getDictionary()` reading `next/root-params` |
| Client Components (header, mobile sheet, contact form) | `LocaleProvider` context mounted in `[lang]/layout.tsx` |

Roughly four components need the context. Everything else resolves on the server.

### Language switcher

Placed in the header, in both the desktop bar and the mobile sheet.

Switches to **the current page** in the other language (`/methodology` ⇄
`/en/methodology`), never to the homepage, so the reader keeps their place.

### SEO

- `<html lang>` follows the active locale. It is currently hardcoded to `ka`.
- `hreflang` alternates on every page, with `x-default` pointing at Georgian.
- `src/app/sitemap.ts` emits both trees with `alternates.languages`.
- Georgian keeps priority `1.0`.
- OpenGraph locale per language; `opengraph-image.tsx` reads the locale.
- `src/config/site.ts` splits its localized fields (`tagline`, `description`,
  `address`, `workingHours`) into `Localized<string>`; `url`, `whatsappNumber`
  and `social` stay single.

### WhatsApp deep link

`src/lib/whatsapp.ts` hardcodes a Georgian message body in both
`buildWhatsAppUrl` and `buildWhatsAppQuickUrl`. Both take a locale and build the
body from the dictionary, so an English visitor's enquiry arrives in English.

## Testing

- `next build` clean: zero TypeScript errors, ESLint clean.
- All 16 existing Georgian routes return 200 at their **current** URLs.
- Full English tree returns 200.
- `/ka/*` returns 301 to the bare path.
- No Georgian text renders on an English page — automated check greps built EN
  HTML for `[ა-ჰ]`.
- Language switcher round-trips every page without landing on the homepage.
- `hreflang` and canonical present and correct on both trees.

## Scope

31 files contain Georgian text and are in scope.

English copy is drafted during implementation. Terms carrying Georgian legal or
regulatory specificity are flagged for the owner's sign-off rather than silently
rendered — notably:

- გზშ → EIA (Environmental Impact Assessment)
- საკომპენსაციო ღირებულება → compensatory value
- წითელი ნუსხა → Red List

These map to standard international equivalents, but the Georgian permitting
context does not always match the international usage one-to-one. They must be
reviewed before the English site is shown to a client or donor.

## Out of scope

- Russian or any third language. The `Localized<T>` shape admits one later
  without a rewrite.
- Translating `plan.md`, `PRODUCT.md`, `DESIGN.md` or other internal docs.
- Phase 2 Mongoose models. This spec only keeps them implementable as written.
- The placeholder WhatsApp number (`995555000000`), which is a separate
  outstanding item.
