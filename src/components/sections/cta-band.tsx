import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { buildWhatsAppQuickUrl } from "@/lib/whatsapp"

export function CtaBand({
  title = "დაგეგმეთ პროექტი შეფერხების გარეშე",
  description = "მოგვწერეთ პროექტის მოკლე აღწერა — გიპასუხებთ, რომელი კვლევაა სავალდებულო, რა ვადაში და რა ღირებულებით.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="overflow-hidden rounded-2xl bg-forest-900 px-6 py-14 text-center sm:px-12 md:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-clay-200">
            {description}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group bg-white text-forest-900 hover:bg-clay-200">
              <Link href="/contact">
                კონსულტაციის მოთხოვნა
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a
                href={buildWhatsAppQuickUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden className="size-4" />
                WhatsApp-ით დაკავშირება
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
