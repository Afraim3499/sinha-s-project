import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, ShieldCheck, Target, RefreshCw, BarChart, FileCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quality Control & Compliance | Sinha Sourcing Hub Ltd",
  description: "Prevent delays and defects with pre-production quality checks, inline inspection coordination, and compliance verification.",
}

export default function QualityControlPage() {
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
               Quality Control & Compliance
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              Quality issues are easier to <br className="hidden lg:block"/>
              <span className="italic font-normal">prevent early than fix late.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-light">
              We support quality control thinking and inspection coordination so buyers have stronger visibility before goods move too far down the line.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE SUPPORT */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Inspection Scope</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Quality and compliance-related coordination</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {[
               { title: "Pre-production checks", icon: <Target className="w-5 h-5" /> },
               { title: "In-line review support", icon: <RefreshCw className="w-5 h-5" /> },
               { title: "Final inspection coordination", icon: <ShieldCheck className="w-5 h-5" /> },
               { title: "Loading supervision support", icon: <BarChart className="w-5 h-5" /> },
               { title: "Communication around quality", icon: <CheckCircle2 className="w-5 h-5" /> },
               { title: "Supplier compliance review", icon: <FileCheck className="w-5 h-5" /> }
             ].map((item, i) => (
               <div key={i} className="bg-stone-50 p-8 space-y-6 border border-border/50 hover:bg-stone-100 transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center bg-white border border-border/50 text-accent">
                     {item.icon}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 leading-relaxed">{item.title}</h3>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. A NOTE ON COMPLIANCE */}
      <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Ethical Stance</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
                  A practical note on compliance
                </h2>
                <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
                   <p>Compliance language should always match reality. Where specific standards, certifications, or audit frameworks are referenced, they should be confirmed case by case based on the supplier and project involved.</p>
                   <p>We believe in verified facts over broad industry claims, ensuring that if a process requires certification, you have the documentation to prove it.</p>
                </div>
             </div>
             <div className="relative aspect-[4/5] bg-stone-800 overflow-hidden shadow-2xl border border-white/5">
                <Image 
                  src="/service-qc.png" 
                  alt="Quality Control Audit" 
                  fill 
                  className="object-cover grayscale opacity-80 mix-blend-screen"
                />
             </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-stone-100 text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl space-y-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold italic leading-tight">
             Need stronger visibility over production quality and supplier standards?
           </h2>
           <div className="pt-8 flex justify-center">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                 <Link href="/contact">Discuss QC & Compliance</Link>
              </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
