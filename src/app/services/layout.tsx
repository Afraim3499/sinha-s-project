import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sourcing & Product Development Services | Concept to Delivery",
  description: "End-to-end support for apparel and consumer goods manufacturing. Specialized in Tech Packs, Factory Sourcing, QC, Materials, and Logistics.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Sourcing & Product Development Services | Sinha Sourcing Hub Ltd",
    description: "Concept to delivery support: Sourcing, QC, Logistics, and Product Development.",
    images: [{ url: "/service-factory.png" }],
  },
}

export default function ServicesLayout({
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
        "name": "Services",
        "item": "https://sinhasourcinghub.com/services"
      }
    ]
  };

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
