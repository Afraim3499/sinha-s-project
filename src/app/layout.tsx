import type { Metadata } from "next"
import { Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { MusicProvider } from "@/components/audio/MusicProvider"

import { MusicCursor } from "@/components/audio/MusicCursor"
import { FloatingMusicButton } from "@/components/audio/FloatingMusicButton"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"
import { LoadingScreen } from "@/components/ui/loading-screen"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sinhasourcinghub.com"),
  title: "Sinha Sourcing Hub Ltd | Global Sourcing & Product Development",
  description: "Your One-Stop Global Sourcing & Product Development Partner. Connecting brands with trusted manufacturing partners across Bangladesh, South Asia, China, and globally.",
  openGraph: {
    title: "Sinha Sourcing Hub Ltd | Global Sourcing & Product Development",
    description: "Your One-Stop Global Sourcing & Product Development Partner.",
    url: "https://sinhasourcinghub.com",
    siteName: "Sinha Sourcing Hub Ltd",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sinha Sourcing Hub Ltd" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinha Sourcing Hub Ltd | Global Sourcing & Product Development",
    description: "Your One-Stop Global Sourcing & Product Development Partner.",
    images: ["/og-image.png"],
    creator: "@sinhasourcing",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sinha Sourcing Hub Ltd",
    "url": "https://sinhasourcinghub.com",
    "logo": "https://sinhasourcinghub.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@sinhasourcinghub.com",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7 Awlfield Avenue",
      "addressLocality": "London",
      "addressRegion": "England",
      "postalCode": "N17 7PD",
      "addressCountry": "GB"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sinhasourcinghub.com"
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground tracking-tight selection:bg-accent/30 selection:text-foreground antialiased font-sans">
        <PageViewTracker />
        <MusicProvider>
          <LoadingScreen />
          <MusicCursor />
          <FloatingMusicButton />
          <Navbar />
          <main className="flex flex-col min-h-screen">{children}</main>
          <Footer />
        </MusicProvider>
      </body>
    </html>
  )
}
