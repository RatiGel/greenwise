import type { Certification, Milestone } from "@/types/content"

export const mission = {
  heading: {
    ka: "გადაწყვეტილება, რომელიც მონაცემებს ეყრდნობა",
    en: "A decision built on data",
  },
  body: {
    ka: "GREENWISE დაარსდა იმ რწმენით, რომ გარემოსდაცვითი დოკუმენტი არ უნდა იყოს ფორმალობა. ჩვენ ვამზადებთ კვლევებს, რომლებსაც მარეგულირებელი იღებს პირველივე წარდგენისას, ხოლო დამკვეთი იყენებს პროექტის დასაგეგმად — და არა მხოლოდ ნებართვის მისაღებად.",
    en: "GREENWISE was founded on the belief that an environmental document should never be a formality. We prepare studies that the regulator accepts on first submission, and that the client uses to plan the project — not merely to obtain a permit.",
  },
  pillars: [
    {
      title: {
        ka: "მეცნიერული სიზუსტე",
        en: "Scientific rigour",
      },
      description: {
        ka: "თითოეული დასკვნა ეყრდნობა საველე მონაცემს, არა შაბლონს. მონაცემები შემოწმებადია და GIS ფორმატში გადმოგეცემათ.",
        en: "Every finding rests on field data, not a template. Our data is verifiable and delivered to you in GIS format.",
      },
    },
    {
      title: {
        ka: "ვადების დაცვა",
        en: "Reliable timelines",
      },
      description: {
        ka: "პროექტის დაწყებამდე ვფიქსირებთ ეტაპებს და ვადებს. ვიცით, რომ ნებართვის შეფერხება პირდაპირ ხარჯად გექცევათ.",
        en: "We set stages and deadlines before the project begins. We know that a permitting delay becomes a direct cost to you.",
      },
    },
    {
      title: {
        ka: "გამჭვირვალე ღირებულება",
        en: "Transparent pricing",
      },
      description: {
        ka: "ფიქსირებული ფასი სამუშაო ფარგლების შეთანხმების შემდეგ. დამატებითი კვლევა მხოლოდ წინასწარი შეთანხმებით.",
        en: "A fixed price once the scope of work is agreed. Any additional study proceeds only with your prior approval.",
      },
    },
  ],
}

export const milestones: Milestone[] = [
  {
    year: "2012",
    title: {
      ka: "დაარსება",
      en: "Founded",
    },
    description: {
      ka: "კომპანია დაფუძნდა ბიომრავალფეროვნებისა და სატყეო მიმართულების სპეციალისტების მიერ.",
      en: "The company was founded by specialists in biodiversity and forestry.",
    },
  },
  {
    year: "2016",
    title: {
      ka: "კადასტრის მიმართულება",
      en: "Cadastre practice launched",
    },
    description: {
      ka: "დაინერგა GIS-ზე დაფუძნებული ხე-მცენარეთა ინვენტარიზაციის მეთოდოლოგია.",
      en: "A GIS-based tree inventory methodology was introduced.",
    },
  },
  {
    year: "2019",
    title: {
      ka: "მუნიციპალური პროექტები",
      en: "Municipal projects",
    },
    description: {
      ka: "დაიწყო თანამშრომლობა მუნიციპალიტეტებთან საჯარო სივრცეების დენდროლოგიურ აუდიტზე.",
      en: "Began working with municipalities on dendrological audits of public spaces.",
    },
  },
  {
    year: "2023",
    title: {
      ka: "აღდგენის პროგრამები",
      en: "Restoration programmes",
    },
    description: {
      ka: "განხორციელდა ტყის აღდგენის მრავალწლიანი მონიტორინგის პროექტები დონორ ორგანიზაციებთან.",
      en: "Delivered multi-year forest restoration monitoring projects with donor organisations.",
    },
  },
]

export const stats = [
  {
    value: { ka: "13+", en: "13+" },
    label: { ka: "წლიანი გამოცდილება", en: "years of experience" },
  },
  {
    value: { ka: "240+", en: "240+" },
    label: { ka: "დასრულებული პროექტი", en: "completed projects" },
  },
  {
    value: { ka: "60 000+", en: "60,000+" },
    label: { ka: "აღრიცხული ხე-მცენარე", en: "trees inventoried" },
  },
  {
    value: { ka: "40+", en: "40+" },
    label: { ka: "მუდმივი დამკვეთი", en: "recurring clients" },
  },
]

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: {
      ka: "გზშ-ს ექსპერტის სერტიფიკატი",
      en: "EIA (Environmental Impact Assessment) Expert Certificate",
    },
    issuer: {
      ka: "გარემოს დაცვისა და სოფლის მეურნეობის სამინისტრო",
      en: "Ministry of Environmental Protection and Agriculture",
    },
    year: 2021,
  },
  {
    id: "cert-2",
    title: {
      ka: "ISA Certified Arborist",
      en: "ISA Certified Arborist",
    },
    issuer: {
      ka: "International Society of Arboriculture",
      en: "International Society of Arboriculture",
    },
    year: 2020,
  },
  {
    id: "cert-3",
    title: {
      ka: "ISO 14001 — გარემოსდაცვითი მენეჯმენტი",
      en: "ISO 14001 — Environmental Management",
    },
    issuer: {
      ka: "სერტიფიცირების საერთაშორისო ორგანო",
      en: "International certification body",
    },
    year: 2022,
  },
  {
    id: "cert-4",
    title: {
      ka: "სატყეო აღრიცხვის მეთოდოლოგიის აკრედიტაცია",
      en: "Accreditation in Forest Inventory Methodology",
    },
    issuer: {
      ka: "ეროვნული სატყეო სააგენტო",
      en: "National Forestry Agency",
    },
    year: 2019,
  },
]
