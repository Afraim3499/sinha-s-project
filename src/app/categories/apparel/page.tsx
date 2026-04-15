"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Factory, Globe, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionSection } from "@/components/ui/motion-section"

const APPAREL_CATEGORIES = [
  {
    title: "Casual & Sportswear",
    items: ["Sweatshirts", "T-shirts", "Tops", "Polo Shirts"],
    desc: "Everyday essentials that require high-volume consistency and material stability.",
    icon: <Zap className="w-5 h-5 text-accent" />,
    images: ["/images/apparel/casual-clothing-1.jpg", "/apparel-focus-hero.png"]
  },
  {
    title: "Formal & Corporate",
    items: ["Formal Shirts", "Casual Shirts", "Structured Tops"],
    desc: "Technical construction for shirts where collar stability and stitching precision are paramount.",
    icon: <Scissors className="w-5 h-5 text-accent" />,
    images: ["/formal-shirts-clean.png", "/images/apparel/shirts-formal-varied-2.jpg"]
  },
  {
    title: "Bottoms & Denim",
    items: ["Baggy Pants", "Jeans (Denim)", "Casual Trousers"],
    desc: "Durable construction handling heavier fabric weights and complex wash treatments.",
    icon: <ShieldCheck className="w-5 h-5 text-accent" />,
    images: ["/images/apparel/denim-pants-1.jpg", "/images/apparel/denim-jackets-1.jpg", "/images/apparel/denim-qc-inspection.jpg", "/images/apparel/denim-storage.jpg"]
  },
  {
    title: "Specialized Segments",
    items: ["Childrenswear", "Jackets", "Outerwear"],
    desc: "Niche production requirements for safety compliance (kids) and weather-resistant finishing.",
    icon: <Factory className="w-5 h-5 text-accent" />,
    images: ["/category-childrens-wear.png", "/outerwear-jacket-premium.png"]
  }
]

