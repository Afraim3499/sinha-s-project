"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, useAnimationControls, useAnimationFrame } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id?: string
  name: string
  company: string | null
  content: string
  role: string | null
  image_url: string | null
}

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    name: "Eleanor Vance",
    company: "Aether Apparel",
    role: "Production Director",
    content: "Sinha Sourcing resolved a critical bottleneck in our structured outerwear line. Their factory vetting process caught technical gaps that three previous agents missed. Truly a masterclass in sourcing precision.",
    image_url: "https://i.pravatar.cc/150?u=eleanor"
  },
  {
    name: "Marcus Thorne",
    company: "Velora Group",
    role: "Supply Chain Head",
    content: "Managing high-volume orders across Bangladesh and China used to be a documentation nightmare. Sinha Hub transformed our delivery readiness with disciplined execution and zero-tolerance quality checks.",
    image_url: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    name: "Sophia Chen",
    company: "Lumina Home",
    role: "Lead Designer",
    content: "The bridge between my design intent and the final textile production was perfectly managed. They source materials with a technical understanding that aligns perfectly with our premium brand identity.",
    image_url: "https://i.pravatar.cc/150?u=sophia"
  },
  {
    name: "Julian Ross",
    company: "Apex Trainers",
    role: "Operations Manager",
    content: "Footwear sourcing is notoriously difficult due to construction complexity. Sinha's team oversaw our latest technical trainer rollout, handling multi-material sourcing and assembly with zero delays.",
    image_url: "https://i.pravatar.cc/150?u=julian"
  },
  {
    name: "Sarah Jenkins",
    company: "Eco-Stitch",
    role: "Founder",
    content: "Finding factories that actually adhere to sustainable standards isn't easy. Sinha Sourcing provided evidence-led vetting that gave us the confidence to scale our organic cotton range globally.",
    image_url: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "David Kalu",
    company: "Nomad Travel Gear",
    role: "Product Manager",
    content: "Sourced over 50,000 units of custom travel packs. The quality consistency from the first proto to the final bulk shipment was impeccable. Their local presence in Dhaka is a massive advantage.",
    image_url: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Isabella Martinez",
    company: "Couture Axis",
    role: "Creative Director",
    content: "They don't just find factories; they build production roadmaps. Our complex eveningwear line required specialized machinery and high-skill labor—Sinha matched us with the perfect artisanal hub.",
    image_url: "https://i.pravatar.cc/150?u=isabella"
  },
  {
    name: "Thomas Wright",
    company: "Global Logistics Ltd",
    role: "Logistics Partner",
    content: "I've handled shipments for Sinha for years. Their documentation is always precise, and their handover process is the most organized we deal with in the South Asian corridor.",
    image_url: "https://i.pravatar.cc/150?u=thomas"
  }
]

export const TestimonialSlideshow: React.FC<{ testimonials?: Testimonial[] }> = ({ testimonials }) => {
  const displayData = (testimonials && testimonials.length > 0) ? testimonials : SEED_TESTIMONIALS
  
  // Triple the data for seamless infinite scrolling
  const scrollData = [...displayData, ...displayData, ...displayData]
  
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const xPos = useRef(0)
  
  // Using useAnimationFrame for ultra-smooth performance
  useAnimationFrame((time, delta) => {
    if (isPaused) return
    
    // speed in pixels per frame (adjusted by delta for consistency)
    const speed = 0.5 * (delta / 16.6)
    xPos.current -= speed
    
    // Reset position when first set of items has scrolled past
    if (containerRef.current) {
      const itemWidth = containerRef.current.scrollWidth / 3
      if (Math.abs(xPos.current) >= itemWidth) {
        xPos.current = 0
      }
      containerRef.current.style.transform = `translateX(${xPos.current}px)`
    }
  })

  return (
    <section className="py-24 lg:py-32 bg-stone-950 border-y border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(180,140,80,0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Global Endorsements</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-white">Trust <span className="text-stone-500">Capital</span></h2>
        </motion.div>
      </div>

      <div 
        className="flex cursor-grab active:cursor-grabbing px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={containerRef}
          className="flex gap-6 lg:gap-8 transition-transform duration-0 ease-linear will-change-transform"
        >
          {scrollData.map((item, idx) => (
            <div 
              key={idx}
              className="w-[320px] md:w-[420px] shrink-0 p-8 md:p-10 bg-stone-900 shadow-2xl border border-white/5 rounded-[2rem] flex flex-col justify-between hover:border-accent/30 hover:bg-stone-900/80 transition-all duration-700 group"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                   <Quote className="w-10 h-10 text-accent/10 group-hover:text-accent/20 transition-colors" />
                   <div className="flex gap-0.5 text-accent/40">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                   </div>
                </div>
                <p className="text-lg md:text-xl font-serif font-light leading-relaxed text-white/80 group-hover:text-white transition-colors italic">
                  &quot;{item.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-5 pt-10 border-t border-white/5 mt-auto">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                  {item.image_url ? (
                     <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-accent text-xs font-bold uppercase tracking-widest">
                       {item.name.substring(0, 1)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-accent transition-colors">{item.name}</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mt-1">
                    {item.role} <span className="text-white/10 mx-2">/</span> {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
