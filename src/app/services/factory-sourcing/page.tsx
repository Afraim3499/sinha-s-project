import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, ArrowUpRight, BarChart, Server, Link as LinkIcon, Users, Layers, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Factory Sourcing & Supplier Alignment | Sinha Sourcing Hub Ltd",
  description: "Identify and align the right manufacturing partner based on category capability, volume, quality, and commercial fit.",
}

export default function FactorySourcingPage() {
  return (
    <div className="pt-24 bg-background">
      {/* 1. HERO */}
      <section className="py-24 border-b border-border bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-12">
            <ArrowLeft className="w-3 h-3" /> Back to Services
          </Link>
          <div className="max-w-4xl space-y-8">
            <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
               <span className="w-8 h-px bg-accent/30" />
               Factory Sourcing & Supplier Alignment
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              The right factory fit is a <br className="hidden lg:block"/>
              <span className="italic font-normal">strategic decision,</span> not just a contact list.
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
              Supplier selection should reflect category expertise, production capability, communication quality, order profile, compliance considerations, and execution fit. We help buyers make that decision with greater care.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REGIONAL LOGIC */}
      <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero-2.png" alt="Sourcing Map" fill className="object-cover scale-105" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Sourcing Geography</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight italic">
                  How we think about sourcing geography
                </h2>
                <p className="text-white/70 font-light leading-relaxed text-lg">
                  Different categories often require different supplier strengths. We support sourcing decisions across Bangladesh, wider South Asia, China, and other relevant supply options depending on the product and project requirement.
                </p>
             </div>
             <div className="relative aspect-square lg:aspect-auto lg:h-[600px] border border-white/10 bg-black/40 p-8 flex flex-col justify-between">
                <div>
                   <Globe className="w-8 h-8 text-accent opacity-50 mb-8" />
                   <div className="space-y-6">
                      {[
                        { region: "Bangladesh", focus: "Scale, Knit, Denim, Structural" },
                        { region: "China", focus: "Technical Materials, Complex Assembly" },
                        { region: "South Asia", focus: "Specialized Craft, Agility" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-2 pb-6 border-b border-white/10 last:border-0">
                           <h4 className="font-serif text-xl italic text-white/90">{item.region}</h4>
                           <p className="text-[10px] font-mono uppercase tracking-widest text-accent">{item.focus}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE ASSESS & 4. WHAT BUYERS NEED */}
      <section className="py-32 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
             {/* What factory alignment should consider */}
             <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Assessment</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold italic">What factory alignment should consider</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    "Category capability",
                    "Order size & suitability",
                    "Quality expectations",
                    "Material & trim compatibility",
                    "Communication reliability",
                    "Production planning fit",
                    "Compliance requirements",
                    "Commercial viability"
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-6 border border-border/50">
                       <ArrowUpRight className="w-4 h-4 text-accent shrink-0" />
                       <span className="text-sm font-bold uppercase tracking-widest text-stone-700">{point}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* What we typically need to begin */}
             <div className="space-y-12 lg:border-l lg:border-border/50 lg:pl-24">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Initial Requirements</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold italic">What we need to begin sourcing review</h2>
                </div>
                <ul className="space-y-6">
                  {[
                    { title: "Product category", icon: <Layers className="w-4 h-4" /> },
                    { title: "Target market or intended positioning", icon: <Target className="w-4 h-4" /> },
                    { title: "Available specs or references", icon: <LinkIcon className="w-4 h-4" /> },
                    { title: "Estimated volume or development stage", icon: <BarChart className="w-4 h-4" /> },
                    { title: "Timing expectations", icon: <Server className="w-4 h-4" /> },
                    { title: "Any quality or compliance requirements", icon: <Users className="w-4 h-4" /> }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-6">
                       <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-foreground/40 shrink-0">
                          {item.icon}
                       </div>
                       <p className="text-foreground/80 font-light leading-relaxed">{item.title}</p>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-32 text-center border-t border-border bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl space-y-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Need help identifying the right manufacturing partner?
           </h2>
           <div className="pt-8">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Discuss Factory Sourcing</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
