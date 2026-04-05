import { getAdminPost } from "@/app/actions/blogs"
import { BlogEditor } from "./blog-editor"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { headers } from "next/headers"

// Note: Ensure the ID can also be "new" for drafting new posts
export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  await headers()
  const { id } = await params
  const isNew = id === "new"
  const post = await getAdminPost(id)

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/blogs"
          className="text-xs text-white/50 hover:text-white uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Journal
        </Link>
        <span className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold border border-accent/20 bg-accent/10 px-3 py-1 rounded">
          {isNew ? "Draft Mode" : "Edit Mode"}
        </span>
      </div>

      <div className="p-6 md:p-8 bg-stone-900 border border-white/5 rounded-xl">
        <h1 className="text-2xl font-serif font-bold italic text-white mb-8 border-b border-white/5 pb-6">
          {isNew ? "Craft New Article" : "Modify Post Configuration"}
        </h1>

        <BlogEditor initialPost={post} postId={id} />
      </div>
    </div>
  )
}
