# Isadora Follak Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (PT-BR / EN) Next.js website for Dra. Isadora Follak to attract dental radiology clinics nationally and internationally, converting visits into WhatsApp contact requests.

**Architecture:** Next.js 14 App Router with a `[locale]` dynamic segment handling PT-BR (`/pt`) and EN (`/en`) routes. All translatable strings live in `messages/pt.json` and `messages/en.json` (next-intl). Dynamic content editable without code (photos, WhatsApp number, email, testimonials) is served from Sanity v3 CMS. The site is statically generated (SSG) and deployed to Vercel for free.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, next-intl, Sanity v3, Resend, Vercel

**Design reference:** `docs/preview/site-pt.html` and `docs/preview/site-en.html`
**Spec reference:** `docs/superpowers/specs/2026-04-21-isadora-follak-site-design.md`

---

## File Structure

```
isalaudos/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale shell: Navbar + Footer + next-intl provider
│   │   └── page.tsx            # Home: assembles all section components
│   ├── globals.css             # Tailwind directives + CSS custom properties
│   └── layout.tsx              # Root HTML <html lang> shell
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── WhyIsadora.tsx
│       ├── HowItWorks.tsx      # EN-only section
│       ├── About.tsx
│       ├── Testimonials.tsx    # Placeholder until reviews exist
│       └── Contact.tsx
├── lib/
│   ├── sanity.client.ts        # Sanity client (read-only, public token)
│   ├── sanity.queries.ts       # GROQ queries for site content
│   └── types.ts                # Shared TypeScript interfaces
├── messages/
│   ├── pt.json                 # All PT-BR translatable strings
│   └── en.json                 # All EN translatable strings
├── public/
│   └── isadora.jpg             # Hero photo (copy from Downloads)
├── sanity/
│   ├── schemas/
│   │   ├── index.ts            # Schema registry
│   │   ├── siteSettings.ts     # WhatsApp, email, photo
│   │   └── testimonial.ts      # Testimonial documents
│   └── sanity.config.ts        # Sanity Studio config
├── i18n.ts                     # next-intl locale config
├── middleware.ts               # Locale detection + redirect
├── next.config.ts              # Security headers + next-intl plugin
└── tailwind.config.ts          # Custom colors + fonts
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json` (via CLI)
- Create: `tailwind.config.ts`
- Create: `tsconfig.json` (via CLI)
- Create: `app/globals.css`

- [ ] **Step 1: Bootstrap Next.js project**

```bash
cd "C:/Users/diogo/OneDrive/One Drive (diogodv@hotmail.com)/Diogo Vargas/Inteligência Artificial/isalaudos"
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, accept all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl @sanity/client @sanity/image-url sanity resend
npm install -D @types/node
```

- [ ] **Step 3: Configure Tailwind custom theme**

Replace `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark:  '#1a2e20',
        green: '#2d6a4f',
        gold:  '#7a5c2e',
        beige: '#f7f5f2',
        beige2:'#ede9e0',
        sage:  '#a8d5b5',
        sagel: '#e8f0eb',
        muted: '#647a6c',
      },
      fontFamily: {
        display: ['"Cormorant Garant"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Set up globals.css**

Replace `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

:root {
  --dark:  #1a2e20;
  --green: #2d6a4f;
  --gold:  #7a5c2e;
  --beige: #f7f5f2;
  --sage:  #a8d5b5;
  --sagel: #e8f0eb;
  --muted: #647a6c;
}

html { scroll-behavior: smooth; }
body { -webkit-font-smoothing: antialiased; background: var(--beige); }
```

- [ ] **Step 5: Copy hero photo to public folder**

```bash
cp "C:/Users/diogo/Downloads/Foto Isadora.png" public/isadora.jpg
```

- [ ] **Step 6: Verify project runs**

```bash
npm run dev
```

Expected: site opens at `http://localhost:3000` with default Next.js page. No errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind and dependencies"
```

---

## Task 2: next-intl Routing

**Files:**
- Create: `i18n.ts`
- Create: `middleware.ts`
- Create: `app/[locale]/` folder structure

- [ ] **Step 1: Create `i18n.ts`**

```ts
// i18n.ts
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const locales = ['pt', 'en'] as const
export type Locale = typeof locales[number]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound()
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
```

- [ ] **Step 2: Create `middleware.ts`**

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
}
```

