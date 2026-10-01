# Bilingual KA/EN Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the GREENWISE site in Georgian (default, at bare paths) and English (at `/en/*`), without moving any existing Georgian URL.

**Architecture:** All routes move under `src/app/[lang]/`. A `src/proxy.ts` rewrite maps bare paths to `[lang]=ka` so Georgian URLs stay unchanged in the address bar, and `/ka/*` 301s to the bare path so each page has one canonical URL. Text content becomes `Localized<T>` (per-field `{ka, en}` objects) on a single record per entity; UI chrome strings live in typed dictionaries. Server Components read the locale via `next/root-params`; the four `"use client"` components read it from a `LocaleProvider` context.

**Tech Stack:** Next.js 16.3.5 (App Router, Turbopack), React 19.2.8, TypeScript 5, Tailwind 4, shadcn/radix components.

**Spec:** `docs/superpowers/specs/2026-10-01-bilingual-ka-en-design.md`

## Global Constraints

- **Locales:** exactly two — `ka` (default) and `en`. Type: `export type Locale = "ka" | "en"`.
- **Georgian URLs must not move.** `/services` stays `/services`. Any task that changes a Georgian URL is wrong.
- **English URLs are prefixed:** `/en/services`.
- **`/ka/*` 301-redirects to the bare path.** One canonical URL per page.
- **`next/root-params` is Server-Component-only.** It throws in Client Components, Server Actions and Route Handlers. The four `"use client"` components (`header.tsx`, `contact-form.tsx`, and any client child needing locale) MUST use the context from Task 5, never `root-params`.
- **File convention is `proxy.ts`, not `middleware.ts`.** `middleware` is deprecated in Next.js 16. Named export is `proxy`. File goes at `src/proxy.ts` (same level as `src/app`).
- **No test runner is installed.** `package.json` scripts are `dev`, `build`, `start`, `lint` only. Do NOT add Jest/Vitest. Verification is: `npm run build` (must be clean), `npx tsc --noEmit`, `npm run lint`, and the HTTP/grep script from Task 1 run against `npm run dev`.
- **Both locales stay statically rendered.** The site currently builds 16 static pages; after this work it builds both trees statically. No route may become dynamic.
- **Non-text fields are never localized:** `slug`, `icon`, `order`, `published`, `id`, `step`, `year`, `value`, `sector`, `photo`, `file`, `website`, `logo` stay single-valued.
- **Regulated terms** (გზშ → EIA, საკომპენსაციო ღირებულება → compensatory value, წითელი ნუსხა → Red List) are drafted but flagged in the Task 12 handoff for owner sign-off. Do not present them as final.
- **Commit after every task.** Co-author trailer: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

---

## File Structure

**Created:**
- `src/proxy.ts` — bare-path rewrite + `/ka/*` redirect. Routing only.
- `src/lib/i18n/config.ts` — `Locale`, `locales`, `defaultLocale`, `isLocale`, `localizedPath`. No React, no server imports; safe for client and server.
- `src/lib/i18n/dictionaries.ts` — `getDictionary()` via `root-params`. Server-only.
- `src/lib/i18n/locale-context.tsx` — `LocaleProvider`, `useLocale`, `useDictionary`. Client-only.
- `src/content/dictionaries/ka.ts` — Georgian UI chrome strings.
- `src/content/dictionaries/en.ts` — English UI chrome strings, typed against `ka`.
- `src/components/layout/language-switcher.tsx` — the switcher control.
- `scripts/verify-i18n.mjs` — HTTP + Georgian-leak verification.

**Moved:** every file in `src/app/` except `robots.ts`, `sitemap.ts`, `favicon.ico`, `globals.css` moves into `src/app/[lang]/`.

