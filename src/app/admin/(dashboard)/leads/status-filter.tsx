"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Filter } from "lucide-react"

export function StatusFilter({ currentStatus }: { currentStatus: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setStatus = (status: string) => {
    const params = new URLSearchParams(searchParams)
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="bg-stone-900/50 border border-white/10 flex items-center px-4 py-2 rounded-lg focus-within:border-accent/40 transition-colors">
      <Filter className="w-3.5 h-3.5 text-white/30 mr-3" />
      <select 
        value={currentStatus}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-white/70 focus:outline-none appearance-none pr-8 cursor-pointer"
      >
        <option value="all" className="bg-stone-950">Filter: All Enquiries</option>
        <option value="new" className="bg-stone-950">Filter: New</option>
        <option value="contacted" className="bg-stone-950">Filter: Contacted</option>
        <option value="qualified" className="bg-stone-950">Filter: Qualified</option>
        <option value="converted" className="bg-stone-950">Filter: Converted</option>
        <option value="archived" className="bg-stone-950">Filter: Archived</option>
      </select>
    </div>
  )
}
