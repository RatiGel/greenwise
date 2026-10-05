import Link from "next/link"
import { ArrowRight, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react"

import { cn } from "cn"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { SectionHeading } from "@/components/layout/section"

/**
 * Three cards whose fill steps from dark teal to bright green, so the row
 * builds toward the last card.
 */

const cardTones = [
  {
    card: "border border-white/12 bg-teal-700/60 text-white hover:bg-teal-700",
    badge: "bg-green-500 text-teal-900",
    body: "text-white/75",
    link: "text-green-500",
  },
  {
    card: "bg-green-600 text-white hover:bg-green-600/90",
    badge: "bg-green-500 text-teal-900",
    body: "text-white/85",
    link: "text-white",
  },
  {
    card: "bg-green-500 text-teal-900",
    badge: "bg-teal-900 text-green-500",
    body: "text-teal-900",
    link: "text-teal-900",
  },
]
export async function WhyChoose() {
  const locale = await getLocale()
  const dict = await getDictionary()

  const reasons = [
    {
      icon: ShieldCheck,
      title: dict.home.reasonRegulatorTitle,
      description: dict.home.reasonRegulatorBody,
      href: localizedPath("/methodology", locale),
      linkLabel: dict.home.reasonRegulatorLink,
    },
    {
      icon: ClipboardCheck,
      title: dict.home.reasonDataTitle,
      description: dict.home.reasonDataBody,
      href: localizedPath("/services/tree-inventory", locale),
      linkLabel: dict.home.reasonDataLink,
    },
    {
      icon: Gauge,
      title: dict.home.reasonPriceTitle,
      description: dict.home.reasonPriceBody,
      href: localizedPath("/contact", locale),
      linkLabel: dict.home.reasonPriceLink,
    },
  ]

  return (
    <section className="section-y band-dark relative isolate">
      <SectionBackdrop src="/photos/backdrop-why.jpg" seed={7} />
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.home.whyEyebrow}
          title={dict.home.whyTitle}
          accent={dict.home.whyAccent}
          description={dict.home.whyDescription}
          stacked
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => {
            const tone = cardTones[index % cardTones.length]

            return (
              <Reveal as="li" key={reason.title} delay={index * 90}>
                <div
                  className={cn(
                    "group/card flex h-full flex-col rounded-[1.25rem] p-8 transition-[transform,background-color,box-shadow] duration-400 ease-out-quint hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25",
                    tone.card
                  )}
                >
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-full",
                      tone.badge
                    )}
                  >
                    <reason.icon aria-hidden className="size-6" />
                  </span>

                  {/* Copy shifts on hover while the icon badge stays put, so
                      the card reads as one object with a fixed anchor. */}
                  <div className="flex flex-1 flex-col transition-transform duration-400 ease-out-quint motion-safe:group-hover/card:translate-x-1">
                    <h3 className="mt-7 text-xl font-semibold">{reason.title}</h3>
                    <p
                      className={cn(
                        "mt-3 flex-1 leading-relaxed",
                        tone.body
                      )}
                    >
                      {reason.description}
                    </p>
                  </div>

                  <Link
                    href={reason.href}
                    className={cn(
                      "group/link mt-7 inline-flex items-center gap-2 text-sm font-medium",
                      tone.link
                    )}
                  >
                    {reason.linkLabel}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
