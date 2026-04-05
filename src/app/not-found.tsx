"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-[10rem] font-serif font-bold text-white/5 tracking-tighter absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            404
          </h1>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white italic">
              Page not found.
            </h2>
            <p className="text-stone-400 text-lg font-light max-w-md mx-auto leading-relaxed">
              The resource you are looking for might have been moved, removed, or is temporarily unavailable.
            </p>
          </div>
        </div>
        
        <div className="pt-8 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-accent hover:text-white transition-all hover:gap-5 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
            Return to Safety
          </Link>
        </div>
      </div>
    </div>
  )
}