**Modified:** `src/types/content.ts`, all 5 `src/content/*.ts`, `src/config/site.ts`, `src/config/nav.ts`, `src/lib/whatsapp.ts`, `src/app/sitemap.ts`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/components/sections/*.tsx`.

---

### Task 1: Verification script and baseline

Build the check first so every later task can prove it did not break Georgian.

**Files:**
- Create: `scripts/verify-i18n.mjs`
- Modify: `package.json` (scripts block)

**Interfaces:**
- Consumes: nothing.
- Produces: `npm run verify:i18n` — exits 0 on success, non-zero with a report on failure. Every later task runs this.

- [ ] **Step 1: Write the verification script**

```js
// scripts/verify-i18n.mjs
// Verifies bilingual routing against a running dev/start server.
// Usage: BASE=http://localhost:3000 node scripts/verify-i18n.mjs
const BASE = process.env.BASE ?? "http://localhost:3000"

const KA_PATHS = [
  "/", "/about", "/services", "/clients", "/methodology", "/contact",
  "/services/biodiversity-assessment", "/services/tree-inventory",
  "/services/dendrology", "/services/forest-restoration",
  "/sitemap.xml", "/robots.txt",
]

const GEORGIAN = /[Ⴀ-ჿ]/

const failures = []
const ok = (m) => console.log(`  ok   ${m}`)
const bad = (m) => { failures.push(m); console.log(`  FAIL ${m}`) }

async function head(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" })
  return res
}

console.log("Georgian routes keep their existing URLs:")
for (const p of KA_PATHS) {
  const res = await head(p)
  res.status === 200 ? ok(`${p} → 200`) : bad(`${p} → ${res.status}, expected 200`)
}

console.log("\nEnglish routes are served under /en:")
for (const p of KA_PATHS.filter((p) => !p.endsWith(".xml") && !p.endsWith(".txt"))) {
  const enPath = p === "/" ? "/en" : `/en${p}`
  const res = await head(enPath)
  res.status === 200 ? ok(`${enPath} → 200`) : bad(`${enPath} → ${res.status}, expected 200`)
}

console.log("\n/ka/* redirects to the bare path:")
for (const p of ["/ka", "/ka/services", "/ka/contact"]) {
  const res = await head(p)
  const loc = res.headers.get("location")
  const want = p === "/ka" ? "/" : p.replace(/^\/ka/, "")
  if (res.status === 301 && loc && new URL(loc, BASE).pathname === want) {
    ok(`${p} → 301 → ${want}`)
  } else {
    bad(`${p} → ${res.status} ${loc ?? "(no location)"}, expected 301 → ${want}`)
  }
}

console.log("\nEnglish pages contain no Georgian text:")
for (const p of ["/en", "/en/about", "/en/services", "/en/contact",
                 "/en/methodology", "/en/clients",
                 "/en/services/tree-inventory"]) {
  const res = await fetch(`${BASE}${p}`)
  const html = await res.text()
  // Strip the <head> JSON-LD/meta and the hidden Next.js flight payload, which
  // legitimately carry the other locale's strings.
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "")
  const hit = body.match(GEORGIAN)
  hit ? bad(`${p} renders Georgian text: ${JSON.stringify(body.slice(Math.max(0, body.indexOf(hit[0]) - 40), body.indexOf(hit[0]) + 40))}`)
      : ok(`${p} is Georgian-free`)
}

console.log("\nhtml lang attribute matches the locale:")
for (const [p, want] of [["/", "ka"], ["/en", "en"]]) {
  const html = await (await fetch(`${BASE}${p}`)).text()
  const m = html.match(/<html[^>]*\slang="([^"]+)"/)
  m && m[1] === want ? ok(`${p} → lang="${want}"`)
                     : bad(`${p} → lang="${m?.[1] ?? "missing"}", expected "${want}"`)
}

console.log(
  failures.length === 0
    ? "\nAll i18n checks passed."
    : `\n${failures.length} check(s) failed.`
)
process.exit(failures.length === 0 ? 0 : 1)
```

- [ ] **Step 2: Add the script to package.json**

In the `"scripts"` block, after `"lint": "eslint"`, add:

```json
    "verify:i18n": "node scripts/verify-i18n.mjs"
```

- [ ] **Step 3: Run it against the current site to confirm it fails correctly**

```bash
npm run dev &
sleep 5
npm run verify:i18n
```

Expected: Georgian routes PASS (they already work), every `/en/*` check FAILs with 404, `/ka/*` redirect checks FAIL, `lang` check FAILs for `/en`. This is the correct starting state — it proves the script detects the work that is not done yet.

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-i18n.mjs package.json
git commit -m "test: add bilingual routing verification script

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Locale primitives

**Files:**
- Create: `src/lib/i18n/config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Locale = "ka" | "en"`
  - `const locales: readonly Locale[]`
  - `const defaultLocale: Locale` (= `"ka"`)
  - `function isLocale(value: string): value is Locale`
  - `function localizedPath(path: string, locale: Locale): string`
  - `function stripLocale(pathname: string): string`

This file must import nothing from `next/*` so both client and server can use it.

- [ ] **Step 1: Write the module**

```ts
// src/lib/i18n/config.ts

/** Supported locales. Georgian is the default and lives at bare paths. */
export type Locale = "ka" | "en"

export const locales = ["ka", "en"] as const satisfies readonly Locale[]

export const defaultLocale: Locale = "ka"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * Maps a locale-free path to its public URL for `locale`.
 *
 * Georgian is served from bare paths, so it is returned unchanged; English is
 * prefixed. `localizedPath("/services", "en")` → `"/en/services"`.
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`
}

/**
 * Inverse of `localizedPath` — removes a leading locale segment if present.
 * `stripLocale("/en/services")` → `"/services"`, `stripLocale("/en")` → `"/"`.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/"
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
  }
  return pathname
}
```

- [ ] **Step 2: Verify it typechecks**

```bash
npx tsc --noEmit
```

Expected: PASS, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/config.ts
git commit -m "feat: add locale primitives and path helpers

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Localized content types

**Files:**
- Modify: `src/types/content.ts`

**Interfaces:**
- Consumes: `Locale` from `src/lib/i18n/config.ts`.
- Produces: `type Localized<T> = Record<Locale, T>`, plus every content interface with text fields wrapped. Tasks 4 and 7–11 read these.

This task intentionally breaks the build — the content files still hold bare strings. Task 4 repairs it. Do not try to fix the content files here.

- [ ] **Step 1: Add the wrapper and update every interface**

At the top of `src/types/content.ts`, after the existing doc comment:

```ts
import type { Locale } from "@/lib/i18n/config"

/**
 * A value that exists once per locale.
 *
 * Only text is localized. Identity and ordering fields (`slug`, `id`, `order`,
 * `icon`, `published`) stay single-valued so the two languages cannot drift
 * apart, and so the Phase 2 Mongoose models stay a direct mirror of these types.
 */
export type Localized<T> = Record<Locale, T>
```

Then change exactly these fields:

