"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function SustainabilityHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Smooth parallax for the image only, no darkening or grayscale
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])

  return (
    <section 
      ref={containerRef} 
      className="relative h-[calc(100vh-6rem)] min-h-[600px] flex items-center bg-stone-50 overflow-hidden select-none"
    >
      {/* 1. LUSH, BRIGHT BACKGROUND IMAGE (Clear, No Blur, No Grayscale) */}
      <div className="absolute inset-0 w-full h-full lg:w-3/5 lg:left-auto lg:right-0 overflow-hidden">
        <motion.div 
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src="/images/sustainability/artisans-manual-precision.png" 
            alt="Skilled artisans performing manual embroidery with precision" 
            fill 
            className="object-cover transition-transform duration-[3000ms] brightness-105 saturate-110" 
            priority
          />
        </motion.div>
        
        {/* Subtle architectural frame gradient to bridge with text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-transparent to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50/60 via-transparent to-transparent lg:hidden" />
      </div>

      {/* 2. TEXT AREA (High Contrast, Site Standard Typography) */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full flex items-center">
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 xl:col-span-6 bg-stone-50/90 lg:bg-stone-50 shadow-[0_0_100px_rgba(0,0,0,0.05)] lg:shadow-none p-8 md:p-12 lg:p-0 backdrop-blur-md lg:backdrop-blur-none border border-black/5 lg:border-none">
             
             <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] as const }}
                className="mb-8 md:mb-12"
             >
                <Link href="/" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-accent hover:text-stone-900 transition-all hover:gap-4 group p-2 -ml-2">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back To Home
                </Link>
             </motion.div>

             <div className="space-y-6 md:space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.25, 1, 0.5, 1] as const }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-px bg-accent/40" />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
                    Verifiable Sourcing
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] as const }}
                  className="text-4xl md:text-6xl lg:text-[4.8rem] xl:text-[5.5rem] font-serif font-bold leading-[1.05] text-stone-900 tracking-tight"
                >
                  Green <span className="italic font-light text-accent">environment</span><br/> 
                  meets <span className="italic font-normal">manual precision.</span>
                </motion.h1>

                <motion.div 
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] as const }}
                   className="space-y-8"
                >
                  <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light max-w-xl">
                    We optimize for a sustainable footprint by minimizing fossil-fuel machinery and empowering dedicated artisans—uniting meticulous quality with a radically lowered industrial carbon output.
                  </p>
                  
                  <div className="flex flex-col gap-1 items-start">
                     <div className="w-8 h-[2px] bg-accent mb-3" />
                     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Strategic Impact</span>
                     <p className="text-stone-900 text-[11px] font-bold tracking-widest uppercase">Manual-First Production Policy</p>
                  </div>
                </motion.div>
             </div>
          </div>

        </div>
      </div>

    </section>
  )
}
