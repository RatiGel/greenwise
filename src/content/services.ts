import type { Service } from "@/types/content"

export const services: Service[] = [
  {
    slug: "biodiversity-assessment",
    title: {
      ka: "ბიომრავალფეროვნების შეფასება",
      en: "Biodiversity Assessment",
    },
    shortDescription: {
      ka: "ფლორისა და ფაუნის კვლევა, საბინადრო გარემოს კარტირება და ზემოქმედების შეფასება პროექტის ნებართვისთვის.",
      en: "Flora and fauna survey, habitat mapping, and impact assessment for project permitting.",
    },
    description: {
      ka: "ბიომრავალფეროვნების შეფასება ადგენს, თუ რა სახეობები და ჰაბიტატები გვხვდება თქვენს სამშენებლო ან სამეურნეო ტერიტორიაზე და როგორ იმოქმედებს მათზე დაგეგმილი საქმიანობა. კვლევა მოიცავს საველე დაკვირვებებს სეზონურ ჭრილში, სახეობების იდენტიფიკაციას, დაცული და წითელი ნუსხის სახეობების აღრიცხვას და ჰაბიტატების კარტირებას. შედეგად იღებთ დოკუმენტს, რომელიც აკმაყოფილებს გარემოზე ზემოქმედების შეფასების (გზშ) მოთხოვნებს და შეიცავს კონკრეტულ, განხორციელებად შემარბილებელ ღონისძიებებს.",
      en: "A biodiversity assessment determines which species and habitats occur on your construction or development site and how the planned activity will affect them. The study includes field observations across seasons, species identification, recording of protected and Red List species, and habitat mapping. The outcome is a document that satisfies EIA (Environmental Impact Assessment) requirements and sets out concrete, actionable mitigation measures.",
    },
    covers: {
      ka: [
        "საველე კვლევა ფლორისა და ფაუნის აღრიცხვით",
        "დაცული და წითელი ნუსხის სახეობების იდენტიფიკაცია",
        "ჰაბიტატების კარტირება GIS ფორმატში",
        "ზემოქმედების პროგნოზი და მნიშვნელოვნების შეფასება",
        "შემარბილებელი ღონისძიებების გეგმა",
        "მონიტორინგის პროგრამა მშენებლობის პერიოდისთვის",
      ],
      en: [
        "Field survey recording flora and fauna",
        "Identification of protected and Red List species",
        "Habitat mapping in GIS format",
        "Impact forecasting and significance assessment",
        "Mitigation measures plan",
        "Monitoring programme for the construction period",
      ],
    },
    whyNeeded: {
      ka: [
        "გზშ-ს ანგარიშის სავალდებულო კომპონენტია დიდი ნაწილი პროექტებისთვის",
        "ამცირებს ნებართვის გაცემის შეფერხების რისკს",
        "ადრეულ ეტაპზე ავლენს შეზღუდვებს, სანამ პროექტი გადაიგეგმება",
        "აკმაყოფილებს საერთაშორისო დონორებისა და ბანკების მოთხოვნებს",
      ],
      en: [
        "A mandatory component of the EIA report for most projects",
        "Reduces the risk of permitting delays",
        "Surfaces constraints early, before the project needs to be redesigned",
        "Meets the requirements of international donors and banks",
      ],
    },
    icon: "leaf",
    audience: {
      ka: ["დეველოპერები", "ინფრასტრუქტურული კომპანიები", "NGO-ები"],
      en: ["Developers", "Infrastructure companies", "NGOs"],
    },
    order: 1,
    published: true,
  },
  {
    slug: "tree-inventory",
    title: {
      ka: "ხე-მცენარეთა ინვენტარიზაცია და კადასტრი",
      en: "Tree Inventory and Cadastre",
    },
    shortDescription: {
      ka: "თითოეული ხის აღრიცხვა, ნუმერაცია და ღირებულების დათვლა — ნებართვისა და საკომპენსაციო გაანგარიშებისთვის.",
      en: "Recording, numbering, and valuation of every tree — for permitting and compensatory value calculation.",
    },
    description: {
      ka: "ხე-მცენარეთა ინვენტარიზაცია არის ტერიტორიაზე არსებული ყველა ხისა და ბუჩქის სისტემური აღრიცხვა. თითოეული ერთეული იღებს ნომერს, ფიქსირდება მისი სახეობა, დიამეტრი, სიმაღლე, ვარჯის პროექცია, ჯანმრთელობის მდგომარეობა და GPS კოორდინატი. მონაცემები ერთიანდება კადასტრულ უწყისსა და გეგმაში, რაც საფუძვლად ედება ხის ჭრის ნებართვას და საკომპენსაციო თანხის გაანგარიშებას მოქმედი ნორმატივების მიხედვით.",
      en: "Tree inventory is the systematic recording of every tree and shrub on a site. Each individual is assigned a number, and its species, diameter, height, crown projection, health condition, and GPS coordinates are recorded. The data is compiled into a cadastral register and plan, which forms the basis for the tree-felling permit and for calculating the compensatory value under current regulations.",
    },
    covers: {
      ka: [
        "თითოეული ხის ნუმერაცია და GPS კოორდინატი",
        "სახეობის, დიამეტრის, სიმაღლისა და ვარჯის ფიქსაცია",
        "ფიტოსანიტარული მდგომარეობის შეფასება",
        "კადასტრული უწყისი და დენდროგეგმა",
        "საკომპენსაციო ღირებულების გაანგარიშება",
        "ჭრის ნებართვისთვის საჭირო დოკუმენტაციის მომზადება",
      ],
      en: [
        "Numbering and GPS coordinates for each tree",
        "Recording of species, diameter, height, and crown",
        "Phytosanitary condition assessment",
        "Cadastral register and dendrology plan",
        "Compensatory value calculation",
        "Preparation of documentation required for the felling permit",
      ],
    },
    whyNeeded: {
      ka: [
        "ხის ჭრის ნებართვის აუცილებელი წინაპირობაა",
        "იცავს დაუგეგმავი საკომპენსაციო ხარჯებისგან",
        "ზუსტი მონაცემები ამცირებს მუნიციპალიტეტთან შეთანხმების ვადას",
        "საშუალებას გაძლევთ პროექტი ღირებულ ხეებზე მოარგოთ",
      ],
      en: [
        "A necessary precondition for the tree-felling permit",
        "Protects against unplanned compensatory costs",
        "Accurate data shortens the municipal approval timeline",
        "Lets you adapt the project around valuable trees",
      ],
    },
    icon: "trees",
    audience: {
      ka: ["დეველოპერები", "მუნიციპალიტეტები", "არქიტექტორები"],
      en: ["Developers", "Municipalities", "Architects"],
    },
    order: 2,
    published: true,
  },
  {
    slug: "dendrology",
    title: {
      ka: "დენდროლოგია",
      en: "Dendrology",
    },
    shortDescription: {
      ka: "ხეების მდგომარეობის ექსპერტიზა, ავარიულობის რისკის შეფასება და მოვლის რეკომენდაციები.",
      en: "Expert assessment of tree condition, hazard risk evaluation, and care recommendations.",
    },
    description: {
      ka: "დენდროლოგიური ექსპერტიზა აფასებს კონკრეტული ხის ან ნარგაობის ჯანმრთელობასა და მდგრადობას. ვიკვლევთ ღეროსა და ძირფესვური სისტემის მდგომარეობას, ვლინდება დაავადებები, მავნებლები და სტრუქტურული დეფექტები, რომლებიც ავარიულობის რისკს ქმნის. დასკვნა შეიცავს დასაბუთებულ რეკომენდაციას — ხე უნდა შენარჩუნდეს, გამოიკვეთოს თუ მოიჭრას — და შენარჩუნების შემთხვევაში მოვლის კონკრეტულ გეგმას.",
      en: "A dendrological assessment evaluates the health and stability of a specific tree or stand. We examine the condition of the trunk and root system, and identify diseases, pests, and structural defects that create a hazard risk. The report includes a reasoned recommendation — whether the tree should be preserved, pruned, or felled — and, where preservation is recommended, a concrete care plan.",
    },
    covers: {
      ka: [
        "ვიზუალური და ინსტრუმენტული დიაგნოსტიკა",
        "დაავადებებისა და მავნებლების იდენტიფიკაცია",
        "ავარიულობის რისკის შეფასება",
        "ხის ასაკისა და ღირებულების განსაზღვრა",
        "სამშენებლო სამუშაოებისგან დაცვის ღონისძიებები",
        "ექსპერტული დასკვნა და მოვლის რეკომენდაციები",
      ],
      en: [
        "Visual and instrumental diagnostics",
        "Identification of diseases and pests",
        "Hazard risk assessment",
        "Determination of tree age and value",
        "Protective measures against construction damage",
        "Expert report and care recommendations",
      ],
    },
    whyNeeded: {
      ka: [
        "საჯარო სივრცეში ავარიული ხე პირდაპირი პასუხისმგებლობის რისკია",
        "დასაბუთებული დასკვნა ამყარებს პოზიციას ნებართვის პროცესში",
        "მშენებლობის დროს იცავს ღირებულ ხეებს დაზიანებისგან",
        "საშუალებას აძლევს მუნიციპალიტეტს პრიორიტეტულად დაგეგმოს ბიუჯეტი",
      ],
      en: [
        "A hazardous tree in a public space is a direct liability risk",
        "A reasoned report strengthens your position in the permitting process",
        "Protects valuable trees from damage during construction",
        "Lets the municipality prioritise its budget planning",
      ],
    },
    icon: "microscope",
    audience: {
      ka: ["მუნიციპალიტეტები", "არქიტექტორები", "კერძო მესაკუთრეები"],
      en: ["Municipalities", "Architects", "Private owners"],
    },
    order: 3,
    published: true,
  },
  {
    slug: "forest-restoration",
    title: {
      ka: "ტყის აღდგენა",
      en: "Forest Restoration",
    },
    shortDescription: {
      ka: "აღდგენისა და გამწვანების პროექტები — სახეობების შერჩევიდან გახარების მონიტორინგამდე.",
      en: "Restoration and greening projects — from species selection to survival-rate monitoring.",
    },
    description: {
      ka: "ტყის აღდგენა მოიცავს დეგრადირებული ან მოჭრილი ტერიტორიის აღდგენას მეცნიერულად დასაბუთებული გეგმის მიხედვით. ვიწყებთ ნიადაგისა და ადგილის პირობების ანალიზით, შემდეგ ვარჩევთ ადგილობრივ, კლიმატისადმი მდგრად სახეობებს, ვამზადებთ დარგვის სქემას და ვახორციელებთ სამუშაოებს. პროექტი მთავრდება არა დარგვით, არამედ მრავალწლიანი მონიტორინგით, რომელიც ადასტურებს გახარების მაჩვენებელს და აფიქსირებს საკომპენსაციო ვალდებულების შესრულებას.",
      en: "Forest restoration covers the rehabilitation of a degraded or felled site under a scientifically grounded plan. We begin with an analysis of soil and site conditions, then select native, climate-resilient species, prepare a planting scheme, and carry out the works. The project does not end with planting — it concludes with multi-year monitoring that confirms the survival rate and documents fulfilment of the compensatory obligation.",
    },
    covers: {
      ka: [
        "ნიადაგისა და ადგილის პირობების ანალიზი",
        "ადგილობრივი სახეობების შერჩევა და დარგვის სქემა",
        "აღდგენის პროექტის დოკუმენტაცია",
        "სანერგე მასალის ხარისხის კონტროლი",
        "დარგვის სამუშაოების ზედამხედველობა",
        "გახარების მონიტორინგი და ყოველწლიური ანგარიში",
      ],
      en: [
        "Soil and site condition analysis",
        "Selection of native species and planting scheme",
        "Restoration project documentation",
        "Nursery stock quality control",
        "Supervision of planting works",
        "Survival-rate monitoring and annual report",
      ],
    },
    whyNeeded: {
      ka: [
        "ასრულებს ჭრის ნებართვით დაკისრებულ საკომპენსაციო ვალდებულებას",
        "დოკუმენტურად ადასტურებს გარემოსდაცვითი პირობების შესრულებას",
        "სწორად შერჩეული სახეობები ამცირებს ხელახალი დარგვის ხარჯს",
        "აძლიერებს კომპანიის ESG და მდგრადობის ანგარიშგებას",
      ],
      en: [
        "Fulfils the compensatory obligation imposed by the felling permit",
        "Provides documented confirmation of compliance with environmental conditions",
        "Correctly selected species reduce the cost of replanting",
        "Strengthens the company's ESG and sustainability reporting",
      ],
    },
    icon: "sprout",
    audience: {
      ka: ["დეველოპერები", "მუნიციპალიტეტები", "NGO-ები"],
      en: ["Developers", "Municipalities", "NGOs"],
    },
    order: 4,
    published: true,
  },
]

export function getServices(): Service[] {
  return services
    .filter((service) => service.published)
    .sort((a, b) => a.order - b.order)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug && service.published)
}
