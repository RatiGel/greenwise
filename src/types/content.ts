/**
 * Content contract.
 *
 * These shapes are the single source of truth for both the Phase 1 static
 * content files and the Phase 2 Mongoose models. Query functions in
 * `src/lib/queries/*` must return exactly these types so that swapping the
 * data source is an import change, never a UI rewrite.
 */

import type { Locale } from "@/lib/i18n/config"

/**
 * A value that exists once per locale.
 *
 * Only text is localized. Identity and ordering fields (`slug`, `id`, `order`,
 * `icon`, `published`) stay single-valued so the two languages cannot drift
 * apart, and so the Phase 2 Mongoose models stay a direct mirror of these types.
 */
export type Localized<T> = Record<Locale, T>

export type ServiceSlug =
  | "biodiversity-assessment"
  | "tree-inventory"
  | "dendrology"
  | "forest-restoration"

export interface Service {
  slug: ServiceSlug
  title: Localized<string>
  shortDescription: Localized<string>
  description: Localized<string>
  /** "რას მოიცავს" — concrete deliverables. */
  covers: Localized<string[]>
  /** "რატომ გჭირდებათ" — client-facing reasons. */
  whyNeeded: Localized<string[]>
  /** Lucide icon name, resolved through the icon map in the UI layer. */
  icon: "leaf" | "trees" | "microscope" | "sprout"
  /** Who this service is primarily for. */
  audience: Localized<string[]>
  order: number
  published: boolean
}

export interface TeamMember {
  id: string
  name: Localized<string>
  role: Localized<string>
  bio: Localized<string>
  /** Path under /public, or an absolute URL once uploads land in Phase 2. */
  photo: string
  credentials?: Localized<string[]>
  order: number
  published: boolean
}

export type ClientSector =
  | "developers"
  | "municipalities"
  | "ngos"
  | "architects"

export interface Client {
  id: string
  name: Localized<string>
  sector: ClientSector
  /** Optional logo path; the UI falls back to a typographic mark. */
  logo?: string
  website?: string
  order: number
}

export interface Certification {
  id: string
  title: Localized<string>
  issuer: Localized<string>
  year: number
  /** Optional PDF/scan under /public. */
  file?: string
}

export interface MethodologyStep {
  id: string
  step: number
  title: Localized<string>
  description: Localized<string>
  /** What the client receives at the end of this step. */
  deliverable: Localized<string>
  duration: Localized<string>
  order: number
}

export interface Milestone {
  year: string
  title: Localized<string>
  description: Localized<string>
}

export interface SectorLabel {
  value: ClientSector
  label: Localized<string>
}
