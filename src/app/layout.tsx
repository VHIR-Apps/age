import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import './globals.css';

const BASE_URL = 'https://age.vhirtech.shop';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1628',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Age Calculator BD - Smart Online Tool | VHIR Tech',
    template: '%s | Age Calculator BD - VHIR Tech',
  },
  description:
    'Calculate your exact age in years, months, days, hours, minutes & seconds. Track BD government job quota eligibility (30+ categories). Birthday countdown, date difference calculator, and fascinating life facts. Free, fast, accurate. সঠিক বয়স গণনা করুন।',
  keywords: [
    'age calculator', 'age calculator bd', 'bangladesh age calculator', 'bd job age limit',
    'government job age limit bangladesh', 'বয়স ক্যালকুলেটর', 'বয়স গণনা', 'সরকারি চাকরি বয়সসীমা',
    'bcs age limit', 'age calculator online', 'exact age calculator', 'birthday countdown',
    'next birthday calculator', 'age in seconds', 'bd quota tracker', 'vhir tech',
    'smart age calculator', 'job quota tracker bd', 'date difference calculator',
    'birthday countdown bd', 'ntrca age limit', 'bank job age limit bd',
    'army age limit bangladesh', 'police age limit bd', 'age calculator bangla',
  ],
  authors: [{ name: 'VHIR Tech', url: 'https://vhirtech.shop' }],
  creator: 'VHIR Tech',
  publisher: 'VHIR Tech',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: BASE_URL,
    siteName: 'Age Calculator BD - VHIR Tech',
    title: 'Age Calculator BD - Smart Online Tool | VHIR Tech',
    description:
      'Calculate your exact age in years, months, days, hours, minutes & seconds. Track BD government job quota eligibility (30+ categories). Free, fast, and accurate.',
    images: [{ url: `${BASE_URL}/assets/og-image.png`, width: 1200, height: 630, alt: 'Age Calculator BD - Smart Online Tool by VHIR Tech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator BD - Smart Online Tool | VHIR Tech',
    description:
      'Calculate your exact age in years, months, days, hours & seconds. Track BD government job quota eligibility.',
    images: [`${BASE_URL}/assets/og-image.png`],
  },
  icons: {
    icon: '/assets/favicon.ico',
    apple: '/assets/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[#0A1628] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
