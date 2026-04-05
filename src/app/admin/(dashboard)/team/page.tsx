import { getTeam } from "@/app/actions/team"
import { AddAdminForm } from "./add-admin-form"
import { RevokeButton } from "./revoke-button"
import { ShieldAlert, UserPlus, Key } from "lucide-react"
import { headers } from "next/headers"

export default async function TeamPage() {
  await headers()
  const team = await getTeam()

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'admin': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'editor': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'viewer': return 'bg-stone-500/10 text-stone-400 border-stone-500/20'
      default: return 'bg-white/5 text-white/50 border-white/10'
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-serif font-bold italic text-white flex items-center gap-4">
          Governance
        </h1>
        <p className="text-white/50 mt-2 font-light text-sm">Role-Based Access Control and Team Management.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        
        {/* User List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6 flex items-center gap-2">
            <Key className="w-4 h-4" /> Active Operators
          </h2>
          
          <div className="bg-stone-900 border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5">
            {team.map((user) => (
              <div key={user.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white tracking-widest uppercase text-sm">
                      {user.name || "Unknown"}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getRoleBadge(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-white/50 font-mono block mb-2">{user.email}</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">
                    Last active: {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                  </span>
                </div>
                
                <RevokeButton userId={user.id} role={user.role} />
              </div>
            ))}
          </div>
        </div>

        {/* Add User Form */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6 flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Provision Access
          </h2>
          
          <div className="p-6 bg-stone-900 border border-white/5 rounded-xl">
            <div className="flex gap-3 mb-6 p-4 bg-accent/10 border border-accent/20 rounded-md">
              <ShieldAlert className="w-5 h-5 text-accent shrink-0" />
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest leading-relaxed">
                Super Admins have full read/write access and can delete others. Editors have write access to Blogs only. Viewers are read-only.
              </p>
            </div>
            
            <AddAdminForm />
          </div>
        </div>

      </div>
    </div>
  )
}
