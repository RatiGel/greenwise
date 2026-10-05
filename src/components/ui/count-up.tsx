"use client"

import * as React from "react"

import { cn } from "cn"

/**
 * Counts a numeric value up each time it scrolls into view — the reference site's
 * stats device.
 *
 * Renders the final value as its server/initial output, so the real number is
 * present without JS and for crawlers. The animation only ever replaces an
 * already-correct value.
 */
export function CountUp({
  value,
  duration = 2000,
  delay = 100,
  className,
}: {
  /** Full display string, e.g. "60 000+" (Georgian), "60,000+" (English) or "13+". */
  value: string
  duration?: number
  /** Wait this long (ms) after entering view, so a surrounding reveal fade finishes first. */
  delay?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = React.useState(value)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    // Runs under reduced motion too: the digits change in place and nothing
    // moves across the screen.

    // Split "60 000+" (Georgian) or "60,000+" (English) into the
    // numeric core and whatever wraps it, so suffixes, non-breaking
    // spaces and comma group separators all survive the animation
    // untouched.
    const match = value.match(/^(\D*)([\d\s ,]+)(.*)$/)
    if (!match) return

    const [, prefix, rawNumber, suffix] = match
    const groupSeparator = /,/.test(rawNumber)
      ? ","
      : /[\s ]/.test(rawNumber)
        ? " "
        : ""
    const target = Number(rawNumber.replace(/[\s ,]/g, ""))
    if (!Number.isFinite(target) || target === 0) return

    const format = (n: number) =>
      groupSeparator
        ? n.toLocaleString("en-US").replace(/,/g, groupSeparator)
        : String(n)

    let frame = 0
    let timer = 0
    let running = false

    const stop = () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      running = false
    }

    const run = () => {
      let start: number | null = null
      const step = (now: number) => {
        start ??= now
        const progress = Math.min((now - start) / duration, 1)
        // ease-out-cubic: the count stays visibly in motion for most of
        // the duration instead of jumping to the target at once.
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(`${prefix}${format(Math.round(target * eased))}${suffix}`)
        if (progress < 1) frame = requestAnimationFrame(step)
      }
      running = true
      setDisplay(`${prefix}${format(0)}${suffix}`)
      timer = window.setTimeout(() => {
        frame = requestAnimationFrame(step)
      }, delay)
    }

    // Replays on every entry: counts up once mostly in view, and resets to
    // zero once fully out of view so the next scroll back counts again.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          if (!running) run()
        } else if (!entry.isIntersecting) {
          stop()
          setDisplay(`${prefix}${format(0)}${suffix}`)
        }
      },
      { threshold: [0, 0.4] }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [value, duration, delay])

  return (
    <span ref={ref} className={cn("font-display tabular-nums", className)}>
      {display}
    </span>
  )
}
