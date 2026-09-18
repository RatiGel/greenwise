import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "cn"

type Tone = "solid" | "onDark" | "onLight"

const toneStyles: Record<Tone, { base: string; badge: string }> = {
  // Bright green pill — the primary action.
  solid: {
    base: "bg-green-500 text-teal-900 hover:bg-green-400",
    badge: "bg-teal-900 text-green-500",
  },
  // Dark pill with a green badge, used on light bands (reference "About Us").
  onLight: {
    base: "bg-teal-900 text-white hover:bg-teal-800",
    badge: "bg-green-500 text-teal-900",
  },
  // Outlined pill for dark bands.
  onDark: {
    base: "border border-white/25 text-white hover:bg-white/10",
    badge: "bg-green-500 text-teal-900",
  },
}

/**
 * The reference's signature control: a pill whose trailing circular badge
 * holds the arrow. The badge is part of the shape, not an icon beside the
 * label, so it stays flush inside the right edge at every size.
 */
export function PillCta({
  href,
  children,
  tone = "solid",
  external = false,
  className,
}: {
  href: string
  children: React.ReactNode
  tone?: Tone
  external?: boolean
  className?: string
}) {
  const styles = toneStyles[tone]

  const inner = (
    <>
      <span className="min-w-0">{children}</span>
      <span
        aria-hidden
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          styles.badge
        )}
      >
        <ArrowUpRight className="size-[1.125rem]" strokeWidth={2.25} />
      </span>
    </>
  )

  const classes = cn("pill-cta press group", styles.base, className)

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
