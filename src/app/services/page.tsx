import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { cn } from "cn"
import { getServices } from "@/content/services"
import { ServiceIcon } from "@/components/service-icon"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Photo } from "@/components/ui/photo"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "სერვისები",
  description:
    "ბიომრავალფეროვნების შეფასება, ხე-მცენარეთა ინვენტარიზაცია და კადასტრი, დენდროლოგიური ექსპერტიზა და ტყის აღდგენა — GREENWISE-ის გარემოსდაცვითი მომსახურება.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  const services = getServices()

  return (
    <>
      <PageHeader
        eyebrow="სერვისები"
        title="გარემოსდაცვითი კვლევები და ექსპერტიზა"
        description="ოთხი ძირითადი მიმართულება, რომელიც ფარავს პროექტის გარემოსდაცვით მოთხოვნებს დაგეგმვიდან ნებართვის შემდგომ მონიტორინგამდე."
      />

      <div className="section-y band-dark">
        <div className="container-page flex flex-col gap-24 md:gap-32">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14"
            >
              <Reveal className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <span className="grid size-12 place-items-center rounded-xl bg-green-500/15 text-green-500">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>
                <h2 className="heading-lg mt-6 text-white">
                  {service.title}
                </h2>
                <p className="prose-measure mt-5 text-[1.0625rem] text-white/75">
                  {service.description}
                </p>

                <Photo
                  src={`/photos/service-${service.slug}.jpg`}
                  alt={service.title}
                  ratio="16 / 10"
                  seed={index + 7}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="mt-8"
                />

                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.audience.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary">{item}</Badge>
                    </li>
                  ))}
                </ul>

                <Button asChild variant="outline" className="group mt-8 h-12 border-white/12 px-6 text-green-500 hover:bg-green-500/15 hover:text-white">
                  <Link href={`/services/${service.slug}`}>
                    დეტალური გვერდი
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </Button>
              </Reveal>

              <Reveal
                delay={120}
                className={cn(
                  "grid content-start gap-5 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1 lg:self-start",
                  index % 2 === 1 && "lg:order-1"
                )}
              >
                <div className="rounded-2xl border border-white/12 bg-teal-700/50 p-7">
                  <h3 className="text-base font-semibold text-white">
                    რას მოიცავს
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.covers.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-white/75">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-green-500/30 bg-green-500/15 p-7">
                  <h3 className="text-base font-semibold text-white">
                    რატომ გჭირდებათ
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.whyNeeded.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-green-500">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  )
}
