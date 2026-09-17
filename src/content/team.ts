import type { TeamMember } from "@/types/content"

export const team: TeamMember[] = [
  {
    id: "nino-kapanadze",
    name: "ნინო კაპანაძე",
    role: "დამფუძნებელი, წამყვანი ეკოლოგი",
    bio: "15 წელზე მეტი გამოცდილება ბიომრავალფეროვნების კვლევასა და გზშ-ს მომზადებაში. ხელმძღვანელობდა 80-ზე მეტ საექსპერტო კვლევას ენერგეტიკულ, საგზაო და სამშენებლო პროექტებში.",
    photo: "/team/placeholder-1.svg",
    credentials: ["ბიოლოგიის დოქტორი, თსუ", "გზშ-ს სერტიფიცირებული ექსპერტი"],
    order: 1,
    published: true,
  },
  {
    id: "giorgi-beridze",
    name: "გიორგი ბერიძე",
    role: "წამყვანი დენდროლოგი",
    bio: "სპეციალიზდება ხეების ფიტოსანიტარულ დიაგნოსტიკასა და ავარიულობის რისკის შეფასებაში. აწარმოა თბილისის ცენტრალური პარკების დენდროლოგიური აუდიტი.",
    photo: "/team/placeholder-2.svg",
    credentials: ["მაგისტრი, სატყეო საქმე", "ISA Certified Arborist"],
    order: 2,
    published: true,
  },
  {
    id: "mariam-tsiklauri",
    name: "მარიამ წიკლაური",
    role: "GIS სპეციალისტი, კადასტრის ხელმძღვანელი",
    bio: "ხე-მცენარეთა ინვენტარიზაციისა და კადასტრული უწყისების მომზადების მიმართულების ხელმძღვანელი. მუშაობს QGIS და ArcGIS პლატფორმებზე.",
    photo: "/team/placeholder-3.svg",
    credentials: ["გეოინფორმატიკის მაგისტრი", "QGIS სერტიფიცირებული სპეციალისტი"],
    order: 3,
    published: true,
  },
  {
    id: "levan-gogoladze",
    name: "ლევან გოგოლაძე",
    role: "ტყის აღდგენის პროექტების მენეჯერი",
    bio: "მართავს აღდგენისა და გამწვანების პროექტებს დაგეგმვიდან მრავალწლიან მონიტორინგამდე. მუშაობდა დონორის დაფინანსებულ სარეაბილიტაციო პროგრამებზე.",
    photo: "/team/placeholder-4.svg",
    credentials: ["სატყეო მეურნეობის მაგისტრი"],
    order: 4,
    published: true,
  },
]

export function getTeam(): TeamMember[] {
  return team
    .filter((member) => member.published)
    .sort((a, b) => a.order - b.order)
}
