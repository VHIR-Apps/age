import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-700/30 bg-[#050B16]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-teal-400 to-teal-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">VHIR <span className="text-teal-400">Tech</span></span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              Smart Age Calculator BD — Your trusted online tool for precise age calculation, BD government job quota tracking, birthday countdown, and fascinating life statistics.
            </p>
            <a href="mailto:vhirsupport@gmail.com" className="inline-flex items-center gap-2 rounded-lg bg-teal-500/10 px-3 py-1.5 text-sm text-teal-400 transition-colors hover:bg-teal-500/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              vhirsupport@gmail.com
            </a>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-teal-400 uppercase">Tools</h3>
            <ul className="space-y-2.5">
              <li><Link href="/age-calculator" className="text-sm text-slate-400 transition-colors hover:text-white">🧮 Age Calculator</Link></li>
              <li><Link href="/job-quota-tracker" className="text-sm text-slate-400 transition-colors hover:text-white">💼 Job Quota Tracker</Link></li>
              <li><Link href="/birthday-countdown" className="text-sm text-slate-400 transition-colors hover:text-white">🎂 Birthday Countdown</Link></li>
              <li><Link href="/date-difference" className="text-sm text-slate-400 transition-colors hover:text-white">📅 Date Difference</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-teal-400 uppercase">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-slate-400 transition-colors hover:text-white">ℹ️ About VHIR Tech</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-400 transition-colors hover:text-white">📧 Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-400 transition-colors hover:text-white">🔒 Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-400 transition-colors hover:text-white">📜 Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-slate-400 transition-colors hover:text-white">⚠️ Disclaimer</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-teal-400 uppercase">Resources</h3>
            <ul className="space-y-2.5">
              <li><a href="/sitemap.xml" className="text-sm text-slate-400 transition-colors hover:text-white">🗺️ Sitemap</a></li>
              <li><a href="/robots.txt" className="text-sm text-slate-400 transition-colors hover:text-white">🤖 Robots.txt</a></li>
              <li><a href="#faq" className="text-sm text-slate-400 transition-colors hover:text-white">❓ FAQ</a></li>
              <li><a href="https://vhirtech.shop" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 transition-colors hover:text-white">🌐 vhirtech.shop</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-700/30 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© {currentYear} VHIR Tech. All rights reserved. Built with ❤️ in Bangladesh.</p>
          <p className="text-xs text-slate-500">Age Calculator BD — Smart Online Tool by VHIR Tech</p>
        </div>
      </div>
    </footer>
  );
}
