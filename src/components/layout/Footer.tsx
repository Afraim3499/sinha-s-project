"use client"

import Link from "next/link"
import { ArrowRight, Mail, Globe } from "lucide-react"
import { MusicPlayer } from "../audio/MusicPlayer"

import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const currentYear = 2026

  return (
    <footer className="bg-stone-950 text-stone-100 pt-48 pb-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Signature Accent */}
      <div className="absolute bottom-4 inset-x-0 sm:inset-x-auto sm:right-0 pointer-events-none opacity-[0.03] select-none flex justify-center sm:block transition-all duration-700 px-6 sm:px-0">
        <h2 className="text-[18vw] sm:text-[15rem] md:text-[20rem] lg:text-[30rem] font-serif font-bold whitespace-nowrap leading-[0.7] tracking-tighter sm:translate-x-10 text-center sm:text-right">
          SINHA
        </h2>
      </div>

      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 mb-40">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-4 group">
                <div className="w-8 h-8 bg-linear-to-br from-accent-highlight to-accent flex items-center justify-center relative overflow-hidden shrink-0">
                  <div className="absolute w-[65%] h-[65%] border-[1px] border-stone-950/40 rounded-full translate-x-[-1px] translate-y-[1px]" />
                  <div className="absolute w-[62%] h-[68%] border-[1px] border-stone-950/35 rounded-full rotate-[15deg] translate-x-[2px] translate-y-[-1px]" />
                  <div className="absolute w-[64%] h-[64%] border-[1px] border-stone-950/45 rounded-full rotate-[110deg] translate-x-[1px] translate-y-[2px]" />
                </div>
                <span className="text-3xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-highlight to-accent pb-1">
                  Sinha Sourcing Hub <span className="italic font-normal">Ltd</span>
                </span>
              </Link>
              <p className="text-stone-400 text-xl font-light leading-relaxed max-w-md">
                Structured sourcing and product development support for brands that value quality, clarity and dependable execution.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed max-w-md">
                We work with brands seeking practical support across product development, factory sourcing, materials, quality control, compliance coordination, and delivery planning.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="mailto:info@sinhasourcinghub.com" aria-label="Email us" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/40 transition-all duration-500">
                <Mail className="w-4 h-4" />
              </a>
              <Link href="/contact" aria-label="Contact us" className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/40 transition-all duration-500">
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hub Array & Coordinates */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Production Axis</h4>
              <ul className="space-y-6">
                {[
                  { name: "Concept Hub", city: "London, UK", coords: "51.50° N, 0.12° W" },
                  { name: "Production Axis", city: "Dhaka, BD", coords: "23.81° N, 90.41° E" },
                  { name: "Regional Hub", city: "Melbourne, AU", coords: "37.81° S, 144.96° E" }
                ].map((hub) => (
                  <li key={hub.city} className="group cursor-default">
                    <p className="text-[9px] font-mono text-accent/60 group-hover:text-accent transition-colors">{hub.coords}</p>
                    <p className="text-xl font-serif italic text-white/80 group-hover:text-white transition-colors">{hub.city}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">{hub.name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-300">Quick Links</h4>
              <ul className="space-y-5">
                {[
                  { name: "Services", href: "/services" },
                  { name: "Product Categories", href: "/categories" },
                  { name: "Our Manifesto", href: "/manifesto" },
                  { name: "Process", href: "/process" },
                  { name: "About Us", href: "/about" },
                  { name: "Sustainability", href: "/sustainability" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Insights", href: "/insights" },
                  { name: "Contact", href: "/contact" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-bold uppercase tracking-[0.2em] text-white/70 hover:text-accent transition-all duration-500 flex items-center group">
                      <span className="w-0 group-hover:w-4 h-px bg-accent mr-0 group-hover:mr-3 transition-all duration-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-300">Inquiries</h4>
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-[14px] font-serif leading-relaxed text-white/80">Have a project in mind?</p>
                  <Link href="/contact" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent hover:text-white transition-colors group">
                    Start your inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Executive Direct</p>
                  <a href="mailto:info@sinhasourcinghub.com" className="text-sm font-serif italic text-white/80 hover:text-accent transition-colors">
                    info@sinhasourcinghub.com
                  </a>
                </div>
                <div className="space-y-2 font-light text-stone-400">
                   <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Global HQ</p>
                   <p className="text-sm leading-relaxed">
                     7 Awlfield Avenue,<br />
                     London, England,<br />
                     N17 7PD
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/10">
              © {currentYear} SINHA SOURCING HUB LTD. DATA-LED PRODUCTION.
            </p>
            <div className="flex gap-10">
              <Link href="/privacy" className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 flex items-center gap-8">
            <MusicPlayer />
            <div className="flex items-center gap-6">
              <span className="text-[8px] font-mono text-white/10 uppercase tracking-[0.5em]">Est. 1993 — London</span>
              <div className="w-2 h-2 bg-accent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
