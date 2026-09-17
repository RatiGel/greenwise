import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getServices } from "@/content/services"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/methodology", priority: 0.7 },
    { path: "/clients", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }))

  const serviceRoutes = getServices().map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
