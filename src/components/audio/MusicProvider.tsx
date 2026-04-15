"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"

interface AudioContextType {
  isPlaying: boolean
  togglePlay: () => void
  beatFactor: number // Normalized 0-1 based on low-frequency energy
  pulseFactor: number // 0.73s pulse
  accentFactor: number // 2.93s accent
  transitionFactor: number // 5.85s transition
  playbackTime: number
  isStrongMovement: boolean // > 23s
  isHeaviestPayoff: boolean // > 47s
  volume: number
  setVolume: (v: number) => void
  isInitialized: boolean
}

const AudioContextSync = createContext<AudioContextType | null>(null)

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatFactor, setBeatFactor] = useState(0)
  const [pulseFactor, setPulseFactor] = useState(0)
  const [accentFactor, setAccentFactor] = useState(0)
  const [transitionFactor, setTransitionFactor] = useState(0)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isManualPause, setIsManualPause] = useState(false)
  const [volume, setVolume] = useState(0.5)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const rafRef = useRef<number | null>(null)

  const initAudio = async () => {
    if (isInitialized) {
      if (audioRef.current && !isPlaying && !isManualPause) {
        try {
          await audioContextRef.current?.resume()
          await audioRef.current?.play()
          setIsPlaying(true)
        } catch (e) {
          // Fail silently
        }
      }
      return
    }

    const AudioContextClass = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) as typeof AudioContext
    const context = new AudioContextClass()
    audioContextRef.current = context

    const audio = new Audio("/audio/main-sound.wav")
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    const analyser = context.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    const source = context.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(context.destination)
    sourceRef.current = source

    setIsInitialized(true)
    
    try {
      await context.resume()
      await audio.play()
      setIsPlaying(true)
    } catch (err) {
      // Autoplay blocked - browser requires more definite interaction
    }
  }

  const updateBeat = () => {
    if (!analyserRef.current || !audioRef.current) {
        rafRef.current = requestAnimationFrame(updateBeat)
        return
      }

      const time = audioRef.current.currentTime
      setPlaybackTime(time)

      // Precise Rhythmic Math
      const p = (time % 0.73) / 0.73
      const a = (time % 2.93) / 2.93
      const t = (time % 5.85) / 5.85

      // Smoothing functions for motion values (exponential decay for 'pulses')
      setPulseFactor(Math.pow(1 - p, 3))
      setAccentFactor(Math.pow(1 - a, 4))
      setTransitionFactor(Math.pow(1 - t, 2))

      // Real-time Audio Frequency Data
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      const bassRange = dataArray.slice(0, 5)
      const averageBass = bassRange.reduce((a, b) => a + b, 0) / bassRange.length
      const factor = Math.min(Math.max((averageBass - 100) / 100, 0), 1)
      setBeatFactor(factor)
      rafRef.current = requestAnimationFrame(updateBeat)
    }

  // Kickstart loop on init success
  useEffect(() => {
    if (isInitialized && !rafRef.current) {
      rafRef.current = requestAnimationFrame(updateBeat)
    }
  }, [isInitialized])
  const tryingToInitRef = useRef(false)

  useEffect(() => {
    const handleGesture = async () => {
      if (isManualPause || tryingToInitRef.current || isPlaying) return
      
      tryingToInitRef.current = true
      try {
        await initAudio()
        // If it worked, we have isPlaying as true now (or soon)
      } catch (e) {
        // Silently catch to avoid console spam
      } finally {
        tryingToInitRef.current = false
      }
    }

    const removeListeners = () => {
      window.removeEventListener("touchstart", handleGesture)
      window.removeEventListener("mousedown", handleGesture)
      window.removeEventListener("keydown", handleGesture)
      window.removeEventListener("pointerdown", handleGesture)
      window.removeEventListener("click", handleGesture)
    }

    // Modern browsers ONLY allow AudioContext to start on these specific "Interaction" events.
    // 'scroll' and 'wheel' are NOT valid gestures and will only cause console errors.
    // 'touchstart' covers the start of a scroll interaction on mobile.
    window.addEventListener("touchstart", handleGesture, { passive: true })
    window.addEventListener("mousedown", handleGesture, { passive: true })
    window.addEventListener("keydown", handleGesture, { passive: true })
    window.addEventListener("pointerdown", handleGesture, { passive: true })
    window.addEventListener("click", handleGesture, { passive: true })

    return () => {
      removeListeners()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isInitialized, isPlaying, isManualPause])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      setIsManualPause(true)
    } else {
      audioContextRef.current?.resume()
      audioRef.current.play()
      setIsPlaying(true)
      setIsManualPause(false)
    }
  }

  const isStrongMovement = playbackTime > 23
  const isHeaviestPayoff = playbackTime > 47

  return (
    <AudioContextSync.Provider value={{ 
        isPlaying, togglePlay, beatFactor, pulseFactor, accentFactor, transitionFactor, 
        playbackTime, isStrongMovement, isHeaviestPayoff, volume, setVolume, isInitialized 
    }}>
      {children}
    </AudioContextSync.Provider>
  )
}

export const useAudioSync = () => {
  const context = useContext(AudioContextSync)
  if (!context) {
    throw new Error("useAudioSync must be used within a MusicProvider")
  }
  return context
}
