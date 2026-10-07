import { supabase } from "@/lib/supabase"
import { unstable_cache } from "next/cache"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

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

const EXCLUDED_SLUGS = [
  'ultimate-guide-bangladesh-vs-vietnam',
  'calculating-landed-costs-comparison',
  'comparing-regional-lead-times'
]

function getLocalPostsFallback(): BlogPost[] {
  try {
    const postsDir = path.join(process.cwd(), "src", "content", "blog")
    if (!fs.existsSync(postsDir)) return []
    const filenames = fs.readdirSync(postsDir)
    return filenames
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "")
        const fullPath = path.join(postsDir, file)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)
        const words = content ? content.trim().split(/\s+/).length : 0
        const computedReadingTime = Math.ceil(words / 200) + " min read"

        return {
          id: slug,
          slug,
          title: data.title || slug,
          date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
          excerpt: data.excerpt || "",
          hero_image: data.heroImage || "/hero-pd.webp",
          heroImage: data.heroImage || "/hero-pd.webp",
          category: data.category || "General",
          reading_time: data.readingTime || computedReadingTime,
          readingTime: data.readingTime || computedReadingTime,
          content,
          meta_title: data.metaTitle || data.title || slug,
          metaTitle: data.metaTitle || data.title || slug,
          meta_description: data.metaDescription || data.excerpt || "",
          metaDescription: data.metaDescription || data.excerpt || "",
          published: true,
          tags: Array.isArray(data.tags) ? data.tags : [],
        } as BlogPost
      })
      .filter((post) => !EXCLUDED_SLUGS.includes(post.slug))
      .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0))
  } catch (err) {
    console.error("Local markdown fallback error:", err)
    return []
  }
}

function getLocalPostFallback(slug: string): BlogPost | null {
  if (EXCLUDED_SLUGS.includes(slug)) return null
  try {
    const postsDir = path.join(process.cwd(), "src", "content", "blog")
    const fullPath = path.join(postsDir, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    const words = content ? content.trim().split(/\s+/).length : 0
    const computedReadingTime = Math.ceil(words / 200) + " min read"

    return {
      id: slug,
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      excerpt: data.excerpt || "",
      hero_image: data.heroImage || "/hero-pd.webp",
      heroImage: data.heroImage || "/hero-pd.webp",
      category: data.category || "General",
      reading_time: data.readingTime || computedReadingTime,
      readingTime: data.readingTime || computedReadingTime,
      content,
      meta_title: data.metaTitle || data.title || slug,
      metaTitle: data.metaTitle || data.title || slug,
      meta_description: data.metaDescription || data.excerpt || "",
      metaDescription: data.metaDescription || data.excerpt || "",
      published: true,
      tags: Array.isArray(data.tags) ? data.tags : [],
    } as BlogPost
  } catch {
    return null
  }
}

export const getSortedPostsData = unstable_cache(async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, slug, title, date, excerpt, hero_image, category, reading_time, published, tags, meta_title, meta_description")
      .eq("published", true)
      .order("date", { ascending: false })

    if (error || !data || data.length === 0) {
      if (error) console.warn("Supabase fetch notice:", error.message || error)
      return getLocalPostsFallback()
    }

    const filteredPosts = data.filter(post => !EXCLUDED_SLUGS.includes(post.slug))

    return filteredPosts.map(post => ({
      ...post,
      heroImage: post.hero_image || "/hero-pd.webp",
      readingTime: post.reading_time || "5 min read",
      metaTitle: post.meta_title || post.title,
      metaDescription: post.meta_description || post.excerpt,
    })) as BlogPost
  } catch (err) {
    console.warn("Supabase connection exception, using local fallback:", err)
    return getLocalPostsFallback()
  }
}, ['sorted-posts-v3'], { revalidate: 3600, tags: ['posts'] })

export const getPostData = unstable_cache(async (slug: string) => {
  if (EXCLUDED_SLUGS.includes(slug)) return null

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error || !data) {
      return getLocalPostFallback(slug)
    }

    const words = data.content ? data.content.trim().split(/\s+/).length : 0
    const computedReadingTime = Math.ceil(words / 200) + " min read"

    return {
      ...data,
      heroImage: data.hero_image || "/hero-pd.webp",
      readingTime: data.reading_time || computedReadingTime,
      metaTitle: data.meta_title || data.title,
      metaDescription: data.meta_description || data.excerpt,
    } as BlogPost
  } catch {
    return getLocalPostFallback(slug)
  }
}, ['post-data-v3'], { revalidate: 3600, tags: ['posts'] })

export const getAllPostSlugs = unstable_cache(async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .eq("published", true)

    if (error || !data || data.length === 0) {
      return getLocalPostsFallback().map(row => ({ slug: row.slug }))
    }

    return data
      .filter(row => !EXCLUDED_SLUGS.includes(row.slug))
      .map(row => ({
        slug: row.slug
      }))
  } catch {
    return getLocalPostsFallback().map(row => ({ slug: row.slug }))
  }
}, ['post-slugs-v3'], { revalidate: 3600, tags: ['posts'] })
