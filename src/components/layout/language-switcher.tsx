"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "cn"
import { locales, localizedPath, stripLocale } from "@/lib/i18n/config"
import { useDictionary, useLocale } from "@/lib/i18n/locale-context"

/**
 * Switches to the current page in the other language rather than to the
 * homepage, so the reader keeps their place.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useDictionary().language
  const bare = stripLocale(pathname)

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="group"
      aria-label={t.switchLabel}
    >
      {locales.map((candidate) => {
        const active = candidate === locale
        return (
          <Link
            key={candidate}
            href={localizedPath(bare, candidate)}
            hrefLang={candidate}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-md px-2 py-1 text-sm font-medium uppercase transition-colors duration-200",
              active
                ? "bg-white/12 text-green-500"
                : "text-white/70 hover:bg-white/8 hover:text-white"
            )}
          >
            {candidate}
          </Link>
        )
      })}
    </div>
  )
}
