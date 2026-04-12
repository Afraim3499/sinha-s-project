"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface SinhaLogoIconProps {
  className?: string
  scale?: number
  animateThreads?: boolean
}

export function SinhaLogoIcon({ 
  className = "w-10 h-10", 
  scale = 1,
  animateThreads = false 
}: SinhaLogoIconProps) {
  return (
    <motion.div 
      style={{ scale }}
      className={cn(
        "bg-linear-to-br from-accent-highlight to-accent flex items-center justify-center relative overflow-hidden shrink-0",
        className
      )}
    >
      {/* Refined Thread Loops - High Contrast Sketch Pattern */}
      {[
        { rotate: 0, w: "65%", h: "65%", x: -1, y: 1, delay: 0 },
        { rotate: 15, w: "62%", h: "68%", x: 2, y: -1, delay: 0.1 },
        { rotate: -25, w: "68%", h: "62%", x: -1, y: -2, delay: 0.2 },
        { rotate: 110, w: "64%", h: "64%", x: 1, y: 2, delay: 0.3 },
      ].map((loop, i) => (
        <motion.div
          key={i}
          initial={animateThreads ? { opacity: 0, scale: 0.5, rotate: loop.rotate - 20 } : false}
          animate={animateThreads ? { opacity: 1, scale: 1, rotate: loop.rotate } : { rotate: loop.rotate }}
          transition={{ duration: 1, delay: loop.delay, ease: PREMIUM_EASE }}
          className="absolute border-[1px] border-stone-950/50 rounded-full"
          style={{ 
            width: loop.w, 
            height: loop.h, 
            translateX: loop.x, 
            translateY: loop.y,
          }}
        />
      ))}
    </motion.div>
  )
}
