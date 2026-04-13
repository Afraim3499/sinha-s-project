"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/app/actions/contact"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)

    // Client-side validation
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      setStatus("error")
      setErrorMessage("Please fill in all required fields.")
      return
    }

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setStatus("success")
        formRef.current?.reset()
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* 1. HERO (Locked to Viewport) */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center pt-32 md:pt-24 pb-12 overflow-hidden bg-stone-50 border-b border-border">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors mb-10 lg:mb-16">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <div className="max-w-5xl space-y-12">
            <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent"
            >
               <span className="w-12 h-px bg-accent/30" />
               Contact Us
            </motion.div>
            <motion.h1 
               initial={{ opacity: 0, scale: 0.98, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.2 }}
               className="text-[2.2rem] md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-serif font-bold leading-[1.05] tracking-tight text-stone-900"
            >
              Let&apos;s discuss your <br className="hidden lg:block"/>
              <span className="italic font-normal text-stone-400">product direction.</span>
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light max-w-2xl border-l border-accent/10 pl-10"
            >
              Whether you are testing an idea, developing a range, or looking for production support — we are structured to review your requirements clearly.
            </motion.p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
           <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-accent">Initiate Sourcing</span>
           <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* 2. CONTACT + FORM */}
      <section id="inquiry" className="py-32 scroll-mt-32">
        <div className="container mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Contact Sidebar */}
              <div className="lg:col-span-5 space-y-12">
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <h3 className="text-xl font-serif font-bold italic">Email</h3>
                       <div className="flex items-center gap-4 text-foreground/70 font-light">
                          <Mail className="w-4 h-4 shrink-0" />
                          <a href="mailto:projects@sinhasourcinghub.com" className="hover:text-accent transition-colors">
                             projects@sinhasourcinghub.com
                          </a>
                       </div>
                    </div>
                    <div className="space-y-4 border-t border-border pt-10">
                       <h3 className="text-xl font-serif font-bold italic">Head Office (UK)</h3>
                       <div className="flex items-start gap-4 text-foreground/70 font-light leading-relaxed">
                          <MapPin className="w-4 h-4 shrink-0 mt-1" />
                          <p>
                            Sinha Sourcing Hub Ltd <br />
                            7 Awlfield Avenue <br />
                            London, England <br />
                            N17 7PD, United Kingdom
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-stone-50 p-8 border border-border/50">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-4">Response Expectation</span>
                    <p className="text-foreground/70 font-light leading-relaxed">
                       We aim to reply to all commercial inquiries within 48 hours. If you are attaching tech packs or large design files, please use a secure sharing link.
                    </p>
                 </div>
              </div>

              {/* Inquiry Guidelines & Form */}
              <div className="lg:col-span-7">
                 <div className="bg-stone-950 text-white p-12 space-y-12 shadow-xl border border-border">
                    <div className="space-y-6 border-b border-white/10 pb-10">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block">Inquiry Checklist</span>
                       <h3 className="text-3xl font-serif font-bold italic">To help us evaluate your request quickly, please include:</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 pt-4">
                          {[
                            "Product category",
                            "Current development stage",
                            "Target order volume",
                            "Any specific sourcing challenges"
                          ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-center">
                               <CheckCircle2 className="w-4 h-4 text-accent/80 shrink-0" />
                               <span className="text-white/80 font-light text-sm">{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {status === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="py-16 text-center space-y-6"
                        >
                          <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-2xl font-serif font-bold italic">Inquiry Received</h3>
                          <p className="text-white/60 font-light max-w-md mx-auto leading-relaxed">
                            Thank you for reaching out. Our team will review your inquiry and respond within 48 hours.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => setStatus("idle")}
                            className="mt-4 text-white border-white/20 hover:bg-white/5 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none h-12 px-8"
                          >
                            Submit Another Inquiry
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          ref={formRef}
                          onSubmit={handleSubmit}
                          className="space-y-8"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                              <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Full Name *</label>
                              <Input id="contact-name" name="name" required placeholder="E.g., Jane Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-none focus-visible:ring-accent" />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Email Address *</label>
                              <Input id="contact-email" name="email" required type="email" placeholder="jane@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-none focus-visible:ring-accent" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="contact-company" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Company / Brand Name</label>
                            <Input id="contact-company" name="company" placeholder="Your Brand Ltd" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-none focus-visible:ring-accent" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="contact-category" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Product Category</label>
                            <select id="contact-category" name="category" className="w-full bg-white/5 border border-white/10 text-white/70 h-12 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus-visible:ring-1 focus-visible:ring-accent">
                              <option value="" className="bg-stone-950">Select a category...</option>
                              <option value="apparel" className="bg-stone-950">Apparel (Knits, Woven, Denim)</option>
                              <option value="outerwear" className="bg-stone-950">Outerwear & Jackets</option>
                              <option value="footwear" className="bg-stone-950">Footwear & Trainers</option>
                              <option value="bags" className="bg-stone-950">Bags & Travel Gear</option>
                              <option value="home-textiles" className="bg-stone-950">Home Textiles</option>
                              <option value="other" className="bg-stone-950">Other / Mixed</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Project Details *</label>
                            <Textarea 
                              id="contact-message"
                              name="message"
                              required
                              placeholder="Please describe your product category, development stage, and target volume..." 
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[160px] rounded-none focus-visible:ring-accent resize-none"
                            />
                          </div>

                          {status === "error" && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm font-light"
                            >
                              {errorMessage}
                            </motion.p>
                          )}

                          <Button
                            type="submit"
                            variant="premium"
                            disabled={status === "submitting"}
                            className="w-full h-14 text-[10px] uppercase tracking-[0.3em] font-bold rounded-none disabled:opacity-50"
                          >
                            {status === "submitting" ? (
                              <span className="flex items-center gap-3">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                              </span>
                            ) : (
                              "Submit Inquiry"
                            )}
                          </Button>
                       </motion.form>
                      )}
                    </AnimatePresence>
                 </div>
              </div>

           </div>
        </div>
      </section>
    </div>
  )
}
