import { Reveal } from "@/components/ui/reveal"

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-border bg-forest-900">
      <div className="container-page py-16 md:py-20">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Reveal>
              <p className="text-sm font-medium text-forest-500">{eyebrow}</p>
            </Reveal>
          ) : null}
          <Reveal delay={60}>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={140}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-clay-200">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
