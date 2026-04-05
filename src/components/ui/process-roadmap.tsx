"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    title: "Project Review",
    phase: "Discovery",
    desc: "We assess the product, category, requirements and development stage.",
    label: "#INSIGHT"
  },
  {
    step: "02",
    title: "Development Planning",
    phase: "Technical",
    desc: "We clarify specifications, sampling needs, materials and next steps.",
    label: "#SPEC"
  },
  {
    step: "03",
    title: "Factory Alignment",
    phase: "Sourcing",
    desc: "We identify suitable manufacturing options based on capability and fit.",
    label: "#FOUNDATION"
  },
  {
    step: "04",
    title: "Sampling & Costing",
    phase: "Execution",
    desc: "We coordinate development samples, revisions and commercial planning.",
    label: "#VALIDATE"
  },
  {
    step: "05",
    title: "Production Oversight",
    phase: "Review",
    desc: "We support monitoring, communication and quality control through production.",
    label: "#CONTROL"
  },
  {
    step: "06",
    title: "Delivery Readiness",
    phase: "Handover",
    desc: "We help coordinate documentation, inspection readiness and shipment support.",
    label: "#APEX"
  }
]

export function ProcessRoadmap() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section className="w-full relative overflow-hidden flex flex-col items-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(180,140,80,0.03),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* DESKTOP VIEW - ULTRA-TIGHT HEIGHT */}
        <div className="hidden lg:block relative h-[300px]">
          
          {/* THE ROAD - Positioned higher */}
          <div className="absolute top-[100px] left-0 right-0 h-10 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-black rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.6),inset_0_1px_3px_rgba(255,255,255,0.05)] overflow-hidden">
            {/* Progress Fill */}
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/20 via-accent/40 to-accent"
              initial={{ width: "0%" }}
              animate={{ 
                width: hoveredIdx !== null ? `${((hoveredIdx + 1) / steps.length) * 100}%` : "0%" 
              }}
              transition={{ type: "spring", stiffness: 45, damping: 15 }}
              style={{ boxShadow: "0 0 20px rgba(180, 140, 80, 0.4)" }}
            />
          </div>

          {/* INTERACTIVE COLUMN SLOTS */}
          <div className="absolute inset-0 flex justify-between">
            {steps.map((item, i) => {
              const isLit = hoveredIdx !== null && i <= hoveredIdx
              const isCurrent = hoveredIdx === i

              return (
                <div 
                  key={i} 
                  className="relative flex flex-col items-center w-1/6 group cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* HIT AREA */}
                  <div className="absolute inset-0 z-0 transition-colors group-hover:bg-white/[0.01]" />

                  {/* 1. TOP BOX - ULTRA TIGHT */}
                  <div className="relative pt-1 z-10 h-[100px] flex flex-col items-center">
                    <motion.div
                      animate={{ 
                        y: isLit ? -2 : 0,
                        scale: isCurrent ? 1.05 : 1,
                      }}
                      className={`w-28 h-12 rounded-lg flex flex-col items-center justify-center bg-stone-900/90 border transition-all duration-500 ${
                        isLit ? 'border-accent/40 shadow-[0_5px_15px_-3px_rgba(180,140,80,0.3)]' : 'border-white/5'
                      }`}
                    >
                      <span className={`text-[7px] font-bold tracking-[0.2em] uppercase mb-0.5 transition-colors ${isLit ? 'text-accent' : 'text-white/20'}`}>
                        {item.phase}
                      </span>
                      <span className={`font-serif text-[16px] font-bold italic transition-colors ${isLit ? 'text-white' : 'text-white/40'}`}>
                        {item.step}
                      </span>
                    </motion.div>
                    
                    {/* Vertical Linkage */}
                    <div className={`w-[1px] transition-all duration-700 mt-1 flex-1 ${isLit ? 'bg-accent/40' : 'bg-white/5'}`} />
                  </div>

                  {/* 2. THE NODE */}
                  <div className="absolute top-[100px] z-30 -translate-y-1/2">
                    <motion.div 
                      animate={{ 
                        scale: isCurrent ? 1.2 : 1,
                        backgroundColor: isLit ? "#fff" : "transparent"
                      }}
                      className={`w-4 h-4 rounded-full border-2 border-white/60 transition-all shadow-lg flex items-center justify-center`}
                    >
                       {isLit && <div className="w-1 h-1 bg-accent rounded-full" />}
                    </motion.div>
                  </div>

                  {/* 3. BOTTOM CONTENT */}
                  <div className="pt-[115px] text-center px-4 z-10 flex flex-col items-center">
                    <motion.div
                      animate={{ opacity: isLit ? 1 : 0.6, y: isLit ? 0 : 3 }}
                      className="transition-all duration-500 w-full max-w-[180px]"
                    >
                      <h3 className="font-serif text-[17px] font-bold text-white mb-1 leading-tight group-hover:italic transition-all">
                        {item.title}
                      </h3>
                      <p className="text-[10px] font-bold tracking-widest text-accent mb-2 font-mono opacity-80">
                        {item.label}
                      </p>
                      <p className="text-[13px] text-white/70 leading-snug font-light">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="lg:hidden space-y-8">
          {steps.map((item, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="w-16 h-12 rounded-xl bg-stone-900 border border-white/10 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-accent/60 font-bold text-[7px] tracking-widest mb-0.5">{item.phase}</span>
                  <span className="text-white font-serif font-bold text-md italic">{item.step}</span>
                </div>
                {i < steps.length - 1 && <div className="w-[1px] h-20 bg-white/5 my-2" />}
              </div>
              <div className="flex-1 pt-1">
                <span className="text-[10px] font-bold tracking-[0.3em] text-accent/80 block mb-1 font-mono">{item.label}</span>
                <h3 className="text-xl font-bold text-white mb-1 font-serif italic">{item.title}</h3>
                <p className="text-[14px] text-white/70 leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
