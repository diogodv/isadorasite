import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://isadorafollak.com'
  return [
    { url: `${base}/pt`, lastModified: new Date(), alternates: { languages: { 'pt-BR': `${base}/pt`, en: `${base}/en` } } },
    { url: `${base}/en`, lastModified: new Date(), alternates: { languages: { 'pt-BR': `${base}/pt`, en: `${base}/en` } } },
  ]
}
