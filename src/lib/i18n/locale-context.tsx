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
