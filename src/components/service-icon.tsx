import { Leaf, Microscope, Sprout, Trees } from "lucide-react"
import type { Service } from "@/types/content"

const iconMap = {
  leaf: Leaf,
  trees: Trees,
  microscope: Microscope,
  sprout: Sprout,
} as const

export function ServiceIcon({
  name,
  className,
}: {
  name: Service["icon"]
  className?: string
}) {
  const Icon = iconMap[name]
  return <Icon aria-hidden className={className} />
}
