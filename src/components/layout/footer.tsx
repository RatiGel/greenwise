import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { services } from "@/content/services"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { Logo } from "@/components/layout/logo"

export async function Footer() {
  const year = new Date().getFullYear()
  const locale = await getLocale()
  const dict = await getDictionary()

  const secondaryLinks = [
    { href: localizedPath("/about", locale), label: dict.nav.about },
    { href: localizedPath("/clients", locale), label: dict.nav.clients },
    { href: localizedPath("/methodology", locale), label: dict.nav.methodology },
    { href: localizedPath("/contact", locale), label: dict.nav.contact },
  ]

  return (
    <footer className="mt-auto border-t border-white/10 bg-teal-900 text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            {dict.footer.description}
          </p>
        </div>

        <nav aria-labelledby="footer-services">
          <h2
            id="footer-services"
            className="text-sm font-semibold text-white"
          >
            {dict.footer.servicesHeading}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={localizedPath(`/services/${service.slug}`, locale)}
                  className="text-sm text-white/65 transition-colors duration-200 hover:text-green-500"
                >
                  {service.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="text-sm font-semibold text-white">
            {dict.footer.companyHeading}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 transition-colors duration-200 hover:text-green-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">
            {dict.footer.contactHeading}
          </h2>
          <ul className="mt-4 flex flex-col gap-3.5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-green-500" />
              <span className="text-white/65">{siteConfig.contact.address[locale]}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-green-500" />
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                dir="ltr"
                className="text-white/65 transition-colors duration-200 hover:text-green-500"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-green-500" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white/65 transition-colors duration-200 hover:text-green-500"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-white/65">
            {siteConfig.contact.workingHours[locale]}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {dict.footer.rights}.
          </p>
          <p dir="ltr">{dict.footer.taxId}</p>
        </div>
      </div>
    </footer>
  )
}
