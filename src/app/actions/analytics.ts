"use server"

import { supabase } from "@/lib/supabase"
import { headers } from "next/headers"

// Fire and forget tracker
export async function trackPageView(path: string, referrer: string) {
  try {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''

    // Derive basic device type without an external library
    let deviceType = 'desktop'
    if (/mobile/i.test(userAgent)) deviceType = 'mobile'
    else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet'

    await supabase.from("page_views").insert([{
      path,
      referrer,
      user_agent: userAgent,
      device_type: deviceType,
      city: headersList.get('x-vercel-ip-city') || null,
      country: headersList.get('x-vercel-ip-country') || null,
    }])
    
    // Fire and forget - don't throw error to client if tracking fails
  } catch (e) {
    console.error("Tracking Error:", e)
  }
}

export async function getAnalytics(days = 30) {
  // Signal dynamic context for Next.js 16 build stability
  await headers()
  const pastDate = new Date()
  pastDate.setDate(pastDate.getDate() - days)

  // Top Pages
  const { data: topPages } = await supabase
    .from("page_views")
    .select("path")
    .gte("created_at", pastDate.toISOString())

  const pageCounts: Record<string, number> = {}
  topPages?.forEach(p => {
    pageCounts[p.path] = (pageCounts[p.path] || 0) + 1
  })

  const sortedPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, view_count]) => ({ path, view_count }))

  // Device Breakdown
  const { data: devices } = await supabase
    .from("page_views")
    .select("device_type")
    .gte("created_at", pastDate.toISOString())

  const deviceCounts: Record<string, number> = {}
  devices?.forEach(d => {
    deviceCounts[d.device_type] = (deviceCounts[d.device_type] || 0) + 1
  })

  return {
    topPages: sortedPages,
    deviceBreakdown: Object.entries(deviceCounts).map(([name, value]) => ({ name, value })),
    totalViews: topPages?.length || 0
  }
}
