'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import { calculateDateDifference, type DateDiffResult } from '@/lib/calculator';

export default function DateDifferencePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<DateDiffResult | null>(null);

  const handleCalculate = () => {
    if (!startDate || !endDate) return;
    const diff = calculateDateDifference(new Date(startDate), new Date(endDate));
    setResult(diff);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6"><AdSlot id="ad-dd-top" height="90px" /></div>
      <main className="flex-1">
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl">
                📅 Date Difference Calculator
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-400">
                Calculate the exact difference between any two dates in years, months, days, hours, and minutes. See how many weekend days and weekdays are between the dates.
              </p>
              <p className="mx-auto mt-1 max-w-xl text-xs text-slate-500">
                যেকোনো দুটি তারিখের মধ্যে সঠিক পার্থক্য গণনা করুন — বছর, মাস, দিন, ঘণ্টা ও মিনিটে।
              </p>
            </div>

            {/* Input Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="start-date" className="mb-2 block text-sm font-medium text-slate-300">📅 Start Date (শুরুর তারিখ)</label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-600/50 bg-[#0A1628] px-4 py-3 text-white outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="mb-2 block text-sm font-medium text-slate-300">📅 End Date (শেষের তারিখ)</label>
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-600/50 bg-[#0A1628] px-4 py-3 text-white outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                  />
                </div>
              </div>
              <button
                onClick={handleCalculate}
                disabled={!startDate || !endDate}
                className="btn-neon mt-4 w-full rounded-xl px-6 py-3.5 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                📅 Calculate Difference
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 space-y-6">
                <article className="glass-card rounded-2xl p-6 sm:p-8">
                  <h2 className="mb-6 text-center text-lg font-semibold text-teal-400">Date Difference (তারিখ পার্থক্য)</h2>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
                    {[
                      { value: result.years, label: 'Years', labelBn: 'বছর' },
                      { value: result.months, label: 'Months', labelBn: 'মাস' },
                      { value: result.days, label: 'Days', labelBn: 'দিন' },
                    ].map((item) => (
                      <div key={item.label} className="stat-card flex flex-col items-center rounded-xl p-4">
                        <span className="text-3xl font-bold text-white">{item.value}</span>
                        <span className="text-xs text-slate-400">{item.label}</span>
                        <span className="text-[10px] text-slate-500">{item.labelBn}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: result.totalDays.toLocaleString(), label: 'Total Days', icon: '📅' },
                    { value: result.totalWeeks.toLocaleString(), label: 'Total Weeks', icon: '📆' },
                    { value: result.totalHours.toLocaleString(), label: 'Total Hours', icon: '⏰' },
                    { value: result.totalMinutes.toLocaleString(), label: 'Total Minutes', icon: '⏱️' },
                  ].map((stat) => (
                    <div key={stat.label} className="stat-card rounded-xl p-4 text-center">
                      <div className="text-lg">{stat.icon}</div>
                      <div className="mt-1 text-sm font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <h3 className="mb-4 text-center text-lg font-semibold text-teal-400">📊 Day Breakdown</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="stat-card rounded-xl p-4 text-center">
                      <div className="text-lg">💼</div>
                      <div className="mt-1 text-lg font-bold text-white">{result.weekdays.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Weekdays</div>
                      <div className="text-[10px] text-slate-500">কর্মদিবস</div>
                    </div>
                    <div className="stat-card rounded-xl p-4 text-center">
                      <div className="text-lg">🏖️</div>
                      <div className="mt-1 text-lg font-bold text-white">{result.weekendDays.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Weekend Days</div>
                      <div className="text-[10px] text-slate-500">ছুটির দিন</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"><AdSlot id="ad-dd-bottom" height="90px" /></div>
      </main>
      <Footer />
    </div>
  );
}
