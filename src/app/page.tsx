import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import AgeCalculator from '@/components/AgeCalculator';
import FAQSection from '@/components/FAQSection';
import JobAgeLimitTable from '@/components/JobAgeLimitTable';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6">
        <AdSlot id="ad-top" height="90px" />
      </div>

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="py-8 sm:py-14" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-300 shadow-lg shadow-teal-500/10">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping" />
                🇧🇩 বাংলাদেশ সরকারি চাকরি ও বয়সসীমা ট্র্যাকার ২০২৫-২৬
              </div>
              <h1 id="hero-heading" className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                Age Calculator{' '}
                <span className="bg-gradient-to-r from-teal-400 via-sky-300 to-teal-200 bg-clip-text text-transparent">BD</span>
              </h1>
              <p className="mx-auto mb-2 max-w-2xl text-base text-slate-300 sm:text-lg font-medium">
                Smart Online Tool for Precise Age Calculation &amp; BD Government Job Quota Tracking
              </p>
              <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-400 leading-relaxed">
                আপনার সঠিক বয়স গণনা করুন — বছর, মাস, দিন, ঘণ্টা, মিনিট ও সেকেন্ডে। সর্বশেষ সরকারি অধ্যাদেশ (৩২ বছর) অনুযায়ী ৩০+ ক্যাটাগরিতে যোগ্যতা ট্র্যাক করুন।
              </p>
            </div>
          </div>
        </section>

        {/* ===== CALCULATOR ===== */}
        <section className="pb-8" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">Age Calculator Tool</h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <AgeCalculator />
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          <AdSlot id="ad-mid" height="90px" />
        </div>

        {/* ===== ALL TOOLS ===== */}
        <section className="py-8 sm:py-12" aria-labelledby="tools-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="tools-heading" className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
              🛠️ All Tools &amp; Calculators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: '/age-calculator', icon: '🧮', title: 'Age Calculator', titleBn: 'বয়স ক্যালকুলেটর', desc: 'Calculate your exact age in years, months, days, hours, minutes & seconds with life milestones, Islamic stats, and more.' },
                { href: '/job-quota-tracker', icon: '💼', title: 'Job Quota Tracker', titleBn: 'জব কোটা ট্র্যাকার', desc: 'Track eligibility for 30+ BD government job categories including BCS, bank, defense, police, and more.' },
                { href: '/birthday-countdown', icon: '🎂', title: 'Birthday Countdown', titleBn: 'জন্মদিন কাউন্টডাউন', desc: 'Live countdown to your next birthday with days, hours, minutes, seconds and a beautiful progress bar.' },
                { href: '/date-difference', icon: '📅', title: 'Date Difference', titleBn: 'তারিখ পার্থক্য', desc: 'Calculate the exact difference between any two dates in years, months, days, hours, and minutes.' },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="glass-card group rounded-2xl p-5 transition-all hover:scale-[1.02] hover:border-teal-500/20">
                  <div className="mb-3 text-3xl">{tool.icon}</div>
                  <h3 className="mb-1 text-lg font-bold text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                  <p className="mb-2 text-xs text-teal-400/70">{tool.titleBn}</p>
                  <p className="text-sm leading-relaxed text-slate-400">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY USE THIS TOOL ===== */}
        <section className="py-8 sm:py-12" aria-labelledby="why-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="why-heading" className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
              Why Use Our Age Calculator BD?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🎯', title: 'Pinpoint Accuracy', titleBn: 'নির্ভুল গণনা', desc: 'Calculate your exact age down to the second — no approximations, no rounding errors.' },
                { icon: '💼', title: '30+ Job Categories', titleBn: '৩০+ জব ক্যাটাগরি', desc: 'Track eligibility for all major BD government job categories including BCS, bank, defense, police, and more.' },
                { icon: '⚡', title: 'Lightning Fast', titleBn: 'বিদ্যুৎ গতি', desc: 'Results appear instantly — no page reloads, no waiting. Optimized for 100/100 Lighthouse.' },
                { icon: '📱', title: 'Mobile Responsive', titleBn: 'মোবাইল ফ্রেন্ডলি', desc: 'Perfectly optimized for all devices — mobile, tablet, and desktop.' },
                { icon: '🌐', title: 'Bilingual Support', titleBn: 'দ্বিভাষিক সাপোর্ট', desc: 'Full English and Bangla (বাংলা) support — all results in both languages.' },
                { icon: '🔒', title: 'Privacy First', titleBn: 'গোপনীয়তা প্রথম', desc: 'All calculations happen locally in your browser. No data is sent to any server.' },
              ].map((feature, index) => (
                <div key={index} className="glass-card rounded-xl p-5 transition-all hover:scale-[1.01]">
                  <div className="mb-3 text-2xl">{feature.icon}</div>
                  <h3 className="mb-1 text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mb-1 text-xs text-teal-400/70">{feature.titleBn}</p>
                  <p className="text-sm leading-relaxed text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BD JOB AGE LIMIT TABLE ===== */}
        <section className="py-8 sm:py-12" aria-labelledby="job-info-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <JobAgeLimitTable />
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-8 sm:py-12" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FAQSection />
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          <AdSlot id="ad-bottom" height="90px" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
