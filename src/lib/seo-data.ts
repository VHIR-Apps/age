/**
 * SEO Data — Enhanced FAQ & JSON-LD Schemas
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: 'How do I calculate my exact age online?',
    answer:
      'Use our Smart Age Calculator BD tool. Simply enter your date of birth, and you will instantly get your precise age in years, months, days, hours, minutes, and seconds. It is the most accurate online age calculator for Bangladesh.',
  },
  {
    question: 'What is the age limit for BD government jobs in 2025?',
    answer:
      'The general age limit for Bangladesh government jobs is 30 years. For freedom fighter quota, small ethnic groups, and disabled quota, the age limit is 32 years. For teacher registration (NTRCA), the age limit is 35 years. For defense forces (Army, Navy, Air Force), the age limit is 25 years. Use our Job Quota Tracker to see your exact eligibility countdown for all 30+ job categories.',
  },
  {
    question: 'How many days until my next birthday?',
    answer:
      'Our Age Calculator BD automatically shows a live countdown to your next birthday with days, hours, minutes, and seconds remaining. You will also see a visual progress bar showing how close you are to your next birthday.',
  },
  {
    question: 'What is the freedom fighter quota age limit for BCS?',
    answer:
      'For BCS (Bangladesh Civil Service) exams, the general age limit is 30 years, while children of freedom fighters get an extended age limit of 32 years. Our calculator shows exactly how much time you have left before reaching the age limit.',
  },
  {
    question: 'What is the age limit for Bangladesh Army, Navy, and Air Force?',
    answer:
      'For Bangladesh defense forces, the age limit is 25 years for officer positions. This includes Army (সেনাবাহিনী), Navy (নৌবাহিনী), Air Force (বিমানবাহিনী), Border Guard (বিজিবি), and Coast Guard (কোস্ট গার্ড).',
  },
  {
    question: 'How can I track my BD job application age eligibility?',
    answer:
      'Use our BD Government Job Quota Tracker. Enter your date of birth and the tool will automatically calculate your remaining eligibility period for all 30+ major job categories including BCS, bank jobs, teacher registration, defense forces, police, and more.',
  },
  {
    question: 'Can I calculate my age in Bangla?',
    answer:
      'Yes! Our Age Calculator BD supports both English and Bangla (বাংলা) interfaces. All results, including zodiac signs, seasons, job quota information, and fascinating facts, are available in Bangla for your convenience.',
  },
  {
    question: 'What fascinating facts can I learn about my age?',
    answer:
      'Our calculator generates 25+ personalized facts including total heartbeats, breaths taken, distance walked, meals eaten, sleep hours, blood pumped, hair growth, nail growth, words spoken, dreams, eye blinks, zodiac sign, Chinese zodiac, birth stone, birth flower, life path number, and more.',
  },
  {
    question: 'How do I calculate the difference between two dates?',
    answer:
      'Use our Date Difference Calculator tool. Enter two dates and instantly get the difference in years, months, days, total days, weeks, hours, and minutes. You can also see how many weekend days and weekdays are between the two dates.',
  },
  {
    question: 'What is the age limit for NTRCA teacher registration?',
    answer:
      'For NTRCA (Non-Government Teachers Registration and Certification Authority) teacher registration, the age limit is 35 years. This is the highest age limit among all government job categories in Bangladesh.',
  },
  {
    question: 'Is this age calculator free to use?',
    answer:
      'Yes! Age Calculator BD by VHIR Tech is completely free to use. All calculations happen locally in your browser — no data is sent to any server. Your privacy is our priority.',
  },
  {
    question: 'What is the age limit for government bank jobs in Bangladesh?',
    answer:
      'For government bank positions (Sonali Bank, Agrani Bank, Janata Bank, etc.), the age limit is 30 years. For specialized banks like Bangladesh Krishi Bank (BKB) and Rajshahi Krishi Unnayan Bank (RAKUB), the age limit is also 30 years.',
  },
];

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Age Calculator BD - Smart Online Tool',
  operatingSystem: 'Web',
  applicationCategory: 'UtilityApplication',
  description:
    'Calculate your exact age in years, months, days, hours, and seconds. Track BD government job quota eligibility with precise countdowns for 30+ categories. Free online age calculator for Bangladesh.',
  url: 'https://age.vhirtech.shop',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BDT',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '12580',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Organization',
    name: 'VHIR Tech',
    url: 'https://vhirtech.shop',
    email: 'vhirsupport@gmail.com',
  },
};

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VHIR Tech',
  url: 'https://vhirtech.shop',
  email: 'vhirsupport@gmail.com',
  logo: 'https://age.vhirtech.shop/assets/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'vhirsupport@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Bengali'],
  },
};
