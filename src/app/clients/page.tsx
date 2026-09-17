import type { Metadata } from "next"
import { Building2, Landmark, PenTool, Users } from "lucide-react"

import { getClients, sectorLabels } from "@/content/clients"
import type { ClientSector } from "@/types/content"
import { PageHeader } from "@/components/sections/page-header"
import { CtaBand } from "@/components/sections/cta-band"
import { Reveal } from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "კლიენტები",
  description:
    "დეველოპერები, მუნიციპალიტეტები, არასამთავრობო ორგანიზაციები და არქიტექტურული ბიუროები, რომლებთანაც GREENWISE თანამშრომლობს.",
  alternates: { canonical: "/clients" },
}

const sectorIcons: Record<ClientSector, typeof Building2> = {
  developers: Building2,
  municipalities: Landmark,
  ngos: Users,
  architects: PenTool,
}

const sectorNotes: Record<ClientSector, string> = {
  developers:
    "საცხოვრებელი და კომერციული პროექტების გარემოსდაცვითი დოკუმენტაცია და ხე-მცენარეთა კადასტრი.",
  municipalities:
    "საჯარო სივრცეების დენდროლოგიური აუდიტი, ინვენტარიზაცია და გამწვანების დაგეგმვა.",
  ngos: "ბიომრავალფეროვნების კვლევები და აღდგენითი პროგრამების მონიტორინგი.",
  architects:
    "ადრეულ ეტაპზე ჩართვა, რათა პროექტი ღირებულ ნარგაობას მოერგოს.",
}

export default function ClientsPage() {
  const clients = getClients()

  return (
    <>
      <PageHeader
        eyebrow="კლიენტები"
        title="ვისთან ერთად ვმუშაობთ"
        description="240-ზე მეტი დასრულებული პროექტი კერძო დეველოპერებთან, მუნიციპალიტეტებთან, დონორ ორგანიზაციებთან და არქიტექტურულ ბიუროებთან."
      />

      <div className="section-y">
        <div className="container-page flex flex-col gap-16">
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
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-forest-50 text-forest-700">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h2
                        id={`sector-${sector.value}`}
                        className="text-xl font-semibold text-forest-900 sm:text-2xl"
                      >
                        {sector.label}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
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
                      className="flex min-h-24 items-center justify-center rounded-lg border border-border bg-card px-4 py-5 text-center text-sm font-medium text-ink-600 transition-colors hover:border-forest-500/40 hover:text-forest-800"
                    >
                      {client.name}
                    </Reveal>
                  ))}
                </ul>
              </section>
            )
          })}

          <Reveal className="rounded-xl border border-border bg-muted/50 p-6 text-sm leading-relaxed text-muted-foreground">
            ზოგიერთი პროექტი კონფიდენციალურობის შეთანხმებით არის დაფარული, ამიტომ
            სიაში ყველა დამკვეთი არ არის წარმოდგენილი. მოთხოვნისას მოგაწვდით
            შესაბამისი გამოცდილების რეფერენსებს.
          </Reveal>
        </div>
      </div>

      <CtaBand
        title="გსურთ მსგავსი პროექტის განხილვა?"
        description="მოგვწერეთ, რა ტიპის ობიექტზე მუშაობთ — გაგიზიარებთ შესაბამის გამოცდილებასა და სავარაუდო ვადებს."
      />
    </>
  )
}
