import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Mail, Calendar, Building, Tag, ArrowRight, Clock, User, Fingerprint } from "lucide-react"
import { LeadStatusForm } from "./status-form"
import { LeadNotesForm } from "./notes-form"
import { LeadDetailActions } from "./detail-actions"

import { headers } from "next/headers"

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  await headers()
  const { id } = await params

  // Fetch lead
  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single()

  if (!lead) return notFound()

  // Fetch history from activity log
  const { data: activity } = await supabase
    .from("activity_log")
    .select("*")
    .eq("entity_id", id)
    .order("created_at", { ascending: false })
    .limit(10)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="space-y-12 pb-24 max-w-6xl">
      {/* Header / Breadcrumbs */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <Link 
          href="/admin/leads"
          className="text-[10px] text-white/50 hover:text-accent uppercase tracking-[0.4em] font-bold flex items-center gap-3 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Enquiries
        </Link>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <Fingerprint className="w-4 h-4" />
          Ref: {lead.id.slice(0, 12)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Pane (7 cols) */}
        <div className="lg:col-span-8 space-y-10">
          <div className="p-10 bg-stone-900 shadow-2xl border border-white/5 rounded-2xl relative overflow-hidden backdrop-blur-md">
            {/* Background Grain/Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px:20px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    <User className="w-3.5 h-3.5" />
                    Sender Identity
                </div>
                <h1 className="text-5xl font-serif italic font-bold text-white tracking-tight leading-none">{lead.name}</h1>
              </div>

              {/* Identity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 border-y border-white/5 py-10">
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 block">Direct Email</span>
                  <div className="flex items-center gap-3">
                     <Mail className="w-4 h-4 text-accent/60" />
                     <a href={`mailto:${lead.email}`} className="text-white hover:text-accent transition-colors text-lg font-light underline underline-offset-8 decoration-white/10 decoration-1 hover:decoration-accent/50">
                       {lead.email}
                     </a>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 block">Company / Brand</span>
                  <div className="flex items-center gap-3">
                     <Building className="w-4 h-4 text-accent/60" />
                     <span className="text-white text-lg font-light">{lead.company || 'Private Branding'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 block">Product Category</span>
                  <div className="flex items-center gap-3">
                     <Tag className="w-4 h-4 text-accent/60" />
                     <span className="text-white text-lg font-light capitalize">{lead.category || 'General Sourcing'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 block">Submission Date</span>
                  <div className="flex items-center gap-3">
                     <Calendar className="w-4 h-4 text-accent/60" />
                     <span className="text-white text-lg font-light">{formatDate(lead.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Inquiry Specifications</span>
                   <div className="h-px flex-1 mx-6 bg-white/5" />
                </div>
                <div className="p-8 bg-stone-950/50 rounded-xl border border-white/5 whitespace-pre-wrap text-white/80 font-serif italic text-xl leading-relaxed selection:bg-accent/40 selection:text-white">
                  {lead.message || <span className="italic text-white/30">No message body provided.</span>}
                </div>
              </div>
              
              {/* Actions Section */}
              <div className="pt-8 border-t border-white/5">
                 <LeadDetailActions lead={lead} />
              </div>
            </div>
          </div>

          <LeadNotesForm leadId={lead.id} initialNotes={lead.notes || ""} />
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-10 sticky top-12">
            <LeadStatusForm leadId={lead.id} currentStatus={lead.status} />

            {/* Activity Log - Premium Redesign */}
            <div className="p-8 bg-black border border-white/5 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10">
                 <Clock className="w-3.5 h-3.5" />
                 Engagement Timeline
              </div>
              
              <div className="space-y-8 relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-accent/5 before:via-accent/20 before:to-transparent">
                
                {activity && activity.length > 0 ? (
                  activity.map((log: { action: string; created_at: string; admin_email: string; details?: { new_status?: string } }, i: number) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[28.5px] top-1.5 w-2 h-2 rounded-full border border-accent/40 bg-black group-hover:bg-accent transition-colors"></div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[10px] text-white/80 uppercase tracking-widest">{log.action.replace('_', ' ')}</span>
                          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{new Date(log.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[11px] text-white/30 font-light truncate">{log.admin_email}</p>
                        {log.details && log.details.new_status && (
                          <div className="mt-2 bg-white/5 border border-white/5 rounded-md px-3 py-2">
                            <span className="text-[9px] text-white/20 uppercase font-black tracking-widest mr-2">New Status:</span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent">{log.details.new_status}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-white/20 italic font-serif py-4">No historical activity recorded yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
