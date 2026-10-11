'use client';

import { useState } from 'react';
import { faqData } from '@/lib/seo-data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? faqData : faqData.slice(0, 5);

  return (
    <section id="faq" className="scroll-mt-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 id="faq-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-400">সচরাচর জিজ্ঞাসা — আপনার প্রশ্নের উত্তর এখানে</p>
        </div>
        <div className="space-y-2" role="list">
          {displayedFaqs.map((faq, index) => (
            <div key={index} className="glass-card overflow-hidden rounded-xl" role="listitem">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-700/20"
                aria-expanded={openIndex === index}
              >
                <span className="pr-4 text-sm font-medium text-white sm:text-base">{faq.question}</span>
                <svg className={`h-5 w-5 shrink-0 text-teal-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-slate-700/30 px-5 py-4">
                  <p className="text-sm leading-relaxed text-slate-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {faqData.length > 5 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-xl border border-teal-500/30 bg-slate-900/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-teal-300 shadow-md hover:bg-teal-500/10 hover:border-teal-500/50 transition-all active:scale-95"
            >
              <span>{showAll ? '▲ কম প্রশ্ন দেখুন (Show Less)' : `▼ আরও ${faqData.length - 5}টি সচরাচর জিজ্ঞাসা দেখুন (Show More)`}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
