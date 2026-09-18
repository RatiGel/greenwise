import { getClients } from "@/content/clients"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { SectionLabel } from "@/components/layout/section"

export function ClientStrip() {
  const clients = getClients().slice(0, 12)

  return (
    <section className="section-y band-dark relative isolate">
      <SectionBackdrop src="/photos/backdrop-clients.jpg" seed={11} />
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>კლიენტები</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-2xl leading-snug font-semibold text-white sm:text-3xl">
              გვენდობიან დეველოპერები, მუნიციპალიტეტები და{" "}
              <span className="text-green-500">საერთაშორისო ორგანიზაციები</span>
            </h2>
          </div>
          <PillCta href="/clients" tone="onDark" className="shrink-0">
            ყველა კლიენტი
          </PillCta>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-white/12 bg-white/12 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex min-h-[6rem] items-center justify-center bg-teal-900 px-5 py-6 text-center text-sm font-medium text-white/75 transition-[background-color,color,transform] duration-300 ease-out-quint hover:z-10 hover:scale-[1.03] hover:bg-teal-700 hover:text-white"
              >
                {client.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
