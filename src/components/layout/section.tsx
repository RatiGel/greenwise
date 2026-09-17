import * as React from "react"
import { cn } from "cn"
import { Reveal } from "@/components/ui/reveal"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "start" | "center"
  className?: string
  /** Use h1 only on a page that has no other h1. */
  as?: "h1" | "h2"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-wide text-forest-600">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-semibold text-forest-900 sm:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

interface SectionProps extends React.ComponentProps<"section"> {
  muted?: boolean
}

export function Section({
  className,
  children,
  muted = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("section-y", muted && "bg-forest-50/60", className)}
      {...props}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}
