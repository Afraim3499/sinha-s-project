"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAudioSync } from "./MusicProvider"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, beatFactor, volume, setVolume, isInitialized } = useAudioSync()
  const [showVolume, setShowVolume] = useState(false)

  if (!isInitialized) return null

  return (
    <div className="flex items-center bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg space-x-3 transition-all hover:bg-black/90 group w-fit">
      {/* Visualizer (Dashes) */}
      <div className="flex items-center space-x-0.5 px-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-[1.5px] rounded-full bg-sky-500/20"
            animate={{
              backgroundColor: isPlaying && beatFactor > (i / 8) ? "#38bdf8" : "#ffffff20",
              opacity: isPlaying ? [0.4, 1, 0.4] : 0.4
            }}
            transition={{ 
                repeat: Infinity, 
                duration: 0.8 + i * 0.1,
                ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Circle Play/Pause Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/30 text-white hover:border-white/60 hover:bg-white/5 transition-all transform active:scale-90"
      >
        {isPlaying ? (
          <Pause size={14} fill="currentColor" />
        ) : (
          <Play size={14} className="translate-x-0.5" fill="currentColor" />
        )}
      </button>

      {/* Volume Control */}
      <div className="relative flex items-center pr-1">
        <button
          onClick={() => setShowVolume(!showVolume)}
          aria-label="Toggle volume slider"
          className="p-1 text-white/50 hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -40 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute right-0 bg-stone-900 border border-white/10 p-2 rounded-xl shadow-2xl"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="h-20 w-3 accent-sky-500 cursor-pointer orientation-vertical"
                style={{ appearance: "slider-vertical", WebkitAppearance: "slider-vertical" } as unknown as React.CSSProperties}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
