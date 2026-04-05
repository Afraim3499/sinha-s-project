"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { subscribeToInsights } from "@/app/actions/subscribe"

export function InsightsSubscribe() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")

    const formData = new FormData(e.currentTarget)

    try {
      const result = await subscribeToInsights(formData)
      if (result.success) {
        setStatus("success")
        setMessage(result.message || "Subscribed successfully.")
      } else {
        setStatus("error")
        setMessage(result.error || "Something went wrong.")
        // Reset to idle after 4 seconds
        setTimeout(() => setStatus("idle"), 4000)
      }
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <div className="mt-24 p-10 md:p-16 bg-stone-50 border border-stone-100 relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-4">
          Stay Informed
        </span>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <h3 className="text-2xl font-serif font-bold italic text-foreground">
                  You&apos;re subscribed
                </h3>
              </div>
              <p className="text-foreground/60 font-light leading-relaxed pl-10">
                {message}
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }}>
              <h3 className="text-2xl md:text-3xl font-serif font-bold italic leading-tight mb-3">
                Get sourcing insights delivered.
              </h3>
              <p className="text-foreground/50 font-light text-sm mb-8 max-w-lg leading-relaxed">
                Practical guidance on manufacturing, materials, and supply chain strategy — no spam, no fluff.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email address for newsletter subscription"
                  className="flex-1 px-5 py-4 bg-white border border-stone-200 text-sm font-light focus:outline-none focus:border-accent/40 placeholder:text-stone-300 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-4 bg-stone-950 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-3 shrink-0"
                >
                  {status === "submitting" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>Subscribe <ArrowRight className="w-3 h-3" /></>
                  )}
                </button>
              </form>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-red-500 text-sm font-light"
                >
                  {message}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
