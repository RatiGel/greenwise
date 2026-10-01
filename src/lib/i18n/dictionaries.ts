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
