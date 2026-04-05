import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Sourcing Categories | Apparel, Footwear, Bags, Home",
  description: "Specialized sourcing support across diverse product categories, including structured apparel, trainers, technical travel gear, and sustainable home textiles.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "Product Sourcing Categories | Sinha Sourcing Hub Ltd",
    description: "Explore our specialized sourcing categories: Apparel, Footwear, Bags, and Home.",
    images: [{ url: "/category-knitwear.png" }],
  },
}

export default function CategoriesLayout({
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
