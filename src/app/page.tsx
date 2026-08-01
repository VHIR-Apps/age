import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import AgeCalculator from '@/components/AgeCalculator';
import FAQSection from '@/components/FAQSection';
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
              <div className="mb-6 flex justify-center" aria-hidden="true">
                <svg className="animate-rotate-slow h-16 w-16 text-teal-400/30 sm:h-20 sm:w-20" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.3" />
                  <line x1="85" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                </svg>
              </div>
              <h1 id="hero-heading" className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Age Calculator{' '}
                <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">BD</span>
              </h1>
              <p className="mx-auto mb-3 max-w-2xl text-base text-slate-300 sm:text-lg">
                Smart Online Tool for Precise Age Calculation &amp; BD Government Job Quota Tracking
              </p>
              <p className="mx-auto max-w-xl text-sm text-slate-400">
                আপনার সঠিক বয়স গণনা করুন — বছর, মাস, দিন, ঘণ্টা, মিনিট ও সেকেন্ডে। বাংলাদেশ সরকারি চাকরির বয়সসীমা ট্র্যাক করুন ৩০+ ক্যাটাগরিতে।
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
                { href: '/age-calculator', icon: '🧮', title: 'Age Calculator', titleBn: 'বয়স ক্যালকুলেটর', desc: 'Calculate your exact age in years, months, days, hours, minutes & seconds with birth details, zodiac, and more.' },
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
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 id="job-info-heading" className="mb-4 text-center text-xl font-bold text-white sm:text-2xl">
                📋 BD Government Job Age Limits (2025)
              </h2>
              <p className="mb-6 text-center text-sm text-slate-400">বাংলাদেশ সরকারি চাকরির বয়সসীমা — সর্বশেষ তথ্য</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/30">
                      <th className="px-3 py-2 text-left text-xs font-semibold text-teal-400 uppercase">Category</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-teal-400 uppercase">Job Type</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-teal-400 uppercase">Age Limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/20">
                    {[
                      ['Government', 'General (সাধারণ)', '30 years'],
                      ['Government', 'Freedom Fighter (মুক্তিযোদ্ধা)', '32 years'],
                      ['Government', 'Disabled (প্রতিবন্ধী)', '32 years'],
                      ['Government', 'Small Ethnic (ক্ষুদ্র নৃ-গোষ্ঠী)', '32 years'],
                      ['BCS', 'BCS General (বিসিএস)', '30 years'],
                      ['BCS', 'BCS Freedom Fighter', '32 years'],
                      ['Banking', 'Govt Bank (সরকারি ব্যাংক)', '30 years'],
                      ['Education', 'NTRCA Teacher (নিবন্ধন)', '35 years'],
                      ['Education', 'Govt Teacher (সরকারি শিক্ষক)', '30 years'],
                      ['Defense', 'Army (সেনাবাহিনী)', '25 years'],
                      ['Defense', 'Navy (নৌবাহিনী)', '25 years'],
                      ['Defense', 'Air Force (বিমানবাহিনী)', '25 years'],
                      ['Defense', 'BGB (বর্ডার গার্ড)', '25 years'],
                      ['Law Enforcement', 'Police (পুলিশ)', '30 years'],
                      ['Law Enforcement', 'RAB (র্যাব)', '30 years'],
                      ['Health', 'Doctor BCS Health', '32 years'],
                      ['Health', 'Nurse (নার্স)', '30 years'],
                      ['Infrastructure', 'Railways (রেলওয়ে)', '30 years'],
                      ['Infrastructure', 'PDB/WASA/Gas', '30 years'],
                      ['Local Govt', 'City Corp/Municipality', '30 years'],
                    ].map(([cat, job, age], i) => (
                      <tr key={i} className="hover:bg-slate-700/10">
                        <td className="px-3 py-2 text-xs text-slate-500">{cat}</td>
                        <td className="px-3 py-2 text-slate-300">{job}</td>
                        <td className="px-3 py-2 font-medium text-white">{age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-center text-xs text-slate-500">⚠️ Age limits are subject to government policy changes. Verify with official sources before applying.</p>
              <div className="mt-4 text-center">
                <Link href="/job-quota-tracker" className="btn-neon inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
                  💼 Track Your Job Quota Eligibility
                </Link>
              </div>
            </div>
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
