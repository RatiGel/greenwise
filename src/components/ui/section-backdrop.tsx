import { cn } from "cn"

import { Photo } from "@/components/ui/photo"

export interface SectionBackdropProps {
  /** Path under /public once real photography lands, e.g. "/photos/field.jpg". */
  src?: string
  /** Varies the generated placeholder so adjacent sections don't twin. */
  seed?: number
  /** Matches the band the section sits in, so text contrast holds. */
  tone?: "dark" | "light"
  className?: string
}

/**
 * Full-bleed photograph behind a whole section.
 *
 * Sits at `-z-10` inside the section's own stacking context, with the photo
 * and its scrim wrapped together — separating them lets the scrim float above
 * the content instead of the image.
 *
 * The scrim is heavy on purpose: a section backdrop has body copy across its
 * full height, not just pinned to the bottom edge like a card, so the photo
 * has to stay atmospheric rather than compete.
 */
export function SectionBackdrop({
  src,
  seed = 0,
  tone = "dark",
  className,
}: SectionBackdropProps) {
  return (
    <div aria-hidden className={cn("absolute inset-0 -z-10", className)}>
      <Photo
        src={src}
        alt=""
        seed={seed}
        bleed
        sizes="100vw"
        className="absolute inset-0 size-full rounded-none"
      />
      <span
        className={tone === "light" ? "section-scrim-light" : "section-scrim"}
      />
    </div>
  )
}
