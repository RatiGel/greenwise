import { siteConfig } from "@/config/site"

export interface WhatsAppEnquiry {
  name: string
  company?: string
  phone: string
  email?: string
  projectType: string
  message: string
}

/**
 * Builds the wa.me deep link for a contact enquiry.
 *
 * The message body is assembled as plain text and URL-encoded in full; wa.me
 * requires the number as digits only, without "+" or separators.
 */
export function buildWhatsAppUrl(enquiry: WhatsAppEnquiry): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "")

  const lines = [
    "ახალი მოთხოვნა — greenwise.ge",
    "",
    `სახელი: ${enquiry.name}`,
    enquiry.company ? `კომპანია: ${enquiry.company}` : null,
    `ტელეფონი: ${enquiry.phone}`,
    enquiry.email ? `ელ-ფოსტა: ${enquiry.email}` : null,
    `პროექტის ტიპი: ${enquiry.projectType}`,
    "",
    "შეტყობინება:",
    enquiry.message,
  ].filter((line): line is string => line !== null)

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`
}

/** Short link used by header/footer CTAs, with no prefilled form data. */
export function buildWhatsAppQuickUrl(text?: string): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "")
  const body =
    text ?? "გამარჯობა! მაინტერესებს კონსულტაცია გარემოსდაცვით მომსახურებაზე."
  return `https://wa.me/${number}?text=${encodeURIComponent(body)}`
}
