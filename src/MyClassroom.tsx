import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react';
import Furniture, { type FurnitureType } from './Furniture';

/**
 * 「我的教室」养成 Hub — 学习进度可视化成一间会长大的教室。
 * 来源:Claude Design 交付(MyClassroom.dc.html + Furniture.dc.html),已转 TS。
 * 自包含,零图片(教室/家具/书架全 CSS+SVG)。必须渲染在 .stage(有 transform)之外,自带 16:9 缩放。
 */

const KEYFRAMES = `
@keyframes cl-drop { 0% { opacity: 0; transform: translateY(-20px) scale(0.94); } 60% { opacity: 1; transform: translateY(3px) scale(1.01); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes cl-sun { 0%,100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.05); opacity: 1; } }
@keyframes cl-glow { 0%,100% { opacity: 0.35; } 50% { opacity: 0.7; } }
@keyframes cl-panel { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: translateX(0); } }
@keyframes cl-pop { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes cl-fade { from { opacity: 0; } to { opacity: 1; } }
.mc-cell:hover { border-color: var(--gold) !important; background: linear-gradient(180deg,#335249,#264a41) !important; }
.mc-chip:hover { border-color: var(--gold) !important; background: #ffffff1e !important; }
.mc-btn:hover { background: #ffffff1f !important; }
.mc-more:hover { border-color: var(--gold-hi) !important; }
.mc-slot:hover { transform: translateY(-5px); }
.mc-x:hover { background: #ffffff14 !important; }
`;

function useKeyframes() {
  useEffect(() => {
    const id = 'my-classroom-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
  }, []);
}

export type ClassModule = { name: string; total: number; mastered: number; learned?: number };
export type ClassFurniture = { id: string; name: string; type: FurnitureType; state: 'locked' | 'unlocked' | 'placed'; slot: string; unlockHint?: string };
export type ClassHonor = { id: string; name: string; got: boolean };
export type ClassMemento = { id: string; routeName: string; type: 'trophy' | 'notebook' | 'pen'; got: boolean };
export type ClassAchievement = { id: string; title: string; desc: string; done: boolean; date?: string };

type MyClassroomProps = {
  completion?: number;
  modules?: ClassModule[];
  furniture?: ClassFurniture[];
  honors?: ClassHonor[];
  mementos?: ClassMemento[];
  achievements?: ClassAchievement[];
  gold?: string;
  goldHi?: string;
  ink900?: string;
  ink700?: string;
  paper0?: string;
  teal?: string;
  onPlaceFurniture?: (id: string, slot: string) => void;
  onOpenModule?: (name: string) => void;
  onClose?: () => void;
};

const SLOT_POS: Record<string, { x: number; y: number; z: number }> = {
  desk: { x: 805, y: 652, z: 22 },
  deskA: { x: 430, y: 716, z: 30 },
  deskB: { x: 612, y: 748, z: 36 },
  plant: { x: 142, y: 648, z: 18 },
  globe: { x: 1252, y: 662, z: 18 },
  rug: { x: 805, y: 748, z: 2 },
};
const TYPE_SIZE: Record<string, { w: number; h: number }> = {
  lectern: { w: 170, h: 120 },
  studentDesk: { w: 152, h: 130 },
  plant: { w: 120, h: 152 },
  globe: { w: 120, h: 150 },
  rug: { w: 236, h: 100 },
};

function statusColor(st: 'mastered' | 'learned' | 'unlearned') {
  return st === 'mastered' ? 'var(--c-mastered)' : st === 'learned' ? 'var(--c-learned)' : 'var(--c-unlearned)';
}

