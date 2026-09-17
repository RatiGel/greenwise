import type { Metadata } from "next"

import { Hero } from "@/components/sections/hero"
import { ServiceCards } from "@/components/sections/service-cards"
import { StatsBand } from "@/components/sections/stats-band"
import { ClientStrip } from "@/components/sections/client-strip"
import { MethodologyTeaser } from "@/components/sections/methodology-teaser"
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
      <Hero />
      <ServiceCards />
      <StatsBand />
      <MethodologyTeaser />
      <ClientStrip />
      <CtaBand />
    </>
  )
}
