import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import AgeCalculator from '@/components/AgeCalculator';

export const metadata: Metadata = {
  title: 'Birthday Countdown - Next Birthday Calculator with Live Timer',
  description: 'Live countdown to your next birthday with days, hours, minutes, and seconds. See your birthday progress bar, zodiac sign, birth stone, and fun birthday facts. Free birthday countdown calculator for Bangladesh.',
  alternates: { canonical: 'https://age.vhirtech.shop/birthday-countdown' },
};

export default function BirthdayCountdownPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6"><AdSlot id="ad-bd-top" height="90px" /></div>
      <main className="flex-1">
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl">
                🎂 Birthday Countdown Calculator
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-400">
                Live countdown to your next birthday with days, hours, minutes, and seconds. See your birthday progress bar, zodiac sign, birth stone, and fun birthday facts.
              </p>
              <p className="mx-auto mt-1 max-w-xl text-xs text-slate-500">
                আপনার পরবর্তী জন্মদিন পর্যন্ত লাইভ কাউন্টডাউন — দিন, ঘণ্টা, মিনিট ও সেকেন্ডে। রাশি, জন্ম রত্ন এবং মজার জন্মদিন তথ্য দেখুন।
              </p>
            </div>
            <AgeCalculator />
          </div>
        </section>

        {/* Birthday Fun Facts */}
        <section className="py-8 sm:py-12" aria-labelledby="birthday-facts-heading">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 id="birthday-facts-heading" className="mb-6 text-center text-xl font-bold text-white">
                🎊 Fun Birthday Facts &amp; Traditions
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: '🎂 Birthday Cake', desc: 'The tradition of birthday cakes dates back to ancient Greece, where cakes were offered to Artemis, the goddess of the moon.' },
                  { title: '🕯️ Birthday Candles', desc: 'The tradition of blowing out candles comes from the belief that the smoke carries prayers to the gods. Make a wish!' },
                  { title: '🎵 Happy Birthday Song', desc: 'The "Happy Birthday" song was composed in 1893 by Patty and Mildred Hill. It was originally called "Good Morning to All."' },
                  { title: '🎈 Birthday Balloons', desc: 'Balloons were first used for celebrations in the 1820s. Today, over 1 billion balloons are sold annually for birthdays.' },
                  { title: '🎁 Gift Giving', desc: 'The tradition of birthday gifts comes from ancient Rome, where people brought gifts to celebrate the birth of important figures.' },
                  { title: '🌟 Birthstones', desc: 'Each month has a special birthstone. January is Garnet, February is Amethyst, and so on. Find your birthstone above!' },
                ].map((fact) => (
                  <div key={fact.title} className="stat-card rounded-xl p-4">
                    <h3 className="mb-2 text-sm font-semibold text-white">{fact.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{fact.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"><AdSlot id="ad-bd-bottom" height="90px" /></div>
      </main>
      <Footer />
    </div>
  );
}
