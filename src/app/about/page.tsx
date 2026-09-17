import type { Metadata } from "next"
import Image from "next/image"
import { Award, ShieldCheck } from "lucide-react"

import { certifications, milestones, mission, stats } from "@/content/about"
import { getTeam } from "@/content/team"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "ჩვენ შესახებ",
  description:
    "GREENWISE — გარემოსდაცვითი კონსალტინგის კომპანია 13+ წლიანი გამოცდილებით. გაიცანით ჩვენი მისია, გუნდი, გამოცდილება და სერტიფიკატები.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  const team = getTeam()

  return (
    <>
      <PageHeader
        eyebrow="ჩვენ შესახებ"
        title="გუნდი, რომელიც გარემოსდაცვით რისკს ციფრებში თარგმნის"
        description="2012 წლიდან ვამზადებთ კვლევებს, რომლებსაც მარეგულირებელი იღებს და დამკვეთი პროექტის დაგეგმვაში იყენებს."
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-medium text-forest-600">მისია</p>
            <h2 className="mt-3 text-3xl font-semibold text-forest-900 sm:text-4xl">
              {mission.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {mission.body}
            </p>
          </Reveal>

          <ul className="flex flex-col gap-5">
            {mission.pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 90}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="text-base font-semibold text-forest-900">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

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

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="გამოცდილება"
            title="როგორ განვვითარდით"
            description="კომპანიის ისტორია მოკლედ — დაარსებიდან მრავალწლიან აღდგენით პროგრამებამდე."
          />

          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.year} delay={index * 90}>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl font-semibold text-forest-700">
                    {milestone.year}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-gradient-to-r from-forest-500/40 to-transparent"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-forest-900">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {milestone.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-forest-50/60">
        <div className="container-page">
          <SectionHeading
            eyebrow="გუნდი"
            title="სპეციალისტები, რომლებიც პროექტზე მუშაობენ"
            description="თითოეულ პროექტს ჰყავს პასუხისმგებელი ექსპერტი, რომელთანაც პირდაპირ კომუნიკაცია გაქვთ."
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal
                as="li"
                key={member.id}
                delay={index * 90}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/5] w-full bg-forest-100">
                  <Image
                    src={member.photo}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-forest-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-forest-700">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                  {member.credentials?.length ? (
                    <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
                      {member.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <ShieldCheck
                            aria-hidden
                            className="mt-0.5 size-3.5 shrink-0 text-forest-600"
                          />
                          {credential}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="ლიცენზიები და სერტიფიკატები"
            title="ოფიციალური აღიარება"
            description="ჩვენი დასკვნები ეყრდნობა აკრედიტებულ მეთოდოლოგიასა და სერტიფიცირებულ ექსპერტიზას."
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((certification, index) => (
              <Reveal
                as="li"
                key={certification.id}
                delay={index * 80}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <Award aria-hidden className="size-6 text-forest-600" />
                <h3 className="mt-5 flex-1 text-base font-semibold text-forest-900">
                  {certification.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {certification.issuer}
                </p>
                <p className="mt-1 text-sm font-medium text-forest-700">
                  {certification.year}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
