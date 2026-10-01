import Link from "next/link"

import { localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { Button } from "@/components/ui/button"

export default async function NotFound() {
  const locale = await getLocale()
  const dict = await getDictionary()

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-sm font-medium text-green-500">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
        {dict.error.notFoundTitle}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
        {dict.error.notFoundBody}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={localizedPath("/", locale)}>{dict.error.backHome}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={localizedPath("/services", locale)}>
            {dict.error.viewServices}
          </Link>
        </Button>
      </div>
    </div>
  )
}
