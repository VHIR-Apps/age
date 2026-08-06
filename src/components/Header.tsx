'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: '🏠', iconBn: 'হোম' },
  { href: '/age-calculator', label: 'Age Calculator', icon: '🧮', iconBn: 'বয়স' },
  { href: '/job-quota-tracker', label: 'Job Quota', icon: '💼', iconBn: 'চাকরি' },
  { href: '/birthday-countdown', label: 'Birthday', icon: '🎂', iconBn: 'জন্মদিন' },
  { href: '/date-difference', label: 'Date Diff', icon: '📅', iconBn: 'তারিখ' },
  { href: '/about', label: 'About', icon: 'ℹ️', iconBn: 'সম্পর্কে' },
  { href: '/contact', label: 'Contact', icon: '📧', iconBn: 'যোগাযোগ' },
];

const BOTTOM_NAV = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/age-calculator', label: 'বয়স', icon: '🧮' },
  { href: '/job-quota-tracker', label: 'চাকরি', icon: '💼' },
  { href: '/birthday-countdown', label: 'জন্মদিন', icon: '🎂' },
  { href: '/date-difference', label: 'তারিখ', icon: '📅' },
];

function LogoImg() {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/20">
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg shadow-teal-500/20">
      <Image
        src="/assets/logo.png"
        alt="VHIR Tech Logo"
        width={40}
        height={40}
        className="h-full w-full object-cover"
        priority
        onError={() => setErr(true)}
      />
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ===== TOP HEADER ===== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-teal-500/10 bg-[#0A1628]/98 shadow-lg shadow-black/20'
            : 'bg-[#0A1628]/95'
        } backdrop-blur-xl`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="VHIR Tech Home">
            <LogoImg />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-white">
                VHIR <span className="text-teal-400">Tech</span>
              </span>
              <span className="text-[9px] tracking-widest text-slate-500 uppercase">
                Age Calculator BD
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-teal-500/15 text-teal-400'
                    : 'text-slate-400 hover:bg-slate-700/40 hover:text-teal-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-800/50 p-2.5 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`overflow-hidden border-t border-slate-700/30 bg-[#050B16]/98 transition-all duration-300 lg:hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="grid grid-cols-2 gap-1.5 p-3" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  pathname === link.href
                    ? 'bg-teal-500/15 text-teal-400'
                    : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/40 hover:text-teal-400'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <div>
                  <div className="text-xs font-medium">{link.label}</div>
                  <div className="text-[9px] text-slate-500">{link.iconBn}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== BOTTOM NAV — Mobile App Style ===== */}
      <nav
        className="bottom-nav lg:hidden"
        aria-label="Bottom navigation"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {BOTTOM_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 flex-col items-center gap-0.5 py-1"
                aria-label={item.label}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                    isActive ? 'bg-teal-500/20 scale-110' : 'hover:bg-slate-700/40'
                  }`}
                >
                  <span className="text-xl leading-none">{item.icon}</span>
                </div>
                <span
                  className={`text-[9px] font-medium leading-none ${
                    isActive ? 'text-teal-400' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="h-0.5 w-4 rounded-full bg-teal-400" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
