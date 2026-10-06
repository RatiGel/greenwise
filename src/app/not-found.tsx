import Link from "next/link"
import { Manrope, Noto_Sans_Georgian } from "next/font/google"

import { bpgNinoMtavruli } from "@/fonts/bpg-nino"
import { getDictionaryFor } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"

import "./globals.css"

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-georgian",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "sans-serif"],
})

/**
 * Root-level 404, rendered OUTSIDE `[lang]/layout.tsx`.
 *
 * Next falls through to this file (not `[lang]/not-found.tsx`) for any path
 * that does not match a single-segment locale route — e.g. `/foo`, which
 * rewrites to `/ka/foo` and matches no page. A path with no resolvable
 * locale belongs to the Georgian site by default, so this is hardcoded
 * Georgian rather than locale-aware. It has no `[lang]` segment to read, so
 * it cannot use `getDictionary()`/`getLocale()` (those need
 * `next/root-params`, which is unavailable here) — it uses the synchronous,
 * client-safe `getDictionaryFor("ka")` instead, and builds its own
 * `<html>`/`<body>` since it does not inherit the locale layout's chrome.
 */
export default function NotFound() {
  const dict = getDictionaryFor("ka")

  return (
    <html lang="ka" className={`${bpgNinoMtavruli.variable} ${notoSansGeorgian.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-teal-900">
        <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="font-heading text-sm font-medium text-green-500">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {dict.error.notFoundTitle}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
            {dict.error.notFoundBody}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">{dict.error.backHome}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">{dict.error.viewServices}</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
