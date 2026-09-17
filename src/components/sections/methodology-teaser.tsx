import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getMethodologySteps } from "@/content/methodology"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/layout/section"

export function MethodologyTeaser() {
  const steps = getMethodologySteps()

  return (
    <section className="section-y bg-forest-50/60">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="მეთოდოლოგია"
            title="გამჭვირვალე პროცესი — პირველი ზარიდან დოკუმენტამდე"
            description="ყოველ ეტაპზე იცით, რა კეთდება, რა ვადაში და რას იღებთ შედეგად."
            className="max-w-xl"
          />
          <Reveal delay={120}>
            <Button asChild variant="outline" className="group shrink-0">
              <Link href="/methodology">
                სრული პროცესი
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.id} delay={index * 90} className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-forest-500/35 bg-background font-heading text-sm font-semibold text-forest-700">
                  {step.step}
                </span>
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-gradient-to-r from-forest-500/40 to-transparent lg:block"
                />
              </div>
              <h3 className="mt-5 text-base font-semibold text-forest-900">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <p className="mt-4 text-xs font-medium text-forest-700">
                {step.duration}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
