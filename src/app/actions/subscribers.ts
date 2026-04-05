"use server"

import { supabase } from "@/lib/supabase"
import { verifySession } from "@/lib/auth"

export async function getSubscribers(page = 1) {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  const from = (page - 1) * 20
  const to = from + 19

  const { data, count, error } = await supabase
    .from("subscribers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("Error fetching subscribers:", error)
    return { data: [], count: 0 }
  }

  return { data, count: count || 0 }
}

export async function toggleSubscriberStatus(id: string, currentStatus: string) {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  const newStatus = currentStatus === "active" ? "unsubscribed" : "active"

  try {
    const { error } = await supabase
      .from("subscribers")
      .update({ status: newStatus })
      .eq("id", id)

    if (error) throw error

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "TOGGLE_SUBSCRIBER",
      entity_type: "subscriber",
      entity_id: id,
      details: { new_status: newStatus }
    }])

    return { success: true }
  } catch (err) {
    console.error("Error toggling subscriber:", err)
    return { success: false }
  }
}
