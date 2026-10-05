import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { siteConfig } from "@/config/site"
import { isLocale, locales, defaultLocale } from "@/lib/i18n/config"
import { getDictionaryFor } from "@/lib/i18n/get-dictionary"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Without this the `[lang]` segment has no known values at build time and the
 * image route is server-rendered on demand; both locales' images are static.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

/**
 * `alt` is a static export, so it cannot read the route's locale — root params
 * are unavailable in this position. It uses the English tagline, which is the
 * sensible fallback for the one field that cannot vary; the image's own
 * headline below is localized.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline.en}`

/**
 * Satori does not inherit the page's `next/font` faces — it only knows the
 * fonts handed to `ImageResponse`. Its bundled fallback is Latin-only, so
 * without this the Georgian card renders every glyph as a tofu box (U+10A0–
 * U+10FF has no coverage). This TTF covers Georgian *and* Latin, so one face
 * serves both locales' cards.
 *
 * Read once at module scope: the font does not depend on request data, and
 * re-reading per request would defeat the route's static generation.
 */
const notoSansGeorgian = await readFile(
  join(process.cwd(), "assets/NotoSansGeorgian-SemiBold.ttf")
)

/**
 * An opengraph-image is a Route Handler, where `next/root-params` is not
 * supported in this Next version, so the locale comes from `params` and the
 * dictionary from the synchronous, client-safe `getDictionaryFor`.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = getDictionaryFor(isLocale(lang) ? lang : defaultLocale)
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14432a",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <svg width="72" height="72" viewBox="0 0 64 64">
              <circle cx="10" cy="10" r="3.5" fill="#5fd17f" />
              <circle cx="32" cy="10" r="5.5" fill="#5fd17f" />
              <circle cx="54" cy="10" r="8" fill="#5fd17f" />
              <circle cx="10" cy="32" r="5.5" fill="#5fd17f" />
              <circle cx="32" cy="32" r="8" fill="#5fd17f" />
              <circle cx="54" cy="32" r="9.5" fill="#ffffff" />
              <circle cx="10" cy="54" r="8" fill="#5fd17f" />
              <circle cx="32" cy="54" r="9.5" fill="#ffffff" />
              <rect x="44" y="44" width="20" height="20" fill="#e0a663" />
            </svg>
            <div
              style={{
                fontSize: 40,
                letterSpacing: 6,
                color: "#FFFFFF",
                display: "flex",
              }}
            >
              GREENWISE
            </div>
          </div>
          {/* Sized for the longest headline, which is the Georgian one: it
              wraps to four lines where English takes three, and Georgian has
              taller ascenders. 60/1.2 keeps four lines clear of the footer. */}
          <div
            style={{
              marginTop: 36,
              fontSize: 60,
              lineHeight: 1.2,
              color: "#FFFFFF",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {dict.meta.ogImageHeadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#C9BCA8",
          }}
        >
          <div style={{ display: "flex" }}>greenwise.ge</div>
          <div style={{ display: "flex" }}>Tbilisi, Georgia</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans Georgian",
          data: notoSansGeorgian,
          weight: 600,
          style: "normal",
        },
      ],
    }
  )
}
