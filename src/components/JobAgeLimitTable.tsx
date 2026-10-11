'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface JobLimitItem {
  id: string;
  category: string;
  categoryBn: string;
  jobType: string;
  jobTypeBn: string;
  ageLimit: string;
  ageYears: number;
  highlight?: string;
  group: 'all' | 'bcs_govt' | 'bank_edu' | 'defense' | 'other';
}

const JOB_LIMITS_DATA: JobLimitItem[] = [
  { id: '1', category: 'Government', categoryBn: 'সাধারণ সরকারি', jobType: 'General (সাধারণ - নতুন অধ্যাদেশ)', jobTypeBn: 'সাধারণ ক্যাডার ও নন-ক্যাডার', ageLimit: '32 years', ageYears: 32, highlight: 'নতুন অধ্যাদেশ', group: 'bcs_govt' },
  { id: '2', category: 'Government', categoryBn: 'কোটা সুবিধা', jobType: 'Freedom Fighter (মুক্তিযোদ্ধা কোটা)', jobTypeBn: 'মুক্তিযোদ্ধার সন্তান ও পোষ্য', ageLimit: '32 years', ageYears: 32, group: 'bcs_govt' },
  { id: '3', category: 'Government', categoryBn: 'বিশেষ কোটা', jobType: 'Disabled & Ethnic (প্রতিবন্ধী ও নৃ-গোষ্ঠী)', jobTypeBn: 'শারীরিক প্রতিবন্ধী ও ক্ষুদ্র নৃ-গোষ্ঠী', ageLimit: '32 years', ageYears: 32, group: 'bcs_govt' },
  { id: '4', category: 'BCS', categoryBn: 'বিসিএস', jobType: 'BCS General (বিসিএস সাধারণ ক্যাডার)', jobTypeBn: 'প্রশাসন, পুলিশ, পররাষ্ট্র ইত্যাদি', ageLimit: '32 years', ageYears: 32, highlight: '৩২ বছর', group: 'bcs_govt' },
  { id: '5', category: 'Banking', categoryBn: 'ব্যাংকিং খাত', jobType: 'Govt Banks (সরকারি বাণিজ্যিক ব্যাংক)', jobTypeBn: 'সোনালী, জনতা, অগ্রণী, রূপালী ব্যাংক', ageLimit: '32 years', ageYears: 32, group: 'bank_edu' },
  { id: '6', category: 'Education', categoryBn: 'শিক্ষা ও শিক্ষকতা', jobType: 'NTRCA Teacher (শিক্ষক নিবন্ধন)', jobTypeBn: 'স্কুল ও কলেজ শিক্ষক নিবন্ধন', ageLimit: '35 years', ageYears: 35, highlight: 'সর্বোচ্চ ৩৫y', group: 'bank_edu' },
  { id: '7', category: 'Education', categoryBn: 'শিক্ষা ও শিক্ষকতা', jobType: 'Primary Assistant Teacher', jobTypeBn: 'সরকারি প্রাথমিক বিদ্যালয় সহকারী শিক্ষক', ageLimit: '30 years', ageYears: 30, group: 'bank_edu' },
  { id: '8', category: 'Education', categoryBn: 'শিক্ষা ও শিক্ষকতা', jobType: 'Govt Secondary High School', jobTypeBn: 'সরকারি মাধ্যমিক বিদ্যালয় সহকারী শিক্ষক', ageLimit: '30 years', ageYears: 30, group: 'bank_edu' },
  { id: '9', category: 'Banking', categoryBn: 'বিশেষায়িত ব্যাংক', jobType: 'Bangladesh Krishi Bank (কৃষি ব্যাংক)', jobTypeBn: 'বিকেবি ও রাকাব অফিসার পদ', ageLimit: '32 years', ageYears: 32, group: 'bank_edu' },
  { id: '10', category: 'Defense', categoryBn: 'প্রতিরক্ষা বাহিনী', jobType: 'Army (বাংলাদেশ সেনাবাহিনী)', jobTypeBn: 'নিয়মিত কমিশনড অফিসার পদ', ageLimit: '25 years', ageYears: 25, group: 'defense' },
  { id: '11', category: 'Defense', categoryBn: 'প্রতিরক্ষা বাহিনী', jobType: 'Navy (বাংলাদেশ নৌবাহিনী)', jobTypeBn: 'অফিসার ক্যাডেট ও সরাসরি অফিসার', ageLimit: '25 years', ageYears: 25, group: 'defense' },
  { id: '12', category: 'Defense', categoryBn: 'প্রতিরক্ষা বাহিনী', jobType: 'Air Force (বাংলাদেশ বিমানবাহিনী)', jobTypeBn: 'অফিসার ক্যাডেট ও জিডি(পি) শাখা', ageLimit: '25 years', ageYears: 25, group: 'defense' },
  { id: '13', category: 'Defense', categoryBn: 'সীমান্ত সুরক্ষা', jobType: 'BGB (বর্ডার গার্ড বাংলাদেশ)', jobTypeBn: 'সিপাহী ও অফিসার পদমর্যাদা', ageLimit: '25 years', ageYears: 25, group: 'defense' },
  { id: '14', category: 'Defense', categoryBn: 'উপকূল সুরক্ষা', jobType: 'Coast Guard (কোস্ট গার্ড)', jobTypeBn: 'নাবিক ও কর্মকর্তা পদ', ageLimit: '25 years', ageYears: 25, group: 'defense' },
  { id: '15', category: 'Law Enforcement', categoryBn: 'আইনশৃঙ্খলা', jobType: 'Police Sub-Inspector (এসআই)', jobTypeBn: 'নিরস্ত্র ও সশস্ত্র এসআই', ageLimit: '27 years', ageYears: 27, group: 'defense' },
  { id: '16', category: 'Law Enforcement', categoryBn: 'আইনশৃঙ্খলা', jobType: 'Police Constable (কনস্টেবল)', jobTypeBn: 'ট্রেইনি রিক্রুট কনস্টেবল (TRC)', ageLimit: '20 years', ageYears: 20, group: 'defense' },
  { id: '17', category: 'Health', categoryBn: 'স্বাস্থ্য খাত', jobType: 'BCS Health Cadre (ডাক্তার)', jobTypeBn: 'সহকারী সার্জন ও ডেন্টাল সার্জন', ageLimit: '32 years', ageYears: 32, group: 'other' },
  { id: '18', category: 'Health', categoryBn: 'স্বাস্থ্য খাত', jobType: 'Govt Senior Staff Nurse', jobTypeBn: 'সরকারি হাসপাতাল সিনিয়র স্টাফ নার্স', ageLimit: '30 years', ageYears: 30, group: 'other' },
  { id: '19', category: 'Infrastructure', categoryBn: 'রেল ও জ্বালানি', jobType: 'Bangladesh Railway (রেলওয়ে)', jobTypeBn: 'স্টেশন মাস্টার, গার্ড ও সহকারী লোকোমোটিভ', ageLimit: '30 years', ageYears: 30, group: 'other' },
  { id: '20', category: 'Infrastructure', categoryBn: 'ইউটিলিটি ও বিদ্যুৎ', jobType: 'PDB / WASA / Gas (ওয়াসা ও তিতাস)', jobTypeBn: 'সরকারি স্বায়ত্তশাসিত প্রতিষ্ঠান', ageLimit: '30 years', ageYears: 30, group: 'other' },
  { id: '21', category: 'Local Govt', categoryBn: 'স্থানীয় সরকার', jobType: 'City Corporation & Pourashava', jobTypeBn: 'সিটি কর্পোরেশন ও পৌরসভা বিভিন্ন পদ', ageLimit: '30 years', ageYears: 30, group: 'other' },
];

