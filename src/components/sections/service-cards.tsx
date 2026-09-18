import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { getServices } from "@/content/services"
import { ServiceIcon } from "@/components/service-icon"
import { Photo } from "@/components/ui/photo"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/layout/section"

/**
 * Service cards built on the photo itself: the image fills the card, a scrim
 * carries the text, and a green circular icon badge overlaps the top-left
 * corner. This is the reference's signature card.
 *
 * All four services are shown at once — the set is small enough that any
 * filtering would add a step without removing one.
 */
export function ServiceCards() {
  const services = getServices()

  return (
    <section className="section-y band-dark">
      <div className="container-page">
        <SectionHeading
          eyebrow="სერვისები"
          title="ოთხი მიმართულება, ერთი პასუხისმგებელი გუნდი"
          accent="ერთი პასუხისმგებელი გუნდი"
          description="თითოეული მომსახურება დამოუკიდებლადაც მუშაობს და კომპლექსურადაც — იმის მიხედვით, რას ითხოვს თქვენი პროექტის ნებართვა."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 90}>
              <Link
                href={`/services/${service.slug}`}
                className="group photo-card press block h-full min-h-[26rem] transition-[transform,box-shadow] duration-500 ease-out-quint hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40"
              >
                <Photo
                  src={`/photos/service-${service.slug}.jpg`}
                  alt=""
                  seed={index + 3}
                  bleed
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 46vw, 100vw"
                  className="absolute inset-0 size-full rounded-none"
                  imageClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden className="photo-card-scrim" />

                {/* Icon badge overlapping the corner, as in the reference. */}
                <span className="absolute start-5 top-5 grid size-12 place-items-center rounded-full bg-green-500 text-teal-900 transition-transform duration-500 ease-out-quint group-hover:scale-110">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>

                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="text-xl leading-snug font-semibold text-white transition-colors duration-300 group-hover:text-green-500">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {service.shortDescription}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-green-500">
                    დეტალურად
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
