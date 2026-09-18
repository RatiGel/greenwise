import { stats } from "@/content/about"
import { CountUp } from "@/components/ui/count-up"
import { Reveal } from "@/components/ui/reveal"

export function StatsBand() {
  return (
    <section className="band-light">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line-light py-14 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  className="block text-4xl font-bold text-on-light sm:text-5xl"
                />
                <span className="mt-2.5 block text-sm text-on-light-muted">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
