import { cn } from "cn"
import { mission } from "@/content/about"
import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { Photo } from "@/components/ui/photo"
import { PillCta } from "@/components/ui/pill-cta"
import { Reveal } from "@/components/ui/reveal"

/**
 * Four tiles on a 5×6 grid, sized 3×4, 2×2, 2×4 and 3×2. The horizontal seams
 * fall on different rows in each column, so the tiles interlock like bricks
 * instead of forming a plain 2×2 grid. Order follows the work process.
 * From `lg` the mosaic drops its aspect ratio and takes the text column's
 * height, so the photos never make the section taller than the copy.
 */
const processTiles = [
  {
    src: "/photos/about-team.jpg",
    altKey: "aboutProcessFieldwork",
    area: "col-start-1 col-span-3 row-start-1 row-span-4",
    sizes: "(min-width: 1024px) 30vw, 60vw",
  },
  {
    src: "/photos/service-tree-inventory.jpg",
    altKey: "aboutProcessInventory",
    area: "col-start-4 col-span-2 row-start-1 row-span-2",
    sizes: "(min-width: 1024px) 20vw, 40vw",
  },
  {
    src: "/photos/service-dendrology.jpg",
    altKey: "aboutProcessMeasure",
    area: "col-start-4 col-span-2 row-start-3 row-span-4",
    sizes: "(min-width: 1024px) 20vw, 40vw",
  },
  {
    src: "/photos/service-forest-restoration.jpg",
    altKey: "aboutProcessRestore",
    area: "col-start-1 col-span-3 row-start-5 row-span-2",
    sizes: "(min-width: 1024px) 30vw, 60vw",
  },
] as const

/**
 * The home page's single "About" band: headline and copy at left with the
 * work-process mosaic at right, then mission and vision beneath on the same
 * column grid, so the whole band reads as one section rather than two.
 */
const columns = "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-x-16"

export async function AboutIntro() {
  const locale = await getLocale()
  const dict = await getDictionary()

  const statements = [
    {
      title: dict.home.missionNumberOneTitle,
      body: dict.home.missionNumberOneBody,
    },
    {
      title: dict.home.missionNumberTwoTitle,
      body: dict.home.missionNumberTwoBody,
    },
  ]

  return (
    <section className="section-y-lg band-light">
      <div className="container-page">
        <div className={cn("grid gap-12", columns)}>
          <div>
            <Reveal>
              <h2 className="heading-lg text-on-light">
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

          <ol className="grid aspect-square grid-cols-5 grid-rows-6 gap-3 sm:gap-4 lg:aspect-auto">
            {processTiles.map((tile, index) => (
              <Reveal
                as="li"
                key={tile.src}
                delay={80 + index * 80}
                className={cn("relative", tile.area)}
              >
                <Photo
                  src={tile.src}
                  alt={dict.home[tile.altKey]}
                  bleed
                  className="isolate size-full"
                  seed={index}
                  sizes={tile.sizes}
                />
              </Reveal>
            ))}
          </ol>
        </div>

        <ul
          className={cn(
            "mt-16 grid gap-10 border-t border-line-light pt-12 md:grid-cols-2 md:gap-x-12 lg:mt-20",
            columns
          )}
        >
          {statements.map((statement, index) => (
            <Reveal as="li" key={statement.title} delay={index * 120}>
              <h3 className="text-2xl font-semibold text-on-light">
                {statement.title}
              </h3>
              <p className="prose-measure mt-4 text-on-light-muted">
                {statement.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
