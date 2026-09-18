import Link from "next/link"
import { cn } from "cn"
import { siteConfig } from "@/config/site"

export function Logo({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — მთავარი გვერდი`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-10 place-items-center rounded-full transition-colors",
          inverted ? "bg-green-500" : "bg-green-500"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "size-5.5",
            "text-teal-900"
          )}
        >
          <path
            d="M12 21V11.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 12.5c0-3.6 2.5-6.6 6.5-7.5.6 4.7-1.9 8.1-6.5 8.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M11.6 16c-.4-3.2-2.4-5.4-5.6-6 -.4 3.6 1.6 6 5.6 6.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-[-0.02em]",
            "text-white"
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[11px]",
            "text-white/60"
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  )
}
