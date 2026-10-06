import { getClients } from "@/content/clients"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { ClientRoller } from "@/components/sections/client-roller"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { SectionLabel } from "@/components/layout/section"

export async function ClientStrip() {
  const clients = getClients()
  const locale = await getLocale()
  const dict = await getDictionary()

  // Shorter bottom padding: the roller's arrow row already adds height, and
  // the CTA band below is dark too, so a full gap reads as empty.
  return (
    <section className="band-dark relative isolate pt-20 pb-10 md:pt-28 md:pb-14">
      <SectionBackdrop src="/photos/backdrop-clients.jpg" seed={11} />
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel lead>{dict.home.clientsEyebrow}</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-2xl leading-snug font-semibold text-white sm:text-3xl">
              {dict.home.clientsTitle}
              <span className="text-green-500">{dict.home.clientsAccent}</span>
            </h2>
          </div>
          <PillCta
            href={localizedPath("/clients", locale)}
            tone="onDark"
            className="shrink-0"
          >
            {dict.cta.allClients}
          </PillCta>
        </Reveal>

        <Reveal delay={120}>
          <ClientRoller
            names={clients.map((client) => ({
              id: client.id,
              name: client.name[locale],
            }))}
            prevLabel={dict.home.clientsPrev}
            nextLabel={dict.home.clientsNext}
          />
        </Reveal>
      </div>
    </section>
  )
}