export default function ApparelPage() {
  const { scrollYProgress } = useScroll()
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 200])
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-950">
         <motion.div 
           style={{ y: yParallax, opacity: opacityHero }}
           className="absolute inset-0 z-0"
         >
            <Image 
              src="/hero-qc-south-asian.webp" 
              alt="Quality control and apparel inspection" 
              fill 
              priority
              className="object-cover brightness-[0.4] saturate-[0.8]" 
            />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-stone-950 to-transparent" />
         </motion.div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full mb-10">
            <Link href="/categories" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-accent transition-colors mb-12 lg:mb-20">
               <ArrowLeft className="w-3 h-3" /> All Categories
            </Link>
            
            <MotionSection className="max-w-5xl space-y-8">
               <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent block">The Primary Focus</span>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05]">
                 Apparel Sourcing & <br/>
                 <span className="italic font-normal text-white/80">Production Management.</span>
               </h1>
               <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-2xl border-l border-accent/20 pl-8">
                 Helping brands bridge the gap between design intent and bulk reality across diverse garment categories.
               </p>
            </MotionSection>
         </div>
         
         {/* Decorative floating badge */}
         <div className="absolute bottom-12 right-4 md:right-12 z-20">
            <div className="border border-white/10 backdrop-blur-md bg-stone-950/40 p-6 md:p-10 space-y-2">
               <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">Real-World Assurance</p>
               <p className="text-white/60 text-xs font-light max-w-[180px]">Photo: In-line quality inspection at one of our primary apparel manufacturing partners.</p>
            </div>
         </div>
      </section>

      {/* 2. CATEGORY CLASSIFICATIONS (The Requested Increase) */}
      <section className="py-24 md:py-32 lg:py-48 relative overflow-hidden bg-white">
         <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
               {/* Left Narrative Pillar */}
               <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-6">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Product Matrix</span>
                     <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight text-stone-950">
                        Operational focus on <br/> diversified apparel.
                     </h2>
                     <div className="w-16 h-px bg-accent/40" />
                  </div>
                  
                  <div className="space-y-8 text-stone-600 font-light leading-relaxed text-lg lg:text-xl">
                     <p className="border-l-2 border-accent/10 pl-8">
                        Most manufacturing delays are caused by an advisor&apos;s lack of category-specific technical knowledge. We navigate each apparel sub-sector with an understanding of its unique construction requirements.
                     </p>
                     <p className="pl-8 text-stone-400">
                        Whether it&apos;s managing the wash-cycle consistency of baggy denim or the collar-stability of formal shirting, our team provides the technical oversight needed for a controlled production journey.
                     </p>
                  </div>
               </div>

               {/* Right Product Grid */}
               <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                   {APPAREL_CATEGORIES.map((cat: { title: string; items: string[]; desc: string; icon: React.ReactNode; images: string[] }, i: number) => (
                    <MotionSection key={i} delay={i * 0.1} className="bg-stone-50 p-8 lg:p-10 rounded-3xl border border-stone-100 hover:border-accent/30 transition-all duration-500 group shadow-sm hover:shadow-xl flex flex-col h-full">
                       <div className="flex-1">
                          <div className="w-12 h-12 mb-8 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-stone-100 group-hover:scale-110 transition-transform">
                             {cat.icon}
                          </div>
                          <h3 className="text-2xl font-serif font-bold mb-4 text-stone-950">{cat.title}</h3>
                          <p className="text-stone-500 text-sm leading-relaxed mb-8 font-light">{cat.desc}</p>
                          
                          {/* NEW: Multi-image Grid */}
                          <div className={`grid ${cat.images.length > 2 ? 'grid-cols-2 gap-2' : 'grid-cols-1 gap-2'} mb-8`}>
                             {cat.images.map((img: string, idx: number) => (
                                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
                                   <Image 
                                     src={img} 
                                     alt={`${cat.title} variation ${idx + 1}`} 
                                     fill 
                                     className="object-cover  transition-all duration-700"
                                     sizes="(max-width: 768px) 50vw, 20vw"
                                   />
                                </div>
                             ))}
                          </div>

                          <ul className="space-y-3 border-t border-stone-100 pt-8">
                             {cat.items.map((item: string, idx: number) => (
                               <li key={idx} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-accent transition-colors">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                                  {item}
                               </li>
                             ))}
                          </ul>
                       </div>
                    </MotionSection>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 3. TECHNICAL PERSPECTIVE (The 'Execution' Column) */}
      <section className="py-24 bg-stone-50 border-y border-stone-200/50">
         <div className="container mx-auto px-6 md:px-12 w-full max-w-5xl text-center space-y-16">
            <MotionSection className="space-y-6">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Execution Philosophy</span>
               <h2 className="text-3xl md:text-5xl font-serif font-bold italic text-stone-950 leading-tight">
                  Precision is the foundation of <br/> every tech pack we handle.
               </h2>
            </MotionSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
               {[
                 { title: "MOQ Optimization", desc: "We align your volume requirements with factories capable of high-frequency or high-volume output.", icon: <Globe className="w-5 h-5 text-accent" /> },
                 { title: "Material Vetting", desc: "Technical review of GSM, shrinkage, fastness, and hand-feel before final development approval.", icon: <Factory className="w-5 h-5 text-accent" /> },
                 { title: "In-Line Clarity", desc: "Visual verification of stitching standards and finishing quality directly at the needle-point.", icon: <ShieldCheck className="w-5 h-5 text-accent" /> }
               ].map((item, i) => (
                 <div key={i} className="space-y-6 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-accent/5 flex items-center justify-center border border-accent/10">
                       {item.icon}
                    </div>
                    <h4 className="text-lg font-serif font-bold text-stone-900 leading-tight">{item.title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-32 lg:py-48 bg-stone-950 text-white text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <Image src="/images/sustainability/artisans-manual-precision.png" alt="Sourcing focus" fill className="object-cover" sizes="100vw" />
         </div>
         <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl space-y-12">
            <h2 className="text-3xl md:text-6xl font-serif font-bold italic leading-tight shadow-xl">
               Ready to discuss your specialized <br className="hidden md:block"/> apparel project?
            </h2>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
               From formal shirting to children&apos;s wear, we provide the technical and operational bridge your supply chain needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
               <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                  <Link href="/contact">Launch Project Inquiry</Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  )
}
