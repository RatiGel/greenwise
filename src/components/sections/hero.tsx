import { stats } from "@/content/about"
import { siteConfig } from "@/config/site"
import { CountUp } from "@/components/ui/count-up"
import { Photo } from "@/components/ui/photo"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { buildWhatsAppQuickUrl } from "@/lib/whatsapp"

/**
 * Full-bleed photographic hero: the image runs edge to edge and the headline
 * sits on top of it, over a scrim. Matches the reference's opening.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden band-dark">
      {/* Backdrop: photo + scrim wrapped together so the scrim cannot rise
          above the content that follows it. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo
          src="/photos/hero.jpg"
          alt=""
          priority
          seed={1}
          sizes="100vw"
          bleed
          className="absolute inset-0 size-full rounded-none"
        />
        <div className="hero-scrim" />
      </div>

      <div className="relative container-page flex min-h-[min(88svh,56rem)] flex-col justify-end pt-32 pb-16 lg:pb-20">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="heading-xl text-white">
              გარემოსდაცვითი დოკუმენტაცია, რომელიც{" "}
              <span className="text-green-500">ნებართვას აჩქარებს</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="prose-measure mt-7 text-lg text-white/85">
              ბიომრავალფეროვნების შეფასება, ხე-მცენარეთა ინვენტარიზაცია,
              დენდროლოგიური ექსპერტიზა და ტყის აღდგენა — საველე მონაცემებზე
              დაფუძნებული კვლევები.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-3">
              <PillCta href="/contact">უფასო კონსულტაცია</PillCta>
              <PillCta href={buildWhatsAppQuickUrl()} tone="onDark" external>
                WhatsApp
              </PillCta>
            </div>
          </Reveal>
        </div>

        {/* Stat strip pinned to the bottom of the image, as in the reference. */}
        <Reveal delay={300}>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/20 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp
                    value={stat.value}
                    className="block text-3xl font-bold text-green-500 sm:text-4xl"
                  />
                  <span className="mt-2 block text-sm leading-snug text-white/75">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Vertical contact rail, mirroring the reference's LinkedIn rail. */}
      <a
        href={`tel:${siteConfig.contact.phoneHref}`}
        className="absolute end-6 top-1/2 hidden -translate-y-1/2 items-center gap-3 text-sm text-white/70 transition-colors hover:text-green-500 xl:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span dir="ltr" className="font-display tracking-wide">
          {siteConfig.contact.phone}
        </span>
      </a>
    </section>
  )
}
