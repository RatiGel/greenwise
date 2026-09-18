import Link from "next/link"
import { ArrowRight, ClipboardCheck, Gauge, ShieldCheck } from "lucide-react"

import { cn } from "cn"
import { Reveal } from "@/components/ui/reveal"
import { SectionBackdrop } from "@/components/ui/section-backdrop"
import { SectionHeading } from "@/components/layout/section"

const reasons = [
  {
    icon: ShieldCheck,
    title: "მარეგულირებლის ფორმატში",
    description:
      "დოკუმენტს ვამზადებთ იმ სტრუქტურით, რომელსაც უწყება ელოდება — ამიტომ კვლევა პირველივე წარდგენისას გადის.",
    href: "/methodology",
    linkLabel: "როგორ ვმუშაობთ",
  },
  {
    icon: ClipboardCheck,
    title: "შემოწმებადი საველე მონაცემი",
    description:
      "თითოეული დასკვნის უკან დგას GPS-კოორდინატი, ფოტოფიქსაცია და GIS ბაზა, რომელსაც თქვენც იღებთ.",
    href: "/services/tree-inventory",
    linkLabel: "ინვენტარიზაცია",
  },
  {
    icon: Gauge,
    title: "ფიქსირებული ვადა და ფასი",
    description:
      "სამუშაო ფარგლების შეთანხმების შემდეგ ვადა და ღირებულება აღარ იცვლება.",
    href: "/contact",
    linkLabel: "შეთავაზების მიღება",
  },
]

/**
 * Three cards where the last is filled bright green — the reference's way of
 * breaking an otherwise uniform row.
 */
export function WhyChoose() {
  return (
    <section className="section-y band-dark relative isolate">
      <SectionBackdrop src="/photos/backdrop-why.jpg" seed={7} />
      <div className="container-page">
        <SectionHeading
          eyebrow="რატომ GREENWISE"
          title="კვლევა, რომელიც ნებართვას აჩქარებს"
          accent="ნებართვას აჩქარებს"
          description="გარემოსდაცვითი დოკუმენტი ორ რამეზე ჩერდება: არასრულ მონაცემზე და არასწორ ფორმატზე. ორივეს თავიდან აცილება ჩვენი სამუშაოა."
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => {
            const filled = index === reasons.length - 1

            return (
              <Reveal as="li" key={reason.title} delay={index * 90}>
                <div
                  className={cn(
                    "group/card flex h-full flex-col rounded-[1.25rem] p-8 transition-[transform,background-color,box-shadow] duration-400 ease-out-quint hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25",
                    filled
                      ? "bg-green-500 text-teal-900"
                      : "border border-white/12 bg-teal-700/60 text-white hover:bg-teal-700"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-full",
                      filled ? "bg-teal-900 text-green-500" : "bg-green-500 text-teal-900"
                    )}
                  >
                    <reason.icon aria-hidden className="size-6" />
                  </span>

                  {/* Copy shifts on hover while the icon badge stays put, so
                      the card reads as one object with a fixed anchor. */}
                  <div className="flex flex-1 flex-col transition-transform duration-400 ease-out-quint motion-safe:group-hover/card:translate-x-1">
                    <h3 className="mt-7 text-xl font-semibold">{reason.title}</h3>
                    <p
                      className={cn(
                        "mt-3 flex-1 leading-relaxed",
                        filled ? "text-teal-900" : "text-white/75"
                      )}
                    >
                      {reason.description}
                    </p>
                  </div>

                  <Link
                    href={reason.href}
                    className={cn(
                      "group/link mt-7 inline-flex items-center gap-2 text-sm font-medium",
                      filled ? "text-teal-900" : "text-green-500"
                    )}
                  >
                    {reason.linkLabel}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
