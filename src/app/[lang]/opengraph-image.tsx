import { ImageResponse } from "next/og"

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
          background: "#14301F",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              color: "#8FBFA1",
              display: "flex",
            }}
          >
            GREENWISE
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 68,
              lineHeight: 1.15,
              color: "#FFFFFF",
              maxWidth: 900,
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
    size
  )
}
