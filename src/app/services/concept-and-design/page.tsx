import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, Target, PenTool, GitCommit, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Development & Tech Pack Support | Sinha Sourcing Hub Ltd",
  description: "Support for tech pack creation, specification clarification, measurements, and construction guidance before bulk production.",
}

export default function ConceptDesignPage() {
  return (
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
               Product Development
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              The difference between a sketch and a successful production run is <br className="hidden lg:block"/>
              <span className="italic font-normal">technical clarity.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
              We help brands translate design intent into practical manufacturing instructions, reducing guesswork on the factory floor.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE SUPPORT */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5 space-y-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Scope of Work</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Support across the development stage</h2>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/40 border border-border/40">
                 {[
                   { title: "Tech Pack Creation", icon: <PenTool className="w-4 h-4" /> },
                   { title: "Specification Refinement", icon: <Target className="w-4 h-4" /> },
                   { title: "Measurement & Grading", icon: <Layers className="w-4 h-4" /> },
                   { title: "Material Feasibility", icon: <GitCommit className="w-4 h-4" /> },
                   { title: "Construction Guidance", icon: <Zap className="w-4 h-4" /> }
                 ].map((item, i) => (
                   <div key={i} className="bg-white p-8 space-y-4 hover:bg-stone-50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-accent">
                         {item.icon}
                      </div>
                      <h3 className="font-bold text-sm uppercase tracking-widest leading-relaxed text-stone-900">{item.title}</h3>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY IT MATTERS & IMAGE */}
      <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="relative aspect-[4/5] bg-stone-800 overflow-hidden shadow-2xl border border-white/5">
                <Image 
                  src="/service-pd.png" 
                  alt="Product Development" 
                  fill 
                  className="object-cover grayscale opacity-80 mix-blend-screen"
                />
             </div>
             <div className="space-y-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Why It Matters</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
                  Clear instructions protect your investment.
                </h2>
                <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
                   <p>Factories build what they are given. Unclear instructions lead to multiple sample rounds, delays, and cost overruns.</p>
                   <p>When the tech pack and specifications are detailed accurately from the start, the supplier understands exactly what is required, allowing the project to move forward more reliably.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-stone-100 text-center">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl space-y-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Looking for help refining your product specifications before production?
           </h2>
           <div className="pt-8">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Request Tech Pack Support</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
