export interface SiteSettings {
  whatsapp: string
  email: string
  photo: {
    asset: { url: string }
    alt: string
  }
}

export interface Testimonial {
  _id: string
  clinic: string
  text: string
  locale: 'pt' | 'en'
}
