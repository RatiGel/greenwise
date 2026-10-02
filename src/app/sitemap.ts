import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getServices } from "@/content/services"
import { localizedPath, type Locale } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const paths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/methodology", priority: 0.7 },
    { path: "/clients", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    ...getServices().map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.85,
    })),
  ]

  /**
   * Absolute URL for a locale-free path.
   *
   * `localizedPath("/", "ka")` returns "/", which would concatenate into
   * "https://greenwise.ge/" while the pages' own canonical and hreflang tags
   * resolve to "https://greenwise.ge". Google treats the two as one URL, but
   * emitting both spellings makes the sitemap disagree with the pages it
   * lists, so the root's trailing slash is dropped here.
   */
  const absolute = (path: string, locale: Locale) => {
    const localized = localizedPath(path, locale)
    return `${siteConfig.url}${localized === "/" ? "" : localized}`
  }

  return paths.flatMap(({ path, priority }) => {
    const alternates = {
      languages: {
        ka: absolute(path, "ka"),
        en: absolute(path, "en"),
      },
    }

    return [
      {
        url: absolute(path, "ka"),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
      {
        url: absolute(path, "en"),
        lastModified: now,
        changeFrequency: "monthly" as const,
        // English is secondary; keep it below the Georgian equivalent.
        priority: Math.round((priority - 0.1) * 100) / 100,
        alternates,
      },
    ]
  })
}
