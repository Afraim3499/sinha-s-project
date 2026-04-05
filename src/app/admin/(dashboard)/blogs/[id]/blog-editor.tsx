"use client"

import { useState, useTransition } from "react"
import { savePost, deletePost } from "@/app/actions/blogs"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
import { Loader2, Trash2 } from "lucide-react"

type EditorPost = {
  title?: string
  slug?: string
  category?: string
  excerpt?: string
  content?: string
  hero_image?: string
  meta_title?: string
  meta_description?: string
  published?: boolean
}

export function BlogEditor({ initialPost, postId }: { initialPost: EditorPost, postId: string }) {
  const router = useRouter()
  const isNew = postId === "new"
  const [isPending, startTransition] = useTransition()
  
  const [title, setTitle] = useState(initialPost.title || "")
  const [slug, setSlug] = useState(initialPost.slug || "")
  const [category, setCategory] = useState(initialPost.category || "General")
  const [excerpt, setExcerpt] = useState(initialPost.excerpt || "")
  const [content, setContent] = useState<string>(initialPost.content || "")
  const [heroImage, setHeroImage] = useState(initialPost.hero_image || "")
  const [seoTitle, setSeoTitle] = useState(initialPost.meta_title || "")
  const [seoDesc, setSeoDesc] = useState(initialPost.meta_description || "")
  const [published, setPublished] = useState(initialPost.published || false)

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleSave = (e: React.FormEvent, publishState: boolean) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")

    if (!title || !content || (!slug && !isNew)) {
      setErrorMsg("Title, slug, and content are required.")
      return
    }

    startTransition(async () => {
      const payload = {
        title, slug, category, excerpt, content, 
        hero_image: heroImage, meta_title: seoTitle, meta_description: seoDesc, 
        published: publishState
      }
      
      const result = await savePost(postId, payload)
      if (result.success) {
        setPublished(publishState)
        setSuccessMsg(publishState ? "Post published successfully!" : "Draft saved successfully!")
        
        if (isNew) {
          router.push(`/admin/blogs/${result.id}`)
        } else {
          router.refresh()
        }
      } else {
        setErrorMsg(result.error || "Failed to save post.")
      }
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      startTransition(async () => {
        const result = await deletePost(postId)
        if (result.success) {
          router.push("/admin/blogs")
        } else {
          setErrorMsg(result.error || "Failed to delete.")
        }
      })
    }
  }

  return (
    <div className="space-y-8" data-color-mode="dark">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Article Title</label>
            <input 
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-stone-950 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded"
              placeholder="The Future of Sourcing..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">URL Slug</label>
            <input 
              value={slug} onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-stone-950 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded"
              placeholder="future-of-sourcing"
            />
            <p className="text-[10px] text-white/30 font-light">Leave blank on new drafts to auto-generate from title.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Short Excerpt (Intro)</label>
            <textarea 
              value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
              className="w-full h-24 bg-stone-950 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded resize-none"
              placeholder="A brief summary for the blog grid..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center justify-between mb-2">
              Markdown Body
            </label>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={500}
              preview="edit"
              className="!bg-stone-950 !border-white/10"
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="p-6 bg-stone-950 border border-white/5 rounded-lg space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Metadata</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/50">Category</label>
              <input 
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 text-white p-2 text-xs rounded"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/50">Hero Image Path/URL</label>
              <input 
                value={heroImage} onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/hero-factory.webp"
                className="w-full bg-stone-900 border border-white/10 text-white p-2 text-xs rounded"
              />
              <p className="text-[9px] text-white/30">Use raw URL or path from public folder.</p>
            </div>
            
            <div className="space-y-2 mt-6">
              <label className="text-[10px] uppercase text-white/50 block font-bold mb-2">SEO Tweaks</label>
              <input 
                value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Meta Title"
                className="w-full bg-stone-900 border border-white/10 text-white p-2 text-xs rounded mb-2"
              />
              <textarea 
                value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Meta Description"
                className="w-full h-20 bg-stone-900 border border-white/10 text-white p-2 text-xs rounded resize-none"
              />
            </div>
          </div>

          {/* Action Hub */}
          <div className="p-6 bg-stone-950 border border-white/5 rounded-lg space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">Actions</h3>
            
            {errorMsg && <p className="text-xs text-red-500 mb-2">{errorMsg}</p>}
            {successMsg && <p className="text-xs text-emerald-400 mb-2">{successMsg}</p>}

            <button 
              onClick={(e) => handleSave(e, true)}
              disabled={isPending}
              className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 py-3 rounded text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors"
            >
              {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
              {published ? "Update Live Post" : "Publish to Web"}
            </button>
            
            <button 
              onClick={(e) => handleSave(e, false)}
              disabled={isPending}
              className="w-full bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 py-3 rounded text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors"
            >
              {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
              Save as Draft
            </button>
            
            {!isNew && (
              <button 
                onClick={handleDelete}
                disabled={isPending}
                className="w-full mt-4 bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500/10 py-3 rounded text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
