'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { calculateAge, calculateJobQuota, type AgeResult, type JobQuotaResult } from '@/lib/calculator';
import { generateFacts, type Fact } from '@/lib/facts';
import { faqData } from '@/lib/seo-data';

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

  // Load saved DOB from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDob(saved);
        // Auto-calculate
        const birthDate = new Date(saved);
        const age = calculateAge(birthDate);
        const quotas = calculateJobQuota(birthDate);
        const generatedFacts = generateFacts(birthDate, age);
        setAgeResult(age);
        setJobQuotas(quotas);
        setFacts(generatedFacts);
        setShowResults(true);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  // Live clock update
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

    // Save to localStorage
    if (rememberMe) {
      try { localStorage.setItem(STORAGE_KEY, dob); } catch { /* */ }
    }

    setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  }, [dob, rememberMe]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => { if (e.key === 'Enter') handleCalculate(); }, [handleCalculate]);

  const handleClearSaved = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
    setDob('');
    setAgeResult(null);
    setJobQuotas([]);
    setFacts([]);
    setShowResults(false);
  }, []);

  // Share results
  const handleShare = useCallback(async () => {
    if (!ageResult) return;
    const text = `🧮 My Exact Age (Age Calculator BD)\n\n🎂 ${ageResult.years} Years, ${ageResult.months} Months, ${ageResult.days} Days\n⏰ ${ageResult.hours} Hours, ${ageResult.minutes} Minutes, ${ageResult.seconds} Seconds\n📅 Total Days: ${ageResult.totalDays.toLocaleString()}\n\n🔗 Calculate yours: https://age.vhirtech.shop`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Age Calculator BD', text }); } catch { /* */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareMsg('✅ Copied to clipboard!');
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



  // Age milestones
  const milestones = ageResult ? [
    { age: 18, label: 'Legal Adult', labelBn: 'আইনি প্রাপ্তবয়স্ক', reached: ageResult.years >= 18 },
    { age: 21, label: 'Full Adult', labelBn: 'পূর্ণ প্রাপ্তবয়স্ক', reached: ageResult.years >= 21 },
    { age: 25, label: 'Defense Jobs', labelBn: 'প্রতিরক্ষা চাকরি', reached: ageResult.years >= 25 },
    { age: 30, label: 'Govt Jobs', labelBn: 'সরকারি চাকরি', reached: ageResult.years >= 30 },
    { age: 32, label: 'FF/Disabled Quota', labelBn: 'মুক্তিযোদ্ধা/প্রতিবন্ধী কোটা', reached: ageResult.years >= 32 },
    { age: 35, label: 'NTRCA Teacher', labelBn: 'এনটিআরসিএ শিক্ষক', reached: ageResult.years >= 35 },
    { age: 40, label: 'Mid Life', labelBn: 'মধ্য জীবন', reached: ageResult.years >= 40 },
    { age: 50, label: 'Half Century', labelBn: 'অর্ধ শতাব্দী', reached: ageResult.years >= 50 },
    { age: 60, label: 'Senior Citizen', labelBn: 'প্রবীণ নাগরিক', reached: ageResult.years >= 60 },
  ] : [];

  return (
    <div>
      {/* ===== INPUT SECTION ===== */}
      <section id="calculator" className="scroll-mt-20">
        <div className="mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <svg className="pointer-events-none absolute -right-6 -top-6 h-36 w-36 text-teal-500/5" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            <div className="relative">
              <h2 className="mb-1 text-center text-2xl font-bold text-white sm:text-3xl">
                Calculate Your Exact Age
              </h2>
              <p className="mb-6 text-center text-sm text-slate-400">
                আপনার সঠিক বয়স গণনা করুন — Years, Months, Days, Hours, Minutes &amp; Seconds
              </p>

              <div className="mb-4">
                <label htmlFor="dob-input" className="mb-2 block text-sm font-medium text-slate-300">
                  📅 Date of Birth (জন্ম তারিখ)
                </label>
                <input
                  type="date"
                  id="dob-input"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-xl border border-slate-600/50 bg-[#0A1628] px-4 py-3.5 text-white outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                  max={new Date().toISOString().split('T')[0]}
                  aria-label="Enter your date of birth"
                />
              </div>

              {/* Remember Me Toggle */}
              <div className="mb-4 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-[#0A1628] text-teal-500 focus:ring-teal-400/20"
                  />
                  <span className="text-xs text-slate-400">💾 Remember my birthday (আমার জন্মদিন মনে রাখুন)</span>
                </label>
                {showResults && (
                  <button
                    onClick={handleClearSaved}
                    className="text-[10px] text-slate-500 transition-colors hover:text-red-400"
                  >
                    🗑️ Clear saved
                  </button>
                )}
              </div>

              <button
                onClick={handleCalculate}
                disabled={!dob}
                className="btn-neon w-full rounded-xl px-6 py-3.5 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Calculate age"
              >
                🧮 Calculate My Age
              </button>

              {showResults && (
                <p className="mt-3 text-center text-[10px] text-slate-500">
                  ✅ Your birthday is saved locally — next time it will auto-load
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      {showResults && ageResult && (
        <div ref={resultsRef} className="mt-8 scroll-mt-20">
          {/* Share Bar */}
          <div className="mx-auto mb-4 flex max-w-5xl items-center justify-between">
            <p className="text-xs text-slate-500">Results for: <span className="text-slate-300">{new Date(dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            <div className="flex items-center gap-2">
              {shareMsg && <span className="text-xs text-emerald-400">{shareMsg}</span>}
              <button onClick={handleShare} className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-400 transition-all hover:bg-teal-500/20">
                📤 Share Results
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-center gap-2">
            {[
              { key: 'age' as const, label: '🎂 Your Age' },
              { key: 'job' as const, label: '💼 Job Quota' },
              { key: 'facts' as const, label: '✨ Facts' },
              { key: 'faq' as const, label: '❓ FAQ' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.key ? 'bg-teal-500/15 text-teal-400 shadow-inner' : 'text-slate-400 hover:bg-slate-700/30 hover:text-white'
                }`}
                aria-selected={activeTab === tab.key}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===== AGE TAB ===== */}
          {activeTab === 'age' && (
            <div className="mx-auto max-w-5xl space-y-6">
              {/* Primary Age */}
              <article className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-6 text-center text-lg font-semibold text-teal-400">
                  Your Precise Age (আপনার সঠিক বয়স)
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
                  {[
                    { value: ageResult.years, label: 'Years', labelBn: 'বছর' },
                    { value: ageResult.months, label: 'Months', labelBn: 'মাস' },
                    { value: ageResult.days, label: 'Days', labelBn: 'দিন' },
                    { value: ageResult.hours, label: 'Hours', labelBn: 'ঘণ্টা' },
                    { value: ageResult.minutes, label: 'Minutes', labelBn: 'মিনিট' },
                    { value: ageResult.seconds, label: 'Seconds', labelBn: 'সেকেন্ড' },
                  ].map((item) => (
                    <div key={item.label} className="stat-card flex flex-col items-center rounded-xl p-3 sm:p-4">
                      <span className="animate-ticker text-2xl font-bold text-white sm:text-3xl">{item.value}</span>
                      <span className="mt-1 text-xs text-slate-400">{item.label}</span>
                      <span className="text-[10px] text-slate-500">{item.labelBn}</span>
                    </div>
                  ))}
                </div>
              </article>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: ageResult.totalDays.toLocaleString(), label: 'Total Days', icon: '📅' },
                  { value: ageResult.totalWeeks.toLocaleString(), label: 'Total Weeks', icon: '📆' },
                  { value: ageResult.totalMonths.toLocaleString(), label: 'Total Months', icon: '🌙' },
                  { value: `${ageResult.years}.${ageResult.months}`, label: 'Decimal Age', icon: '🔢' },
                ].map((stat) => (
                  <div key={stat.label} className="stat-card rounded-xl p-4 text-center">
                    <div className="text-lg">{stat.icon}</div>
                    <div className="mt-1 text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Birth Details — REMOVED: Zodiac, Chinese Zodiac, Birth Stone, Life Path, Birth Flower */}
              <article className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-4 text-center text-lg font-semibold text-teal-400">🌟 Birth Details (জন্ম বিবরণ)</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Born on Day', value: `${ageResult.birthDayOfWeek} (${ageResult.birthDayOfWeekBn})`, icon: '📅' },
                    { label: 'Leap Year Birth', value: ageResult.isLeapYear ? 'Yes ✅' : 'No ❌', icon: '🔄' },
                    { label: 'Day of Year', value: `Day ${ageResult.dayOfTheYear} of ${ageResult.isLeapYear ? 366 : 365}`, icon: '📊' },
                  ].map((item) => (
                    <div key={item.label} className="stat-card rounded-xl p-3 text-center">
                      <div className="text-sm">{item.icon}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{item.value}</div>
                      <div className="text-[10px] text-slate-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </article>



              {/* Age Milestones */}
              <article className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-4 text-center text-lg font-semibold text-teal-400">🏆 Age Milestones (বয়সের মাইলফলক)</h3>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {milestones.map((m) => (
                    <div key={m.age} className={`stat-card rounded-xl p-3 text-center ${m.reached ? 'border-teal-500/20' : 'opacity-50'}`}>
                      <div className="text-lg">{m.reached ? '✅' : '🔒'}</div>
                      <div className="mt-1 text-sm font-bold text-white">{m.age}y</div>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                      <div className="text-[9px] text-slate-500">{m.labelBn}</div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Birthday Countdown */}
              <div className="glass-card overflow-hidden rounded-2xl p-6 sm:p-8">
                <div className="relative">
                  <h3 className="mb-4 text-center text-lg font-semibold text-amber-400">🎂 Next Birthday Countdown</h3>
                  {ageResult.isBirthdayToday ? (
                    <div className="py-8 text-center">
                      <div className="mb-3 text-5xl animate-bounce-soft">🎉</div>
                      <p className="text-2xl font-bold text-amber-400">Happy Birthday!</p>
                      <p className="text-sm text-slate-400">শুভ জন্মদিন! 🎊</p>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 grid grid-cols-4 gap-2 sm:gap-4">
                        {[
                          { value: ageResult.daysUntilBirthday, label: 'Days' },
                          { value: ageResult.hoursUntilBirthday, label: 'Hours' },
                          { value: ageResult.minutesUntilBirthday, label: 'Minutes' },
                          { value: ageResult.secondsUntilBirthday, label: 'Seconds' },
                        ].map((item) => (
                          <div key={item.label} className="stat-card rounded-xl p-3 text-center">
                            <div className="text-xl font-bold text-amber-400 sm:text-2xl">{item.value}</div>
                            <div className="text-[10px] text-slate-400">{item.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mb-3">
                        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                          <span>Progress to next birthday</span>
                          <span>{ageResult.daysUntilBirthday} days left</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000" style={{ width: `${Math.max(5, Math.min(95, ((365 - ageResult.daysUntilBirthday) / 365) * 100))}%` }} />
                        </div>
                      </div>
                      <p className="text-center text-sm text-slate-400">
                        Next birthday: <span className="font-semibold text-amber-400">{ageResult.nextBirthday.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== JOB QUOTA TAB ===== */}
          {activeTab === 'job' && (
            <section id="job-quota" className="mx-auto max-w-5xl">
              <article className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-2 text-center text-lg font-semibold text-teal-400">
                  💼 BD Government Job Quota Tracker
                </h3>
                <p className="mb-4 text-center text-sm text-slate-400">
                  বাংলাদেশ সরকারি চাকরির বয়সসীমা ট্র্যাকার — {jobQuotas.length} Categories
                </p>
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                        selectedCategory === cat ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700/30 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {filteredQuotas.map((quota) => (
                    <div key={quota.id} className={`rounded-xl border p-3 transition-all hover:scale-[1.01] sm:p-4 ${urgencyColors[quota.urgencyLevel]}`}>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm">{quota.icon}</span>
                            <h4 className="font-semibold text-sm sm:text-base">{quota.quotaType}</h4>
                            <span className="text-[10px] text-slate-400">({quota.quotaTypeBn})</span>
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${urgencyBadge[quota.urgencyLevel].bg}`}>
                              {urgencyBadge[quota.urgencyLevel].label}
                            </span>
                          </div>
                          <p className="mt-1 text-xs opacity-70">
                            Limit: {quota.ageLimit}y | Your Age: {quota.currentAge}y | {quota.descriptionBn}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          {quota.isEligible ? (
                            <div>
                              <p className="text-sm font-bold">{quota.remainingYears}y {quota.remainingMonths}m {quota.remainingDays}d</p>
                              <p className="text-[10px] opacity-60">remaining</p>
                            </div>
                          ) : (
                            <p className="text-sm font-bold">Expired</p>
                          )}
                        </div>
                      </div>
                      {quota.isEligible && (
                        <div className="mt-2">
                          <div className="h-1.5 overflow-hidden rounded-full bg-black/20">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (quota.currentAge / quota.ageLimit) * 100)}%`, backgroundColor: quota.urgencyLevel === 'safe' ? '#10b981' : quota.urgencyLevel === 'warning' ? '#f59e0b' : '#ef4444' }} />
                          </div>
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
            <section id="facts" className="mx-auto max-w-5xl">
              <article className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-2 text-center text-lg font-semibold text-teal-400">✨ Fascinating Facts About Your Life</h3>
                <p className="mb-6 text-center text-sm text-slate-400">আপনার জীবনের চমৎকার তথ্য — {facts.length} Facts</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {facts.map((fact, index) => (
                    <div key={index} className="stat-card group rounded-xl p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-lg">{fact.icon}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{fact.title}</h4>
                          <p className="text-[10px] text-slate-500">{fact.titleBn}</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-teal-400">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}

          {/* ===== FAQ TAB ===== */}
          {activeTab === 'faq' && (
            <section id="faq" className="mx-auto max-w-4xl">
              <article className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-2 text-center text-lg font-semibold text-teal-400">❓ Frequently Asked Questions</h3>
                <p className="mb-6 text-center text-sm text-slate-400">সচরাচর জিজ্ঞাসা</p>
                <div className="space-y-2">
                  {faqData.map((faq, index) => (
                    <div key={index} className="overflow-hidden rounded-xl border border-slate-700/30 bg-[#0A1628]/50">
                      <button
                        onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-700/20"
                        aria-expanded={faqOpen === index}
                      >
                        <span className="pr-3 text-sm font-medium text-white">{faq.question}</span>
                        <svg className={`h-4 w-4 shrink-0 text-teal-400 transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${faqOpen === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="border-t border-slate-700/30 px-4 py-3">
                          <p className="text-sm leading-relaxed text-slate-300">{faq.answer}</p>
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
