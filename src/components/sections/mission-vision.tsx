import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"

/**
 * Fixed two-part statement. The reference pairs a dark card with a bright
 * green one; numbering is earned because the pair is ordered, not decorative.
 */
const statements = [
  {
    number: "01",
    title: "ჩვენი მისია",
    body: "მივაწოდოთ დამკვეთს გარემოსდაცვითი კვლევა, რომელიც ერთდროულად აკმაყოფილებს მარეგულირებლის მოთხოვნას და გამოსადეგია პროექტის დასაგეგმად — და არა მხოლოდ საქაღალდისთვის.",
  },
  {
    number: "02",
    title: "ჩვენი ხედვა",
    body: "საქართველოში გარემოსდაცვითი დოკუმენტი გახდეს გადაწყვეტილების ინსტრუმენტი — მონაცემებზე დაფუძნებული, შემოწმებადი და იმდენად სანდო, რომ მასზე დაყრდნობით პროექტი შეიცვალოს.",
  },
]

export function MissionVision() {
  return (
    <section className="band-light relative isolate pb-20 md:pb-28">
      <SectionBackdrop src="/photos/backdrop-mission.jpg" seed={9} tone="light" />
      <div className="container-page">
        <ul className="grid gap-5 md:grid-cols-2">
          {statements.map((statement, index) => {
            const filled = index === 1

            return (
              <Reveal
                as="li"
                key={statement.number}
                delay={index * 120}
                className={
                  filled
                    ? "rounded-[1.25rem] bg-green-500 p-9 text-teal-900 md:p-11"
                    : "rounded-[1.25rem] bg-teal-900 p-9 text-white md:p-11"
                }
              >
                <span
                  aria-hidden
                  className={
                    filled
                      ? "font-display text-5xl font-bold text-teal-900/70"
                      : "font-display text-5xl font-bold text-green-500"
                  }
                >
                  {statement.number}
                </span>
                <h2 className="mt-6 text-2xl font-semibold">
                  {statement.title}
                </h2>
                <p
                  className={
                    filled
                      ? "prose-measure mt-4 text-teal-900"
                      : "prose-measure mt-4 text-white/78"
                  }
                >
                  {statement.body}
                </p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
