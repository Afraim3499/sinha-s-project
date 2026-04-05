"use client"

import React, { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useBeatSync } from "@/hooks/useBeatSync"
import { useAudioSync } from "./MusicProvider"

export const MusicCursor: React.FC = () => {
  const sync = useBeatSync()
  const { isPlaying } = useAudioSync()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Snappier mouse follow
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 })
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 })

  // Jitter displacement for "alive" feeling
  const jitterX = useSpring(useMotionValue(0), { stiffness: 1500, damping: 20 })
  const jitterY = useSpring(useMotionValue(0), { stiffness: 1500, damping: 20 })

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (isPlaying) {
      // Displace position slightly based on beat factor
      const displacement = sync.beat.get() * 6
      jitterX.set((Math.random() - 0.5) * displacement)
      jitterY.set((Math.random() - 0.5) * displacement)
    } else {
      jitterX.set(0)
      jitterY.set(0)
    }
  }, [sync.beat, isPlaying, jitterX, jitterY])

  // Rhythmic mappings
  const ringScale = useTransform(sync.pulse, [0, 1], [0.9, 1.3])
  const rotation = useTransform(sync.transition, [0, 1], [0, 360])
  const axesLength = useTransform(sync.beat, [0, 1], [12, 24]) // Crosshairs grow on beat
  const coreScale = useTransform(sync.beat, [0, 1], [0.8, 1.8])


  return (
    <>
      {/* Conditionally hide system cursor on desktop when music cursor is active */}
      {isPlaying && (
        <style>{`@media (min-width: 1024px) { * { cursor: none !important; } }`}</style>
      )}
      <div className="fixed top-0 left-0 z-[100] pointer-events-none hidden lg:block overflow-visible">
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          left: jitterX,
          top: jitterY
        }}
        className="relative flex items-center justify-center w-12 h-12"
      >
        {/* The Hub Crosshair (Sourcing Precision) */}
        <motion.div
            style={{ 
                scale: isPlaying ? ringScale : 1,
                rotate: rotation,
                opacity: isPlaying ? 0.9 : 0.4
            }}
            className="absolute inset-0 flex items-center justify-center drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
        >
          {/* Main Ring - visible on all backgrounds */}
          <div className="w-6 h-6 border-[1.5px] border-accent rounded-full" />
          
          {/* Axes that grow and shrink with music */}
          <motion.div 
            style={{ height: isPlaying ? axesLength : 12 }}
            className="absolute w-[1.5px] bg-accent" 
          />
          <motion.div 
            style={{ width: isPlaying ? axesLength : 12 }}
            className="absolute h-[1.5px] bg-accent" 
          />
          
          {/* Corner Ticks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-[1.5px] bg-accent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-[1.5px] bg-accent" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-[1.5px] bg-accent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-[1.5px] bg-accent" />
        </motion.div>

        {/* Core Dot */}
        <motion.div
            style={{ 
                scale: isPlaying ? coreScale : 1,
                boxShadow: "0 0 10px rgba(180, 140, 80, 0.5)"
            }}
            className="w-2 h-2 bg-accent rounded-full border border-white/20 shadow-xl"
        />
      </motion.div>
    </div>
    </>
  )
}
