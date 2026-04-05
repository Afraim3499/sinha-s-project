import { supabase } from "@/lib/supabase"
import { unstable_cache } from "next/cache"

export type BlogPost = {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  hero_image: string | null
  heroImage: string
  category: string
  reading_time: string | null
  readingTime: string
  content: string
  meta_title: string | null
  metaTitle?: string
  meta_description: string | null
  metaDescription?: string
  published: boolean
  tags: string[]
}

export const getSortedPostsData = unstable_cache(async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, date, excerpt, hero_image, category, reading_time, published, tags, meta_title, meta_description")
    .eq("published", true)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  // Map to the format the frontend expects but ensure we return exactly what we need
  return data.map(post => ({
    ...post,
    heroImage: post.hero_image || "/hero-pd.webp",
    readingTime: post.reading_time || "5 min read",
    metaTitle: post.meta_title || post.title,
    metaDescription: post.meta_description || post.excerpt,
  })) as BlogPost[]
}, ['sorted-posts'], { revalidate: 3600, tags: ['posts'] })

export const getPostData = unstable_cache(async (slug: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    // .eq("published", true) // uncomment to strictly enforce
    .single()

  if (error || !data) {
    if (error && error.code !== 'PGRST116') {
      console.error(`Error fetching post ${slug}:`, error)
    }
    return null
  }

  // Calculate generic reading time if empty
  const words = data.content ? data.content.trim().split(/\s+/).length : 0
  const computedReadingTime = Math.ceil(words / 200) + " min read"

  // Clean and prepare the data for the frontend
  return {
    ...data,
    heroImage: data.hero_image || "/hero-pd.webp",
    readingTime: data.reading_time || computedReadingTime,
    metaTitle: data.meta_title || data.title,
    metaDescription: data.meta_description || data.excerpt,
  } as BlogPost
}, ['post-data'], { revalidate: 3600, tags: ['posts'] })

export const getAllPostSlugs = unstable_cache(async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true)

  if (error) {
    console.error("Error fetching slugs:", error)
    return []
  }

  return data.map(row => ({
    slug: row.slug
  }))
}, ['post-slugs'], { revalidate: 3600, tags: ['posts'] })
