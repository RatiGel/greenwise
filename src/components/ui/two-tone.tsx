import { cn } from "cn"

/**
 * Heading where one phrase is picked out in the accent green — the
 * reference's headline device ("Where Industry meets *Sustainability*").
 *
 * The accent carries no meaning on its own, so the full string stays
 * readable as one sentence to assistive tech.
 */
export function TwoTone({
  before,
  accent,
  after,
  className,
  as: Tag = "h2",
}: {
  before?: string
  accent: string
  after?: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p"
}) {
  return (
    <Tag className={className}>
      {before ? `${before} ` : null}
      <span className={cn("text-green-500")}>{accent}</span>
      {after ? ` ${after}` : null}
    </Tag>
  )
}
