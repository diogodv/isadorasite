import { getTranslations } from 'next-intl/server'

export default async function Contact({ whatsapp, email }: { whatsapp: string; email: string }) {
  const t = await getTranslations('contact')
  return (
    <section id="contact" className="py-24 px-[6vw] bg-green text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(26,46,32,0.4)_0%,transparent_65%)] pointer-events-none" />
      <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold text-beige leading-[1.22] mb-3 relative">{t('title')}</h2>
      <p className="text-[1rem] text-beige/70 leading-[1.7] mb-10 relative">{t('subtitle')}</p>
      <div className="flex gap-4 justify-center flex-wrap relative">
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-green text-[0.9rem] font-semibold px-7 py-[14px] rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,46,32,0.18)] transition-all">
          {t('whatsapp')}
        </a>
        <a href={`mailto:${email}`}
          className="inline-flex items-center gap-2 border border-beige/38 text-beige text-[0.9rem] px-7 py-[13px] rounded-full hover:border-beige/80 hover:-translate-y-0.5 transition-all">
          {t('email')}
        </a>
      </div>
    </section>
  )
}
