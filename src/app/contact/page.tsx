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

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-forest-900">
              შეავსეთ ფორმა
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              ველების შევსების შემდეგ შეტყობინება ავტომატურად აიწყობა WhatsApp-ში.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={100} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold text-forest-900">
                პირდაპირი კონტაქტი
              </h2>
              <ul className="mt-5 flex flex-col gap-5">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-forest-50 text-forest-700">
                      <item.icon aria-hidden className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          dir={item.ltr ? "ltr" : undefined}
                          className="mt-0.5 block text-sm font-medium text-forest-900 underline-offset-4 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-forest-900">
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
                className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-forest-700 px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-800"
              >
                <MessageCircle aria-hidden className="size-4" />
                პირდაპირ WhatsApp-ში მოწერა
              </a>
            </Reveal>

            <Reveal
              delay={160}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <h2 className="sr-only">ოფისის მდებარეობა რუკაზე</h2>
              <div className="aspect-[4/3] w-full">
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
