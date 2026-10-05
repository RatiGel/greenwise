import { stats } from "@/content/about"
import { getLocale } from "@/lib/i18n/dictionaries"
import { CountUp } from "@/components/ui/count-up"
import { Reveal } from "@/components/ui/reveal"

export async function StatsBand() {
  const locale = await getLocale()

  return (
    <section className="band-light">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line-light py-14 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label[locale]} delay={index * 80}>
              <dt className="sr-only">{stat.label[locale]}</dt>
              <dd>
                <CountUp
                  value={stat.value[locale]}
                  className="block text-4xl font-bold text-on-light sm:text-5xl"
                />
                <span className="mt-2.5 block text-sm text-on-light-muted">
                  {stat.label[locale]}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
