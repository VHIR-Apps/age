'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { AgeResult } from '@/lib/calculator';

interface SocialCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageResult: AgeResult;
  dob: string;
}

type CardTheme = 'navy' | 'gold' | 'cyber' | 'emerald' | 'studio';
type CardFormat = 'square' | 'story';
type MetricCategory = 'all' | 'core' | 'lifestyle' | 'spiritual' | 'biology' | 'cosmic';

interface MetricOption {
  id: string;
  category: MetricCategory;
  label: string;
  sublabel: string;
  icon: string;
  badge: string;
  getValue: (r: AgeResult) => string;
}

const ALL_METRIC_OPTIONS: MetricOption[] = [
  // 1. Core Time & Age
  {
    id: 'totalDays',
    category: 'core',
    label: 'মোট অতিক্রান্ত দিন',
    sublabel: 'পৃথিবীর বুকে কাটানো সুবর্ণ সময়',
    icon: '📅',
    badge: 'সময়কাল',
    getValue: (r) => `${r.totalDays.toLocaleString()} দিন`,
  },
  {
    id: 'totalWeeks',
    category: 'core',
    label: 'মোট অতিক্রান্ত সপ্তাহ',
    sublabel: 'জীবনের অতিক্রান্ত সপ্তাহকাল',
    icon: '📆',
    badge: 'ক্যালেন্ডার',
    getValue: (r) => `${r.totalWeeks.toLocaleString()} সপ্তাহ`,
  },
  {
    id: 'totalHours',
    category: 'core',
    label: 'মোট অতিক্রান্ত ঘণ্টা',
    sublabel: 'জীবনের প্রতিটি জীবন্ত মুহূর্ত',
    icon: '⏳',
    badge: 'ঘণ্টা',
    getValue: (r) => `${r.totalHours.toLocaleString()} ঘণ্টা`,
  },
  {
    id: 'birthDay',
    category: 'core',
    label: 'জন্মের বার ও দিন',
    sublabel: 'সপ্তাহের যে বারে প্রথম ধরায় আগমন',
    icon: '🎈',
    badge: 'জন্মবার',
    getValue: (r) => `${r.birthDayOfWeekBn} বার`,
  },

  // 2. Lifestyle & Calendar
  {
    id: 'weekends',
    category: 'lifestyle',
    label: 'কাটানো ছুটির দিন',
    sublabel: 'বিশ্রাম ও আনন্দের অবকাশকাল',
    icon: '🏖️',
    badge: 'ছুটি ও আনন্দ',
    getValue: (r) => `${r.totalWeekends.toLocaleString()} দিন ছুটি`,
  },
  {
    id: 'nextBday',
    category: 'lifestyle',
    label: 'পরবর্তী জন্মদিন বাকি',
    sublabel: 'আগামী জন্মদিনের সুবর্ণ ক্ষণগণনা',
    icon: '🎉',
    badge: 'উৎসব',
    getValue: (r) => `আর মাত্র ${r.daysUntilBirthday} দিন`,
  },
  {
    id: 'sunrises',
    category: 'lifestyle',
    label: 'সূর্যোদয় ও সূর্যাস্ত দর্শন',
    sublabel: 'পৃথিবীর আলো-আঁধারির মিলন',
    icon: '🌅',
    badge: 'প্রকৃতি',
    getValue: (r) => `${r.totalSunrises.toLocaleString()} বার সূর্যাস্ত`,
  },
  {
    id: 'seasons',
    category: 'lifestyle',
    label: 'ষড়ঋতুর পরিক্রমণ',
    sublabel: 'বাংলাদেশের ঋতুচক্র উপভোগ',
    icon: '🌿',
    badge: 'ঋতুচক্র',
    getValue: (r) => `${Math.floor(r.years * 6)} টি ঋতু পরিক্রমণ`,
  },

  // 3. Spiritual Milestones
  {
    id: 'fridays',
    category: 'spiritual',
    label: 'অতিক্রান্ত জুমার দিন',
    sublabel: 'পবিত্র শুক্রবারে জুমার উপস্থিতি',
    icon: '🕌',
    badge: 'পবিত্র জুমা',
    getValue: (r) => `${r.totalFridays.toLocaleString()} টি পবিত্র জুমা`,
  },
  {
    id: 'ramadan',
    category: 'spiritual',
    label: 'প্রাপ্ত পবিত্র রমজান মাস',
    sublabel: 'রহমত ও বরকতময় সিয়াম সাধনা',
    icon: '🌙',
    badge: 'রমজানুল মোবারক',
    getValue: (r) => `${r.totalRamadans} টি রহমতের রমজান`,
  },

  // 4. Biology & Health
  {
    id: 'heartbeats',
    category: 'biology',
    label: 'স্পন্দিত হৃদস্পন্দন',
    sublabel: 'সবচেয়ে বিশ্বস্ত ঘড়ির টিকটিক',
    icon: '💓',
    badge: 'জীবন ঘড়ি',
    getValue: (r) => `${(r.totalHeartbeats / 1000000).toFixed(1)}M বার স্পন্দন`,
  },
  {
    id: 'bloodPumped',
    category: 'biology',
    label: 'হৃদযন্ত্রের রক্ত সঞ্চালন',
    sublabel: 'হৃদপিণ্ড কর্তৃক পাম্পকৃত রক্ত',
    icon: '🌊',
    badge: 'জীববিজ্ঞান',
    getValue: (r) => `${((r.totalDays * 7200) / 1000000).toFixed(1)}M লিটার রক্ত`,
  },
  {
    id: 'breaths',
    category: 'biology',
    label: 'জীবনদায়ী নিঃশ্বাস গ্রহণ',
    sublabel: 'ফুসফুসে গৃহীত মোট শ্বাসপ্রশ্বাস',
    icon: '🫁',
    badge: 'স্বাস্থ্য',
    getValue: (r) => `${(r.totalBreaths / 1000000).toFixed(1)}M বার নিঃশ্বাস`,
  },
  {
    id: 'sleepYears',
    category: 'biology',
    label: 'ঘুম ও বিশ্রামে পার',
    sublabel: 'শরীরের পুনরুজ্জীবনে কাটানো সময়',
    icon: '😴',
    badge: 'বিশ্রামকাল',
    getValue: (r) => `${(r.sleepingHours / 24 / 365.25).toFixed(1)} বছর বিশ্রাম`,
  },
  {
    id: 'mealsEaten',
    category: 'biology',
    label: 'আহার ও খাবার গ্রহণ',
    sublabel: 'দেহের পুষ্টিতে গৃহীত আনুমানিক খাবার',
    icon: '🍽️',
    badge: 'আহার',
    getValue: (r) => `${r.totalMeals.toLocaleString()} বার আহার`,
  },

  // 5. Cosmic & Rare Viral Facts
  {
    id: 'spaceTravel',
    category: 'cosmic',
    label: 'মহাকাশে সৌর পরিক্রমণ',
    sublabel: 'পৃথিবীতে চড়ে সূর্যের চারদিকে ঘূর্ণন',
    icon: '🚀',
    badge: 'মহাজাগতিক',
    getValue: (r) => `${(r.years * 940).toLocaleString()}M কিমি যাত্রা`,
  },
  {
    id: 'eclipses',
    category: 'cosmic',
    label: 'মহাজাগতিক গ্রহণ দর্শন',
    sublabel: 'জীবদ্দশায় সূর্য ও চন্দ্রগ্রহণ',
    icon: '🌘',
    badge: 'বিরল ঘটনা',
    getValue: (r) => `${Math.floor(r.years * 4.2)} টি বিরল গ্রহণ`,
  },
  {
    id: 'fullmoons',
    category: 'cosmic',
    label: 'রূপালী পূর্ণিমা দর্শন',
    sublabel: 'আকাশে দেখা চন্দ্রচক্রের পূর্ণিমা',
    icon: '🌕',
    badge: 'জ্যোতির্বিজ্ঞান',
    getValue: (r) => `${r.totalFullMoons} টি রূপালী পূর্ণিমা`,
  },
  {
    id: 'earthWalks',
    category: 'cosmic',
    label: 'হাঁটায় পৃথিবী প্রদক্ষিণ',
    sublabel: 'অতিক্রান্ত হাঁটার দূরত্বের সমতুল্য',
    icon: '🚶',
    badge: 'ফিজিক্যাল',
    getValue: (r) => `${((r.totalDays * 4) / 40075).toFixed(1)} বার প্রদক্ষিণ`,
  },
  {
    id: 'dreams',
    category: 'cosmic',
    label: 'স্বপ্নের জগতে কাটানো',
    sublabel: 'ঘুমের মাঝে আনুমানিক স্বপ্ন দর্শন',
    icon: '✨',
    badge: 'মনস্তত্ত্ব',
    getValue: (r) => `${(r.totalDays * 4).toLocaleString()} টি স্বপ্ন`,
  },
  {
    id: 'eyeBlinks',
    category: 'cosmic',
    label: 'চোখের পলক ও দর্শন',
    sublabel: 'চোখের পাতা ফেলার আনুমানিক সংখ্যা',
    icon: '👁️',
    badge: 'স্মৃতি',
    getValue: (r) => `${((r.totalDays * 16 * 60 * 17) / 10000000).toFixed(1)} কোটি বার`,
  },
];

