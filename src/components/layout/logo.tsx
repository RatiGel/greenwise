"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "cn"
import { siteConfig } from "@/config/site"
import { localizedPath } from "@/lib/i18n/config"
import { useDictionary, useLocale } from "@/lib/i18n/locale-context"

/*
 * Interactive brand symbol, ported from Greenwise-interactive-logo.html (dark
 * theme). A 3×3 grid of cells grows toward a direction: cells further along it
 * get larger and turn white, and the leading cell becomes the amber square.
 * At rest the direction is 45° (bottom-right), which reproduces the static
 * "symbol-on-dark" artwork exactly — so the server render is the real logo.
 */
const CELLS: ReadonlyArray<readonly [number, number]> = [0, 1, 2].flatMap((y) =>
  [0, 1, 2].map((x) => [10 + x * 22, 10 + y * 22] as const)
)
const COLORS = { grow: "#5fd17f", dense: "#ffffff", earth: "#e0a663" }
const REST_ANGLE = Math.PI / 4
const EASE = 0.14
const WAVE_MS = 1600
/** Pointer distance (px) from the mark's centre within which it turns toward it. */
const REACH_PX = 160

/** Maps a cell's projection p ∈ [-1, 1] onto its radius (matches the 45° artwork). */
function radius(p: number) {
  if (p < -0.5) return 3.5 + (p + 1) * 4
  if (p < 0) return 5.5 + (p + 0.5) * 5
  return 8 + Math.min(p, 0.5) * 3 + Math.max(0, p - 0.5) * 3
}

type CellShape = { x: number; y: number; size: number; rx: number; fill: string; transform: string }

function layout(angle: number, waveStart: number | null, now: number): CellShape[] {
  const ux = Math.cos(angle)
  const uy = Math.sin(angle)
  const raw = CELLS.map(([cx, cy]) => (cx - 32) * ux + (cy - 32) * uy)
  const max = Math.max(...raw)
  const p = raw.map((v) => v / max)
  const order = p.map((v, i) => [v, i] as const).sort((a, b) => b[0] - a[0])
  const top = order[0][1]
  const gap = order[0][0] - order[1][0]

  return CELLS.map(([cx, cy], i) => {
    // q: how far this cell has morphed from circle into the leading square.
    const q = i === top ? Math.min(1, gap / 0.12) : 0
    const r = radius(p[i])
    let half = r + (10 - r) * q
    let rx = r * (1 - q)
    let rot = 0
    if (waveStart !== null) {
      const k = (now - waveStart - (p[i] + 1) * 200) / 550
      const s = k < 0 ? 0 : k < 1 ? Math.sin((k * Math.PI) / 2) * (1 + 0.2 * Math.sin(k * Math.PI)) : 1
      half *= s
      rx *= s
      if (q > 0.5 && k < 1) rot = 45 * (1 - Math.max(0, k))
    }
    half = Math.max(0, half)
    return {
      x: cx - half,
      y: cy - half,
      size: half * 2,
      rx: Math.max(0, rx),
      fill: q > 0.5 ? COLORS.earth : p[i] >= 0.45 ? COLORS.dense : COLORS.grow,
      transform: `rotate(${rot} ${cx} ${cy})`,
    }
  })
}

const REST_LAYOUT = layout(REST_ANGLE, null, 0)

/**
 * Turns toward a nearby pointer and replays its growth wave on click. Updates
 * the SVG directly from a rAF loop that stops once settled, so it never
 * re-renders React. The click wave is skipped under prefers-reduced-motion.
 */
export function LogoMark({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const cellRefs = useRef<(SVGRectElement | null)[]>([])
  const replayRef = useRef<() => void>(() => {})

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    // Following the pointer is direct manipulation, so it always runs; only
    // the decorative click wave is dropped for reduced-motion users.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let angle = REST_ANGLE
    let target = REST_ANGLE
    let waveStart: number | null = null
    let frame = 0

    const paint = (now: number) => {
      layout(angle, waveStart, now).forEach((c, i) => {
        const el = cellRefs.current[i]
        if (!el) return
        el.setAttribute("x", String(c.x))
        el.setAttribute("y", String(c.y))
        el.setAttribute("width", String(c.size))
        el.setAttribute("height", String(c.size))
        el.setAttribute("rx", String(c.rx))
        el.setAttribute("fill", c.fill)
        el.setAttribute("transform", c.transform)
      })
    }

    const tick = (now: number) => {
      const d = Math.atan2(Math.sin(target - angle), Math.cos(target - angle))
      const waving = waveStart !== null && now - waveStart < WAVE_MS
      if (Math.abs(d) > 0.002 || waving) {
        angle += d * EASE
        paint(now)
        frame = requestAnimationFrame(tick)
      } else {
        waveStart = null
        paint(now)
        frame = 0
      }
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (e: PointerEvent) => {
      const b = svg.getBoundingClientRect()
      const dx = e.clientX - (b.left + b.width / 2)
      const dy = e.clientY - (b.top + b.height / 2)
      const dist = Math.hypot(dx, dy)
      const next = dist > REACH_PX ? REST_ANGLE : dist > b.width * 0.06 ? Math.atan2(dy, dx) : target
      if (next !== target) {
        target = next
        wake()
      }
    }
    const onLeaveWindow = () => {
      target = REST_ANGLE
      wake()
    }

    replayRef.current = () => {
      if (reducedMotion.matches) return
      waveStart = performance.now()
      wake()
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeaveWindow)
    return () => {
      cancelAnimationFrame(frame)
      replayRef.current = () => {}
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 64 64"
      aria-hidden
      className={cn("overflow-visible", className)}
      onClick={() => replayRef.current()}
    >
      {REST_LAYOUT.map((c, i) => (
        <rect
          key={i}
          ref={(el) => {
            cellRefs.current[i] = el
          }}
          x={c.x}
          y={c.y}
          width={c.size}
          height={c.size}
          rx={c.rx}
          fill={c.fill}
          transform={c.transform}
        />
      ))}
    </svg>
  )
}

/**
 * Client Component, because `header.tsx` is one and renders it. A server
 * Logo imported there would be pulled into the client bundle regardless of
 * its own directive, so it reads the locale through the context hooks.
 */
export function Logo({
  className,
  showTagline = true,
  size = "md",
}: {
  className?: string
  showTagline?: boolean
  size?: "md" | "lg"
}) {
  const locale = useLocale()
  const dict = useDictionary()

  return (
    <Link
      href={localizedPath("/", locale)}
      aria-label={`${siteConfig.name} — ${dict.nav.homePageLabel}`}
      className={cn(
        "group inline-flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
    >
      <LogoMark className={cn("shrink-0", size === "lg" ? "size-12" : "size-10")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-wordmark leading-[0.85] tracking-[0.04em] text-white",
            size === "lg" ? "text-[34px]" : "text-[28px]"
          )}
        >
          <span className="font-bold">GREEN</span>
          <span className="font-normal">WISE</span>
        </span>
        {showTagline ? (
          <span className="mt-1.5 text-[11px] whitespace-nowrap text-white/60">
            {siteConfig.tagline[locale]}
          </span>
        ) : null}
      </span>
    </Link>
  )
}
