import { getAdminPosts } from "@/app/actions/blogs"
import Link from "next/link"
import { Plus, Edit3, Eye, FileText } from "lucide-react"
import { headers } from "next/headers"

export default async function BlogsAdminPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await headers()
  const params = await searchParams;
  const page = Number(params.page) || 1
  const { data: posts, count } = await getAdminPosts(page)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold italic text-white flex items-center gap-4">
            Journal Manager
          </h1>
          <p className="text-white/50 mt-2 font-light text-sm">Create and curate your thought leadership. Total posts: {count}</p>
        </div>

        <Link 
          href="/admin/blogs/new"
          className="px-6 py-2 bg-white text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Draft New Article
        </Link>
      </div>

      <div className="bg-stone-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] bg-stone-950/50 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Title & Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white/90 truncate">{post.title}</span>
                        <span className="text-white/40 text-[10px] mt-1 truncate">/{post.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/50">
                      {post.category || 'General'}
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border bg-amber-500/10 text-amber-500 border-amber-500/20">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-white/40 font-mono text-xs">
                      {formatDate(post.date || post.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.published && (
                          <a href={`/insights/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded hover:bg-white/5 text-white/40 hover:text-white transition-colors" title="View Live">
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link href={`/admin/blogs/${post.id}`} className="p-2 rounded hover:bg-white/5 text-white/40 hover:text-accent transition-colors" title="Edit Article">
                          <Edit3 className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-white/30">
                      <FileText className="w-8 h-8 mb-4 opacity-50" />
                      <p className="font-serif italic text-lg">No articles discovered</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
