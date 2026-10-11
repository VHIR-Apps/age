/**
 * Smart Age & Job Limit Calculator — Core Logic
 * Comprehensive age calculation with ALL BD job categories
 */

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
  hoursUntilBirthday: number;
  minutesUntilBirthday: number;
  secondsUntilBirthday: number;
  isBirthdayToday: boolean;
  birthDayOfWeek: string;
  birthDayOfWeekBn: string;
  isLeapYear: boolean;
  dayOfTheYear: number;
  daysLeftInYear: number;
  totalFridays: number;
  totalWeekends: number;
  totalRamadans: number;
  totalSunrises: number;
  totalFullMoons: number;
  sleepingHours: number;
  totalMeals: number;
  totalHeartbeats: number;
  totalBreaths: number;
}

export interface JobQuotaResult {
  id: string;
  quotaType: string;
  quotaTypeBn: string;
  category: string;
  ageLimit: number;
  currentAge: number;
  remainingYears: number;
  remainingMonths: number;
  remainingDays: number;
  deadlineDate: Date;
  isEligible: boolean;
  urgencyLevel: 'safe' | 'warning' | 'critical' | 'expired';
  description: string;
  descriptionBn: string;
  icon: string;
}

export interface DateDiffResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  weekendDays: number;
  weekdays: number;
}

const DAYS_BN = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function countSpecificDay(start: Date, end: Date, targetDay: number): number {
  if (start > end) return 0;
  const d1 = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const d2 = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const diffDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  let count = Math.floor(diffDays / 7);
  const remainder = diffDays % 7;
  const startDay = d1.getDay();
  for (let i = 0; i <= remainder; i++) {
    if ((startDay + i) % 7 === targetDay) {
      count++;
      break;
    }
  }
  return count;
}

/**
 * Calculate precise age from date of birth
 */
export function calculateAge(dateOfBirth: Date): AgeResult {
  const now = new Date();
  const birth = new Date(dateOfBirth);

  if (isNaN(birth.getTime()) || birth.getTime() > now.getTime()) {
    const validBirth = isNaN(birth.getTime()) ? now : birth;
    return {
      years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
      totalDays: 0, totalWeeks: 0, totalMonths: 0, totalHours: 0, totalMinutes: 0, totalSeconds: 0,
      nextBirthday: validBirth,
      daysUntilBirthday: 0, hoursUntilBirthday: 0, minutesUntilBirthday: 0, secondsUntilBirthday: 0,
      isBirthdayToday: false,
      birthDayOfWeek: DAYS_EN[validBirth.getDay()],
      birthDayOfWeekBn: DAYS_BN[validBirth.getDay()],
      isLeapYear: isLeapYear(validBirth.getFullYear()),
      dayOfTheYear: 0, daysLeftInYear: 0,
      totalFridays: 0, totalWeekends: 0, totalRamadans: 0, totalSunrises: 0, totalFullMoons: 0,
      sleepingHours: 0, totalMeals: 0, totalHeartbeats: 0, totalBreaths: 0,
    };
  }

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  let hours = now.getHours() - birth.getHours();
  let minutes = now.getMinutes() - birth.getMinutes();
  let seconds = now.getSeconds() - birth.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const totalMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMs / (1000 * 60));
  const totalSeconds = Math.floor(totalMs / 1000);

  // Detailed calendar & day statistics
  const totalFridays = countSpecificDay(birth, now, 5);
  const totalSaturdays = countSpecificDay(birth, now, 6);
  const totalWeekends = totalFridays + totalSaturdays;
  const totalRamadans = Math.max(0, years);
  const totalSunrises = totalDays;
  const totalFullMoons = Math.floor(totalDays / 29.53059);
  const sleepingHours = totalDays * 8;
  const totalMeals = totalDays * 3;
  const totalHeartbeats = totalMinutes * 72;
  const totalBreaths = totalMinutes * 16;

  // Next birthday
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  const isBirthdayToday = now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate();
  if (nextBirthday.getTime() <= now.getTime() && !isBirthdayToday) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }

  const remainingMs = nextBirthday.getTime() - now.getTime();
  const daysUntilBirthday = isBirthdayToday ? 0 : Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hoursUntilBirthday = isBirthdayToday ? 0 : Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesUntilBirthday = isBirthdayToday ? 0 : Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const secondsUntilBirthday = isBirthdayToday ? 0 : Math.floor((remainingMs % (1000 * 60)) / 1000);

  return {
    years, months, days, hours, minutes, seconds,
    totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, totalSeconds,
    nextBirthday, daysUntilBirthday, hoursUntilBirthday, minutesUntilBirthday, secondsUntilBirthday,
    isBirthdayToday,
    birthDayOfWeek: DAYS_EN[birth.getDay()],
    birthDayOfWeekBn: DAYS_BN[birth.getDay()],
    isLeapYear: isLeapYear(birth.getFullYear()),
    dayOfTheYear: getDayOfYear(birth),
    daysLeftInYear: isLeapYear(birth.getFullYear()) ? 366 - getDayOfYear(birth) : 365 - getDayOfYear(birth),
    totalFridays,
    totalWeekends,
    totalRamadans,
    totalSunrises,
    totalFullMoons,
    sleepingHours,
    totalMeals,
    totalHeartbeats,
    totalBreaths,
  };
}

