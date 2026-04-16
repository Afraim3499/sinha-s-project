"use client"

import React from "react"
import { motion } from "framer-motion"
import { Box, Clock, Factory, Globe, Shield, History, Anchor } from "lucide-react"

const STORY_CHAPTERS = [
  {
    title: "Origins: The Golden Fiber",
    tag: "CH_01 / HERITAGE",
    stamp: "Rooted in Trade",
    desc: "Our story began decades ago in the jute industry of South Asia. Known as the 'Golden Fiber', jute was the bedrock of global textile trade. This family heritage in raw material trading instilled in us a fundamental respect for the origins of every product.",
    icon: <Box className="w-6 h-6 text-accent" />
  },
  {
    title: "A Professional Legacy",
    tag: "CH_02 / PERSPECTIVE",
    stamp: "25+ Years Experience",
    desc: "With over 25 years of hands-on involvement, we have witnessed the transformation of global supply chains. From the traditional trading models of the 90s to the high-speed digital architecture of 2026, we've remained anchored in professional discipline.",
    icon: <Clock className="w-6 h-6 text-accent" />
  },
  {
    title: "The Technical Shift",
    tag: "CH_03 / EXECUTION",
    stamp: "Beyond Introduction",
    desc: "Sourcing is often misunderstood as merely making introductions. Our transition from traditional trade to a technical hub was driven by a single realization: brands don't need more contacts; they need more execution. We moved deep into technical tech packs and quality systems.",
    icon: <Factory className="w-6 h-6 text-accent" />
  },
  {
    title: "Bridging the Realities",
    tag: "CH_04 / SYNERGY",
    stamp: "UK to Asia",
    desc: "Operating between our base in the UK and manufacturing hubs across Asia, we act as the essential bridge. We translate Western design intent into the technical reality of Asian production floors, ensuring nothing is lost in translation.",
    icon: <Globe className="w-6 h-6 text-accent" />
  },
  {
    title: "Hands-on Heritage",
    tag: "CH_05 / REALITY",
    stamp: "Factory Floor Roots",
    desc: "We grew up in the environment we now manage. We understand the smell of the tanneries, the rhythm of the sewing lines, and the logistics of the ports. This hands-on understanding is what allows us to identify risks before they become delays.",
    icon: <Shield className="w-6 h-6 text-accent" />
  },
  {
    title: "Foundational Stability",
    tag: "CH_06 / VISION",
    stamp: "The Long Anchor",
    desc: "Today, Sinha Sourcing Hub Ltd stands as an anchor for brands in a volatile market. We leverage our multi-generational legacy to provide the stability, transparency, and organized execution that modern fashion supply chains demand.",
    icon: <Anchor className="w-6 h-6 text-accent" />
  }
]

type Chapter = {
  title: string
  tag: string
  stamp: string
  desc: string
  icon: React.ReactNode
}

function ChapterNode({ chapter, index }: { chapter: Chapter, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative py-20 lg:py-28 border-b border-white/5 last:border-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        
        {/* Left: Sequence & Visual Marker */}
        <div className="lg:col-span-5 flex items-center justify-between lg:justify-end pr-0 lg:pr-16 border-r-0 lg:border-r border-white/5 relative h-full">
          
          <div className="flex flex-col items-start lg:items-end mr-8 lg:mr-16">
            <span className="text-5xl lg:text-7xl font-serif font-black text-white/5 transition-all duration-700 group-hover:text-accent group-hover:scale-110">
              0{index + 1}
            </span>
            <div className="h-px w-8 bg-accent/20 mt-2" />
          </div>

          <div className="relative w-32 h-32 lg:w-44 lg:h-44 group/seal">
            <div className="absolute inset-0 border border-white/10 rounded-full transition-all duration-700 group-hover:border-accent group-hover:scale-110" />
            <div className="absolute inset-4 bg-stone-900/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-700 group-hover:bg-accent group-hover:shadow-[0_0_60px_rgba(180,140,80,0.3)]">
              <div className="transition-all duration-700 group-hover:scale-110 group-hover:text-stone-950 text-accent">
                {React.cloneElement(chapter.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 lg:w-12 lg:h-12" })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Narrative */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <span className="text-[10px] font-bold text-accent/50 uppercase tracking-[0.4em] font-mono">
              Story_Chapter_0{index + 1}
            </span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-4xl lg:text-6xl font-serif font-bold text-white transition-all duration-700 group-hover:text-accent group-hover:translate-x-2">
              {chapter.title}
            </h3>
            <p className="text-white/40 text-lg lg:text-3xl font-light leading-relaxed max-w-2xl transition-all duration-700 group-hover:text-white/70">
              {chapter.desc}
            </p>
          </div>
          
          <div className="flex items-center gap-4 justify-center lg:justify-start opacity-0 group-hover:opacity-100 transition-all duration-700">
             <div className="w-12 h-px bg-accent/40" />
             <span className="text-[9px] font-bold text-accent uppercase tracking-[0.3em]">{chapter.stamp}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function StoryEngine() {
  return (
    <div className="bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="py-12">
          {STORY_CHAPTERS.map((chapter, i) => (
            <ChapterNode 
              key={i} 
              chapter={chapter} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