- [ ] **Step 3: Create `messages/pt.json`**

```json
{
  "nav": {
    "brand": "Dra. Isadora Follak",
    "services": "Serviços",
    "about": "Sobre",
    "contact": "Contato",
    "lang": "EN"
  },
  "hero": {
    "tag": "Radiologia Oral & Imaginologia · Perícia Odontológica · Assistência Jurídica",
    "line1": "Laudos de tomografia computadorizada,",
    "line2": "serviços de perícia odontológica e",
    "line3": "assistência jurídica.",
    "bullet1": "Especialista em radiologia oral com atuação em laudos de tomografia computadorizada (cone beam), perícia odontológica e assistência técnica judicial e extrajudicial.",
    "bullet2": "Atendimento 100% remoto para clínicas no Brasil e no exterior.",
    "badge1": "🦷 Laudos de TC",
    "badge2": "⚖️ Perícia Odontológica",
    "badge3": "📋 Assistência Jurídica",
    "cta": "💬 Entrar em contato via WhatsApp",
    "photoAlt": "Dra. Isadora Follak",
    "cardRole": "Especialista em Radiologia Oral"
  },
  "services": {
    "label": "Serviços",
    "title": "O que posso fazer\npela sua clínica",
    "subtitle": "Laudos radiológicos e pareceres técnicos com rigor científico e agilidade",
    "card1Title": "Laudos de Tomografia Computadorizada",
    "card1Text": "Tomografia cone beam para implantes, cirurgias e diagnósticos complexos. Avaliação 3D e reconstruções multiplanares.",
    "card2Title": "Medidas para Planejamento de Implantes",
    "card2Text": "Análise criteriosa do volume ósseo, adjacências anatômicas e posicionamento ideal dos implantes.",
    "card3Title": "Perícia Odontológica e Assistência Jurídica",
    "card3Text": "Laudos e pareceres técnicos, assistência técnica judicial e extrajudicial, em demandas que envolvam a odontologia."
  },
  "why": {
    "label": "Diferenciais",
    "title": "Por que a Dra. Isadora?",
    "item1Title": "Doutora em Odontologia",
    "item1Text": "Formação acadêmica de alto nível",
    "item2Title": "Professora Universitária",
    "item2Text": "Atualização científica constante",
    "item3Title": "100% Remoto",
    "item3Text": "Laudos para qualquer clínica do Brasil e do exterior",
    "item4Title": "Entrega ágil",
    "item4Text": "Laudos podendo ser entregues em até 24–48h úteis"
  },
  "about": {
    "label": "Sobre",
    "title": "Dra. Isadora Follak",
    "text": "Especialista em Radiologia Oral e Imaginologia, Doutora em Odontologia e Professora Universitária. Atua com laudos de tomografia cone beam, com foco em diagnósticos precisos que apoiam decisões clínicas com segurança. Prestação de serviços de perícia odontológica e assistência jurídica."
  },
  "testimonials": {
    "placeholder": "Depoimentos de clínicas parceiras serão adicionados em breve."
  },
  "contact": {
    "title": "Vamos conversar?",
    "subtitle": "Entre em contato e descubra como podemos firmar uma parceria",
    "whatsapp": "💬 WhatsApp",
    "email": "✉️ E-mail"
  },
  "footer": {
    "copy": "© 2026 Dra. Isadora Follak"
  }
}
```

- [ ] **Step 4: Create `messages/en.json`**

