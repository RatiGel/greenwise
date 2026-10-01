import type { Metadata } from "next"

import { Hero } from "@/components/sections/hero"
import { WhyChoose } from "@/components/sections/why-choose"
import { AboutIntro } from "@/components/sections/about-intro"
import { MissionVision } from "@/components/sections/mission-vision"
import { ServiceCards } from "@/components/sections/service-cards"
import { MethodologyTeaser } from "@/components/sections/methodology-teaser"
import { ClientStrip } from "@/components/sections/client-strip"
import { CtaBand } from "@/components/sections/cta-band"

export const metadata: Metadata = {
  title: "გარემოსდაცვითი კონსალტინგი — ბიომრავალფეროვნება, დენდროლოგია, ტყის აღდგენა",
  description:
    "GREENWISE ამზადებს ბიომრავალფეროვნების შეფასებას, ხე-მცენარეთა ინვენტარიზაციასა და კადასტრს, დენდროლოგიურ ექსპერტიზასა და ტყის აღდგენის პროექტებს. საველე მონაცემებზე დაფუძნებული დოკუმენტაცია გზშ-სა და ნებართვისთვის.",
  alternates: { canonical: "/" },
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
