/**
 * AdSlot — Pre-allocated ad spaces for Google AdSense (Zero CLS)
 */

interface AdSlotProps {
  id: string;
  width?: string;
  height?: string;
  className?: string;
  label?: string;
}

export default function AdSlot({
  id,
  width = '100%',
  height = '90px',
  className = '',
  label = 'Advertisement',
}: AdSlotProps) {
  return (
    <div
      id={id}
      className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-700/20 bg-slate-800/10 ${className}`}
      style={{ width, minHeight: height }}
      aria-label={label}
      role="complementary"
    >
      <span className="text-[10px] tracking-widest text-slate-600/50 uppercase select-none">{label}</span>
    </div>
  );
}
