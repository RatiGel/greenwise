import localFont from "next/font/local"

/**
 * Georgian pages' only text face — globals.css applies it under `:lang(ka)`,
 * digits and Latin included. Only 400 and 700 cuts exist, so 500/600 map to
 * the nearest file.
 */
export const bpgNinoMtavruli = localFont({
  src: [
    { path: "./bpg_nino_mtavruli_normal.otf", weight: "400 500", style: "normal" },
    { path: "./bpg_nino_mtavruli_bold.ttf", weight: "600 700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-bpg-nino",
})
