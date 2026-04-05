"use client"

import { useTransition, useState } from "react"
import { updateSetting } from "@/app/actions/settings"
import { Loader2 } from "lucide-react"

export function SettingForm({ settingKey, initialValue }: { settingKey: string, initialValue: string }) {
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(initialValue)
  const [savedStatus, setSavedStatus] = useState<"idle" | "saved" | "error">("idle")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await updateSetting(settingKey, value)
      if (result.success) {
        setSavedStatus("saved")
        setTimeout(() => setSavedStatus("idle"), 3000)
      } else {
        setSavedStatus("error")
      }
    })
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-stone-950 border border-white/10 rounded-md p-3 text-sm text-white/80 font-light focus:outline-none focus:border-accent/50"
        />
        {savedStatus === "saved" && <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-2 block">Value Saved Successfully</span>}
        {savedStatus === "error" && <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-2 block">Failed to save (Permission Denied)</span>}
      </div>
      
      <button
        type="submit"
        disabled={isPending || value === initialValue}
        className="shrink-0 h-[46px] px-6 bg-white/10 hover:bg-white text-white hover:text-stone-950 transition-colors text-[10px] font-bold uppercase tracking-widest rounded disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white flex items-center justify-center gap-2"
      >
        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
      </button>
    </form>
  )
}