```json
{
  "nav": {
    "brand": "Dr. Isadora Follak",
    "services": "Services",
    "howItWorks": "How it works",
    "about": "About",
    "contact": "Contact",
    "lang": "PT"
  },
  "hero": {
    "tag": "Oral Radiology & Dental Imaging · Forensic Odontology · Legal Assistance",
    "line1": "CBCT radiology reports,",
    "line2": "forensic odontology services and",
    "line3": "legal assistance.",
    "bullet1": "Oral radiology specialist providing cone beam CT reports, forensic odontology and judicial/extrajudicial technical assistance.",
    "bullet2": "100% remote service for dental clinics in Brazil and worldwide.",
    "badge1": "🦷 CBCT Reports",
    "badge2": "⚖️ Forensic Odontology",
    "badge3": "📋 Legal Assistance",
    "cta": "💬 Contact via WhatsApp",
    "photoAlt": "Dr. Isadora Follak",
    "cardRole": "Oral Radiology Specialist · PhD"
  },
  "services": {
    "label": "Services",
    "title": "What I can do\nfor your clinic",
    "subtitle": "Radiological reports and expert opinions with scientific rigor and efficiency",
    "card1Title": "CBCT Radiology Reports",
    "card1Text": "Cone beam CT for implant planning, surgeries and complex diagnoses. 3D assessment and multiplanar reconstructions.",
    "card2Title": "Measures for Implant Planning",
    "card2Text": "Careful analysis of bone volume, anatomical structures and ideal implant positioning.",
    "card3Title": "Forensic Odontology & Legal Assistance",
    "card3Text": "Expert reports and technical opinions, judicial and extrajudicial assistance in dental-related legal cases."
  },
  "why": {
    "label": "Why choose her",
    "title": "Why Dr. Isadora?",
    "item1Title": "PhD in Dentistry",
    "item1Text": "High-level academic background",
    "item2Title": "University Professor",
    "item2Text": "Constantly updated with the latest research",
    "item3Title": "100% Remote",
    "item3Text": "Reports for clinics in Brazil and worldwide",
    "item4Title": "Fast delivery",
    "item4Text": "Reports delivered in up to 24–48 business hours"
  },
  "howItWorks": {
    "label": "Process",
    "title": "How it works",
    "subtitle": "Simple remote workflow — no need to be in Brazil",
    "step1Title": "Send your files",
    "step1Text": "Upload your CBCT images via secure link. We accept all major DICOM formats.",
    "step2Title": "Expert analysis",
    "step2Text": "Dr. Isadora reviews the scan and prepares a detailed diagnostic report in English.",
    "step3Title": "Receive your report",
    "step3Text": "Full PDF report delivered in up to 24–48 business hours."
  },
  "about": {
    "label": "About",
    "title": "Dr. Isadora Follak",
    "text": "Specialist in Oral Radiology and Dental Imaging, PhD in Dentistry and University Professor. She provides cone beam CT reports with a focus on precise diagnoses that support clinical decisions with confidence. She also offers forensic odontology services and legal assistance."
  },
  "testimonials": {
    "placeholder": "Testimonials from partner clinics will be added soon."
  },
  "contact": {
    "title": "Let's work together?",
    "subtitle": "Get in touch and find out how we can partner up",
    "whatsapp": "💬 Contact via WhatsApp",
    "email": "✉️ Send an e-mail"
  },
  "footer": {
    "copy": "© 2026 Dr. Isadora Follak"
  }
}
```

- [ ] **Step 5: Verify middleware works**

```bash
npm run dev
```

Access `http://localhost:3000` — should redirect to `http://localhost:3000/pt`. No errors in console.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add next-intl routing with PT-BR and EN locales"
```

---

## Task 3: Security Headers + next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace `next.config.ts`**

```ts
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://cdn.sanity.io",
      "connect-src 'self' https://*.sanity.io",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 2: Verify build compiles**

```bash
npm run build
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: add security headers and next-intl plugin to next.config"
```

---

## Task 4: TypeScript Types + Sanity Setup

