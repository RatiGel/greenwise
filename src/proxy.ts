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
