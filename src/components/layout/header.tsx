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
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background"
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="მთავარი ნავიგაცია" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-forest-700"
                      : "text-ink-600 hover:text-forest-700"
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
                  <div className="invisible absolute start-0 top-full z-50 w-72 pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="overflow-hidden rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-3 py-2.5 text-sm text-ink-600 transition-colors hover:bg-forest-50 hover:text-forest-800"
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

        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-forest-700 xl:inline-flex"
          >
            <Phone aria-hidden className="size-4" />
            <span dir="ltr">{siteConfig.contact.phone}</span>
          </a>

          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">კონსულტაციის მოთხოვნა</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="მენიუს გახსნა"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm p-0">
              <SheetHeader className="border-b border-border px-5 py-4">
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
                            ? "bg-forest-50 text-forest-800"
                            : "text-ink-600 hover:bg-muted"
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
                        <ul className="mt-0.5 mb-1 ms-3 flex flex-col gap-0.5 border-s border-border ps-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-forest-700"
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

              <div className="border-t border-border p-4">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    კონსულტაციის მოთხოვნა
                  </Link>
                </Button>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground"
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
