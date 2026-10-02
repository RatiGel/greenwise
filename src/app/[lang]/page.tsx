import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { Hero } from "@/components/sections/hero"
import { WhyChoose } from "@/components/sections/why-choose"
import { AboutIntro } from "@/components/sections/about-intro"
import { MissionVision } from "@/components/sections/mission-vision"
import { ServiceCards } from "@/components/sections/service-cards"
import { MethodologyTeaser } from "@/components/sections/methodology-teaser"
import { ClientStrip } from "@/components/sections/client-strip"
import { CtaBand } from "@/components/sections/cta-band"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dict = await getDictionary()

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    alternates: {
      canonical: localizedPath("/", locale),
      languages: {
        ka: localizedPath("/", "ka"),
        en: localizedPath("/", "en"),
        "x-default": localizedPath("/", "ka"),
      },
    },
    // `opengraph-image.tsx` lives in this same route segment (`[lang]/`), so
    // without an explicit `openGraph.images` here Next merges in that file's
    // own auto-resolved, content-hashed URL — which still carries the `/ka`
    // prefix for Georgian — overriding whatever the layout's
    // `generateMetadata` set. See `[lang]/layout.tsx` for the same pattern;
    // keep both in sync.
    openGraph: {
      images: [
        {
          url: `${siteConfig.url}${localizedPath("/opengraph-image", locale)}`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline.en}`,
        },
      ],
    },
    twitter: {
      images: [`${siteConfig.url}${localizedPath("/opengraph-image", locale)}`],
    },
  }
}

export default function HomePage() {
  return (
    <>
      {/* Bands alternate dark → light → dark, as in the reference. */}
      <Hero />
      <WhyChoose />
      <AboutIntro />
      <MissionVision />
      <ServiceCards />
      <MethodologyTeaser />
      <ClientStrip />
      <CtaBand />
    </>
  )
}
