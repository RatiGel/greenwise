import { getServices } from "@/content/services"
import { localizedPath, type Locale } from "@/lib/i18n/config"
import { getDictionaryFor } from "@/lib/i18n/get-dictionary"

export interface NavItem {
  href: string
  label: string
  children?: NavItem[]
}

/** Builds the main navigation with hrefs and labels for `locale`. */
export function getMainNav(locale: Locale): NavItem[] {
  const t = getDictionaryFor(locale).nav
  const path = (p: string) => localizedPath(p, locale)

  return [
    { href: path("/about"), label: t.about },
    {
      href: path("/services"),
      label: t.services,
      children: getServices().map((service) => ({
        href: path(`/services/${service.slug}`),
        label: service.title[locale],
      })),
    },
    { href: path("/contact"), label: t.contact },
  ]
}
