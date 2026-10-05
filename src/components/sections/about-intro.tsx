import { mission, stats } from "@/content/about"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { CountUp } from "@/components/ui/count-up"
import { Photo } from "@/components/ui/photo"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionLabel } from "@/components/layout/section"

/**
 * Light band: headline and copy at left, photo plus stats at right, with the
 * mission/vision pair beneath — the reference's "Who We Are" section.
 */
export async function AboutIntro() {
  const locale = await getLocale()
  const dict = await getDictionary()

  return (
    <section className="section-y-lg band-light">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel lead>
                {dict.home.aboutEyebrow}
              </SectionLabel>
              <h2 className="heading-lg mt-5 text-on-light">
                {mission.heading[locale]}
              </h2>
              <p className="prose-measure mt-6 text-on-light-muted">
                {mission.body[locale]}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <PillCta
                href={localizedPath("/about", locale)}
                tone="onLight"
                className="mt-9"
              >
                {dict.home.aboutCta}
              </PillCta>
            </Reveal>
          </div>

          <div className="grid gap-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-start">
            <Reveal delay={80}>
              <Photo
                src="/photos/about-team.jpg"
                alt={dict.home.aboutTeamPhotoAlt}
                ratio="4 / 5"
                seed={2}
                sizes="(min-width: 640px) 26vw, 100vw"
              />
            </Reveal>

            <Reveal delay={160}>
              <h3 className="text-2xl leading-snug font-semibold text-on-light">
                {dict.home.aboutExperienceHeading}
              </h3>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-light pt-7">
                {stats.slice(0, 4).map((stat) => (
                  <div key={stat.label[locale]}>
                    <dt className="sr-only">{stat.label[locale]}</dt>
                    <dd>
                      <CountUp
                        value={stat.value[locale]}
                        className="block text-3xl font-bold text-on-light"
                      />
                      <span className="mt-1.5 block text-sm leading-snug text-on-light-muted">
                        {stat.label[locale]}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