/**
 * Calculate difference between two dates
 */
export function calculateDateDifference(startDate: Date, endDate: Date): DateDiffResult {
  const start = new Date(Math.min(startDate.getTime(), endDate.getTime()));
  const end = new Date(Math.max(startDate.getTime(), endDate.getTime()));

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const totalMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(totalMs / (1000 * 60));

  // Count weekend days in O(1) time
  let weekendDays = totalWeeks * 2;
  const remDays = totalDays % 7;
  const startDay = start.getDay();
  for (let i = 0; i < remDays; i++) {
    const day = (startDay + i) % 7;
    if (day === 0 || day === 6) weekendDays++;
  }
  const weekdays = Math.max(0, totalDays - weekendDays);

  return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, weekendDays, weekdays };
}

/**
 * BD Government Job Quota Categories — COMPREHENSIVE LIST
 */
const BD_JOB_QUOTAS: {
  id: string;
  quotaType: string;
  quotaTypeBn: string;
  category: string;
  ageLimit: number;
  description: string;
  descriptionBn: string;
  icon: string;
}[] = [
  // === Government Administration ===
  { id: 'general', quotaType: 'General (সাধারণ - নতুন ৩২ বছর)', quotaTypeBn: 'সাধারণ (৩২ বছর)', category: 'Government', ageLimit: 32, description: 'General govt job entry (Gazette 32 Years Ordinance)', descriptionBn: 'সরকারি চাকরিতে প্রবেশের সর্বোচ্চ বয়সসীমা (নতুন অধ্যাদেশ ৩২ বছর)', icon: '🏛️' },
  { id: 'freedom-fighter', quotaType: 'Freedom Fighter Children', quotaTypeBn: 'মুক্তিযোদ্ধা সন্তান (৩২ বছর)', category: 'Government', ageLimit: 32, description: 'Children of freedom fighters quota (32 Years)', descriptionBn: 'মুক্তিযোদ্ধার সন্তানদের জন্য বয়সসীমা ৩২ বছর', icon: '🎖️' },
  { id: 'women', quotaType: 'Women Quota', quotaTypeBn: 'নারী কোটা (৩২ বছর)', category: 'Government', ageLimit: 32, description: 'Women reservation in government jobs (32 Years)', descriptionBn: 'সরকারি চাকরিতে নারী কোটা ৩২ বছর', icon: '👩' },
  { id: 'district', quotaType: 'District Quota', quotaTypeBn: 'জেলা কোটা (৩২ বছর)', category: 'Government', ageLimit: 32, description: 'District-based reservation quota (32 Years)', descriptionBn: 'জেলা ভিত্তিক কোটা ৩২ বছর', icon: '🗺️' },
  { id: 'disabled', quotaType: 'Disabled Quota', quotaTypeBn: 'প্রতিবন্ধী কোটা (৩২ বছর)', category: 'Government', ageLimit: 32, description: 'Persons with disabilities quota', descriptionBn: 'প্রতিবন্ধী ব্যক্তিদের কোটা ৩২ বছর', icon: '♿' },
  { id: 'ethnic', quotaType: 'Small Ethnic Group', quotaTypeBn: 'ক্ষুদ্র নৃ-গোষ্ঠী (৩২ বছর)', category: 'Government', ageLimit: 32, description: 'Indigenous community quota', descriptionBn: 'ক্ষুদ্র নৃ-গোষ্ঠী কোটা ৩২ বছর', icon: '🌍' },
  // === BCS ===
  { id: 'bcs-general', quotaType: 'BCS Cadre (General - ৩২ বছর)', quotaTypeBn: 'বিসিএস ক্যাডার (৩২ বছর)', category: 'BCS', ageLimit: 32, description: 'BCS general cadre (Updated 32 Years)', descriptionBn: 'বাংলাদেশ সিভিল সার্ভিস সাধারণ ক্যাডার (৩২ বছর)', icon: '📋' },
  { id: 'bcs-ff', quotaType: 'BCS (Freedom Fighter)', quotaTypeBn: 'বিসিএস (মুক্তিযোদ্ধা)', category: 'BCS', ageLimit: 32, description: 'BCS freedom fighter children quota', descriptionBn: 'বিসিএস মুক্তিযোদ্ধা সন্তান কোটা (৩২ বছর)', icon: '🎖️' },
  // === Banking ===
  { id: 'bank-govt', quotaType: 'Govt Bank (Sonali, Agrani, Janata)', quotaTypeBn: 'সরকারি ব্যাংক (৩২ বছর)', category: 'Banking', ageLimit: 32, description: 'Government bank officer positions (32 Years)', descriptionBn: 'সরকারি ব্যাংক অফিসার পদ (৩২ বছর)', icon: '🏦' },
  { id: 'bank-bkash', quotaType: 'Bank (Specialized)', quotaTypeBn: 'বিশেষায়িত ব্যাংক', category: 'Banking', ageLimit: 32, description: 'Specialized banks like BKB, RAKUB', descriptionBn: 'বিশেষায়িত ব্যাংক (বিকেবি, রাকুব)', icon: '🏦' },
  // === Education ===
  { id: 'teacher-ntrca', quotaType: 'Teacher Registration (NTRCA)', quotaTypeBn: 'শিক্ষক নিবন্ধন (এনটিআরসিএ)', category: 'Education', ageLimit: 35, description: 'Non-government teacher registration', descriptionBn: 'অসরকারি শিক্ষক নিবন্ধন', icon: '📚' },
  { id: 'teacher-govt', quotaType: 'Govt Teacher (School/College)', quotaTypeBn: 'সরকারি শিক্ষক', category: 'Education', ageLimit: 30, description: 'Government school and college teacher', descriptionBn: 'সরকারি স্কুল ও কলেজ শিক্ষক', icon: '🏫' },
  { id: 'university', quotaType: 'University Teacher', quotaTypeBn: 'বিশ্ববিদ্যালয় শিক্ষক', category: 'Education', ageLimit: 30, description: 'Public university teacher positions', descriptionBn: 'পাবলিক বিশ্ববিদ্যালয় শিক্ষক পদ', icon: '🎓' },
  // === Defense & Security ===
  { id: 'army', quotaType: 'Army (সেনাবাহিনী)', quotaTypeBn: 'সেনাবাহিনী', category: 'Defense', ageLimit: 25, description: 'Bangladesh Army officer', descriptionBn: 'বাংলাদেশ সেনাবাহিনী অফিসার', icon: '⚔️' },
  { id: 'navy', quotaType: 'Navy (নৌবাহিনী)', quotaTypeBn: 'নৌবাহিনী', category: 'Defense', ageLimit: 25, description: 'Bangladesh Navy officer', descriptionBn: 'বাংলাদেশ নৌবাহিনী অফিসার', icon: '⚓' },
  { id: 'airforce', quotaType: 'Air Force (বিমানবাহিনী)', quotaTypeBn: 'বিমানবাহিনী', category: 'Defense', ageLimit: 25, description: 'Bangladesh Air Force officer', descriptionBn: 'বাংলাদেশ বিমানবাহিনী অফিসার', icon: '✈️' },
  { id: 'bgb', quotaType: 'Border Guard (বিজিবি)', quotaTypeBn: 'বর্ডার গার্ড', category: 'Defense', ageLimit: 25, description: 'Border Guard Bangladesh', descriptionBn: 'বর্ডার গার্ড বাংলাদেশ', icon: '🛡️' },
  { id: 'coastguard', quotaType: 'Coast Guard (কোস্ট গার্ড)', quotaTypeBn: 'কোস্ট গার্ড', category: 'Defense', ageLimit: 25, description: 'Bangladesh Coast Guard', descriptionBn: 'বাংলাদেশ কোস্ট গার্ড', icon: '🚢' },
  { id: 'police', quotaType: 'Police (পুলিশ)', quotaTypeBn: 'পুলিশ', category: 'Law Enforcement', ageLimit: 30, description: 'Bangladesh Police SI/Constable', descriptionBn: 'বাংলাদেশ পুলিশ এসআই/কনস্টেবল', icon: '👮' },
  { id: 'rab', quotaType: 'RAB (র্যাব)', quotaTypeBn: 'র্যাব', category: 'Law Enforcement', ageLimit: 30, description: 'Rapid Action Battalion', descriptionBn: 'র‍্যাপিড অ্যাকশন ব্যাটালিয়ন', icon: '🚔' },
  { id: 'ansar', quotaType: 'Ansar & VDP (আনসার)', quotaTypeBn: 'আনসার ও ভিডিপি', category: 'Law Enforcement', ageLimit: 30, description: 'Ansar and Village Defense Party', descriptionBn: 'আনসার ও গ্রাম প্রতিরক্ষা দল', icon: '🪖' },
  { id: 'fire', quotaType: 'Fire Service (ফায়ার সার্ভিস)', quotaTypeBn: 'ফায়ার সার্ভিস', category: 'Law Enforcement', ageLimit: 30, description: 'Bangladesh Fire Service', descriptionBn: 'বাংলাদেশ ফায়ার সার্ভিস', icon: '🚒' },
  // === Public Service ===
  { id: 'psc', quotaType: 'PSC (পিএসসি)', quotaTypeBn: 'পাবলিক সার্ভিস কমিশন', category: 'Public Service', ageLimit: 30, description: 'Public Service Commission', descriptionBn: 'পাবলিক সার্ভিস কমিশন', icon: '📋' },
  { id: 'ministry', quotaType: 'Ministry (মন্ত্রণালয়)', quotaTypeBn: 'মন্ত্রণালয়', category: 'Public Service', ageLimit: 30, description: 'Ministry staff positions', descriptionBn: 'মন্ত্রণালয় স্টাফ পদ', icon: '🏛️' },
  { id: 'autonomous', quotaType: 'Autonomous Body (স্বায়ত্তশাসিত)', quotaTypeBn: 'স্বায়ত্তশাসিত প্রতিষ্ঠান', category: 'Public Service', ageLimit: 30, description: 'Autonomous body positions', descriptionBn: 'স্বায়ত্তশাসিত প্রতিষ্ঠান পদ', icon: '🏢' },
  { id: 'corporation', quotaType: 'Corporation (কর্পোরেশন)', quotaTypeBn: 'কর্পোরেশন', category: 'Public Service', ageLimit: 30, description: 'Government corporation positions', descriptionBn: 'সরকারি কর্পোরেশন পদ', icon: '🏗️' },
  // === Infrastructure ===
  { id: 'railways', quotaType: 'Railways (রেলওয়ে)', quotaTypeBn: 'রেলওয়ে', category: 'Infrastructure', ageLimit: 30, description: 'Bangladesh Railway positions', descriptionBn: 'বাংলাদেশ রেলওয়ে পদ', icon: '🚂' },
  { id: 'wasa', quotaType: 'WASA (ওয়াসা)', quotaTypeBn: 'ওয়াসা', category: 'Infrastructure', ageLimit: 30, description: 'Water Supply Authority', descriptionBn: 'পানি সরবরাহ কর্তৃপক্ষ', icon: '💧' },
  { id: 'pdb', quotaType: 'PDB/Power Division (বিদ্যুৎ)', quotaTypeBn: 'বিদ্যুৎ বিভাগ', category: 'Infrastructure', ageLimit: 30, description: 'Power Development Board', descriptionBn: 'বিদ্যুৎ উন্নয়ন বোর্ড', icon: '⚡' },
  { id: 'titas', quotaType: 'Gas Company (গ্যাস কোম্পানি)', quotaTypeBn: 'গ্যাস কোম্পানি', category: 'Infrastructure', ageLimit: 30, description: 'Titas Gas and other gas companies', descriptionBn: 'তিতাস গ্যাস ও অন্যান্য গ্যাস কোম্পানি', icon: '🔥' },
  // === Local Government ===
  { id: 'city-corp', quotaType: 'City Corporation (সিটি কর্পোরেশন)', quotaTypeBn: 'সিটি কর্পোরেশন', category: 'Local Govt', ageLimit: 30, description: 'City Corporation positions', descriptionBn: 'সিটি কর্পোরেশন পদ', icon: '🏙️' },
  { id: 'municipality', quotaType: 'Municipality (পৌরসভা)', quotaTypeBn: 'পৌরসভা', category: 'Local Govt', ageLimit: 30, description: 'Municipality positions', descriptionBn: 'পৌরসভা পদ', icon: '🏘️' },
  { id: 'union', quotaType: 'Union Parishad (ইউনিয়ন পরিষদ)', quotaTypeBn: 'ইউনিয়ন পরিষদ', category: 'Local Govt', ageLimit: 30, description: 'Union Parishad positions', descriptionBn: 'ইউনিয়ন পরিষদ পদ', icon: '🏘️' },
  // === Health ===
  { id: 'doctor-bsc', quotaType: 'Doctor (BCS Health)', quotaTypeBn: 'চিকিৎসক (বিসিএস স্বাস্থ্য)', category: 'Health', ageLimit: 32, description: 'BCS Health cadre doctor', descriptionBn: 'বিসিএস স্বাস্থ্য ক্যাডার চিকিৎসক', icon: '🏥' },
  { id: 'nurse', quotaType: 'Nurse (নার্স)', quotaTypeBn: 'নার্স', category: 'Health', ageLimit: 30, description: 'Government nurse positions', descriptionBn: 'সরকারি নার্স পদ', icon: '💉' },
  // === Special ===
  { id: 'diplomat', quotaType: 'Diplomat (কূটনীতিক)', quotaTypeBn: 'কূটনীতিক', category: 'Special', ageLimit: 30, description: 'Foreign service diplomat', descriptionBn: 'পররাষ্ট্র সেবা কূটনীতিক', icon: '🌐' },
  { id: 'customs', quotaType: 'Customs (কাস্টমস)', quotaTypeBn: 'কাস্টমস', category: 'Special', ageLimit: 30, description: 'Customs and excise department', descriptionBn: 'কাস্টমস ও এক্সাইজ বিভাগ', icon: '📦' },
  { id: 'tax', quotaType: 'Tax Department (ট্যাক্স)', quotaTypeBn: 'ট্যাক্স বিভাগ', category: 'Special', ageLimit: 30, description: 'Tax department positions', descriptionBn: 'ট্যাক্স বিভাগ পদ', icon: '💰' },
  { id: 'audit', quotaType: 'Audit & Accounts (অডিট)', quotaTypeBn: 'মহাহিসাব নিয়ন্ত্রক', category: 'Special', ageLimit: 30, description: 'Audit and accounts department', descriptionBn: 'মহাহিসাব নিয়ন্ত্রক ও অডিটর জেনারেল', icon: '📊' },
  { id: 'stat', quotaType: 'Statistics (পরিসংখ্যান)', quotaTypeBn: 'পরিসংখ্যান বিভাগ', category: 'Special', ageLimit: 30, description: 'BBS and statistics department', descriptionBn: 'বিবিএস ও পরিসংখ্যান বিভাগ', icon: '📈' },
];

