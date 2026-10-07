import { getClients } from "@/content/clients"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { SectionLabel } from "@/components/layout/section"

/** Seconds each tile takes to travel its own width — keeps the pace steady
    however many partners there are. */
const SECONDS_PER_TILE = 3.5

export async function ClientStrip() {
  const clients = getClients()
  const locale = await getLocale()
  const dict = await getDictionary()

  const names = clients.map((client) => ({
    id: client.id,
    name: client.name[locale],
  }))

  const tiles = (clone: boolean) =>
    names.map((client) => (
      <li
        key={`${clone ? "b" : "a"}-${client.id}`}
        aria-hidden={clone || undefined}
        className={clone ? "marquee-clone shrink-0 pe-4 lg:pe-5" : "shrink-0 pe-4 lg:pe-5"}
      >
        <div className="group/tile flex h-32 w-56 items-center gap-4 rounded-[1.25rem] border border-white/12 bg-teal-900/70 px-6 backdrop-blur-sm transition-[border-color,background-color] duration-500 ease-out-quint hover:border-green-500/50 hover:bg-teal-700/80 sm:w-64">
          <span
            aria-hidden
            className="font-display grid size-11 shrink-0 place-items-center rounded-full bg-green-500/15 text-lg font-bold text-green-500 transition-colors duration-500 group-hover/tile:bg-green-500 group-hover/tile:text-teal-900"
          >
            {client.name.charAt(0)}
          </span>
          <span className="text-[0.9375rem] leading-snug font-medium text-white/80 transition-colors duration-500 group-hover/tile:text-white">
            {client.name}
          </span>
        </div>
      </li>
    ))

  return (
    <section className="band-dark relative isolate py-20 md:py-28">
      <SectionBackdrop src="/photos/backdrop-clients.jpg" seed={11} />
      <div className="container-page">
        <Reveal>
          <SectionLabel lead>{dict.home.clientsEyebrow}</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-2xl leading-snug font-semibold text-white sm:text-3xl">
            {dict.home.clientsTitle}
          </h2>
        </Reveal>
      </div>

      {/* Full-bleed so tiles drift in from the screen edge, not the column. */}
      <Reveal delay={120} className="marquee mt-12 md:mt-14">
        <ul
          className="marquee-track"
          style={{
            ["--marquee-duration" as string]: `${names.length * SECONDS_PER_TILE}s`,
          }}
        >
          {tiles(false)}
          {tiles(true)}
        </ul>
      </Reveal>
    </section>
  )
}
