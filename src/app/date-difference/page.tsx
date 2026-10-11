import type { Metadata } from 'next';
import DateDifferenceClient from './DateDifferenceClient';

export const metadata: Metadata = {
  title: 'Date Difference Calculator - Calculate Days Between Two Dates',
  description: 'Calculate the exact difference between any two dates in years, months, days, total days, weeks, weekdays, and weekend days. Free online date difference tool for Bangladesh.',
  alternates: { canonical: 'https://age.vhirtech.shop/date-difference' },
};

export default function DateDifferencePage() {
  return <DateDifferenceClient />;
}
