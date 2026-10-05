import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
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
                fontWeight: 700,
                letterSpacing: 6,
                color: "#FFFFFF",
                display: "flex",
              }}
            >
              GREENWISE
            </div>
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
            Environmental consulting, biodiversity & tree cadastre
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
