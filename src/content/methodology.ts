import type { MethodologyStep } from "@/types/content"

export const methodologySteps: MethodologyStep[] = [
  {
    id: "consultation",
    step: 1,
    title: {
      ka: "პირველადი კონსულტაცია",
      en: "Initial Consultation",
    },
    description: {
      ka: "ვეცნობით პროექტს, ტერიტორიასა და ვადებს. განვსაზღვრავთ, რომელი კვლევაა სავალდებულო თქვენი ნებართვისთვის და რომელი — არა. შედეგად იღებთ მკაფიო სამუშაო ფარგლებსა და ფიქსირებულ ღირებულებას.",
      en: "We get acquainted with the project, the site, and the timeline. We determine which studies are mandatory for your permit and which are not. The outcome is a clear scope of work and a fixed price.",
    },
    deliverable: {
      ka: "სამუშაო ფარგლები და კომერციული შეთავაზება",
      en: "Scope of work and commercial proposal",
    },
    order: 1,
  },
  {
    id: "site-assessment",
    step: 2,
    title: {
      ka: "ტერიტორიის შეფასება",
      en: "Site Assessment",
    },
    description: {
      ka: "ვამუშავებთ არსებულ მასალას — ტოპოგრაფიას, გენგეგმას, კადასტრულ მონაცემებს და სატელიტურ სურათებს. ვადგენთ საველე სამუშაოების გეგმას და წინასწარ ვლინდება შესაძლო შეზღუდვები.",
      en: "We work through existing materials — topography, the site plan, cadastral data, and satellite imagery. We draw up a field-work plan and flag any likely constraints in advance.",
    },
    deliverable: {
      ka: "წინასწარი ანალიზი და საველე სამუშაოების გეგმა",
      en: "Preliminary analysis and field-work plan",
    },
    order: 2,
  },
  {
    id: "field-work",
    step: 3,
    title: {
      ka: "საველე სამუშაოები",
      en: "Field Work",
    },
    description: {
      ka: "ჩვენი სპეციალისტები ადგილზე აწარმოებენ აღრიცხვას, ნიმუშების აღებასა და GPS ფიქსაციას. ხე-მცენარეები ინომრება, სახეობები იდენტიფიცირდება, მონაცემები პირდაპირ GIS ბაზაში შედის.",
      en: "Our specialists carry out on-site recording, sampling, and GPS fixing. Trees are numbered, species are identified, and the data is entered directly into the GIS database.",
    },
    deliverable: {
      ka: "საველე მონაცემთა ბაზა და ფოტოფიქსაცია",
      en: "Field database and photographic record",
    },
    order: 3,
  },
  {
    id: "documentation",
    step: 4,
    title: {
      ka: "დოკუმენტაციის მომზადება",
      en: "Documentation",
    },
    description: {
      ka: "მონაცემები გარდაიქმნება ოფიციალურ დოკუმენტად — უწყისად, გეგმად და დასკვნად, რომელიც აკმაყოფილებს მარეგულირებლის ფორმატს. საჭიროების შემთხვევაში წარმოგადგენთ უწყებასთან კომუნიკაციაშიც.",
      en: "The data is converted into an official document — a register, a plan, and a report in the format the regulator requires. Where needed, we also represent you in communication with the authority.",
    },
    deliverable: {
      ka: "დამტკიცებისთვის მზა სრული დოკუმენტაცია",
      en: "Complete documentation ready for approval",
    },
    order: 4,
  },
]

export function getMethodologySteps(): MethodologyStep[] {
  return [...methodologySteps].sort((a, b) => a.order - b.order)
}
