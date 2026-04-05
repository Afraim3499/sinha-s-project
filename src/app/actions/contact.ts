"use server"

import { supabase } from "@/lib/supabase"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().max(100).optional().nullable(),
  email: z.string().email("Invalid email address"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
})

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    category: formData.get("category") as string,
    message: formData.get("message") as string,
  }

  // 1. Server-side validation
  const validated = contactSchema.safeParse(rawData)
  
  if (!validated.success) {
    const error = validated.error.issues[0].message || "Invalid input data"
    return { success: false, error }
  }

  const { name, company, email, category, message } = validated.data

  try {
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          name, 
          company: company || null, 
          email: email.toLowerCase().trim(), 
          category, 
          message,
          status: 'new' // Explicitly set initial status
        }
      ])

    if (error) {
       // Detailed server-side logging for data safety audit
       console.error(`[CRITICAL] Lead Insertion Failed at ${new Date().toISOString()}:`, {
         code: error.code,
         message: error.message,
         details: error.details,
         hint: error.hint,
         lead_email: email
       })
       return { success: false, error: "Failed to submit inquiry securely. Please try again or email us directly." }
    }

    return { success: true, message: "Inquiry submitted successfully. Our team will contact you shortly." }
  } catch (err) {
    console.error("[FATAL] Unexpected error in contact processing:", err)
    return { success: false, error: "An unexpected security error occurred." }
  }
}
