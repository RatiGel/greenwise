import { ClipboardCheck, Gauge, ShieldCheck } from "lucide-react"

import { cn } from "cn"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { SectionHeading } from "@/components/layout/section"

/**
 * Three cards whose fill steps from dark teal to bright green, so the row
 * builds toward the last card.
 */

const cardTones = [
  {
    card: "border border-white/12 bg-teal-700/60 text-white",
    badge: "bg-green-500 text-teal-900",
    body: "text-white/75",
  },
  {
    card: "bg-green-600 text-white",
    badge: "bg-green-500 text-teal-900",
    body: "text-white/85",
  },
  {
    card: "bg-green-500 text-teal-900",
    badge: "bg-teal-900 text-green-500",
    body: "text-teal-900",
  },
]
export async function WhyChoose() {
  const dict = await getDictionary()

  const reasons = [
    {
      icon: ShieldCheck,
      title: dict.home.reasonRegulatorTitle,
      description: dict.home.reasonRegulatorBody,
    },
    {
      icon: ClipboardCheck,
      title: dict.home.reasonDataTitle,
      description: dict.home.reasonDataBody,
    },
    {
      icon: Gauge,
      title: dict.home.reasonPriceTitle,
      description: dict.home.reasonPriceBody,
    },
  ]

  // Bottom padding is trimmed: ServiceCards follows on the same dark band, so
  // a full section gap on both sides reads as an empty stripe.
  return (
    <section className="band-dark relative isolate pt-20 pb-10 md:pt-28 md:pb-14">
      <SectionBackdrop src="/photos/backdrop-why.jpg" seed={7} />
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.home.whyEyebrow}
          title={dict.home.whyTitle}
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
                    "flex h-full flex-col rounded-[1.25rem] p-8",
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

                  <div className="flex flex-1 flex-col">
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
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
