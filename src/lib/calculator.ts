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
  zodiacSign: string;
  zodiacSignBn: string;
  chineseZodiac: string;
  birthStone: string;
  birthFlower: string;
  lifePathNumber: number;
  dayOfTheYear: number;
  daysLeftInYear: number;
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

const ZODIAC_SIGNS: [number, number, string, string][] = [
  [1, 20, 'Aquarius', 'কুম্ভ'], [2, 19, 'Pisces', 'মীন'],
  [3, 20, 'Aries', 'মেষ'], [4, 20, 'Taurus', 'বৃষ'],
  [5, 21, 'Gemini', 'মিথুন'], [6, 21, 'Cancer', 'কর্কট'],
  [7, 23, 'Leo', 'সিংহ'], [8, 23, 'Virgo', 'কন্যা'],
  [9, 23, 'Libra', 'তুলা'], [10, 23, 'Scorpio', 'বৃশ্চিক'],
  [11, 22, 'Sagittarius', 'ধনু'], [12, 22, 'Capricorn', 'মকর'],
];

const CHINESE_ZODIAC = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
const CHINESE_ZODIAC_BN = ['বানর', 'মোরগ', 'কুকুর', 'শুকর', 'ইঁদুর', 'ষাঁড়', 'বাঘ', 'খরগোশ', 'ড্রাগন', 'সাপ', 'ঘোড়া', 'ছাগল'];

const BIRTH_STONES = ['', 'Garnet', 'Amethyst', 'Aquamarine', 'Diamond', 'Emerald', 'Pearl', 'Ruby', 'Peridot', 'Sapphire', 'Opal', 'Topaz', 'Turquoise'];
const BIRTH_FLOWERS = ['', 'Carnation', 'Violet', 'Daffodil', 'Daisy', 'Lily of the Valley', 'Rose', 'Larkspur', 'Gladiolus', 'Aster', 'Marigold', 'Chrysanthemum', 'Narcissus'];

