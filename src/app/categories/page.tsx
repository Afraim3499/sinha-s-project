"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MotionSection } from "@/components/ui/motion-section"

export default function CategoriesPage() {
  const categories = [
    {
      title: "Apparel",
      desc: "Our primary expertise across Sweatshirts, T-shirts, Polo Shirts, Formal & Casual Shirts, Tops, Baggy Pants, Denim (Jeans), Jackets, and Childrenswear.",
      cta: "Explore Apparel Sourcing",
      img: "/apparel-focus-hero.png",
      tag: "Category / 01",
      href: "/categories/apparel"
    },
    {
      title: "Footwear & Trainers",
      desc: "Footwear projects often demand closer coordination across materials, components, fit, development testing, and supplier capability. We support buyers who need a more careful path from concept to sample and production.",
      cta: "Discuss a Footwear Project",
      img: "/home-category-footwear.png",
      tag: "Category / 02",
      href: "/contact"
    },
    {
      title: "Bags & Travel Gear",
      desc: "From material and trim considerations to construction durability and finish expectations, bag categories require strong coordination through development and supplier selection. We support projects that need that added attention.",
      cta: "Discuss a Bags Project",
      img: "/category-bags-gear.png",
      tag: "Category / 03",
      href: "/contact"
    },
    {
      title: "Home Textiles",
      desc: "Home textile categories require consistency, material suitability, and dependable production control. We support selected home textile sourcing and development needs where execution and quality are central.",
      cta: "Discuss a Home Textiles Project",
      img: "/ladies-knitwear-premium.png",
      tag: "Category / 04",
      href: "/contact"
    },
    {
      title: "Eco Products",
      desc: "For brands exploring more responsible or lower-impact product directions, material choice and supply chain alignment matter. We support eco-product development and sourcing with a practical, evidence-led mindset.",
      cta: "Discuss an Eco Product Project",
      img: "/service-sustainability.png",
      tag: "Category / 05",
      href: "/contact"
    }
  ]

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-accent selection:text-white">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center py-32 md:py-40 overflow-hidden border-b border-white/10">
        {/* Deep Ambient Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-materials.webp" 
            alt="Materials and Categories" 
            fill 
            className="object-cover opacity-60" 
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-stone-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/20 to-stone-950" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-accent transition-colors mb-12 lg:mb-16 relative z-20">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          
          <div className="max-w-4xl space-y-8 lg:space-y-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
            >
               <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                  <span className="w-8 h-px bg-accent/50" />
                  Product Categories
               </p>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
            >
               <h1 className="text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-serif font-bold leading-[1.05]">
                 Focused sourcing support across <br className="hidden lg:block"/>
                 <span className="italic font-normal text-white/80">key consumer categories.</span>
               </h1>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.2, delay: 0.5 }}
            >
               <p className="text-base md:text-lg xl:text-xl text-white/50 leading-relaxed font-light max-w-2xl border-l border-accent/20 pl-8">
                 Different products require different combinations of materials, construction logic, and supplier capability. We support buyers across a focused category mix.
               </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Explore Categories</span>
           <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. CATEGORY SPREADS (Editorial Magazine Layout - Viewport Locked) */}
      <section className="bg-stone-950">
         {categories.map((cat, idx) => (
            <div key={idx} className="relative h-screen flex items-center overflow-hidden border-b border-white/5 group">
               
               {/* Edge-to-Edge Background Imagery */}
               <div className="absolute inset-0 z-0">
                  <Image 
                     src={cat.img} 
                     alt={cat.title} 
                     fill 
                     className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                     sizes="100vw"
                  />
                  {/* Complex Gradients for text legibility and deep cinematic contrast */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${idx % 2 === 0 ? 'from-stone-950 via-stone-950/90' : 'from-transparent via-stone-950/90 to-stone-950'} to-transparent opacity-95`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
               </div>

               <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                     
                     {/* Text Block */}
                     <MotionSection 
                        direction={idx % 2 === 0 ? "left" : "right"} 
                        className={`lg:col-span-7 xl:col-span-6 space-y-12 ${idx % 2 !== 0 ? 'lg:col-start-6 xl:col-start-7' : ''}`}
                     >
                        <div className="flex items-center gap-6">
                           <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
                              {cat.tag}
                           </span>
                           <div className="h-px w-16 bg-accent/40 max-md:w-32 group-hover:w-32 transition-all duration-700" />
                        </div>
                        
                        <div className="space-y-8">
                           <h2 className="text-4xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] lg:-ml-4 font-serif font-bold text-white drop-shadow-2xl group-hover:italic transition-all duration-1000">
                              {cat.title}
                           </h2>
                           <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-lg border-l border-white/10 pl-8">
                              {cat.desc}
                           </p>
                        </div>
                        
                        <div className="pt-8 md:pt-12">
                           <Button variant="outline" className="rounded-none text-[10px] font-bold uppercase tracking-[0.3em] px-10 h-14 border-white/20 text-white hover:bg-white hover:text-stone-950 transition-all duration-500" asChild>
                              <Link href={cat.href} className="flex items-center gap-3">
                                 {cat.cta}
                                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                              </Link>
                           </Button>
                        </div>
                     </MotionSection>

                  </div>
               </div>
            </div>
         ))}
      </section>

      {/* 3. CINEMATIC FINAL CTA */}
      <section className="py-32 lg:py-48 bg-stone-950 text-white text-center relative overflow-hidden selection:bg-accent selection:text-white">
        <div className="absolute inset-0 z-0 opacity-15">
           <Image src="/hero-factory.webp" alt="Factory Sourcing" fill className="object-cover scale-105" sizes="100vw" />
           <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl space-y-10 mt-10">
           <MotionSection className="space-y-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block">Strategic Review</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold italic leading-tight">
                Not sure which category path fits your project best?
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                We can review your product direction and advise on the most suitable development and sourcing route.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                 <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                    <Link href="/contact">Start Your Inquiry</Link>
                 </Button>
                 <Button variant="outline" size="lg" className="px-12 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none border-white/20 hover:bg-white hover:text-stone-950" asChild>
                     <Link href="/services">Review Services</Link>
                 </Button>
              </div>
           </MotionSection>
        </div>
      </section>
    </div>
  )
}
