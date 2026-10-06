import Link from "next/link"

import { getServices } from "@/content/services"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
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
export async function ServiceCards() {
  const services = getServices()
  const locale = await getLocale()
  const dict = await getDictionary()

  return (
    <section className="section-y band-dark">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.sections.servicesHeading}
          title={dict.home.servicesTitle}
          accent={dict.home.servicesAccent}
          description={dict.home.servicesDescription}
          stacked
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 90}>
              <Link
                href={localizedPath(`/services/${service.slug}`, locale)}
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

                {/* The text block rises as one unit on hover. Transform only,
                    so the card's own layout never reflows; `motion-safe`
                    leaves it still for anyone who asked for reduced motion. */}
                <div className="relative flex h-full flex-col justify-end p-6 transition-transform duration-500 ease-out-quint motion-safe:group-hover:-translate-y-2">
                  <h3 className="text-xl leading-snug font-semibold text-white transition-colors duration-300 group-hover:text-green-500">
                    {service.title[locale]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {service.shortDescription[locale]}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
