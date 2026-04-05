import { getLeads } from "@/app/actions/leads"
import Link from "next/link"
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, User, Mail, Calendar, ArrowUpRight } from "lucide-react"
import { StatusFilter } from "./status-filter"
import { LeadListActions } from "./list-actions"
import { headers } from "next/headers"

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>
}) {
  await headers()
  const params = await searchParams;
  const page = Number(params.page) || 1
  const status = params.status || 'all'

  const { data: leads, count } = await getLeads(page, status)
  const totalPages = Math.ceil(count / 15)

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-400/10 text-blue-400 border-blue-400/20'
      case 'contacted': return 'bg-amber-400/10 text-amber-400 border-amber-400/20'
      case 'qualified': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
      case 'converted': return 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20'
      case 'archived': return 'bg-stone-500/10 text-stone-400 border-stone-500/20'
      default: return 'bg-white/5 text-white/50 border-white/10'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            <span className="w-8 h-px bg-accent/30" />
            CRM Pipeline
          </div>
          <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">
            Client <span className="text-stone-500">Enquiries</span>
          </h1>
          <p className="text-white/40 font-light text-base max-w-md">
            Managing <span className="text-white font-medium">{count}</span> total manufacturing leads across all categories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <StatusFilter currentStatus={status} />
          <button className="h-11 px-6 bg-white text-stone-950 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all transform active:scale-95 duration-200">
            Export Data
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-stone-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-950/40 border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Lead Entity</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] hidden lg:table-cell">Product Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] hidden sm:table-cell">Submission Date</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center border border-white/5 shrink-0 group-hover:border-accent/30 transition-colors">
                          <User className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <Link 
                            href={`/admin/leads/${lead.id}`} 
                            className="text-white hover:text-accent font-serif italic text-lg transition-colors truncate block"
                          >
                            {lead.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-white/40 text-xs font-light truncate max-w-[200px]">
                              {lead.company || lead.email}
                            </span>
                            <LeadListActions email={lead.email} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden lg:table-cell">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950/50 border border-white/5 text-[11px] text-white/60 font-medium capitalize">
                        {lead.category || 'General'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-md border shadow-sm ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-white/30 text-xs">
                        <Calendar className="w-3 h-3" />
                        {formatDate(lead.created_at)}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/leads/${lead.id}`}
                          className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-accent/50 hover:bg-accent/5 transition-all"
                          title="View Details"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-red-500/50 hover:bg-red-500/5 transition-all" title="Archive">
                           <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center justify-center text-white/20 max-w-xs mx-auto space-y-4">
                      <div className="w-16 h-16 rounded-full bg-stone-900 border border-white/5 flex items-center justify-center mb-2">
                        <Search className="w-6 h-6 opacity-30" />
                      </div>
                      <p className="font-serif italic text-2xl text-white/40">No enquiries discovered.</p>
                      <p className="text-sm font-light leading-relaxed">Try adjusting your filters or search terms to locate specific factory enquiries.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-6 border-t border-white/5 bg-stone-950/20">
            <div className="text-white/30 text-[11px] font-bold uppercase tracking-widest">
              Page {page} <span className="text-white/10 font-light mx-2">/</span> {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href={`?page=${Math.max(1, page - 1)}${status !== 'all' ? `&status=${status}` : ''}`}
                className={`h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all ${page === 1 ? 'opacity-30 pointer-events-none' : 'text-white/70'}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`?page=${p}${status !== 'all' ? `&status=${status}` : ''}`}
                    className={`h-10 w-10 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${p === page ? 'bg-white text-stone-950' : 'text-white/30 hover:bg-white/5'}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
              <Link 
                href={`?page=${Math.min(totalPages, page + 1)}${status !== 'all' ? `&status=${status}` : ''}`}
                className={`h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all ${page === totalPages ? 'opacity-30 pointer-events-none' : 'text-white/70'}`}
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
