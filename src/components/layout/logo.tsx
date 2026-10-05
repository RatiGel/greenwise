import Link from "next/link"
import { cn } from "cn"
import { siteConfig } from "@/config/site"

/**
 * Brand symbol — the "symbol-on-dark" variant from /public/brand, minus its
 * background square so it sits directly on the dark teal surfaces.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
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
  )
}

export function Logo({
  className,
  showTagline = true,
}: {
  className?: string
  showTagline?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — მთავარი გვერდი`}
      className={cn(
        "group inline-flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
    >
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-wordmark text-[28px] leading-[0.85] tracking-[0.04em] text-white">
          <span className="font-bold">GREEN</span>
          <span className="font-normal">WISE</span>
        </span>
        {showTagline ? (
          <span className="mt-1.5 text-[11px] whitespace-nowrap text-white/60">
            {siteConfig.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  )
}
