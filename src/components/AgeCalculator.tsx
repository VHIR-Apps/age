'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { calculateAge, calculateJobQuota, type AgeResult, type JobQuotaResult } from '@/lib/calculator';
import { generateFacts, type Fact } from '@/lib/facts';
import { faqData } from '@/lib/seo-data';
import WheelDatePicker from '@/components/WheelDatePicker';
import SocialCardModal from '@/components/SocialCardModal';

const STORAGE_KEY = 'vhirtech_dob';

interface AgeCalculatorProps {
  initialTab?: 'age' | 'job' | 'facts' | 'faq';
}

export default function AgeCalculator({ initialTab = 'age' }: AgeCalculatorProps) {
  const [dob, setDob] = useState('');
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [jobQuotas, setJobQuotas] = useState<JobQuotaResult[]>([]);
  const [facts, setFacts] = useState<Fact[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'age' | 'job' | 'facts' | 'faq'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchJob, setSearchJob] = useState('');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [shareMsg, setShareMsg] = useState('');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handlePreset = useCallback((yearsBack: number) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - yearsBack);
    const dateStr = d.toISOString().split('T')[0];
    setDob(dateStr);
    const age = calculateAge(d);
    const quotas = calculateJobQuota(d);
    const generatedFacts = generateFacts(d, age);
    setAgeResult(age);
    setJobQuotas(quotas);
    setFacts(generatedFacts);
    setShowResults(true);
    if (rememberMe) {
      try { localStorage.setItem(STORAGE_KEY, dateStr); } catch { /* */ }
    }
    setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80);
  }, [rememberMe]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const birthDate = new Date(saved);
        const age = calculateAge(birthDate);
        const quotas = calculateJobQuota(birthDate);
        const generatedFacts = generateFacts(birthDate, age);
        queueMicrotask(() => {
          setDob(saved);
          setAgeResult(age);
          setJobQuotas(quotas);
          setFacts(generatedFacts);
          setShowResults(true);
        });
      }
    } catch { /* */ }
  }, []);

  useEffect(() => {
    if (!dob) return;
    const birthDate = new Date(dob);
    if (!isNaN(birthDate.getTime()) && birthDate <= new Date() && birthDate.getFullYear() >= 1900) {
      const age = calculateAge(birthDate);
      const quotas = calculateJobQuota(birthDate);
      const generatedFacts = generateFacts(birthDate, age);
      queueMicrotask(() => {
        setAgeResult(age);
        setJobQuotas(quotas);
        setFacts(generatedFacts);
        setShowResults(true);
      });
      if (rememberMe) {
        try { localStorage.setItem(STORAGE_KEY, dob); } catch { /* */ }
      }
    }
  }, [dob, rememberMe]);

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
  const filteredQuotas = jobQuotas.filter(q => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = !searchJob.trim() ||
      q.quotaType.toLowerCase().includes(searchJob.toLowerCase()) ||
      q.quotaTypeBn.includes(searchJob) ||
      q.category.toLowerCase().includes(searchJob.toLowerCase());
    const matchesEligible = !onlyEligible || q.isEligible;
    return matchesCategory && matchesSearch && matchesEligible;
  });

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
      <div className={showResults ? "mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-8 items-start" : "mx-auto max-w-lg"}>
        {/* ===== INPUT SECTION ===== */}
        <div className={showResults ? "lg:col-span-5 lg:sticky lg:top-24" : ""}>
          <section id="calculator" className="scroll-mt-20">
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

              {/* Quick Presets Chips */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">⚡ কুইক প্রিসেট</span>
                  <span className="text-[9px] text-slate-500">১-ক্লিকে বয়স টেস্ট করুন</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { label: '১৮y প্রাপ্তবয়স্ক', y: 18 },
                    { label: '২৪y ডিফেন্স সীমা', y: 24 },
                    { label: '৩০y সাধারণ জব', y: 30 },
                    { label: '৩২y বিসিএস কোটা', y: 32 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handlePreset(p.y)}
                      className="rounded-lg border border-teal-500/20 bg-teal-500/5 px-2 py-1.5 text-center text-[10px] font-medium text-teal-300 transition-all hover:bg-teal-500/20 hover:border-teal-400/40 active:scale-95"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
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
                  ⚡ তারিখ পরিবর্তনের সাথে সাথে ফলাফল স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে
                </p>
              )}
            </div>
          </section>
        </div>

        {/* ===== RESULTS ===== */}
        {showResults && ageResult && (
          <div ref={resultsRef} className="lg:col-span-7 mt-6 lg:mt-0 scroll-mt-20">
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
              {/* Primary Age Spotlight Card */}
              <article className="app-card p-6 sm:p-8 text-center border border-teal-500/25 bg-gradient-to-br from-teal-500/10 via-slate-900/80 to-sky-500/10 shadow-2xl shadow-teal-950/40">
                <span className="inline-block rounded-full bg-teal-500/15 px-3.5 py-1 text-[11px] font-bold text-teal-300 uppercase tracking-widest border border-teal-500/20 mb-3">
                  🎯 আপনার সঠিক বয়স
                </span>
                
                <div className="my-3 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-6xl font-black tracking-tight text-white">{ageResult.years}</span>
                    <span className="text-sm sm:text-lg font-bold text-teal-400">বছর</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-6xl font-black tracking-tight text-white">{ageResult.months}</span>
                    <span className="text-sm sm:text-lg font-bold text-teal-400">মাস</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-6xl font-black tracking-tight text-white">{ageResult.days}</span>
                    <span className="text-sm sm:text-lg font-bold text-teal-400">দিন</span>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-1.5 text-xs sm:text-sm font-mono text-slate-300 shadow-inner">
                  <span>⏰ {ageResult.hours} ঘণ্টা</span>
                  <span className="text-slate-600">•</span>
                  <span>{ageResult.minutes} মিনিট</span>
                  <span className="text-slate-600">•</span>
                  <span className="font-bold text-teal-400 animate-pulse">{ageResult.seconds} সেকেন্ড</span>
                </div>

                {/* Premium Milestone Card CTA */}
                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsCardModalOpen(true)}
                    className="btn-neon flex-1 rounded-2xl py-3.5 px-4 text-xs sm:text-sm font-bold text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-teal-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <span className="text-base">✨</span> প্রিমিয়াম লাইফ কার্ড জেনারেটর (HD)
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="rounded-2xl border border-teal-500/30 bg-slate-900/80 px-4 py-3.5 text-xs sm:text-sm font-semibold text-teal-300 hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors active:scale-98 cursor-pointer"
                  >
                    <span>📋</span> {shareMsg || 'টেক্সট কপি'}
                  </button>
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

              {/* Calendar & Life Days Detail Section */}
              <article className="app-card p-5">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-teal-400 flex items-center gap-1.5">
                    <span>📅</span> সময় ও দিনপঞ্জির হিসাব (Time & Calendar Milestones)
                  </h3>
                  <span className="text-[10px] text-slate-400">আপনার জীবনের অতিক্রান্ত সময়কাল</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">📅</div>
                    <div className="mt-1 text-base sm:text-lg font-black text-white">{ageResult.totalDays.toLocaleString()} দিন</div>
                    <div className="text-[10px] text-slate-400">মোট পার করা দিন</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">📆</div>
                    <div className="mt-1 text-base sm:text-lg font-black text-white">{ageResult.totalWeeks.toLocaleString()} সপ্তাহ</div>
                    <div className="text-[10px] text-slate-400">মোট পার করা সপ্তাহ</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">🏖️</div>
                    <div className="mt-1 text-base sm:text-lg font-black text-white">{ageResult.totalWeekends.toLocaleString()} দিন</div>
                    <div className="text-[10px] text-slate-400">সপ্তাহান্ত ও ছুটির দিন</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center border-teal-500/20 bg-teal-500/5">
                    <div className="text-xl">🕌</div>
                    <div className="mt-1 text-base sm:text-lg font-black text-teal-300">{ageResult.totalFridays.toLocaleString()}টি</div>
                    <div className="text-[10px] text-slate-400">অতিক্রান্ত শুক্রবার</div>
                  </div>
                </div>
              </article>

              {/* Biological Clock Section */}
              <article className="app-card p-5">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    <span>🧬</span> মানবদেহের জৈবিক ঘড়ি (Biological Wonders)
                  </h3>
                  <span className="text-[10px] text-slate-400">শারীরিক স্পন্দন ও জীবনের ছন্দ</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">💓</div>
                    <div className="mt-1 text-base font-bold text-rose-400">{(ageResult.totalHeartbeats / 1000000).toFixed(1)}M বার</div>
                    <div className="text-[10px] text-slate-400">আনুমানিক হৃদস্পন্দন</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">🫁</div>
                    <div className="mt-1 text-base font-bold text-sky-400">{(ageResult.totalBreaths / 1000000).toFixed(1)}M বার</div>
                    <div className="text-[10px] text-slate-400">শ্বাসপ্রশ্বাস গ্রহণ</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">😴</div>
                    <div className="mt-1 text-base font-bold text-indigo-400">{(ageResult.sleepingHours / 24 / 365.25).toFixed(1)} বছর</div>
                    <div className="text-[10px] text-slate-400">ঘুম ও বিশ্রামে পার</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">🍽️</div>
                    <div className="mt-1 text-base font-bold text-amber-400">{ageResult.totalMeals.toLocaleString()} বার</div>
                    <div className="text-[10px] text-slate-400">আনুমানিক আহার গ্রহণ</div>
                  </div>
                </div>
              </article>

              {/* Cosmic & Natural Life Milestones */}
              <article className="app-card p-5">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-teal-400 flex items-center gap-1.5">
                    <span>🌙</span> জীবনধারা ও প্রাকৃতিক চক্র (Nature & Cosmic Milestones)
                  </h3>
                  <span className="text-[10px] text-slate-400">প্রাকৃতিক নিদর্শন ও বিশেষ সময়কাল</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">📅</div>
                    <div className="mt-1 text-xs font-bold text-white">{ageResult.birthDayOfWeekBn}</div>
                    <div className="text-[9px] text-slate-400">জন্মের দিন ({ageResult.birthDayOfWeek})</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center border-teal-500/20 bg-teal-500/5">
                    <div className="text-xl">🌙</div>
                    <div className="mt-1 text-xs font-bold text-teal-300">{ageResult.totalRamadans}টি রমজান</div>
                    <div className="text-[9px] text-slate-400">অতিক্রান্ত পবিত্র রমজান মাস</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">🌅</div>
                    <div className="mt-1 text-xs font-bold text-white">{ageResult.totalSunrises.toLocaleString()} বার</div>
                    <div className="text-[9px] text-slate-400">সূর্যোদয় ও সূর্যাস্ত দর্শন</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">🌕</div>
                    <div className="mt-1 text-xs font-bold text-white">{ageResult.totalFullMoons} বার</div>
                    <div className="text-[9px] text-slate-400">পূর্ণিমা দর্শন (চন্দ্রচক্র)</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">🔄</div>
                    <div className="mt-1 text-xs font-bold text-white">{ageResult.isLeapYear ? 'হ্যাঁ (Leap Year) ✅' : 'না ❌'}</div>
                    <div className="text-[9px] text-slate-400">অধিবর্ষ (Leap Year)</div>
                  </div>
                  <div className="stat-card rounded-xl p-3 text-center">
                    <div className="text-xl">📊</div>
                    <div className="mt-1 text-xs font-bold text-white">{ageResult.dayOfTheYear}তম দিন</div>
                    <div className="text-[9px] text-slate-400">বছরের যে দিনে জন্ম</div>
                  </div>
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
                <p className="mb-3 text-center text-[11px] text-slate-400">{jobQuotas.length}টি ক্যাটাগরি | সর্বশেষ অধ্যাদেশ ৩২ বছর সমন্বিত</p>

                {/* Instant Search & Eligibility Filter */}
                <div className="mb-3.5 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="চাকরি বা ক্যাটাগরি খুঁজুন (যেমন: বিসিএস, ব্যাংক, পুলিশ)..."
                      value={searchJob}
                      onChange={(e) => setSearchJob(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2 pl-9 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/25"
                    />
                    <span className="absolute left-3 top-2 text-xs text-slate-500">🔍</span>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/40 border border-white/5 select-none hover:bg-slate-800/70 transition-colors">
                    <input
                      type="checkbox"
                      checked={onlyEligible}
                      onChange={(e) => setOnlyEligible(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-400/20"
                    />
                    <span className="text-xs font-medium text-teal-300">
                      শুধু যোগ্য ({jobQuotas.filter(q => q.isEligible).length})
                    </span>
                  </label>
                </div>

                <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all ${
                        selectedCategory === cat ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-700/30 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {filteredQuotas.length === 0 ? (
                    <p className="py-8 text-center text-xs text-slate-500">কোনো চাকরি পাওয়া যায়নি। অন্য কিওয়ার্ড দিয়ে খুঁজুন।</p>
                  ) : null}
                  {(showAllJobs || searchJob.trim() ? filteredQuotas : filteredQuotas.slice(0, 8)).map((quota) => (
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
                              <p className="text-xs font-bold font-mono">{quota.remainingYears}y {quota.remainingMonths}m {quota.remainingDays}d</p>
                              <p className="text-[9px] opacity-60">বাকি</p>
                            </div>
                          ) : (
                            <p className="text-xs font-bold text-slate-500">মেয়াদ শেষ</p>
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
                {filteredQuotas.length > 8 && !searchJob.trim() && (
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllJobs(!showAllJobs)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-xs font-medium text-teal-300 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all active:scale-95 shadow-sm"
                    >
                      <span>{showAllJobs ? '▲ কম দেখুন (Show Less)' : `▼ আরও ${filteredQuotas.length - 8}টি চাকরি দেখুন (Show More)`}</span>
                    </button>
                  </div>
                )}
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
                  {(showAllFacts ? facts : facts.slice(0, 6)).map((fact, index) => (
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
                {facts.length > 6 && (
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllFacts(!showAllFacts)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-xs font-medium text-teal-300 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all active:scale-95 shadow-sm"
                    >
                      <span>{showAllFacts ? '▲ কম তথ্য দেখুন (Show Less)' : `✨ আরও ${facts.length - 6}টি চমৎকার তথ্য দেখুন (Show All)`}</span>
                    </button>
                  </div>
                )}
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
                  {(showAllFaqs ? faqData : faqData.slice(0, 5)).map((faq, index) => (
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
                {faqData.length > 5 && (
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllFaqs(!showAllFaqs)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-xs font-medium text-teal-300 hover:bg-teal-500/20 hover:border-teal-500/50 transition-all active:scale-95 shadow-sm"
                    >
                      <span>{showAllFaqs ? '▲ কম প্রশ্ন দেখুন' : `▼ আরও ${faqData.length - 5}টি প্রশ্ন ও উত্তর দেখুন`}</span>
                    </button>
                  </div>
                )}
              </article>
            </section>
          )}
        </div>
      )}
      </div>

      {/* Viral Social Share Card Generator Modal */}
      {ageResult && (
        <SocialCardModal
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          ageResult={ageResult}
          dob={dob}
        />
      )}
    </div>
  );
}
