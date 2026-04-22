# Design Spec — Site Isadora Follak

**Data:** 2026-04-21
**Escopo:** Site bilíngue (PT-BR / EN) para captação de clínicas de radiologia odontológica nacionais e internacionais.

---

## 1. Contexto e Objetivo

A Dra. Isadora Follak é Especialista em Radiologia Oral e Imaginologia, Doutora em Odontologia e Professora Universitária. Atua com laudos de tomografia computadorizada cone beam (TCFC), perícia odontológica e assistência técnica judicial e extrajudicial.

**Objetivo do site:** ser encontrada por clínicas de radiologia odontológica via SEO (PT e EN) e converter visitas em solicitações de parceria via WhatsApp.

**Público-alvo:**
- Primário: clínicas de radiologia odontológica no Brasil
- Secundário: clínicas do exterior interessadas em laudos remotos em inglês

---

## 2. Identidade Visual

| Elemento | Valor |
|---|---|
| Direção | Humano & Acessível — proximidade, parceria, confiança |
| Cor primária | `#1a2e20` (verde escuro) |
| Cor de destaque | `#2d6a4f` (verde médio) |
| Cor terciária | `#7a5c2e` (marrom/dourado) |
| Background | `#f7f5f2` (bege claro) |
| Tipografia | Sans-serif (corpo) |
| Foto | Headshot profissional existente (jaleco branco, fundo neutro) |

**Destaque tricolor no hero (títulos dos 3 serviços):**
- Verde escuro → Laudos de tomografia computadorizada
- Verde → Serviços de perícia odontológica
- Marrom/dourado → Assistência jurídica

---

## 3. Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Estilização | Tailwind CSS |
| CMS | Sanity v3 |
| Internacionalização | next-intl |
| Hospedagem | Vercel (gratuito) |
| E-mail/formulário | Resend (gratuito até 3k emails/mês) |
| Domínio | `isadorafollak.com` |

**Painel CMS:** `isadorafollak.sanity.studio` — acessível pela Isadora e pelo mantenedor para edição de textos e imagens sem código.

**Segurança:**
- HTTPS automático via Vercel
- Headers de segurança: `X-Frame-Options`, `Content-Security-Policy`, `X-Content-Type-Options`
- Sem banco de dados exposto — site estático gerado por SSG
- DNSSEC configurado no registrador de domínio

---

## 4. Estrutura de Rotas

```
isadorafollak.com/     → redireciona para /pt ou /en (detecta idioma do navegador)
isadorafollak.com/pt   → versão em português brasileiro
isadorafollak.com/en   → versão em inglês (adaptada para clínicas internacionais)
```

Botão de troca de idioma fixo no canto superior direito da navbar, mantém a rota atual ao trocar.

**SEO bilíngue:**
- `hreflang` configurado para PT-BR e EN
- Metadata separada por idioma (title, description, Open Graph)
- `sitemap.xml` gerado automaticamente com todas as rotas

---

## 5. Seções — Versão PT-BR (`/pt`)

### Navbar
- Logo/nome: **Dra. Isadora Follak**
- Links: Serviços · Sobre · Contato
- Botão idioma: **EN**

### Hero
- Tag: `Radiologia Oral & Imaginologia | Perícia Odontológica | Assistência Jurídica`
- Título tricolor:
  - `Laudos de tomografia computadorizada,` (verde escuro)
  - `serviços de perícia odontológica e` (verde)
  - `assistência jurídica.` (marrom/dourado)
- Bullets:
  - Especialista em radiologia oral com atuação em laudos de tomografia computadorizada (cone beam), perícia odontológica e assistência técnica judicial e extrajudicial.
  - Atendimento 100% remoto para clínicas no Brasil e no exterior.
- Tags de serviços: 🦷 Laudos de TC · ⚖️ Perícia Odontológica · 📋 Assistência Jurídica
- CTA: `💬 Entrar em contato via WhatsApp`
- Foto: headshot profissional (lado direito)

### Serviços
- Subtítulo: *Laudos radiológicos e pareceres técnicos com rigor científico e agilidade*
- 3 cards:
  1. **Laudos de Tomografia Computadorizada** — Tomografia cone beam para implantes, cirurgias e diagnósticos complexos. Avaliação 3D e reconstruções multiplanares.
  2. **Planejamento de Implantes** — Análise criteriosa do volume ósseo, adjacências anatômicas e posicionamento ideal dos implantes.
  3. **Perícia Odontológica e Assistência Jurídica** — Laudos e pareceres técnicos, assistência técnica judicial e extrajudicial, em demandas que envolvam a odontologia.