```ts
export interface Service {
  slug: ServiceSlug
  title: Localized<string>
  shortDescription: Localized<string>
  description: Localized<string>
  covers: Localized<string[]>
  whyNeeded: Localized<string[]>
  icon: "leaf" | "trees" | "microscope" | "sprout"
  audience: Localized<string[]>
  order: number
  published: boolean
}

export interface TeamMember {
  id: string
  name: Localized<string>
  role: Localized<string>
  bio: Localized<string>
  photo: string
  credentials?: Localized<string[]>
  order: number
  published: boolean
}

export interface Client {
  id: string
  name: Localized<string>
  sector: ClientSector
  logo?: string
  website?: string
  order: number
}

export interface Certification {
  id: string
  title: Localized<string>
  issuer: Localized<string>
  year: number
  file?: string
}

export interface MethodologyStep {
  id: string
  step: number
  title: Localized<string>
  description: Localized<string>
  deliverable: Localized<string>
  duration: Localized<string>
  order: number
}

export interface Milestone {
  year: string
  title: Localized<string>
  description: Localized<string>
}

export interface SectorLabel {
  value: ClientSector
  label: Localized<string>
}
```

Leave `ServiceSlug` and `ClientSector` unchanged.

- [ ] **Step 2: Confirm the expected breakage**

```bash
npx tsc --noEmit
```

Expected: FAIL, many errors of the form `Type 'string' is not assignable to type 'Localized<string>'` pointing into `src/content/*.ts`. This confirms the types now demand both locales. Task 4 fixes them.

- [ ] **Step 3: Commit**

```bash
git add src/types/content.ts
git commit -m "feat: wrap localized content fields in Localized<T>

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Translate content files

**Files:**
- Modify: `src/content/services.ts`, `src/content/about.ts`, `src/content/clients.ts`, `src/content/methodology.ts`, `src/content/team.ts`

**Interfaces:**
- Consumes: `Localized<T>` and the interfaces from Task 3.
- Produces: content records carrying both locales. Getter signatures are unchanged: `getServices(): Service[]`, `getServiceBySlug(slug: string): Service | undefined`, `getClients(): Client[]`, `getClientsBySector(sector: ClientSector): Client[]`, `getMethodologySteps(): MethodologyStep[]`, `getTeam(): TeamMember[]`. They still return whole records; the UI picks the locale at render time.

- [ ] **Step 1: Convert every text field to `{ ka, en }`**

Keep the existing Georgian string verbatim as `ka`, and add the English draft as `en`. Pattern:

```ts
// before
title: "ბიომრავალფეროვნების შეფასება",

// after
title: {
  ka: "ბიომრავალფეროვნების შეფასება",
  en: "Biodiversity Assessment",
},
```

Array fields wrap the whole array, not each item:

```ts
covers: {
  ka: [
    "საველე კვლევა ფლორისა და ფაუნის აღრიცხვით",
    "დაცული და წითელი ნუსხის სახეობების იდენტიფიკაცია",
  ],
  en: [
    "Field survey recording flora and fauna",
    "Identification of protected and Red List species",
  ],
},
```

English register: professional environmental-consulting English aimed at donors, banks and international partners. Keep sentence counts close to the Georgian so the layouts do not break.

Fixed renderings for the four service titles:
- `biodiversity-assessment` → "Biodiversity Assessment"
- `tree-inventory` → "Tree Inventory and Cadastre"
- `dendrology` → "Dendrology"
- `forest-restoration` → "Forest Restoration"

Client names in `clients.ts` that are already Latin ("Archi Group", "WWF Caucasus", "CENN") use the same string for both locales. Georgian institution names get real English equivalents — "თბილისის მერია" → "Tbilisi City Hall", "ბათუმის მუნიციპალიტეტი" → "Batumi Municipality", "ქუთაისის მუნიციპალიტეტი" → "Kutaisi Municipality", "რუსთავის მუნიციპალიტეტი" → "Rustavi Municipality".

`stats` in `about.ts` keeps its `value` strings (`"13+"`, `"240+"`, `"60 000+"`, `"40+"`) single and localizes only `label`. Note `"60 000+"` uses a space separator; keep it as-is for `ka` and use `"60,000+"` for `en`.

Regulated terms — draft these and flag them in the Task 12 report:
- `გზშ` → "EIA (Environmental Impact Assessment)"
- `საკომპენსაციო ღირებულება` → "compensatory value"
- `წითელი ნუსხა` → "Red List"

- [ ] **Step 2: Verify types are satisfied**

```bash
npx tsc --noEmit
```

Expected: the `src/content/*.ts` errors from Task 3 are gone. Errors remaining in `src/components/*` and `src/app/*` are expected — those consume the content and are fixed in Tasks 7–11.

- [ ] **Step 3: Commit**

```bash
git add src/content/
git commit -m "feat: add English translations to content files

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Dictionaries and locale context

**Files:**
- Create: `src/content/dictionaries/ka.ts`, `src/content/dictionaries/en.ts`
- Create: `src/lib/i18n/dictionaries.ts`
- Create: `src/lib/i18n/locale-context.tsx`

**Interfaces:**
- Consumes: `Locale`, `isLocale` from Task 2.
- Produces:
  - `type Dictionary` (shape of `ka.ts`)
  - `getDictionary(): Promise<Dictionary>` — **Server Components only**
  - `getDictionaryFor(locale: Locale): Dictionary` — synchronous, any environment
  - `<LocaleProvider locale dictionary>` — client
  - `useLocale(): Locale`, `useDictionary(): Dictionary` — client hooks

- [ ] **Step 1: Write the Georgian dictionary**

```ts
// src/content/dictionaries/ka.ts

/** UI chrome strings. Page content lives in `src/content/*.ts`. */
export const ka = {
  nav: {
    home: "მთავარი",
    about: "ჩვენ შესახებ",
    services: "სერვისები",
    clients: "კლიენტები",
    methodology: "მეთოდოლოგია",
    contact: "კონტაქტი",
    mainNavLabel: "მთავარი ნავიგაცია",
    openMenu: "მენიუს გახსნა",
  },
  language: {
    switchLabel: "ენის შეცვლა",
    ka: "ქართული",
    en: "English",
  },
  cta: {
    consult: "კონსულტაცია",
    allServices: "ყველა სერვისი",
    learnMore: "დაწვრილებით",
    contactUs: "დაგვიკავშირდით",
    writeWhatsApp: "მოგვწერეთ WhatsApp-ზე",
  },
  form: {
    name: "სახელი",
    company: "კომპანია",
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    projectType: "პროექტის ტიპი",
    message: "შეტყობინება",
    submit: "გაგზავნა",
    required: "სავალდებულო ველი",
    invalidEmail: "არასწორი ელ-ფოსტა",
    invalidPhone: "არასწორი ტელეფონის ნომერი",
    successTitle: "მოთხოვნა გაიგზავნა",
    successBody: "მალე დაგიკავშირდებით.",
  },
  whatsapp: {
    enquiryHeading: "ახალი მოთხოვნა — greenwise.ge",
    name: "სახელი",
    company: "კომპანია",
    phone: "ტელეფონი",
    email: "ელ-ფოსტა",
    projectType: "პროექტის ტიპი",
    messageLabel: "შეტყობინება",
    quickMessage:
      "გამარჯობა! მაინტერესებს კონსულტაცია გარემოსდაცვით მომსახურებაზე.",
  },
  sections: {
    servicesHeading: "სერვისები",
    whatItCovers: "რას მოიცავს",
    whyNeeded: "რატომ გჭირდებათ",
    audience: "ვისთვის არის",
    deliverable: "შედეგი",
    duration: "ხანგრძლივობა",
  },
  footer: {
    rights: "ყველა უფლება დაცულია",
    workingHours: "სამუშაო საათები",
    address: "მისამართი",
  },
  error: {
    notFoundTitle: "გვერდი ვერ მოიძებნა",
    notFoundBody: "მოთხოვნილი გვერდი არ არსებობს ან გადატანილია.",
    genericTitle: "რაღაც შეცდომა მოხდა",
    genericBody: "გთხოვთ, სცადოთ ხელახლა.",
    backHome: "მთავარ გვერდზე დაბრუნება",
    retry: "ხელახლა ცდა",
  },
} as const

