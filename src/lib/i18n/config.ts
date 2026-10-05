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
