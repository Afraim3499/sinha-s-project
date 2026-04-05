"use server"

import { supabase } from "@/lib/supabase"

export async function subscribeToInsights(formData: FormData) {
  const email = formData.get("email") as string

  if (!email?.trim() || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." }
  }

  try {
    // Check for duplicate
    const { data: existing } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (existing) {
      return { success: true, message: "You're already subscribed to our insights." }
    }

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email: email.trim().toLowerCase() }])

    if (error) {
      console.error("Supabase subscriber insert error:", error)
      return { success: false, error: "Unable to subscribe at this time. Please try again." }
    }

    return { success: true, message: "Welcome. You'll receive our latest sourcing insights." }
  } catch (err) {
    console.error("Subscription error:", err)
    return { success: false, error: "An unexpected error occurred." }
  }
}
