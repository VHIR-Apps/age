'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { calculateAge, calculateJobQuota, type AgeResult, type JobQuotaResult } from '@/lib/calculator';
import { generateFacts, type Fact } from '@/lib/facts';
import { faqData } from '@/lib/seo-data';
import WheelDatePicker from '@/components/WheelDatePicker';

const STORAGE_KEY = 'vhirtech_dob';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [jobQuotas, setJobQuotas] = useState<JobQuotaResult[]>([]);
  const [facts, setFacts] = useState<Fact[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'age' | 'job' | 'facts' | 'faq'>('age');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rememberMe, setRememberMe] = useState(true);
  const [shareMsg, setShareMsg] = useState('');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDob(saved);
        const birthDate = new Date(saved);
        const age = calculateAge(birthDate);
        const quotas = calculateJobQuota(birthDate);
        const generatedFacts = generateFacts(birthDate, age);
        setAgeResult(age);
        setJobQuotas(quotas);
        setFacts(generatedFacts);
        setShowResults(true);
      }
    } catch { /* */ }
  }, []);

  useEffect(() => {
    if (!showResults || !dob) return;
    const birthDate = new Date(dob);
    const timer = setInterval(() => {
      setAgeResult(calculateAge(birthDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [showResults, dob]);

  const handleCalculate = useCallback(() => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const age = calculateAge(birthDate);
    const quotas = calculateJobQuota(birthDate);
    const generatedFacts = generateFacts(birthDate, age);
    setAgeResult(age);
    setJobQuotas(quotas);
    setFacts(generatedFacts);
    setShowResults(true);
    if (rememberMe) {
      try { localStorage.setItem(STORAGE_KEY, dob); } catch { /* */ }
    }
    setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }, [dob, rememberMe]);

  const handleClearSaved = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
    setDob('');
    setAgeResult(null);
    setJobQuotas([]);
    setFacts([]);
    setShowResults(false);
  }, []);

  const handleShare = useCallback(async () => {
    if (!ageResult) return;
    const text = `🧮 আমার সঠিক বয়স (Age Calculator BD)\n\n🎂 ${ageResult.years} বছর, ${ageResult.months} মাস, ${ageResult.days} দিন\n⏰ ${ageResult.hours} ঘন্টা, ${ageResult.minutes} মিনিট, ${ageResult.seconds} সেকেন্ড\n📅 মোট দিন: ${ageResult.totalDays.toLocaleString()}\n\n🔗 আপনারটা দেখুন: https://age.vhirtech.shop`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Age Calculator BD', text }); } catch { /* */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareMsg('✅ Copied!');
        setTimeout(() => setShareMsg(''), 3000);
      } catch { /* */ }
    }
  }, [ageResult]);

  const urgencyColors = {
    safe: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    critical: 'border-red-500/30 bg-red-500/5 text-red-400',
    expired: 'border-slate-500/20 bg-slate-500/5 text-slate-500',
  };
  const urgencyBadge = {
    safe: { bg: 'bg-emerald-500/15 text-emerald-400', label: '✅ Eligible' },
    warning: { bg: 'bg-amber-500/15 text-amber-400', label: '⚠️ Limited' },
    critical: { bg: 'bg-red-500/15 text-red-400', label: '🔴 Urgent' },
    expired: { bg: 'bg-slate-500/15 text-slate-500', label: '❌ Expired' },
  };

  const categories = ['All', ...new Set(jobQuotas.map(q => q.category))];
  const filteredQuotas = selectedCategory === 'All' ? jobQuotas : jobQuotas.filter(q => q.category === selectedCategory);

  const milestones = ageResult ? [
    { age: 18, label: 'Legal Adult', labelBn: 'প্রাপ্তবয়স্ক', reached: ageResult.years >= 18 },
    { age: 21, label: 'Full Adult', labelBn: 'পূর্ণ বয়স্ক', reached: ageResult.years >= 21 },
    { age: 25, label: 'Defense Jobs', labelBn: 'প্রতিরক্ষা চাকরি', reached: ageResult.years >= 25 },
    { age: 30, label: 'Govt Jobs', labelBn: 'সরকারি চাকরি', reached: ageResult.years >= 30 },
    { age: 32, label: 'FF Quota', labelBn: 'মুক্তিযোদ্ধা কোটা', reached: ageResult.years >= 32 },
    { age: 35, label: 'NTRCA', labelBn: 'এনটিআরসিএ', reached: ageResult.years >= 35 },
    { age: 40, label: 'Mid Life', labelBn: 'মধ্য জীবন', reached: ageResult.years >= 40 },
    { age: 60, label: 'Senior', labelBn: 'প্রবীণ', reached: ageResult.years >= 60 },
  ] : [];

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-slide-up">
      {/* ===== INPUT SECTION ===== */}
      <section id="calculator" className="scroll-mt-20">
        <div className="mx-auto max-w-lg">
          <div className="app-card p-5 sm:p-7">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="mb-2 text-4xl">🎂</div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                আপনার বয়স জানুন
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                নিচে থেকে জন্ম তারিখ বেছে নিন
              </p>
            </div>

            {/* Wheel Date Picker */}
            <WheelDatePicker
              value={dob}
              onChange={setDob}
              maxDate={today}
            />

            {/* Remember Me */}
            <div className="mt-4 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`relative h-5 w-10 rounded-full transition-all cursor-pointer ${rememberMe ? 'bg-teal-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${rememberMe ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-xs text-slate-400">💾 মনে রাখুন</span>
              </label>
              {showResults && (
                <button onClick={handleClearSaved} className="text-[10px] text-slate-500 transition-colors hover:text-red-400">
                  🗑️ মুছুন
                </button>
              )}
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={!dob}
              className="btn-neon mt-4 w-full rounded-2xl py-4 text-base font-bold text-white"
              aria-label="Calculate age"
            >
              🧮 বয়স হিসাব করুন
            </button>

            {showResults && (
              <p className="mt-2 text-center text-[10px] text-slate-500">
                ✅ তারিখ সেভ আছে — পরের বার অটো লোড হবে
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      {showResults && ageResult && (
        <div ref={resultsRef} className="mt-6 scroll-mt-20">
          {/* Share Bar */}
          <div className="mx-auto mb-3 flex max-w-2xl items-center justify-between px-1">
            <p className="text-[11px] text-slate-500">
              📅 {new Date(dob + 'T00:00:00').toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="flex items-center gap-2">
              {shareMsg && <span className="text-[11px] text-emerald-400">{shareMsg}</span>}
              <button onClick={handleShare} className="inline-flex items-center gap-1 rounded-lg bg-teal-500/10 px-2.5 py-1.5 text-[11px] font-medium text-teal-400 transition-all hover:bg-teal-500/20">
                📤 শেয়ার
              </button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="mx-auto mb-4 max-w-2xl">
            <div className="tab-bar">
              {[
                { key: 'age' as const, label: '🎂 বয়স' },
                { key: 'job' as const, label: '💼 চাকরি' },
                { key: 'facts' as const, label: '✨ তথ্য' },
                { key: 'faq' as const, label: '❓ FAQ' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`tab-bar-item ${activeTab === tab.key ? 'active' : ''}`}
                  aria-selected={activeTab === tab.key}
                  role="tab"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ===== AGE TAB ===== */}
          {activeTab === 'age' && (
            <div className="mx-auto max-w-2xl space-y-4">
              {/* Primary Age */}
              <article className="app-card p-5">
                <h3 className="mb-4 text-center text-sm font-semibold text-teal-400">
                  আপনার সঠিক বয়স
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {[
                    { value: ageResult.years, label: 'বছর', sub: 'Years' },
                    { value: ageResult.months, label: 'মাস', sub: 'Months' },
                    { value: ageResult.days, label: 'দিন', sub: 'Days' },
                    { value: ageResult.hours, label: 'ঘন্টা', sub: 'Hours' },
                    { value: ageResult.minutes, label: 'মিনিট', sub: 'Mins' },
                    { value: ageResult.seconds, label: 'সেকেন্ড', sub: 'Secs' },
                  ].map((item) => (
                    <div key={item.label} className="stat-card flex flex-col items-center rounded-xl p-3">
                      <span className="animate-ticker text-2xl font-bold text-white">{item.value}</span>
                      <span className="mt-0.5 text-[10px] font-medium text-teal-400">{item.label}</span>
                      <span className="text-[9px] text-slate-500">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </article>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { value: ageResult.totalDays.toLocaleString(), label: 'মোট দিন', icon: '📅' },
                  { value: ageResult.totalWeeks.toLocaleString(), label: 'মোট সপ্তাহ', icon: '📆' },
                  { value: ageResult.totalMonths.toLocaleString(), label: 'মোট মাস', icon: '🌙' },
                  { value: `${ageResult.years}.${ageResult.months}`, label: 'দশমিক বয়স', icon: '🔢' },
                ].map((stat) => (
                  <div key={stat.label} className="stat-card rounded-xl p-3 text-center">
                    <div className="text-lg">{stat.icon}</div>
                    <div className="mt-1 text-base font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Birth Details */}
              <article className="app-card p-5">
                <h3 className="mb-3 text-center text-sm font-semibold text-teal-400">🌟 জন্ম বিবরণ</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'জন্মের দিন', value: `${ageResult.birthDayOfWeek}`, icon: '📅' },
                    { label: 'অধিবর্ষ', value: ageResult.isLeapYear ? 'হ্যাঁ ✅' : 'না ❌', icon: '🔄' },
                    { label: 'বছরের দিন', value: `${ageResult.dayOfTheYear}`, icon: '📊' },
                  ].map((item) => (
                    <div key={item.label} className="stat-card rounded-xl p-3 text-center">
                      <div className="text-base">{item.icon}</div>
                      <div className="mt-1 text-xs font-semibold text-white">{item.value}</div>
                      <div className="text-[9px] text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Milestones */}
              <article className="app-card p-5">
                <h3 className="mb-3 text-center text-sm font-semibold text-teal-400">🏆 বয়সের মাইলফলক</h3>
                <div className="grid grid-cols-4 gap-2">
                  {milestones.map((m) => (
                    <div key={m.age} className={`stat-card rounded-xl p-2 text-center ${m.reached ? 'border-teal-500/20' : 'opacity-40'}`}>
                      <div className="text-base">{m.reached ? '✅' : '🔒'}</div>
                      <div className="mt-0.5 text-sm font-bold text-white">{m.age}y</div>
                      <div className="text-[9px] text-slate-400 leading-tight">{m.labelBn}</div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Birthday Countdown */}
              <div className="app-card p-5">
                <h3 className="mb-3 text-center text-sm font-semibold text-amber-400">🎂 পরবর্তী জন্মদিন</h3>
                {ageResult.isBirthdayToday ? (
                  <div className="py-6 text-center">
                    <div className="mb-2 text-5xl animate-bounce-soft">🎉</div>
                    <p className="text-xl font-bold text-amber-400">শুভ জন্মদিন!</p>
                    <p className="text-sm text-slate-400">Happy Birthday! 🎊</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 grid grid-cols-4 gap-2">
                      {[
                        { value: ageResult.daysUntilBirthday, label: 'দিন' },
                        { value: ageResult.hoursUntilBirthday, label: 'ঘন্টা' },
                        { value: ageResult.minutesUntilBirthday, label: 'মিনিট' },
                        { value: ageResult.secondsUntilBirthday, label: 'সেকেন্ড' },
                      ].map((item) => (
                        <div key={item.label} className="stat-card rounded-xl p-2 text-center">
                          <div className="text-lg font-bold text-amber-400">{item.value}</div>
                          <div className="text-[9px] text-slate-400">{item.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000" style={{ width: `${Math.max(5, Math.min(95, ((365 - ageResult.daysUntilBirthday) / 365) * 100))}%` }} />
                    </div>
                    <p className="mt-2 text-center text-xs text-slate-400">
                      {ageResult.nextBirthday.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== JOB TAB ===== */}
          {activeTab === 'job' && (
            <section className="mx-auto max-w-2xl">
              <article className="app-card p-5">
                <h3 className="mb-1 text-center text-sm font-semibold text-teal-400">💼 সরকারি চাকরির বয়সসীমা ট্র্যাকার</h3>
                <p className="mb-3 text-center text-[11px] text-slate-400">{jobQuotas.length}টি ক্যাটাগরি</p>
                <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all ${
                        selectedCategory === cat ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700/30 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {filteredQuotas.map((quota) => (
                    <div key={quota.id} className={`rounded-xl border p-3 transition-all ${urgencyColors[quota.urgencyLevel]}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-sm">{quota.icon}</span>
                            <h4 className="font-semibold text-xs">{quota.quotaType}</h4>
                            <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-medium ${urgencyBadge[quota.urgencyLevel].bg}`}>
                              {urgencyBadge[quota.urgencyLevel].label}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[10px] opacity-70">সীমা: {quota.ageLimit}বছর | বর্তমান: {quota.currentAge}বছর</p>
                        </div>
                        <div className="text-right shrink-0">
                          {quota.isEligible ? (
                            <div>
                              <p className="text-xs font-bold">{quota.remainingYears}y {quota.remainingMonths}m</p>
                              <p className="text-[9px] opacity-60">বাকি</p>
                            </div>
                          ) : (
                            <p className="text-xs font-bold">মেয়াদ শেষ</p>
                          )}
                        </div>
                      </div>
                      {quota.isEligible && (
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/20">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (quota.currentAge / quota.ageLimit) * 100)}%`, backgroundColor: quota.urgencyLevel === 'safe' ? '#10b981' : quota.urgencyLevel === 'warning' ? '#f59e0b' : '#ef4444' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}

          {/* ===== FACTS TAB ===== */}
          {activeTab === 'facts' && (
            <section className="mx-auto max-w-2xl">
              <article className="app-card p-5">
                <h3 className="mb-1 text-center text-sm font-semibold text-teal-400">✨ আপনার জীবনের চমৎকার তথ্য</h3>
                <p className="mb-4 text-center text-[11px] text-slate-400">{facts.length}টি তথ্য</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {facts.map((fact, index) => (
                    <div key={index} className="stat-card group rounded-xl p-3">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className="text-base">{fact.icon}</span>
                        <div>
                          <h4 className="text-[10px] font-semibold text-white leading-tight">{fact.title}</h4>
                          <p className="text-[9px] text-slate-500">{fact.titleBn}</p>
                        </div>
                      </div>
                      <p className="text-base font-bold text-teal-400">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}

          {/* ===== FAQ TAB ===== */}
          {activeTab === 'faq' && (
            <section className="mx-auto max-w-2xl">
              <article className="app-card p-5">
                <h3 className="mb-1 text-center text-sm font-semibold text-teal-400">❓ সচরাচর জিজ্ঞাসা</h3>
                <p className="mb-4 text-center text-[11px] text-slate-400">আপনার প্রশ্নের উত্তর এখানে</p>
                <div className="space-y-2">
                  {faqData.map((faq, index) => (
                    <div key={index} className="overflow-hidden rounded-xl border border-slate-700/30 bg-[#0A1628]/50">
                      <button
                        onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-700/20"
                        aria-expanded={faqOpen === index}
                      >
                        <span className="pr-3 text-xs font-medium text-white">{faq.question}</span>
                        <svg className={`h-4 w-4 shrink-0 text-teal-400 transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${faqOpen === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="border-t border-slate-700/30 px-4 py-3">
                          <p className="text-xs leading-relaxed text-slate-300">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
