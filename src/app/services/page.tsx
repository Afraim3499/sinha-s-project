"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Factory, Zap, ShieldCheck, Ship, Box } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MotionSection } from "@/components/ui/motion-section"
import { motion } from "framer-motion"

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Product Development & Tech Packs",
      href: "/services/concept-and-design",
      desc: "We help translate design concepts into clear manufacturing instructions, supported by specifications, measurements, and construction guidance.",
      img: "/service-pd.png",
      icon: <Zap className="w-5 h-5" />,
      tag: "01 / Development"
    },
    {
      title: "Factory Sourcing & Alignment",
      href: "/services/factory-sourcing",
      desc: "Identifying and vetting manufacturing partners based on product category, production scale, quality needs, and operational fit.",
      img: "/service-factory.png",
      icon: <Factory className="w-5 h-5" />,
      tag: "02 / Sourcing"
    },
    {
      title: "Materials & Trim Sourcing",
      href: "/services/material-sourcing",
      desc: "Support for sourcing fabrics, components, trims, and accessories with attention to quality, suitability, pricing, and availability.",
      img: "/service-materials.png",
      icon: <Globe className="w-5 h-5" />,
      tag: "03 / Materials"
    },
    {
      title: "Sampling & Development Coordination",
      href: "/services/sampling",
      desc: "Coordination of sample rounds, construction review, communication, and revision handling before bulk production begins.",
      img: "/category-knitwear.png",
      icon: <Box className="w-5 h-5" />,
      tag: "04 / Sampling"
    },
    {
      title: "Quality Control & Compliance",
      href: "/services/quality-control",
      desc: "Coordinating inspections, production checks, and compliance-related support to reduce avoidable risk during manufacturing.",
      img: "/service-qc.png",
      icon: <ShieldCheck className="w-5 h-5" />,
      tag: "05 / Quality"
    },
    {
      title: "Production & Delivery Support",
      href: "/services/logistics",
      desc: "Helping manage communication around production planning, shipment-related documentation, and delivery readiness.",
      img: "/service-logistics.png",
      icon: <Ship className="w-5 h-5" />,
      tag: "06 / Execution"
    }
  ]

  return (
    <div className="bg-stone-950 text-white min-h-screen selection:bg-accent selection:text-white">
      {/* 1. CINEMATIC HERO (Locked to Viewport) */}
      <section className="relative h-screen flex items-center pt-24 overflow-hidden border-b border-white/10">
        {/* Deep Ambient Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-factory.webp" 
            alt="Factory Production Floor" 
            fill 
            className="object-cover opacity-30 grayscale-0 md:grayscale" 
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-stone-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/40 to-stone-950" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-4xl space-y-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
            >
               <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] text-accent flex items-center gap-4">
                  <span className="w-8 h-px bg-accent/50" />
                  Our Services
               </p>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
            >
               <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-serif font-bold leading-[1.05]">
                 End-to-end product development and <br className="hidden lg:block"/>
                 <span className="italic font-normal text-white/80">production coordination.</span>
               </h1>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.2, delay: 0.5 }}
            >
               <p className="text-lg md:text-xl xl:text-2xl text-white/50 leading-relaxed font-light max-w-2xl border-l border-accent/20 pl-8">
                 Practical support across the entire sourcing process—giving brands clearer communication, better supplier alignment, and stronger control over execution.
               </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Explore Services</span>
           <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. THE GAP (Intro) */}
      <section className="py-24 lg:py-32 bg-stone-950 border-b border-white/5 text-center relative overflow-hidden">
         {/* Subtle Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="container mx-auto px-4 md:px-8 relative z-10">
            <MotionSection className="max-w-3xl mx-auto space-y-8">
               <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Bringing structure to global sourcing.</h2>
               <div className="space-y-6 text-white/60 text-lg lg:text-xl leading-relaxed font-light">
                  <p>
                    The gap between a product idea and a successful production run is rarely solved by price alone. It requires technical understanding, careful supplier selection, clear communication, and disciplined execution.
                  </p>
                  <p>
                    Our services are designed to support that gap—allowing brands to build products and supply chains with fewer avoidable errors.
                  </p>
               </div>
            </MotionSection>
         </div>
      </section>

      {/* 3. OVERVIEW OF SERVICES (Sticky Scroll Layout) */}
      <section className="py-24 lg:py-32 bg-stone-950 relative">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
              
              {/* Sticky Left Column: Overarching Title */}
              <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-6">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Capabilities</span>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic leading-tight text-white">
                   Where we support <br />the process
                 </h2>
                 <p className="text-white/60 font-light leading-relaxed max-w-sm">
                   From translating initial design concepts into actionable tech packs, to managing final delivery handovers, our services cover the critical gaps in the sourcing chain.
                 </p>
                 <div className="pt-4 hidden lg:block">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-stone-950 rounded-none text-[10px] uppercase tracking-[0.2em] px-8 h-12" asChild>
                       <Link href="/contact">Discuss a Project</Link>
                    </Button>
                 </div>
              </div>

              {/* Scrolling Right Column: Service Cards */}
              <div className="lg:w-2/3 space-y-8 lg:space-y-12">
                {serviceCategories.map((service, idx) => (
                  <MotionSection key={idx} delay={idx * 0.1} className="group relative overflow-hidden bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors duration-500 rounded-2xl flex flex-col md:flex-row">
                    
                    {/* Dark Card Content */}
                    <div className="p-8 md:p-12 flex-1 flex flex-col justify-center space-y-8 relative z-10">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
                            {service.tag}
                          </span>
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-accent border border-white/10 max-md:scale-110 max-md:bg-accent/10 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                            {service.icon}
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:italic transition-all duration-300">
                             {service.title}
                          </h3>
                          <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
                             {service.desc}
                          </p>
                       </div>

                       <div>
                          <Button variant="link" className="px-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 max-md:text-accent group-hover:text-accent flex items-center gap-3 transition-colors" asChild>
                             <Link href={service.href}>
                                View Details
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                             </Link>
                          </Button>
                       </div>
                    </div>

                    {/* Image Right Side (Desktop only, subtle on mobile) */}
                    <div className="md:w-2/5 relative min-h-[250px] md:min-h-full border-t md:border-t-0 md:border-l border-white/5 overflow-hidden">
                       <Image 
                          src={service.img} 
                          alt={service.title} 
                          fill 
                          className="object-cover max-md:grayscale-0 max-md:opacity-100 max-md:scale-100 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100 transition-all duration-1000 ease-out"
                       />
                       <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent md:bg-gradient-to-l max-md:opacity-40 opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />
                    </div>

                  </MotionSection>
                ))}
              </div>

           </div>
        </div>
      </section>

      {/* 4. WHO THIS IS FOR */}
      <section className="py-24 lg:py-32 bg-stone-950 text-white border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,140,80,0.03),transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <MotionSection className="mb-16 md:mb-20 space-y-4 max-w-3xl text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Audience</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">A partner for <br className="md:hidden" /><span className="italic font-normal text-white/60">disciplined brands.</span></h2>
          </MotionSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Technical Clarity", desc: "Brands that want fewer assumptions and clearer manufacturing instructions.", icon: <Zap className="w-5 h-5" />, num: "01" },
              { title: "Reliable Suppliers", desc: "Buyers looking for factories that match their actual capability requirements.", icon: <Factory className="w-5 h-5" />, num: "02" },
              { title: "Quality Standards", desc: "Brands that understand quality inspection is an ongoing requirement.", icon: <ShieldCheck className="w-5 h-5" />, num: "03" },
              { title: "Clearer Communication", desc: "Teams that need realistic updates and proactive problem-solving.", icon: <Globe className="w-5 h-5" />, num: "04" }
            ].map((audience, i) => (
              <MotionSection key={i} delay={i * 0.1} className="relative bg-white/[0.02] border border-white/5 p-8 lg:p-10 space-y-8 group hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-500 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/5 to-transparent max-md:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl" />
                
                <div className="flex items-center justify-between relative z-10 w-full">
                   <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-accent max-md:bg-accent/10 max-md:scale-110 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-500 border border-white/10">
                     {audience.icon}
                   </div>
                   <span className="text-[10px] font-mono text-white/20 max-md:text-accent group-hover:text-accent font-bold tracking-widest transition-colors">TYPE // {audience.num}</span>
                </div>
                
                <div className="relative z-10 mt-auto pt-8">
                   <h4 className="text-xl font-serif font-bold mb-3 max-md:italic max-md:text-accent group-hover:italic transition-all duration-300 text-white group-hover:text-accent">{audience.title}</h4>
                   <p className="text-white/50 leading-relaxed text-sm lg:text-[15px] font-light">{audience.desc}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CINEMATIC FINAL CTA */}
      <section className="py-32 lg:py-48 bg-stone-950 text-white text-center relative overflow-hidden border-t border-white/5 selection:bg-accent selection:text-white">
        <div className="absolute inset-0 z-0 opacity-15">
           <Image src="/hero-real-logistics.jpg" alt="Logistics Sourcing" fill className="object-cover scale-105 grayscale" sizes="100vw" />
           <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <MotionSection className="space-y-12">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight italic">
              Not sure where your project fits?
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              We can review your product direction, development stage, and sourcing goal to advise on the most suitable path forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Button variant="premium" size="lg" className="px-16 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none" asChild>
                <Link href="/contact">Start Your Inquiry</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-12 h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none border-white/20 hover:bg-white hover:text-stone-950" asChild>
                <Link href="/manifesto">Read the Manifesto</Link>
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  )
}
