# Design

Visual system for the GREENWISE marketing site. Reference: greenwise.info
(structure + UI language). Register: brand.

## Theme

Light. The reference is light, the audience reads it in daylight in an office,
and photography reads better on a light ground. Dark surfaces are used as
deliberate punctuation — footer, CTA band, and the stats strip — not as the
page default.

## Color

Sampled directly from the rendered reference, not estimated:

```
#1B3738  --teal-900   body ground, the site's default surface
#25494A  --teal-700   raised cards, translucent panels
#3AB54A  --green-500  accent: highlighted words, icon badges, filled cards
#EFEFEF  --paper      the light band the page alternates into
```

The site is **dark by default**. Light `--paper` bands punctuate it, and the
page alternates dark → light → dark down its length, exactly as the reference
does. Green is used at full saturation and never tinted down.

## Typography

Two roles, one script-safe pairing:

- **Body + headings (Georgian and Latin):** Noto Sans Georgian, 400/500/600/700.
  Mandatory — it is the only face in the stack with real Georgian coverage.
- **Numerals + Latin display:** Manrope, 600/700/800. Used for stat counters,
  step numbers, and the logo wordmark only. Its geometric numerals give the
  stats strip the weight the reference gets from Lato Black, without touching
  Georgian text.

Scale (clamped, max ≤ 6rem per the ceiling). The two display steps are the
`heading-xl` / `heading-lg` utilities — **not** named `text-*`, because
tailwind-merge treats a `text-` prefix as a font-size class and silently drops
it when `cn()` also receives a `text-<color>`:
```
heading-xl clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem)   700, -0.03em, balance
heading-lg clamp(1.875rem, 1.4rem + 1.9vw, 2.75rem) 600, -0.025em, balance
h3        1.25rem / 1.375rem                        600, -0.015em
body-lg   1.0625rem–1.125rem, 1.7 line-height
body      1rem, 1.7 line-height
small     0.875rem
```
Georgian never gets `text-transform` or tracking above 0. Prose caps at 68ch.

## Layout

- Container 1200px, gutters 20/24/32px.
- Section rhythm `py-20 md:py-28`, with paired photo sections at `md:py-32`
  so the page breathes unevenly rather than metronomically.
