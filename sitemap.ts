// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zentrix-anime
.vercel.app'

  // Core static routes
  const routes = [
    '',
    '/browse',
    '/schedule',
    '/top',
    '/seasonal',
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Note: In a full production environment, you would fetch your top 5000 
  // anime IDs from your database or AniList here and map them to `/anime/${id}`

  return [...routes]
}
