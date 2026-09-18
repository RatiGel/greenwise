import type { Metadata } from "next"
import { FileCheck2 } from "lucide-react"

import { getMethodologySteps } from "@/content/methodology"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Photo } from "@/components/ui/photo"
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

      <section className="section-y band-dark">
        <div className="container-page">
          <ol className="relative flex flex-col gap-10 md:gap-12">
            <span
              aria-hidden
              className="absolute start-[22px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-forest-500/45 via-forest-500/25 to-transparent md:block"
            />

            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 100}
                className="relative grid gap-5 md:grid-cols-[46px_1fr] md:gap-8"
              >
                <span className="font-display z-10 grid size-11 place-items-center rounded-full border border-forest-500/40 bg-teal-900 text-base font-bold text-green-500">
                  {String(step.step).padStart(2, "0")}
                </span>

                <div className="rounded-2xl border border-white/12 bg-teal-700/50 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-forest-900/[0.06] md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                      {step.title}
                    </h2>
                    <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-500">
                      {step.duration}
                    </span>
                  </div>

                  <p className="prose-measure mt-4 text-white/75">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-start gap-3 border-t border-white/12 pt-5">
                    <FileCheck2
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-green-500"
                    />
                    <p className="text-sm text-green-500">
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

      <section className="section-y band-dark">
        <div className="container-page">
          <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <Photo
              alt="საველე მონაცემების აღრიცხვა GIS ბაზაში"
              ratio="16 / 11"
              seed={11}
              sizes="(min-width: 768px) 46vw, 100vw"
            />
            <div>
              <h2 className="heading-lg text-white">
                მონაცემი, რომელიც პროექტს გადააჭარბებს
              </h2>
              <p className="prose-measure mt-5 text-[1.0625rem] text-white/75">
                საველე ეტაპზე შეგროვებულ მონაცემს GIS ფორმატში იღებთ — ის
                დოკუმენტის ჩაბარების შემდეგაც რჩება თქვენთან და გამოსადეგია
                შემდეგი ეტაპების დასაგეგმად.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="დაიწყეთ პირველი ეტაპით"
        description="პირველადი კონსულტაცია უფასოა და გეუბნებათ ზუსტად, რომელი კვლევაა სავალდებულო თქვენი ნებართვისთვის."
      />
    </>
  )
}
