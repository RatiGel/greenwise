import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-sm font-medium text-forest-600">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-forest-900 sm:text-4xl">
        გვერდი ვერ მოიძებნა
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        შესაძლოა ბმული შეიცვალა ან გვერდი წაიშალა. დაბრუნდით მთავარზე ან ნახეთ
        ჩვენი სერვისები.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">მთავარ გვერდზე</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/services">სერვისების ნახვა</Link>
        </Button>
      </div>
    </div>
  )
}
