'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n'

export default function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const other = locale === 'pt' ? 'en' : 'pt'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] px-[6vw] flex items-center justify-between transition-all duration-300 ${
      scrolled ? 'bg-beige/88 backdrop-blur-md shadow-[0_1px_0_rgba(26,46,32,0.09)]' : ''
    }`}>
      <Link href={`/${locale}`} className="font-display text-xl font-semibold text-dark tracking-tight">
        {t('brand')}
      </Link>
      <div className="flex items-center gap-9">
        <Link href={`/${locale}#services`} className="text-sm text-muted hover:text-dark transition-colors">
          {t('services')}
        </Link>
        {locale === 'en' && (
          <Link href="/en#how" className="text-sm text-muted hover:text-dark transition-colors">
            {t('howItWorks')}
          </Link>
        )}
        <Link href={`/${locale}#about`} className="text-sm text-muted hover:text-dark transition-colors">
          {t('about')}
        </Link>
        <Link href={`/${locale}#contact`} className="text-sm text-muted hover:text-dark transition-colors">
          {t('contact')}
        </Link>
        <Link
          href={`/${other}`}
          className="bg-dark text-beige text-xs font-medium tracking-widest px-4 py-[7px] rounded-full hover:bg-green transition-colors"
        >
          {t('lang')}
        </Link>
      </div>
    </nav>
  )
}
