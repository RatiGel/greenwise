import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { buildWhatsAppQuickUrl } from "@/lib/whatsapp"
import { PageHeader } from "@/components/sections/page-header"
import { ContactForm } from "@/components/sections/contact-form"
import { Reveal } from "@/components/ui/reveal"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dict = await getDictionary()

  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: localizedPath("/contact", locale),
      languages: {
        ka: localizedPath("/contact", "ka"),
        en: localizedPath("/contact", "en"),
        "x-default": localizedPath("/contact", "ka"),
      },
    },
  }
}

export default async function ContactPage() {
  const locale = await getLocale()
  const dict = await getDictionary()

  const contactItems = [
    {
      icon: Phone,
      label: dict.form.phone,
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phoneHref}`,
      ltr: true,
    },
    {
      icon: Mail,
      label: dict.form.email,
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      ltr: true,
    },
    {
      icon: MapPin,
      label: dict.footer.address,
      value: siteConfig.contact.address[locale],
      href: undefined,
      ltr: false,
    },
    {
      icon: Clock,
      label: dict.footer.workingHours,
      value: siteConfig.contact.workingHours[locale],
      href: undefined,
      ltr: false,
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        description={dict.contact.description}
      />

      <section className="section-y band-dark">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="heading-lg text-white">
              {dict.contact.formHeading}
            </h2>
            <p className="prose-measure mt-3 text-white/75">
              {dict.contact.formNote}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={100} className="rounded-2xl border border-white/12 bg-teal-700/50 p-7">
              <h2 className="text-base font-semibold text-white">
                {dict.contact.directHeading}
              </h2>
              <ul className="mt-5 flex flex-col gap-5">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-500/15 text-green-500">
                      <item.icon aria-hidden className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-white/65">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          dir={item.ltr ? "ltr" : undefined}
                          className="mt-1 block text-[0.9375rem] font-medium text-white underline-offset-4 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-[0.9375rem] font-medium text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={buildWhatsAppQuickUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="press mt-7 flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-green-500/50 hover:bg-white/10 hover:text-green-500"
              >
                <MessageCircle aria-hidden className="size-4" />
                {dict.contact.whatsappDirect}
              </a>
            </Reveal>

            <Reveal
              delay={160}
              className="overflow-hidden rounded-2xl border border-white/12 bg-teal-700/50"
            >
              <h2 className="sr-only">{dict.contact.mapHeading}</h2>
              <div className="aspect-16/11 w-full bg-teal-700/50">
                <iframe
                  src={siteConfig.contact.mapEmbedUrl}
                  title={`${siteConfig.name} — ${dict.contact.mapTitle}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="size-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
