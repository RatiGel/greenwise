import { siteConfig } from "@/config/site"
import type { Locale } from "@/lib/i18n/config"
import { getDictionaryFor } from "@/lib/i18n/dictionaries"

export interface WhatsAppEnquiry {
  name: string
  company?: string
  phone: string
  email?: string
  projectType: string
  message: string
}

/**
 * Builds the wa.me deep link for a contact enquiry, in the visitor's language,
 * so an English visitor's enquiry does not arrive in Georgian.
 *
 * wa.me requires the number as digits only, without "+" or separators.
 */
export function buildWhatsAppUrl(
  enquiry: WhatsAppEnquiry,
  locale: Locale
): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "")
  const t = getDictionaryFor(locale).whatsapp

  const lines = [
    t.enquiryHeading,
    "",
    `${t.name}: ${enquiry.name}`,
    enquiry.company ? `${t.company}: ${enquiry.company}` : null,
    `${t.phone}: ${enquiry.phone}`,
    enquiry.email ? `${t.email}: ${enquiry.email}` : null,
    `${t.projectType}: ${enquiry.projectType}`,
    "",
    `${t.messageLabel}:`,
    enquiry.message,
  ].filter((line): line is string => line !== null)

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`
}

/** Short link used by header/footer CTAs, with no prefilled form data. */
export function buildWhatsAppQuickUrl(locale: Locale, text?: string): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "")
  const body = text ?? getDictionaryFor(locale).whatsapp.quickMessage
  return `https://wa.me/${number}?text=${encodeURIComponent(body)}`
}