**Files:**
- Create: `lib/types.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `sanity/schemas/testimonial.ts`
- Create: `sanity/schemas/index.ts`
- Create: `sanity/sanity.config.ts`
- Create: `lib/sanity.client.ts`
- Create: `lib/sanity.queries.ts`
- Create: `.env.local`

- [ ] **Step 1: Create Sanity project**

Go to https://sanity.io, create a free account, then create a new project called `isadora-follak-site`. Note the **Project ID**.

- [ ] **Step 2: Create `.env.local`**

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token_here   # Create in sanity.io > API > Tokens (Viewer role)

WHATSAPP_NUMBER=55XXXXXXXXXXX           # Replace with Isadora's number (country code + DDD + number)
CONTACT_EMAIL=contato@isadorafollak.com
```

- [ ] **Step 3: Create `lib/types.ts`**

```ts
export interface SiteSettings {
  whatsapp: string
  email: string
  photo: {
    asset: { url: string }
    alt: string
  }
}

export interface Testimonial {
  _id: string
  clinic: string
  text: string
  locale: 'pt' | 'en'
}
```

- [ ] **Step 4: Create `sanity/schemas/siteSettings.ts`**

```ts
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
  __experimental_actions: ['update', 'publish'],
})
```

- [ ] **Step 5: Create `sanity/schemas/testimonial.ts`**

```ts
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
```

- [ ] **Step 6: Create `sanity/schemas/index.ts`**

```ts
import { siteSettings } from './siteSettings'
import { testimonial }  from './testimonial'

export const schemaTypes = [siteSettings, testimonial]
```

- [ ] **Step 7: Create `sanity/sanity.config.ts`**

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'isadora-follak',
  title: 'Site Isadora Follak',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 8: Create `lib/sanity.client.ts`**

```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   'production',
  apiVersion: '2024-01-01',
  useCdn:    true,
})
```

- [ ] **Step 9: Create `lib/sanity.queries.ts`**

```ts
import { sanityClient } from './sanity.client'
import type { SiteSettings, Testimonial } from './types'

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  whatsapp, email,
  photo { asset->{ url }, alt }
}`

const TESTIMONIALS_QUERY = `*[_type == "testimonial" && locale == $locale]{
  _id, clinic, text, locale
}`

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(SETTINGS_QUERY)
}

export async function getTestimonials(locale: string): Promise<Testimonial[]> {
  return sanityClient.fetch(TESTIMONIALS_QUERY, { locale })
}
```

- [ ] **Step 10: Add `.env.local` to `.gitignore`**

```bash
echo ".env.local" >> .gitignore
```

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add Sanity schemas, client, and GROQ queries"
```

---

## Task 5: Root Layouts

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://isadorafollak.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

