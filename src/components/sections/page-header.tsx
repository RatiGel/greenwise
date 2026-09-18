import { Reveal } from "@/components/ui/reveal"
import { Photo } from "@/components/ui/photo"
import { SectionLabel } from "@/components/layout/section"

/**
 * Inner-page hero. Shares the homepage's photographic treatment at a reduced
 * height so inner pages read as the same site.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  seed = 9,
  photo = "/photos/page-header.jpg",
}: {
  eyebrow?: string
  title: string
  accent?: string
  description?: string
  seed?: number
  /** Override per page when a more specific image suits the subject. */
  photo?: string
}) {
  const [before, after] = accent ? splitOnce(title, accent) : [title, ""]

  return (
    <section className="relative isolate overflow-hidden band-dark">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo
          src={photo}
          alt=""
          priority
          seed={seed}
          bleed
          sizes="100vw"
          className="absolute inset-0 size-full rounded-none"
        />
        <div className="hero-scrim" />
      </div>

      <div className="relative container-page pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Reveal>
              <SectionLabel>{eyebrow}</SectionLabel>
            </Reveal>
          ) : null}
          <Reveal delay={60}>
            <h1 className="heading-xl mt-5 text-white">
              {before}
              {accent ? <span className="text-green-500">{accent}</span> : null}
              {after}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={140}>
              <p className="prose-measure mt-6 text-lg text-white/85">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function splitOnce(title: string, accent: string): [string, string] {
  const at = title.indexOf(accent)
  if (at === -1) return [title, ""]
  return [title.slice(0, at), title.slice(at + accent.length)]
}
