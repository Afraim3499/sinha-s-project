"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2, Leaf, ShieldCheck, Zap } from "lucide-react"

export function SustainabilityContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const } }
  }

  return (
    <section className="py-24 md:py-32 lg:py-48 bg-white text-stone-900 overflow-hidden relative border-t border-stone-100">
      {/* Subtle Background Decorator (Bright & Simple) */}
      <div className="absolute top-0 right-0 w-[60%] h-full opacity-5 bg-gradient-to-bl from-accent/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl">
        {/* Editorial Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] as const }}
          className="max-w-4xl mb-24 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block px-4 py-2 bg-accent/5 rounded-full border border-accent/10 w-fit">
              Core Philosophy
            </span>
            <div className="flex-1 h-px bg-stone-100 hidden md:block" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-serif font-bold italic leading-tight text-stone-900">
            People over machinery.
          </h2>
        </motion.div>

        {/* Informational Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
           
           {/* Left Pillar: The Narrative Statement */}
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-50px" }}
             className="lg:col-span-5 space-y-12"
           >
              <motion.div variants={childVariants} className="space-y-6 text-stone-600 font-light leading-relaxed text-lg lg:text-xl">
                 <p className="border-l-2 border-accent/30 pl-8 relative">
                   Most mass-market production relies heavily on fossil fuels, heavy automation, and high-carbon infrastructures. We view sustainability through a fundamentally different paradigm.
                 </p>
                 <p className="pl-8 text-stone-400">
                   By empowering a vast workforce of dedicated artisans and manual experts, we deliver superior, pinpoint apparel precision while significantly reducing reliance on oil-guzzling automation. True sustainability starts with human capability.
                 </p>
              </motion.div>

              {/* High-Impact Imagery Panel (Vivid & Clear) */}
              <motion.div variants={childVariants} className="relative mt-12 w-full aspect-[4/5] rounded-3xl overflow-hidden border border-stone-100 group shadow-lg">
                 <Image 
                   src="/images/sustainability/eco-friendly-environment.png" 
                   alt="Eco-friendly textile environment" 
                   fill 
                   className="object-cover scale-100 group-hover:scale-105 transition-all duration-[3000ms] brightness-105 saturate-110 ease-out" 
                 />
                 <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 flex items-center gap-2">
                     <Leaf className="w-3 h-3" /> Zero-Emission Process Focus
                   </p>
                   <p className="font-serif italic text-white text-xl md:text-2xl leading-tight">Authentic human oversight in production</p>
                 </div>
              </motion.div>
           </motion.div>

           {/* Right Pillar: Strategic Context & Points */}
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-50px" }}
             className="lg:col-span-7 lg:pl-16 relative"
           >
              <div className="space-y-12">
                 <motion.div variants={childVariants}>
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-6 px-4 py-2 bg-accent/5 rounded-full border border-accent/10 w-fit">Execution Context</span>
                   <h3 className="text-3xl md:text-4xl lg:text-[3.5rem] font-serif font-bold text-stone-900 leading-tight italic max-w-2xl border-b border-stone-100 pb-10">
                     What responsible sourcing means in practical terms.
                   </h3>
                 </motion.div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {[
                      {
                        title: "Greenhouse Gas Focus",
                        desc: "Radically lowering Greenhouse Gas (GHG) emissions by prioritizing skilled manual operations over power-intensive automation.",
                        icon: <Leaf className="w-5 h-5 text-accent" />
                      },
                      {
                        title: "Artisanal Precision",
                        desc: "Utilizing highly trained human labor for pinpoint stitching and high-end garment assembly.",
                        icon: <Zap className="w-5 h-5 text-accent" />
                      },
                      {
                        title: "Human Quality Mesh",
                        desc: "Production primarily handled manually allows for every item to receive continuous, instant human oversight.",
                        icon: <ShieldCheck className="w-5 h-5 text-accent" />
                      },
                      {
                         title: "Ethical Remuneration",
                         desc: "Strict adherence to fair treatment, excellent working environments, and fair pay for artisan networks.",
                         icon: <CheckCircle2 className="w-5 h-5 text-accent" />
                      }
                    ].map((point, i) => (
                      <motion.div 
                        key={i} 
                        variants={childVariants} 
                        className="p-8 bg-stone-50 border border-stone-100 rounded-2xl hover:border-accent/40 hover:bg-white transition-all duration-500 group shadow-sm hover:shadow-lg"
                      >
                         <div className="w-12 h-12 mb-6 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform">
                           {point.icon}
                         </div>
                         <h4 className="text-stone-900 font-serif font-bold text-xl mb-3 tracking-wide">{point.title}</h4>
                         <p className="text-stone-500 font-light leading-relaxed text-sm">{point.desc}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </motion.div>

        </div>
      </div>
    </section>
  )
}
