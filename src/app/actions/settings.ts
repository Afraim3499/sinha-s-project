"use server"

import { supabase } from "@/lib/supabase"
import { verifySession } from "@/lib/auth"

export async function getSettings() {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true })

  if (error) {
    console.error("Error fetching settings:", error)
    return []
  }

  return data
}

export async function updateSetting(key: string, value: string) {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  // Only super_admin or admin can edit
  if (session.role !== "super_admin" && session.role !== "admin") {
    return { success: false, error: "Permission denied" }
  }

  try {
    const { error } = await supabase
      .from("site_settings")
      .update({ value, updated_at: new Date() })
      .eq("key", key)

    if (error) throw error

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "UPDATE_SETTING",
      entity_type: "setting",
      entity_id: key,
    }])

    return { success: true }
  } catch (err) {
    console.error("Error updating setting:", err)
    return { success: false, error: "Failed to update setting" }
  }
}
