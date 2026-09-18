import * as React from "react"

import { cn } from "cn"
import { Reveal } from "@/components/ui/reveal"

/**
 * Stacked section label, set in the accent green — the reference's
 * "WHY / CHOOSE / GREENWISE" device. Georgian has no uppercase forms, so the
 * label relies on color and placement rather than letter-casing.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn("label-stack", className)}>{children}</p>
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  /** Phrase within `title` to pick out in accent green. */
  accent?: string
  description?: string
  tone?: "dark" | "light"
  className?: string
  as?: "h1" | "h2"
}

/**
 * Reference heading layout: a narrow label column on the left, the headline
 * in the middle, and optional supporting copy on the right.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const [before, after] = accent ? splitOnce(title, accent) : [title, ""]

  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:gap-10",
        description && "lg:grid-cols-[minmax(0,10rem)_minmax(0,1.6fr)_minmax(0,1fr)]",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <SectionLabel>{eyebrow}</SectionLabel>
        </Reveal>
      ) : (
        <span aria-hidden />
      )}

      <Reveal delay={60}>
        <Tag
          className={cn(
            "heading-lg",
            tone === "dark" ? "text-white" : "text-on-light"
          )}
        >
          {before}
          {accent ? <span className="text-green-500">{accent}</span> : null}
          {after}
        </Tag>
      </Reveal>

      {description ? (
        <Reveal delay={140}>
          <p
            className={cn(
              "text-[0.9375rem] leading-relaxed",
              tone === "dark" ? "text-white/75" : "text-on-light-muted"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}

/** Splits a title around the first occurrence of `accent`. */
function splitOnce(title: string, accent: string): [string, string] {
  const at = title.indexOf(accent)
  if (at === -1) return [title, ""]
  return [title.slice(0, at), title.slice(at + accent.length)]
}

interface SectionProps extends React.ComponentProps<"section"> {
  /** Light paper band. The reference alternates dark and light. */
  light?: boolean
  tall?: boolean
}

export function Section({
  className,
  children,
  light = false,
  tall = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        tall ? "section-y-lg" : "section-y",
        light ? "band-light" : "band-dark",
        className
      )}
      {...props}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}
