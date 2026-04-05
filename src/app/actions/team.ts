"use server"

import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { verifySession, AdminRole } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getTeam() {
  const session = await verifySession()
  if (!session || session.role !== "super_admin") throw new Error("Unauthorized")

  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, name, role, last_login, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching team:", error)
    return []
  }

  return data
}

export async function addAdmin(formData: FormData) {
  const session = await verifySession()
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Only Super Admins can add team members." }
  }

  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const initialPassword = formData.get("password") as string
  const role = formData.get("role") as AdminRole

  if (!email || !initialPassword || !role) {
    return { success: false, error: "Missing required fields." }
  }

  try {
    const hash = await bcrypt.hash(initialPassword, 10)

    const { error } = await supabase.from("admin_users").insert([{
      email: email.trim().toLowerCase(),
      name: name.trim() || null,
      password_hash: hash,
      role
    }])

    if (error) {
      if (error.code === '23505') return { success: false, error: "Email already exists." }
      throw error
    }

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "ADD_TEAM_MEMBER",
      entity_type: "admin_users",
      details: { added_email: email, role }
    }])

    revalidatePath("/admin/team")
    return { success: true }
  } catch (err) {
    console.error("Error adding admin:", err)
    return { success: false, error: "Database error." }
  }
}

export async function deleteAdmin(id: string) {
  const session = await verifySession()
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Only Super Admins can remove team members." }
  }

  if (session.sub === id) {
    return { success: false, error: "You cannot delete your own account." }
  }

  try {
    const { error } = await supabase.from("admin_users").delete().eq("id", id)

    if (error) throw error

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "DELETE_TEAM_MEMBER",
      entity_type: "admin_users",
      entity_id: id
    }])

    revalidatePath("/admin/team")
    return { success: true }
  } catch (err) {
    console.error("Error deleting admin:", err)
    return { success: false, error: "Database error." }
  }
}