### Por que a Dra. Isadora?
Fundo verde escuro. 4 diferenciais em grid 2×2:
- Doutora em Odontologia — Formação acadêmica de alto nível
- Professora Universitária — Atualização científica constante
- 100% Remoto — Laudos para qualquer clínica do Brasil e do exterior
- Entrega ágil — Laudos podendo ser entregues em até 24–48h úteis

### Sobre
- Foto (miniatura) + texto: *Especialista em Radiologia Oral e Imaginologia, Doutora em Odontologia e Professora Universitária. Atua com laudos de tomografia cone beam, com foco em diagnósticos precisos que apoiam decisões clínicas com segurança. Prestação de serviços de perícia odontológica e assistência jurídica.*

### Depoimentos
Placeholder — seção será ativada assim que a Isadora tiver avaliações de clínicas parceiras.

### Contato
- Headline: *Vamos conversar?*
- Subtítulo: *Entre em contato e descubra como podemos firmar uma parceria*
- Botões: `💬 WhatsApp` · `✉️ E-mail`

### Footer
`© 2026 Dra. Isadora Follak` · `isadorafollak.com`

---

## 6. Seções — Versão EN (`/en`)

Mesma estrutura da versão PT com as seguintes diferenças:

### Navbar
- Links: Services · About · **How it works** · Contact
- Botão idioma: **PT**

### Hero
- Tag: `Oral Radiology & Dental Imaging | Forensic Odontology | Legal Assistance`
- Título tricolor:
  - `CBCT radiology reports,` (verde escuro)
  - `forensic odontology services and` (verde)
  - `legal assistance.` (marrom/dourado)
- Bullets:
  - Oral radiology specialist providing cone beam CT reports, forensic odontology and judicial/extrajudicial technical assistance.
  - 100% remote service for dental clinics in Brazil and worldwide.
- Tags: 🦷 CBCT Reports · ⚖️ Forensic Odontology · 📋 Legal Assistance
- CTA: `💬 Contact via WhatsApp`

### Seção exclusiva: How it works
Processo remoto em 3 passos — pensada para clínicas estrangeiras:
1. **Send your files** — Upload CBCT images via secure link. All major DICOM formats accepted.
2. **Expert analysis** — Dr. Isadora reviews the scan and prepares a detailed report in English.
3. **Receive your report** — Full PDF report delivered in up to 24–48 business hours.

### Services
- CBCT Radiology Reports
- Implant Planning
- Forensic Odontology & Legal Assistance

### Why Dr. Isadora?
- PhD in Dentistry
- University Professor
- 100% Remote — Reports for clinics in Brazil and worldwide
- Fast delivery — Reports in up to 24–48 business hours

### About
Dr. Isadora Follak — PhD, Oral Radiology Specialist, University Professor. CBCT reports + forensic odontology + legal assistance.

### Contact
- Headline: *Let's work together?*
- Botões: `💬 Contact via WhatsApp` · `✉️ Send an e-mail`

### Footer
`© 2026 Dr. Isadora Follak` · `isadorafollak.com`

---

## 7. CMS — O que é editável pelo Sanity

| Campo | Editável |
|---|---|
| Textos de todas as seções (PT e EN) | Sim |
| Foto do hero e da seção Sobre | Sim |
| Número de WhatsApp | Sim |
| E-mail de contato | Sim |
| Depoimentos | Sim (adicionar/remover) |
| Cores e layout | Não (requer código) |

---

## 8. SEO — Palavras-chave Alvo

**PT-BR:**
- laudo tomografia cone beam
- laudo TCFC odontológico
- radiologia oral laudos remotos
- perícia odontológica judicial
- planejamento implantes tomografia

**EN:**
- CBCT dental report remote
- cone beam CT radiology report
- dental forensic expert report
- oral radiology specialist remote
- implant planning CBCT report

---

## 9. Fora do Escopo deste Spec

- Automação de conteúdo para Instagram (spec separado)
- Automação do fluxo de laudos (spec separado)
- Regularização jurídica / CNPJ (orientação externa)
- Ensaio fotográfico adicional (ação futura da Isadora)
