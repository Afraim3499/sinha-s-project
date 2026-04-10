import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Sourcing Process | Sinha Sourcing Hub Ltd",
  description: "A 6-phase end-to-end sourcing framework — from Discovery & Scope to Delivery Readiness. See exactly how we architect your supply chain.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Our Sourcing Process | Sinha Sourcing Hub Ltd",
    description: "A 6-phase sourcing framework from Discovery to Delivery. Structured, transparent and built for your brand.",
    url: "https://sinhasourcinghub.com/process",
    images: [{ url: "/images/process/technical-overview.png", width: 1200, height: 630, alt: "Sinha Sourcing Process Architecture" }],
    type: "website",
  },
}

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sinhasourcinghub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Process",
        "item": "https://sinhasourcinghub.com/process"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
