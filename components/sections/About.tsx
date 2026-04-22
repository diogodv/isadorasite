import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function About({ photoUrl }: { photoUrl?: string }) {
  const t = await getTranslations('about')
  return (
    <section id="about" className="py-24 px-[6vw] bg-beige grid grid-cols-[320px_1fr] gap-20 items-center">
      <div className="relative">
        <div className="absolute -top-[18px] -left-[18px] w-[72px] h-[72px] bg-sagel rounded-2xl z-0" />
        <div className="absolute -bottom-4 -right-4 w-[50px] h-[50px] bg-gold/10 rounded-xl z-0" />
        <div className="relative z-10 aspect-[3/4] rounded-2xl overflow-hidden">
          <Image
            src={photoUrl || '/isadora.jpg'}
            alt={t('title')}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
      <div>
        <p className="text-[0.68rem] font-medium tracking-[0.13em] uppercase text-green mb-2">{t('label')}</p>
        <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.3rem)] font-semibold text-dark leading-[1.22]">{t('title')}</h2>
        <p className="text-[1rem] text-muted leading-[1.82] mt-4">{t('text')}</p>
      </div>
    </section>
  )
}
