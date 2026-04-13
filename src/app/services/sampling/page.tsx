import { Button } from "@/components/ui/button"
import { ArrowLeft, Box, LayoutTemplate, MessageCircle, FileCheck, Target, RefreshCw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sampling & Development Coordination | Sinha Sourcing Hub Ltd",
  description: "Identify and resolve issues before production. We support sample planning, revision handling, and pre-production readiness.",
  alternates: { canonical: "/services/sampling" },
  openGraph: {
    title: "Sampling & Development Coordination | Sinha Sourcing Hub Ltd",
    description: "Identify and resolve issues before production. We support sample planning, revision handling, and pre-production readiness.",
    url: "https://sinhasourcinghub.com/services/sampling",
    images: [{ url: "/images/services/product-sampling-1.jpg", width: 1200, height: 630, alt: "Sampling Coordination" }],
  },
}

export default function SamplingCoordinationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sinhasourcinghub.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://sinhasourcinghub.com/services" },
      { "@type": "ListItem", "position": 3, "name": "Sampling Coordination", "item": "https://sinhasourcinghub.com/services/sampling" }
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
               Sampling & Development Coordination
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              Sampling is where design intent is tested <br className="hidden lg:block"/>
              <span className="italic font-normal">before production risk increases.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
              Sampling is not a formality. It is the stage where issues can still be identified, corrected, and documented before larger commitments are made.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE SUPPORT */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/category-knitwear.png" alt="Sampling Process" fill className="object-cover scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 space-y-4 max-w-2xl">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Process Support</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold italic">How we support the sampling stage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "Sample planning", icon: <LayoutTemplate className="w-5 h-5" /> },
               { title: "Communication with suppliers", icon: <MessageCircle className="w-5 h-5" /> },
               { title: "Review coordination", icon: <FileCheck className="w-5 h-5" /> },
               { title: "Revision handling", icon: <RefreshCw className="w-5 h-5" /> },
               { title: "Construction & fit feedback", icon: <Target className="w-5 h-5" /> },
               { title: "Pre-production clarification", icon: <Box className="w-5 h-5" /> }
             ].map((item, i) => (
               <div key={i} className="flex gap-4 items-center bg-stone-950/80 p-8 border border-white/5 hover:border-accent/40 transition-colors">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-accent shrink-0">
                     {item.icon}
                  </div>
                  <p className="text-white/90 font-bold uppercase tracking-widest text-xs">{item.title}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. PROCESS IN ACTION (The Extension) */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
           <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4 max-w-2xl">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Visual Verification</span>
                 <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">The Sampling Process in Action</h2>
                 <p className="text-foreground/60 text-lg font-light leading-relaxed">
                    Seeing the detail matters. We oversee sampling across categories—from initial product development to final size measurement verification.
                 </p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Product Sampling", desc: "Verifying construction and material intent.", image: "/images/services/product-sampling-1.jpg" },
                { title: "Size Measurement", desc: "Ensuring tech pack compliance at every point.", image: "/images/services/size-measurement.jpg" },
                { title: "Material Review", desc: "Checking weight, hand-feel, and trim stability.", image: "/images/materials/threads-variety.jpg" }
              ].map((item, i) => (
                <div key={i} className="group relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-2xl">
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                     sizes="(max-width: 768px) 100vw, 33vw"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                   <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{item.title}</p>
                      <p className="text-white/80 text-xs font-light">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. WHY BRANDS NEED THIS */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-10">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Risk Management</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
               Why disciplined sample handling matters
             </h2>
             <p className="text-foreground/70 font-light leading-relaxed text-xl max-w-3xl mx-auto">
               When sample issues are overlooked or documented poorly, the same problems often return during production. Clearer sampling reduces avoidable repetition and protects the product intent.
             </p>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-stone-100 text-center border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Need support before moving from samples to production?
           </h2>
           <div className="pt-8 flex justify-center">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Discuss Sampling Support</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
    </>
  )
}
