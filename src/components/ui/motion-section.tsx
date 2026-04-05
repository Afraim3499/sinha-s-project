"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, ReactNode } from "react"

// LUXURY EASING: Slow start, fast middle, very slow settle
export const PREMIUM_EASE = [0.76, 0, 0.24, 1] as const
export const SOFT_EASE = [0.21, 0.45, 0.32, 0.9] as const

interface MotionSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
  staggerChildren?: number
}

export function MotionSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 1.2, // Slightly longer default for cinematic feel
  once = true,
  staggerChildren = 0,
}: MotionSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      transition: {
        staggerChildren,
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: PREMIUM_EASE,
        staggerChildren,
        when: "beforeChildren"
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function MotionText({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