/**
 * Calculate BD Government Job Quota eligibility
 */
export function calculateJobQuota(dateOfBirth: Date): JobQuotaResult[] {
  const now = new Date();
  const birth = new Date(dateOfBirth);
  const age = calculateAge(dateOfBirth);

  return BD_JOB_QUOTAS.map((quota) => {
    const deadlineDate = new Date(
      birth.getFullYear() + quota.ageLimit,
      birth.getMonth(),
      birth.getDate()
    );

    const remainingMs = deadlineDate.getTime() - now.getTime();
    const isEligible = remainingMs > 0;

    let remainingYears = 0;
    let remainingMonths = 0;
    let remainingDays = 0;

    if (isEligible) {
      let ry = deadlineDate.getFullYear() - now.getFullYear();
      let rm = deadlineDate.getMonth() - now.getMonth();
      let rd = deadlineDate.getDate() - now.getDate();

      if (rd < 0) {
        const prevMonth = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), 0);
        rd += prevMonth.getDate();
        rm--;
      }
      if (rm < 0) {
        rm += 12;
        ry--;
      }
      remainingYears = Math.max(0, ry);
      remainingMonths = Math.max(0, rm);
      remainingDays = Math.max(0, rd);
    }

    let urgencyLevel: 'safe' | 'warning' | 'critical' | 'expired';
    if (!isEligible) {
      urgencyLevel = 'expired';
    } else if (age.years >= quota.ageLimit - 2) {
      urgencyLevel = 'critical';
    } else if (age.years >= quota.ageLimit - 4) {
      urgencyLevel = 'warning';
    } else {
      urgencyLevel = 'safe';
    }

    return {
      id: quota.id,
      quotaType: quota.quotaType,
      quotaTypeBn: quota.quotaTypeBn,
      category: quota.category,
      ageLimit: quota.ageLimit,
      currentAge: age.years,
      remainingYears,
      remainingMonths,
      remainingDays,
      deadlineDate,
      isEligible,
      urgencyLevel,
      description: quota.description,
      descriptionBn: quota.descriptionBn,
      icon: quota.icon,
    };
  });
}

/**
 * Get unique job categories
 */
export function getJobCategories(): string[] {
  return [...new Set(BD_JOB_QUOTAS.map(q => q.category))];
}