const PRESET_QUOTES = [
  'জীবনের প্রতিটি মুহূর্তের জন্য সৃষ্টিকর্তার কাছে চিরকৃতজ্ঞ ✨',
  'আলহামদুলিল্লাহ, প্রতিটি সেকেন্ডের জীবন নেয়ামতের জন্য শুকরিয়া 🌙',
  'Making every single day count on this beautiful planet 🌍',
  'নতুন স্বপ্ন ও সম্ভাবনার পথে প্রতিদিন এগিয়ে চলা 🚀',
  'সবাইকে ভালোবাসা, সম্প্রীতি ও ইতিবাচক শুভেচ্ছা 🕊️',
];

const MAX_SELECTED_METRICS = 6;

// Procedural Sparkle Star
function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    ctx.moveTo(cx, cy);
    const x1 = cx + Math.cos(angle) * size;
    const y1 = cy + Math.sin(angle) * size;
    const x2 = cx + Math.cos(angle + Math.PI / 4) * (size * 0.25);
    const y2 = cy + Math.sin(angle + Math.PI / 4) * (size * 0.25);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Procedural Guilloche Pattern for Luxury Aesthetics
function drawGuilloche(ctx: CanvasRenderingContext2D, cx: number, cy: number, maxR: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const count = 12;
  for (let i = 0; i < count; i++) {
    const angle = (i * Math.PI * 2) / count;
    const ox = cx + Math.cos(angle) * 35;
    const oy = cy + Math.sin(angle) * 35;
    ctx.beginPath();
    ctx.arc(ox, oy, maxR, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

// Luxury Cinematic Corner Brackets
function drawCornerBrackets(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, len: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  // Top-Left
  ctx.beginPath();
  ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
  ctx.stroke();
  // Top-Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + len);
  ctx.stroke();
  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len); ctx.lineTo(x, y + h); ctx.lineTo(x + len, y + h);
  ctx.stroke();
  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
  ctx.restore();
}

// Anamorphic Lens Flare Streak for Cinematic Aura
function drawAnamorphicFlare(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, color: string) {
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, w / 2);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.2, color);
  grad.addColorStop(0.6, 'rgba(56, 189, 248, 0.08)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - w / 2, cy - 8, w, 16);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.3, cy);
  ctx.lineTo(cx + w * 0.3, cy);
  ctx.stroke();
  ctx.restore();
}

// Procedural Official Movie Archive Seal Stamp (Embossed 3D Gold Medal)
function drawMovieSealStamp(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, accent: string, gold: string) {
  ctx.save();
  // Radial embossed gold backdrop
  const sealGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
  sealGrad.addColorStop(0, 'rgba(255, 215, 0, 0.35)');
  sealGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.22)');
  sealGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Multi-ring decorative borders
  ctx.strokeStyle = gold;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Scalloped tick marks around perimeter
  ctx.setLineDash([3, 4]);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r - 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = gold;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 10, 0, Math.PI * 2);
  ctx.stroke();

  // Center sparkling gold star
  drawSparkle(ctx, cx, cy - 8, 12, gold);

  ctx.fillStyle = gold;
  ctx.font = '900 9px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED ARCHIVE', cx, cy + 9);
  ctx.font = '800 8px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('AGE CALC BD • 2026', cx, cy + 20);
  ctx.restore();
}

