import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import AgeCalculator from '@/components/AgeCalculator';

export const metadata: Metadata = {
  title: 'Age Calculator - Calculate Your Exact Age in Years, Months, Days, Hours',
  description: 'Calculate your exact age in years, months, days, hours, minutes and seconds. Get birth details, zodiac sign, Chinese zodiac, birth stone, life path number, and 25+ fascinating facts. Free online age calculator for Bangladesh.',
  alternates: { canonical: 'https://age.vhirtech.shop/age-calculator' },
};

export default function AgeCalculatorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6"><AdSlot id="ad-ac-top" height="90px" /></div>
      <main className="flex-1">
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl">
                🧮 Age Calculator BD
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-400">
                Calculate your exact age in years, months, days, hours, minutes &amp; seconds. Get birth details, zodiac sign, Chinese zodiac, birth stone, birth flower, life path number, and 25+ fascinating facts about your life.
              </p>
              <p className="mx-auto mt-1 max-w-xl text-xs text-slate-500">
                আপনার সঠিক বয়স গণনা করুন — বছর, মাস, দিন, ঘণ্টা, মিনিট ও সেকেন্ডে। জন্ম বিবরণ, রাশি, জন্ম রত্ন এবং আপনার জীবনের ২৫+ চমৎকার তথ্য জানুন।
              </p>
            </div>
            <AgeCalculator />
          </div>
        </section>
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"><AdSlot id="ad-ac-bottom" height="90px" /></div>
      </main>
      <Footer />
    </div>
  );
}
