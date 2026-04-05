import { verifySession } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { 
  Users, 
  Mail, 
  Eye, 
  TrendingUp,
  ArrowUpRight,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { headers } from "next/headers"

// Helper to calculate date 30 days ago and 7 days ago
const getPastDateString = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

export default async function AdminDashboard() {
  await headers()
  const session = await verifySession()

  // 1. Fetch KPI Data
  const thirtyDaysAgo = getPastDateString(30)
  const sevenDaysAgo = getPastDateString(7)

  // Leads Data
  const { count: totalLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })

  const { count: newLeadsWeekly } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte('created_at', sevenDaysAgo)

  // Sub Data
  const { count: totalSubs } = await supabase
    .from("subscribers")
    .select("*", { count: "exact", head: true })
    .eq('status', 'active')

  // Page Views Data
  const { count: monthlyViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte('created_at', thirtyDaysAgo)

  // 2. Fetch recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("id, name, company, email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5)

  // 3. Status Breakdown
  const { data: statusCounts } = await supabase
    .from("leads")
    .select("status")
  
  const pipeline = {
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
  }

  statusCounts?.forEach((lead) => {
    if (pipeline[lead.status as keyof typeof pipeline] !== undefined) {
      pipeline[lead.status as keyof typeof pipeline]++
    }
  })

  // Format Date Helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  // Get status color
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

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
            <span className="w-8 h-px bg-accent/30" />
            Admin Intelligence
          </div>
          <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">
            Hub <span className="text-stone-500">Analytics</span>
          </h1>
          <p className="text-white/40 font-light text-base max-w-md">
            Real-time monitoring of Sinha Sourcing Hub limited across global sourcing operations.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40 bg-white/5 px-6 py-3 rounded-full border border-white/10">
           Welcome, {session?.name}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Active Leads", value: totalLeads || 0, icon: Users, trend: "+12%", trendUp: true },
          { label: "Incoming Weekly", value: newLeadsWeekly || 0, icon: TrendingUp, trend: "Growth", trendUp: true },
          { label: "Verified Subs", value: totalSubs || 0, icon: Mail, trend: "+45%", trendUp: true },
          { label: "30-Day Velocity", value: monthlyViews || 0, icon: Eye, trend: "Tracking", trendUp: true },
        ].map((kpi, i) => (
          <div key={i} className="p-8 bg-stone-900 shadow-xl border border-white/5 rounded-2xl flex flex-col justify-between hover:border-accent/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">{kpi.label}</span>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <kpi.icon className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-serif font-bold text-white tracking-tight">{kpi.value}</span>
              <span className={`text-[9px] py-1 px-2 rounded-md font-bold uppercase tracking-widest flex items-center gap-1 mb-1.5 ${kpi.trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {kpi.trendUp && <ArrowUpRight className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Pipeline Breakdown */}
        <div className="lg:col-span-4 p-8 bg-stone-900 border border-white/5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 italic">Global Pipeline</h2>
             <TrendingUp className="w-4 h-4 text-white/10" />
          </div>
          <div className="space-y-8">
            {[
              { label: "Incoming", value: pipeline.new, color: "bg-blue-400", sub: "Priority Review" },
              { label: "Active Engagement", value: pipeline.contacted, color: "bg-amber-400", sub: "Negotiation" },
              { label: "High Interest", value: pipeline.qualified, color: "bg-emerald-400", sub: "Vetting" },
              { label: "Closed Success", value: pipeline.converted, color: "bg-indigo-400", sub: "Operations" },
            ].map((stage, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{stage.label}</span>
                    <span className="text-[9px] text-white/20 uppercase font-medium">{stage.sub}</span>
                  </div>
                  <span className="font-serif italic text-2xl text-white/30">{stage.value}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stage.color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`} 
                    style={{ width: `${Math.max((stage.value / (totalLeads || 1)) * 100, 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/leads" className="mt-12 inline-flex items-center gap-4 text-[10px] text-accent hover:text-white transition-all uppercase tracking-[0.4em] font-bold group">
            Comprehensive Data View 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent Enquiries Widget */}
        <div className="lg:col-span-8 p-8 bg-stone-900 border border-white/5 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

          <div className="flex justify-between items-center mb-10 relative z-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 italic">Recent Client Specifications</h2>
            <Link href="/admin/leads" className="text-[9px] font-bold uppercase tracking-widest text-white/20 hover:text-accent transition-colors">
              Broad View
            </Link>
          </div>
          
          <div className="flex-1 overflow-x-auto relative z-10">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="px-4 py-4 font-medium">Lead Entity</th>
                  <th className="px-4 py-4 font-medium hidden sm:table-cell">Brand Category</th>
                  <th className="px-4 py-4 font-medium">Status Signal</th>
                  <th className="px-4 py-4 font-medium text-right">Filing Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads && recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-6">
                        <div className="flex flex-col">
                          <Link href={`/admin/leads/${lead.id}`} className="font-serif italic text-lg text-white group-hover:text-accent transition-all decoration-accent/0 hover:decoration-accent/100">
                            {lead.name}
                          </Link>
                          <span className="text-[11px] text-white/30 font-light truncate max-w-[180px] mt-1">{lead.company || lead.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-6 hidden sm:table-cell">
                         <span className="text-[11px] text-white/40 font-bold uppercase tracking-widest">{lead.status === 'new' ? 'Unrated' : 'Qualified'}</span>
                      </td>
                      <td className="px-4 py-6">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border shadow-lg ${getStatusColor(lead.status)}`}>
                          {lead.status}
                          {lead.status === 'new' && <span className="ml-2 inline-block w-1 h-1 rounded-full bg-blue-400 animate-pulse" />}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-white/30 text-[10px] font-bold tracking-widest">{formatDate(lead.created_at)}</span>
                          <Link href={`/admin/leads/${lead.id}`} className="text-accent underline underline-offset-4 decoration-accent/30 text-[9px] font-black uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            View Dossier
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-20 text-center text-white/20 italic font-serif text-xl border-dashed border-2 border-white/5 mt-4 rounded-xl">
                      System data empty. Awaiting global client input.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
