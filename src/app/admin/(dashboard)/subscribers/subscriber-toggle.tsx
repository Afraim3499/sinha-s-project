"use client"

import { useTransition } from "react"
import { toggleSubscriberStatus } from "@/app/actions/subscribers"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function SubscriberToggle({ id, status }: { id: string, status: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleToggle = () => {
    startTransition(async () => {
      await toggleSubscriberStatus(id, status)
      router.refresh()
    })
  }

  const isActive = status === 'active'

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors rounded ${
        isActive 
          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400'
          : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-400'
      } disabled:opacity-50 flex items-center gap-2 ml-auto`}
    >
      {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
      {isActive ? "Unsubscribe" : "Re-activate"}
    </button>
  )
}
