import { sanityClient, isConfigured } from './sanity.client'
import type { SiteSettings, Testimonial } from './types'

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  whatsapp, email,
  photo { asset->{ url }, alt }
}`

const TESTIMONIALS_QUERY = `*[_type == "testimonial" && locale == $locale]{
  _id, clinic, text, locale
}`

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isConfigured || !sanityClient) return null
  try {
    return await sanityClient.fetch(SETTINGS_QUERY)
  } catch {
    return null
  }
}

export async function getTestimonials(locale: string): Promise<Testimonial[]> {
  if (!isConfigured || !sanityClient) return []
  try {
    return await sanityClient.fetch(TESTIMONIALS_QUERY, { locale })
  } catch {
    return []
  }
}
