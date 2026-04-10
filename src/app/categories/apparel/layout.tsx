import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apparel Sourcing Categories | Sinha Sourcing Hub Ltd",
  description: "Specialized sourcing support for knitwear, woven garments, denim, outerwear, and childrenswear. Built on technical construction knowledge and local network expertise.",
  alternates: {
    canonical: "/categories/apparel",
  },
  openGraph: {
    title: "Apparel Sourcing Categories | Sinha Sourcing Hub Ltd",
    description: "Deep expertise in knits, woven, and denim sourcing from Bangladesh and global networks.",
    url: "https://sinhasourcinghub.com/categories/apparel",
    images: [{ url: "/category-apparel-variety.png", width: 1200, height: 630, alt: "Apparel Sourcing Categories" }],
  },
}

export default function ApparelLayout({
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
        "name": "Categories",
        "item": "https://sinhasourcinghub.com/categories"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Apparel",
        "item": "https://sinhasourcinghub.com/categories/apparel"
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
