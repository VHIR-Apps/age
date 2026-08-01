/**
 * Fascinating Facts Generator — 20+ Facts
 * Removed: Zodiac Sign, Chinese Zodiac, Birth Stone, Life Path Number, Birth Flower
 */

import type { AgeResult } from './calculator';

export interface Fact {
  icon: string;
  title: string;
  titleBn: string;
  value: string;
  category: 'body' | 'time' | 'space' | 'life' | 'nature' | 'fun';
  color: string;
}

function estimateHeartbeats(totalDays: number): string {
  const beats = totalDays * 24 * 60 * 72;
  if (beats >= 1_000_000_000) return `${(beats / 1_000_000_000).toFixed(1)} Billion`;
  return `${(beats / 1_000_000).toFixed(0)} Million`;
}

function estimateBreaths(totalDays: number): string {
  const breaths = totalDays * 24 * 60 * 20;
  if (breaths >= 1_000_000_000) return `${(breaths / 1_000_000_000).toFixed(1)} Billion`;
  return `${(breaths / 1_000_000).toFixed(0)} Million`;
}

function estimateSleepHours(totalDays: number): string {
  const hours = totalDays * 8;
  if (hours >= 8760) return `${(hours / 8760).toFixed(1)} Years`;
  return `${hours.toLocaleString()} Hours`;
}

function estimateMeals(totalDays: number): string {
  const meals = totalDays * 3;
  return `${meals.toLocaleString()} Meals`;
}

function estimateDistanceWalked(totalDays: number): string {
  const km = (totalDays * 7500 * 0.7) / 1000;
  if (km >= 40000) return `~${(km / 40075).toFixed(1)}x Around Earth`;
  return `~${Math.round(km).toLocaleString()} km`;
}

function estimateBloodPumped(totalDays: number): string {
  const liters = totalDays * 24 * 60 * 5 / 1000;
  if (liters >= 1000) return `~${(liters / 1000).toFixed(0)}K Liters`;
  return `~${Math.round(liters).toLocaleString()} Liters`;
}

function estimateNailsGrowth(totalDays: number): string {
  const cm = (totalDays * 0.1).toFixed(1);
  return `~${cm} cm`;
}

function estimateHairGrowth(totalDays: number): string {
  const cm = (totalDays * 0.044).toFixed(1);
  return `~${cm} cm`;
}

function estimateWordsSpoken(totalDays: number): string {
  const words = totalDays * 16000;
  if (words >= 1_000_000_000) return `${(words / 1_000_000_000).toFixed(1)} Billion`;
  return `${(words / 1_000_000).toFixed(0)} Million`;
}

function estimateDreams(totalDays: number): string {
  const dreams = totalDays * 4;
  return `~${dreams.toLocaleString()} Dreams`;
}

function estimateLaughs(totalDays: number): string {
  const laughs = totalDays * 15;
  return `~${laughs.toLocaleString()} Times`;
}

function estimateWaterDrunk(totalDays: number): string {
  const liters = totalDays * 2.5;
  if (liters >= 1000) return `~${(liters / 1000).toFixed(1)}K Liters`;
  return `~${Math.round(liters).toLocaleString()} Liters`;
}

function estimateBlinks(totalDays: number): string {
  const blinks = totalDays * 24 * 60 * 17;
  if (blinks >= 1_000_000_000) return `${(blinks / 1_000_000_000).toFixed(1)} Billion`;
  return `${(blinks / 1_000_000).toFixed(0)} Million`;
}

function estimateSkinCells(totalDays: number): string {
  const cells = totalDays * 30000;
  if (cells >= 1_000_000_000) return `${(cells / 1_000_000_000).toFixed(1)} Billion`;
  return `${(cells / 1_000_000).toFixed(0)} Million`;
}

function estimateOlympics(totalDays: number): string {
  const olympics = Math.floor(totalDays / 1461);
  return `${olympics} Olympic Games`;
}

function estimateWorldCups(totalDays: number): string {
  const worldCups = Math.floor(totalDays / 1461);
  return `${worldCups} FIFA World Cups`;
}

function estimateSunrises(totalDays: number): string {
  return `${totalDays.toLocaleString()} Sunrises`;
}

function estimateHeartWeight(totalDays: number): string {
  const beats = totalDays * 24 * 60 * 72;
  const kg = (beats * 0.0001).toFixed(1);
  return `~${kg} kg Force`;
}

function estimateFoodEaten(totalDays: number): string {
  const tons = (totalDays * 1.8 / 1000).toFixed(1);
  return `~${tons} Tons`;
}

function estimateOxygen(totalDays: number): string {
  const liters = totalDays * 550;
  if (liters >= 1000000) return `~${(liters / 1000000).toFixed(1)}M Liters`;
  return `~${(liters / 1000).toFixed(0)}K Liters`;
}

