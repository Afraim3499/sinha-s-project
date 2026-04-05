import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Sinha Sourcing Hub Ltd | Our Story & Expertise",
  description: "Learn how we built a more structured way to source and develop products, rooted in family trade heritage and technical production understanding.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Sinha Sourcing Hub Ltd | Our Story & Expertise",
    description: "Our story, heritage, and technical approach to global sourcing.",
    images: [{ url: "/about-detail.png" }],
  },
}

export default function AboutLayout({
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
        "name": "About",
        "item": "https://sinhasourcinghub.com/about"
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
