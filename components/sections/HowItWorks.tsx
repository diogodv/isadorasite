import { getTranslations } from 'next-intl/server'

const STEPS = [
  { num: '1', icon: '📁', titleKey: 'step1Title', textKey: 'step1Text' },
  { num: '2', icon: '🔬', titleKey: 'step2Title', textKey: 'step2Text' },
  { num: '3', icon: '📄', titleKey: 'step3Title', textKey: 'step3Text' },
] as const

export default async function HowItWorks() {
  const t = await getTranslations('howItWorks')
  return (
    <section id="how" className="py-24 px-[6vw] bg-beige">
      <div className="mb-14">
        <p className="text-[0.68rem] font-medium tracking-[0.13em] uppercase text-green mb-2">{t('label')}</p>
        <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold text-dark leading-[1.22]">{t('title')}</h2>
        <p className="text-[0.95rem] text-muted leading-[1.7] mt-3 max-w-[500px]">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-3 gap-10 relative">
        <div className="absolute top-7 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-[1.5px] bg-gradient-to-r from-sage via-sage/20 to-sage" />
        {STEPS.map(({ num, icon, titleKey, textKey }) => (
          <div key={num} className="text-center relative z-10">
            <div className="w-14 h-14 rounded-full bg-white border border-green/25 flex items-center justify-center mx-auto mb-5 font-display text-2xl font-semibold text-green">{num}</div>
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="font-display text-[1.1rem] font-semibold text-dark mb-2">{t(titleKey)}</h3>
            <p className="text-[0.875rem] text-muted leading-[1.7]">{t(textKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
