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
