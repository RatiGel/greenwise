import type { TeamMember } from "@/types/content"

export const team: TeamMember[] = [
  {
    id: "nino-kapanadze",
    name: { ka: "ნინო კაპანაძე", en: "Nino Kapanadze" },
    role: {
      ka: "დამფუძნებელი, წამყვანი ეკოლოგი",
      en: "Founder, Lead Ecologist",
    },
    bio: {
      ka: "15 წელზე მეტი გამოცდილება ბიომრავალფეროვნების კვლევასა და გზშ-ს მომზადებაში. ხელმძღვანელობდა 80-ზე მეტ საექსპერტო კვლევას ენერგეტიკულ, საგზაო და სამშენებლო პროექტებში.",
      en: "Over 15 years of experience in biodiversity research and EIA (Environmental Impact Assessment) preparation. Has led more than 80 expert studies on energy, road, and construction projects.",
    },
    photo: "/team/placeholder-1.svg",
    credentials: {
      ka: ["ბიოლოგიის დოქტორი, თსუ", "გზშ-ს სერტიფიცირებული ექსპერტი"],
      en: [
        "PhD in Biology, Tbilisi State University",
        "Certified EIA (Environmental Impact Assessment) Expert",
      ],
    },
    order: 1,
    published: true,
  },
  {
    id: "giorgi-beridze",
    name: { ka: "გიორგი ბერიძე", en: "Giorgi Beridze" },
    role: {
      ka: "წამყვანი დენდროლოგი",
      en: "Lead Dendrologist",
    },
    bio: {
      ka: "სპეციალიზდება ხეების ფიტოსანიტარულ დიაგნოსტიკასა და ავარიულობის რისკის შეფასებაში. აწარმოა თბილისის ცენტრალური პარკების დენდროლოგიური აუდიტი.",
      en: "Specialises in phytosanitary diagnostics and hazard risk assessment of trees. Has carried out dendrological audits of Tbilisi's central parks.",
    },
    photo: "/team/placeholder-2.svg",
    credentials: {
      ka: ["მაგისტრი, სატყეო საქმე", "ISA Certified Arborist"],
      en: ["MSc in Forestry", "ISA Certified Arborist"],
    },
    order: 2,
    published: true,
  },
  {
    id: "mariam-tsiklauri",
    name: { ka: "მარიამ წიკლაური", en: "Mariam Tsiklauri" },
    role: {
      ka: "GIS სპეციალისტი, კადასტრის ხელმძღვანელი",
      en: "GIS Specialist, Head of Cadastre",
    },
    bio: {
      ka: "ხე-მცენარეთა ინვენტარიზაციისა და კადასტრული უწყისების მომზადების მიმართულების ხელმძღვანელი. მუშაობს QGIS და ArcGIS პლატფორმებზე.",
      en: "Head of the tree inventory and cadastral register practice. Works with the QGIS and ArcGIS platforms.",
    },
    photo: "/team/placeholder-3.svg",
    credentials: {
      ka: ["გეოინფორმატიკის მაგისტრი", "QGIS სერტიფიცირებული სპეციალისტი"],
      en: ["MSc in Geoinformatics", "Certified QGIS Specialist"],
    },
    order: 3,
    published: true,
  },
  {
    id: "levan-gogoladze",
    name: { ka: "ლევან გოგოლაძე", en: "Levan Gogoladze" },
    role: {
      ka: "ტყის აღდგენის პროექტების მენეჯერი",
      en: "Forest Restoration Project Manager",
    },
    bio: {
      ka: "მართავს აღდგენისა და გამწვანების პროექტებს დაგეგმვიდან მრავალწლიან მონიტორინგამდე. მუშაობდა დონორის დაფინანსებულ სარეაბილიტაციო პროგრამებზე.",
      en: "Manages restoration and greening projects from planning through multi-year monitoring. Has worked on donor-funded rehabilitation programmes.",
    },
    photo: "/team/placeholder-4.svg",
    credentials: {
      ka: ["სატყეო მეურნეობის მაგისტრი"],
      en: ["MSc in Forestry Management"],
    },
    order: 4,
    published: true,
  },
]

export function getTeam(): TeamMember[] {
  return team
    .filter((member) => member.published)
    .sort((a, b) => a.order - b.order)
}
