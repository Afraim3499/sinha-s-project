"use client"

import React, { useState } from "react"
import { Quote, Trash2, Edit, CheckCircle, XCircle, MoreVertical } from "lucide-react"
import { toggleTestimonialActive, deleteTestimonial } from "@/app/actions/testimonials"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  company: string | null
  content: string
  role: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
}

export function TestimonialList({ initialData }: { initialData: Testimonial[] }) {
  const [data, setData] = useState(initialData)

  const handleToggle = async (id: string, currentState: boolean) => {
    const result = await toggleTestimonialActive(id, currentState)
    if (result.success) {
      setData(prev => prev.map(t => t.id === id ? { ...t, is_active: !currentState } : t))
      // alert(`Testimonial ${!currentState ? 'activated' : 'deactivated'}`)
    } else {
      alert(result.error || "Failed to update")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    const result = await deleteTestimonial(id)
    if (result.success) {
      setData(prev => prev.filter(t => t.id !== id))
      alert("Testimonial deleted")
    } else {
      alert(result.error || "Failed to delete")
    }
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/5 rounded-3xl bg-stone-900/20">
        <Quote className="w-12 h-12 text-white/5 mb-6" />
        <p className="text-white/40 font-serif italic text-xl">No trust assets compiled yet.</p>
        <p className="text-white/20 text-xs uppercase tracking-widest mt-4">Awaiting global client endorsements.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((testimonial) => (
        <div 
          key={testimonial.id} 
          className={`relative group p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
            testimonial.is_active 
              ? 'bg-stone-900 border-white/5 hover:border-accent/40 shadow-xl' 
              : 'bg-stone-950/40 border-white/10 opacity-60'
          }`}
        >
          {/* Status Badge */}
          <div className="absolute top-6 right-6 z-10">
             <button 
                onClick={() => handleToggle(testimonial.id, testimonial.is_active)}
                className={`flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
                  testimonial.is_active 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                    : 'bg-stone-500/10 text-stone-400 border-stone-500/20 hover:bg-stone-500/20'
                }`}
             >
                {testimonial.is_active ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                {testimonial.is_active ? "Active" : "Archived"}
             </button>
          </div>

          {/* Action Overlay */}
          <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => handleDelete(testimonial.id)}
              className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-6 pt-4">
            <Quote className="w-8 h-8 text-accent/20" />
            <p className="text-white/70 font-light text-sm leading-relaxed italic line-clamp-4">
              &quot;{testimonial.content}&quot;
            </p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0">
                {testimonial.image_url ? (
                  <Image src={testimonial.image_url} alt={testimonial.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs font-bold text-white/20 uppercase">
                    {testimonial.name.substring(0, 1)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white uppercase tracking-widest">{testimonial.name}</span>
                <span className="text-[10px] text-white/30 truncate max-w-[150px]">
                  {testimonial.role}{testimonial.company ? ` @ ${testimonial.company}` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
