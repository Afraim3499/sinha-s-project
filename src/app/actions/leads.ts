"use server"

import { supabase } from "@/lib/supabase"
import { verifySession } from "@/lib/auth"

export async function getLeads(page = 1, statusFilter?: string) {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  // Pagination (15 per page)
  const from = (page - 1) * 15
  const to = from + 14

  query = query.range(from, to)

  const { data, count, error } = await query

  if (error) {
    console.error("Error fetching leads:", error)
    return { data: [], count: 0 }
  }

  return { data, count: count || 0 }
}

export async function updateLeadStatus(id: string, newStatus: string) {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus, updated_at: new Date() })
      .eq("id", id)

    if (error) throw error

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "UPDATE_STATUS",
      entity_type: "lead",
      entity_id: id,
      details: { new_status: newStatus }
    }])

    return { success: true }
  } catch (err) {
    console.error("Error updating status:", err)
    return { success: false, error: "Failed to update status" }
  }
}

export async function updateLeadNotes(id: string, notes: string) {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  try {
    const { error } = await supabase
      .from("leads")
      .update({ notes, updated_at: new Date() })
      .eq("id", id)

    if (error) throw error

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "UPDATE_NOTES",
      entity_type: "lead",
      entity_id: id,
    }])

    return { success: true }
  } catch (err) {
    console.error("Error updating notes:", err)
    return { success: false, error: "Failed to save notes" }
  }
}
