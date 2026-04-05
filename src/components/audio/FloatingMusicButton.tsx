"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAudioSync } from "./MusicProvider"
import { Play, Pause } from "lucide-react"

export const FloatingMusicButton: React.FC = () => {
  const { isPlaying, togglePlay, beatFactor, isInitialized } = useAudioSync()

  if (!isInitialized) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center justify-center pointer-events-auto">
      <motion.button
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/80 backdrop-blur-lg border border-white/10 text-white shadow-2xl hover:border-accent/40 hover:bg-black/90 transition-all group relative"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Pause size={14} fill="white" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Play size={14} className="translate-x-0.5" fill="white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Visual Pulse for active beat */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-accent/30"
            animate={{ 
              scale: [1, 1.3, 1.6],
              opacity: [0.5, 0.2, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.2
            }}
          />
        )}
      </motion.button>
    </div>
  )
}
