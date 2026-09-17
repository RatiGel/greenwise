import type { Metadata } from "next"
import { FileCheck2 } from "lucide-react"

import { getMethodologySteps } from "@/content/methodology"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Reveal } from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "მეთოდოლოგია",
  description:
    "GREENWISE-ის სამუშაო პროცესი: პირველადი კონსულტაცია, ტერიტორიის შეფასება, საველე სამუშაოები და დოკუმენტაციის მომზადება — ვადებითა და შედეგებით.",
  alternates: { canonical: "/methodology" },
}

export default function MethodologyPage() {
  const steps = getMethodologySteps()

  return (
    <>
      <PageHeader
        eyebrow="მეთოდოლოგია"
        title="როგორ მუშაობს პროცესი"
        description="ოთხი ეტაპი, თითოეული ფიქსირებული ვადითა და კონკრეტული შედეგით. არანაირი ბუნდოვანება იმაზე, თუ სად დგას პროექტი."
      />

      <section className="section-y">
        <div className="container-page">
          <ol className="relative flex flex-col gap-10 md:gap-12">
            <span
              aria-hidden
              className="absolute start-[22px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-forest-500/40 via-forest-500/25 to-transparent md:block"
            />

            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 100}
                className="relative grid gap-5 md:grid-cols-[46px_1fr] md:gap-8"
              >
                <span className="z-10 grid size-11 place-items-center rounded-full border border-forest-500/35 bg-background font-heading text-base font-semibold text-forest-700">
                  {step.step}
                </span>

                <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-forest-900 sm:text-2xl">
                      {step.title}
                    </h2>
                    <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">
                      {step.duration}
                    </span>
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-start gap-3 border-t border-border pt-5">
                    <FileCheck2
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-forest-600"
                    />
                    <p className="text-sm text-forest-800">
                      <span className="font-medium">შედეგი: </span>
                      {step.deliverable}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="დაიწყეთ პირველი ეტაპით"
        description="პირველადი კონსულტაცია უფასოა და გეუბნებათ ზუსტად, რომელი კვლევაა სავალდებულო თქვენი ნებართვისთვის."
      />
    </>
  )
}
