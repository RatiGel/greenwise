import Image from "next/image"

import { cn } from "cn"

export interface PhotoProps {
  src?: string
  alt: string
  /** CSS aspect-ratio, e.g. "4 / 3". Always set so nothing shifts on decode. */
  ratio?: string
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
  /** Tints the placeholder so adjacent frames don't look identical. */
  seed?: number
  /**
   * Fill the parent's height instead of holding `ratio`. The ratio still
   * applies below `lg`, where the frame sits in a single-column stack.
   */
  fillHeight?: boolean
  /** Drop the aspect-ratio entirely — for full-bleed backdrops. */
  bleed?: boolean
}

/**
 * Photo frame with a built-in placeholder.
 *
 * Real imagery has not been supplied yet, so a frame with no `src` renders a
 * topographic contour placeholder instead of an empty box or a broken image.
 * Dropping a file into /public/photos and passing `src` is the only change
 * needed later — no layout or markup edits.
 */
export function Photo({
  src,
  alt,
  ratio = "4 / 3",
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  seed = 0,
  fillHeight = false,
  bleed = false,
}: PhotoProps) {
  return (
    <div
      className={cn(
        "photo-frame relative",
        !bleed && "isolate",
        fillHeight && "lg:h-full lg:[aspect-ratio:auto]",
        className
      )}
      style={bleed ? undefined : { aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <ContourPlaceholder seed={seed} label={alt} />
      )}
    </div>
  )
}

/**
 * Decorative stand-in: layered contour lines over a forest wash. Reads as a
 * survey map rather than a grey "image missing" block, so pages look finished
 * before photography lands.
 */
function ContourPlaceholder({ seed, label }: { seed: number; label: string }) {
  const rotate = (seed % 4) * 14 - 21
  const scale = 1 + (seed % 3) * 0.12

  return (
    <div
      role="img"
      aria-label={label}
      className="absolute inset-0 bg-teal-700"
    >
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient id={`pw-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--teal-600)" />
            <stop offset="100%" stopColor="var(--teal-800)" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#pw-${seed})`} />
        <g
          fill="none"
          stroke="var(--green-500)"
          strokeOpacity="0.30"
          strokeWidth="1.1"
          transform={`rotate(${rotate} 200 150) scale(${scale}) translate(${
            (1 - scale) * 200
          } ${(1 - scale) * 150})`}
        >
          {Array.from({ length: 9 }, (_, i) => {
            const r = 26 + i * 21
            return (
              <ellipse
                key={i}
                cx={200 + (i % 2 ? 14 : -10)}
                cy={150 + i * 3}
                rx={r * 1.42}
                ry={r}
              />
            )
          })}
        </g>
      </svg>
      
    </div>
  )
}