export type Dictionary = typeof ka
```

Before writing final values, grep the components for the chrome strings they currently hardcode and make sure every one has a key here. Add keys as needed — this list must cover what Tasks 7–11 replace.

- [ ] **Step 2: Write the English dictionary, typed against Georgian**

```ts
// src/content/dictionaries/en.ts
import type { Dictionary } from "./ka"

/** Typed as `Dictionary`, so a missing key fails the build. */
export const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    clients: "Clients",
    methodology: "Methodology",
    contact: "Contact",
    mainNavLabel: "Main navigation",
    openMenu: "Open menu",
  },
  language: { switchLabel: "Change language", ka: "ქართული", en: "English" },
  cta: {
    consult: "Get a consultation",
    allServices: "All services",
    learnMore: "Learn more",
    contactUs: "Contact us",
    writeWhatsApp: "Message us on WhatsApp",
  },
  form: {
    name: "Name",
    company: "Company",
    phone: "Phone",
    email: "Email",
    projectType: "Project type",
    message: "Message",
    submit: "Send",
    required: "This field is required",
    invalidEmail: "Invalid email address",
    invalidPhone: "Invalid phone number",
    successTitle: "Enquiry sent",
    successBody: "We will get back to you shortly.",
  },
  whatsapp: {
    enquiryHeading: "New enquiry — greenwise.ge",
    name: "Name",
    company: "Company",
    phone: "Phone",
    email: "Email",
    projectType: "Project type",
    messageLabel: "Message",
    quickMessage:
      "Hello! I would like a consultation on environmental services.",
  },
  sections: {
    servicesHeading: "Services",
    whatItCovers: "What it covers",
    whyNeeded: "Why you need it",
    audience: "Who it is for",
    deliverable: "Deliverable",
    duration: "Duration",
  },
  footer: {
    rights: "All rights reserved",
    workingHours: "Working hours",
    address: "Address",
  },
  error: {
    notFoundTitle: "Page not found",
    notFoundBody: "The page you requested does not exist or has moved.",
    genericTitle: "Something went wrong",
    genericBody: "Please try again.",
    backHome: "Back to home",
    retry: "Try again",
  },
}
```

Note `language.ka` stays "ქართული" in both dictionaries — a language switcher names each language in its own language.

- [ ] **Step 3: Write the server-side accessor**

```ts
// src/lib/i18n/dictionaries.ts
import { lang } from "next/root-params"
import { notFound } from "next/navigation"

import { isLocale, type Locale } from "@/lib/i18n/config"
import { ka, type Dictionary } from "@/content/dictionaries/ka"
import { en } from "@/content/dictionaries/en"

const dictionaries: Record<Locale, Dictionary> = { ka, en }

/** Synchronous lookup. Safe anywhere, including Client Components. */
export function getDictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale]
}

/**
 * Reads the active locale from the route.
 *
 * Server Components only — `next/root-params` throws in Client Components,
 * Server Actions and Route Handlers. Client code uses `useDictionary()`.
 */
