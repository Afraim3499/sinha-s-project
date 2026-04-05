import { getSubscribers } from "@/app/actions/subscribers"
import { SubscriberToggle } from "./subscriber-toggle"
import { Mail, Search, Download } from "lucide-react"
import { headers } from "next/headers"

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  await headers()
  const params = await searchParams;
  const page = Number(params.page) || 1
  const { data: subscribers, count } = await getSubscribers(page)

  const activeCount = subscribers.filter(s => s.status === 'active').length

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
            Audience <span className="text-accent not-italic">({activeCount} Active)</span>
          </h1>
          <p className="text-white/50 mt-2 font-light text-sm">Managing {count} total mailing list contacts.</p>
        </div>

        <button className="px-4 py-2 bg-white text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors rounded-md flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV List
        </button>
      </div>

      <div className="bg-stone-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] bg-stone-950/50 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Subscribed On</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                        <span className="font-medium text-white/90">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/40 font-mono text-xs">
                      {formatDate(sub.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                        sub.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-stone-500/10 text-stone-400 border-stone-500/20'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <SubscriberToggle id={sub.id} status={sub.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-white/30">
                      <Search className="w-8 h-8 mb-4 opacity-50" />
                      <p className="font-serif italic text-lg">No subscribers yet</p>
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
