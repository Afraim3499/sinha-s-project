"use client"

import React from "react"
import { motion } from "framer-motion"
import { Settings, CheckCircle2, Zap, Shield, Globe, Scale, History } from "lucide-react"

const PRINCIPLES = [
  {
    title: "Respect for Technical Detail",
    tag: "01 / DETAIL",
    stamp: "Substance over style",
    desc: "Good design deserves disciplined execution. We believe the gap between a sketch and a successful garment is bridged by precise instructions, accurate tech packs, and clear communication—not just hope.",
    icon: <Settings className="w-6 h-6 text-accent" />
  },
  {
    title: "Execution Over Introduction",
    tag: "02 / ACTION",
    stamp: "Engagement over intro",
    desc: "Many agencies simply introduce buyers to factories. We believe real value comes from managing what happens next: the sampling, the revisions, the inspections, and the shipment readiness.",
    icon: <Zap className="w-6 h-6 text-accent" />
  },
  {
    title: "Factory Alignment, Not Factory Chasing",
    tag: "03 / PARTNERSHIP",
    stamp: "Partnership over parity",
    desc: "The cheapest factory is rarely the best factory for every project. We align buyers with suppliers based on category capability, order profile, and quality expectation, creating more stable partnerships.",
    icon: <Globe className="w-6 h-6 text-accent" />
  },
  {
    title: "No Strategic Silence",
    tag: "04 / CANDOR",
    stamp: "Truth over comfort",
    desc: "Manufacturing involves friction. When issues arise during production, we believe in telling buyers early so problems can be solved, rather than staying quiet and hoping they disappear.",
    icon: <Shield className="w-6 h-6 text-accent" />
  },
  {
    title: "Evidence Over Claims",
    tag: "05 / REALITY",
    stamp: "Fact over jargon",
    desc: "We do not deal in vague sustainability jargon or unverified compliance claims. If a factory certification is required, we look for the documentation. We prefer operating reality over marketing language.",
    icon: <CheckCircle2 className="w-6 h-6 text-accent" />
  },
  {
    title: "Commercial Practicality",
    tag: "06 / PRAGMATISM",
    stamp: "Margins over moodboards",
    desc: "Sourcing is a financial exercise as much as a creative one. We respect target prices, negotiate clearly, and help brands build products that work commercially as well as aesthetically.",
    icon: <Scale className="w-6 h-6 text-accent" />
  },
  {
    title: "Long-Term Reliability",
    tag: "07 / CONTINUITY",
    stamp: "Ecosystem over orders",
    desc: "Our goal is not to execute one order. Our goal is to build supply chain structures that brands can rely on season after season without needing to start from scratch.",
    icon: <History className="w-6 h-6 text-accent" />
  }
]

type Principle = {
  title: string
  tag: string
  stamp: string
  desc: string
  icon: React.ReactNode
}

export function PrincipleNode({ principle, index }: { principle: Principle, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative py-20 lg:py-28 border-b border-white/5 last:border-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        
        {/* Left: Sequence & Holographic Seal */}
        <div className="lg:col-span-5 flex items-center justify-between lg:justify-end pr-0 lg:pr-16 border-r-0 lg:border-r border-white/5 relative h-full">
          
          {/* sequence number - Moved out from behind icon */}
          <div className="flex flex-col items-start lg:items-end mr-8 lg:mr-16">
            <span className="text-5xl lg:text-7xl font-serif font-black text-white/5 transition-all duration-700 group-hover:text-accent group-hover:scale-110">
              0{index + 1}
            </span>
            <div className="h-px w-8 bg-accent/20 mt-2" />
          </div>

          {/* Simplified Premium Seal */}
          <div className="relative w-32 h-32 lg:w-44 lg:h-44 group/seal">
            <div className="absolute inset-0 border border-white/10 rounded-full transition-all duration-700 group-hover:border-accent group-hover:scale-110" />
            <div className="absolute inset-4 bg-stone-900/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-700 group-hover:bg-accent group-hover:shadow-[0_0_60px_rgba(180,140,80,0.3)]">
              <div className="transition-all duration-700 group-hover:scale-110 group-hover:text-stone-950 text-accent">
                {React.cloneElement(principle.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 lg:w-12 lg:h-12" })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Content */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <span className="text-[10px] font-bold text-accent/50 uppercase tracking-[0.4em] font-mono">
              Operational_Principle_0{index + 1}
            </span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-4xl lg:text-6xl font-serif font-bold text-white transition-all duration-700 group-hover:text-accent group-hover:translate-x-2">
              {principle.title}
            </h3>
            <p className="text-white/40 text-lg lg:text-3xl font-light leading-relaxed max-w-2xl transition-all duration-700 group-hover:text-white/70">
              {principle.desc}
            </p>
          </div>
          
          {/* Dynamic Resolution Tag */}
          <div className="flex items-center gap-4 justify-center lg:justify-start opacity-0 group-hover:opacity-100 transition-all duration-700">
             <div className="w-12 h-px bg-accent/40" />
             <span className="text-[9px] font-bold text-accent uppercase tracking-[0.3em]">{principle.stamp}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PrinciplesEngine() {
  return (
    <div className="bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="py-12">
          {PRINCIPLES.map((principle, i) => (
            <PrincipleNode 
              key={i} 
              principle={principle} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
