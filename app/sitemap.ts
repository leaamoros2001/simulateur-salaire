import { MetadataRoute } from 'next'
import { PAGES_SEO } from '@/lib/pages-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://salaire-net.fr'

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/calculer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...PAGES_SEO.map(page => ({
      url: `${base}/salaire/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}
