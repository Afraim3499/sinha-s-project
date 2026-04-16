import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { StoryEngine } from "@/components/ui/story-engine"

export const metadata: Metadata = {
  title: "Our Story | Sinha Sourcing Hub Ltd",
  description: "The journey of Sinha Sourcing Hub. Built on a 25-year family heritage in the textile trade and a commitment to hands-on execution.",
  alternates: {
    canonical: "/story",
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
               Our Journey
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-serif font-bold leading-[1.05] tracking-tight">
              Built on heritage, <br className="hidden lg:block"/>
              <span className="italic font-normal text-white/60">refined by execution.</span>
            </h1>
            <p className="text-base md:text-xl text-white/40 leading-relaxed font-light max-w-2xl border-l border-accent/10 pl-6 md:pl-10">
              The gap between a product concept and a successful bulk delivery is bridged by more than just an introduction. It requires a story rooted in technical understanding and hands-on legacy.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Defining The Standard</span>
           <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. THE STORY ENGINE */}
      <StoryEngine />

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
                   q: "What is the 'Golden Fiber' heritage?",
                   a: "It refers to the jute industry in Bangladesh, which was once the nation's most critical export. Our family's roots in this trade provided the foundation for our understanding of global textiles and material supply chains."
                 },
                 {
                   q: "How does 25 years of experience benefit modern brands?",
                   a: "It means we have seen every major supply chain disruption and manufacturing shift over three decades. We apply that historical perspective to help brands navigate the volatility of the 2026 market."
                 },
                 {
                   q: "Why focus on 'Execution' over 'Introduction'?",
                   a: "Introductions are easy, but execution is difficult. Most brand failures happen in the gap between a factory intro and final delivery. We focus on bridging that gap through hands-on technical management."
                 },
                 {
                   q: "Is Sinha Sourcing Hub purely a technical partner?",
                   a: "We are both technical and strategic. While we understand the factory floor, we also manage the commercial alignment and logistics that ensure a product is not just well-made, but delivered on time."
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
             src="/story-cta.png" 
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
