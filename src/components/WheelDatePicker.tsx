'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type InputMode = 'wheel' | 'type' | 'calendar';

interface WheelDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  maxDate?: string;
}

const ITEM_H = 48;
const MIN_YEAR = 1940;
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function daysIn(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function fmt(y: number, m: number, d: number) {
  return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

/* ====== SCROLL WHEEL COLUMN ====== */
function WheelCol({ label, items, selected, onPick }: {
  label: string; items: string[]; selected: number; onPick: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const snap = useRef<ReturnType<typeof setTimeout>|null>(null);
  const mounted = useRef(false);

  const go = useCallback((i: number, smooth = true) => {
    const safe = Math.max(0, Math.min(i, items.length - 1));
    ref.current?.scrollTo({ top: safe * ITEM_H, behavior: smooth ? 'smooth' : 'auto' });
    onPick(safe);
  }, [items.length, onPick]);

  useEffect(() => {
    if (!ref.current) return;
    const top = selected * ITEM_H;
    if (!mounted.current) {
      ref.current.scrollTo({ top, behavior: 'auto' });
      mounted.current = true;
    } else if (Math.abs(ref.current.scrollTop - top) > 3) {
      ref.current.scrollTo({ top, behavior: 'smooth' });
    }
  }, [selected]);

  useEffect(() => () => { if (snap.current) clearTimeout(snap.current); }, []);

  const onScroll = () => {
    if (snap.current) clearTimeout(snap.current);
    snap.current = setTimeout(() => {
      if (!ref.current) return;
      const idx = Math.max(0, Math.min(items.length - 1, Math.round(ref.current.scrollTop / ITEM_H)));
      ref.current.scrollTo({ top: idx * ITEM_H, behavior: 'smooth' });
      if (idx !== selected) onPick(idx);
    }, 80);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-400/80">{label}</span>
      <button type="button" className="whl-btn" onClick={() => go(selected - 1)}>▲</button>
      <div className="whl-shell w-full">
        <div className="whl-fade-t" />
        <div className="whl-bar" />
        <div className="whl-fade-b" />
        <div ref={ref} className="whl-scroll" onScroll={onScroll} style={{ paddingTop: ITEM_H * 2, paddingBottom: ITEM_H * 2 }}>
          {items.map((it, i) => {
            const d = Math.abs(i - selected);
            return (
              <button key={`${label}-${it}`} type="button"
                className={`whl-item ${d === 0 ? 'sel' : d === 1 ? 'near' : ''}`}
                style={{ height: ITEM_H }}
                onClick={() => go(i)}
              >{it}</button>
            );
          })}
        </div>
      </div>
      <button type="button" className="whl-btn" onClick={() => go(selected + 1)}>▼</button>
    </div>
  );
}

/* ====== MAIN COMPONENT ====== */
export default function WheelDatePicker({ value, onChange, maxDate }: WheelDatePickerProps) {
  const now = new Date();
  const curYear = now.getFullYear();
  const maxD = maxDate ? new Date(`${maxDate}T00:00:00`) : null;
  const years = useMemo(() => Array.from({ length: curYear - MIN_YEAR + 1 }, (_, i) => curYear - i), [curYear]);

  const parse = useCallback((v: string) => {
    if (v) { const d = new Date(`${v}T00:00:00`); if (!isNaN(d.getTime())) return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() }; }
    return { y: 2000, m: 0, d: 1 };
  }, []);

  const init = parse(value);
  const [y, setY] = useState(init.y);
  const [m, setM] = useState(init.m);
  const [d, setD] = useState(init.d);
  const [mode, setMode] = useState<InputMode>('wheel');
  const [typeDay, setTypeDay] = useState('');
  const [typeMonth, setTypeMonth] = useState('');
  const [typeYear, setTypeYear] = useState('');

  const days = useMemo(() => Array.from({ length: daysIn(y, m) }, (_, i) => String(i + 1).padStart(2, '0')), [y, m]);

  useEffect(() => { const p = parse(value); setY(p.y); setM(p.m); setD(p.d); }, [value, parse]);

  const apply = useCallback((ny: number, nm: number, nd: number) => {
    let sd = Math.min(nd, daysIn(ny, nm));
    let dt = new Date(ny, nm, sd);
    if (maxD && dt > maxD) dt = maxD;
    const fy = dt.getFullYear(), fm = dt.getMonth(), fd = dt.getDate();
    setY(fy); setM(fm); setD(fd);
    onChange(fmt(fy, fm, fd));
  }, [maxD, onChange]);

  const applyTyped = () => {
    const td = parseInt(typeDay), tm = parseInt(typeMonth), ty = parseInt(typeYear);
    if (!td || !tm || !ty || td < 1 || td > 31 || tm < 1 || tm > 12 || ty < MIN_YEAR || ty > curYear) return;
    apply(ty, tm - 1, td);
  };

  const yIdx = Math.max(0, years.indexOf(y));
  const mIdx = m;
  const dIdx = Math.max(0, d - 1);

  const formatted = value
    ? new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    : null;

  const modes: { key: InputMode; icon: string; label: string }[] = [
    { key: 'wheel', icon: '🎡', label: 'Wheel' },
    { key: 'type', icon: '⌨️', label: 'Type' },
    { key: 'calendar', icon: '📅', label: 'Calendar' },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      {/* MODE SELECTOR */}
      <div className="mb-4 flex items-center justify-center gap-1">
        {modes.map((md) => (
          <button
            key={md.key}
            type="button"
            onClick={() => setMode(md.key)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold transition-all
              ${mode === md.key
                ? 'bg-gradient-to-r from-sky-500/15 to-violet-500/15 text-sky-300 shadow-inner border border-sky-500/15'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
          >
            <span className="text-sm">{md.icon}</span>
            {md.label}
          </button>
        ))}
      </div>

      {/* WHEEL MODE */}
      {mode === 'wheel' && (
        <>
          <p className="mb-3 text-center text-[11px] text-slate-500">
            👆 Swipe / scroll / click arrows
          </p>
          <div className="flex gap-2">
            <WheelCol label="Day" items={days} selected={dIdx}
              onPick={(i) => apply(y, m, i + 1)} />
            <WheelCol label="Month" items={MONTHS} selected={mIdx}
              onPick={(i) => apply(y, i, d)} />
            <WheelCol label="Year" items={years.map(String)} selected={yIdx}
              onPick={(i) => apply(years[i], m, d)} />
          </div>
        </>
      )}

      {/* TYPE MODE */}
      {mode === 'type' && (
        <div className="space-y-3">
          <p className="text-center text-[11px] text-slate-500">
            ⌨️ নিচে দিন, মাস, বছর লিখুন
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-sky-400/80">Day</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="DD"
                min="1" max="31"
                value={typeDay}
                onChange={(e) => setTypeDay(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-3.5 text-center text-lg font-bold text-white outline-none transition-all focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/15"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-sky-400/80">Month</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="MM"
                min="1" max="12"
                value={typeMonth}
                onChange={(e) => setTypeMonth(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-3.5 text-center text-lg font-bold text-white outline-none transition-all focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/15"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-sky-400/80">Year</label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="YYYY"
                min={MIN_YEAR} max={curYear}
                value={typeYear}
                onChange={(e) => setTypeYear(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-3.5 text-center text-lg font-bold text-white outline-none transition-all focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/15"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={applyTyped}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500/20 to-violet-500/20 py-3 text-sm font-bold text-sky-300 border border-sky-500/15 transition-all hover:from-sky-500/30 hover:to-violet-500/30"
          >
            ✅ তারিখ সেট করুন
          </button>
        </div>
      )}

      {/* CALENDAR MODE */}
      {mode === 'calendar' && (
        <div className="space-y-3">
          <p className="text-center text-[11px] text-slate-500">
            📅 ক্যালেন্ডার থেকে তারিখ বাছুন
          </p>
          <input
            type="date"
            value={value}
            onChange={(e) => { if (e.target.value) onChange(e.target.value); }}
            max={maxDate}
            className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-4 text-center text-base font-bold text-white outline-none transition-all focus:border-sky-400/40 focus:ring-2 focus:ring-sky-400/15 [color-scheme:dark]"
          />
        </div>
      )}

      {/* SELECTED DATE DISPLAY */}
      {formatted && (
        <div className="mt-4 rounded-2xl border border-sky-400/10 bg-gradient-to-r from-sky-400/5 via-violet-400/5 to-teal-400/5 px-3 py-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300/60">Selected Date</p>
          <p className="mt-1 text-base font-extrabold text-white">{formatted}</p>
        </div>
      )}
    </div>
  );
}
