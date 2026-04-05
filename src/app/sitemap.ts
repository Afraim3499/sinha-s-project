import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSortedPostsData()
  const baseUrl = 'https://sinhasourcinghub.com'

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/categories',
    '/insights',
    '/faq',
    '/manifesto',
    '/process',
    '/sustainability',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Service Sub-pages
  const serviceRoutes = [
    '/services/concept-and-design',
    '/services/factory-sourcing',
    '/services/material-sourcing',
    '/services/sampling',
    '/services/quality-control',
    '/services/logistics',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 3. Dynamic Blog Posts
  const blogRoutes = posts.map((post) => {
    const postDate = new Date(post.date)
    return {
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: isNaN(postDate.getTime()) ? new Date() : postDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
