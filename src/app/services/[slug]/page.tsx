import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"

import { getServiceBySlug, getServices } from "@/content/services"
import { getMethodologySteps } from "@/content/methodology"
import { siteConfig } from "@/config/site"
import { ServiceIcon } from "@/components/service-icon"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Reveal } from "@/components/ui/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) return {}

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.shortDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) notFound()

  const otherServices = getServices().filter((item) => item.slug !== service.slug)
  const steps = getMethodologySteps()

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    serviceType: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Georgia" },
    url: `${siteConfig.url}/services/${service.slug}`,
  }

  return (
    <>
      <PageHeader
        eyebrow="სერვისი"
        title={service.title}
        description={service.shortDescription}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="grid size-12 place-items-center rounded-lg bg-forest-50 text-forest-700">
                <ServiceIcon name={service.icon} className="size-6" />
              </span>
              <h2 className="mt-6 text-2xl font-semibold text-forest-900">
                აღწერა
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-12">
              <h2 className="text-2xl font-semibold text-forest-900">
                რას მოიცავს
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.covers.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <h2 className="text-2xl font-semibold text-forest-900">
                რატომ გჭირდებათ
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {service.whyNeeded.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-lg border border-forest-500/25 bg-forest-50/70 p-5"
                  >
                    <span className="font-heading text-sm font-semibold text-forest-600">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-forest-800/90">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-forest-900">
                ვისთვის არის
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.audience.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary">{item}</Badge>
                  </li>
                ))}
              </ul>

              <h2 className="mt-7 text-sm font-semibold text-forest-900">
                როგორ მიმდინარეობს
              </h2>
              <ol className="mt-4 flex flex-col gap-3">
                {steps.map((step) => (
                  <li key={step.id} className="flex gap-3 text-sm">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest-50 font-heading text-xs font-semibold text-forest-700">
                      {step.step}
                    </span>
                    <span className="text-muted-foreground">{step.title}</span>
                  </li>
                ))}
              </ol>

              <Button asChild className="group mt-7 w-full">
                <Link href="/contact">
                  ფასის მოთხოვნა
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </Button>
            </Reveal>

            <Reveal delay={100} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-forest-900">
                სხვა სერვისები
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                {otherServices.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-ink-600 transition-colors hover:bg-forest-50 hover:text-forest-800"
                    >
                      {item.title}
                      <ArrowRight
                        aria-hidden
                        className="size-4 shrink-0 text-forest-600 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  )
}
