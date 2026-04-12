"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Factory, Globe, ShieldCheck, Ship, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MotionSection, PREMIUM_EASE } from "@/components/ui/motion-section"
import { ProcessRoadmap } from "@/components/ui/process-roadmap"
import { PainPointInfographic } from "@/components/ui/pain-point-infographic"
import { TestimonialSlideshow } from "@/components/ui/testimonial-slideshow"
import { getTestimonials } from "@/app/actions/testimonials"

const HERO_SLIDES = [
  {
    src: "/hero-pd-new.webp",
    alt: "Product development meeting with technical fabric samples",
    eyebrow: "Global sourcing & product development",
    heading: "From concept to \nbulk production.",
    subheading: "We help brands source, develop, and manage production with clarity.",
    align: "right",
    gradient: "bg-gradient-to-l from-black/60 via-black/10 to-transparent"
  },
  {
    src: "/hero-factory-south-asian.webp",
    alt: "Modern garment factory production line in Bangladesh",
    eyebrow: "Factory Sourcing",
    heading: "Matching capability \nto requirements.",
    subheading: "Identifying and aligning suitable manufacturing partners based on your specific quality and scale.",
    align: "right",
    gradient: "bg-gradient-to-l from-black/60 via-black/10 to-transparent"
  },
  {
    src: "/hero-materials.webp",
    alt: "Selection of high-quality textile threads and fabric swatches",
    eyebrow: "Materials & Trims",
    heading: "Sourced with \ntechnical precision.",
    subheading: "Guiding material selection so design intent matches production reality.",
    align: "right",
    gradient: "bg-gradient-to-l from-black/60 via-black/10 to-transparent"
  },
  {
    src: "/hero-qc-south-asian.webp",
    alt: "Quality control specialist inspecting finished apparel",
    eyebrow: "Quality & Compliance",
    heading: "Verification throughout \nthe process.",
    subheading: "Pre-production planning, in-line reviews, and final inspection verification before shipment.",
    align: "right",
    gradient: "bg-gradient-to-l from-black/60 via-black/10 to-transparent"
  },
  {
    src: "/hero-logistics-new.webp",
    alt: "Organized shipping containers at a global logistics hub",
    eyebrow: "Logistics & Handover",
    heading: "Controlled handover \nof goods.",
    subheading: "Coordinating documentation and delivery readiness so execution remains organized to the end.",
    align: "right",
    gradient: "bg-gradient-to-l from-black/60 via-black/10 to-transparent"
  },
  {
    type: "collage",
    src: "/apparel-focus-hero.png",
    alt: "Collage of different apparel categories from denim to casual wear",
    eyebrow: "Product Specialization",
    heading: "Multi-category \nsourcing support.",
    subheading: "From structured apparel to technical footwear and travel gear. We align your product needs with expert manufacturing.",
    align: "right",
    gradient: "bg-black/30"
  }
]

