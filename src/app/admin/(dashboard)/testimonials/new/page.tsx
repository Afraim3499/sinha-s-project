"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { addTestimonial } from "@/app/actions/testimonials"
import { ArrowLeft, Save, Loader2, Quote, Upload, Trash2, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NewTestimonialPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const result = await addTestimonial(formData)

    if (result.success) {
      // alert("Testimonial added successfully")
      router.push("/admin/testimonials")
      router.refresh()
    } else {
      alert(result.error || "Failed to add testimonial")
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-12 pb-20 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-white/5 pb-10">
        <Link 
          href="/admin/testimonials" 
          className="flex items-center gap-2 text-white/30 hover:text-accent transition-colors text-[10px] font-bold uppercase tracking-[0.3em]"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to list
        </Link>
        <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">
          New <span className="text-stone-500">Endorsement</span>
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-10 group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Client Name *</label>
             <input 
                name="name" 
                required 
                placeholder="e.g. Marcus Thorne"
                className="w-full bg-stone-900 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:border-accent/40 outline-none transition-all focus:ring-4 focus:ring-accent/5"
             />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Company / Brand</label>
             <input 
                name="company" 
                placeholder="e.g. Velora Group"
                className="w-full bg-stone-900 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:border-accent/40 outline-none transition-all focus:ring-4 focus:ring-accent/5"
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Role / Position</label>
             <input 
                name="role" 
                placeholder="e.g. Supply Chain Director"
                className="w-full bg-stone-900 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:border-accent/40 outline-none transition-all focus:ring-4 focus:ring-accent/5"
             />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Avatar Source</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Upload */}
               <div className="relative group">
                 <input 
                    type="file" 
                    name="image_file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                 />
                 <div className="h-14 bg-stone-900 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-white/40 group-hover:bg-white/5 transition-all text-sm font-light">
                   {preview ? (
                     <div className="flex items-center gap-3 text-accent font-bold uppercase text-[9px] tracking-widest">
                       <CheckCircle className="w-3.5 h-3.5" /> File Selected
                     </div>
                   ) : (
                     <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                     </>
                   )}
                 </div>
               </div>
               {/* Or URL */}
               <div className="relative">
                 <input 
                    name="image_url" 
                    placeholder="or https://..."
                    className="w-full h-14 bg-stone-900 border border-white/5 rounded-2xl px-4 text-white placeholder:text-white/10 focus:border-accent/40 outline-none transition-all focus:ring-4 focus:ring-accent/5 text-sm"
                 />
               </div>
             </div>
             {/* Preview Overlay */}
             {preview && (
               <div className="mt-4 flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
                 <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img src={preview} alt="Upload Preview" className="object-cover w-full h-full" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">Upload Preview</p>
                    <p className="text-[8px] text-accent font-bold uppercase tracking-widest">Selected for processing</p>
                 </div>
                 <button 
                    type="button" 
                    onClick={() => { setPreview(null); (document.getElementsByName('image_file')[0] as HTMLInputElement).value = '' }}
                    className="p-2 text-white/30 hover:text-red-400 transition-colors"
                 >
                    <Trash2 className="w-3.5 h-3.5" />
                 </button>
               </div>
             )}
          </div>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-1">Testimonial Insight *</label>
           <div className="relative">
              <Quote className="absolute top-6 left-6 w-8 h-8 text-white/5 pointer-events-none" />
              <textarea 
                name="content" 
                required 
                rows={6}
                placeholder="Detail the value provided, quality standards maintained, or specific challenges resolved..."
                className="w-full bg-stone-900 border border-white/5 rounded-3xl px-6 py-8 text-lg font-serif italic text-white placeholder:text-white/5 focus:border-accent/40 outline-none transition-all focus:ring-4 focus:ring-accent/5 leading-relaxed pl-20"
              />
           </div>
        </div>

        <div className="pt-10 flex items-center gap-6">
           <button 
             type="submit" 
             disabled={isPending}
             className="bg-accent text-stone-950 px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4"
           >
             {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             Establish Trust Asset
           </button>
           <p className="text-[9px] text-white/20 uppercase tracking-widest leading-relaxed max-w-xs">
             * All endorsements are vetted for quality before production rollout.
           </p>
        </div>
      </form>
    </div>
  )
}
