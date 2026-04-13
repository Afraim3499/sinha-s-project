import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, MessageSquare, FileText, Anchor, AlertTriangle, PackageCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Production & Delivery Support | Sinha Sourcing Hub Ltd",
  description: "Communication, documentation, and coordination to ensure production timelines and shipment readiness.",
  alternates: { canonical: "/services/logistics" },
  openGraph: {
    title: "Production & Delivery Support | Sinha Sourcing Hub Ltd",
    description: "Communication, documentation, and coordination to ensure production timelines and shipment readiness.",
    url: "https://sinhasourcinghub.com/services/logistics",
    images: [{ url: "/service-logistics.png", width: 1200, height: 630, alt: "Logistics Support" }],
  },
}

export default function ProductionDeliveryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sinhasourcinghub.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://sinhasourcinghub.com/services" },
      { "@type": "ListItem", "position": 3, "name": "Production & Delivery", "item": "https://sinhasourcinghub.com/services/logistics" }
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
               Production & Delivery Support
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              Execution depends on disciplined follow-through <br className="hidden lg:block"/>
              <span className="italic font-normal">after the order is placed.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
              Production management does not end with factory confirmation. It requires communication, timing discipline, document readiness, and attention to execution through to shipment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE SUPPORT */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/service-logistics.png" alt="Logistics Network" fill className="object-cover scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Fulfillment</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Where we help during production and delivery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "Production communication support", icon: <MessageSquare className="w-5 h-5" /> },
               { title: "Timeline coordination", icon: <Clock className="w-5 h-5" /> },
               { title: "Document readiness guidance", icon: <FileText className="w-5 h-5" /> },
               { title: "Shipment-related coordination", icon: <Anchor className="w-5 h-5" /> },
               { title: "Issue escalation support", icon: <AlertTriangle className="w-5 h-5" /> },
               { title: "Delivery preparation follow-through", icon: <PackageCheck className="w-5 h-5" /> }
             ].map((item, i) => (
               <div key={i} className="flex flex-col gap-6 bg-stone-950/80 p-8 border border-white/5 hover:border-accent/40 transition-colors">
                  <div className="text-accent opacity-80 shrink-0">
                     {item.icon}
                  </div>
                  <p className="text-white/90 leading-relaxed font-light text-sm">{item.title}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. WHY IT MATTERS */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-10">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Risk Management</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
               Why this stage often decides the experience
             </h2>
             <p className="text-foreground/70 font-light leading-relaxed text-xl max-w-3xl mx-auto">
               Even well-developed products can become difficult projects when production communication is weak or shipment preparation is disorganised. Better coordination protects the buyer experience and reduces avoidable disruption.
             </p>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-stone-100 text-center border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Need more dependable support through production and shipment readiness?
           </h2>
           <div className="pt-8 flex justify-center">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Discuss Delivery Support</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
    </>
  )
}
