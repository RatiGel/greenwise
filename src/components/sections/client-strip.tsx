import Link from "next/link"

import { getClients } from "@/content/clients"
import { Reveal } from "@/components/ui/reveal"

export function ClientStrip() {
  const clients = getClients().slice(0, 10)

  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground">
            გვენდობიან დეველოპერები, მუნიციპალიტეტები და საერთაშორისო ორგანიზაციები
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex items-center justify-center rounded-lg border border-border/70 bg-card px-4 py-5 text-center text-sm font-medium text-ink-600 transition-colors hover:border-forest-500/40 hover:text-forest-800"
              >
                {client.name}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200} className="mt-8 text-center">
          <Link
            href="/clients"
            className="text-sm font-medium text-forest-700 underline-offset-4 hover:underline"
          >
            ყველა კლიენტის ნახვა
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
