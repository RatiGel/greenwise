import { lang } from "next/root-params"
import { notFound } from "next/navigation"

import { isLocale, type Locale } from "@/lib/i18n/config"
import { dictionaries, getDictionaryFor } from "@/lib/i18n/get-dictionary"
import type { Dictionary } from "@/content/dictionaries/ka"

/**
 * SERVER-ONLY MODULE. It depends on `next/root-params`, so nothing reachable
 * from a Client Component may import from here. Client-reachable code imports
 * `getDictionaryFor` from `@/lib/i18n/get-dictionary` instead.
 *
 * (The client directive is spelled out in prose rather than quoted, so that an
 * audit grep for that literal string does not flag this server-only module.)
 */

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

/** Re-exported for server-side convenience. */
export { getDictionaryFor }

export type { Dictionary }
