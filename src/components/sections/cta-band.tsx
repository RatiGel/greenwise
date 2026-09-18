import { siteConfig } from "@/config/site"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { buildWhatsAppQuickUrl } from "@/lib/whatsapp"

export function CtaBand({
  title = "დაგეგმეთ პროექტი",
  accent = "შეფერხების გარეშე",
  description = "მოგვწერეთ პროექტის მოკლე აღწერა — გიპასუხებთ, რომელი კვლევაა სავალდებულო, რა ვადაში და რა ღირებულებით.",
}: {
  title?: string
  accent?: string
  description?: string
}) {
  return (
    <section className="section-y band-dark">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/12 px-7 py-14 text-center md:px-14 md:py-20">
          <SectionBackdrop src="/photos/backdrop-cta.jpg" seed={13} className="rounded-[1.5rem]" />
          <h2 className="heading-lg mx-auto max-w-3xl text-white">
            {title} <span className="text-green-500">{accent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/78">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillCta href="/contact">კონსულტაციის მოთხოვნა</PillCta>
            <PillCta href={buildWhatsAppQuickUrl()} tone="onDark" external>
              WhatsApp-ით დაკავშირება
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
