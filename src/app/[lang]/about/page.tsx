import type { Metadata } from "next"
import Image from "next/image"
import { Award, ShieldCheck } from "lucide-react"

import { certifications, milestones, mission, stats } from "@/content/about"
import { getTeam } from "@/content/team"
import { PageHeader } from "@/components/sections/page-header"
import { MissionVision } from "@/components/sections/mission-vision"
import { CtaBand } from "@/components/sections/cta-band"
import { SectionHeading, SectionLabel } from "@/components/layout/section"
import { CountUp } from "@/components/ui/count-up"
import { Photo } from "@/components/ui/photo"
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

      <section className="section-y-lg band-dark">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>მისია</SectionLabel>
            <h2 className="heading-lg mt-5 text-white">{mission.heading}</h2>
            <p className="prose-measure mt-5 text-[1.0625rem] text-white/75">
              {mission.body}
            </p>
            <Photo
              src="/photos/about-team.jpg"
              alt="GREENWISE-ის გუნდი საველე სამუშაოზე"
              ratio="16 / 10"
              seed={6}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="mt-9"
            />
          </Reveal>

          <ul className="flex flex-col">
            {mission.pillars.map((pillar, index) => (
              <Reveal
                as="li"
                key={pillar.title}
                delay={index * 90}
                className="border-t border-white/12 py-7 first:border-t-0 first:pt-0"
              >
                <h3 className="text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/75">
                  {pillar.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <MissionVision />

      <section className="border-y border-white/12 band-dark">
        <div className="container-page py-14">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp
                    value={stat.value}
                    className="block text-4xl font-bold text-green-500 sm:text-5xl"
                  />
                  <span className="mt-2.5 block text-sm text-white/65">
                    {stat.label}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-y band-dark">
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
                  <span className="font-display text-2xl font-bold text-green-500">
                    {milestone.year}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-gradient-to-r from-green-500/45 to-transparent"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {milestone.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y band-dark">
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
              >
                {/* The lift lives on an inner wrapper, not on Reveal itself:
                    both drive `transform`, so sharing one node would let a
                    hover cancel the reveal's slide-up mid-animation. */}
                <div className="group h-full overflow-hidden rounded-2xl border border-white/12 bg-teal-700/50 transition-[transform,box-shadow] duration-400 ease-out-quint hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25">
                  <div className="relative aspect-[4/5] w-full bg-teal-700">
                    <Image
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 transition-transform duration-400 ease-out-quint motion-safe:group-hover:-translate-y-1">
                    <h3 className="text-base font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-green-500">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      {member.bio}
                    </p>
                    {member.credentials?.length ? (
                      <ul className="mt-4 flex flex-col gap-1.5 border-t border-white/12 pt-4">
                        {member.credentials.map((credential) => (
                          <li
                            key={credential}
                            className="flex items-start gap-2 text-xs text-white/75"
                          >
                            <ShieldCheck
                              aria-hidden
                              className="mt-0.5 size-3.5 shrink-0 text-green-500"
                            />
                            {credential}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y band-dark">
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
                className="flex"
              >
                {/* Lift on an inner element — Reveal owns this node's transform. */}
                <div className="group/card flex h-full w-full flex-col rounded-2xl border border-white/12 bg-teal-700/50 p-6 transition-[transform,box-shadow] duration-400 ease-out-quint hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25">
                  <Award aria-hidden className="size-6 text-green-500" />
                  <div className="flex flex-1 flex-col transition-transform duration-400 ease-out-quint motion-safe:group-hover/card:translate-x-1">
                    <h3 className="mt-5 flex-1 text-base font-semibold text-white">
                      {certification.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/75">
                      {certification.issuer}
                    </p>
                    <p className="font-display mt-1 text-sm font-bold text-green-500">
                      {certification.year}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