import { CapabilityBoard } from "@/components/ui/capability-board"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [testimonials, setTestimonials] = React.useState<{
    id?: string;
    name: string;
    company: string | null;
    content: string;
    role: string | null;
    image_url: string | null;
  }[]>([])
  
  React.useEffect(() => {
    getTestimonials().then(setTestimonials)
  }, [])
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 9000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* 1. DISTILLED CINEMATIC HERO */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center bg-stone-900 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <motion.div
            key={slide.src || idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === idx ? 1 : 0 }}
            transition={{ duration: 1.5, ease: PREMIUM_EASE }}
            className="absolute inset-0 z-0"
            style={{ pointerEvents: currentSlide === idx ? "auto" : "none" }}
          >
            {slide.type === "collage" ? (
              <div className="relative w-full h-full bg-stone-950 flex items-center justify-center overflow-hidden">
                 <div className="grid grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-0 w-full h-full opacity-90 transition-all duration-1000">
                    {/* Main Category: Apparel */}
                     <div className="col-span-2 md:col-span-6 row-span-1 md:row-span-2 relative overflow-hidden">
                        <Image src="/apparel-focus-hero.png" alt="Apparel Sourcing" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute bottom-4 left-4">
                           <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/80">Category_01 // Apparel</p>
                        </div>
                     </div>
                    {/* Footwear */}
                     <div className="col-span-1 md:col-span-3 row-span-1 relative overflow-hidden">
                        <Image src="/home-category-footwear.png" alt="Footwear Sourcing" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                        <div className="absolute bottom-4 left-4">
                           <p className="text-[8px] font-bold uppercase tracking-widest text-white/60">Cat_02 // Footwear</p>
                        </div>
                     </div>
                    {/* Bags */}
                     <div className="col-span-1 md:col-span-3 row-span-1 relative overflow-hidden">
                        <Image src="/home-category-bags.png" alt="Bags Sourcing" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                        <div className="absolute bottom-4 left-4">
                           <p className="text-[8px] font-bold uppercase tracking-widest text-white/60">Cat_03 // Bags</p>
                        </div>
                     </div>
                    {/* Denim Sourcing (New Variation) */}
                    <div className="col-span-1 md:col-span-4 row-span-1 relative overflow-hidden group">
                       <Image src="/images/apparel/denim-pants-1.jpg" alt="Denim Sourcing" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute bottom-4 left-4">
                          <p className="text-[8px] font-bold uppercase tracking-widest text-white/60">Cat_04 // Denim</p>
                       </div>
                    </div>
                    {/* Casual Sourcing (New Variation) */}
                    <div className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden group">
                       <Image src="/images/apparel/casual-clothing-1.jpg" alt="Casual Clothing Range" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute bottom-4 left-4">
                          <p className="text-[8px] font-bold uppercase tracking-widest text-white/60">Cat_05 // Casual</p>
                       </div>
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent pointer-events-none" />
              </div>
            ) : (
              <motion.div
                initial={false}
                animate={{ 
                  scale: currentSlide === idx ? 1.1 : 1, 
                }}
                transition={{ duration: 12, ease: "linear" }}
                className="relative w-full h-full"
              >
                 {(idx <= 1 || currentSlide === idx || Math.abs(currentSlide - idx) === 1) && (
                   <Image
                     src={slide.src!}
                     alt={slide.alt || "Sinha Sourcing Hub"}
                     fill
                     priority={idx <= 1}
                     sizes="100vw"
                     className="object-cover"
                   />
                 )}
                <div className={`absolute inset-0 ${slide.gradient} pointer-events-none`} />
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* CINEMATIC OVERLAY EFFECTS */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        <div className="absolute inset-0 z-20 pointer-events-none">
          {HERO_SLIDES.map((slide, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === idx ? 1 : 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-between py-24 md:py-32">
                {/* REMOVED TOP MARKERS & EYEBROWS FOR CLEANER LOOK */}
                <div />

                {/* CENTRAL DESIGN HUB (MINIMALIST EDITORIAL) */}
                <div className="w-full pointer-events-auto text-right flex flex-col items-end">
                   <motion.div
                     initial={{ x: 20, opacity: 0 }}
                     animate={{ x: currentSlide === idx ? 0 : 20, opacity: currentSlide === idx ? 1 : 0 }}
                     transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                     className="max-w-[620px] w-full"
                   >
                      <motion.h1 
                        className="text-4xl md:text-[52px] lg:text-[60px] font-serif font-light italic leading-[0.9] text-white/95 tracking-tight drop-shadow-sm"
                      >
                        {slide.heading}
                      </motion.h1>
                   </motion.div>
                </div>

                {/* BOTTOM SUBTITLE (FILM STYLE) */}
                <div className="flex justify-end items-end pt-6 pb-20 md:pb-8">
                   <motion.p 
                     key={`sub-${idx}`}
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: currentSlide === idx ? 0.35 : 0, x: currentSlide === idx ? 0 : 10 }}
                     transition={{ duration: 1.5, delay: 0.6 }}
                     className="text-[9px] md:text-[12px] text-white tracking-[0.3em] font-light uppercase max-w-[300px] md:max-w-[500px] leading-relaxed italic text-right"
                   >
                      {slide.subheading}
                   </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SLIDE INDICATORS (CENTERED THUMBNAILS) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3 md:gap-4 lg:gap-5">
           {HERO_SLIDES.map((slide, idx) => (
              <button 
                key={`indicator-${idx}`}
                onClick={() => setCurrentSlide(idx)}
                className="group relative"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border transition-all duration-700 ${currentSlide === idx ? 'border-accent scale-110 ring-2 ring-accent/20' : 'border-white/10 scale-90 opacity-40 hover:opacity-100 hover:scale-100'}`}>
                  <Image 
                    src={slide.src} 
                    alt={`View ${slide.eyebrow}`} 
                    fill 
                    sizes="48px"
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-black/40 ${currentSlide === idx ? 'opacity-0' : 'group-hover:opacity-0'} transition-opacity`} />
                </div>
                {currentSlide === idx && (
                  <motion.div 
                    layoutId="hero-active-pill"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                  />
                )}
              </button>
           ))}
        </div>
      </section>

      {/* 2. CAPABILITY INFOGRAPHIC */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a] text-white border-b border-white/5 relative overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,140,80,0.02),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <CapabilityBoard />
        </div>
      </section>

      {/* 3. BRAND INTRODUCTION */}
      <section className="py-16 lg:py-20 bg-background text-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             <MotionSection className="relative aspect-video lg:aspect-[4/3] bg-stone-100 overflow-hidden shadow-sm max-h-[500px]">
                <Image 
                  src="/about-technical-new.png" 
                  alt="Product Development" 
                  fill 
                  className="object-cover  transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </MotionSection>
            
            <MotionSection className="space-y-8 lg:-ml-8 lg:bg-background lg:p-8 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Brand Introduction</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                A more structured way to <br className="hidden md:block" />
                <span className="italic font-normal">source and develop products.</span>
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed text-base lg:text-lg font-light">
                 <p>
                   The gap between a product idea and a successful production run is rarely solved by price alone. It requires technical understanding, careful supplier selection, clear communication, and disciplined execution.
                 </p>
                 <p>
                   Sinha Sourcing Hub Ltd was built to support that gap. We work with brands that want a partner capable of helping them move from concept and sampling to production and delivery with greater confidence.
                 </p>
              </div>
              <Button variant="outline" className="border-border hover:bg-stone-100 rounded-none px-10 h-10 lg:h-12 text-[10px] uppercase tracking-[0.2em] font-bold" asChild>
                <Link href="/manifesto">Learn About Our Approach</Link>
              </Button>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SNAPSHOT */}
      <section className="py-16 lg:py-24 bg-stone-50 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-8">
           <MotionSection className="mb-20 space-y-6 text-center max-w-3xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Where we support the process</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic">Services Snapshot</h2>
              <p className="text-foreground/60 text-lg font-light">Our role is to make the path from product idea to bulk delivery more controlled, more transparent, and easier to manage.</p>
           </MotionSection>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {[
                { title: "Product Development & Tech Packs", desc: "We help refine product concepts into clearer technical instructions, supported by specification details, measurements, construction notes, and development coordination.", icon: <Zap className="w-5 h-5" />, image: "/images/apparel/casual-clothing-1.jpg" },
                { title: "Factory Sourcing", desc: "We identify and align suitable manufacturing partners based on product category, scale, quality needs, and operational fit.", icon: <Factory className="w-5 h-5" />, image: "/images/apparel/denim-storage.jpg" },
                { title: "Materials & Trims", desc: "We support sourcing for fabrics, components, trims, and accessories with attention to quality, suitability, pricing, and availability.", icon: <Globe className="w-5 h-5" />, image: "/images/materials/threads-variety.jpg" },
                { title: "Quality Control & Compliance", desc: "We coordinate inspections, production checks, and compliance-related support to reduce avoidable risk before goods move forward.", icon: <ShieldCheck className="w-5 h-5" />, image: "/images/apparel/denim-qc-inspection.jpg" },
                { title: "Production & Delivery Support", desc: "We help manage communication around production planning, documentation, and delivery readiness so execution remains organised.", icon: <Ship className="w-5 h-5" />, image: "/home-service-logistics.png" }
              ].map((service, i) => (
                <MotionSection key={i} delay={i * 0.1} className="relative p-12 space-y-6 group overflow-hidden min-h-[380px] flex flex-col justify-end bg-stone-900">
                   <div className="absolute inset-0 z-0">
                     <Image src={service.image} alt={service.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/10" />
                   </div>
                   <div className="relative z-10 space-y-6">
                     <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-accent group-hover:rotate-12 transition-transform duration-500">
                       {service.icon}
                     </div>
                     <div className="space-y-3">
                       <h3 className="text-xl font-serif font-bold text-white group-hover:italic transition-all duration-300">{service.title}</h3>
                       <p className="text-white/70 text-sm leading-relaxed font-light">{service.desc}</p>
                     </div>
                   </div>
                </MotionSection>
              ))}
              <div className="bg-stone-950 p-12 flex items-center justify-center min-h-[380px] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20" />
                 <Button variant="link" className="text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-white hover:text-accent group relative z-10" asChild>
                    <Link href="/services">
                      Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
               </div>
            </div>
        </div>
      </section>


      {/* 6. PRODUCT CATEGORIES */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
              <MotionSection className="space-y-6 max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-serif font-bold"><span className="italic font-normal">Multi-category</span> <br />sourcing support</h2>
                 <p className="text-foreground/60 text-lg font-light">We support brands across a focused set of product categories with development and sourcing needs that often require different supplier strengths.</p>
              </MotionSection>
              <Button variant="outline" className="rounded-none text-[10px] uppercase tracking-[0.2em] font-bold hidden lg:flex" asChild>
                 <Link href="/categories">View Product Categories</Link>
              </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "Apparel", desc: "From everyday garments to more structured product lines. Support for development, sourcing, and production coordination.", image: "/apparel-focus-hero.png" },
                { title: "Footwear & Trainers", desc: "Projects that require careful handling of materials, construction details, fit development, and supplier alignment.", image: "/home-category-footwear.png" },
                { title: "Bags & Travel Gear", desc: "Functional and commercial bag categories with attention to materials, trims, durability, and finishing.", image: "/home-category-bags.png" },
                { title: "Home Textiles", desc: "Selected home textile categories where quality, consistency, material choice, and production management are critical.", image: "/home-category-home.png" },
                { title: "Eco Products", desc: "Exploring product directions that require better alignment between material choices and responsible production.", image: "/home-category-eco.png" }
              ].map((cat, i) => (
                <MotionSection key={i} delay={i * 0.1} className="relative p-8 group overflow-hidden bg-stone-900 min-h-[360px] flex flex-col justify-end">
                   <div className="absolute inset-0 z-0">
                     <Image src={cat.image} alt={cat.title} fill className="object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 md:opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-stone-950/10" />
                   </div>
                   <div className="relative z-10">
                     <h3 className="text-lg font-serif font-bold text-white group-hover:italic transition-all duration-300">{cat.title}</h3>
                     <div className="w-6 h-px bg-white/30 max-md:bg-accent max-md:w-10 group-hover:bg-accent group-hover:w-10 transition-all duration-500 my-4" />
                     <p className="text-white/70 text-sm leading-relaxed font-light">{cat.desc}</p>
                   </div>
                </MotionSection>
              ))}
           </div>
           
           <div className="mt-12 text-center lg:hidden">
              <Button variant="outline" className="rounded-none text-[10px] uppercase tracking-[0.2em] font-bold w-full" asChild>
                 <Link href="/categories">View Product Categories</Link>
              </Button>
           </div>
        </div>
      </section>

      {/* 6. HOW WE WORK PREVIEW */}
      <section className="py-12 lg:py-16 bg-stone-950 text-white">
        <div className="container mx-auto px-4 md:px-8">
           <MotionSection className="mb-6 lg:mb-8 space-y-2 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-serif font-bold italic">A process designed to reduce uncertainty</h2>
              <p className="text-white/60 text-sm font-light">Clearer process reduces risk. We guide projects through practical stages so decisions are made earlier, communication is tighter, and production issues are easier to manage.</p>
           </MotionSection>

           <ProcessRoadmap />

           <div className="mt-8 lg:mt-10 text-center">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-none text-[10px] uppercase tracking-[0.2em] font-bold px-12 h-10" asChild>
                 <Link href="/process">See the Full Process</Link>
              </Button>
           </div>
        </div>
      </section>

      {/* 7. WHY BRANDS WORK WITH US */}
      <section className="py-16 lg:py-20 bg-stone-50 text-foreground overflow-hidden relative border-y border-border/50">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(180,140,80,0.05),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="mb-8 lg:mb-12 text-center space-y-2 lg:space-y-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">Why buyers look for <br className="lg:hidden" /><span className="italic font-normal text-foreground/60">structured support</span></h2>
              <p className="text-foreground/60 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                Supply chains are often fragile due to avoidable gaps. We bring more structure to development, sourcing, and delivery preparation.
              </p>
           </div>

           <div className="flex flex-col items-center justify-center gap-8 lg:gap-12">
              {/* Infographic fits exactly here */}
              <PainPointInfographic />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Button variant="outline" className="border-accent text-accent text-[10px] uppercase tracking-[0.3em] font-bold px-12 h-10 lg:h-12 hover:bg-accent hover:text-white transition-all duration-500 rounded-none group" asChild>
                   <Link href="/manifesto" className="flex items-center gap-4">
                      Explore Our Manifesto <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                   </Link>
                </Button>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SLIDESHOW */}
      <TestimonialSlideshow testimonials={testimonials} />

      {/* 9. HERITAGE PREVIEW */}
      <section className="py-16 lg:py-20 bg-stone-100 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <MotionSection className="relative bg-white p-8 lg:p-12 border border-border shadow-xl z-20">
                 <div className="space-y-6 relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Credibility</span>
                    <h3 className="text-3xl lg:text-4xl font-serif font-bold italic">Built on trade heritage, shaped by hands-on product understanding.</h3>
                    <p className="text-foreground/70 font-light leading-relaxed text-sm lg:text-base">
                       Our background is rooted in a family trading heritage connected to Bangladesh&apos;s jute industry, alongside years of practical involvement across sourcing, product development, production, shipping, and related business functions.
                    </p>
                    <p className="text-foreground/70 font-light leading-relaxed text-sm lg:text-base">
                       That combination matters. It means our perspective is not limited to introducing factories. We understand the commercial and technical decisions that influence whether a project actually moves well.
                    </p>
                    <Button variant="link" className="px-0 pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 group" asChild>
                       <Link href="/about" className="flex items-center gap-2">Read Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></Link>
                    </Button>
                 </div>
              </MotionSection>

              {/* The Cinematic Right Column */}
              <MotionSection delay={0.2} direction="left" className="relative aspect-video lg:aspect-[4/3] max-h-[500px] w-full shadow-2xl overflow-hidden group">
                 <Image 
                   src="/about-technical-new.png" 
                   alt="Heritage and Production" 
                   fill 
                   className="object-cover max-md:scale-100 max-md:brightness-100 scale-105 group-hover:scale-100 brightness-95 group-hover:brightness-100 transition-all duration-1000 ease-out"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none max-md:opacity-40 opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />
                 <div className="absolute bottom-6 right-6 border border-white/20 backdrop-blur-md bg-stone-950/40 px-4 py-2 group-hover:bg-stone-950/60 transition-colors duration-1000">
                    <p className="text-[9px] font-mono tracking-widest text-white/90">SINHA_ARCHIVE // 1993</p>
                 </div>
              </MotionSection>
           </div>
        </div>
      </section>

      {/* 9. SUSTAINABILITY PREVIEW & 10. FAQ PREVIEW */}
      <section className="py-16 lg:py-24 bg-stone-950 text-white relative overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(180,140,80,0.05),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Sustainability - Left Dark Column */}
              <MotionSection className="lg:col-span-5 space-y-10">
                 <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-accent shadow-[0_0_15px_rgba(180,140,80,0.2)]">
                    <Leaf className="w-5 h-5" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Responsible production needs <br /><span className="italic font-normal text-white/60">more than a statement.</span></h2>
                 <div className="space-y-6 text-white/60 font-light leading-relaxed">
                    <p>We believe responsible sourcing should be approached through practical supplier standards, safer working conditions, better process discipline, and more transparent decision-making.</p>
                    <p>Where sustainability or compliance-related claims are made, they should be evidence-led and handled responsibly.</p>
                 </div>
                 <Button variant="outline" className="border-white/20 hover:bg-white hover:text-stone-950 rounded-none text-[10px] uppercase tracking-[0.3em] font-bold px-8 h-12" asChild>
                    <Link href="/sustainability">View Sustainability Approach</Link>
                 </Button>
              </MotionSection>

              {/* FAQ - Right Premium Interactive Cards */}
              <div className="lg:col-span-7">
                 <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Frequent Inquiries</span>
                      <h3 className="text-3xl font-serif font-bold mt-4">Common Questions</h3>
                    </div>
                    <Button variant="link" className="px-0 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-white/60 hover:text-accent group" asChild>
                       <Link href="/faq">All Queries <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></Link>
                    </Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { q: "Do you support brands at early development stage?", num: "01" },
                      { q: "Can you help if we do not yet have a full tech pack?", num: "02" },
                      { q: "How do you select suitable factories?", num: "03" },
                      { q: "What categories do you work with?", num: "04" },
                      { q: "How is quality checked during production?", num: "05" },
                      { q: "What information do you need to begin?", num: "06" }
                    ].map((item, i) => (
                      <Link key={i} href="/faq">
                        <MotionSection delay={i * 0.1} className="relative group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent/40 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[120px]">
                         <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl max-md:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                         
                         <div className="flex justify-between items-start gap-4 mt-auto">
                           <p className="font-serif italic text-white/80 max-md:text-white group-hover:text-white leading-snug text-lg">{item.q}</p>
                           <ArrowRight className="w-5 h-5 text-white/20 max-md:text-accent group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 shrink-0 mt-1" />
                         </div>
                      </MotionSection>
                      </Link>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-40 bg-stone-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <Image src="/hero-pd-new.webp" alt="Sourcing" fill className="object-cover scale-105" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
           <MotionSection className="space-y-10">
              <h2 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">Ready to discuss a product or sourcing requirement?</h2>
              <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                 Whether you are at concept stage, preparing samples, or looking for more dependable production support, we can review your requirements and advise on the next step.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                    <Link href="/contact">Start Your Inquiry</Link>
                 </Button>
                 <Button variant="outline" size="lg" className="border-white/20 hover:bg-white hover:text-black px-12 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                    <a href="mailto:projects@sinhasourcinghub.com">Email Our Team Directly</a>
                 </Button>
              </div>
           </MotionSection>
        </div>
      </section>
    </main>
  )
}
