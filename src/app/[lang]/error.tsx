"use client"

import * as React from "react"

import { useDictionary } from "@/lib/i18n/locale-context"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // `useDictionary()`, not `getDictionary()`: this is a Client Component, and
  // it sits inside LocaleProvider (the provider is in the layout, this error
  // boundary is a child of it). The server function would throw here — on the
  // least-tested path on the site.
  const dict = useDictionary()

  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        {dict.error.genericTitle}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
        {dict.error.genericBody}
      </p>
      <div className="mt-8">
        <Button size="lg" onClick={reset}>
          {dict.error.retry}
        </Button>
      </div>
    </div>
  )
}