- [ ] **Step 2: Create `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales, type Locale } from '@/i18n'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

type Props = { children: React.ReactNode; params: { locale: string } }

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isPt = params.locale === 'pt'
  return {
    title: isPt
      ? 'Dra. Isadora Follak — Radiologia Oral & Imaginologia'
      : 'Dr. Isadora Follak — Oral Radiology & Dental Imaging',
    description: isPt
      ? 'Laudos de tomografia computadorizada (cone beam), perícia odontológica e assistência jurídica. Atendimento 100% remoto.'
      : 'CBCT radiology reports, forensic odontology and legal assistance. 100% remote service for dental clinics worldwide.',
    alternates: {
      canonical: `https://isadorafollak.com/${params.locale}`,
      languages: { 'pt-BR': '/pt', 'en': '/en' },
    },
    openGraph: {
      type: 'website',
      locale: isPt ? 'pt_BR' : 'en_US',
      url: `https://isadorafollak.com/${params.locale}`,
      siteName: isPt ? 'Dra. Isadora Follak' : 'Dr. Isadora Follak',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound()
  const messages = await getMessages()

  return (
    <html lang={params.locale === 'pt' ? 'pt-BR' : 'en'}>
      <body className="bg-beige font-body">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={params.locale as Locale} />
          <main>{children}</main>
          <Footer locale={params.locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/
git commit -m "feat: add root layout and locale layout with metadata"
```

---

## Task 6: Navbar + Footer Components

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n'

export default function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const other = locale === 'pt' ? 'en' : 'pt'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] px-[6vw] flex items-center justify-between transition-all duration-300 ${
      scrolled ? 'bg-beige/88 backdrop-blur-md shadow-[0_1px_0_rgba(26,46,32,0.09)]' : ''
    }`}>
      <Link href={`/${locale}`} className="font-display text-xl font-semibold text-dark tracking-tight">
        {t('brand')}
      </Link>
      <div className="flex items-center gap-9">
        <Link href={`/${locale}#services`} className="text-sm text-muted hover:text-dark transition-colors">
          {t('services')}
        </Link>
        {locale === 'en' && (
          <Link href="/en#how" className="text-sm text-muted hover:text-dark transition-colors">
            {t('howItWorks')}
          </Link>
        )}
        <Link href={`/${locale}#about`} className="text-sm text-muted hover:text-dark transition-colors">
          {t('about')}
        </Link>
        <Link href={`/${locale}#contact`} className="text-sm text-muted hover:text-dark transition-colors">
          {t('contact')}
        </Link>
        <Link
          href={`/${other}`}
          className="bg-dark text-beige text-xs font-medium tracking-widest px-4 py-[7px] rounded-full hover:bg-green transition-colors"
        >
          {t('lang')}
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create `components/layout/Footer.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify navbar renders**

```bash
npm run dev
```

Access `http://localhost:3000/pt` — Navbar should appear with correct links. No console errors.

- [ ] **Step 4: Commit**

```bash
git add components/
git commit -m "feat: add Navbar and Footer components"
```

---

## Task 7: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { Locale } from '@/i18n'

export default async function Hero({ locale, whatsapp }: { locale: Locale; whatsapp: string }) {
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 8: Services, WhyIsadora, HowItWorks

**Files:**
- Create: `components/sections/Services.tsx`
- Create: `components/sections/WhyIsadora.tsx`
- Create: `components/sections/HowItWorks.tsx`

- [ ] **Step 1: Create `components/sections/Services.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/sections/WhyIsadora.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `components/sections/HowItWorks.tsx`** (EN only)

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/
git commit -m "feat: add Services, WhyIsadora and HowItWorks section components"
```

---

## Task 9: About, Testimonials, Contact

**Files:**
- Create: `components/sections/About.tsx`
- Create: `components/sections/Testimonials.tsx`
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/sections/Testimonials.tsx`**

```tsx
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
            <p className="text-[0.95rem] text-muted leading-[1.7] italic mb-4">"{item.text}"</p>
            <cite className="text-[0.8rem] font-semibold text-dark not-italic">{item.clinic}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/sections/Contact.tsx`**

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/
git commit -m "feat: add About, Testimonials and Contact section components"
```

---

## Task 10: Page Assembly + Sitemap

**Files:**
- Create: `app/[locale]/page.tsx`
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create `app/[locale]/page.tsx`**

```tsx
import Hero         from '@/components/sections/Hero'
import Services     from '@/components/sections/Services'
import WhyIsadora   from '@/components/sections/WhyIsadora'
import HowItWorks   from '@/components/sections/HowItWorks'
import About        from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Contact      from '@/components/sections/Contact'
import { getSiteSettings, getTestimonials } from '@/lib/sanity.queries'
import type { Locale } from '@/i18n'

type Props = { params: { locale: string } }

export default async function HomePage({ params }: Props) {
  const locale = params.locale as Locale
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getTestimonials(locale),
  ])

  const whatsapp = settings?.whatsapp ?? process.env.WHATSAPP_NUMBER ?? '55XXXXXXXXXXX'
  const email    = settings?.email    ?? process.env.CONTACT_EMAIL    ?? 'contato@isadorafollak.com'
  const photoUrl = settings?.photo?.asset?.url

  return (
    <>
      <Hero        locale={locale} whatsapp={whatsapp} />
      <Services    />
      <WhyIsadora  />
      {locale === 'en' && <HowItWorks />}
      <About       photoUrl={photoUrl} />
      <Testimonials items={testimonials} />
      <Contact     whatsapp={whatsapp} email={email} />
    </>
  )
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://isadorafollak.com'
  return [
    { url: `${base}/pt`, lastModified: new Date(), alternates: { languages: { 'pt-BR': `${base}/pt`, en: `${base}/en` } } },
    { url: `${base}/en`, lastModified: new Date(), alternates: { languages: { 'pt-BR': `${base}/pt`, en: `${base}/en` } } },
  ]
}
```

- [ ] **Step 3: Full build test**

```bash
npm run build
```

Expected: build completes with no errors. All routes generated.

- [ ] **Step 4: Smoke test in dev**

```bash
npm run dev
```

- Open `http://localhost:3000/pt` — PT-BR version renders completely
- Open `http://localhost:3000/en` — EN version renders with "How it works" section
- Click EN/PT toggle — navigates to other locale
- WhatsApp button has correct `href`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble home page and add sitemap"
```

---

## Task 11: Vercel Deployment

- [ ] **Step 1: Create GitHub repository**

Go to github.com → New repository → name: `isalaudos` → private → Create.

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/isalaudos.git
git push -u origin main
```

- [ ] **Step 3: Connect to Vercel**

1. Go to vercel.com → New Project
2. Import the `isalaudos` GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variables (from `.env.local`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `WHATSAPP_NUMBER`
   - `CONTACT_EMAIL`
5. Click **Deploy**

- [ ] **Step 4: Configure custom domain**

1. In Vercel → Project → Settings → Domains
2. Add `isadorafollak.com`
3. Vercel shows DNS records to configure at your registrar
4. At your domain registrar (Namecheap / GoDaddy):
   - Add A record: `@` → Vercel IP
   - Add CNAME record: `www` → `cname.vercel-dns.com`
5. Wait DNS propagation (~10–60 min)

- [ ] **Step 5: Verify production**

- Open `https://isadorafollak.com` → redirects to `/pt` ✓
- Open `https://isadorafollak.com/en` → EN version ✓
- Check HTTPS lock in browser ✓
- Run `curl -I https://isadorafollak.com/pt` and verify `x-frame-options: SAMEORIGIN` header ✓

- [ ] **Step 6: Add Sanity CORS origin**

In sanity.io → Project → API → CORS Origins → Add `https://isadorafollak.com`

---

## Task 12: Sanity Studio — Populate Initial Content

- [ ] **Step 1: Launch Sanity Studio locally**

```bash
npx sanity dev --project-dir ./sanity
```

Studio opens at `http://localhost:3333`.

- [ ] **Step 2: Create Site Settings document**

1. Open Studio → "Configurações do Site"
2. Fill in:
   - WhatsApp: `55XXXXXXXXXXX` (Isadora's number)
   - E-mail: `contato@isadorafollak.com`
   - Photo: upload `Foto Isadora.png`
3. Click Publish

- [ ] **Step 3: Deploy Studio to Sanity cloud**

```bash
npx sanity deploy --project-dir ./sanity
```

Studio name: `isadora-follak` → deployed at `https://isadora-follak.sanity.studio`

Share this URL with Isadora so she can edit content independently.

---

## Self-Review Against Spec

| Spec Requirement | Covered in Task |
|---|---|
| Next.js 14 App Router | Task 1 |
| PT-BR `/pt` + EN `/en` routing | Task 2 |
| Security headers | Task 3 |
| Sanity CMS + schemas | Task 4 |
| Navbar with lang toggle | Task 6 |
| Hero: tricolor title, badges, WhatsApp CTA | Task 7 |
| Services: 3 cards | Task 8 |
| WhyIsadora: 4 differentials | Task 8 |
| HowItWorks: EN only | Task 8 |
| About: photo + text | Task 9 |
| Testimonials placeholder | Task 9 |
| Contact: WhatsApp + email | Task 9 |
| Footer | Task 6 |
| hreflang + metadata per locale | Task 5 |
| sitemap.xml | Task 10 |
| Vercel deployment | Task 11 |
| Sanity Studio deployed + photo editable | Task 12 |
| WhatsApp + email editable via Sanity | Tasks 4, 9 |
| Photo editable via Sanity | Tasks 4, 9 |
| `isadorafollak.com` domain | Task 11 |
