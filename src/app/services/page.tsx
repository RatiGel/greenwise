import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { getServices } from "@/content/services"
import { ServiceIcon } from "@/components/service-icon"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
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

      <div className="section-y">
        <div className="container-page flex flex-col gap-20 md:gap-28">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
            >
              <Reveal>
                <span className="grid size-12 place-items-center rounded-lg bg-forest-50 text-forest-700">
                  <ServiceIcon name={service.icon} className="size-6" />
                </span>
                <p className="mt-6 font-heading text-sm font-medium text-forest-600">
                  0{index + 1}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-forest-900 sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.audience.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary">{item}</Badge>
                    </li>
                  ))}
                </ul>

                <Button asChild variant="outline" className="group mt-8">
                  <Link href={`/services/${service.slug}`}>
                    დეტალური გვერდი
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </Button>
              </Reveal>

              <Reveal delay={120} className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-sm font-semibold text-forest-900">
                    რას მოიცავს
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.covers.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-forest-500/25 bg-forest-50/70 p-6">
                  <h3 className="text-sm font-semibold text-forest-900">
                    რატომ გჭირდებათ
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.whyNeeded.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-forest-800/90">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-600" />
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
