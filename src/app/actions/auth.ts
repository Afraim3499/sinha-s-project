"use server"

import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { createSession, clearSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." }
  }

  try {
    // 1. Fetch user by email
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email.trim().toLowerCase())
      .single()

    if (error || !user) {
      return { success: false, error: "Invalid credentials." }
    }

    // 2. Verify password with bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return { success: false, error: "Invalid credentials." }
    }

    // 3. Update last login
    await supabase.from("admin_users").update({ last_login: new Date() }).eq("id", user.id)

    // 4. Log the action
    await supabase.from("activity_log").insert([{
      admin_email: user.email,
      action: "LOGIN",
      entity_type: "auth",
      details: { role: user.role }
    }])

    // 5. Create session cookie
    await createSession({
      sub: user.id,
      email: user.email,
      name: user.name || "Admin",
      role: user.role,
    })

    return { success: true }
  } catch (err) {
    console.error("Login error:", err)
    return { success: false, error: "An unexpected server error occurred." }
  }
}

export async function logoutAdmin() {
  await clearSession()
  redirect("/admin/login")
}
