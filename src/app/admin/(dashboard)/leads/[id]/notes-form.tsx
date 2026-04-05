"use client"

import { useTransition, useState } from "react"
import { updateLeadNotes } from "@/app/actions/leads"
import { Loader2 } from "lucide-react"

export function LeadNotesForm({ leadId, initialNotes }: { leadId: string, initialNotes: string }) {
  const [isPending, startTransition] = useTransition()
  const [notes, setNotes] = useState(initialNotes)
  const [savedStatus, setSavedStatus] = useState<"idle" | "saved" | "error">("idle")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await updateLeadNotes(leadId, notes)
      if (result.success) {
        setSavedStatus("saved")
        setTimeout(() => setSavedStatus("idle"), 3000)
      } else {
        setSavedStatus("error")
      }
    })
  }

  return (
    <form onSubmit={handleSave} className="p-8 bg-stone-900 border border-white/5 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">Internal Notes</h3>
        {savedStatus === "saved" && <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Saved</span>}
      </div>
      
      <div className="relative">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add team notes, background context, or follow-up reminders..."
          className="w-full h-40 bg-stone-950 border border-white/10 rounded-lg p-4 text-sm text-white/80 font-light focus:outline-none focus:border-accent/50 resize-y"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            type="submit"
            disabled={isPending || notes === initialNotes}
            className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-stone-950 transition-colors text-[10px] font-bold uppercase tracking-widest rounded disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white flex items-center gap-2"
          >
            {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save Notes"}
          </button>
        </div>
      </div>
    </form>
  )
}
