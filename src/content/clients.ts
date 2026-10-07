import type { Client } from "@/types/content"

export const clients: Client[] = [
  {
    id: "c1",
    name: { ka: "Archi Group", en: "Archi Group" },
    sector: "developers",
    order: 1,
  },
  {
    id: "c2",
    name: { ka: "Axis Development", en: "Axis Development" },
    sector: "developers",
    order: 2,
  },
  {
    id: "c3",
    name: { ka: "m2 Real Estate", en: "m2 Real Estate" },
    sector: "developers",
    order: 3,
  },
  {
    id: "c4",
    name: { ka: "Green Building Georgia", en: "Green Building Georgia" },
    sector: "developers",
    order: 4,
  },
  {
    id: "c5",
    name: { ka: "ORBI Group", en: "ORBI Group" },
    sector: "developers",
    order: 5,
  },

  {
    id: "c6",
    name: { ka: "თბილისის მერია", en: "Tbilisi City Hall" },
    sector: "municipalities",
    order: 1,
  },
  {
    id: "c7",
    name: { ka: "ბათუმის მუნიციპალიტეტი", en: "Batumi Municipality" },
    sector: "municipalities",
    order: 2,
  },
  {
    id: "c8",
    name: { ka: "ქუთაისის მუნიციპალიტეტი", en: "Kutaisi Municipality" },
    sector: "municipalities",
    order: 3,
  },
  {
    id: "c9",
    name: { ka: "რუსთავის მუნიციპალიტეტი", en: "Rustavi Municipality" },
    sector: "municipalities",
    order: 4,
  },

  {
    id: "c10",
    name: { ka: "CENN", en: "CENN" },
    sector: "ngos",
    order: 1,
  },
  {
    id: "c11",
    name: { ka: "WWF Caucasus", en: "WWF Caucasus" },
    sector: "ngos",
    order: 2,
  },
  {
    id: "c12",
    name: { ka: "Green Alternative", en: "Green Alternative" },
    sector: "ngos",
    order: 3,
  },
  {
    id: "c13",
    name: { ka: "REC Caucasus", en: "REC Caucasus" },
    sector: "ngos",
    order: 4,
  },

  {
    id: "c14",
    name: { ka: "Studio Nuance", en: "Studio Nuance" },
    sector: "architects",
    order: 1,
  },
  {
    id: "c15",
    name: {
      ka: "Laboratory of Architecture #3",
      en: "Laboratory of Architecture #3",
    },
    sector: "architects",
    order: 2,
  },
  {
    id: "c16",
    name: { ka: "Urban Reactor", en: "Urban Reactor" },
    sector: "architects",
    order: 3,
  },
]

export function getClients(): Client[] {
  return [...clients].sort((a, b) => a.order - b.order)
}
