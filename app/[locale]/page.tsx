import Hero         from '@/components/sections/Hero'
import Services     from '@/components/sections/Services'
import WhyIsadora   from '@/components/sections/WhyIsadora'
import HowItWorks   from '@/components/sections/HowItWorks'
import About        from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Contact      from '@/components/sections/Contact'
import { getSiteSettings, getTestimonials } from '@/lib/sanity.queries'
import type { Locale } from '@/i18n'

type Props = { params: { locale: string } }

export default async function HomePage({ params }: Props) {
  const locale = params.locale as Locale
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getTestimonials(locale),
  ])

  const whatsapp = settings?.whatsapp ?? process.env.WHATSAPP_NUMBER ?? '5500000000000'
  const email    = settings?.email    ?? process.env.CONTACT_EMAIL    ?? 'contato@isadorafollak.com'
  const photoUrl = settings?.photo?.asset?.url

  return (
    <>
      <Hero        locale={locale} whatsapp={whatsapp} />
      <Services    />
      <WhyIsadora  />
      {locale === 'en' && <HowItWorks />}
      <About       photoUrl={photoUrl} />
      <Testimonials items={testimonials} />
      <Contact     whatsapp={whatsapp} email={email} />
    </>
  )
}
