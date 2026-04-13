import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Materials & Trim Sourcing | Sinha Sourcing Hub Ltd",
  description: "Support for sourcing fabrics, trims, components, and accessories with attention to quality, suitability, pricing, and development requirements.",
  alternates: { canonical: "/services/material-sourcing" },
  openGraph: {
    title: "Materials & Trim Sourcing | Sinha Sourcing Hub Ltd",
    description: "Support for sourcing fabrics, trims, components, and accessories with attention to quality, suitability, pricing, and development requirements.",
    url: "https://sinhasourcinghub.com/services/material-sourcing",
    images: [{ url: "/images/materials/threads-variety.jpg", width: 1200, height: 630, alt: "Materials Sourcing" }],
  },
}

export default function MaterialSourcingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sinhasourcinghub.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://sinhasourcinghub.com/services" },
      { "@type": "ListItem", "position": 3, "name": "Material Sourcing", "item": "https://sinhasourcinghub.com/services/material-sourcing" }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-24 bg-background">
      {/* 1. HERO */}
      <section className="py-24 border-b border-border bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-12">
            <ArrowLeft className="w-3 h-3" /> Back to Services
          </Link>
          <div className="max-w-4xl space-y-8">
            <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
               <span className="w-8 h-px bg-accent/30" />
               Materials & Trim Sourcing
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              Good sourcing decisions start with the right materials, <br className="hidden lg:block"/>
              <span className="italic font-normal">not just the lowest quote.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
              Material choice influences quality, appearance, performance, cost, and production viability. We help buyers review sourcing options more carefully so decisions are aligned with product goals.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE SUPPORT */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/service-materials.png" alt="Materials Background" fill className="object-cover grayscale scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/90 to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Support Scope</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Material and trim support across development and sourcing</h2>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                 {[
                   "Fabric sourcing support",
                   "Trim and accessory sourcing",
                   "Component review for category suitability",
                   "Material alternatives where needed",
                   "Pricing and availability checks",
                   "Sourcing support for selected sustainable or lower-impact directions where applicable"
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-1">
                         <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <p className="text-white/80 leading-relaxed font-light text-sm">{item}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY IT MATTERS */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="relative aspect-square lg:aspect-[4/5] bg-stone-100 overflow-hidden shadow-sm border border-border">
                <Image 
                  src="/category-knitwear.png" 
                  alt="Materials Detail" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
             </div>
             <div className="space-y-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Strategic Impact</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
                  Material decisions affect more than aesthetics
                </h2>
                <div className="space-y-6 text-foreground/70 font-light leading-relaxed text-lg">
                   <p>The wrong material choice can create cost pressure, production issues, quality inconsistency, or delays.</p>
                   <p>Better sourcing decisions reduce friction later in the process. We help you secure the right inputs before bulk manufacturing begins.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-stone-100 text-center border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Looking for support with fabrics, trims, or material planning?
           </h2>
           <div className="pt-8 flex justify-center">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Request Materials Support</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
    </>
  )
}
