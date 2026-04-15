"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

const VIDEOS = [
  {
    src: "https://res.cloudinary.com/dg2zdbldr/video/upload/v1776292399/men_s_fashion_1_nctrik.mp4",
    title: "The Art of Structure",
    subtitle: "Precision in every thread",
    description: "Translating a sketch into a wearable piece is an exercise in discipline. We meticulously oversee every stitch and seam, ensuring that the final garment embodies both strength and elegance, standing the test of reality."
  },
  {
    src: "https://res.cloudinary.com/dg2zdbldr/video/upload/v1776292398/womaen_fashion_with_leather_jacket_ufepbe.mp4",
    title: "Mastering the Elements",
    subtitle: "Endurance meets design",
    description: "Crafting leather and heavy outerwear is a specialized craft. We partner with artisans and facilities who deeply respect the raw materials, ensuring hardware and textiles come together to create enduring, substantial pieces."
  },
  {
    src: "https://res.cloudinary.com/dg2zdbldr/video/upload/v1776292398/women_fashion_with_velvet_moorhb.mp4",
    title: "Fluidity and Form",
    subtitle: "The language of drape",
    description: "Working with delicate fabrics like velvet requires a gentle touch and a profound understanding of movement. We guide the tailoring process so that every drape feels natural, luxurious, and effortlessly sophisticated."
  },
  {
    src: "https://res.cloudinary.com/dg2zdbldr/video/upload/v1776292398/women_fashion_with_over_coat_vc6pcz.mp4",
    title: "The Perfect Layer",
    subtitle: "Silhouette defined",
    description: "A great coat is more than just warmth; it is the defining silhouette of a season. We dedicate ourselves to the precise grading and pressing techniques that give layered garments their distinctive, premium character."
  }
]

const cinematicTextVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } 
  }
}

function CinematicVideo({ 
  src, 
  title, 
  subtitle, 
  description, 
  align 
}: { 
  src: string; 
  title: string; 
  subtitle: string; 
  description: string; 
  align: "left" | "right" 
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const isTextInView = useInView(textRef, { once: true, margin: "-15%" })

  // Advanced Parallax & Opacity Scroll FX
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting)
      },
      { threshold: 0.3, rootMargin: "0px" } // Requires 30% visibility to trigger play
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying])

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity: opacityFade }}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 py-20 lg:py-32 ${align === "right" ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Video Container (55% width on Desktop) */}
      <motion.div 
        style={{ y: yParallax }}
        className="w-full lg:w-[55%] relative"
      >
        <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/11] w-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#050505] border border-white/5 group rounded-sm">
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-110 filter grayscale-[0.25] brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-100 transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          {/* Edge Shadows for depth inside video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none opacity-80 transition-opacity duration-1000 group-hover:opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none group-hover:opacity-50 transition-opacity duration-1000" />
          
          {/* Subtle Recording Indicator */}
          <div className="absolute top-6 right-6 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="w-1.5 h-1.5 bg-red-500/80 rounded-full animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase">Rec</span>
          </div>
        </div>
      </motion.div>

      {/* Copy Container (45% width on Desktop) */}
      <div 
        ref={textRef}
        className={`w-full lg:w-[45%] flex flex-col justify-center ${align === "right" ? "lg:text-right lg:items-end" : "lg:text-left lg:items-start"} text-center items-center`}
      >
         <motion.div 
           initial="hidden"
           animate={isTextInView ? "visible" : "hidden"}
           variants={{
             hidden: { opacity: 0 },
             visible: {
               opacity: 1,
               transition: { staggerChildren: 0.3, delayChildren: 0.2 }
             }
           }}
           className="space-y-8 max-w-lg"
         >
            <div className="space-y-4">
              <motion.span variants={cinematicTextVariants} className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent/80 block">
                {subtitle}
              </motion.span>
              <motion.h3 variants={cinematicTextVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white capitalize leading-[1.1] tracking-tight text-balance">
                <span className="italic">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
              </motion.h3>
            </div>
            
            <motion.div variants={cinematicTextVariants} className={`w-16 h-[1px] bg-white/20 ${align === "right" ? "ml-auto" : "mr-auto"} max-lg:mx-auto`} />
            
            <motion.p variants={cinematicTextVariants} className="text-white/60 font-light leading-[1.8] text-base md:text-lg">
               {description}
            </motion.p>

            <motion.div variants={cinematicTextVariants} className={`pt-6 flex ${align === "right" ? "justify-end" : "justify-start"} max-lg:justify-center`}>
               <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 hover:text-white group transition-colors relative overflow-hidden">
                  <span className="relative z-10">Discover Method</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700 ease-out relative z-10" />
               </button>
            </motion.div>
         </motion.div>
      </div>
    </motion.div>
  )
}

export function CinematicShowcase() {
  return (
    <section className="relative w-full bg-[#030303] overflow-hidden">
      {/* Deep Cinematic Background Ambience */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Top Transition Gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 py-16 lg:py-32 relative z-10">
         {/* Introductory Header - Removed 'Visual Execution' context block */}
         <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
         >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white/90">
              <span className="italic font-light">Fashion in</span> Focus
            </h2>
         </motion.div>

        {/* Alternating Video Layout */}
        <div className="flex flex-col gap-8 md:gap-16">
          {VIDEOS.map((video, idx) => (
            <CinematicVideo 
              key={idx}
              src={video.src}
              title={video.title}
              subtitle={video.subtitle}
              description={video.description}
              align={idx % 2 === 0 ? "left" : "right"} 
            />
          ))}
        </div>
      </div>

      {/* Bottom Transition Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] via-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  )
}
