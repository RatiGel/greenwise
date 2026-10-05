export const siteConfig = {
  name: "GREENWISE",
  nameKa: "გრინვაისი",
  tagline: {
    ka: "გარემოსდაცვითი კონსალტინგი",
    en: "Environmental Consulting",
  },
  description: {
    ka: "ბიომრავალფეროვნების შეფასება, ხე-მცენარეთა ინვენტარიზაცია და კადასტრი, დენდროლოგია და ტყის აღდგენა — პროფესიონალური გარემოსდაცვითი კონსალტინგი დეველოპერების, მუნიციპალიტეტების, NGO-ებისა და არქიტექტორებისთვის.",
    en: "Biodiversity assessment, tree inventory and cadastre, dendrology and forest restoration — professional environmental consulting for developers, municipalities, NGOs and architects.",
  },
  url: "https://greenwise.ge",

  /** OpenGraph locale per language. */
  ogLocale: { ka: "ka_GE", en: "en_US" },

  contact: {
    phone: "+995 555 00 00 00",
    phoneHref: "+995555000000",
    email: "info@greenwise.ge",
    address: {
      ka: "ვაჟა-ფშაველას გამზირი 71, თბილისი, საქართველო",
      en: "71 Vazha-Pshavela Avenue, Tbilisi, Georgia",
    },
    addressShort: { ka: "თბილისი, საქართველო", en: "Tbilisi, Georgia" },
    workingHours: {
      ka: "ორშაბათი — პარასკევი, 10:00 — 18:00",
      en: "Monday — Friday, 10:00 — 18:00",
    },
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
