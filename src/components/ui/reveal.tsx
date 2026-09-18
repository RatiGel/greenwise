"use client"

import * as React from "react"
import { cn } from "cn"

/**
 * `useLayoutEffect` warns when React renders on the server. The component is
 * client-only in practice, but the guard keeps it silent during SSR.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Stagger delay in ms. Keep under ~400 so content never feels withheld. */
  delay?: number
  as?: "div" | "section" | "li" | "article"
}

/**
 * Fade-in + slide-up on first entry into the viewport.
 *
 * Renders visible by default so the content is present without JS and for
 * crawlers; the hidden state is only applied once the observer is attached.
 * Honors prefers-reduced-motion by skipping the animation entirely.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null)
  const [visible, setVisible] = React.useState(true)
  const [armed, setArmed] = React.useState(false)

  // Layout effect, not effect: the hidden state must be committed in the same
  // frame as hydration. Deferring it to after paint makes above-the-fold
  // content flash in at its final position and then animate in a second time.
  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    const node = ref.current
    if (!node) return

    // Anything already on screen at mount has nothing to reveal — animating it
    // would mean hiding content the visitor is currently reading.
    const box = node.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) return

    setArmed(true)
    setVisible(false)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-visible={visible}
      className={cn(
        armed &&
          "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out-quint",
        armed && !visible && "motion-safe:translate-y-6 motion-safe:opacity-0",
        armed && visible && "translate-y-0 opacity-100",
        className
      )}
      style={armed && delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
