"use client"

import { useAudioSync } from "@/components/audio/MusicProvider"
import { useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export const useBeatSync = () => {
  const { beatFactor, pulseFactor, accentFactor, transitionFactor, isPlaying, isStrongMovement, isHeaviestPayoff } = useAudioSync()
  
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  
  const beat = useSpring(useMotionValue(0), springConfig)
  const pulse = useSpring(useMotionValue(0), springConfig)
  const accent = useSpring(useMotionValue(0), springConfig)
  const transition = useSpring(useMotionValue(0), springConfig)

  useEffect(() => {
    if (isPlaying) {
      beat.set(beatFactor)
      pulse.set(pulseFactor)
      accent.set(accentFactor)
      transition.set(transitionFactor)
    } else {
      beat.set(0)
      pulse.set(0)
      accent.set(0)
      transition.set(0)
    }
  }, [beatFactor, pulseFactor, accentFactor, transitionFactor, isPlaying, beat, pulse, accent, transition])

  return { beat, pulse, accent, transition, isStrongMovement, isHeaviestPayoff }
}
