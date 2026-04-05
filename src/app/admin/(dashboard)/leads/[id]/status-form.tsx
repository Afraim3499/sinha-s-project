"use client"

import { useTransition, useState } from "react"
import { updateLeadStatus } from "@/app/actions/leads"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function LeadStatusForm({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const statuses = [
    { value: "new", label: "New (Uncontacted)" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified (Good Fit)" },
    { value: "converted", label: "Converted (Client)" },
    { value: "archived", label: "Archived" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'contacted': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'qualified': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'converted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'archived': return 'bg-stone-500/10 text-stone-400 border-stone-500/20'
      default: return 'bg-white/5 text-white/50 border-white/10'
    }
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    startTransition(async () => {
      const result = await updateLeadStatus(leadId, newStatus)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2000)
        router.refresh()
      }
    })
  }

  return (
    <div className="p-6 bg-stone-900 border border-white/5 rounded-xl">
      <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4 flex items-center justify-between">
        Pipeline Stage
        {isPending && <Loader2 className="w-3 h-3 text-accent animate-spin" />}
      </h3>
      
      <div className="flex flex-col gap-4">
        <label className={`relative flex items-center px-4 py-3 rounded-md border ${getStatusColor(currentStatus)} transition-colors`}>
          <select 
            value={currentStatus}
            onChange={handleStatusChange}
            disabled={isPending}
            className="w-full bg-transparent appearance-none outline-none font-bold uppercase tracking-widest text-xs cursor-pointer focus:ring-0 z-10"
          >
            {statuses.map(s => (
              <option key={s.value} value={s.value} className="bg-stone-900 text-white">{s.label}</option>
            ))}
          </select>
          <div className="absolute right-4 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </label>
        
        {success && (
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest text-right animate-pulse">
            Status Updated
          </p>
        )}
      </div>
    </div>
  )
}