function getZodiac(dateOfBirth: Date): { sign: string; signBn: string } {
  const month = dateOfBirth.getMonth() + 1;
  const day = dateOfBirth.getDate();
  for (let i = 0; i < ZODIAC_SIGNS.length; i++) {
    const [signMonth, signDay, signName, signBn] = ZODIAC_SIGNS[i];
    const nextIndex = (i + 1) % ZODIAC_SIGNS.length;
    if (month === signMonth && day >= signDay || month === nextIndex && day < ZODIAC_SIGNS[nextIndex][1]) {
      return { sign: signName, signBn };
    }
  }
  return { sign: 'Capricorn', signBn: 'মকর' };
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getLifePathNumber(dateOfBirth: Date): number {
  const d = dateOfBirth.getDate();
  const m = dateOfBirth.getMonth() + 1;
  const y = dateOfBirth.getFullYear();
  const reduce = (n: number): number => {
    while (n > 9) { n = String(n).split('').reduce((a, b) => a + Number(b), 0); }
    return n;
  };
  return reduce(reduce(d) + reduce(m) + reduce(y));
}

/**
 * Calculate precise age from date of birth
 */
export function calculateAge(dateOfBirth: Date): AgeResult {
  const now = new Date();
  const birth = new Date(dateOfBirth);

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

  const zodiac = getZodiac(birth);
  const chineseYear = birth.getFullYear() % 12;

  return {
    years, months, days, hours, minutes, seconds,
    totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, totalSeconds,
    nextBirthday, daysUntilBirthday, hoursUntilBirthday, minutesUntilBirthday, secondsUntilBirthday,
    isBirthdayToday,
    birthDayOfWeek: DAYS_EN[birth.getDay()],
    birthDayOfWeekBn: DAYS_BN[birth.getDay()],
    isLeapYear: isLeapYear(birth.getFullYear()),
    zodiacSign: zodiac.sign,
    zodiacSignBn: zodiac.signBn,
    chineseZodiac: `${CHINESE_ZODIAC[chineseYear]} (${CHINESE_ZODIAC_BN[chineseYear]})`,
    birthStone: BIRTH_STONES[birth.getMonth() + 1],
    birthFlower: BIRTH_FLOWERS[birth.getMonth() + 1],
    lifePathNumber: getLifePathNumber(birth),
    dayOfTheYear: getDayOfYear(birth),
    daysLeftInYear: isLeapYear(birth.getFullYear()) ? 366 - getDayOfYear(birth) : 365 - getDayOfYear(birth),
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

  // Count weekend days
  let weekendDays = 0;
  let weekdays = 0;
  const current = new Date(start);
  while (current < end) {
    const day = current.getDay();
    if (day === 0 || day === 6) weekendDays++;
    else weekdays++;
    current.setDate(current.getDate() + 1);
  }

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
  { id: 'general', quotaType: 'General', quotaTypeBn: 'সাধারণ', category: 'Government', ageLimit: 30, description: 'General quota for all government jobs', descriptionBn: 'সকল সরকারি চাকরির সাধারণ কোটা', icon: '🏛️' },
  { id: 'freedom-fighter', quotaType: 'Freedom Fighter Children', quotaTypeBn: 'মুক্তিযোদ্ধা সন্তান', category: 'Government', ageLimit: 32, description: 'Children of freedom fighters get extended age', descriptionBn: 'মুক্তিযোদ্ধার সন্তানদের জন্য বয়সসীমা বাড়ানো হয়েছে', icon: '🎖️' },
  { id: 'women', quotaType: 'Women Quota', quotaTypeBn: 'নারী কোটা', category: 'Government', ageLimit: 30, description: 'Women reservation in government jobs', descriptionBn: 'সরকারি চাকরিতে নারী রিজার্ভেশন', icon: '👩' },
  { id: 'district', quotaType: 'District Quota', quotaTypeBn: 'জেলা কোটা', category: 'Government', ageLimit: 30, description: 'District-based reservation quota', descriptionBn: 'জেলা ভিত্তিক রিজার্ভেশন কোটা', icon: '🗺️' },
  { id: 'disabled', quotaType: 'Disabled Quota', quotaTypeBn: 'প্রতিবন্ধী কোটা', category: 'Government', ageLimit: 32, description: 'Persons with disabilities quota', descriptionBn: 'প্রতিবন্ধী ব্যক্তিদের কোটা', icon: '♿' },
  { id: 'ethnic', quotaType: 'Small Ethnic Group', quotaTypeBn: 'ক্ষুদ্র নৃ-গোষ্ঠী', category: 'Government', ageLimit: 32, description: 'Indigenous community quota', descriptionBn: 'আদিবাসী সম্প্রদায়ের কোটা', icon: '🌍' },
  // === BCS ===
  { id: 'bcs-general', quotaType: 'BCS Cadre (General)', quotaTypeBn: 'বিসিএস ক্যাডার (সাধারণ)', category: 'BCS', ageLimit: 30, description: 'Bangladesh Civil Service general cadre', descriptionBn: 'বাংলাদেশ সিভিল সার্ভিস সাধারণ ক্যাডার', icon: '📋' },
  { id: 'bcs-ff', quotaType: 'BCS (Freedom Fighter)', quotaTypeBn: 'বিসিএস (মুক্তিযোদ্ধা)', category: 'BCS', ageLimit: 32, description: 'BCS freedom fighter children quota', descriptionBn: 'বিসিএস মুক্তিযোদ্ধা সন্তান কোটা', icon: '🎖️' },
  // === Banking ===
  { id: 'bank-govt', quotaType: 'Govt Bank (Sonali, Agrani, Janata)', quotaTypeBn: 'সরকারি ব্যাংক', category: 'Banking', ageLimit: 30, description: 'Government bank officer positions', descriptionBn: 'সরকারি ব্যাংক অফিসার পদ', icon: '🏦' },
  { id: 'bank-bkash', quotaType: 'Bank (Specialized)', quotaTypeBn: 'বিশেষায়িত ব্যাংক', category: 'Banking', ageLimit: 30, description: 'Specialized banks like BKB, RAKUB', descriptionBn: 'বিশেষায়িত ব্যাংক (বিকেবি, রাকুব)', icon: '🏦' },
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
      const totalRemainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      remainingYears = Math.floor(totalRemainingDays / 365);
      remainingMonths = Math.floor((totalRemainingDays % 365) / 30);
      remainingDays = totalRemainingDays % 30;
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
