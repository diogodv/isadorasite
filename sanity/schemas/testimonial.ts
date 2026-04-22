import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    defineField({ name: 'clinic',  title: 'Nome da Clínica', type: 'string' }),
    defineField({ name: 'text',    title: 'Depoimento', type: 'text' }),
    defineField({
      name: 'locale', title: 'Idioma', type: 'string',
      options: { list: [{ title: 'Português', value: 'pt' }, { title: 'English', value: 'en' }] },
    }),
  ],
})
