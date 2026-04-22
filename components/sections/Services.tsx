import { getTranslations } from 'next-intl/server'

const CARDS = [
  { icon: '🦷', titleKey: 'card1Title', textKey: 'card1Text' },
  { icon: '📐', titleKey: 'card2Title', textKey: 'card2Text' },
  { icon: '⚖️', titleKey: 'card3Title', textKey: 'card3Text' },
] as const

export default async function Services() {
  const t = await getTranslations('services')
  return (
    <section id="services" className="py-24 px-[6vw] bg-white">
      <div className="mb-14">
        <p className="text-[0.68rem] font-medium tracking-[0.13em] uppercase text-green mb-2">{t('label')}</p>
        <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold text-dark leading-[1.22] whitespace-pre-line">{t('title')}</h2>
        <p className="text-[0.95rem] text-muted leading-[1.7] mt-3 max-w-[500px]">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {CARDS.map(({ icon, titleKey, textKey }) => (
          <div key={titleKey} className="bg-beige border border-transparent rounded-2xl p-8 transition-all hover:border-green/20 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(26,46,32,0.09)]">
            <div className="w-[50px] h-[50px] bg-sagel rounded-xl flex items-center justify-center text-2xl mb-5">{icon}</div>
            <h3 className="font-display text-[1.15rem] font-semibold text-dark leading-[1.3] mb-2">{t(titleKey)}</h3>
            <p className="text-[0.875rem] text-muted leading-[1.72]">{t(textKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
