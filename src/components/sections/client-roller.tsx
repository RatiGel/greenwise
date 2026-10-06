"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "cn"

interface ClientRollerProps {
  names: { id: string; name: string }[]
  prevLabel: string
  nextLabel: string
}

/**
 * Two-row strip of partner tiles that scrolls sideways. Touch, trackpad and
 * keyboard scroll it natively (snapping to whole columns); the arrow buttons
 * page it one visible width at a time and disable themselves at either end.
 */
export function ClientRoller({ names, prevLabel, nextLabel }: ClientRollerProps) {
  const trackRef = React.useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = React.useState(true)
  const [atEnd, setAtEnd] = React.useState(false)

  const updateEdges = React.useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setAtStart(track.scrollLeft <= 1)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1)
  }, [])

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateEdges()
    track.addEventListener("scroll", updateEdges, { passive: true })
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    return () => {
      track.removeEventListener("scroll", updateEdges)
      observer.disconnect()
    }
  }, [updateEdges])

  const page = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  return (
    <div className="mt-12">
      <ul
        ref={trackRef}
        tabIndex={0}
        className="grid snap-x snap-mandatory auto-cols-[calc((100%-1px)/2)] grid-flow-col grid-rows-2 gap-px overflow-x-auto overscroll-x-contain rounded-[1.25rem] border border-white/12 bg-white/12 [scrollbar-width:none] sm:auto-cols-[calc((100%-2px)/3)] lg:auto-cols-[calc((100%-3px)/4)] [&::-webkit-scrollbar]:hidden"
      >
        {names.map((client) => (
          <li
            key={client.id}
            className="flex min-h-[6rem] snap-start items-center justify-center bg-teal-900 px-5 py-6 text-center text-sm font-medium text-white/75 transition-colors duration-300 hover:bg-teal-700 hover:text-white"
          >
            {client.name}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-end gap-3">
        <RollerButton label={prevLabel} disabled={atStart} onClick={() => page(-1)}>
          <ArrowLeft aria-hidden className="size-5" />
        </RollerButton>
        <RollerButton label={nextLabel} disabled={atEnd} onClick={() => page(1)}>
          <ArrowRight aria-hidden className="size-5" />
        </RollerButton>
      </div>
    </div>
  )
}

function RollerButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors duration-300",
        "hover:border-green-500 hover:bg-green-500 hover:text-teal-900",
        "disabled:pointer-events-none disabled:opacity-35"
      )}
    >
      {children}
    </button>
  )
}
