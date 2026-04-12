"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { SinhaLogoIcon } from "@/components/ui/sinha-logo-icon"

export const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const pathname = usePathname()

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setIsFirstLoad(false)
    }, 2200) // Slightly longer for the first load to allow animation to finish
    return () => clearTimeout(timer)
  }, [])

  // Handle route change transitions
  useEffect(() => {
    if (!isFirstLoad) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 1000) // Shorter for transitions
      return () => clearTimeout(timer)
    }
  }, [pathname, isFirstLoad])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: PREMIUM_EASE }
          }}
          className="fixed inset-0 z-[9999] bg-[#0c0c0c] flex items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-6 md:gap-8">
            {/* Animated Logo Icon (The Threads) */}
            <SinhaLogoIcon 
              className="w-16 h-16 md:w-20 md:h-20" 
              animateThreads={true} 
            />

            {/* Logo Text Reveal */}
            <div className="overflow-hidden flex flex-col justify-center">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: PREMIUM_EASE }}
                className="flex flex-col"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[20px] md:text-[28px] font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-highlight to-accent leading-none whitespace-nowrap tracking-tight pb-1">
                    Sinha Sourcing Hub
                  </span>
                  <span className="text-[12px] md:text-[16px] font-serif italic font-normal text-white/80">Ltd</span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="h-px w-full bg-linear-to-r from-accent/40 to-transparent mt-2"
                />
                
                <motion.span 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, delay: 1.4 }}
                   className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-white/40 mt-2 font-mono whitespace-nowrap"
                >
                  Global Sourcing & Product Development
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Background Ambient Layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,140,80,0.03),transparent_70%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
