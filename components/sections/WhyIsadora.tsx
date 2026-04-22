import { getTranslations } from 'next-intl/server'

const ITEMS = [
  { titleKey: 'item1Title', textKey: 'item1Text' },
  { titleKey: 'item2Title', textKey: 'item2Text' },
  { titleKey: 'item3Title', textKey: 'item3Text' },
  { titleKey: 'item4Title', textKey: 'item4Text' },
] as const

export default async function WhyIsadora() {
  const t = await getTranslations('why')
  return (
    <section className="py-24 px-[6vw] bg-dark relative overflow-hidden">
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(45,106,79,0.28)_0%,transparent_70%)] pointer-events-none" />
      <p className="text-[0.68rem] font-medium tracking-[0.13em] uppercase text-sage mb-2">{t('label')}</p>
      <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold text-beige leading-[1.22] mb-12">{t('title')}</h2>
      <div className="grid grid-cols-2 gap-8">
        {ITEMS.map(({ titleKey, textKey }) => (
          <div key={titleKey} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-[34px] h-[34px] bg-sage/10 border border-sage/25 rounded-lg flex items-center justify-center text-sage text-sm mt-0.5">✓</div>
            <div>
              <div className="font-display text-[1.1rem] font-semibold text-beige mb-1">{t(titleKey)}</div>
              <div className="text-[0.85rem] text-sage leading-[1.6]">{t(textKey)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
