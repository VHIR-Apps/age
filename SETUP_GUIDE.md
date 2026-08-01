# 🚀 VHIR Tech — Age Calculator BD: Complete Setup & Connection Guide

## 📁 Complete Project Structure

```
├── public/
│   └── assets/
│       ├── README.md              ← Asset instructions
│       ├── logo.png               ← ⬅️ ADD: Your VHIR Tech logo (512x512 PNG)
│       ├── favicon.ico            ← ⬅️ ADD: Browser favicon (32x32)
│       ├── apple-touch-icon.png   ← ⬅️ ADD: Apple icon (180x180)
│       └── og-image.png           ← ⬅️ ADD: Social share image (1200x630)
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← Root layout with full SEO metadata
│   │   ├── page.tsx               ← Home page with all sections
│   │   ├── globals.css            ← Paper texture, animations, glass effects
│   │   ├── sitemap.ts             ← Auto-generated sitemap.xml (10 pages)
│   │   ├── robots.ts              ← Auto-generated robots.txt
│   │   ├── age-calculator/
│   │   │   └── page.tsx           ← Dedicated Age Calculator page
│   │   ├── job-quota-tracker/
│   │   │   └── page.tsx           ← Dedicated Job Quota Tracker (30+ categories)
│   │   ├── birthday-countdown/
│   │   │   └── page.tsx           ← Dedicated Birthday Countdown page
│   │   ├── date-difference/
│   │   │   └── page.tsx           ← Date Difference Calculator page
│   │   ├── about/
│   │   │   └── page.tsx           ← About VHIR Tech page
│   │   ├── contact/
│   │   │   └── page.tsx           ← Contact page (vhirsupport@gmail.com)
│   │   ├── privacy/
│   │   │   └── page.tsx           ← Privacy Policy page
│   │   ├── terms/
│   │   │   └── page.tsx           ← Terms of Service page
│   │   ├── disclaimer/
│   │   │   └── page.tsx           ← Disclaimer page
│   │   └── api/health/
│   │       └── route.ts           ← Health check endpoint
│   ├── components/
│   │   ├── Header.tsx             ← VHIR Tech branded header (all pages)
│   │   ├── Footer.tsx             ← Footer with all links & email
│   │   ├── AgeCalculator.tsx      ← Core calculator (age, job quota, facts)
│   │   ├── FAQSection.tsx         ← FAQ accordion (12 questions)
│   │   ├── AdSlot.tsx             ← Pre-allocated ad slots (zero CLS)
│   │   └── JsonLd.tsx             ← JSON-LD Schema markup (3 schemas)
│   └── lib/
│       ├── calculator.ts          ← Core logic (30+ job categories, date diff)
│       ├── facts.ts               ← 25+ fascinating facts generator
│       └── seo-data.ts            ← FAQ data + JSON-LD schemas
├── next.config.ts                 ← Performance & security headers
├── SETUP_GUIDE.md                 ← This file
└── .env
```

---

## 📄 All Pages (10 Pages + Sitemap + Robots.txt)

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Main page with calculator, tools, features, job info table, FAQ |
| Age Calculator | `/age-calculator` | Dedicated age calculator with full features |
| Job Quota Tracker | `/job-quota-tracker` | 30+ BD job categories with age limits |
| Birthday Countdown | `/birthday-countdown` | Live countdown with birthday facts |
| Date Difference | `/date-difference` | Calculate difference between two dates |
| About | `/about` | About VHIR Tech |
| Contact | `/contact` | Contact with email vhirsupport@gmail.com |
| Privacy Policy | `/privacy` | Full privacy policy |
| Terms of Service | `/terms` | Terms and conditions |
| Disclaimer | `/disclaimer` | Disclaimer and legal notices |
| Sitemap | `/sitemap.xml` | Auto-generated (10 pages) |
| Robots.txt | `/robots.txt` | Auto-generated |

---

## 🔗 How to Connect Everything

### 1. 🖼️ Logo Connection
Place your logo at `public/assets/logo.png`, then in `src/components/Header.tsx`:
```tsx
import Image from 'next/image';
// Replace the SVG with:
<Image src="/assets/logo.png" alt="VHIR Tech" width={40} height={40} className="rounded-lg" priority />
```

### 2. 📄 Favicon & Icons
Place files in `public/assets/` — already linked in `src/app/layout.tsx`:
- `favicon.ico` (32x32)
- `apple-touch-icon.png` (180x180)
- `og-image.png` (1200x630)

### 3. 📢 Google AdSense
Add to `<head>` in `src/app/layout.tsx`:
```tsx
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" />
```

### 4. 🌐 Google Search Console
1. Add property: `age.vhirtech.shop`
2. Verify with DNS TXT or meta tag
3. Submit sitemap: `https://age.vhirtech.shop/sitemap.xml`

### 5. 📊 Google Analytics
Add to `.env`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
Create `src/components/Analytics.tsx` and add to layout.

### 6. 🏗️ Custom Domain (age.vhirtech.shop)
Add CNAME record: `age.vhirtech.shop → CNAME → your-hosting-provider`
Update `BASE_URL` in: `layout.tsx`, `sitemap.ts`, `robots.ts`, `seo-data.ts`

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#0A1628` | Background, cards |
| Navy 800 | `#0F1D32` | Card backgrounds |
| Navy 700 | `#1B2D4F` | Borders, accents |
| Teal Accent | `#2DD4BF` | Primary buttons, highlights |
| Teal Deep | `#14B8A6` | Gradients |
| Amber | `#F59E0B` | Birthday countdown |
| White | `#F8FAFC` | Primary text |

---

## 💼 30+ BD Job Categories Covered

- Government Administration (General, Freedom Fighter, Women, District, Disabled, Ethnic)
- BCS (General, Freedom Fighter, Health)
- Banking (Govt Bank, Specialized Bank)
- Education (NTRCA, Govt Teacher, University)
- Defense (Army, Navy, Air Force, BGB, Coast Guard)
- Law Enforcement (Police, RAB, Ansar, Fire Service)
- Health (Doctor, Nurse)
- Infrastructure (Railways, WASA, PDB, Gas)
- Local Government (City Corp, Municipality, Union)
- Special (Diplomat, Customs, Tax, Audit, Statistics)

---

## ✅ SEO Checklist

- [x] Dynamic Title & Description per page
- [x] Canonical URLs per page
- [x] Open Graph (OG) tags
- [x] Twitter Card tags
- [x] JSON-LD SoftwareApplication schema
- [x] JSON-LD FAQPage schema
- [x] JSON-LD Organization schema
- [x] Semantic HTML5
- [x] Auto-generated sitemap.xml (10 pages)
- [x] Auto-generated robots.txt
- [x] Pre-allocated ad slots (zero CLS)
- [x] Mobile responsive (100%)
- [x] Bilingual content (English + বাংলা)
- [x] ARIA labels for accessibility
- [x] Security headers
- [x] Image optimization (AVIF/WebP)
- [x] 25+ fascinating facts
- [x] 30+ job quota categories
- [x] Contact email (vhirsupport@gmail.com)
- [x] Legal pages (Privacy, Terms, Disclaimer)
- [ ] Add real logo to /public/assets/
- [ ] Add real favicon
- [ ] Add OG image
- [ ] Connect Google AdSense
- [ ] Connect Google Analytics
- [ ] Submit to Google Search Console
