# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Bilingual (Georgian default, English secondary) marketing site for GREENWISE, an environmental consulting firm. Next.js 16 App Router + React 19 + TypeScript, Tailwind CSS v4, shadcn/ui (radix). No backend: the contact form hands off to WhatsApp via a `wa.me` link (`src/lib/whatsapp.ts`). `PRODUCT.md` (audience, tone) and `DESIGN.md` (colors, type, layout rules) are the source of truth for copy and visual decisions; `plan.md` is the roadmap (MongoDB/Mongoose, admin, AI assistant).

## Commands

```bash
npm run dev            # dev server (Turbopack) on :3000
npm run build          # production build
npm run lint           # ESLint (flat config)
npx tsc --noEmit -p .  # typecheck — there is no test suite; this + lint is the check
npm run verify:i18n    # route/locale smoke test; needs a server running (BASE=http://localhost:3000 by default)
```

`verify:i18n` (`scripts/verify-i18n.mjs`) hardcodes the route list. Adding or removing a page means updating it.

If the dev server throws `No link element found for chunk …css` after editing `globals.css` or deleting routes, it is stale Turbopack state: stop the server, `rm -rf .next`, restart, hard-reload the browser.

## i18n architecture

- All pages live under `src/app/[lang]/`. `src/proxy.ts` (Next 16's replacement for middleware) rewrites bare paths to `/ka/*` and 301-redirects explicit `/ka/*` to the bare path. So Georgian URLs are unprefixed (`/about`), English is `/en/about`.
- Always build internal links with `localizedPath(path, locale)` from `src/lib/i18n/config.ts`, never by string concatenation.
- **Server vs client split matters:**
  - Server Components: `getLocale()` / `getDictionary()` from `@/lib/i18n/dictionaries`. This uses `next/root-params` and is server-only. Never import it from anything a Client Component can reach.
  - Client Components: `useDictionary()` / `useLocale()` from `@/lib/i18n/locale-context` (provided by `[lang]/layout.tsx`), or `getDictionaryFor(locale)` from `@/lib/i18n/get-dictionary` (must import nothing from `next/*`).
- UI strings live in `src/content/dictionaries/{ka,en}.ts`. `ka.ts` defines the `Dictionary` type and `en.ts` is typed against it, so adding a key to one without the other fails the typecheck. When removing UI, remove the now-unused keys from both.
- Structured content (services, team, clients, methodology steps, stats) lives in `src/content/*.ts` as `Localized<T>` (`{ ka, en }`) objects whose shapes are defined in `src/types/content.ts`. Those types are the contract the planned Mongoose models must match, so keep copy out of JSX and keep the types in sync when adding or removing fields.
- `sitemap.ts` and per-page `generateMetadata` (canonical + hreflang via `localizedPath`) must list every route.

## UI conventions

- Shared building blocks: `src/components/layout/section.tsx` (`SectionHeading`, `SectionLabel`, `Section`), and `src/components/sections/*` for page sections composed by the route pages.
- `Reveal` (`src/components/ui/reveal.tsx`) owns its node's `transform`/`opacity` for the scroll-in animation and exposes `data-visible`. Put hover lifts and other transforms on an **inner** element, never on the `Reveal` node itself. Child animations can key off it with Tailwind's `in-data-[visible=true]:` variant.
- Design tokens and custom utilities (`heading-xl`, `heading-lg`, `band-dark`, `band-light`, `label-stack`, `prose-measure`, scrims, `marquee`) are defined in `src/app/globals.css` via Tailwind v4 `@theme` / `@utility`. Use the tokens (`teal-900`, `green-500`, `green-600` for green on light paper, `paper`, `on-light`, `line-light`, …), not raw colors.
- Fonts: Georgian text uses BPG Nino Mtavruli (`src/fonts/`) / Noto Sans Georgian. `font-display` (Manrope) is for Latin numerals only, because it has no Georgian glyphs. Georgian has no uppercase, so never rely on `uppercase` for emphasis.
- Respect `prefers-reduced-motion` for any new animation (see the existing `motion-safe:` / `motion-reduce:` usage and the reduced-motion blocks in `globals.css`).

## Placeholder data

Phone/email/address/WhatsApp in `src/config/site.ts`, team members, client names and statistics are placeholders. Don't present them as real facts in new copy.
