/**
 * Client-safe dictionary lookup.
 *
 * This module is reachable from Client Components (via `src/config/nav.ts` and
 * `src/lib/whatsapp.ts`), so it must import NOTHING from `next/*`. The
 * server-only `getLocale()`/`getDictionary()` live in `./dictionaries`, which
 * depends on `next/root-params` and therefore cannot be in the client bundle.
 */
import type { Locale } from "@/lib/i18n/config"
import { ka, type Dictionary } from "@/content/dictionaries/ka"
import { en } from "@/content/dictionaries/en"

export const dictionaries: Record<Locale, Dictionary> = { ka, en }

/** Synchronous lookup. Safe anywhere, including Client Components. */
export function getDictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
