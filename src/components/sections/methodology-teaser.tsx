import { getMethodologySteps } from "@/content/methodology"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/layout/section"

/**
 * Process steps. Numbering is information here — the stages run in order and
 * each one's deliverable is the next one's input.
 */
export async function MethodologyTeaser() {
  const steps = getMethodologySteps()
  const locale = await getLocale()
  const dict = await getDictionary()

  return (
    <section className="section-y band-light">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dict.home.methodologyEyebrow}
            title={dict.home.methodologyTitle}
            accent={dict.home.methodologyAccent}
            tone="light"
            stacked
            className="flex-1"
          />
          <Reveal delay={120}>
            <PillCta
              href={localizedPath("/methodology", locale)}
              tone="onLight"
              className="shrink-0"
            >
              {dict.cta.fullProcess}
            </PillCta>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.id} delay={index * 90}>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-green-600">
                  {String(step.step).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-line-light"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-on-light">
                {step.title[locale]}
              </h3>
              <p className="mt-3 leading-relaxed text-on-light-muted">
                {step.description[locale]}
              </p>
              <p className="mt-5 text-sm text-on-light-muted">
                <span className="font-medium text-green-600">
                  {step.duration[locale]}
                </span>
                {" · "}
                {step.deliverable[locale]}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
