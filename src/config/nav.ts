import { services } from "@/content/services"

export interface NavItem {
  href: string
  label: string
  children?: NavItem[]
}

export const mainNav: NavItem[] = [
  { href: "/", label: "მთავარი" },
  { href: "/about", label: "ჩვენ შესახებ" },
  {
    href: "/services",
    label: "სერვისები",
    children: services
      .filter((service) => service.published)
      .sort((a, b) => a.order - b.order)
      .map((service) => ({
        href: `/services/${service.slug}`,
        label: service.title,
      })),
  },
  { href: "/clients", label: "კლიენტები" },
  { href: "/methodology", label: "მეთოდოლოგია" },
  { href: "/contact", label: "კონტაქტი" },
]
