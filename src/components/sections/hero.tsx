import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"

const highlights = [
  "გზშ-სთვის მზა დოკუმენტაცია",
  "13+ წლიანი საექსპერტო გამოცდილება",
  "ფიქსირებული ვადა და ღირებულება",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-forest-900">
      {/* Decorative gradient wash; no image request, so LCP stays text-only. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_10%,color-mix(in_oklab,var(--forest-700)_78%,transparent)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 end-0 hidden w-1/2 opacity-[0.08] lg:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, white 0 1px, transparent 1px 22px)",
        }}
      />

      <div className="container-page relative py-24 md:py-32 lg:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <p className="inline-flex items-center rounded-full border border-forest-500/40 bg-forest-500/10 px-3.5 py-1.5 text-sm text-forest-100">
              გარემოსდაცვითი კონსალტინგი საქართველოში
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              გარემოსდაცვითი დოკუმენტაცია, რომელიც ნებართვას აჩქარებს
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-clay-200">
              ბიომრავალფეროვნების შეფასება, ხე-მცენარეთა ინვენტარიზაცია,
              დენდროლოგიური ექსპერტიზა და ტყის აღდგენა — საველე მონაცემებზე
              დაფუძნებული კვლევები დეველოპერების, მუნიციპალიტეტების,
              არქიტექტორებისა და NGO-ებისთვის.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group bg-white text-forest-900 hover:bg-clay-200">
                <Link href="/contact">
                  უფასო კონსულტაციის მოთხოვნა
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/services">სერვისების ნახვა</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-clay-200"
                >
                  <CheckCircle2
                    aria-hidden
                    className="size-4 shrink-0 text-forest-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
