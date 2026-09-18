"use client"

import * as React from "react"

import { cn } from "cn"

/**
 * Counts a numeric value up on first scroll into view — the reference site's
 * stats device.
 *
 * Renders the final value as its server/initial output, so the real number is
 * present without JS, for crawlers, and under reduced motion. The animation
 * only ever replaces an already-correct value.
 */
export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  /** Full display string, e.g. "60 000+" or "13+". */
  value: string
  duration?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Split "60 000+" into the numeric core and whatever wraps it, so
    // suffixes and non-breaking spaces survive the animation untouched.
    const match = value.match(/^(\D*)([\d\s ]+)(.*)$/)
    if (!match) return

    const [, prefix, rawNumber, suffix] = match
    const groupSeparator = /[\s ]/.test(rawNumber) ? " " : ""
    const target = Number(rawNumber.replace(/[\s ]/g, ""))
    if (!Number.isFinite(target) || target === 0) return

    const format = (n: number) =>
      groupSeparator
        ? n.toLocaleString("en-US").replace(/,/g, groupSeparator)
        : String(n)

    let frame = 0
    let start: number | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()

        const step = (now: number) => {
          start ??= now
          const progress = Math.min((now - start) / duration, 1)
          // ease-out-quint: fast start, long settle
          const eased = 1 - Math.pow(1 - progress, 5)
          setDisplay(`${prefix}${format(Math.round(target * eased))}${suffix}`)
          if (progress < 1) frame = requestAnimationFrame(step)
        }

        setDisplay(`${prefix}${format(0)}${suffix}`)
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={cn("font-display tabular-nums", className)}>
      {display}
    </span>
  )
}