export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang()
  if (!locale || !isLocale(locale)) notFound()
  return dictionaries[locale]
}

/** The active locale, for Server Components. */
export async function getLocale(): Promise<Locale> {
  const locale = await lang()
  if (!locale || !isLocale(locale)) notFound()
  return locale
}

export type { Dictionary }
```

- [ ] **Step 4: Write the client context**

```tsx
// src/lib/i18n/locale-context.tsx
"use client"

import * as React from "react"

import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/content/dictionaries/ka"

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

/**
 * Carries the locale into Client Components.
 *
 * `next/root-params` is server-only, so client code cannot read the route
 * locale directly; the root layout resolves it and passes it down here.
 */
export function LocaleProvider({
  locale,
  dictionary,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  const value = React.useMemo(
    () => ({ locale, dictionary }),
    [locale, dictionary]
  )
  return <LocaleContext value={value}>{children}</LocaleContext>
}

function useLocaleContext(): LocaleContextValue {
  const ctx = React.use(LocaleContext)
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>")
  }
  return ctx
}

export function useLocale(): Locale {
  return useLocaleContext().locale
}

export function useDictionary(): Dictionary {
  return useLocaleContext().dictionary
}
```

- [ ] **Step 5: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no new errors from these four files. `next/root-params` types are generated during `next dev`/`next build`; if the import is unresolved, run `npx next typegen` first. Errors still present in `src/app/*` and `src/components/*` are expected until Tasks 6–11.

- [ ] **Step 6: Commit**

```bash
git add src/content/dictionaries/ src/lib/i18n/
git commit -m "feat: add UI dictionaries and locale context

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Route restructure and proxy

**Files:**
- Create: `src/app/[lang]/layout.tsx` (from the existing root layout)
- Create: `src/proxy.ts`
- Move: `src/app/{page.tsx,error.tsx,not-found.tsx,opengraph-image.tsx,about,clients,contact,methodology,services}` → `src/app/[lang]/`
- Delete: `src/app/layout.tsx` (after moving its contents)
- Keep in place: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/favicon.ico`, `src/app/globals.css`

`sitemap.ts` and `robots.ts` stay at the app root so they serve from `/sitemap.xml` and `/robots.txt`, not `/ka/sitemap.xml`.

**Interfaces:**
- Consumes: `getDictionary`, `getLocale` (Task 5), `LocaleProvider` (Task 5), `locales` (Task 2).
- Produces: `[lang]` as a root param, so `next/root-params` exports `lang`. All later tasks depend on this.

- [ ] **Step 1: Move the route files**

```bash
mkdir -p src/app/\[lang\]
git mv src/app/page.tsx src/app/error.tsx src/app/not-found.tsx \
       src/app/opengraph-image.tsx src/app/\[lang\]/
git mv src/app/about src/app/clients src/app/contact \
       src/app/methodology src/app/services src/app/\[lang\]/
git mv src/app/layout.tsx src/app/\[lang\]/layout.tsx
```

- [ ] **Step 2: Rewrite the layout for the locale segment**

In `src/app/[lang]/layout.tsx`, keep the existing font setup and imports. Change the component and add `generateStaticParams`:

```tsx
import { locales } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { LocaleProvider } from "@/lib/i18n/locale-context"

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale()
  const dictionary = await getDictionary()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${notoSansGeorgian.variable} ${manrope.variable} antialiased`}
      >
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  )
}
```

Keep the existing `body` className exactly as it is in the current file — copy it across rather than retyping. Metadata is handled in Task 11; leave the existing `metadata` export in place for now even though it is still Georgian-only.

- [ ] **Step 3: Write the proxy**

```ts
// src/proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { defaultLocale, locales } from "@/lib/i18n/config"

/**
 * Georgian is served from bare paths, so `/services` is rewritten to
 * `/ka/services` without changing the URL the visitor sees. Explicit `/ka/*`
 * requests redirect to the bare path so each page has a single canonical URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // `/ka/services` → 301 → `/services`
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(`/${defaultLocale}`.length) || "/"
    return NextResponse.redirect(url, 301)
  }

  // Already prefixed with a non-default locale — serve as-is.
  const isPrefixed = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (isPrefixed) return NextResponse.next()

  // Bare path — rewrite to the default locale, leaving the URL untouched.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals, the metadata routes that must stay unprefixed, and
  // anything with a file extension (static assets under /public).
  matcher: ["/((?!_next|sitemap\\.xml|robots\\.txt|.*\\.[\\w]+$).*)"],
}
```

- [ ] **Step 4: Build and verify routing**

```bash
npx next typegen
npm run build
```

Expected: build succeeds. If `LayoutProps<"/[lang]">` is unresolved, `next typegen` generates it.

```bash
npm run dev &
sleep 5
npm run verify:i18n
```

Expected now passing: all Georgian 200s, all `/en/*` 200s, all `/ka/*` 301s, and `lang` correct for both. The Georgian-leak checks will still FAIL — components are not translated until Tasks 7–11. That is correct at this point.

- [ ] **Step 5: Commit**

```bash
git add -A src/app src/proxy.ts
git commit -m "feat: nest routes under [lang] with bare-path Georgian

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Localize site config and navigation

**Files:**
- Modify: `src/config/site.ts`, `src/config/nav.ts`

**Interfaces:**
- Consumes: `Localized<T>` (Task 3), `Locale` (Task 2), `getServices()` (Task 4).
- Produces: `getMainNav(locale: Locale): NavItem[]` replacing the `mainNav` constant. `NavItem.label` stays `string` — resolved at call time.

- [ ] **Step 1: Localize the config's text fields**

In `src/config/site.ts`, wrap `tagline`, `description`, `contact.address`, `contact.addressShort`, `contact.workingHours`:

```ts
  tagline: {
    ka: "გარემოსდაცვითი კონსალტინგი",
    en: "Environmental Consulting",
  },
  description: {
    ka: "ბიომრავალფეროვნების შეფასება, ხე-მცენარეთა ინვენტარიზაცია და კადასტრი, დენდროლოგია და ტყის აღდგენა — პროფესიონალური გარემოსდაცვითი კონსალტინგი დეველოპერების, მუნიციპალიტეტების, NGO-ებისა და არქიტექტორებისთვის.",
    en: "Biodiversity assessment, tree inventory and cadastre, dendrology and forest restoration — professional environmental consulting for developers, municipalities, NGOs and architects.",
  },
```

```ts
    address: {
      ka: "ვაჟა-ფშაველას გამზირი 71, თბილისი, საქართველო",
      en: "71 Vazha-Pshavela Avenue, Tbilisi, Georgia",
    },
    addressShort: { ka: "თბილისი, საქართველო", en: "Tbilisi, Georgia" },
    workingHours: {
      ka: "ორშაბათი — პარასკევი, 10:00 — 18:00",
      en: "Monday — Friday, 10:00 — 18:00",
    },
```

`name`, `nameKa`, `url`, `whatsappNumber`, `social`, `contact.phone`, `contact.phoneHref`, `contact.email`, `contact.mapEmbedUrl` stay single-valued.

The `keywords` array currently lives in `src/app/[lang]/layout.tsx`. Task 11 moves it onto `siteConfig` as a localized field; leave it where it is for now.

Remove the `locale: "ka_GE"` and `lang: "ka"` constants — they are now per-request. Add instead:

```ts
  /** OpenGraph locale per language. */
  ogLocale: { ka: "ka_GE", en: "en_US" },
