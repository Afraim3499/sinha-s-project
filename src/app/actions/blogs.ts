"use server"

import { supabase } from "@/lib/supabase"
import { verifySession, hasRole } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getAdminPosts(page = 1) {
  const session = await verifySession()
  if (!session || !hasRole(session.role, ['super_admin', 'admin', 'editor'])) throw new Error("Unauthorized")

  const from = (page - 1) * 20
  const to = from + 19

  const { data, count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("Error fetching admin posts:", error)
    return { data: [], count: 0 }
  }

  return { data, count: count || 0 }
}

export async function getAdminPost(id: string) {
  const session = await verifySession()
  if (!session || !hasRole(session.role, ['super_admin', 'admin', 'editor'])) throw new Error("Unauthorized")

  // For "new", return empty defaults
  if (id === "new") {
    return {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "General",
      published: false,
      hero_image: "",
      reading_time: "",
      meta_title: "",
      meta_description: ""
    }
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

type SavePostData = {
  title: string
  slug?: string
  excerpt: string
  category: string
  content: string
  hero_image?: string | null
  reading_time?: string | null
  meta_title?: string | null
  meta_description?: string | null
  published: boolean
  date?: string
}

export async function savePost(id: string, postData: SavePostData) {
  const session = await verifySession()
  if (!session || !hasRole(session.role, ['super_admin', 'admin', 'editor'])) throw new Error("Unauthorized")

  // Enforce slug uniqueness and formatting
  const cleanSlug = (postData.slug || postData.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const payload = {
    title: postData.title,
    slug: cleanSlug,
    excerpt: postData.excerpt,
    category: postData.category,
    content: postData.content,
    hero_image: postData.hero_image || null,
    reading_time: postData.reading_time || null,
    meta_title: postData.meta_title || null,
    meta_description: postData.meta_description || null,
    published: postData.published,
    date: postData.date ? new Date(postData.date).toISOString() : new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  try {
    let resultId = id;
    if (id === "new") {
      const { data, error } = await supabase.from("posts").insert([payload]).select().single()
      if (error) throw error
      resultId = data.id

      await supabase.from("activity_log").insert([{
        admin_email: session.email,
        action: "CREATE_POST",
        entity_type: "posts",
        entity_id: resultId
      }])
    } else {
      const { error } = await supabase.from("posts").update(payload).eq("id", id)
      if (error) throw error

      await supabase.from("activity_log").insert([{
        admin_email: session.email,
        action: "UPDATE_POST",
        entity_type: "posts",
        entity_id: id
      }])
    }

    revalidatePath("/insights")
    revalidatePath(`/insights/${cleanSlug}`)
    revalidatePath("/admin/blogs")
    
    return { success: true, id: resultId }
  } catch (err: unknown) {
    console.error("Save post error:", err)
    if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === '23505') return { success: false, error: "A post with this slug already exists." }
    return { success: false, error: "Database error." }
  }
}

export async function deletePost(id: string) {
  const session = await verifySession()
  if (!session || !hasRole(session.role, ['super_admin', 'admin', 'editor'])) throw new Error("Unauthorized")

  try {
    const { error } = await supabase.from("posts").delete().eq("id", id)
    if (error) throw error

    await supabase.from("activity_log").insert([{
      admin_email: session.email,
      action: "DELETE_POST",
      entity_type: "posts",
      entity_id: id
    }])

    revalidatePath("/admin/blogs")
    revalidatePath("/insights")
    return { success: true }
  } catch {
    return { success: false, error: "Failed to delete post." }
  }
}
