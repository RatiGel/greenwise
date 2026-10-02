import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getServices } from "@/content/services"
import { localizedPath } from "@/lib/i18n/config"

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

  return paths.flatMap(({ path, priority }) => {
    const alternates = {
      languages: {
        ka: `${siteConfig.url}${localizedPath(path, "ka")}`,
        en: `${siteConfig.url}${localizedPath(path, "en")}`,
      },
    }

    return [
      {
        url: `${siteConfig.url}${localizedPath(path, "ka")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
      {
        url: `${siteConfig.url}${localizedPath(path, "en")}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        // English is secondary; keep it below the Georgian equivalent.
        priority: Math.round((priority - 0.1) * 100) / 100,
        alternates,
      },
    ]
  })
}
