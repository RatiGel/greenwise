import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { getMethodologySteps } from "@/content/methodology"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/layout/section"

/**
 * Process timeline. Numbering is information here — the stages run in order
 * and each one's deliverable is the next one's input. The teaser keeps one
 * line per step; each step links to its full write-up on /methodology.
 *
 * Horizontal from `lg`, vertical below. The green rail draws itself in once
 * the list reveals (Reveal flips `data-visible`).
 */
export async function MethodologyTeaser() {
  const steps = getMethodologySteps()
  const locale = await getLocale()
  const dict = await getDictionary()
  const methodologyHref = localizedPath("/methodology", locale)

  return (
    <section className="section-y band-light">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dict.home.methodologyEyebrow}
            title={dict.home.methodologyTitle}
            tone="light"
            stacked
            className="flex-1"
          />
          <Reveal delay={120}>
            <PillCta href={methodologyHref} tone="onLight" className="shrink-0">
              {dict.cta.fullProcess}
            </PillCta>
          </Reveal>
        </div>

        <Reveal className="relative mt-14 md:mt-16">
          {/* Rail: base track plus a green fill that draws in. Runs through
              the node centres — down the start edge on small screens, across
              the top from `lg`. */}
          <span
            aria-hidden
            className="absolute start-7 top-7 bottom-7 w-px bg-line-light lg:start-7 lg:end-0 lg:top-7 lg:bottom-auto lg:h-px lg:w-auto"
          />
          <span
            aria-hidden
            className="absolute start-7 top-7 bottom-7 w-px origin-top scale-y-0 bg-gradient-to-b from-green-500 via-green-500 to-green-500/0 transition-transform duration-[1600ms] ease-out-quint in-data-[visible=true]:scale-y-100 lg:start-7 lg:end-0 lg:top-7 lg:bottom-auto lg:h-px lg:w-auto lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:bg-gradient-to-r lg:in-data-[visible=true]:scale-x-100 motion-reduce:transition-none"
          />

          <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={200 + index * 140}>
                <Link
                  href={`${methodologyHref}#${step.id}`}
                  className="group/step grid grid-cols-[3.5rem_1fr] gap-5 rounded-[1.25rem] outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-4 focus-visible:ring-offset-paper lg:flex lg:h-full lg:flex-col"
                >
                  <span className="font-display relative grid size-14 place-items-center rounded-full border border-green-600/35 bg-paper text-lg font-bold text-green-600 transition-[background-color,border-color,color,transform] duration-500 ease-out-quint group-hover/step:scale-105 group-hover/step:border-teal-900 group-hover/step:bg-teal-900 group-hover/step:text-green-500">
                    {String(step.step).padStart(2, "0")}
                  </span>

                  <div className="rounded-[1.25rem] border border-line-light bg-paper-elevated p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out-quint group-hover/step:-translate-y-1 group-hover/step:border-green-600/30 group-hover/step:shadow-xl group-hover/step:shadow-teal-900/10 lg:mt-7 lg:flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg leading-snug font-semibold text-on-light">
                        {step.title[locale]}
                      </h3>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-green-600 opacity-0 transition-[opacity,transform] duration-500 ease-out-quint group-hover/step:translate-x-0.5 group-hover/step:-translate-y-0.5 group-hover/step:opacity-100 group-focus-visible/step:opacity-100"
                      />
                    </div>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-light-muted">
                      {step.summary[locale]}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
