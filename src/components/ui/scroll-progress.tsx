"use client"

import * as React from "react"

/**
 * Reading-progress bar pinned under the header.
 *
 * Long Georgian service pages give little sense of remaining length; this
 * answers "how much is left" without adding a visible control. Driven by
 * rAF-throttled scroll so it never runs layout work per event, and hidden
 * entirely under reduced-motion, where a moving bar is the kind of ambient
 * animation that setting asks to suppress.
 */
export function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const node = ref.current
      if (!node) return

      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      node.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-green-500"
      />
    </div>
  )
}
