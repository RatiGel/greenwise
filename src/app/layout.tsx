import type { Metadata, Viewport } from "next"
import { Manrope, Noto_Sans_Georgian } from "next/font/google"

import { siteConfig } from "@/config/site"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-georgian",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
})

/**
 * Display face for Latin numerals and the wordmark only. Manrope has no
 * Georgian coverage, so it is never applied to body or heading text — the
 * `.font-display` utility always lists --font-sans as the next fallback.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ბიომრავალფეროვნების შეფასება",
    "ხეების ინვენტარიზაცია",
    "ხე-მცენარეთა კადასტრი",
    "დენდროლოგია",
    "ტყის აღდგენა",
    "გარემოზე ზემოქმედების შეფასება",
    "გარემოსდაცვითი კონსალტინგი",
    "ეკოლოგიური ექსპერტიზა",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  themeColor: "#1B3738",
  width: "device-width",
  initialScale: 1,
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  alternateName: siteConfig.nameKa,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address,
    addressLocality: "თბილისი",
    addressCountry: "GE",
  },
  areaServed: { "@type": "Country", name: "Georgia" },
  knowsLanguage: ["ka", "en"],
  sameAs: [siteConfig.social.facebook, siteConfig.social.linkedin],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.lang} className={`${notoSansGeorgian.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-teal-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-green-500 focus:px-4 focus:py-2 focus:text-teal-900"
        >
          გადასვლა მთავარ კონტენტზე
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  )
}
