import type { Metadata, Viewport } from "next"
import { Manrope, Noto_Sans_Georgian } from "next/font/google"

import { siteConfig } from "@/config/site"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/sonner"
import { locales, localizedPath } from "@/lib/i18n/config"
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries"
import { LocaleProvider } from "@/lib/i18n/locale-context"

import "../globals.css"

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

/**
 * `generateMetadata` rather than a static `metadata` export: the title,
 * description and keywords are all per-locale, and a static export cannot
 * read the route's locale.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const dict = await getDictionary()
  const title = `${siteConfig.name} — ${siteConfig.tagline[locale]}`
  const description = siteConfig.description[locale]

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description,
    keywords: [...dict.meta.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: { canonical: localizedPath("/", locale) },
    openGraph: {
      type: "website",
      locale: siteConfig.ogLocale[locale],
      url: `${siteConfig.url}${localizedPath("/", locale)}`,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#1B3738",
  width: "device-width",
  initialScale: 1,
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[lang]">) {
  const locale = await getLocale()
  const dictionary = await getDictionary()

  // Built per render rather than at module scope: the description, address
  // and locality all vary by locale.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: siteConfig.nameKa,
    description: siteConfig.description[locale],
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address[locale],
      addressLocality: dictionary.meta.addressLocality,
      addressCountry: "GE",
    },
    areaServed: { "@type": "Country", name: "Georgia" },
    knowsLanguage: ["ka", "en"],
    sameAs: [siteConfig.social.facebook, siteConfig.social.linkedin],
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${notoSansGeorgian.variable} ${manrope.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-teal-900">
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-green-500 focus:px-4 focus:py-2 focus:text-teal-900"
          >
            {dictionary.nav.skipToContent}
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
        </LocaleProvider>
      </body>
    </html>
  )
}
