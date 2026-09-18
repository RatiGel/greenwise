import { getMethodologySteps } from "@/content/methodology"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/layout/section"

/**
 * Process steps. Numbering is information here — the stages run in order and
 * each one's deliverable is the next one's input.
 */
export function MethodologyTeaser() {
  const steps = getMethodologySteps()

  return (
    <section className="section-y band-light">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="მეთოდოლოგია"
            title="გამჭვირვალე პროცესი — პირველი ზარიდან დოკუმენტამდე"
            accent="პირველი ზარიდან დოკუმენტამდე"
            tone="light"
            className="flex-1"
          />
          <Reveal delay={120}>
            <PillCta href="/methodology" tone="onLight" className="shrink-0">
              სრული პროცესი
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
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-on-light-muted">
                {step.description}
              </p>
              <p className="mt-5 text-sm text-on-light-muted">
                <span className="font-medium text-green-600">
                  {step.duration}
                </span>
                {" · "}
                {step.deliverable}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