const INITIAL_VISIBLE_COUNT = 6;

export default function JobAgeLimitTable() {
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'bcs_govt' | 'bank_edu' | 'defense' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredJobs = useMemo(() => {
    return JOB_LIMITS_DATA.filter((job) => {
      const matchGroup = selectedGroup === 'all' || job.group === selectedGroup;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        job.category.toLowerCase().includes(q) ||
        job.categoryBn.toLowerCase().includes(q) ||
        job.jobType.toLowerCase().includes(q) ||
        job.jobTypeBn.toLowerCase().includes(q) ||
        job.ageLimit.toLowerCase().includes(q);
      return matchGroup && matchQuery;
    });
  }, [selectedGroup, searchQuery]);

  const displayedJobs = isExpanded ? filteredJobs : filteredJobs.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingCount = Math.max(0, filteredJobs.length - INITIAL_VISIBLE_COUNT);

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-7 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/90 shadow-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-300 mb-2">
          <span>📋</span> সরকারি চাকরির বয়স নির্দেশিকা ২০২৫-২৬
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          BD Government Job Age Limits (2025)
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          সর্বশেষ সরকারি অধ্যাদেশ ও গেজেট অনুযায়ী বিভিন্ন চাকরির বয়সসীমা
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all' as const, label: 'সবগুলো পদ', count: JOB_LIMITS_DATA.length },
            { id: 'bcs_govt' as const, label: 'বিসিএস ও সাধারণ', count: 4 },
            { id: 'bank_edu' as const, label: 'ব্যাংক ও শিক্ষক', count: 5 },
            { id: 'defense' as const, label: 'ডিফেন্স ও পুলিশ', count: 7 },
            { id: 'other' as const, label: 'অন্যান্য পদ', count: 5 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedGroup(tab.id);
                setIsExpanded(false);
              }}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedGroup === tab.id
                  ? 'border border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[200px]">
          <input
            type="text"
            placeholder="পদ বা বিভাগ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Job Limit Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <th className="px-3 sm:px-4 py-3">বিভাগ (Category)</th>
              <th className="px-3 sm:px-4 py-3">চাকরি ও পদ (Job Type)</th>
              <th className="px-3 sm:px-4 py-3 text-right">সর্বোচ্চ বয়সসীমা (Limit)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {displayedJobs.length > 0 ? (
              displayedJobs.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                >
                  <td className="px-3 sm:px-4 py-2.5">
                    <span className="inline-block rounded-md border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
                      {item.categoryBn}
                    </span>
                    <span className="block text-[9px] text-slate-400 mt-0.5 font-mono">{item.category}</span>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                      <span>{item.jobType}</span>
                      {item.highlight && (
                        <span className="rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.jobTypeBn}</span>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-right whitespace-nowrap">
                    <span className="inline-block rounded-lg border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300 shadow-2xs">
                      {item.ageLimit}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-xs text-slate-400">
                  কোনো ফলাফল পাওয়া যায়নি। অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে খুঁজুন।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show More / Show Less Button */}
      {filteredJobs.length > INITIAL_VISIBLE_COUNT && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 px-5 py-2.5 text-xs font-bold text-teal-700 dark:text-teal-300 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            {isExpanded ? (
              <>
                <span>⬆️</span> সংক্ষেপ করুন (Show Less)
              </>
            ) : (
              <>
                <span>⬇️</span> আরও দেখুন ({remainingCount}+ টি পদ বিস্তারিত)
              </>
            )}
          </button>
        </div>
      )}

      {/* Note & CTA Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xl">
          ⚠️ সরকারি প্রজ্ঞাপন অনুযায়ী সাধারণ চাকরির সর্বোচ্চ বয়সসীমা ৩২ বছর। আবেদনের পূর্বে সংশ্লিষ্ট নিয়োগ বিজ্ঞপ্তি যাচাই করুন।
        </p>
        <Link
          href="/job-quota-tracker"
          className="btn-neon inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-slate-950 shrink-0 shadow-md active:scale-95"
        >
          <span>💼</span> আপনার কোটা ট্র্যাকার
        </Link>
      </div>
    </div>
  );
}
