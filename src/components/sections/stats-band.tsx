import { stats } from "@/content/about"
import { Reveal } from "@/components/ui/reveal"

export function StatsBand() {
  return (
    <section className="border-y border-border bg-forest-50/60">
      <div className="container-page py-14">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading text-3xl font-semibold text-forest-800 sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">
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
