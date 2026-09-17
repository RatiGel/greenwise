export const siteConfig = {
  name: "GREENWISE",
  nameKa: "გრინვაისი",
  tagline: "გარემოსდაცვითი კონსალტინგი",
  description:
    "ბიომრავალფეროვნების შეფასება, ხე-მცენარეთა ინვენტარიზაცია და კადასტრი, დენდროლოგია და ტყის აღდგენა — პროფესიონალური გარემოსდაცვითი კონსალტინგი დეველოპერების, მუნიციპალიტეტების, NGO-ებისა და არქიტექტორებისთვის.",
  url: "https://greenwise.ge",
  locale: "ka_GE",
  lang: "ka",

  contact: {
    phone: "+995 555 00 00 00",
    phoneHref: "+995555000000",
    email: "info@greenwise.ge",
    address: "ვაჟა-ფშაველას გამზირი 71, თბილისი, საქართველო",
    addressShort: "თბილისი, საქართველო",
    workingHours: "ორშაბათი — პარასკევი, 10:00 — 18:00",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Vazha-Pshavela+Avenue+71,+Tbilisi,+Georgia&output=embed",
  },

  /** Digits only, no "+" — required by the wa.me URL format. */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "995555000000",

  social: {
    facebook: "https://facebook.com/greenwise.ge",
    linkedin: "https://linkedin.com/company/greenwise-ge",
  },
} as const

export type SiteConfig = typeof siteConfig
