import type { Metadata } from "next"
import { FileCheck2 } from "lucide-react"

import { getMethodologySteps } from "@/content/methodology"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Photo } from "@/components/ui/photo"
import { Reveal } from "@/components/ui/reveal"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dict = await getDictionary()

  return {
    title: dict.methodology.metaTitle,
    description: dict.methodology.metaDescription,
    alternates: {
      canonical: localizedPath("/methodology", locale),
      languages: {
        ka: localizedPath("/methodology", "ka"),
        en: localizedPath("/methodology", "en"),
        "x-default": localizedPath("/methodology", "ka"),
      },
    },
  }
}

export default async function MethodologyPage() {
  const steps = getMethodologySteps()
  const locale = await getLocale()
  const dict = await getDictionary()

  return (
    <>
      <PageHeader
        eyebrow={dict.methodology.eyebrow}
        title={dict.methodology.title}
        description={dict.methodology.description}
      />

      <section className="section-y band-dark">
        <div className="container-page">
          <ol className="relative flex flex-col gap-10 md:gap-12">
            <span
              aria-hidden
              className="absolute start-[22px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-green-500/45 via-green-500/25 to-transparent md:block"
            />

            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.id}
                id={step.id}
                delay={index * 100}
                className="relative grid scroll-mt-28 gap-5 md:grid-cols-[46px_1fr] md:gap-8"
              >
                <span className="font-display z-10 grid size-11 place-items-center rounded-full border border-green-500/40 bg-teal-900 text-base font-bold text-green-500">
                  {String(step.step).padStart(2, "0")}
                </span>

                <div className="group/card rounded-2xl border border-white/12 bg-teal-700/50 p-6 transition-[transform,box-shadow] duration-400 ease-out-quint hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 md:p-8">
                  {/* Title and body shift together; the deliverable footer
                      below keeps its rule anchored to the card edge. */}
                  <div className="transition-transform duration-400 ease-out-quint motion-safe:group-hover/card:translate-x-1">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                      {step.title[locale]}
                    </h2>

                    <p className="prose-measure mt-4 text-white/75">
                      {step.description[locale]}
                    </p>
                  </div>

                  <div className="mt-6 flex items-start gap-3 border-t border-white/12 pt-5">
                    <FileCheck2
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-green-500"
                    />
                    <p className="text-sm text-green-500">
                      <span className="font-medium">
                        {dict.methodology.deliverableLabel}
                      </span>
                      {step.deliverable[locale]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y band-dark">
        <div className="container-page">
          <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <Photo
              alt={dict.methodology.gisPhotoAlt}
              ratio="16 / 11"
              seed={11}
              sizes="(min-width: 768px) 46vw, 100vw"
            />
            <div>
              <h2 className="heading-lg text-white">
                {dict.methodology.gisTitle}
              </h2>
              <p className="prose-measure mt-5 text-[1.0625rem] text-white/75">
                {dict.methodology.gisBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={dict.methodology.ctaTitle}
        description={dict.methodology.ctaDescription}
      />
    </>
  )
}
