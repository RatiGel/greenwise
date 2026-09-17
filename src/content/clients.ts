import type { Client, ClientSector, SectorLabel } from "@/types/content"

export const sectorLabels: SectorLabel[] = [
  { value: "developers", label: "დეველოპერები" },
  { value: "municipalities", label: "მუნიციპალიტეტები" },
  { value: "ngos", label: "არასამთავრობო ორგანიზაციები" },
  { value: "architects", label: "არქიტექტურული ბიუროები" },
]

export const clients: Client[] = [
  { id: "c1", name: "Archi Group", sector: "developers", order: 1 },
  { id: "c2", name: "Axis Development", sector: "developers", order: 2 },
  { id: "c3", name: "m2 Real Estate", sector: "developers", order: 3 },
  { id: "c4", name: "Green Building Georgia", sector: "developers", order: 4 },
  { id: "c5", name: "ORBI Group", sector: "developers", order: 5 },

  { id: "c6", name: "თბილისის მერია", sector: "municipalities", order: 1 },
  { id: "c7", name: "ბათუმის მუნიციპალიტეტი", sector: "municipalities", order: 2 },
  { id: "c8", name: "ქუთაისის მუნიციპალიტეტი", sector: "municipalities", order: 3 },
  { id: "c9", name: "რუსთავის მუნიციპალიტეტი", sector: "municipalities", order: 4 },

  { id: "c10", name: "CENN", sector: "ngos", order: 1 },
  { id: "c11", name: "WWF Caucasus", sector: "ngos", order: 2 },
  { id: "c12", name: "Green Alternative", sector: "ngos", order: 3 },
  { id: "c13", name: "REC Caucasus", sector: "ngos", order: 4 },

  { id: "c14", name: "Studio Nuance", sector: "architects", order: 1 },
  { id: "c15", name: "Laboratory of Architecture #3", sector: "architects", order: 2 },
  { id: "c16", name: "Urban Reactor", sector: "architects", order: 3 },
]

export function getClients(): Client[] {
  return [...clients].sort((a, b) => a.order - b.order)
}

export function getClientsBySector(sector: ClientSector): Client[] {
  return getClients().filter((client) => client.sector === sector)
}
