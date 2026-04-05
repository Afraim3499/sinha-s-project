import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Sinha Sourcing Hub Ltd",
  description: "Let's discuss your product direction and sourcing requirements. Get in touch with our team in London or Dhaka.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Sinha Sourcing Hub Ltd",
    description: "Start a sourcing inquiry with Sinha Sourcing Hub. We respond to all commercial inquiries within 48 hours.",
    images: [{ url: "/og-image.png" }],
  },
}

export default function ContactLayout({
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
        "name": "Contact",
        "item": "https://sinhasourcinghub.com/contact"
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
