import { sanityClient } from './sanity.client'
import type { SiteSettings, Testimonial } from './types'

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  whatsapp, email,
  photo { asset->{ url }, alt }
}`

const TESTIMONIALS_QUERY = `*[_type == "testimonial" && locale == $locale]{
  _id, clinic, text, locale
}`

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(SETTINGS_QUERY)
}

export async function getTestimonials(locale: string): Promise<Testimonial[]> {
  return sanityClient.fetch(TESTIMONIALS_QUERY, { locale })
}
