"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LeadListActions({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyEmail}
      className="h-8 w-8 text-white/30 hover:text-accent hover:bg-white/5 transition-colors"
      title="Copy Email"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </Button>
  )
}