export function generateFacts(dateOfBirth: Date, age: AgeResult): Fact[] {
  const facts: Fact[] = [
    { icon: '❤️', title: 'Heartbeats', titleBn: 'হৃদস্পন্দন', value: estimateHeartbeats(age.totalDays), category: 'body', color: 'from-red-500 to-pink-500' },
    { icon: '🫁', title: 'Breaths Taken', titleBn: 'শ্বাস-প্রশ্বাস', value: estimateBreaths(age.totalDays), category: 'body', color: 'from-blue-500 to-cyan-500' },
    { icon: '💤', title: 'Time Slept', titleBn: 'ঘুমের সময়', value: estimateSleepHours(age.totalDays), category: 'life', color: 'from-indigo-500 to-purple-500' },
    { icon: '🍽️', title: 'Meals Eaten', titleBn: 'খাবার খেয়েছেন', value: estimateMeals(age.totalDays), category: 'life', color: 'from-amber-500 to-orange-500' },
    { icon: '🚶', title: 'Distance Walked', titleBn: 'হাঁটার দূরত্ব', value: estimateDistanceWalked(age.totalDays), category: 'space', color: 'from-green-500 to-emerald-500' },
    { icon: '🩸', title: 'Blood Pumped', titleBn: 'পাম্প করা রক্ত', value: estimateBloodPumped(age.totalDays), category: 'body', color: 'from-red-600 to-rose-500' },
    { icon: '💅', title: 'Nail Growth', titleBn: 'নখের বৃদ্ধি', value: estimateNailsGrowth(age.totalDays), category: 'body', color: 'from-pink-500 to-rose-400' },
    { icon: '💇', title: 'Hair Growth', titleBn: 'চুলের বৃদ্ধি', value: estimateHairGrowth(age.totalDays), category: 'body', color: 'from-amber-400 to-yellow-500' },
    { icon: '💬', title: 'Words Spoken', titleBn: 'কথা বলেছেন', value: estimateWordsSpoken(age.totalDays), category: 'life', color: 'from-teal-500 to-cyan-500' },
    { icon: '💭', title: 'Dreams Had', titleBn: 'স্বপ্ন দেখেছেন', value: estimateDreams(age.totalDays), category: 'life', color: 'from-purple-500 to-indigo-500' },
    { icon: '😂', title: 'Times Laughed', titleBn: 'হেসেছেন', value: estimateLaughs(age.totalDays), category: 'life', color: 'from-yellow-500 to-amber-500' },
    { icon: '💧', title: 'Water Drunk', titleBn: 'পানি পান করেছেন', value: estimateWaterDrunk(age.totalDays), category: 'body', color: 'from-blue-500 to-sky-500' },
    { icon: '👁️', title: 'Eye Blinks', titleBn: 'চোখের পলক', value: estimateBlinks(age.totalDays), category: 'body', color: 'from-cyan-500 to-teal-500' },
    { icon: '🧬', title: 'Skin Cells Shed', titleBn: 'ত্বকের কোষ ঝরেছে', value: estimateSkinCells(age.totalDays), category: 'body', color: 'from-orange-400 to-red-400' },
    { icon: '📅', title: 'Total Days Lived', titleBn: 'মোট দিন', value: age.totalDays.toLocaleString(), category: 'time', color: 'from-teal-500 to-emerald-500' },
    { icon: '📆', title: 'Total Weeks', titleBn: 'মোট সপ্তাহ', value: age.totalWeeks.toLocaleString(), category: 'time', color: 'from-emerald-500 to-green-500' },
    { icon: '🌙', title: 'Total Months', titleBn: 'মোট মাস', value: age.totalMonths.toLocaleString(), category: 'time', color: 'from-indigo-500 to-blue-500' },
    { icon: '⏰', title: 'Total Hours', titleBn: 'মোট ঘণ্টা', value: age.totalHours.toLocaleString(), category: 'time', color: 'from-blue-500 to-violet-500' },
    { icon: '🌅', title: 'Sunrises Seen', titleBn: 'সূর্যোদয় দেখেছেন', value: estimateSunrises(age.totalDays), category: 'nature', color: 'from-orange-500 to-amber-500' },
    { icon: '🫧', title: 'Oxygen Breathed', titleBn: 'অক্সিজেন নিয়েছেন', value: estimateOxygen(age.totalDays), category: 'body', color: 'from-sky-400 to-blue-400' },
    { icon: '🍔', title: 'Food Consumed', titleBn: 'খাদ্য গ্রহণ', value: estimateFoodEaten(age.totalDays), category: 'life', color: 'from-amber-400 to-orange-400' },
    { icon: '🌙', title: 'Full Moons', titleBn: 'পূর্ণিমা', value: `${Math.floor(age.totalMonths)} Full Moons`, category: 'space', color: 'from-slate-400 to-slate-500' },
    { icon: '🏅', title: 'Olympics Lived', titleBn: 'অলিম্পিক', value: estimateOlympics(age.totalDays), category: 'fun', color: 'from-amber-400 to-yellow-400' },
    { icon: '⚽', title: 'World Cups Lived', titleBn: 'বিশ্বকাপ', value: estimateWorldCups(age.totalDays), category: 'fun', color: 'from-green-500 to-emerald-500' },
  ];

  return facts;
}
