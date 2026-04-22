import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales, type Locale } from '@/i18n'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

type Props = { children: React.ReactNode; params: { locale: string } }

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isPt = params.locale === 'pt'
  return {
    title: isPt
      ? 'Dra. Isadora Follak — Radiologia Oral & Imaginologia'
      : 'Dr. Isadora Follak — Oral Radiology & Dental Imaging',
    description: isPt
      ? 'Laudos de tomografia computadorizada (cone beam), perícia odontológica e assistência jurídica. Atendimento 100% remoto.'
      : 'CBCT radiology reports, forensic odontology and legal assistance. 100% remote service for dental clinics worldwide.',
    alternates: {
      canonical: `https://isadorafollak.com/${params.locale}`,
      languages: { 'pt-BR': '/pt', 'en': '/en' },
    },
    openGraph: {
      type: 'website',
      locale: isPt ? 'pt_BR' : 'en_US',
      url: `https://isadorafollak.com/${params.locale}`,
      siteName: isPt ? 'Dra. Isadora Follak' : 'Dr. Isadora Follak',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound()
  const messages = await getMessages()

  return (
    <html lang={params.locale === 'pt' ? 'pt-BR' : 'en'}>
      <body className="bg-beige font-body">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={params.locale as Locale} />
          <main>{children}</main>
          <Footer locale={params.locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
