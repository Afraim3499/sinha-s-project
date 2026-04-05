"use client"

import { useTransition } from "react"
import { deleteAdmin } from "@/app/actions/team"
import { Loader2, Trash2 } from "lucide-react"

export function RevokeButton({ userId, role }: { userId: string, role: string }) {
  const [isPending, startTransition] = useTransition()

  // Prevent UI from even offering to delete super_admins to prevent accidental lockouts.
  // We can let them do it if desired, but blocking it is safer.
  if (role === "super_admin") {
    return (
      <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Root Protected</span>
    )
  }

  const handleDelete = () => {
    if (confirm("Are you certain you want to revoke access? This action is permanent and immediate.")) {
      startTransition(async () => {
        const result = await deleteAdmin(userId)
        if (!result.success && result.error) {
          alert(result.error)
        }
      })
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-white/30 hover:bg-red-500/10 hover:text-red-500 transition-colors rounded disabled:opacity-50 flex items-center justify-center"
      title="Revoke Access"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
