import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({ name: 'whatsapp', title: 'Número WhatsApp (com código do país)', type: 'string' }),
    defineField({ name: 'email',    title: 'E-mail de contato', type: 'string' }),
    defineField({
      name: 'photo', title: 'Foto (Hero e Sobre)', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
    }),
  ],
})
