import { verifySession, AdminRole, hasRole } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  BarChart3, 
  Users, 
  Mail, 
  FileText, 
  Settings, 
  ShieldAlert,
  LogOut,
  Menu,
  Quote
} from "lucide-react"
import { logoutAdmin } from "@/app/actions/auth"
import { headers } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await headers()
  const session = await verifySession()

  // Redundant check (middleware handles this mainly) 
  // but good practice for server components
  if (!session) {
    redirect("/admin/login")
  }

  const role = session.role

  const navItems = [
    { label: "Overview", icon: BarChart3, href: "/admin", roles: ["super_admin", "admin", "editor", "viewer"] },
    { label: "Enquiries", icon: Users, href: "/admin/leads", roles: ["super_admin", "admin", "viewer"] },
    { label: "Subscribers", icon: Mail, href: "/admin/subscribers", roles: ["super_admin", "admin", "viewer"] },
    { label: "Journal", icon: FileText, href: "/admin/blogs", roles: ["super_admin", "admin", "editor"] },
    { label: "Trust", icon: Quote, href: "/admin/testimonials", roles: ["super_admin", "admin", "editor"] },
    { label: "Config", icon: Settings, href: "/admin/settings", roles: ["super_admin", "admin"] },
    { label: "Governance", icon: ShieldAlert, href: "/admin/team", roles: ["super_admin"] },
  ]

  // Filter based on RBAC
  const filteredNav = navItems.filter(item => hasRole(role, item.roles as AdminRole[]))

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col md:flex-row font-sans text-stone-300">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-stone-900">
        <span className="font-serif font-bold text-white italic">Sinha Hub Ops</span>
        <button className="text-white/50 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-stone-900/50 border-r border-white/5 h-screen sticky top-0">
        <div className="p-6 border-b border-white/5">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-accent block">System Active</span>
          <span className="font-serif italic font-bold text-xl text-white mt-2 block">Command Center</span>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          {filteredNav.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/5 transition-colors group text-sm font-light text-white/60 hover:text-white"
            >
              <item.icon className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-stone-950 p-4 rounded-md border border-white/10 flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{session.name}</span>
              <span className="text-[10px] uppercase tracking-wider text-accent font-bold mt-1">
                Role: {role.replace('_', ' ')}
              </span>
            </div>
            
            <form action={logoutAdmin} className="w-full">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 text-xs font-light text-red-400 hover:text-red-300 transition-colors py-2 bg-red-400/10 hover:bg-red-400/20 rounded"
              >
                <LogOut className="w-3 h-3" />
                Terminate Session
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>

    </div>
  )
}
