import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getServices } from "@/content/services"
import { ServiceIcon } from "@/components/service-icon"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/layout/section"

export function ServiceCards() {
  const services = getServices()

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="ჩვენი სერვისები"
          title="ოთხი მიმართულება, ერთი პასუხისმგებელი გუნდი"
          description="თითოეული მომსახურება დამოუკიდებლადაც მუშაობს და კომპლექსურადაც — იმის მიხედვით, რას ითხოვს თქვენი პროექტის ნებართვა."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 90}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest-500/50 hover:shadow-lg hover:shadow-forest-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-forest-50 text-forest-700 transition-colors group-hover:bg-forest-100">
                  <ServiceIcon name={service.icon} className="size-5.5" />
                </span>

                <h3 className="mt-5 text-lg font-semibold text-forest-900">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest-700">
                  დეტალურად
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