export default function SocialCardModal({ isOpen, onClose, ageResult, dob }: SocialCardModalProps) {
  const [name, setName] = useState('');
  const [customQuote, setCustomQuote] = useState('জীবনের প্রতিটি মুহূর্তের জন্য সৃষ্টিকর্তার কাছে চিরকৃতজ্ঞ ✨');
  const [theme, setTheme] = useState<CardTheme>('navy');
  const [format, setFormat] = useState<CardFormat>('square');
  const [activeCategory, setActiveCategory] = useState<MetricCategory>('all');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'totalDays',
    'weekends',
    'fridays',
    'ramadan',
    'spaceTravel',
    'heartbeats',
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUserPhoto(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMetric = (id: string) => {
    if (selectedMetrics.includes(id)) {
      if (selectedMetrics.length > 2) {
        setSelectedMetrics(selectedMetrics.filter((m) => m !== id));
      }
    } else {
      if (selectedMetrics.length < MAX_SELECTED_METRICS) {
        setSelectedMetrics([...selectedMetrics, id]);
      }
    }
  };

  const filteredOptions = useMemo(() => {
    if (activeCategory === 'all') return ALL_METRIC_OPTIONS;
    return ALL_METRIC_OPTIONS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const loadImage = (src: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
      if (img.complete) resolve(img);
    });
  };

  const drawCard = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const isStory = format === 'story';
    const height = isStory ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;

    // Palette Definitions
    const palettes: Record<
      CardTheme,
      {
        bg1: string;
        bg2: string;
        bg3: string;
        accent1: string;
        accent2: string;
        gold: string;
        textLight: string;
        textMuted: string;
        border: string;
        borderGradStart: string;
        borderGradEnd: string;
        glow: string;
        cardBg: string;
        badgeBg: string;
        isLight: boolean;
      }
    > = {
      navy: {
        bg1: '#020614',
        bg2: '#081734',
        bg3: '#020712',
        accent1: '#38bdf8',
        accent2: '#60a5fa',
        gold: '#ffd700',
        textLight: '#ffffff',
        textMuted: '#94a3b8',
        border: 'rgba(56, 189, 248, 0.55)',
        borderGradStart: '#38bdf8',
        borderGradEnd: '#ffd700',
        glow: 'rgba(56, 189, 248, 0.28)',
        cardBg: 'rgba(8, 22, 48, 0.75)',
        badgeBg: 'rgba(56, 189, 248, 0.22)',
        isLight: false,
      },
      gold: {
        bg1: '#07080c',
        bg2: '#13141b',
        bg3: '#050608',
        accent1: '#fbbf24',
        accent2: '#fef08a',
        gold: '#ffd700',
        textLight: '#ffffff',
        textMuted: '#cbd5e1',
        border: 'rgba(251, 191, 36, 0.65)',
        borderGradStart: '#fef08a',
        borderGradEnd: '#d97706',
        glow: 'rgba(251, 191, 36, 0.28)',
        cardBg: 'rgba(18, 19, 27, 0.82)',
        badgeBg: 'rgba(251, 191, 36, 0.24)',
        isLight: false,
      },
      cyber: {
        bg1: '#020b12',
        bg2: '#06212e',
        bg3: '#030f18',
        accent1: '#2dd4bf',
        accent2: '#22d3ee',
        gold: '#a855f7',
        textLight: '#ffffff',
        textMuted: '#94a3b8',
        border: 'rgba(45, 212, 191, 0.45)',
        borderGradStart: '#2dd4bf',
        borderGradEnd: '#22d3ee',
        glow: 'rgba(45, 212, 191, 0.25)',
        cardBg: 'rgba(6, 33, 46, 0.72)',
        badgeBg: 'rgba(45, 212, 191, 0.14)',
        isLight: false,
      },
      emerald: {
        bg1: '#020f09',
        bg2: '#062b1a',
        bg3: '#02120a',
        accent1: '#10b981',
        accent2: '#34d399',
        gold: '#fbbf24',
        textLight: '#ffffff',
        textMuted: '#a7f3d0',
        border: 'rgba(16, 185, 129, 0.45)',
        borderGradStart: '#10b981',
        borderGradEnd: '#34d399',
        glow: 'rgba(16, 185, 129, 0.25)',
        cardBg: 'rgba(6, 43, 26, 0.72)',
        badgeBg: 'rgba(16, 185, 129, 0.14)',
        isLight: false,
      },
      studio: {
        bg1: '#f8fafc',
        bg2: '#eef2f6',
        bg3: '#e2e8f0',
        accent1: '#0284c7',
        accent2: '#0f172a',
        gold: '#d97706',
        textLight: '#0f172a',
        textMuted: '#475569',
        border: 'rgba(15, 23, 42, 0.2)',
        borderGradStart: '#0284c7',
        borderGradEnd: '#38bdf8',
        glow: 'rgba(14, 165, 233, 0.12)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        badgeBg: 'rgba(14, 165, 233, 0.08)',
        isLight: true,
      },
    };

    const p = palettes[theme];

    // Preload App Logo (Strictly PNG format with fallback) & User Photo
    const [logoImg, userImg] = await Promise.all([
      loadImage('/assets/logo.png').then(async (img) => img || (await loadImage('/assets/app-logo.png')) || (await loadImage('/assets/logo.svg'))),
      userPhoto ? loadImage(userPhoto) : Promise.resolve(null),
    ]);

    // 1. Deep Atmospheric Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, p.bg1);
    bgGrad.addColorStop(0.45, p.bg2);
    bgGrad.addColorStop(1, p.bg3);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Cinematic Spotlights & Radial Ambience
    const spotTop = ctx.createRadialGradient(width / 2, 80, 20, width / 2, 80, 600);
    spotTop.addColorStop(0, p.glow);
    spotTop.addColorStop(1, 'transparent');
    ctx.fillStyle = spotTop;
    ctx.fillRect(0, 0, width, height);

    const spotBottom = ctx.createRadialGradient(width / 2, height - 100, 20, width / 2, height - 100, 650);
    spotBottom.addColorStop(0, p.glow);
    spotBottom.addColorStop(1, 'transparent');
    ctx.fillStyle = spotBottom;
    ctx.fillRect(0, 0, width, height);

    // 3. Stardust & Guilloche Watermark
    if (!p.isLight) {
      drawGuilloche(ctx, width / 2, isStory ? 680 : 540, 310, 'rgba(255, 255, 255, 0.025)');

      const sparkles = [
        [90, 110, 10], [990, 130, 14], [140, 410, 8], [940, 460, 12],
        [100, 780, 10], [980, 820, 14], [130, isStory ? 1420 : 960, 12],
        [950, isStory ? 1480 : 980, 15]
      ];
      sparkles.forEach(([sx, sy, sz]) => {
        drawSparkle(ctx, sx, sy, sz, p.gold);
      });

      // Anamorphic lens flare across the middle
      drawAnamorphicFlare(ctx, width / 2, isStory ? 710 : 370, 720, p.accent1);
    }

    // 4. Outer Metallic Double Border & Corner Brackets
    const framePad = 32;
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = p.border;
    ctx.beginPath();
    ctx.roundRect(framePad, framePad, width - framePad * 2, height - framePad * 2, 28);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = p.isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(framePad + 8, framePad + 8, width - (framePad + 8) * 2, height - (framePad + 8) * 2, 22);
    ctx.stroke();

    // Corner Brackets for High-Status Architectural Framing
    drawCornerBrackets(ctx, framePad + 14, framePad + 14, width - (framePad + 14) * 2, height - (framePad + 14) * 2, 28, p.gold);
    ctx.restore();

    // 5. Studio Header Area with High-Res PNG Logo
    const headerY = 58;
    if (logoImg) {
      ctx.save();
      // Glass squircle container
      ctx.fillStyle = p.badgeBg;
      ctx.beginPath();
      ctx.roundRect(64, headerY, 78, 78, 20);
      ctx.fill();

      // Glowing metallic border around logo
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = p.accent1;
      ctx.stroke();

      // Draw PNG logo crisply
      ctx.beginPath();
      ctx.roundRect(66, headerY + 2, 74, 74, 18);
      ctx.clip();
      ctx.drawImage(logoImg, 66, headerY + 2, 74, 74);
      ctx.restore();
    }

    // Studio Typography
    const titleX = logoImg ? 158 : 68;
    ctx.textAlign = 'left';
    ctx.fillStyle = p.textLight;
    ctx.font = '900 28px system-ui, -apple-system, sans-serif';
    ctx.fillText('AGE CALCULATOR BD', titleX, headerY + 29);

    ctx.fillStyle = p.accent1;
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText('✨ OFFICIAL LIFE CHRONICLE & MILESTONES ✨', titleX, headerY + 51);

    ctx.fillStyle = p.textMuted;
    ctx.font = '600 13px system-ui, sans-serif';
    ctx.fillText('VERIFIED DIGITAL ARCHIVE • POWERED BY VHIR TECH', titleX, headerY + 71);

    // Top Right Official Holographic Seal Stamp
    drawMovieSealStamp(ctx, width - 122, headerY + 39, 44, p.accent1, p.gold);

    // ==========================================
    // STORY FORMAT vs SQUARE FORMAT
    // ==========================================
    if (isStory) {
      // ------------------------------------------
      // 9:16 VERTICAL STORY MODE (1080 x 1920)
      // ------------------------------------------
      const avY = 200;
      const avSize = 170;
      const avX = 540 - avSize / 2;

      // Protagonist Avatar
      if (userImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(540, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(userImg, avX, avY, avSize, avSize);
        ctx.restore();

        // Dual Metallic Ring
        ctx.save();
        ctx.lineWidth = 5;
        ctx.strokeStyle = p.gold;
        ctx.beginPath();
        ctx.arc(540, avY + avSize / 2, avSize / 2 + 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = p.accent1;
        ctx.beginPath();
        ctx.arc(540, avY + avSize / 2, avSize / 2 + 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.save();
        const avGrad = ctx.createLinearGradient(avX, avY, avX + avSize, avY + avSize);
        avGrad.addColorStop(0, p.accent1);
        avGrad.addColorStop(0.5, p.gold);
        avGrad.addColorStop(1, p.accent2);
        ctx.fillStyle = avGrad;
        ctx.beginPath();
        ctx.arc(540, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#020612';
        ctx.font = '900 68px system-ui, sans-serif';
        ctx.textAlign = 'center';
        const initial = name.trim() ? name.trim().charAt(0).toUpperCase() : '★';
        ctx.fillText(initial, 540, avY + avSize / 2 + 24);
        ctx.restore();
      }

      ctx.textAlign = 'center';
      const displayName = name.trim() ? name.trim() : 'আমার জীবন খতিয়ান ও মাইলফলক';
      ctx.fillStyle = p.textLight;
      ctx.font = '900 48px system-ui, sans-serif';
      ctx.fillText(displayName, 540, avY + avSize + 56);

      // DOB & Day Pill
      const dobY = avY + avSize + 76;
      ctx.fillStyle = p.badgeBg;
      ctx.beginPath();
      ctx.roundRect(540 - 200, dobY, 400, 36, 12);
      ctx.fill();
      ctx.strokeStyle = p.gold;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = p.accent2;
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(`📅 জন্ম: ${dob || 'N/A'}  •  বার: ${ageResult.birthDayOfWeekBn}`, 540, dobY + 25);

      // Tagline Banner
      const quoteY = dobY + 54;
      const quoteW = width - 136;
      ctx.fillStyle = p.cardBg;
      ctx.beginPath();
      ctx.roundRect(68, quoteY, quoteW, 56, 18);
      ctx.fill();
      ctx.strokeStyle = p.gold;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = p.gold;
      ctx.font = 'bold 22px serif';
      ctx.fillText('“', 96, quoteY + 36);
      ctx.fillText('”', width - 96, quoteY + 36);

      ctx.fillStyle = p.textLight;
      ctx.font = 'italic 20px system-ui, sans-serif';
      ctx.fillText(customQuote.trim(), 540, quoteY + 35);

      // Monumental Hero Age Section
      const heroY = quoteY + 82;
      const heroH = 280;
      const heroW = width - 136;
      const heroX = 68;

      ctx.save();
      const heroGrad = ctx.createLinearGradient(heroX, heroY, heroX + heroW, heroY + heroH);
      heroGrad.addColorStop(0, p.cardBg);
      heroGrad.addColorStop(1, p.isLight ? 'rgba(240,249,255,0.95)' : 'rgba(12, 28, 58, 0.88)');
      ctx.fillStyle = heroGrad;
      ctx.beginPath();
      ctx.roundRect(heroX, heroY, heroW, heroH, 28);
      ctx.fill();

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = p.gold;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = p.gold;
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑 নিখুঁত বর্তমান বয়স • OFFICIAL AGE RECORD 👑', 540, heroY + 44);

      // 3 Monumental Pedestals for Year, Month, Day
      const colW = 276;
      const colH = 126;
      const colGap = 24;
      const startColX = heroX + (heroW - (colW * 3 + colGap * 2)) / 2;
      const colY = heroY + 68;

      const capsStory = [
        { num: ageResult.years, unit: 'বছর / YEARS' },
        { num: ageResult.months, unit: 'মাস / MONTHS' },
        { num: ageResult.days, unit: 'দিন / DAYS' },
      ];

      capsStory.forEach((c, idx) => {
        const cx = startColX + idx * (colW + colGap);
        ctx.fillStyle = p.badgeBg;
        ctx.beginPath();
        ctx.roundRect(cx, colY, colW, colH, 20);
        ctx.fill();
        ctx.strokeStyle = p.gold;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = p.textLight;
        ctx.font = '900 66px system-ui, sans-serif';
        ctx.fillText(`${c.num}`, cx + colW / 2, colY + 74);

        ctx.fillStyle = p.accent1;
        ctx.font = 'bold 17px system-ui, sans-serif';
        ctx.fillText(c.unit, cx + colW / 2, colY + 108);
      });

      // Precision Live Temporal Counter Ribbon
      ctx.fillStyle = p.textMuted;
      ctx.font = '600 18px ui-monospace, SFMono-Regular, monospace';
      ctx.fillText(
        `⏰ মোট অতিক্রান্ত: ${ageResult.totalDays.toLocaleString()} দিন • ${ageResult.totalHours.toLocaleString()} ঘণ্টা • ${ageResult.hours}h ${ageResult.minutes}m ${ageResult.seconds}s`,
        540,
        heroY + 236
      );

      // Grid of 6 Selected Metrics
      const metricsToRender = ALL_METRIC_OPTIONS.filter((m) => selectedMetrics.includes(m.id)).slice(0, MAX_SELECTED_METRICS);
      const gridStartY = heroY + heroH + 34;
      const statW = 444;
      const statH = 152;
      const gapX = 48;
      const gapY = 22;

      metricsToRender.forEach((m, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const sx = 68 + col * (statW + gapX);
        const sy = gridStartY + row * (statH + gapY);

        ctx.fillStyle = p.cardBg;
        ctx.beginPath();
        ctx.roundRect(sx, sy, statW, statH, 24);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = p.border;
        ctx.stroke();

        // Illuminated Vibrant Icon Disc
        const ir = 34;
        const ix = sx + 52;
        const iy = sy + statH / 2;
        const discGrad = ctx.createRadialGradient(ix, iy, 2, ix, iy, ir);
        discGrad.addColorStop(0, p.isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255, 255, 255, 0.28)');
        discGrad.addColorStop(0.55, p.badgeBg);
        discGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        ctx.fillStyle = discGrad;
        ctx.beginPath();
        ctx.arc(ix, iy, ir, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = p.gold;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = '32px system-ui, sans-serif';
        ctx.fillText(m.icon, ix, iy + 10);

        // Category Badge
        ctx.fillStyle = p.badgeBg;
        ctx.beginPath();
        ctx.roundRect(sx + statW - 116, sy + 14, 102, 24, 8);
        ctx.fill();
        ctx.fillStyle = p.accent1;
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText(m.badge.toUpperCase(), sx + statW - 65, sy + 30);

        // Label & Value
        ctx.textAlign = 'left';
        ctx.fillStyle = p.textMuted;
        ctx.font = '600 17px system-ui, sans-serif';
        ctx.fillText(m.label, sx + 98, sy + 58);

        ctx.fillStyle = p.textLight;
        ctx.font = '900 34px system-ui, -apple-system, sans-serif';
        ctx.fillText(m.getValue(ageResult), sx + 98, sy + 108);
      });

      // Story Footer - Hollywood Billing Block
      const footerY = 1760;
      const footerH = 100;
      const footerW = width - 136;
      ctx.fillStyle = p.isLight ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.85)';
      ctx.beginPath();
      ctx.roundRect(68, footerY, footerW, footerH, 22);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = p.border;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = p.textLight;
      ctx.font = '900 22px system-ui, sans-serif';
      ctx.fillText('⚡ PRODUCED & CERTIFIED BY AGE CALCULATOR BD • VHIR TECH ⚡', 540, footerY + 38);

      ctx.fillStyle = p.accent1;
      ctx.font = '600 16px system-ui, sans-serif';
      ctx.fillText('অফিশিয়াল লাইফ রেকর্ড ও কোটা হিসেব • AGE.VHIRTECH.SHOP এ আপনার কার্ড বানান', 540, footerY + 65);

      ctx.fillStyle = p.textMuted;
      ctx.font = '500 13px ui-monospace, monospace';
      ctx.fillText(`ID: BD-2026-CHRONO-${ageResult.totalDays}  •  100% MATHEMATICAL INTEGRITY  •  FREE PUBLIC SERVICE`, 540, footerY + 86);
    } else {
      // ------------------------------------------
      // 1:1 SQUARE POST MODE (1080 x 1080)
      // ------------------------------------------
      const profY = 156;
      const avatarSize = 104;
      const avatarX = 68;

      // Protagonist Avatar
      if (userImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, profY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(userImg, avatarX, profY, avatarSize, avatarSize);
        ctx.restore();

        ctx.save();
        ctx.lineWidth = 4;
        ctx.strokeStyle = p.gold;
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, profY + avatarSize / 2, avatarSize / 2 + 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.save();
        const avGrad = ctx.createLinearGradient(avatarX, profY, avatarX + avatarSize, profY + avatarSize);
        avGrad.addColorStop(0, p.accent1);
        avGrad.addColorStop(0.5, p.gold);
        avGrad.addColorStop(1, p.accent2);
        ctx.fillStyle = avGrad;
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, profY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#020612';
        ctx.font = '900 48px system-ui, sans-serif';
        ctx.textAlign = 'center';
        const initial = name.trim() ? name.trim().charAt(0).toUpperCase() : '★';
        ctx.fillText(initial, avatarX + avatarSize / 2, profY + avatarSize / 2 + 16);
        ctx.restore();
      }

      const textX = avatarX + avatarSize + 24;
      ctx.textAlign = 'left';

      const displayName = name.trim() ? name.trim() : 'আমার জীবন খতিয়ান ও মাইলফলক';
      ctx.fillStyle = p.textLight;
      ctx.font = '900 36px system-ui, sans-serif';
      ctx.fillText(displayName, textX, profY + 34);

      // DOB & Bar pill
      ctx.fillStyle = p.badgeBg;
      ctx.beginPath();
      ctx.roundRect(textX, profY + 44, 380, 28, 8);
      ctx.fill();
      ctx.strokeStyle = p.gold;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = p.accent2;
      ctx.font = 'bold 15px system-ui, sans-serif';
      ctx.fillText(`📅 জন্ম: ${dob || 'N/A'}  •  বার: ${ageResult.birthDayOfWeekBn}`, textX + 12, profY + 63);

      // Tagline Quote Pill
      const quoteText = customQuote.trim() ? `“${customQuote.trim()}”` : '“জীবনের প্রতিটি সেকেন্ড এক অপার সম্ভাবনা ও নিয়ামত ✨”';
      ctx.fillStyle = p.badgeBg;
      ctx.beginPath();
      ctx.roundRect(textX, profY + 78, width - textX - 68, 34, 10);
      ctx.fill();
      ctx.strokeStyle = p.gold;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = p.textLight;
      ctx.font = 'italic 15px system-ui, sans-serif';
      const maxQuoteW = width - textX - 90;
      let renderedQuote = quoteText;
      if (ctx.measureText(renderedQuote).width > maxQuoteW) {
        while (ctx.measureText(renderedQuote + '...').width > maxQuoteW && renderedQuote.length > 5) {
          renderedQuote = renderedQuote.slice(0, -1);
        }
        renderedQuote += '...';
      }
      ctx.fillText(renderedQuote, textX + 14, profY + 100);

      // Monumental Hero Age Pedestal Box
      const heroY = 280;
      const heroH = 176;
      const heroW = width - 136;
      const heroX = 68;

      ctx.save();
      const heroGrad = ctx.createLinearGradient(heroX, heroY, heroX + heroW, heroY + heroH);
      heroGrad.addColorStop(0, p.cardBg);
      heroGrad.addColorStop(1, p.isLight ? 'rgba(240,249,255,0.92)' : 'rgba(12, 28, 58, 0.85)');
      ctx.fillStyle = heroGrad;
      ctx.beginPath();
      ctx.roundRect(heroX, heroY, heroW, heroH, 24);
      ctx.fill();

      // Gold Metallic Border
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = p.gold;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = p.gold;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑 নিখুঁত বর্তমান বয়স • OFFICIAL AGE RECORD 👑', width / 2, heroY + 30);

      // 3 Monumental Pedestals
      const colW = 276;
      const colH = 82;
      const colY = heroY + 44;
      const gapCols = 22;
      const startColX = heroX + (heroW - (colW * 3 + gapCols * 2)) / 2;

      const ageUnits = [
        { val: ageResult.years, label: 'বছর / YEARS' },
        { val: ageResult.months, label: 'মাস / MONTHS' },
        { val: ageResult.days, label: 'দিন / DAYS' },
      ];

      ageUnits.forEach((unit, idx) => {
        const ux = startColX + idx * (colW + gapCols);

        ctx.save();
        ctx.fillStyle = p.badgeBg;
        ctx.beginPath();
        ctx.roundRect(ux, colY, colW, colH, 16);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = p.gold;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillStyle = p.textLight;
        ctx.font = '900 48px system-ui, -apple-system, sans-serif';
        ctx.fillText(`${unit.val}`, ux + colW / 2, colY + 52);

        ctx.fillStyle = p.accent1;
        ctx.font = 'bold 13px system-ui, sans-serif';
        ctx.fillText(unit.label, ux + colW / 2, colY + 74);
        ctx.restore();
      });

      // Precision Live Temporal Ribbon
      ctx.textAlign = 'center';
      ctx.fillStyle = p.textMuted;
      ctx.font = '600 15px ui-monospace, SFMono-Regular, monospace';
      ctx.fillText(
        `⏰ মোট অতিক্রান্ত: ${ageResult.totalDays.toLocaleString()} দিন  •  ${ageResult.totalHours.toLocaleString()} ঘণ্টা  •  ${ageResult.hours}h ${ageResult.minutes}m ${ageResult.seconds}s`,
        width / 2,
        heroY + 152
      );

      // 6 Selected Metrics Grid
      const metricsToRender = ALL_METRIC_OPTIONS.filter((m) => selectedMetrics.includes(m.id)).slice(0, MAX_SELECTED_METRICS);
      const startY = 472;
      const cardW = 452;
      const cardH = 126;
      const gapX = 40;
      const gapY = 16;
      const gridStartX = 68;

      metricsToRender.forEach((m, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const cx = gridStartX + col * (cardW + gapX);
        const cy = startY + row * (cardH + gapY);

        ctx.save();
        ctx.fillStyle = p.cardBg;
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, cardH, 20);
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = p.border;
        ctx.stroke();

        // Illuminated Vibrant Icon Disc
        const ir = 30;
        const ix = cx + 48;
        const iy = cy + cardH / 2;
        const discGrad = ctx.createRadialGradient(ix, iy, 2, ix, iy, ir);
        discGrad.addColorStop(0, p.isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255, 255, 255, 0.28)');
        discGrad.addColorStop(0.55, p.badgeBg);
        discGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        ctx.fillStyle = discGrad;
        ctx.beginPath();
        ctx.arc(ix, iy, ir, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = p.gold;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = '30px system-ui, sans-serif';
        ctx.fillText(m.icon, ix, iy + 10);

        // Category Badge
        ctx.fillStyle = p.badgeBg;
        ctx.beginPath();
        ctx.roundRect(cx + cardW - 124, cy + 12, 112, 24, 7);
        ctx.fill();
        ctx.strokeStyle = p.gold;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = p.gold;
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m.badge.toUpperCase(), cx + cardW - 68, cy + 28);

        // Label & Hero Value
        ctx.textAlign = 'left';
        ctx.fillStyle = p.textMuted;
        ctx.font = '600 16px system-ui, sans-serif';
        ctx.fillText(m.label, cx + 90, cy + 48);

        ctx.fillStyle = p.textLight;
        ctx.font = '900 30px system-ui, -apple-system, sans-serif';
        ctx.fillText(m.getValue(ageResult), cx + 90, cy + 94);
        ctx.restore();
      });

      // Footer - Hollywood Billing Block
      const footerY = 920;
      const footerH = 92;
      const footerW = width - 136;
      const footerX = 68;

      ctx.save();
      ctx.fillStyle = p.isLight ? 'rgba(0,0,0,0.04)' : 'rgba(0, 0, 0, 0.8)';
      ctx.beginPath();
      ctx.roundRect(footerX, footerY, footerW, footerH, 20);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = p.border;
      ctx.stroke();

      drawSparkle(ctx, width / 2, footerY + 12, 6, p.gold);

      ctx.textAlign = 'center';
      ctx.fillStyle = p.textLight;
      ctx.font = '900 20px system-ui, sans-serif';
      ctx.fillText('⚡ PRODUCED & CERTIFIED BY AGE CALCULATOR BD  •  VHIR TECH ⚡', width / 2, footerY + 38);

      ctx.fillStyle = p.accent1;
      ctx.font = '600 15px system-ui, sans-serif';
      ctx.fillText('অফিশিয়াল লাইফ রেকর্ড ও কোটা হিসেব • AGE.VHIRTECH.SHOP এ আপনার কার্ড বানান', width / 2, footerY + 62);

      ctx.fillStyle = p.textMuted;
      ctx.font = '500 12px ui-monospace, monospace';
      ctx.fillText(`ID: BD-2026-CHRONO-${ageResult.totalDays}  •  100% MATHEMATICAL INTEGRITY  •  FREE PUBLIC SERVICE`, width / 2, footerY + 80);
      ctx.restore();
    }
  }, [theme, format, name, customQuote, userPhoto, selectedMetrics, ageResult, dob]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        drawCard();
      }, 50);
    }
  }, [isOpen, drawCard]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);
    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `MilestoneCard-${format}-${ageResult.years}y.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    const shareText = `🎂 আমার বয়স: ${ageResult.years} বছর, ${ageResult.months} মাস, ${ageResult.days} দিন!\n✨ ${customQuote}\n\n🔗 আপনার বয়স ও কার্ড তৈরি করুন: https://age.vhirtech.shop\n⚡ Powered by VHIR Tech`;

    try {
      if (navigator.share) {
        canvas.toBlob(async (blob) => {
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'milestone-card.png', { type: 'image/png' })] })) {
            const file = new File([blob], 'milestone-card.png', { type: 'image/png' });
            await navigator.share({
              title: 'আমার জীবন মাইলফলক কার্ড - Age Calculator BD',
              text: shareText,
              files: [file],
            });
          } else {
            await navigator.share({
              title: 'আমার জীবন মাইলফলক কার্ড - Age Calculator BD',
              text: shareText,
              url: 'https://age.vhirtech.shop',
            });
          }
        }, 'image/png');
      } else {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      } catch { /* */ }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070e1c] p-4 sm:p-6 shadow-2xl my-auto max-h-[96vh] overflow-y-auto text-slate-900 dark:text-white">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <h3 className="text-base sm:text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <span>✨</span> অফিশিয়াল লাইফ রেকর্ড ও প্রোফাইল কার্ড
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সোশ্যাল মিডিয়া পোস্ট ও স্টোরির জন্য আল্ট্রা-এইচডি কার্ড কাস্টমাইজেশন
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 dark:bg-slate-800/80 p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Settings Panel */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Format Selector: Square vs Story */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                কার্ডের সাইজ ও লেআউট:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('square')}
                  className={`rounded-xl border py-2 px-3 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    format === 'square'
                      ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-300 shadow-sm'
                      : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>🖼️</span> স্কয়ার পোস্ট (1:1)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('story')}
                  className={`rounded-xl border py-2 px-3 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    format === 'story'
                      ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-300 shadow-sm'
                      : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>📱</span> মোবাইল স্টোরি (9:16)
                </button>
              </div>
            </div>

            {/* Custom Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                আপনার নাম (ঐচ্ছিক):
              </label>
              <input
                type="text"
                placeholder="যেমন: তানভীর আহমেদ / Tanvir Ahmed"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900/90 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Custom Quote / Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                ব্যক্তিগত বাণী বা নোট (Custom Note):
              </label>
              <input
                type="text"
                placeholder="যেমন: জীবনের প্রতিটি মুহূর্তের জন্য কৃতজ্ঞ..."
                value={customQuote}
                onChange={(e) => setCustomQuote(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900/90 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-1.5"
              />
              <div className="flex flex-wrap gap-1">
                {PRESET_QUOTES.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomQuote(q)}
                    className="rounded-md border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
                  >
                    {idx === 0 && '✨ কৃতজ্ঞতা'}
                    {idx === 1 && '🌙 শুকরিয়া'}
                    {idx === 2 && '🌍 Life'}
                    {idx === 3 && '🚀 স্বপ্ন'}
                    {idx === 4 && '🕊️ সম্প্রীতি'}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  📸 নিজের ছবি যুক্ত করুন:
                </label>
                {userPhoto && (
                  <button
                    type="button"
                    onClick={() => setUserPhoto(null)}
                    className="text-[10px] text-rose-500 hover:text-rose-600 font-semibold"
                  >
                    মুছুন ✕
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-sky-500/20 file:text-sky-700 dark:file:text-sky-300 hover:file:bg-sky-500/30 cursor-pointer"
              />
            </div>

            {/* Theme Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                কার্ড আর্টওয়ার্ক থিম:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'navy', label: 'সিনেমাটিক নেভি', color: 'from-blue-600 via-sky-400 to-amber-300' },
                  { id: 'gold', label: 'হলিউড গোল্ড', color: 'from-amber-400 via-yellow-500 to-amber-600' },
                  { id: 'cyber', label: 'সাইবার নিয়ন', color: 'from-teal-400 via-cyan-400 to-purple-500' },
                  { id: 'emerald', label: 'ইম্পেরিয়াল এমারেল্ড', color: 'from-emerald-400 via-teal-600 to-amber-300' },
                  { id: 'studio', label: 'স্টুডিও হোয়াইট', color: 'from-slate-200 via-sky-200 to-slate-400' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id as CardTheme)}
                    className={`rounded-xl border p-1.5 text-center text-[10px] font-medium transition-all cursor-pointer ${
                      theme === th.id
                        ? 'border-sky-500 bg-sky-500/10 text-sky-700 dark:text-white shadow-sm scale-102'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className={`mx-auto mb-1 h-3 w-full rounded bg-gradient-to-r ${th.color}`} />
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Selectors with Category Tabs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  কার্ডে কোন তথ্যগুলো রাখবেন:
                </label>
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
                  {selectedMetrics.length}/{MAX_SELECTED_METRICS} টি নির্বাচিত
                </span>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1 mb-2">
                {[
                  { id: 'all' as const, label: 'সবগুলো' },
                  { id: 'core' as const, label: '📅 সময়' },
                  { id: 'lifestyle' as const, label: '🏖️ ছুটি' },
                  { id: 'spiritual' as const, label: '🕌 জুমা/রমজান' },
                  { id: 'biology' as const, label: '💓 স্বাস্থ্য' },
                  { id: 'cosmic' as const, label: '🚀 মহাজাগতিক' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-lg px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs max-h-56 overflow-y-auto pr-1">
                {filteredOptions.map((item) => {
                  const isChecked = selectedMetrics.includes(item.id);
                  const isDisabled = !isChecked && selectedMetrics.length >= MAX_SELECTED_METRICS;
                  return (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-2 rounded-xl border p-2 transition-all ${
                        isChecked
                          ? 'border-sky-500/50 bg-sky-500/10 text-slate-900 dark:text-white shadow-2xs'
                          : isDisabled
                          ? 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/80'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => toggleMetric(item.id)}
                        className="mt-0.5 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sky-500 focus:ring-sky-400/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs">{item.icon}</span>
                          <span className="text-[9px] font-bold rounded px-1.5 py-0.2 bg-sky-500/15 text-sky-600 dark:text-sky-300">
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-[11px] font-bold truncate leading-tight">{item.label}</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{item.sublabel}</div>
                        <div className="text-[10px] font-black text-sky-600 dark:text-sky-300 mt-1">
                          {item.getValue(ageResult)}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                💡 সর্বোচ্চ {MAX_SELECTED_METRICS}টি অপশন নির্বাচন করা যাবে।
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="btn-neon flex-1 rounded-xl py-3 text-xs font-bold text-slate-950 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-sky-500/20"
              >
                <span>📥</span> ডাউনলোড ({format === 'story' ? '১০৮০×১৯২০ স্টোরি' : '১০৮০×১০৮০ পোস্ট'})
              </button>
              <button
                onClick={handleShare}
                disabled={isGenerating}
                className="flex-1 rounded-xl border border-sky-500/30 bg-slate-100 dark:bg-slate-800/80 py-3 text-xs font-bold text-sky-700 dark:text-sky-300 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>🚀</span> {isCopied ? 'কপি হয়েছে ✅' : 'শেয়ার বা কপি'}
              </button>
            </div>
          </div>

          {/* Canvas Live Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-100 dark:bg-black/50 rounded-2xl p-2 sm:p-4 border border-slate-200 dark:border-white/5">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 font-mono flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-500 animate-ping" />
              রেটিনা এইচডি লাইভ প্রিভিউ ({format === 'story' ? '১০৮০ × ১৯২০ মোবাইল স্টোরি' : '১০৮০ × ১০৮০ স্কয়ার পোস্ট'})
            </div>
            <div
              className={`relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-300 dark:border-white/10 ${
                format === 'story'
                  ? 'max-w-[280px] sm:max-w-[320px] aspect-[9/16]'
                  : 'max-w-[360px] sm:max-w-[420px] aspect-square'
              }`}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
