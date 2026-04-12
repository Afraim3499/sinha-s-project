"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PREMIUM_EASE } from "@/components/ui/motion-section"
import { SinhaLogoIcon } from "@/components/ui/sinha-logo-icon"

import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)

  React.useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const serviceLinks = [
    { name: "Core Services Overview", href: "/services" },
    { name: "Concept & Design", href: "/services/concept-and-design" },
    { name: "Factory Sourcing", href: "/services/factory-sourcing" },
    { name: "Material Sourcing", href: "/services/material-sourcing" },
    { name: "Quality Control", href: "/services/quality-control" },
    { name: "Logistics", href: "/services/logistics" },
  ]

  const navLinks = [
    { name: "Categories", href: "/categories" },
    { name: "Insights", href: "/insights" },
    { name: "Manifesto", href: "/manifesto" },
    { name: "Process", href: "/process" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "w-full pointer-events-auto transition-all duration-500 ease-in-out border-b border-white/[0.08]",
          isScrolled 
            ? "bg-stone-950/95 backdrop-blur-xl py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-stone-950/60 backdrop-blur-md py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative z-10 gap-8">
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <SinhaLogoIcon className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="text-[14px] font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-highlight to-accent leading-none whitespace-nowrap tracking-tight pb-0.5">
                Sinha Sourcing Hub <span className="italic font-normal">Ltd</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 mt-1 font-mono whitespace-nowrap hidden sm:block">EST. 1993 — LONDON / DHAKA / MELBOURNE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 flex-1 justify-center">
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link href="/services" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:text-accent transition-all duration-300 py-2">
                Services 
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-500", servicesOpen && "rotate-180 text-accent")} />
              </Link>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                    className="absolute top-full -left-8 w-72 bg-stone-950 border border-white/[0.1] shadow-[0_32px_64px_rgba(0,0,0,0.8)] p-8 flex flex-col gap-6 backdrop-blur-3xl"
                  >
                    <div className="space-y-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent/80 border-b border-white/10 pb-3">Specialized Hubs</p>
                      {serviceLinks.map((link, idx) => (
                        <motion.div
                          key={link.name}
                          initial={{ x: -4, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.04 }}
                        >
                          <Link
                            href={link.href}
                            className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/70 hover:text-white transition-all duration-300 flex items-center justify-between group/item"
                          >
                            <span>{link.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:text-white transition-all duration-300 py-2 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            <Button 
              variant="outline" 
              className="rounded-none border-accent text-accent hover:bg-accent hover:text-stone-950 px-8 text-[10px] font-bold uppercase tracking-[0.3em] h-11 transition-all duration-300 border-2" 
              asChild
            >
              <Link href="/contact">
                Start Your Inquiry
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-3 -mr-2 text-white hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-stone-950 border-b border-white/10 shadow-2xl py-16 px-10 flex flex-col gap-10 backdrop-blur-3xl pointer-events-auto"
          >
            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Production Vertical</p>
              {serviceLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-2xl font-serif italic text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 pt-10 border-t border-white/20">
              <div className="flex flex-wrap gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Button variant="premium" className="w-full rounded-none tracking-[0.3em] text-[11px] uppercase h-16 bg-accent text-stone-950 font-bold" asChild>
                 <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Start Your Inquiry</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
