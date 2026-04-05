"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Factory, FileSearch, ShieldCheck, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MotionSection } from "@/components/ui/motion-section"
import { TechnicalOverlay } from "@/components/ui/technical-overlay"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* 1. NARRATIVE HERO (Locked to Viewport) */}
      <section className="relative h-screen flex items-center pt-24 overflow-hidden bg-stone-50 border-b border-border">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <MotionSection className="max-w-5xl mx-auto text-center space-y-12">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] text-accent flex items-center justify-center gap-4">
               <span className="w-8 h-px bg-accent/30" />
               About Us
               <span className="w-8 h-px bg-accent/30" />
            </p>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight text-stone-900">
              A clearer route from <br className="hidden lg:block" />
              <span className="italic font-normal">design intent to delivered product.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light max-w-2xl mx-auto border-t border-accent/10 pt-10">
              Sinha Sourcing Hub Ltd is a UK-headquartered product development and sourcing partner. We help brands build better supply chains across Bangladesh, wider South Asia, and China.
            </p>
          </MotionSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Our Journey</span>
           <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. HERITAGE / ORIGIN */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden shadow-xl border border-border">
               <Image 
                 src="/heritage_expert_worker.png" 
                 alt="Heritage Fabric" 
                 fill 
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
               />
               <TechnicalOverlay label="ORIGIN_AXIS" coordinates="23.7104° N, 90.4074° E" />
               <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-2">Trade Legacy</p>
                  <p className="text-2xl font-serif italic text-white/90">&ldquo;The Golden Fiber era.&rdquo;</p>
               </div>
            </div>
            
            <MotionSection delay={0.2} className="space-y-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Heritage</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                Built on trade heritage, <br className="hidden lg:block"/> shaped by <span className="italic font-normal">hands-on product understanding.</span>
              </h2>
              <div className="space-y-6 text-foreground/70 leading-relaxed text-lg font-light">
                <p>
                  We come from a background rooted in a family trading heritage connected to Bangladesh&apos;s jute industry—historically known as the &ldquo;Golden Fiber&rdquo; for its role in the global textile trade.
                </p>
                <p>
                  Today, our business operates between the UK and key manufacturing hubs in Asia. We bring together a deep understanding of multi-disciplinary supply chain operations, financial strategy, and <Link href="/process" className="text-foreground hover:text-accent font-medium underline decoration-border/50 underline-offset-4 transition-colors">hands-on product execution</Link>.
                </p>
                <p>
                  We grew up understanding what actual factory floors look like, how negotiations work, and where delays usually happen. We use that experience to give brands a more reliable way to manage development and production.
                </p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* 3. WHY DEVELOPMENT STAGE MATTERS */}
      <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/service-pd.png" alt="Development" fill className="object-cover grayscale scale-105" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <MotionSection className="max-w-4xl mx-auto space-y-10 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Development Focus</span>
             <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight">
                The gap between a sketch <br className="hidden md:block"/> and a tech pack.
             </h2>
             <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light mt-8">
                <p>
                  Many sourcing agents focus entirely on factory introductions and price negotiation. We understand that production issues often start earlier—during development.
                </p>
                <p>
                  We place heavy emphasis on clarifying specifications, organizing <Link href="/services/sampling" className="text-white hover:text-accent underline transition-colors underline-offset-4">sample reviews</Link>, and identifying <Link href="/services/material-sourcing" className="text-white hover:text-accent underline transition-colors underline-offset-4">material</Link> or construction risks before bulk production begins. When the development stage is managed properly, production is far more likely to run without disruption.
                </p>
             </div>
          </MotionSection>
        </div>
      </section>

      {/* 4. WHAT WE BRING (SKILLS GRID) */}
      <section className="py-32 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <MotionSection className="mb-20 space-y-4 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Core Competencies</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">What <span className="italic font-normal">We Bring.</span></h2>
          </MotionSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 border border-border/40">
            {[
              { title: "Industrial Alignment", desc: "Matching product categories with the right manufacturing facility.", icon: <Factory className="w-5 h-5" /> },
              { title: "Development Clarity", desc: "Helping brands refine instructions, tech packs, and sampling.", icon: <FileSearch className="w-5 h-5" /> },
              { title: "Quality Discipline", desc: "Coordinating structured inspections and compliance requirements.", icon: <ShieldCheck className="w-5 h-5" /> },
              { title: "Execution Focus", desc: "Managing timelines, communication, and delivery readiness.", icon: <Clock className="w-5 h-5" /> }
            ].map((skill) => (
              <MotionSection key={skill.title} delay={0.1} className="bg-white p-10 space-y-8 group hover:bg-stone-100 transition-colors">
                <div className="w-12 h-12 flex items-center justify-center border border-border/50 text-accent group-hover:scale-110 transition-transform duration-500">
                  {skill.icon}
                </div>
                <div>
                   <h4 className="text-lg font-serif font-bold mb-4 group-hover:italic transition-all duration-300">{skill.title}</h4>
                   <p className="text-foreground/60 leading-relaxed text-sm font-light">{skill.desc}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5 & 6. MISSION AND VISION */}
      <section className="py-32 bg-white border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
            <MotionSection className="space-y-10 border-l px-8 border-accent/20">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">Our Mission</h3>
              <p className="text-3xl font-serif italic text-foreground tracking-tight leading-relaxed">
                &ldquo;To provide brands with a more transparent, organized, and reliable path from product concept to bulk delivery.&rdquo;
              </p>
            </MotionSection>
            <MotionSection delay={0.2} className="space-y-10 border-l px-8 border-accent/20">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">Our Vision</h3>
              <p className="text-3xl font-serif italic text-foreground tracking-tight leading-relaxed">
                &ldquo;To build sourcing relationships that brands can rely on for long-term supply chain stability.&rdquo;
              </p>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* 7. VALUES (WHAT GUIDES OUR WORK) */}
      <section className="py-32 bg-stone-100">
         <div className="container mx-auto px-4 md:px-8">
            <MotionSection className="text-center mb-20 space-y-4 max-w-2xl mx-auto">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Principles</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold italic">What guides our work</h2>
            </MotionSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
               {[
                 { 
                   title: "Evidence over claims.", 
                   desc: "If a factory has a certification, we check it. If an eco-material is specified, we seek documentation. We prefer verified facts over sourcing jargon." 
                 },
                 { 
                   title: "Technical respect.", 
                   desc: "A good design deserves proper execution. We treat product specifications with the technical seriousness they require." 
                 },
                 { 
                   title: "Communication discipline.", 
                   desc: "No silent periods when issues arise. We believe in letting buyers know where things stand, whether the news is good or bad." 
                 }
                ].map((value) => (
                  <MotionSection key={value.title} delay={0.1} className="bg-white p-12 border border-border shadow-sm group">
                    <h3 className="text-xl font-serif font-bold mb-6 group-hover:text-accent transition-colors">{value.title}</h3>
                    <p className="text-foreground/60 leading-relaxed font-light">{value.desc}</p>
                 </MotionSection>
               ))}
            </div>
         </div>
      </section>

      {/* 8. FAQ FOR SEO, AEO, AIO, SXO, GEO */}
      <section className="py-32 bg-background border-t border-border">
         <div className="container mx-auto px-4 md:px-8">
            <MotionSection className="text-center mb-16 max-w-3xl mx-auto">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Knowledge Base</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold italic mt-4">Frequently Asked Questions</h2>
            </MotionSection>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What does an end-to-end product development partner do?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "An end-to-end partner manages the entire lifecycle—from translating design concepts into structured tech packs to factory sourcing, material procurement, quality control, and final logistics."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does Sinha Sourcing Hub ensure quality control in Asia?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We implement structured quality discipline throughout the manufacturing process. This includes organizing sample reviews early, conducting mid-line inspections, and enforcing strict compliance standards before final delivery readiness."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which product categories do you specialize in sourcing?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We focus our expertise on key consumer goods: structured apparel, complex footwear, durable bags, premium home textiles, and verified eco-products. We align each category with highly capable, vetted manufacturers."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is the development stage critical for bulk production?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most manufacturing delays stem from unclear development. By clarifying tech packs, identifying material risks, and perfecting sampling upfront, we reduce avoidable errors and ensure smoother bulk production."
                    }
                  }
                ]
              }) }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
               {[
                 {
                   q: "What does an end-to-end product development partner do?",
                   a: "An end-to-end partner manages the entire lifecycle—from translating design concepts into structured tech packs to factory sourcing, material procurement, quality control, and final logistics."
                 },
                 {
                   q: "How does Sinha Sourcing Hub ensure quality control in Asia?",
                   a: "We implement structured quality discipline throughout the manufacturing process. This includes organizing sample reviews early, conducting mid-line inspections, and enforcing strict compliance standards before final delivery readiness."
                 },
                 {
                   q: "Which product categories do you specialize in sourcing?",
                   a: "We focus our expertise on key consumer goods: structured apparel, complex footwear, durable bags, premium home textiles, and verified eco-products. We align each category with highly capable, vetted manufacturers."
                 },
                 {
                   q: "Why is the development stage critical for bulk production?",
                   a: "Most manufacturing delays stem from unclear development. By clarifying tech packs, identifying material risks, and perfecting sampling upfront, we reduce avoidable errors and ensure smoother bulk production."
                 }
                ].map((faq) => (
                  <MotionSection key={faq.q} delay={0.1} className="bg-stone-50 p-8 md:p-10 border border-border/50 hover:bg-stone-100 transition-colors">
                    <h3 className="text-xl font-serif font-bold mb-4 text-foreground leading-snug">{faq.q}</h3>
                    <p className="text-foreground/70 leading-relaxed font-light text-sm md:text-base">{faq.a}</p>
                 </MotionSection>
               ))}
            </div>
         </div>
      </section>

      {/* 9. CLOSING CTA */}
      <section className="py-40 bg-stone-900 text-white text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <MotionSection className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
              Looking for a partner capable of more than an introduction?
            </h2>
            <div className="flex justify-center pt-8">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                <Link href="/contact">Start Your Inquiry</Link>
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>
    </main>
  )
}
