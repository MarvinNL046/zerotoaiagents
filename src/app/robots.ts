import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    host: 'https://zerotoaiagents.com',
    sitemap: 'https://zerotoaiagents.com/sitemap.xml',
  }
}
