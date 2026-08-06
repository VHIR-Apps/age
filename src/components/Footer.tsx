'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

function LogoImage({ size }: { size: 'sm' | 'lg' }) {
  const [imgError, setImgError] = useState(false);
  const dim = size === 'lg' ? 40 : 36;
  const cls = size === 'lg' ? 'h-10 w-10' : 'h-9 w-9';

  if (imgError) {
    return (
      <div className={`flex ${cls} items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600`}>
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${cls} overflow-hidden rounded-xl`}>
      <Image
        src="/assets/logo.png"
        alt="VHIR Tech"
        width={dim}
        height={dim}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-700/30 bg-[#050B16] pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <LogoImage size="sm" />
              <span className="text-base font-bold text-white">
                VHIR <span className="text-teal-400">Tech</span>
              </span>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-slate-400">
              Smart Age Calculator BD — বাংলাদেশের সবচেয়ে নির্ভরযোগ্য বয়স ক্যালকুলেটর এবং সরকারি চাকরির বয়সসীমা ট্র্যাকার।
            </p>
            <a
              href="mailto:vhirsupport@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-xs text-teal-400 transition-colors hover:bg-teal-500/20"
            >
              📧 vhirsupport@gmail.com
            </a>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-teal-400 uppercase">টুলস</h3>
            <ul className="space-y-2">
              <li><Link href="/age-calculator" className="text-xs text-slate-400 transition-colors hover:text-white">🧮 বয়স ক্যালকুলেটর</Link></li>
              <li><Link href="/job-quota-tracker" className="text-xs text-slate-400 transition-colors hover:text-white">💼 জব কোটা ট্র্যাকার</Link></li>
              <li><Link href="/birthday-countdown" className="text-xs text-slate-400 transition-colors hover:text-white">🎂 জন্মদিন কাউন্টডাউন</Link></li>
              <li><Link href="/date-difference" className="text-xs text-slate-400 transition-colors hover:text-white">📅 তারিখ পার্থক্য</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-teal-400 uppercase">কোম্পানি</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-xs text-slate-400 transition-colors hover:text-white">ℹ️ আমাদের সম্পর্কে</Link></li>
              <li><Link href="/contact" className="text-xs text-slate-400 transition-colors hover:text-white">📧 যোগাযোগ</Link></li>
              <li><Link href="/privacy" className="text-xs text-slate-400 transition-colors hover:text-white">🔒 গোপনীয়তা নীতি</Link></li>
              <li><Link href="/terms" className="text-xs text-slate-400 transition-colors hover:text-white">📜 সেবার শর্ত</Link></li>
              <li><Link href="/disclaimer" className="text-xs text-slate-400 transition-colors hover:text-white">⚠️ দায়মুক্তি</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-teal-400 uppercase">রিসোর্স</h3>
            <ul className="space-y-2">
              <li><a href="/sitemap.xml" className="text-xs text-slate-400 transition-colors hover:text-white">🗺️ Sitemap</a></li>
              <li><a href="/robots.txt" className="text-xs text-slate-400 transition-colors hover:text-white">🤖 Robots.txt</a></li>
              <li><a href="#faq" className="text-xs text-slate-400 transition-colors hover:text-white">❓ FAQ</a></li>
              <li>
                <a
                  href="https://vhirtech.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 transition-colors hover:text-white"
                >
                  🌐 vhirtech.shop
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-700/30 pt-6 sm:flex-row">
          <p className="text-[11px] text-slate-500">
            © {currentYear} VHIR Tech. সর্বস্বত্ব সংরক্ষিত। ❤️ বাংলাদেশ থেকে তৈরি।
          </p>
          <p className="text-[11px] text-slate-500">Age Calculator BD — VHIR Tech</p>
        </div>
      </div>
    </footer>
  );
}
