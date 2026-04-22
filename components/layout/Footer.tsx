import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n'

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations('footer')
  return (
    <footer className="bg-dark px-[6vw] py-7 flex justify-between items-center">
      <span className="text-xs text-beige/35">{t('copy')}</span>
      <span className="font-display text-base italic text-beige/40">isadorafollak.com</span>
    </footer>
  )
}
