import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buildWhatsAppQuickUrl } from "@/lib/whatsapp"
import { PageHeader } from "@/components/sections/page-header"
import { ContactForm } from "@/components/sections/contact-form"
import { Reveal } from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "კონტაქტი",
  description:
    "დაუკავშირდით GREENWISE-ს — მოითხოვეთ უფასო კონსულტაცია გარემოსდაცვით კვლევებზე. ტელეფონი, ელ-ფოსტა, მისამართი და WhatsApp.",
  alternates: { canonical: "/contact" },
}

const contactItems = [
  {
    icon: Phone,
    label: "ტელეფონი",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phoneHref}`,
    ltr: true,
  },
  {
    icon: Mail,
    label: "ელ-ფოსტა",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    ltr: true,
  },
  {
    icon: MapPin,
    label: "მისამართი",
    value: siteConfig.contact.address,
    href: undefined,
    ltr: false,
  },
  {
    icon: Clock,
    label: "სამუშაო საათები",
    value: siteConfig.contact.workingHours,
    href: undefined,
    ltr: false,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="კონტაქტი"
        title="მოითხოვეთ კონსულტაცია"
        description="აღწერეთ პროექტი — გიპასუხებთ ერთ სამუშაო დღეში, რომელი კვლევაა სავალდებულო, რა ვადაში და რა ღირებულებით."
      />

      <section className="section-y band-dark">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="heading-lg text-white">
              შეავსეთ ფორმა
            </h2>
            <p className="prose-measure mt-3 text-white/75">
              ველების შევსების შემდეგ შეტყობინება ავტომატურად აიწყობა WhatsApp-ში.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={100} className="rounded-2xl border border-white/12 bg-teal-700/50 p-7">
              <h2 className="text-base font-semibold text-white">
                პირდაპირი კონტაქტი
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
                href={buildWhatsAppQuickUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="press mt-7 flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-200 hover:border-green-500/50 hover:bg-white/10 hover:text-green-500"
              >
                <MessageCircle aria-hidden className="size-4" />
                პირდაპირ WhatsApp-ში მოწერა
              </a>
            </Reveal>

            <Reveal
              delay={160}
              className="overflow-hidden rounded-2xl border border-white/12 bg-teal-700/50"
            >
              <h2 className="sr-only">ოფისის მდებარეობა რუკაზე</h2>
              <div className="aspect-16/11 w-full bg-teal-700/50">
                <iframe
                  src={siteConfig.contact.mapEmbedUrl}
                  title={`${siteConfig.name} — ოფისის მდებარეობა`}
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