```

Keep `as const` on the object.

- [ ] **Step 2: Make navigation locale-aware**

Replace the `mainNav` constant in `src/config/nav.ts`:

```ts
import { getServices } from "@/content/services"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import { getDictionaryFor } from "@/lib/i18n/dictionaries"

export interface NavItem {
  href: string
  label: string
  children?: NavItem[]
}

/** Builds the main navigation with hrefs and labels for `locale`. */
export function getMainNav(locale: Locale): NavItem[] {
  const t = getDictionaryFor(locale).nav
  const path = (p: string) => localizedPath(p, locale)

  return [
    { href: path("/"), label: t.home },
    { href: path("/about"), label: t.about },
    {
      href: path("/services"),
      label: t.services,
      children: getServices().map((service) => ({
        href: path(`/services/${service.slug}`),
        label: service.title[locale],
      })),
    },
    { href: path("/clients"), label: t.clients },
    { href: path("/methodology"), label: t.methodology },
    { href: path("/contact"), label: t.contact },
  ]
}
```

`getServices()` already filters by `published` and sorts by `order`, so the extra filter/sort in the old code is dropped.

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: errors now point only at components consuming `siteConfig.tagline`/`description`/`address` and `mainNav`. Those are Tasks 8–11.

- [ ] **Step 4: Commit**

```bash
git add src/config/
git commit -m "feat: localize site config and navigation

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Language switcher and header

**Files:**
- Create: `src/components/layout/language-switcher.tsx`
- Modify: `src/components/layout/header.tsx`

**Interfaces:**
- Consumes: `useLocale`, `useDictionary` (Task 5), `stripLocale`, `localizedPath`, `locales` (Task 2), `getMainNav` (Task 7).
- Produces: `<LanguageSwitcher />`, rendered in both the desktop bar and the mobile sheet.

- [ ] **Step 1: Write the switcher**

```tsx
// src/components/layout/language-switcher.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "cn"
import { locales, localizedPath, stripLocale } from "@/lib/i18n/config"
import { useDictionary, useLocale } from "@/lib/i18n/locale-context"

/**
 * Switches to the current page in the other language rather than to the
 * homepage, so the reader keeps their place.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useDictionary().language
  const bare = stripLocale(pathname)

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="group"
      aria-label={t.switchLabel}
    >
      {locales.map((candidate) => {
        const active = candidate === locale
        return (
          <Link
            key={candidate}
            href={localizedPath(bare, candidate)}
            hrefLang={candidate}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-md px-2 py-1 text-sm font-medium uppercase transition-colors duration-200",
              active
                ? "bg-white/12 text-green-500"
                : "text-white/70 hover:bg-white/8 hover:text-white"
            )}
          >
            {candidate}
          </Link>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Wire the header to the locale**

In `src/components/layout/header.tsx` (already `"use client"`):

Replace `import { mainNav } from "@/config/nav"` with:

```tsx
import { getMainNav } from "@/config/nav"
import { useDictionary, useLocale } from "@/lib/i18n/locale-context"
import { localizedPath } from "@/lib/i18n/config"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
```

Inside the component, above the existing `isActive`:

```tsx
  const locale = useLocale()
  const dict = useDictionary()
  const mainNav = getMainNav(locale)
  const home = localizedPath("/", locale)
```

Change `isActive` so the home check uses the localized home path, not a bare `/`:

```tsx
  const isActive = (href: string) =>
    href === home ? pathname === home : pathname.startsWith(href)
