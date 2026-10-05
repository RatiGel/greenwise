"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu } from "radix-ui"

import { cn } from "cn"
import { locales, localizedPath, stripLocale } from "@/lib/i18n/config"
import { useDictionary, useLocale } from "@/lib/i18n/locale-context"

/**
 * One button showing the current locale; it expands into the full list.
 * Each option links to the current page in that language rather than to the
 * homepage, so the reader keeps their place.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useDictionary().language
  const bare = stripLocale(pathname)

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={`${t.switchLabel}: ${t[locale]}`}
        className={cn(
          "group inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/85 uppercase transition-colors duration-200 outline-none hover:border-white/30 hover:text-white focus-visible:ring-2 focus-visible:ring-green-500/60 data-[state=open]:border-white/30 data-[state=open]:text-white",
          className
        )}
      >
        {locale}
        <ChevronDown
          aria-hidden
          className="size-3 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-(--z-modal) min-w-36 rounded-xl border border-white/12 bg-teal-800 p-1 text-white shadow-xl shadow-black/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          {locales.map((candidate) => {
            const active = candidate === locale
            return (
              <DropdownMenu.Item key={candidate} asChild>
                <Link
                  href={localizedPath(bare, candidate)}
                  hrefLang={candidate}
                  lang={candidate}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors duration-150 data-highlighted:bg-white/10",
                    active ? "text-green-500" : "text-white/80 data-highlighted:text-white"
                  )}
                >
                  {t[candidate]}
                  {active ? <Check aria-hidden className="size-3.5" /> : null}
                </Link>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
