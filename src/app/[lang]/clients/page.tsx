import type { Metadata } from "next"
import { Building2, Landmark, PenTool, Users } from "lucide-react"

import { getClients, sectorLabels } from "@/content/clients"
import type { ClientSector } from "@/types/content"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Reveal } from "@/components/ui/reveal"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dict = await getDictionary()

  return {
    title: dict.clients.metaTitle,
    description: dict.clients.metaDescription,
    alternates: { canonical: localizedPath("/clients", locale) },
  }
}

const sectorIcons: Record<ClientSector, typeof Building2> = {
  developers: Building2,
  municipalities: Landmark,
  ngos: Users,
  architects: PenTool,
}

export default async function ClientsPage() {
  const clients = getClients()
  const locale = await getLocale()
  const dict = await getDictionary()

  const sectorNotes: Record<ClientSector, string> = {
    developers: dict.clients.noteDevelopers,
    municipalities: dict.clients.noteMunicipalities,
    ngos: dict.clients.noteNgos,
    architects: dict.clients.noteArchitects,
  }

  return (
    <>
      <PageHeader
        eyebrow={dict.clients.eyebrow}
        title={dict.clients.title}
        description={dict.clients.description}
      />

      <div className="section-y band-dark">
        <div className="container-page flex flex-col gap-16 md:gap-20">
          {sectorLabels.map((sector, sectorIndex) => {
            const sectorClients = clients.filter(
              (client) => client.sector === sector.value
            )
            if (sectorClients.length === 0) return null

            const Icon = sectorIcons[sector.value]

            return (
              <section key={sector.value} aria-labelledby={`sector-${sector.value}`}>
                <Reveal delay={sectorIndex * 60}>
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-green-500/15 text-green-500">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h2
                        id={`sector-${sector.value}`}
                        className="text-2xl font-semibold text-white"
                      >
                        {sector.label[locale]}
                      </h2>
                      <p className="prose-measure mt-2.5 text-white/75">
                        {sectorNotes[sector.value]}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {sectorClients.map((client, index) => (
                    <Reveal
                      as="li"
                      key={client.id}
                      delay={index * 60}
                      className="group/tile flex min-h-[5.5rem] items-center justify-center rounded-xl border border-white/12 bg-teal-700/50 px-4 py-5 text-center text-sm font-medium text-white/75 transition-colors duration-300 hover:border-green-500/45 hover:bg-green-500/15 hover:text-green-500"
                    >
                      {/* The name is its own element so it can lift without
                          touching Reveal's transform on the tile. */}
                      <span className="transition-transform duration-300 ease-out-quint motion-safe:group-hover/tile:-translate-y-0.5">
                        {client.name[locale]}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </section>
            )
          })}

          <Reveal className="rounded-2xl border border-white/12 bg-teal-700/50 p-6 text-sm leading-relaxed text-white/75">
            {dict.clients.confidentialityNote}
          </Reveal>
        </div>
      </div>

      <CtaBand
        title={dict.clients.ctaTitle}
        description={dict.clients.ctaDescription}
      />
    </>
  )
}
