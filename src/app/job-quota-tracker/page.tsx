import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import AgeCalculator from '@/components/AgeCalculator';

export const metadata: Metadata = {
  title: 'BD Job Quota Tracker - Government Job Age Limit Calculator',
  description: 'Track your eligibility for 30+ BD government job categories. Check age limits for BCS, bank jobs, teacher registration, defense forces, police, and more. Precise countdown to your age limit deadline. সরকারি চাকরির বয়সসীমা ট্র্যাকার।',
  alternates: { canonical: 'https://age.vhirtech.shop/job-quota-tracker' },
};

export default function JobQuotaTrackerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6"><AdSlot id="ad-jq-top" height="90px" /></div>
      <main className="flex-1">
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl">
                💼 BD Government Job Quota Tracker
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-400">
                Track your eligibility for 30+ BD government job categories including BCS, bank, defense forces, police, education, health, and more. Get precise countdown to your age limit deadline.
              </p>
              <p className="mx-auto mt-1 max-w-xl text-xs text-slate-500">
                বাংলাদেশ সরকারি চাকরির বয়সসীমা ট্র্যাকার — বিসিএস, ব্যাংক, প্রতিরক্ষা বাহিনী, পুলিশ, শিক্ষা, স্বাস্থ্য সহ ৩০+ ক্যাটাগরিতে আপনার যোগ্যতা চেক করুন।
              </p>
            </div>
            <AgeCalculator />
          </div>
        </section>

        {/* Detailed Job Categories */}
        <section className="py-8 sm:py-12" aria-labelledby="job-detail-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 id="job-detail-heading" className="mb-6 text-center text-xl font-bold text-white">
                📋 Complete BD Job Age Limit Reference (2025)
              </h2>
              <div className="space-y-6">
                {[
                  { category: '🏛️ Government Administration', items: [['General (সাধারণ)', '30'], ['Freedom Fighter (মুক্তিযোদ্ধা সন্তান)', '32'], ['Women Quota (নারী কোটা)', '30'], ['District Quota (জেলা কোটা)', '30'], ['Disabled (প্রতিবন্ধী)', '32'], ['Small Ethnic (ক্ষুদ্র নৃ-গোষ্ঠী)', '32']] },
                  { category: '📋 BCS (বিসিএস)', items: [['BCS General', '30'], ['BCS Freedom Fighter', '32'], ['BCS Health Cadre', '32']] },
                  { category: '🏦 Banking (ব্যাংক)', items: [['Govt Bank (Sonali, Agrani, Janata)', '30'], ['Specialized Bank (BKB, RAKUB)', '30']] },
                  { category: '📚 Education (শিক্ষা)', items: [['NTRCA Teacher Registration', '35'], ['Govt School/College Teacher', '30'], ['University Teacher', '30']] },
                  { category: '⚔️ Defense (প্রতিরক্ষা)', items: [['Army (সেনাবাহিনী)', '25'], ['Navy (নৌবাহিনী)', '25'], ['Air Force (বিমানবাহিনী)', '25'], ['BGB (বর্ডার গার্ড)', '25'], ['Coast Guard (কোস্ট গার্ড)', '25']] },
                  { category: '👮 Law Enforcement (আইনশৃঙ্খলা)', items: [['Police (পুলিশ)', '30'], ['RAB (র্যাব)', '30'], ['Ansar & VDP (আনসার)', '30'], ['Fire Service (ফায়ার সার্ভিস)', '30']] },
                  { category: '🏥 Health (স্বাস্থ্য)', items: [['Doctor BCS Health', '32'], ['Nurse (নার্স)', '30']] },
                  { category: '🏗️ Infrastructure (অবকাঠামো)', items: [['Railways (রেলওয়ে)', '30'], ['WASA (ওয়াসা)', '30'], ['PDB/Power (বিদ্যুৎ)', '30'], ['Gas Company (গ্যাস)', '30']] },
                  { category: '🏙️ Local Government (স্থানীয় সরকার)', items: [['City Corporation', '30'], ['Municipality (পৌরসভা)', '30'], ['Union Parishad', '30']] },
                  { category: '🌐 Special (বিশেষ)', items: [['Diplomat (কূটনীতিক)', '30'], ['Customs (কাস্টমস)', '30'], ['Tax Department (ট্যাক্স)', '30'], ['Audit & Accounts (অডিট)', '30'], ['Statistics (পরিসংখ্যান)', '30']] },
                ].map((section) => (
                  <div key={section.category}>
                    <h3 className="mb-3 text-sm font-semibold text-teal-400">{section.category}</h3>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {section.items.map(([name, age]) => (
                        <div key={name} className="stat-card flex items-center justify-between rounded-lg px-3 py-2">
                          <span className="text-sm text-slate-300">{name}</span>
                          <span className="text-sm font-bold text-white">{age}y</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-xs text-slate-500">⚠️ Age limits are subject to government policy changes. Verify with official sources before applying.</p>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"><AdSlot id="ad-jq-bottom" height="90px" /></div>
      </main>
      <Footer />
    </div>
  );
}
