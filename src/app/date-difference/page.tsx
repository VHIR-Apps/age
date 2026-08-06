'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import WheelDatePicker from '@/components/WheelDatePicker';
import { calculateDateDifference, type DateDiffResult } from '@/lib/calculator';

export default function DateDifferencePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<DateDiffResult | null>(null);
  const today = new Date().toISOString().split('T')[0];

  const handleCalculate = () => {
    if (!startDate || !endDate) return;
    const diff = calculateDateDifference(new Date(startDate), new Date(endDate));
    setResult(diff);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-2xl px-4 pt-4"><AdSlot id="ad-dd-top" height="60px" /></div>
      <main className="flex-1">
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-lg px-4">
            <div className="mb-5 text-center">
              <div className="mb-2 text-4xl">📅</div>
              <h1 className="mb-1 text-2xl font-extrabold text-white sm:text-3xl">
                তারিখ পার্থক্য ক্যালকুলেটর
              </h1>
              <p className="text-xs text-slate-400">দুটি তারিখের মধ্যে পার্থক্য বের করুন</p>
            </div>

            <div className="app-card p-5 space-y-4">
              <div>
                <p className="mb-2 text-center text-sm font-medium text-teal-400">📅 শুরুর তারিখ</p>
                <WheelDatePicker value={startDate} onChange={setStartDate} />
              </div>
              <div>
                <p className="mb-2 text-center text-sm font-medium text-teal-400">📅 শেষের তারিখ</p>
                <WheelDatePicker value={endDate} onChange={setEndDate} />
              </div>
              <button
                onClick={handleCalculate}
                disabled={!startDate || !endDate}
                className="btn-neon w-full rounded-2xl py-4 text-base font-bold text-white"
              >
                📅 পার্থক্য বের করুন
              </button>
            </div>

            {result && (
              <div className="mt-5 space-y-4 animate-slide-up">
                <article className="app-card p-5">
                  <h2 className="mb-4 text-center text-sm font-semibold text-teal-400">তারিখ পার্থক্য</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: result.years, label: 'বছর' },
                      { value: result.months, label: 'মাস' },
                      { value: result.days, label: 'দিন' },
                    ].map((item) => (
                      <div key={item.label} className="stat-card flex flex-col items-center rounded-xl p-4">
                        <span className="text-3xl font-bold text-white">{item.value}</span>
                        <span className="text-xs text-slate-400">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { value: result.totalDays.toLocaleString(), label: 'মোট দিন', icon: '📅' },
                    { value: result.totalWeeks.toLocaleString(), label: 'মোট সপ্তাহ', icon: '📆' },
                    { value: result.totalHours.toLocaleString(), label: 'মোট ঘন্টা', icon: '⏰' },
                    { value: result.totalMinutes.toLocaleString(), label: 'মোট মিনিট', icon: 'ⱱ️' },
                  ].map((stat) => (
                    <div key={stat.label} className="stat-card rounded-xl p-3 text-center">
                      <div>{stat.icon}</div>
                      <div className="mt-1 text-sm font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="app-card p-5">
                  <h3 className="mb-3 text-center text-sm font-semibold text-teal-400">📊 দিনের বিভাজন</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card rounded-xl p-4 text-center">
                      <div>💼</div>
                      <div className="mt-1 text-lg font-bold text-white">{result.weekdays.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">কর্মদিবস</div>
                    </div>
                    <div className="stat-card rounded-xl p-4 text-center">
                      <div>🏖️</div>
                      <div className="mt-1 text-lg font-bold text-white">{result.weekendDays.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">ছুটির দিন</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <div className="mx-auto w-full max-w-2xl px-4 py-4"><AdSlot id="ad-dd-bottom" height="60px" /></div>
      </main>
      <Footer />
    </div>
  );
}
