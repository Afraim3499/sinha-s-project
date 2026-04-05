"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Scissors, Factory, CheckCircle2, Globe, Zap, ArrowUpRight } from "lucide-react"

const CAPABILITIES = [
  {
    title: "Product Development",
    subtitle: "Design Translation",
    desc: "Transforming design intent into production reality through accurate tech packs and pattern logic.",
    icon: <Scissors className="w-5 h-5" />,
    stats: "Pattern Logic"
  },
  {
    title: "Factory Matching",
    subtitle: "Supplier Alignment",
    desc: "Identifying manufacturing partners based on category capability and production standards.",
    icon: <Factory className="w-5 h-5" />,
    stats: "Audited Origin"
  },
  {
    title: "Quality Control",
    subtitle: "Production Oversight",
    desc: "Systematic verification at every production milestone to ensure quality consistency.",
    icon: <CheckCircle2 className="w-5 h-5" />,
    stats: "QC Standard"
  },
  {
    title: "Material Sourcing",
    subtitle: "Resource Integrity",
    desc: "Deep sourcing of fabrics and trims that match both aesthetic and pricing requirements.",
    icon: <Globe className="w-5 h-5" />,
    stats: "Material Core"
  },
  {
    title: "Logistics Support",
    subtitle: "Operational Handover",
    desc: "Coordinating documentation and delivery readiness for a controlled final handover.",
    icon: <Zap className="w-5 h-5" />,
    stats: "Direct Delivery"
  }
]

export function CapabilityBoard() {
  const leftCapabilities = CAPABILITIES.slice(0, 3)
  const rightCapabilities = [...CAPABILITIES.slice(3), {
    title: "Strategic Growth",
    subtitle: "Bespoke Solutions",
    desc: "Scale-focused support tailored to your brand's specific growth trajectory.",
    icon: <ArrowUpRight className="w-5 h-5" />,
    stats: "Brand Scale"
  }]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full max-w-6xl mx-auto">
      
      {/* Left Column Pillars */}
      <div className="lg:col-span-4 space-y-5 lg:space-y-6">
        {leftCapabilities.map((cap, i) => (
          <CapabilityBox key={i} cap={cap} delay={i * 0.15} direction={-15} />
        ))}
      </div>

      {/* Central Hub */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-4 text-center space-y-10 py-12 lg:py-0 order-first lg:order-none"
      >
        <div className="space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent/70">Operational Pillars</span>
          <h2 className="text-5xl lg:text-7xl font-serif font-bold italic leading-tight text-white/95">
            Built for <br className="hidden lg:block"/> clarity.
          </h2>
          <div className="w-16 h-px bg-accent/20 mx-auto" />
          <p className="text-white/40 text-sm lg:text-base font-light leading-relaxed max-w-[260px] mx-auto italic">
             Practical support for brands that need more than a factory intro.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
           <Link href="/services" className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent/80 hover:text-white transition-all duration-700 flex items-center gap-4 group">
              View Our Methods <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </Link>
        </div>
      </motion.div>

      {/* Right Column Pillars */}
      <div className="lg:col-span-4 space-y-5 lg:space-y-6">
        {rightCapabilities.map((cap, i) => (
          <CapabilityBox key={i} cap={cap} delay={(i + 3) * 0.15} direction={15} />
        ))}
      </div>

    </div>
  )
}

type Capability = {
  title: string
  subtitle: string
  desc: string
  icon: React.ReactElement<{ className?: string }>
  stats: string
}

function CapabilityBox({ cap, delay, direction }: { cap: Capability, delay: number, direction: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ 
        duration: 1.2, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group relative bg-stone-900/40 backdrop-blur-sm border border-white/5 p-4 lg:p-5 space-y-4 overflow-hidden transition-all duration-700 hover:border-accent/40"
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="text-accent group-hover:scale-110 transition-transform duration-500">
          {React.cloneElement(cap.icon, { className: "w-4 h-4" })}
        </div>
        <span className="text-[7px] font-mono text-white/10 tracking-[0.2em] uppercase">
          {cap.stats}
        </span>
      </div>

      <div className="space-y-2 relative z-10">
        <h3 className="text-base lg:text-lg font-serif font-bold text-white/80 group-hover:text-accent transition-colors">
          {cap.title}
        </h3>
        <p className="text-white/30 text-[11px] font-light leading-snug">
          {cap.desc}
        </p>
      </div>

      {/* Premium Sweep Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute top-0 right-0 w-px h-0 bg-accent group-hover:h-full transition-all duration-700" />
    </motion.div>
  )
}
