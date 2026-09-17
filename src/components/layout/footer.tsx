import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { services } from "@/content/services"
import { Logo } from "@/components/layout/logo"

const secondaryLinks = [
  { href: "/about", label: "ჩვენ შესახებ" },
  { href: "/clients", label: "კლიენტები" },
  { href: "/methodology", label: "მეთოდოლოგია" },
  { href: "/contact", label: "კონტაქტი" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-forest-900 text-clay-200">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-clay-300">
            გარემოსდაცვითი კვლევები და დოკუმენტაცია, რომლებსაც მარეგულირებელი
            პირველივე წარდგენისას იღებს.
          </p>
        </div>

        <nav aria-labelledby="footer-services">
          <h2
            id="footer-services"
            className="text-sm font-semibold text-white"
          >
            სერვისები
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-clay-300 transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="text-sm font-semibold text-white">
            კომპანია
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-clay-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">კონტაქტი</h2>
          <ul className="mt-4 flex flex-col gap-3.5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-500" />
              <span className="text-clay-300">{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-500" />
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                dir="ltr"
                className="text-clay-300 transition-colors hover:text-white"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-500" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-clay-300 transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-clay-300">
            {siteConfig.contact.workingHours}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-clay-300 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. ყველა უფლება დაცულია.
          </p>
          <p>ს/ნ 4•••••••••</p>
        </div>
      </div>
    </footer>
  )
}
