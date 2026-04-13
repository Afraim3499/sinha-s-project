import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { PrinciplesEngine } from "@/components/ui/principles-engine"

export const metadata: Metadata = {
  title: "The Principles Behind Our Work | Sinha Sourcing Hub Ltd",
  description: "The operational philosophy of Sinha Sourcing Hub. We believe in substance over style, execution over introduction, and evidence over claims.",
  alternates: {
    canonical: "/manifesto",
  },
}

export default function ApproachPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-accent">
      {/* 1. HERO */}
      <section className="relative min-h-screen flex items-center py-32 md:py-40 overflow-hidden border-b border-white/5">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,140,80,0.08),transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-accent transition-colors mb-12 lg:mb-16">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <div className="max-w-5xl space-y-8 lg:space-y-10">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
               <span className="w-12 h-px bg-accent/40" />
               Our Approach
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-serif font-bold leading-[1.05] tracking-tight">
              The principles <br className="hidden lg:block"/>
              <span className="italic font-normal text-white/60">behind our work.</span>
            </h1>
            <p className="text-base md:text-xl text-white/40 leading-relaxed font-light max-w-2xl border-l border-accent/10 pl-6 md:pl-10">
              We built Sinha Sourcing Hub Ltd on the belief that fashion supply chains need more structure and less opacity. These operational principles guide every decision we make.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Defining The Standard</span>
           <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. THE PRINCIPLES ENGINE */}
      <PrinciplesEngine />

      {/* 3. MANIFESTO FAQ (SEO, AEO, AIO Focus) */}
      <section className="py-32 bg-[#050505] border-t border-white/5">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 max-w-3xl mx-auto">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Core Philosophy</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold italic mt-4 text-white">Understanding Our Approach</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
               {[
                 {
                   q: "Why prioritize execution over introduction in sourcing?",
                   a: "Many sourcing agents act merely as middlemen making factory introductions. We prioritize execution because long-term supply chain success requires active, technical management from development to final delivery."
                 },
                 {
                   q: "How does evidence-based sourcing benefit apparel brands?",
                   a: "Instead of relying on vague sustainability claims, evidence-based sourcing demands verified documentation. This protects your brand's integrity and ensures ethical production standards are actually met."
                 },
                 {
                   q: "What makes Sinha Sourcing Hub different?",
                   a: "Our foundation is built on hands-on trade legacy. We treat your manufacturing process with the same operational rigor and financial discipline that we apply to our own multi-disciplinary investments."
                 },
                 {
                   q: "How does transparency improve the manufacturing process?",
                   a: "Complete transparency prevents compounding delays. By communicating issues early—whether material shortages or sampling errors—we empower brands to make informed decisions that keep production on track."
                 }
               ].map((faq, i) => (
                 <div key={i} className="bg-white/[0.02] p-8 md:p-10 border border-white/5 hover:border-accent/30 transition-colors">
                    <h3 className="text-xl font-serif font-bold mb-4 text-white leading-snug">{faq.q}</h3>
                    <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. CTA */}
      <section className="py-48 bg-[#030712] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="/manifesto-cta.png" 
             alt="Sinha Sourcing Excellence" 
             fill 
             className="object-cover scale-105 opacity-30 grayscale" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
           <div className="absolute inset-0 bg-stone-950/60" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-16 relative z-10">
           <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Commitment to Execution</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold italic leading-tight">
                If this is how you <br/> prefer to work, <span className="text-accent underline decoration-accent/30 underline-offset-8">we should talk.</span>
              </h2>
           </div>
           
           <div className="flex justify-center">
              <Button variant="premium" size="lg" className="px-24 h-20 text-[11px] uppercase tracking-[0.4em] font-bold rounded-none" asChild>
                 <Link href="/contact">Start Your Inquiry</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
