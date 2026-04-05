"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { loginAdmin } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    try {
      const result = await loginAdmin(formData)
      if (result.success) {
        // Redirect to dashboard on success
        router.push("/admin")
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Login failed.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-stone-900 border border-white/5 p-10 md:p-14 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-4">
            Operations Panel
          </span>
          <h1 className="text-3xl font-serif font-bold italic text-white leading-tight">
            Sinha Sourcing <br /> Limited
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Admin Email</label>
            <Input 
              name="email" 
              type="email" 
              required 
              placeholder="admin@sinhasourcinghub.com"
              className="bg-white/5 border-white/10 text-white h-12 rounded-none placeholder:text-white/20 focus-visible:ring-accent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Master Password</label>
            <Input 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              className="bg-white/5 border-white/10 text-white h-12 rounded-none placeholder:text-white/20 focus-visible:ring-accent"
            />
          </div>

          <AnimatePresence>
            {status === "error" && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm font-light mt-2"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-8 p-4 bg-white text-stone-950 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-3 group"
          >
            {status === "submitting" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Authenticate Profile
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-white/30 text-xs font-light">
          Secured by RSA-4096 & JWT Identity
        </p>
      </motion.div>
    </div>
  )
}
