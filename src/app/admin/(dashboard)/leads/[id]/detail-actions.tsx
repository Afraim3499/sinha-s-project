"use client"

import { useState } from "react"
import { Mail, Check, ArrowRight, FileText, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateLeadStatus } from "@/app/actions/leads"
import { useRouter } from "next/navigation"

interface LeadDetailActionsProps {
  lead: {
    id: string
    name: string
    email: string
    category: string
    company?: string
    message: string
    status: string
  }
}

export function LeadDetailActions({ lead }: LeadDetailActionsProps) {
  const [copiedType, setCopiedType] = useState<"message" | "info" | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const copyToClipboard = (text: string, type: "message" | "info") => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleGmailReply = async () => {
    setIsUpdating(true)
    
    // 1. If status is 'new', update to 'contacted' automatically
    if (lead.status === 'new') {
      await updateLeadStatus(lead.id, 'contacted')
    }

    // 2. Prepare Gmail mailto link
    const subject = encodeURIComponent(`Inquiry Re: ${lead.category || 'Product Sourcing'} - Sinha Sourcing Hub [Ref: ${lead.id.slice(0, 8)}]`)
    const body = encodeURIComponent(`Dear ${lead.name},\n\nThank you for reaching out to Sinha Sourcing Hub.\n\n---\nRegarding your inquiry:\n"${lead.message}"`)
    const mailtoUrl = `mailto:${lead.email}?subject=${subject}&body=${body}`

    // 3. Open Gmail / Mail client
    window.location.href = mailtoUrl
    
    // 4. Update the UI to reflect status change if needed
    router.refresh()
    setIsUpdating(false)
  }

  const leadInfoText = `
Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || 'N/A'}
Category: ${lead.category}
Status: ${lead.status}
  `.trim()

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={handleGmailReply}
          disabled={isUpdating}
          className="h-14 px-8 bg-white text-stone-950 hover:bg-accent hover:text-white transition-all text-[11px] font-bold uppercase tracking-[0.3em] rounded-none group"
        >
          <Mail className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
          {isUpdating ? "Processing..." : "Open in Gmail"}
          <ArrowRight className="w-3.5 h-3.5 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Button>

        <div className="flex bg-stone-900 border border-white/5 overflow-hidden shadow-xl">
           <Button
             variant="ghost"
             onClick={() => copyToClipboard(lead.message, "message")}
             className="h-14 px-6 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all rounded-none border-r border-white/5"
           >
             {copiedType === "message" ? (
               <Check className="w-3.5 h-3.5 mr-2 text-emerald-500" />
             ) : (
               <FileText className="w-3.5 h-3.5 mr-2" />
             )}
             Copy Message
           </Button>
           <Button
             variant="ghost"
             onClick={() => copyToClipboard(leadInfoText, "info")}
             className="h-14 px-6 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all rounded-none"
           >
             {copiedType === "info" ? (
               <Check className="w-3.5 h-3.5 mr-2 text-emerald-500" />
             ) : (
               <UserPlus className="w-3.5 h-3.5 mr-2" />
             )}
             Copy Lead Info
           </Button>
        </div>
      </div>
      
      {lead.status === 'new' && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent/60">
          * Clicking &quot;Open in Gmail&quot; will automatically mark this lead as &quot;Contacted&quot;.
        </p>
      )}
    </div>
  )
}
