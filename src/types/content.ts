/**
 * Content contract.
 *
 * These shapes are the single source of truth for both the Phase 1 static
 * content files and the Phase 2 Mongoose models. Query functions in
 * `src/lib/queries/*` must return exactly these types so that swapping the
 * data source is an import change, never a UI rewrite.
 */

export type ServiceSlug =
  | "biodiversity-assessment"
  | "tree-inventory"
  | "dendrology"
  | "forest-restoration"

export interface Service {
  slug: ServiceSlug
  title: string
  shortDescription: string
  description: string
  /** "რას მოიცავს" — concrete deliverables. */
  covers: string[]
  /** "რატომ გჭირდებათ" — client-facing reasons. */
  whyNeeded: string[]
  /** Lucide icon name, resolved through the icon map in the UI layer. */
  icon: "leaf" | "trees" | "microscope" | "sprout"
  /** Who this service is primarily for. */
  audience: string[]
  order: number
  published: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  /** Path under /public, or an absolute URL once uploads land in Phase 2. */
  photo: string
  credentials?: string[]
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
  name: string
  sector: ClientSector
  /** Optional logo path; the UI falls back to a typographic mark. */
  logo?: string
  website?: string
  order: number
}

export interface Certification {
  id: string
  title: string
  issuer: string
  year: number
  /** Optional PDF/scan under /public. */
  file?: string
}

export interface MethodologyStep {
  id: string
  step: number
  title: string
  description: string
  /** What the client receives at the end of this step. */
  deliverable: string
  duration: string
  order: number
}

export interface Milestone {
  year: string
  title: string
  description: string
}

export interface SectorLabel {
  value: ClientSector
  label: string
}
