"use server"

import { supabase } from "@/lib/supabase"
import { verifySession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data
}

export async function adminGetTestimonials() {
  const session = await verifySession()
  if (!session) throw new Error("Unauthorized")

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin testimonials:", error)
    return []
  }

  return data
}

export async function addTestimonial(formData: FormData) {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized" }

  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const content = formData.get("content") as string
  const role = formData.get("role") as string
  const urlInput = formData.get("image_url") as string
  const imageFile = formData.get("image_file") as File
  
  let finalImageUrl = urlInput

  // Handle file upload if provided
  if (imageFile && imageFile.size > 0) {
    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { data, error: uploadError } = await supabase.storage
        .from('testimonials')
        .upload(filePath, imageFile)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('testimonials')
        .getPublicUrl(filePath)
        
      finalImageUrl = publicUrl
    } catch (err) {
      console.error("Upload error:", err)
      return { success: false, error: "Failed to upload image. Please ensure 'testimonials' bucket exists and is public." }
    }
  }

  if (!name || !content) {
    return { success: false, error: "Missing required fields." }
  }

  try {
    const { error } = await supabase.from("testimonials").insert([{
      name,
      company,
      content,
      role,
      image_url: finalImageUrl,
      is_active: true
    }])

    if (error) throw error

    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (err) {
    console.error("Error adding testimonial:", err)
    return { success: false, error: "Database error." }
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized" }

  const name = formData.get("name") as string
  const company = formData.get("company") as string
  const content = formData.get("content") as string
  const role = formData.get("role") as string
  const image_url = formData.get("image_url") as string
  const is_active = formData.get("is_active") === "on"

  try {
    const { error } = await supabase.from("testimonials").update({
      name,
      company,
      content,
      role,
      image_url,
      is_active
    }).eq("id", id)

    if (error) throw error

    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (err) {
    console.error("Error updating testimonial:", err)
    return { success: false, error: "Database error." }
  }
}

export async function deleteTestimonial(id: string) {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized" }

  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (err) {
    console.error("Error deleting testimonial:", err)
    return { success: false, error: "Database error." }
  }
}

export async function toggleTestimonialActive(id: string, currentState: boolean) {
  const session = await verifySession()
  if (!session) return { success: false, error: "Unauthorized" }

  try {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !currentState })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (err) {
    console.error("Error toggling testimonial status:", err)
    return { success: false, error: "Database error." }
  }
}
