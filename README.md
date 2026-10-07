# GREENWISE

Website for an environmental consulting company specializing in biodiversity
assessment, tree inventory and cadastre, dendrology, and forest restoration.

Bilingual: **Georgian (ka)** at bare paths (default), **English (en)** under `/en`.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (radix base)
- BPG Nino Mtavruli (self-hosted) and Noto Sans Georgian via `next/font`
- Contact form hands off to WhatsApp via a `wa.me` deep link (no backend)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run verify:i18n` | Locale routing smoke test (needs a running server) |

## Environment variables

See `.env.example`. Both are public (`NEXT_PUBLIC_*`) — no secrets yet.

- `NEXT_PUBLIC_SITE_URL` — canonical URL, used for sitemap and Open Graph
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — digits only, no `+` or separators

## Project structure

```
src/
  app/[lang]/   routes (App Router), one tree for both locales
  app/          sitemap, robots, global styles
  components/
    layout/     header, footer, logo, section primitives
    sections/   page sections (hero, service cards, contact form, …)
    ui/         shadcn components + Reveal scroll animation
  config/       site metadata, navigation
  content/      localized content as typed files, plus UI dictionaries
  lib/i18n/     locale config, dictionary loading
  proxy.ts      bare-path → /ka rewrite, /ka/* → bare-path redirect
  lib/          WhatsApp link builder, utils
  types/        content contract shared with the future DB layer
```

## Content

All copy lives in `src/content/*.ts` as typed data, not in JSX. The shapes in
`src/types/content.ts` are the contract that the planned Mongoose models must
match, so moving content into MongoDB is an import swap rather than a UI
rewrite. See `plan.md`.

## Placeholder data

The following are **placeholders and must be replaced before launch**:

- `src/config/site.ts` — phone, email, address, WhatsApp number, map URL
- `src/content/team.ts` and `public/team/*.svg` — names, bios, credentials, photos
- `src/content/clients.ts` — partner names (shown in the home page partner strip)
- `src/content/about.ts` — statistics

Do not publish the invented client names or statistics as fact.

## Roadmap

`plan.md` covers the remaining phases: MongoDB + Mongoose, admin auth, an
admin-only AI content assistant, and launch hardening.
