import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About VHIR Tech - Smart Age Calculator BD',
  description: 'Learn about VHIR Tech, the team behind Age Calculator BD — the most accurate online age calculator and BD government job quota tracking tool for Bangladesh.',
  alternates: { canonical: 'https://age.vhirtech.shop/about' },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">
                About VHIR Tech
              </h1>
              <p className="text-sm text-slate-400">VHIR Tech সম্পর্কে জানুন</p>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <article className="prose prose-invert max-w-none">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-xl shadow-teal-500/20">
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                    </svg>
                  </div>
                </div>

                <h2 className="mb-4 text-center text-xl font-bold text-white">Who We Are</h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">
                  <strong className="text-teal-400">VHIR Tech</strong> is a technology company based in Bangladesh, dedicated to building smart, user-friendly online tools that simplify everyday calculations and provide valuable insights. Our name, VHIR, represents our commitment to innovation and excellence in technology.
                </p>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">
                  We built the <strong className="text-teal-400">Age Calculator BD</strong> tool to help millions of Bangladeshis easily calculate their exact age and track their eligibility for government job quotas. Our tool covers 30+ job categories including BCS, banking, defense, education, health, and more — making it the most comprehensive age calculator for Bangladesh.
                </p>

                <h2 className="mb-4 text-xl font-bold text-white">Our Mission</h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">
                  Our mission is to provide free, accurate, and lightning-fast online tools that empower people with the information they need. We believe that everyone deserves access to simple, reliable tools without hidden costs or data collection. That is why all our calculations happen locally in your browser — your privacy is our priority.
                </p>

                <h2 className="mb-4 text-xl font-bold text-white">What Makes Us Different</h2>
                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: '🎯', title: 'Accuracy First', desc: 'Every calculation is precise down to the second — no approximations.' },
                    { icon: '🔒', title: 'Privacy Focused', desc: 'All calculations happen locally. No data is ever sent to any server.' },
                    { icon: '⚡', title: 'Blazing Fast', desc: 'Optimized for 100/100 Lighthouse score with instant results.' },
                    { icon: '🌐', title: 'Bilingual', desc: 'Full English and Bangla (বাংলা) support throughout.' },
                    { icon: '📱', title: 'Mobile First', desc: 'Designed for mobile-first experience with responsive design.' },
                    { icon: '💎', title: 'Premium Design', desc: 'Beautiful, modern interface with smooth animations.' },
                  ].map((item) => (
                    <div key={item.title} className="stat-card rounded-xl p-4">
                      <div className="mb-2 text-lg">{item.icon}</div>
                      <h3 className="mb-1 text-sm font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h2 className="mb-4 text-xl font-bold text-white">Our Tools</h2>
                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { href: '/age-calculator', icon: '🧮', title: 'Age Calculator', desc: 'Calculate exact age with birth details and 25+ fascinating facts.' },
                    { href: '/job-quota-tracker', icon: '💼', title: 'Job Quota Tracker', desc: 'Track eligibility for 30+ BD government job categories.' },
                    { href: '/birthday-countdown', icon: '🎂', title: 'Birthday Countdown', desc: 'Live countdown to your next birthday with progress bar.' },
                    { href: '/date-difference', icon: '📅', title: 'Date Difference', desc: 'Calculate the exact difference between any two dates.' },
                  ].map((tool) => (
                    <Link key={tool.href} href={tool.href} className="stat-card flex items-start gap-3 rounded-xl p-4 transition-all hover:scale-[1.01]">
                      <div className="text-2xl">{tool.icon}</div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{tool.title}</h3>
                        <p className="text-xs text-slate-400">{tool.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <h2 className="mb-4 text-xl font-bold text-white">Contact Us</h2>
                  <p className="mb-4 text-sm text-slate-400">
                    Have questions, suggestions, or feedback? We would love to hear from you!
                  </p>
                  <a href="mailto:vhirsupport@gmail.com" className="btn-neon inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white">
                    📧 vhirsupport@gmail.com
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
