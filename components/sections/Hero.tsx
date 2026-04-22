import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { Locale } from '@/i18n'

export default async function Hero({ whatsapp }: { locale: Locale; whatsapp: string }) {
  const t = await getTranslations('hero')
  const waLink = `https://wa.me/${whatsapp}`

  return (
    <section className="min-h-screen pt-[116px] pb-20 px-[6vw] grid grid-cols-[1fr_400px] gap-16 items-center bg-beige relative overflow-hidden">
      {/* decorative circle */}
      <div className="absolute bottom-[-160px] right-20 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(45,106,79,0.07)_0%,transparent_68%)] pointer-events-none" />

      {/* content */}
      <div>
        <p className="inline-block text-[0.68rem] font-medium tracking-[0.13em] uppercase text-green border-b border-green/20 pb-3 mb-6">
          {t('tag')}
        </p>
        <h1 className="font-display text-[clamp(2.1rem,3.6vw,3.2rem)] font-semibold leading-[1.22] mb-7">
          <span className="block text-dark">{t('line1')}</span>
          <span className="block text-green">{t('line2')}</span>
          <span className="block text-gold italic">{t('line3')}</span>
        </h1>
        <ul className="list-none mb-7 space-y-2">
          {[t('bullet1'), t('bullet2')].map((b, i) => (
            <li key={i} className="relative pl-[18px] text-[0.95rem] text-muted leading-[1.7] before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-green">
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-9">
          {[t('badge1'), t('badge2'), t('badge3')].map((badge, i) => (
            <span key={i} className="bg-sagel text-green text-[0.8rem] font-medium px-[14px] py-[6px] rounded-full">
              {badge}
            </span>
          ))}
        </div>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green text-white text-[0.9rem] font-medium px-7 py-[14px] rounded-full hover:bg-dark transition-colors hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,46,32,0.18)]">
          {t('cta')}
        </a>
      </div>

      {/* photo */}
      <div className="flex justify-center">
        <div className="relative w-[340px] h-[420px]">
          {/* decorative border ring */}
          <div className="absolute inset-[-14px] border border-green/20 rounded-[180px_180px_28px_28px] pointer-events-none" />
          {/* bottom line accent */}
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[72px] h-[3px] bg-gradient-to-r from-transparent via-green to-transparent rounded-full" />
          <Image
            src="/isadora.jpg"
            alt={t('photoAlt')}
            fill
            className="object-cover object-top rounded-[170px_170px_22px_22px]"
            priority
          />
          {/* floating name card */}
          <div className="absolute bottom-7 left-[-28px] bg-white px-5 py-[14px] rounded-xl shadow-[0_6px_28px_rgba(26,46,32,0.13)]">
            <div className="font-display text-[1.05rem] font-semibold text-dark">{t('photoAlt')}</div>
            <div className="text-[0.72rem] text-muted mt-[3px]">{t('cardRole')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
