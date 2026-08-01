'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/age-calculator', label: 'Age Calculator', icon: '🧮' },
  { href: '/job-quota-tracker', label: 'Job Quota', icon: '💼' },
  { href: '/birthday-countdown', label: 'Birthday', icon: '🎂' },
  { href: '/date-difference', label: 'Date Diff', icon: '📅' },
  { href: '/about', label: 'About', icon: 'ℹ️' },
  { href: '/contact', label: 'Contact', icon: '📧' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-teal-500/10 bg-[#0A1628]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="VHIR Tech Home">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/20 transition-shadow group-hover:shadow-teal-500/40">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-white">
              VHIR <span className="text-teal-400">Tech</span>
            </span>
            <span className="text-[9px] tracking-widest text-slate-500 uppercase">Age Calculator BD</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:bg-slate-700/40 hover:text-teal-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white lg:hidden"
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

      {/* Mobile Nav */}
      <div className={`overflow-hidden border-t border-slate-700/30 bg-[#0A1628] transition-all duration-300 lg:hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="grid grid-cols-2 gap-1 px-3 py-2" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700/40 hover:text-teal-400"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
