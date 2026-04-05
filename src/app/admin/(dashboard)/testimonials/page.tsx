import { adminGetTestimonials } from "@/app/actions/testimonials"
import { Quote, Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import { TestimonialList } from "./TestimonialList"
import { headers } from "next/headers"

export default async function TestimonialsAdminPage() {
  await headers()
  const testimonials = await adminGetTestimonials()

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            <span className="w-8 h-px bg-accent/30" />
            Social Proof Management
          </div>
          <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">
            Trust <span className="text-stone-500">Assets</span>
          </h1>
          <p className="text-white/40 font-light text-base max-w-xl">
            Curate and manage client testimonials that establish authority and build trust across global sourcing sectors.
          </p>
        </div>
        
        <Link 
          href="/admin/testimonials/new" 
          className="flex items-center gap-3 bg-accent text-stone-950 px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-xl active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      {/* Main Grid/List */}
      <TestimonialList initialData={testimonials} />
    </div>
  )
}
