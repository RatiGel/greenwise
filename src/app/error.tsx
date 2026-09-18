"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        დაფიქსირდა შეცდომა
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
        გვერდის ჩატვირთვისას რაღაც ვერ მოხერხდა. სცადეთ ხელახლა ან დაგვიკავშირდით
        პირდაპირ.
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={reset}>
          ხელახლა ცდა
        </Button>
      </div>
    </div>
  )
}
