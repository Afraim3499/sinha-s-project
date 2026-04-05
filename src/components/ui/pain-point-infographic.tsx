"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, Split, Microscope, AlertTriangle, MessageSquare } from "lucide-react"

const PAIN_POINTS = [
  {
    id: "clarity",
    title: "Technical Clarity",
    problem: "Relationships begin without enough technical detail.",
    impact: "Incorrect samples and production delays.",
    resolution: "We establish technical requirements early.",
    icon: <Microscope className="w-5 h-5" />
  },
  {
    id: "fit",
    title: "Supplier Fit",
    problem: "Supplier capability is often assumed too early.",
    impact: "Poor quality and missed deadlines.",
    resolution: "Rigorous factory alignment based on capability.",
    icon: <Split className="w-5 h-5" />
  },
  {
    id: "sampling",
    title: "Sampling Friction",
    problem: "Sampling problems become production problems.",
    impact: "Expensive bulk production errors.",
    resolution: "Deep sampling oversight and revision tracking.",
    icon: <ShieldAlert className="w-5 h-5" />
  },
  {
    id: "quality",
    title: "Quality Discovery",
    problem: "Issues are discovered too late in the process.",
    impact: "Irreparable damage to brand reputation.",
    resolution: "In-line verification and early-stage checks.",
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: "communication",
    title: "Communication Gaps",
    problem: "Vague updates create avoidable delays.",
    impact: "Loss of control over delivery timelines.",
    resolution: "Direct, proactive technical communication.",
    icon: <MessageSquare className="w-5 h-5" />
  }
]

export function PainPointInfographic() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 items-center max-w-6xl mx-auto h-full px-2 lg:px-0">
      {/* LEFT: INTERACTIVE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 lg:space-y-2 order-2 lg:order-1 max-w-md mx-auto w-full">
        {PAIN_POINTS.map((point, i) => (
          <motion.div
            key={point.id}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setActiveIdx(i)}
            className={`relative p-3 lg:p-4 cursor-pointer rounded-xl transition-all duration-300 group border h-[60px] lg:h-[80px] flex items-center ${
              activeIdx === i 
                ? "bg-white border-accent/30 shadow-sm lg:translate-x-2" 
                : "bg-transparent border-transparent hover:border-border/50 hover:bg-white/50"
            }`}
          >
            <div className="flex gap-4 lg:gap-6 items-center w-full">
              {/* Icon Container with Glow */}
              <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
                activeIdx === i 
                  ? "bg-accent/10 text-accent border border-accent/20" 
                  : "bg-surface text-accent/40 border border-border/50"
              }`}>
                {point.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm lg:text-lg font-serif font-bold transition-all duration-300 truncate ${
                  activeIdx === i ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/60"
                }`}>
                  {point.title}
                </h3>
              </div>

              {/* Indicator */}
              {activeIdx === i && (
                <motion.div 
                  layoutId="activePointer"
                  className="w-3 h-[2px] bg-accent rounded-full"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* RIGHT: THE VISUAL SCANNER / RESOLUTION BOARD */}
      <div className="relative aspect-video lg:aspect-square max-h-[350px] lg:max-h-[480px] w-full bg-white rounded-2xl overflow-hidden border border-border shadow-xl mx-auto flex flex-col justify-center order-1 lg:order-2 mb-6 lg:mb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,140,80,0.03),transparent_70%)]" />
        
        {/* Scanning Light Line */}
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-px bg-accent/20 z-20 pointer-events-none"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-6 lg:p-10 space-y-4 lg:space-y-8 relative z-10"
          >
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[7px] lg:text-[8px] font-bold text-accent uppercase tracking-[0.3em] font-mono opacity-80">
                Phase / 0{activeIdx + 1}
              </span>
              <h4 className="text-xl lg:text-4xl font-serif font-bold text-foreground italic leading-tight">
                {PAIN_POINTS[activeIdx].title}
              </h4>
            </div>

            {/* Content Layers */}
            <div className="space-y-4 lg:space-y-8">
              <div className="space-y-1">
                <p className="text-[7px] lg:text-[8px] font-bold text-foreground/40 uppercase tracking-widest">The Risk</p>
                <p className="text-xs lg:text-xl text-foreground/70 font-light italic leading-relaxed">
                   &ldquo;{PAIN_POINTS[activeIdx].impact}&rdquo;
                </p>
              </div>

              <div className="h-px w-12 lg:w-16 bg-accent/20" />

              <div className="space-y-2 lg:space-y-4">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-accent" />
                   <p className="text-[7px] lg:text-[8px] font-bold text-accent uppercase tracking-[0.2em] font-mono">Our Resolution</p>
                </div>
                <p className="text-lg lg:text-3xl text-foreground font-serif italic font-bold leading-tight">
                   {PAIN_POINTS[activeIdx].resolution}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Background Orbitals */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-border/40 rounded-full pointer-events-none -z-10 scale-150" />
      </div>
    </div>
  )
}