```

Replace the hardcoded `aria-label="მთავარი ნავიგაცია"` with `aria-label={dict.nav.mainNavLabel}`.

Render `<LanguageSwitcher />` in the right-hand control cluster, before the phone link, and again inside `SheetContent` for mobile. Replace any remaining hardcoded Georgian in this file (menu labels, CTA text) with `dict.*` keys.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: PASS for both files.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/language-switcher.tsx src/components/layout/header.tsx
git commit -m "feat: add language switcher and localize header

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Localize the WhatsApp deep link

**Files:**
- Modify: `src/lib/whatsapp.ts`, `src/components/sections/contact-form.tsx`

**Interfaces:**
- Consumes: `Locale` (Task 2), `getDictionaryFor` (Task 5), `siteConfig` (Task 7).
- Produces: `buildWhatsAppUrl(enquiry: WhatsAppEnquiry, locale: Locale): string`, `buildWhatsAppQuickUrl(locale: Locale, text?: string): string`. Both signatures gain a required `locale`; every caller must be updated.

- [ ] **Step 1: Take locale in both builders**

```ts
import { siteConfig } from "@/config/site"
import type { Locale } from "@/lib/i18n/config"
import { getDictionaryFor } from "@/lib/i18n/dictionaries"

export interface WhatsAppEnquiry {
  name: string
  company?: string
  phone: string
  email?: string
  projectType: string
  message: string
}

/**
 * Builds the wa.me deep link for a contact enquiry, in the visitor's language,
 * so an English visitor's enquiry does not arrive in Georgian.
 *
 * wa.me requires the number as digits only, without "+" or separators.
 */
export function buildWhatsAppUrl(
  enquiry: WhatsAppEnquiry,
  locale: Locale
): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "")
  const t = getDictionaryFor(locale).whatsapp

  const lines = [
    t.enquiryHeading,
    "",
    `${t.name}: ${enquiry.name}`,
    enquiry.company ? `${t.company}: ${enquiry.company}` : null,
    `${t.phone}: ${enquiry.phone}`,
    enquiry.email ? `${t.email}: ${enquiry.email}` : null,
    `${t.projectType}: ${enquiry.projectType}`,
    "",
    `${t.messageLabel}:`,
    enquiry.message,
  ].filter((line): line is string => line !== null)

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`
}

/** Short link used by header/footer CTAs, with no prefilled form data. */
export function buildWhatsAppQuickUrl(locale: Locale, text?: string): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "")
  const body = text ?? getDictionaryFor(locale).whatsapp.quickMessage
  return `https://wa.me/${number}?text=${encodeURIComponent(body)}`
}
```

- [ ] **Step 2: Update every caller**

```bash
grep -rn "buildWhatsAppUrl\|buildWhatsAppQuickUrl" src
```

In Client Components pass `useLocale()`; in Server Components pass `await getLocale()`. In `contact-form.tsx`, also replace the hardcoded Georgian field labels, placeholders, zod validation messages and toast text with `useDictionary()` keys (`form.*`).

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors from `whatsapp.ts` or `contact-form.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/whatsapp.ts src/components/sections/contact-form.tsx
git commit -m "feat: localize WhatsApp enquiry message

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Localize sections, footer and pages

**Files:**
- Modify: `src/components/layout/footer.tsx`, `src/components/layout/logo.tsx`, all of `src/components/sections/*.tsx`, all pages under `src/app/[lang]/`

**Interfaces:**
- Consumes: everything from Tasks 2–7.
- Produces: no remaining hardcoded Georgian outside `src/content/dictionaries/ka.ts` and the `ka` branches of `src/content/*.ts`.

- [ ] **Step 1: Find every remaining hardcoded Georgian string**

```bash
grep -rln '[ა-ჰ]' src --exclude-dir=content | sort
```

Everything listed must be fixed in this task. `src/content/` is excluded because its Georgian is data, not hardcoded UI.

- [ ] **Step 2: Replace them**

Server Components (the pages, most sections):

```tsx
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"

export default async function Page() {
  const locale = await getLocale()
  const dict = await getDictionary()
  const services = getServices()

  return <h1>{dict.sections.servicesHeading}</h1>
}
```

Content fields are indexed by locale at the point of use:

```tsx
<h2>{service.title[locale]}</h2>
<p>{service.shortDescription[locale]}</p>
<ul>
  {service.covers[locale].map((item) => <li key={item}>{item}</li>)}
</ul>
```

Client Components use the hooks instead:

```tsx
"use client"
const locale = useLocale()
const dict = useDictionary()
```

Every internal `href` must go through `localizedPath(path, locale)` so English pages link to English pages. Check `<Link href=` across all of `src/components` and `src/app`.

- [ ] **Step 3: Verify nothing Georgian is left outside content**

```bash
grep -rln '[ა-ჰ]' src --exclude-dir=content
```

Expected: no output.

- [ ] **Step 4: Build and run the full check**

```bash
npm run build && npm run dev &
sleep 5
npm run verify:i18n
```

Expected: every check passes, including the Georgian-leak checks that were failing after Task 6.

- [ ] **Step 5: Commit**

