/**
 * 「我的教室」家具单件 — 自包含 SVG,零图片。来源:Claude Design 交付(Furniture.dc.html),已转 TS。
 * 颜色用 CSS 变量(--wood/--wood-dk/--leaf/--leaf-dk/--gold/--paper-2),由 MyClassroom 根节点提供。
 */

export type FurnitureType = 'lectern' | 'studentDesk' | 'plant' | 'globe' | 'rug';

export default function Furniture({ type }: { type: FurnitureType }) {
  if (type === 'lectern') {
    return (
      <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block', overflow: 'visible' }}>
        <rect x="16" y="26" width="168" height="14" rx="3" fill="var(--wood-dk)" />
        <rect x="16" y="26" width="168" height="4" rx="2" fill="var(--gold)" opacity="0.5" />
        <path d="M50 40 H150 L142 138 H58 Z" fill="var(--wood)" />
        <path d="M72 58 H128 V118 H72 Z" fill="var(--wood-dk)" opacity="0.32" />
        <rect x="60" y="40" width="80" height="3" fill="#00000022" />
      </svg>
    );
  }
  if (type === 'studentDesk') {
    return (
      <svg viewBox="0 0 200 170" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block', overflow: 'visible' }}>
        <rect x="120" y="40" width="14" height="64" rx="4" fill="var(--wood-dk)" />
        <rect x="100" y="96" width="58" height="12" rx="3" fill="var(--wood)" />
        <rect x="104" y="108" width="8" height="50" rx="2" fill="var(--wood-dk)" />
        <rect x="148" y="108" width="8" height="50" rx="2" fill="var(--wood-dk)" />
        <rect x="26" y="62" width="118" height="14" rx="3" fill="var(--wood)" />
        <rect x="26" y="62" width="118" height="4" rx="2" fill="var(--gold)" opacity="0.4" />
        <rect x="34" y="76" width="9" height="82" rx="2" fill="var(--wood-dk)" />
        <rect x="126" y="76" width="9" height="82" rx="2" fill="var(--wood-dk)" />
        <rect x="34" y="110" width="101" height="8" rx="2" fill="var(--wood-dk)" opacity="0.7" />
      </svg>
    );
  }
  if (type === 'plant') {
    return (
      <svg viewBox="0 0 160 210" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block', overflow: 'visible' }}>
        <path d="M80 122 C40 112 30 60 58 36 C72 70 86 94 80 122 Z" fill="var(--leaf-dk)" />
        <path d="M80 122 C120 112 132 58 102 34 C88 70 74 94 80 122 Z" fill="var(--leaf)" />
        <path d="M80 124 C70 72 80 36 80 16 C94 50 94 88 80 124 Z" fill="var(--leaf)" />
        <path d="M80 124 C58 86 50 66 42 72 C56 98 70 114 80 124 Z" fill="var(--leaf-dk)" opacity="0.9" />
        <rect x="48" y="120" width="64" height="14" rx="3" fill="var(--wood-dk)" />
        <path d="M52 134 H108 L100 190 H60 Z" fill="var(--wood)" />
        <path d="M52 134 H108 L106 148 H54 Z" fill="#00000018" />
      </svg>
    );
  }
  if (type === 'globe') {
    return (
      <svg viewBox="0 0 170 210" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block', overflow: 'visible' }}>
        <ellipse cx="85" cy="192" rx="42" ry="10" fill="var(--wood-dk)" />
        <rect x="80" y="148" width="10" height="46" rx="3" fill="var(--wood)" />
        <circle cx="85" cy="90" r="66" fill="none" stroke="var(--gold)" strokeWidth="5" />
        <circle cx="85" cy="90" r="58" fill="#7fae9d" />
        <path d="M58 68 C70 60 86 68 84 82 C82 94 64 94 56 84 Z" fill="var(--leaf)" />
        <path d="M98 96 C112 90 124 100 118 112 C112 122 96 118 96 106 Z" fill="var(--leaf)" />
        <path d="M70 110 C78 106 88 112 84 120 C80 126 70 124 70 116 Z" fill="var(--leaf-dk)" opacity="0.8" />
        <path d="M85 32 A58 58 0 0 1 85 148" fill="none" stroke="var(--gold)" strokeWidth="3" opacity="0.55" />
        <circle cx="85" cy="90" r="58" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.16" />
      </svg>
    );
  }
  // rug
  return (
    <svg viewBox="0 0 240 110" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', overflow: 'visible' }}>
      <ellipse cx="120" cy="58" rx="116" ry="46" fill="var(--paper-2)" />
      <ellipse cx="120" cy="58" rx="116" ry="46" fill="none" stroke="var(--gold)" strokeWidth="4" />
      <ellipse cx="120" cy="58" rx="92" ry="34" fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.5" />
      <ellipse cx="120" cy="58" rx="42" ry="15" fill="var(--gold)" opacity="0.16" />
    </svg>
  );
}
