import { siteConfig } from "@/config/site"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { buildWhatsAppQuickUrl } from "@/lib/whatsapp"

export async function CtaBand({
  title,
  accent,
  description,
}: {
  title?: string
  accent?: string
  description?: string
}) {
  const locale = await getLocale()
  const dict = await getDictionary()

  // Defaults come from the dictionary rather than the parameter list, because
  // a default parameter is evaluated before the locale is known.
  const heading = title ?? dict.ctaBand.defaultTitle
  const highlight = accent ?? dict.ctaBand.defaultAccent
  const body = description ?? dict.ctaBand.defaultDescription

  return (
    <section className="section-y band-dark">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/12 px-7 py-14 text-center md:px-14 md:py-20">
          <SectionBackdrop src="/photos/backdrop-cta.jpg" seed={13} className="rounded-[1.5rem]" />
          <h2 className="heading-lg mx-auto max-w-3xl text-white">
            {heading} <span className="text-green-500">{highlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/78">
            {body}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillCta href={localizedPath("/contact", locale)}>
              {dict.cta.requestConsultation}
            </PillCta>
            <PillCta href={buildWhatsAppQuickUrl(locale)} tone="onDark" external>
              {dict.cta.whatsappContact}
            </PillCta>
          </div>

          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="font-display mt-9 inline-block text-lg font-semibold text-white transition-colors hover:text-green-500"
            dir="ltr"
          >
            {siteConfig.contact.phone}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
