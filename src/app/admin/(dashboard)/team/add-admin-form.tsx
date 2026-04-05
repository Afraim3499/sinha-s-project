"use client"

import { useActionState, useEffect } from "react"
import { addAdmin } from "@/app/actions/team"
import { Loader2 } from "lucide-react"

// Define state type for the useActionState
type ActionState = {
  success?: boolean;
  error?: string;
}

export function AddAdminForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prevState, formData) => await addAdmin(formData),
    { success: false }
  )

  useEffect(() => {
    if (state?.success) {
      // Small timeout to reset form visually after success
      const form = document.getElementById("add-admin-form") as HTMLFormElement
      if (form) form.reset()
    }
  }, [state?.success])

  return (
    <form id="add-admin-form" action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Operator Name</label>
        <input 
          name="name" 
          type="text" 
          required 
          placeholder="John Sinha"
          className="w-full bg-white/5 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Email Access</label>
        <input 
          name="email" 
          type="email" 
          required 
          placeholder="editor@sinhasourcinghub.com"
          className="w-full bg-white/5 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Temporary Password</label>
        <input 
          name="password" 
          type="text" 
          required 
          placeholder="TempPass123!"
          className="w-full bg-white/5 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Security Clearance</label>
        <select 
          name="role"
          className="w-full bg-white/5 border border-white/10 text-white p-3 text-sm focus:outline-none focus:border-accent/50 rounded appearance-none cursor-pointer"
        >
          <option value="editor" className="bg-stone-900 text-white">Editor (Blog Writer)</option>
          <option value="admin" className="bg-stone-900 text-white">Admin (CRM Manager)</option>
          <option value="super_admin" className="bg-stone-900 text-white">Super Admin (System Root)</option>
          <option value="viewer" className="bg-stone-900 text-white">Viewer (Read Only)</option>
        </select>
      </div>

      {state?.error && (
        <p className="text-red-400 text-xs mt-2">{state.error}</p>
      )}
      
      {state?.success && (
        <p className="text-emerald-400 text-xs mt-2 uppercase tracking-widest font-bold">Operator Added!</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-4 p-3 bg-white/10 hover:bg-white text-white hover:text-stone-950 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-2 rounded"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Access Credentials"}
      </button>
    </form>
  )
}