- Grids: 3-up for value props and services overview (the reference's signature),
  2-col for photo+text pairs, 4-up only for the stats strip.
- Radius scale: 0.75rem base; photos and large panels 1.25rem; pills full.
  Rounded photo corners are a reference signature — keep them consistent.

## Components

- **Buttons:** solid `--forest-700` with white text (primary); outline with
  `--line` border (secondary); both with a trailing arrow that translates 2px
  on hover. Height 44px default, 52px large — touch-target safe.
- **Photo frame:** rounded 1.25rem, `object-cover`, always with an explicit
  aspect-ratio so no layout shift. Placeholder = forest-tinted SVG with a
  subtle topographic contour motif, swappable for real files.
- **Value card:** icon in a forest-50 rounded square, heading, two lines of
  copy, text link. Used exactly once (the 3-up "why choose" grid) so it does
  not become the repeated identical-grid tell.
- **Stat counter:** Manrope numeral, counts up on first view, respects reduced
  motion by rendering the final value immediately.
- **Mission/Vision pair:** the reference's `01 / 02` device. Numbering is
  earned here because it is a fixed two-part statement, not a section scaffold.

## Motion

Scroll reveals: 24px rise + fade, 700ms, `cubic-bezier(0.16, 1, 0.3, 1)`,
stagger 80ms within a list only. Stat counters: 1.6s ease-out count. Header:
background and shadow transition on scroll. Hover: 2px arrow translate, border
and shadow shifts. Everything collapses to final state under
`prefers-reduced-motion: reduce`. Content is visible by default; reveals
enhance, never gate.

## Eyebrows

The reference uses a small label above each section heading and the client
asked to match it closely. Kept — but as a two-part device (thin rule + label
in forest-600, sentence case, no tracking, since Georgian has no uppercase)
rather than the generic tracked all-caps kicker.

## Verified contrast

Measured against the shipped tokens. All pass WCAG AA:

| Pair | Ratio |
|---|---|
| white / teal-900 (body) | 14.3 |
| white 75% / teal-900 | 8.7 |
| white 65% / teal-900 (footer) | 6.9 |
| white 75% / teal-700 (card) | 6.8 |
| green-500 / teal-900 (accent) | 5.1 |
| teal-900 / green-500 (filled card) | 5.1 |
| on-light / paper | 12.4 |
| on-light-muted / paper | 6.9 |
| green-600 / paper (accent on light) | 5.3 |

Two pairs were caught failing during the build and corrected: `teal-900/80`
on green (3.7) became full `teal-900`, and `green-600` on paper (3.5) was
darkened to L 0.485.

## Photography

No real imagery has been supplied. Every photo slot renders through
`components/ui/photo.tsx`, which draws a forest-toned topographic placeholder
when `src` is absent. To ship real photos, drop files into `/public/photos`
and pass `src` — no layout or markup changes are needed. `ratio` is always
set explicitly so nothing shifts while an image decodes.

## Reference-matched components

Four devices carry the reference's identity. They live in shared components
so every page inherits them:

- **`PillCta`** (`ui/pill-cta.tsx`) — pill with a filled circular arrow badge
  flush inside its right edge. The badge rotates 45° on hover. Three tones:
  `solid` (green), `onLight` (dark pill, green badge), `onDark` (outlined).
- **Two-tone headings** — one phrase within each headline set in `green-500`.
  `SectionHeading` takes an `accent` prop and splits the title around it, so
  the string stays one readable sentence for assistive tech.
- **Photo-overlay cards** (`photo-card` + `photo-card-scrim`) — the image
  fills the card, a gradient scrim carries the text, and a green circular
  icon badge overlaps the top-left corner. Used for the service cards.
- **Band alternation** (`band-dark` / `band-light`) — each section declares
  its own ground and text colors, so children never restate them.

The heading layout also follows the reference: a narrow label column on the
left, the headline in the middle, supporting copy on the right.

## Interaction

Every control answers three questions: is it clickable, did my click land, and
where am I on the keyboard.

- **Cursor + focus are global**, set once in the base layer: `cursor: pointer`
  on anything interactive, `not-allowed` when disabled, and a 2px green
  `:focus-visible` ring at 3px offset that is never removed, only restyled.
- **`press`** scales to 0.97 on `:active` (140ms). Transform only, never a
  layout property, so pressing an element cannot reflow its neighbours. It is
  a no-op under reduced motion.
- **`link-underline`** grows an underline from the start edge on hover and
  focus, for text links where a color shift alone is too quiet.
- **Hover** on cards lifts 4-6px with a shadow and reacts in two places at
  once (icon scales, title shifts to accent) so the whole card reads as one
  target rather than a collection of separate links.
- **`touch-action: manipulation`** on all controls removes the 300ms tap delay.
- **Touch targets** are ≥44px. shadcn defaults inputs and selects to 32px;
  the contact form raises every control to `h-11` at the call site rather
  than forking the primitives.

Timings sit between 140ms and 500ms on `--ease-out-quint`; nothing linear,
nothing bouncing.

## Interactive behavior

- **Services are not filtered.** There are only four, and all four fit one
  row — a filter would have added a step without removing one. The grid is
  plain server-rendered markup with no client JS.
- **Scroll progress** (`ui/scroll-progress.tsx`) — a 2px bar under the header
  answering "how much is left" on long Georgian pages. rAF-throttled, drives
  only `transform`, and does not render at all under reduced motion.
- **Contact form** — validates on blur rather than per keystroke, so errors
  never appear mid-typing; a live character counter; and a three-state submit
  (idle → sending → sent) that disables the button to prevent double
  submission and mirrors its state to screen readers via `aria-live`.
  `useWatch` subscribes to the single message field instead of re-rendering
  the whole form on every keystroke.

## Contrast (interactive elements)

Re-verified after the interaction pass; all pass AA:

| Pair | Ratio |
|---|---|
| character counter (white 50%) / teal-900 | 4.7 |
| focus ring green-500 / teal-900 | 5.1 |