export default function MyClassroom({
  completion = 0,
  modules = [],
  furniture = [],
  honors = [],
  mementos = [],
  achievements = [],
  gold = '#c19a52',
  goldHi = '#d8b877',
  ink900 = '#1a332d',
  ink700 = '#23433c',
  paper0 = '#fffaf1',
  teal = '#9fcabb',
  onPlaceFurniture,
  onOpenModule,
  onClose,
}: MyClassroomProps) {
  useKeyframes();

  const [scale, setScale] = useState(() =>
    typeof window !== 'undefined' ? Math.min(window.innerWidth / 1600, window.innerHeight / 900) : 1,
  );
  const [furn, setFurn] = useState<ClassFurniture[]>(() => furniture.map((f) => ({ ...f })));
  const [drag, setDrag] = useState<{ id: string; type: FurnitureType; w: number; h: number; x: number; y: number } | null>(null);
  const [hoverSlot, setHoverSlot] = useState<string | null>(null);
  const [justPlaced, setJustPlaced] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [panel, setPanel] = useState<'achievements' | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(drag);
  const hoverRef = useRef(hoverSlot);
  dragRef.current = drag;
  hoverRef.current = hoverSlot;

  // 外部数据变化时同步本地家具副本(拖拽用)
  useEffect(() => { setFurn(furniture.map((f) => ({ ...f }))); }, [furniture]);

  useEffect(() => {
    const onResize = () => setScale(Math.min(window.innerWidth / 1600, window.innerHeight / 900));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toStage = (clientX: number, clientY: number) => {
    const s = scale || 1;
    if (!stageRef.current) return { x: 0, y: 0 };
    const r = stageRef.current.getBoundingClientRect();
    return { x: (clientX - r.left) / s, y: (clientY - r.top) / s };
  };

  const emptySlots = () => {
    const occupied = new Set(furn.filter((f) => f.state === 'placed' || f.state === 'locked').map((f) => f.slot));
    return Object.keys(SLOT_POS).filter((k) => !occupied.has(k));
  };

  const onMove = (e: PointerEvent) => {
    if (!dragRef.current) return;
    const p = toStage(e.clientX, e.clientY);
    const empties = emptySlots();
    let near: string | null = null;
    let best = 150;
    for (const k of empties) {
      const d = Math.hypot(SLOT_POS[k].x - p.x, SLOT_POS[k].y - p.y);
      if (d < best) { best = d; near = k; }
    }
    setDrag((dr) => (dr ? { ...dr, x: p.x, y: p.y } : dr));
    setHoverSlot(near);
  };
  const onUp = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    const d = dragRef.current;
    const target = hoverRef.current;
    if (d && target) {
      setFurn((list) => list.map((f) => (f.id === d.id ? { ...f, state: 'placed', slot: target } : f)));
      setJustPlaced(d.id);
      onPlaceFurniture?.(d.id, target);
      const placedId = d.id;
      setTimeout(() => setJustPlaced((j) => (j === placedId ? null : j)), 700);
    }
    setDrag(null);
    setHoverSlot(null);
  };
  const startDrag = (id: string, e: RPointerEvent) => {
    e.preventDefault();
    const f = furn.find((x) => x.id === id);
    if (!f || f.state !== 'unlocked') return;
    const sz = TYPE_SIZE[f.type] || { w: 120, h: 120 };
    const p = toStage(e.clientX, e.clientY);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    setDrag({ id, type: f.type, w: sz.w, h: sz.h, x: p.x, y: p.y });
    setHoverSlot(null);
  };
  useEffect(() => () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModule = (name: string) => { setOpenModule(name); onOpenModule?.(name); };

  // 学力等级
  let tierLabel = '见习教师', tierGlyph = '习';
  if (completion >= 80) { tierLabel = '名师'; tierGlyph = '名'; }
  else if (completion >= 40) { tierLabel = '骨干教师'; tierGlyph = '骨'; }

  // 书架格子
  const shelf = useMemo(() => modules.map((m, mi) => {
    const learned = m.learned ?? 0;
    const total = m.total || 0;
    const mastered = m.mastered || 0;
    const cap = Math.min(total, 13);
    const books = [];
    for (let i = 0; i < cap; i++) {
      const st = i < mastered ? 'mastered' : i < mastered + learned ? 'learned' : 'unlearned';
      books.push({ key: i, color: statusColor(st as 'mastered'), h: 58 + ((i * 31 + mi * 7) % 5) * 7 });
    }
    return { key: mi, name: m.name, total, mastered, learned, complete: total > 0 && mastered >= total, books };
  }), [modules]);

  // 家具槽位
  const slots = Object.keys(SLOT_POS).map((key) => {
    const pos = SLOT_POS[key];
    const f = furn.find((x) => x.slot === key && (x.state === 'placed' || x.state === 'locked'));
    const mode = f ? f.state : 'empty';
    const type = f ? f.type : null;
    const sz = type ? TYPE_SIZE[type] : { w: 120, h: 120 };
    const isDrop = !!drag && mode === 'empty';
    return {
      key, type, hint: f?.unlockHint ?? '',
      left: pos.x - sz.w / 2, top: pos.y - sz.h, w: sz.w, h: sz.h, z: pos.z,
      isPlaced: mode === 'placed', isLocked: mode === 'locked',
      isDrop, isHover: isDrop && hoverSlot === key,
      dropLeft: pos.x - 70, dropTop: pos.y - 70,
      anim: justPlaced === (f ? f.id : null) ? 'cl-drop 0.55s ease-out' : 'none',
    };
  });

  const storage = furn.filter((f) => f.state === 'unlocked');
  const memX = [40, 195, 350];
  const mem = mementos.slice(0, 3).map((m, i) => ({ ...m, left: memX[i] ?? 40 + i * 150 }));

  // 模块详情面板
  let panelModule: { name: string; mastered: number; learned: number; rows: { key: number; label: string; color: string; stLabel: string }[] } | null = null;
  if (openModule) {
    const m = modules.find((x) => x.name === openModule);
    if (m) {
      const learned = m.learned ?? 0, mastered = m.mastered || 0, total = m.total || 0;
      const rows = [];
      for (let i = 0; i < total; i++) {
        const st = i < mastered ? 'mastered' : i < mastered + learned ? 'learned' : 'unlearned';
        rows.push({ key: i, label: '考点 ' + String(i + 1).padStart(2, '0'), color: statusColor(st as 'mastered'), stLabel: st === 'mastered' ? '已掌握' : st === 'learned' ? '学过' : '未学' });
      }
      panelModule = { name: m.name, mastered, learned, rows };
    }
  }

  const doneCount = achievements.filter((a) => a.done).length;

  const cssVars = {
    '--ink900': ink900, '--ink700': ink700, '--paper0': paper0, '--paper-2': '#f5efe2',
    '--gold': gold, '--gold-hi': goldHi, '--teal': teal,
    '--c-mastered': '#3f9b6e', '--c-learned': '#c79a3e', '--c-unlearned': '#b9b4a6',
    '--wood': '#9c7b46', '--wood-dk': '#6f5532', '--leaf': '#5b9b63', '--leaf-dk': '#3f7a48', '--sun': '#f3d49a',
  } as CSSProperties;

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#0e1f1b', fontFamily: "'Noto Sans SC', sans-serif", color: 'var(--paper0)', zIndex: 60, ...cssVars }}>
      <div ref={stageRef} style={{ position: 'absolute', top: 0, left: '50%', width: 1600, height: 900, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'top center' }}>

        {/* WALL */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 560, background: 'linear-gradient(180deg, #294d44 0%, var(--ink700) 60%, #20413a 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 528, width: 1600, height: 32, background: 'linear-gradient(180deg, #2c5249, #1c3a33)', borderTop: '2px solid #ffffff14' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 560, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 70% at 50% 32%, transparent 40%, rgba(0,0,0,0.34) 100%)' }} />

        {/* FLOOR */}
        <div style={{ position: 'absolute', left: 0, top: 560, width: 1600, height: 340, background: 'linear-gradient(180deg, #b79360 0%, #a8854f 38%, #8f6f3f 100%)' }} />
        <div style={{ position: 'absolute', left: 0, top: 560, width: 1600, height: 10, background: '#5c4528', opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: 0, top: 560, width: 1600, height: 340, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 80% at 50% 0%, rgba(255,240,200,0.22), transparent 60%)' }} />

        {/* WINDOW */}
        <div style={{ position: 'absolute', left: 600, top: 132, width: 400, height: 350 }}>
          <div style={{ position: 'absolute', inset: '-14px -10px 30px', borderRadius: 6, background: '#2a4f46', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 400, height: 318, borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(180deg, #cfe4e6 0%, #f3dca6 58%, #efc983 100%)' }}>
            <div style={{ position: 'absolute', left: '64%', top: '22%', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, #fff7e0 0%, var(--sun) 45%, transparent 72%)', animation: 'cl-sun 6s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '-6%', bottom: 0, width: '50%', height: '46%', background: 'radial-gradient(ellipse at 50% 100%, #6f9e72 0%, #6f9e7200 70%)', opacity: 0.7 }} />
            <div style={{ position: 'absolute', right: '-4%', bottom: 0, width: '42%', height: '34%', background: 'radial-gradient(ellipse at 50% 100%, #5f8e66 0%, #5f8e6600 70%)', opacity: 0.6 }} />
          </div>
          <div style={{ position: 'absolute', left: 196, top: 0, width: 8, height: 318, background: 'var(--paper-2)', borderRadius: 2 }} />
          <div style={{ position: 'absolute', left: 0, top: 154, width: 400, height: 8, background: 'var(--paper-2)', borderRadius: 2 }} />
          <div style={{ position: 'absolute', left: -8, top: -8, width: 416, height: 334, border: '7px solid var(--paper-2)', borderRadius: 8 }} />
          <div style={{ position: 'absolute', left: -64, top: -24, width: 96, height: 360 }}>
            <svg viewBox="0 0 96 360" width="96" height="360" style={{ display: 'block' }}><path d="M96 0 C70 30 84 70 60 110 C84 150 64 200 84 250 C68 300 88 330 70 360 L0 360 L0 0 Z" fill="#3f9b6e" opacity="0.92" /><path d="M0 0 L70 0 C58 40 70 80 52 120 C70 160 52 210 66 260 C52 310 70 340 56 360 L0 360 Z" fill="#357f5b" /></svg>
          </div>
          <div style={{ position: 'absolute', right: -64, top: -24, width: 96, height: 360, transform: 'scaleX(-1)' }}>
            <svg viewBox="0 0 96 360" width="96" height="360" style={{ display: 'block' }}><path d="M96 0 C70 30 84 70 60 110 C84 150 64 200 84 250 C68 300 88 330 70 360 L0 360 L0 0 Z" fill="#3f9b6e" opacity="0.92" /><path d="M0 0 L70 0 C58 40 70 80 52 120 C70 160 52 210 66 260 C52 310 70 340 56 360 L0 360 Z" fill="#357f5b" /></svg>
          </div>
          <div style={{ position: 'absolute', left: -72, top: -34, width: 544, height: 30, background: 'linear-gradient(180deg, #357f5b, #2c684b)', borderRadius: 4, boxShadow: '0 3px 8px rgba(0,0,0,0.25)' }} />
          <div style={{ position: 'absolute', left: -28, top: 314, width: 456, height: 22, background: 'linear-gradient(180deg, var(--paper-2), #d9cfb8)', borderRadius: 3, boxShadow: '0 6px 12px rgba(0,0,0,0.22)' }} />
        </div>

        {/* BOOKSHELF */}
        <div style={{ position: 'absolute', left: 54, top: 158, width: 512, zIndex: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingLeft: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(180deg, var(--gold-hi), var(--gold))' }} />
            <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 16, color: 'var(--paper0)' }}>考点书架</div>
            <div style={{ fontSize: 11, color: 'var(--teal)' }}>按模块整理 · 点击查看清单</div>
          </div>
          <div style={{ position: 'relative', padding: 12, borderRadius: 8, background: 'linear-gradient(180deg, #7c5f34, #5e4727)', border: '3px solid #4f3a1f', boxShadow: '0 16px 34px rgba(0,0,0,0.38)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {shelf.map((cell) => (
                <div key={cell.key} className="mc-cell" onClick={() => handleOpenModule(cell.name)} style={{ position: 'relative', display: 'flex', flexDirection: 'column', cursor: 'pointer', background: 'linear-gradient(180deg, #2c4a42, #21413a)', borderRadius: 5, padding: '8px 6px 7px', border: '1px solid #ffffff14' }}>
                  <div style={{ height: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, paddingBottom: 5, borderBottom: '4px solid #4f3a1f' }}>
                    {cell.books.map((bk) => (
                      <div key={bk.key} style={{ width: 9, height: bk.h, background: bk.color, borderRadius: '2px 2px 0 0', boxShadow: 'inset -2px 0 0 #00000026' }} />
                    ))}
                  </div>
                  <div style={{ marginTop: 7, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--paper0)', lineHeight: 1.15 }}>{cell.name}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: 'var(--teal)', marginTop: 2 }}>{cell.mastered}/{cell.total}</div>
                  </div>
                  {cell.complete ? (
                    <>
                      <div style={{ position: 'absolute', inset: -1, borderRadius: 5, border: '1.5px solid var(--gold)', pointerEvents: 'none', boxShadow: '0 0 14px var(--gold)', animation: 'cl-glow 3.2s ease-in-out infinite' }} />
                      <div style={{ position: 'absolute', top: -7, right: -7, width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', color: '#2a2113', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>✓</div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', left: 12, right: 12, bottom: -7, height: 7, background: '#3c2c16', borderRadius: '0 0 4px 4px' }} />
          </div>
        </div>

        {/* HONOR WALL */}
        <div style={{ position: 'absolute', left: 1040, top: 158, width: 512, zIndex: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingLeft: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(180deg, var(--gold-hi), var(--gold))' }} />
            <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 16, color: 'var(--paper0)' }}>荣誉墙</div>
            <div style={{ fontSize: 11, color: 'var(--teal)' }}>月考 · 模考达标</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {honors.map((hn) => (
              <div key={hn.id} style={{ position: 'relative', height: 128 }}>
                {hn.got ? (
                  <div style={{ height: '100%', borderRadius: 6, border: '3px solid #4f3a1f', background: '#3a2c18', boxShadow: '0 6px 14px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '78%', height: '78%', background: 'linear-gradient(160deg, #fffdf6, #f2e8d2)', border: '1px solid var(--gold)', borderRadius: 3, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: 8 }}>
                      <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 12, color: '#5e4727', textAlign: 'center', lineHeight: 1.2 }}>{hn.name}</div>
                      <div style={{ width: 52, height: 3, background: 'var(--gold)' }} />
                      <div style={{ width: '64%', height: 2, background: '#cdba90' }} />
                      <div style={{ width: '50%', height: 2, background: '#cdba90' }} />
                      <div style={{ position: 'absolute', right: 8, bottom: 6, width: 20, height: 20, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, var(--gold-hi), var(--gold))', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ height: '100%', borderRadius: 6, border: '2px dashed #ffffff2b', background: '#ffffff08', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 11, color: '#ffffff4d', letterSpacing: '0.12em' }}>未获得</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WINDOW-SILL MEMENTOS */}
        <div style={{ position: 'absolute', left: 600, top: 366, width: 456, height: 82, zIndex: 7 }}>
          {mem.map((mo) => (
            <div key={mo.id} title={mo.routeName} style={{ position: 'absolute', left: mo.left, bottom: 0, width: 70, height: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              {mo.got ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.3))' }}>
                  {mo.type === 'trophy' ? (
                    <svg width="44" height="62" viewBox="0 0 46 64"><path d="M11 6 H35 V19 a12 12 0 0 1 -24 0 Z" fill="var(--gold)" /><path d="M11 9 H5 a6 6 0 0 0 7 8" fill="none" stroke="var(--gold)" strokeWidth="3" /><path d="M35 9 H41 a6 6 0 0 1 -7 8" fill="none" stroke="var(--gold)" strokeWidth="3" /><rect x="20" y="31" width="6" height="11" fill="var(--gold-hi)" /><rect x="13" y="42" width="20" height="6" rx="2" fill="var(--gold)" /><rect x="10" y="48" width="26" height="8" rx="2" fill="var(--wood-dk)" /></svg>
                  ) : mo.type === 'notebook' ? (
                    <svg width="42" height="58" viewBox="0 0 44 58"><rect x="8" y="6" width="30" height="46" rx="3" fill="var(--leaf-dk)" /><rect x="8" y="6" width="8" height="46" fill="#2f5d37" /><rect x="20" y="16" width="13" height="2.5" fill="#ffffff66" /><rect x="20" y="24" width="13" height="2.5" fill="#ffffff44" /><rect x="20" y="32" width="9" height="2.5" fill="#ffffff44" /></svg>
                  ) : (
                    <svg width="44" height="58" viewBox="0 0 44 58"><g transform="rotate(18 22 30)"><rect x="19" y="8" width="7" height="32" rx="2" fill="var(--gold)" /><path d="M19 40 H26 L22.5 50 Z" fill="var(--gold-hi)" /><rect x="19" y="14" width="7" height="4" fill="var(--wood-dk)" /></g></svg>
                  )}
                </div>
              ) : (
                <div style={{ width: 42, height: 50, border: '1.5px dashed #ffffff33', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff40', fontSize: 16 }}>?</div>
              )}
            </div>
          ))}
        </div>

        {/* FURNITURE SLOTS */}
        {slots.map((sl) => {
          if (sl.isPlaced && sl.type) {
            return (
              <div key={sl.key} className="mc-slot" style={{ position: 'absolute', left: sl.left, top: sl.top, width: sl.w, height: sl.h, zIndex: sl.z, animation: sl.anim, filter: 'drop-shadow(0 12px 10px rgba(0,0,0,0.3))', transition: 'transform 0.15s ease' }}>
                <Furniture type={sl.type} />
              </div>
            );
          }
          if (sl.isLocked && sl.type) {
            return (
              <div key={sl.key} style={{ position: 'absolute', left: sl.left, top: sl.top, width: sl.w, height: sl.h, zIndex: sl.z }}>
                <div style={{ width: '100%', height: '100%', filter: 'grayscale(1) brightness(1.6)', opacity: 0.24 }}>
                  <Furniture type={sl.type} />
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(16,33,29,0.82)', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="17" viewBox="0 0 16 18"><path d="M4 8 V5 a4 4 0 0 1 8 0 V8" fill="none" stroke="var(--gold)" strokeWidth="1.7" /><rect x="2.5" y="8" width="11" height="8.6" rx="2" fill="var(--gold)" /></svg>
                </div>
                {sl.hint ? (
                  <div style={{ position: 'absolute', left: '50%', bottom: -24, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 11, color: 'var(--teal)', background: 'rgba(16,33,29,0.72)', padding: '3px 9px', borderRadius: 99, border: '1px solid #ffffff1a' }}>{sl.hint}</div>
                ) : null}
              </div>
            );
          }
          if (sl.isDrop) {
            return (
              <div key={sl.key} style={{ position: 'absolute', left: sl.dropLeft, top: sl.dropTop, width: 140, height: 140, zIndex: 39, borderRadius: 16, border: '2px dashed var(--gold)', background: 'rgba(193,154,82,0.07)', pointerEvents: 'none' }}>
                {sl.isHover ? <div style={{ position: 'absolute', inset: -3, borderRadius: 18, border: '3px solid var(--gold-hi)', boxShadow: '0 0 22px var(--gold)', background: 'rgba(193,154,82,0.18)' }} /> : null}
              </div>
            );
          }
          return null;
        })}

        {/* DRAG GHOST */}
        {drag ? (
          <div style={{ position: 'absolute', left: drag.x - drag.w / 2, top: drag.y - drag.h, width: drag.w, height: drag.h, zIndex: 50, pointerEvents: 'none', opacity: 0.92, filter: 'drop-shadow(0 20px 16px rgba(0,0,0,0.45))' }}>
            <Furniture type={drag.type} />
          </div>
        ) : null}

        {/* TOP BAR */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 92, zIndex: 40, display: 'flex', alignItems: 'center', gap: 24, padding: '0 34px', background: 'linear-gradient(180deg, rgba(16,33,29,0.92), rgba(16,33,29,0.5) 80%, transparent)', backdropFilter: 'blur(2px)' }}>
          <div className="mc-btn" onClick={() => onClose?.()} style={{ width: 40, height: 40, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #ffffff26', color: 'var(--paper0)', fontSize: 20, cursor: 'pointer', background: '#ffffff0e' }}>←</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.34em', color: 'var(--teal)', textTransform: 'uppercase' }}>MY CLASSROOM</div>
            <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 27, color: 'var(--paper0)', lineHeight: 1 }}>我的教室</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16, maxWidth: 560 }}>
            <div style={{ flex: 1, height: 12, borderRadius: 99, background: '#ffffff1a', overflow: 'hidden', border: '1px solid #ffffff22' }}>
              <div style={{ height: '100%', width: `${completion}%`, borderRadius: 99, background: 'linear-gradient(90deg, var(--gold), var(--gold-hi))' }} />
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: 'var(--gold-hi)', whiteSpace: 'nowrap' }}>{completion}%</div>
            <div style={{ fontSize: 12, color: 'var(--teal)', whiteSpace: 'nowrap' }}>教室完成度</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 12px', borderRadius: 99, background: 'linear-gradient(180deg, #2d564c, #21433b)', border: '1px solid var(--gold)', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, var(--gold-hi), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2a2113', fontWeight: 700, fontFamily: "'Noto Serif SC', serif", fontSize: 15 }}>{tierGlyph}</div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <div style={{ fontSize: 10, color: 'var(--teal)', letterSpacing: '0.1em' }}>学力等级</div>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 16, color: 'var(--paper0)' }}>{tierLabel}</div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: 1600, height: 96, zIndex: 40, display: 'flex', alignItems: 'center', gap: 18, padding: '0 30px', background: 'linear-gradient(0deg, rgba(16,33,29,0.95), rgba(16,33,29,0.6) 70%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8"><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M3 8 L6 4 H18 L21 8" /><path d="M10 13 H14" /></svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 15, color: 'var(--paper0)' }}>储物箱</div>
              <div style={{ fontSize: 10, color: 'var(--teal)' }}>已解锁 {storage.length} 件</div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', padding: '6px 4px' }}>
            {storage.length ? storage.map((st) => (
              <div key={st.id} className="mc-chip" onPointerDown={(e) => startDrag(st.id, e)} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 9, padding: '6px 14px 6px 7px', borderRadius: 11, background: '#ffffff10', border: '1px solid #ffffff24', cursor: 'grab', opacity: drag && drag.id === st.id ? 0.3 : 1, touchAction: 'none' }}>
                <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'none' }}>
                  <Furniture type={st.type} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--paper0)', whiteSpace: 'nowrap' }}>{st.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--teal)', whiteSpace: 'nowrap' }}>拖入空位摆放</div>
                </div>
              </div>
            )) : (
              <div style={{ fontSize: 12, color: '#ffffff55' }}>暂无可摆放的家具 —— 继续通关解锁吧</div>
            )}
          </div>
          <div className="mc-more" onClick={() => setPanel('achievements')} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, background: 'linear-gradient(180deg, #2d564c, #21433b)', border: '1px solid var(--gold)', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-hi)" strokeWidth="1.8"><circle cx="12" cy="9" r="6" /><path d="M8.5 14 L7 22 L12 19 L17 22 L15.5 14" /></svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 15, color: 'var(--paper0)' }}>成就墙</div>
              <div style={{ fontSize: 10, color: 'var(--teal)' }}>{doneCount}/{achievements.length} 已达成</div>
            </div>
          </div>
        </div>

        {/* MODULE PANEL */}
        {panelModule ? (
          <>
            <div onClick={() => setOpenModule(null)} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(10,22,19,0.55)', animation: 'cl-fade 0.2s ease-out' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, width: 440, height: 900, zIndex: 61, background: 'linear-gradient(180deg, #1c3a33, #16302a)', borderLeft: '1px solid var(--gold)', boxShadow: '-16px 0 40px rgba(0,0,0,0.4)', animation: 'cl-panel 0.28s ease-out', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '30px 30px 18px', borderBottom: '1px solid #ffffff14' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.3em', color: 'var(--teal)', textTransform: 'uppercase' }}>MODULE</div>
                    <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 26, color: 'var(--paper0)', marginTop: 4 }}>{panelModule.name}</div>
                  </div>
                  <div className="mc-x" onClick={() => setOpenModule(null)} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid #ffffff2b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--paper0)', fontSize: 17 }}>✕</div>
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--c-mastered)' }} /><span style={{ fontSize: 12, color: 'var(--paper0)' }}>已掌握 {panelModule.mastered}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--c-learned)' }} /><span style={{ fontSize: 12, color: 'var(--paper0)' }}>学过 {panelModule.learned}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--c-unlearned)' }} /><span style={{ fontSize: 12, color: 'var(--paper0)' }}>未学</span></div>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 30px' }}>
                {panelModule.rows.map((row) => (
                  <div key={row.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 9, background: '#ffffff0c', marginBottom: 8, border: '1px solid #ffffff10' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: row.color, flex: 'none' }} />
                    <span style={{ flex: 1, fontSize: 14, color: 'var(--paper0)' }}>{row.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--teal)' }}>{row.stLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {/* ACHIEVEMENTS PANEL */}
        {panel === 'achievements' ? (
          <>
            <div onClick={() => setPanel(null)} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(10,22,19,0.6)', animation: 'cl-fade 0.2s ease-out' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 720, maxHeight: 660, zIndex: 61, background: 'linear-gradient(180deg, #1c3a33, #16302a)', border: '1px solid var(--gold)', borderRadius: 14, boxShadow: '0 30px 70px rgba(0,0,0,0.5)', animation: 'cl-pop 0.26s ease-out', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '26px 30px 18px', borderBottom: '1px solid #ffffff14', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.3em', color: 'var(--teal)', textTransform: 'uppercase' }}>ACHIEVEMENTS</div>
                  <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 26, color: 'var(--paper0)', marginTop: 4 }}>成就墙 · {doneCount}/{achievements.length}</div>
                </div>
                <div className="mc-x" onClick={() => setPanel(null)} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid #ffffff2b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--paper0)', fontSize: 17 }}>✕</div>
              </div>
              <div style={{ padding: '20px 30px 30px', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {achievements.map((ac) => (
                  <div key={ac.id} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 16, borderRadius: 11, background: '#ffffff0c', border: '1px solid #ffffff14', opacity: ac.done ? 1 : 0.5 }}>
                    <div style={{ width: 46, height: 46, flex: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 35% 30%, var(--gold-hi), var(--gold))' }}>
                      {ac.done ? <span style={{ color: '#2a2113', fontSize: 22, fontWeight: 700 }}>✓</span> : <svg width="18" height="20" viewBox="0 0 16 18"><path d="M4 8 V5 a4 4 0 0 1 8 0 V8" fill="none" stroke="#2a2113" strokeWidth="1.7" /><rect x="2.5" y="8" width="11" height="8.6" rx="2" fill="#2a2113" /></svg>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, fontSize: 16, color: 'var(--paper0)' }}>{ac.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--teal)', marginTop: 3, lineHeight: 1.4 }}>{ac.desc}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--gold-hi)', marginTop: 5 }}>{ac.done && ac.date ? ac.date : ac.done ? '已达成' : '未达成'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

      </div>
    </div>
  );
}
