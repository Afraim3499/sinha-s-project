import { Button } from "@/components/ui/button"
import { ShieldCheck, Leaf, Zap, CheckCircle2, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { SustainabilityHero } from "@/components/sustainability/SustainabilityHero"
import { SustainabilityContent } from "@/components/sustainability/SustainabilityContent"

export const metadata: Metadata = {
  title: "Sustainability & Responsibility | Sinha Sourcing Hub Ltd",
  description: "Responsible production should be handled with evidence, not decoration. Discover our approach to ethical sourcing and verifiable standards.",
  alternates: {
    canonical: "/sustainability",
  },
}

export default function SustainabilityPage() {
  return (
    <div className="pt-24 bg-background">
      <SustainabilityHero />
      <SustainabilityContent />

      {/* 4. VERIFIED INFORMATION CARD (Visual/Editorial Split) */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              <div className="relative aspect-square lg:aspect-[4/5] bg-stone-100 rounded-3xl overflow-hidden shadow-2xl group order-2 lg:order-1">
                 <Image 
                   src="/images/sustainability/verified-sustainability-audit.png" 
                   alt="Verified textile audit tag" 
                   fill 
                   className="object-cover group-hover:scale-105 transition-transform duration-[3000ms]" 
                   sizes="(max-width: 1024px) 100vw, 50vw" 
                 />
                 <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400 mb-4 flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" /> Operational Truth
                    </p>
                    <p className="text-2xl font-serif italic text-white/95 leading-snug">Verification is our standard, <br/> not an afterthought.</p>
                 </div>
              </div>

              <div className="space-y-10 order-1 lg:order-2">
                 <div className="space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 block">Editorial Clarification</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold italic text-stone-900 leading-tight">
                       A note on verified information.
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500/20" />
                 </div>
                 
                 <div className="space-y-8 text-stone-600 font-light leading-relaxed text-lg md:text-xl">
                    <p className="border-l-2 border-emerald-500/10 pl-8">
                       If specific audits, certifications, welfare initiatives, or social programmes are referenced on the site, they are supported by current evidence and reviewed regularly. 
                    </p>
                    <p className="pl-8 text-stone-400">
                       Responsibility claims are only credible when they match operational reality. We ensure that every claim is anchored in verifiable documentation and real-world compliance.
                    </p>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* 5. COMMUNITY CARE: THE HUMAN LEGACY (Masterclass Warm Redesign) */}
      <section className="py-24 md:py-32 lg:py-48 bg-[#fdfcfb] text-stone-900 relative overflow-hidden">
        {/* Soft, nurturing background gradient */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.04),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[30%] aspect-square bg-[#f59e0b]/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-600 block px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 w-fit">Verifiable Social Impact</span>
                   <div className="flex-1 h-px bg-stone-100" />
                </div>
                <h2 className="text-4xl md:text-[5rem] font-serif font-bold italic text-stone-900 leading-[1.05] tracking-tight">
                  Being a <span className="text-stone-300">giver</span> <br/> in a sea of takers.
                </h2>
              </div>

              <div className="space-y-10 text-stone-600 font-light leading-relaxed text-lg md:text-xl">
                <p className="border-l-4 border-emerald-500/20 pl-8 font-serif italic text-stone-800 text-2xl">
                  &quot;To be responsible is to care for the vulnerable as much as the viable.&quot;
                </p>
                <p className="pl-[2.2rem]">
                  At Sinha, we believe that sustainable enterprise is only possible when the community thrives alongside us. This is why we dedicate significant resources to empowering the next generation through direct, evidence-led support.
                </p>
                
                <div className="pl-8 grid grid-cols-1 gap-8 pt-4">
                  <div className="flex items-start gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 max-md:bg-emerald-500 max-md:text-white group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                        <CheckCircle2 className="w-5 h-5" />
                     </div>
                     <div>
                        <h4 className="text-stone-900 text-[10px] uppercase font-bold tracking-[0.3em] mb-2">Specialized Education</h4>
                        <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
                           Financing and sustaining facilities for children with special needs across our sourcing regions.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 max-md:bg-emerald-500 max-md:text-white group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                        <Heart className="w-5 h-5" />
                     </div>
                     <div>
                        <h4 className="text-stone-900 text-[10px] uppercase font-bold tracking-[0.3em] mb-2">Family & Student Empowerment</h4>
                        <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
                           Direct distribution of books and educational materials to marginalized students and their families.
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-4 md:gap-8 relative">
                 {/* Main Image: Students with Books */}
                 <div className="col-span-2 md:col-span-1 relative mt-12">
                    <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white ring-1 ring-stone-100 group">
                       <Image 
                         src="/images/sustainability/community-giving-books.png" 
                         alt="Bangladeshi students receiving books" 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-[4000ms] brightness-[1.02]" 
                         sizes="(max-width: 1024px) 100vw, 33vw" 
                       />
                       <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                 </div>
                 
                 {/* Offset Image: Specialized School */}
                 <div className="col-span-2 md:col-span-1 relative -mt-6 md:mt-0">
                    <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white ring-1 ring-stone-100 group">
                       <Image 
                         src="/images/sustainability/community-school-impact.png" 
                         alt="Modern sunlit specialized classroom" 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-[4000ms] brightness-[1.02]" 
                         sizes="(max-width: 1024px) 100vw, 33vw" 
                       />
                       <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 bg-gradient-to-t from-black/20 via-black/5 to-transparent backdrop-blur-[2px]">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
                                <Heart className="w-4 h-4 text-emerald-500" />
                             </div>
                             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Nurturing Capability</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Decorative floating badge */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                    <div className="bg-white/90 backdrop-blur-md border border-stone-200 p-8 rounded-full shadow-2xl text-center transform hover:scale-110 transition-transform cursor-default">
                       <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-600 mb-1">Human Legacy</p>
                       <p className="text-xl font-serif italic text-stone-900">Givers by Choice.</p>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="py-32 bg-stone-50 overflow-hidden relative border-y border-stone-100">
         {/* Typographic Watermark Background */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span className="text-[20rem] md:text-[30rem] lg:text-[40rem] font-bold text-black/[0.02] tracking-tighter uppercase leading-none">FAQS</span>
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl">
            <div className="text-center mb-24 max-w-3xl mx-auto space-y-6">
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500 block px-4 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10 w-fit mx-auto">Responsibility Q&A</span>
               <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight text-stone-900">Ethical Sourcing & Compliance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
               {[
                 {
                   q: "How do you verify sustainability claims in manufacturing?",
                   a: "We demand verifiable documentation and current audits from factories. Rather than accepting greenwashed marketing, we rely on established international compliance certifications to validate ethical production.",
                   icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
                 },
                 {
                   q: "What does responsible sourcing mean in practice?",
                   a: "It means prioritizing safe working conditions, organizing structured supplier evaluations, ensuring fair labor practices, and sourcing low-impact materials through transparent supply chains.",
                   icon: <Leaf className="w-5 h-5 text-emerald-500" />
                 },
                 {
                   q: "Why is material selection important for ethical production?",
                   a: "Material choice directly dictates a product's environmental footprint. We help brands identify sustainable fabrics, trims, and components that align with their specific eco-goals.",
                   icon: <Zap className="w-5 h-5 text-emerald-500" />
                 },
                 {
                   q: "Can you help source eco-friendly apparel and textiles?",
                   a: "Yes. In our Categories section, we outline our capability to handle eco-products, focusing on factories equipped to process recycled or organic materials safely.",
                   icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                 }
               ].map((faq, i) => (
                 <div key={i} className="bg-white p-10 lg:p-12 border border-stone-200/60 hover:border-emerald-500/30 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                    {/* Decorative hover corner */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 -translate-y-full -translate-x-full max-md:translate-y-0 max-md:translate-x-0 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
                    
                    <div className="w-12 h-12 mb-8 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 max-md:bg-emerald-500 max-md:text-white group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                       {faq.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-6 text-stone-900 leading-snug">{faq.q}</h3>
                    <p className="text-stone-500 leading-relaxed font-light text-base">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CINEMATIC CTA SECTION (Full Bleed Visual) */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden group">
         <Image 
           src="/images/sustainability/sustainability-cta-lush-green.png" 
           alt="Lush green landscapes of sourcing origin" 
           fill 
           className="object-cover group-hover:scale-105 transition-transform duration-[4000ms] brightness-[0.85] saturate-[1.2]" 
           sizes="100vw" 
         />
         {/* Overlays for textual pop */}
         <div className="absolute inset-0 bg-stone-950/20 max-md:backdrop-blur-none backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-1000" />
         
         <div className="container mx-auto px-6 md:px-12 relative z-10 text-center space-y-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-400 drop-shadow-lg block">Take Action</span>
            <h2 className="text-3xl md:text-6xl font-serif font-bold italic leading-tight text-white max-w-4xl mx-auto drop-shadow-2xl">
              Need sourcing support that takes responsibility seriously?
            </h2>
            <div className="pt-8">
               <Button variant="outline" size="lg" className="px-16 h-12 text-[10px] uppercase tracking-[0.3em] font-bold border-white/40 text-white hover:bg-white hover:text-stone-900 transition-all rounded-none backdrop-blur-md" asChild>
                  <Link href="/contact">Start Your Inquiry</Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  )
}
