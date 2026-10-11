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
            <AgeCalculator initialTab="job" />
          </div>
        </section>

        {/* Quick Reference Summary */}
        <section className="py-6 sm:py-8" aria-labelledby="job-detail-heading">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="glass-card rounded-2xl p-6 sm:p-7 text-center">
              <h2 id="job-detail-heading" className="mb-2 text-lg sm:text-xl font-bold text-white">
                📋 বাংলাদেশ সরকারি চাকরির সাধারণ বয়সসীমা একনজরে
              </h2>
              <p className="mb-6 text-xs text-slate-400">
                সর্বশেষ ২০২৪ অধ্যাদেশ অনুযায়ী সকল সাধারণ ও কোটা ভিত্তিক প্রধান বয়সসীমা
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="stat-card rounded-xl p-3.5 text-center border-teal-500/20 bg-teal-500/5">
                  <div className="text-2xl">🏛️</div>
                  <div className="mt-1 text-base sm:text-lg font-black text-teal-300">৩২ বছর</div>
                  <div className="text-[11px] font-medium text-slate-300">বিসিএস ও সাধারণ সরকারি</div>
                </div>
                <div className="stat-card rounded-xl p-3.5 text-center">
                  <div className="text-2xl">🏦</div>
                  <div className="mt-1 text-base sm:text-lg font-black text-white">৩২ বছর</div>
                  <div className="text-[11px] font-medium text-slate-300">সরকারি ও বিশেষায়িত ব্যাংক</div>
                </div>
                <div className="stat-card rounded-xl p-3.5 text-center">
                  <div className="text-2xl">📚</div>
                  <div className="mt-1 text-base sm:text-lg font-black text-white">৩৫ বছর</div>
                  <div className="text-[11px] font-medium text-slate-300">শিক্ষক নিবন্ধন (NTRCA)</div>
                </div>
                <div className="stat-card rounded-xl p-3.5 text-center">
                  <div className="text-2xl">⚔️</div>
                  <div className="mt-1 text-base sm:text-lg font-black text-white">২৫-৩০ বছর</div>
                  <div className="text-[11px] font-medium text-slate-300">প্রতিরক্ষা ও পুলিশ বাহিনী</div>
                </div>
              </div>

              <p className="mt-5 text-[11px] text-slate-500">
                💡 প্রতিটি পদের জন্য আপনার বাকি দিন ও লাইভ কাউন্টডাউন দেখতে উপরের ট্র্যাকারে নিজের জন্ম তারিখ বেছে নিন।
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"><AdSlot id="ad-jq-bottom" height="90px" /></div>
      </main>
      <Footer />
    </div>
  );
}
