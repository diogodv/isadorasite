import { getTranslations } from 'next-intl/server'
import type { Testimonial } from '@/lib/types'

export default async function Testimonials({ items }: { items: Testimonial[] }) {
  const t = await getTranslations('testimonials')
  if (items.length === 0) {
    return (
      <section className="py-12 px-[6vw] bg-white border-t border-b border-dashed border-green/15 text-center">
        <div className="text-[1.8rem] mb-3 opacity-35">💬</div>
        <p className="text-[0.875rem] text-muted italic leading-[1.7] max-w-[480px] mx-auto">{t('placeholder')}</p>
      </section>
    )
  }
  return (
    <section className="py-24 px-[6vw] bg-white">
      <div className="grid grid-cols-3 gap-6">
        {items.map(item => (
          <blockquote key={item._id} className="bg-beige rounded-2xl p-8">
            <p className="text-[0.95rem] text-muted leading-[1.7] italic mb-4">&ldquo;{item.text}&rdquo;</p>
            <cite className="text-[0.8rem] font-semibold text-dark not-italic">{item.clinic}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
