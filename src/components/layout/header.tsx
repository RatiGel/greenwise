"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Phone } from "lucide-react"

import { cn } from "cn"
import { mainNav } from "@/config/nav"
import { siteConfig } from "@/config/site"
import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { PillCta } from "@/components/ui/pill-cta"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className={cn(
        "sticky top-0 z-(--z-sticky) w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-white/10 bg-teal-900/92 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <ScrollProgress />

      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="მთავარი ნავიგაცია" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "bg-forest-50 text-forest-800"
                      : "text-ink-700 hover:bg-forest-50 hover:text-forest-800"
                  )}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      aria-hidden
                      className="size-3.5 transition-transform group-hover:rotate-180"
                    />
                  ) : null}
                </Link>

                {item.children ? (
                  <div className="invisible absolute start-0 top-full z-(--z-dropdown) w-72 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-forest-900/[0.08]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="hidden shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-white/80 transition-colors hover:text-green-500 2xl:inline-flex"
          >
            <Phone aria-hidden className="size-4" />
            <span dir="ltr" className="font-display font-semibold whitespace-nowrap">
              {siteConfig.contact.phone}
            </span>
          </a>

          <PillCta href="/contact" className="hidden sm:inline-flex">
            კონსულტაცია
          </PillCta>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="მენიუს გახსნა"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="z-(--z-drawer) flex w-[88vw] max-w-sm flex-col border-white/12 bg-teal-900 p-0 text-white">
              <SheetHeader className="border-b border-white/12 px-5 py-4">
                <SheetTitle className="text-start text-base">მენიუ</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="მობილური ნავიგაცია"
                className="flex-1 overflow-y-auto px-3 py-4"
                onClick={(event) => {
                  // Close the drawer as soon as a navigation link is activated.
                  if ((event.target as HTMLElement).closest("a")) setOpen(false)
                }}
              >
                <ul className="flex flex-col gap-0.5">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-[15px] font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-white/10 text-green-500"
                            : "text-white/80 hover:bg-white/5"
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
                        <ul className="mt-0.5 mb-1 ms-3 flex flex-col gap-0.5 border-s border-white/12 ps-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-md px-3 py-2 text-sm text-white/65 transition-colors hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/12 p-4">
                <PillCta href="/contact" className="w-full justify-between">
                  კონსულტაციის მოთხოვნა
                </PillCta>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-white/65"
                >
                  <Phone aria-hidden className="size-4" />
                  <span dir="ltr">{siteConfig.contact.phone}</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