```bash
git add src/components src/app
git commit -m "feat: localize all sections, footer and pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 11: SEO metadata, sitemap and OG image

**Files:**
- Modify: `src/app/[lang]/layout.tsx`, `src/app/sitemap.ts`, `src/app/[lang]/opengraph-image.tsx`, every `page.tsx` with a `metadata` export

**Interfaces:**
- Consumes: `localizedPath`, `locales` (Task 2), `siteConfig` (Task 7), `getLocale`/`getDictionary` (Task 5).
- Produces: `hreflang` alternates on every page, both trees in the sitemap.

- [ ] **Step 1: Make the root metadata locale-aware**

Replace the static `metadata` export in `src/app/[lang]/layout.tsx` with `generateMetadata`:

```tsx
import type { Metadata } from "next"
import { defaultLocale, localizedPath } from "@/lib/i18n/config"
import { getLocale } from "@/lib/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline[locale]}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description[locale],
    keywords: siteConfig.keywords[locale],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      canonical: localizedPath("/", locale),
      languages: {
        ka: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.ogLocale[locale],
      url: localizedPath("/", locale),
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${siteConfig.tagline[locale]}`,
      description: siteConfig.description[locale],
    },
  }
}
```

This needs a localized `keywords` on `siteConfig`. Add it in the same edit — move the existing Georgian keyword array under `ka` and add English equivalents under `en`:

```ts
  keywords: {
    ka: [
      "ბიომრავალფეროვნების შეფასება",
      "ხეების ინვენტარიზაცია",
      "ხე-მცენარეთა კადასტრი",
      "დენდროლოგია",
      "ტყის აღდგენა",
      "გარემოზე ზემოქმედების შეფასება",
      "გარემოსდაცვითი კონსალტინგი",
      "ეკოლოგიური ექსპერტიზა",
    ],
    en: [
      "biodiversity assessment",
      "tree inventory",
      "tree cadastre",
      "dendrology",
      "forest restoration",
      "environmental impact assessment",
      "environmental consulting",
      "ecological expertise",
    ],
  },
```

Copy the remaining `twitter` and `robots` fields across from the current file unchanged.

- [ ] **Step 2: Give each page localized metadata and alternates**

For every `page.tsx` that exports `metadata`, convert to `generateMetadata` with alternates pointing at its own path in both locales. For `/about`:

```tsx
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dict = await getDictionary()

  return {
    title: dict.nav.about,
    alternates: {
      canonical: localizedPath("/about", locale),
      languages: { ka: "/about", en: "/en/about", "x-default": "/about" },
    },
  }
}
```

For `services/[slug]/page.tsx`, use `service.title[locale]` and `service.shortDescription[locale]`, with alternates built from the slug.

- [ ] **Step 3: Emit both trees in the sitemap**

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getServices } from "@/content/services"
import { localizedPath } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const paths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/methodology", priority: 0.7 },
    { path: "/clients", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    ...getServices().map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.85,
    })),
  ]

  return paths.flatMap(({ path, priority }) => {
    const alternates = {
      languages: {
        ka: `${siteConfig.url}${localizedPath(path, "ka")}`,
        en: `${siteConfig.url}${localizedPath(path, "en")}`,
      },
    }

    return [
      {
        url: `${siteConfig.url}${localizedPath(path, "ka")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
      {
        url: `${siteConfig.url}${localizedPath(path, "en")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        // English is secondary; keep it below the Georgian equivalent.
        priority: Math.round((priority - 0.1) * 100) / 100,
        alternates,
      },
    ]
  })
}
```

- [ ] **Step 4: Localize the OG image**

In `src/app/[lang]/opengraph-image.tsx`, read the locale with `getLocale()` and use `siteConfig.tagline[locale]`. Keep the existing layout and fonts.

- [ ] **Step 5: Verify**

```bash
npm run build
curl -s localhost:3000/sitemap.xml | head -40
```

Expected: build clean; sitemap lists both trees with `xhtml:link` alternates.

- [ ] **Step 6: Commit**

```bash
git add src/app src/config/site.ts
git commit -m "feat: localize metadata, sitemap and OG image

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 12: Full verification and translation handoff

**Files:**
- Create: `docs/superpowers/specs/2026-10-01-translation-review.md`

**Interfaces:**
- Consumes: the finished site.
- Produces: a review list for the owner.

- [ ] **Step 1: Run every check**

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run dev &
sleep 5
npm run verify:i18n
```

Expected: all four clean, `verify:i18n` exits 0.

- [ ] **Step 2: Confirm both trees are still static**

Check the `npm run build` route table: every route under both `/` and `/en` must be marked `○ (Static)` or `● (SSG)`. If any became dynamic (`ƒ`), something reads a request-time API — find and fix it before shipping.

- [ ] **Step 3: Write the translation review document**

List every regulated or judgement-call rendering for the owner, as a table of Georgian term, English rendering, and why it needs review:

```markdown
# English translation — terms needing sign-off

These renderings are drafts. They map to standard international usage, but the
Georgian permitting context does not always match one-to-one.

| Georgian | English used | Why review |
|---|---|---|
| გზშ | EIA (Environmental Impact Assessment) | Georgian statutory procedure; the scope differs from EU/IFC EIA. |
| საკომპენსაციო ღირებულება | compensatory value | Calculated under Georgian norms; not a generic "compensation". |
| წითელი ნუსხა | Red List | Georgian national Red List, not the IUCN Red List. Confirm which is meant. |
```

Add every other term flagged during Task 4.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-10-01-translation-review.md
git commit -m "docs: list English terms needing owner sign-off

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Deployment note

Do NOT deploy as part of this plan. The site is live at
`greenwise-self.vercel.app`, and the English copy is unreviewed until the owner
signs off on Task 12's document. Deployment is a separate decision, and it is
the owner's.

The outstanding placeholder WhatsApp number (`995555000000`) is also unresolved
and unrelated to this work.
