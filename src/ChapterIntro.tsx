import { useEffect, useMemo, useRef, useState, useCallback, type CSSProperties } from 'react';

/**
 * 视觉小说「章节进入标题卡」入场动画 — 自包含,零图片资源(铃=内联SVG,粒子/涟漪/光晕=CSS)。
 * 铃轻摆 → 鎏金音波 → 标题浮现,约 3.4s,任意点击可跳过。来源:Claude Design 交付,已转 TS。
 */

const KEYFRAMES = `
@keyframes ci-bg { from { opacity: 0; } to { opacity: 1; } }
@keyframes ci-dust {
  0% { transform: translateY(0); opacity: 0; }
  14% { opacity: 0.5; }
  86% { opacity: 0.35; }
  100% { transform: translateY(-880px); opacity: 0; }
}
@keyframes ci-lineExpand {
  from { transform: translateX(-50%) scaleX(0); }
  to { transform: translateX(-50%) scaleX(1); }
}
@keyframes ci-bellIn {
  from { opacity: 0; transform: translate(-50%, -12px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
@keyframes ci-bellSwing {
  0% { transform: rotate(0deg); }
  12% { transform: rotate(-8deg); }
  32% { transform: rotate(6deg); }
  52% { transform: rotate(-4deg); }
  72% { transform: rotate(2.4deg); }
  88% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
}
@keyframes ci-ripple {
  0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}
@keyframes ci-rise {
  from { opacity: 0; transform: translate(-50%, 16px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
@keyframes ci-sweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes ci-breathe {
  0%, 100% { opacity: 0.04; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.11; transform: translate(-50%, -50%) scale(1.04); }
}
@keyframes ci-blink { 0%, 100% { opacity: 0.32; } 50% { opacity: 0.78; } }
`;

function useKeyframes() {
  useEffect(() => {
    const id = 'chapter-intro-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
  }, []);
}

type ChapterIntroProps = {
  chapterNo?: string;
  chapterCn?: string;
  chapterTitle?: string;
  kicker?: string;
  totalDuration?: number;
  fadeDuration?: number;
  gold?: string;
  goldHi?: string;
  ink900?: string;
  ink700?: string;
  paper0?: string;
  teal?: string;
  onDone?: (reason: 'auto' | 'click') => void;
};

export default function ChapterIntro({
  chapterNo = '01',
  chapterCn = '第一章',
  chapterTitle = '入职第一天',
  kicker = 'TEACHER · CERTIFICATION',
  totalDuration = 3400,
  fadeDuration = 420,
  gold = '#c19a52',
  goldHi = '#d8b877',
  ink900 = '#1a332d',
  ink700 = '#23433c',
  paper0 = '#fffaf1',
  teal = '#9fcabb',
  onDone,
}: ChapterIntroProps) {
  useKeyframes();

  const [scale, setScale] = useState(() =>
    typeof window !== 'undefined' ? Math.min(window.innerWidth / 1600, window.innerHeight / 900) : 1,
  );
  const [fadingOut, setFadingOut] = useState(false);
  const [done, setDone] = useState(false);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dust = useMemo(() => {
    const rnd = (s: number) => {
      const x = Math.sin(s * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 18 }, (_, i) => ({
      key: i,
      left: +(rnd(i + 1) * 100).toFixed(2),
      size: +(2 + rnd(i + 2) * 4).toFixed(2),
      dur: +(9 + rnd(i + 3) * 8).toFixed(2),
      delay: +(-(rnd(i + 4) * 15)).toFixed(2),
    }));
  }, []);

  const finish = useCallback(
    (reason: 'auto' | 'click') => {
      setFadingOut((wasFading) => {
        if (wasFading) return wasFading;
        if (autoTimer.current) clearTimeout(autoTimer.current);
        fadeTimer.current = setTimeout(() => {
          setDone(true);
          try {
            window.dispatchEvent(new CustomEvent('intro-done', { detail: { chapter: chapterNo, reason } }));
          } catch { /* ignore */ }
          if (typeof onDone === 'function') onDone(reason);
        }, fadeDuration);
        return true;
      });
    },
    [chapterNo, fadeDuration, onDone],
  );

  useEffect(() => {
    const onResize = () => setScale(Math.min(window.innerWidth / 1600, window.innerHeight / 900));
    window.addEventListener('resize', onResize);
    autoTimer.current = setTimeout(() => finish('auto'), totalDuration);
    return () => {
      window.removeEventListener('resize', onResize);
      if (autoTimer.current) clearTimeout(autoTimer.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [finish, totalDuration]);

  if (done) return null;

  const cssVars = {
    '--gold': gold,
    '--gold-hi': goldHi,
    '--ink900': ink900,
    '--ink700': ink700,
    '--paper0': paper0,
    '--teal': teal,
  } as CSSProperties;

  return (
    <div
      onClick={() => finish('click')}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        zIndex: 60,
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${fadeDuration}ms ease`,
        fontFamily: "'Noto Serif SC', serif",
        background: '#0e1f1b',
        ...cssVars,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: 1600,
          height: 900,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 42%, var(--ink700) 0%, var(--ink900) 68%, #14292330 100%)', animation: 'ci-bg 0.6s ease-out both' }} />

        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {dust.map((d) => (
            <div key={d.key} style={{ position: 'absolute', bottom: -16, left: `${d.left}%`, width: d.size, height: d.size, borderRadius: '50%', background: 'rgba(255, 250, 241, 0.55)', filter: 'blur(0.6px)', opacity: 0, animation: `ci-dust ${d.dur}s linear ${d.delay}s infinite` }} />
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.42) 100%)' }} />

        <div style={{ position: 'absolute', left: '50%', top: 520, width: 760, height: 320, transform: 'translate(-50%, -50%)', borderRadius: '50%', background: 'radial-gradient(ellipse at center, var(--gold-hi) 0%, transparent 65%)', filter: 'blur(48px)', opacity: 0, animation: 'ci-breathe 4s ease-in-out 2.6s infinite' }} />

        <div style={{ position: 'absolute', left: '50%', top: 96, transform: 'translateX(-50%)', fontFamily: "'Space Mono', monospace", fontSize: 13, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--teal)', opacity: 0, animation: 'ci-rise 0.7s ease-out 0.35s both' }}>{kicker}</div>

        <div style={{ position: 'absolute', left: '50%', top: 150, transform: 'translateX(-50%)', opacity: 0, animation: 'ci-bellIn 0.85s ease-out 0.6s both' }}>
          <div style={{ transformOrigin: 'top center', animation: 'ci-bellSwing 1.8s ease-in-out 0.8s both' }}>
            <svg width="150" height="172" viewBox="0 0 140 160" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
              <circle cx="70" cy="15" r="6.5" />
              <path d="M70 22 C70 22 52 25 48 51 C45 71 40 85 31 97 L109 97 C100 85 95 71 92 51 C88 25 70 22 70 22 Z" />
              <path d="M31 97 Q70 108 109 97" />
              <circle cx="70" cy="112" r="5" />
            </svg>
          </div>
        </div>

        {[1.0, 1.35].map((delay, i) => (
          <div key={i} style={{ position: 'absolute', left: '50%', top: 280, width: 34, height: 34, transform: 'translate(-50%, -50%) scale(0.3)', border: '1.5px solid var(--gold)', borderRadius: '50%', opacity: 0, animation: `ci-ripple 1.6s ease-out ${delay}s forwards` }} />
        ))}

        <div style={{ position: 'absolute', left: '50%', top: 372, width: 460, height: 1, transform: 'translateX(-50%) scaleX(0)', transformOrigin: 'center', background: 'linear-gradient(90deg, transparent, var(--gold) 18%, var(--gold-hi) 50%, var(--gold) 82%, transparent)', animation: 'ci-lineExpand 0.85s ease-out 0.25s both' }} />

        <div style={{ position: 'absolute', left: '50%', top: 398, transform: 'translateX(-50%)', fontFamily: "'Space Mono', monospace", fontSize: 17, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0, animation: 'ci-rise 0.7s ease-out 1.2s both' }}>{`CHAPTER ${chapterNo}`}</div>

        <div style={{ position: 'absolute', left: '50%', top: 440, transform: 'translateX(-50%)', fontWeight: 500, fontSize: 30, letterSpacing: '0.26em', color: 'var(--paper0)', opacity: 0, textShadow: '0 1px 10px rgba(0,0,0,0.3)', animation: 'ci-rise 0.8s ease-out 1.6s both' }}>{chapterCn}</div>

        <div style={{ position: 'absolute', left: '50%', top: 488, transform: 'translateX(-50%)', fontWeight: 900, fontSize: 78, letterSpacing: '0.05em', lineHeight: 1.08, whiteSpace: 'nowrap', color: 'var(--paper0)', opacity: 0, textShadow: '0 2px 22px rgba(0,0,0,0.38)', animation: 'ci-rise 0.85s ease-out 1.9s both' }}>{chapterTitle}</div>

        <div style={{ position: 'absolute', left: 'calc(50% - 165px)', top: 612, width: 330, height: 2, transform: 'scaleX(0)', transformOrigin: 'left center', background: 'linear-gradient(90deg, var(--gold), var(--gold-hi))', animation: 'ci-sweep 0.85s ease-out 2.2s both' }} />

        <div style={{ position: 'absolute', left: '50%', top: 814, transform: 'translateX(-50%)', fontFamily: "'Space Mono', monospace", fontSize: 14, letterSpacing: '0.22em', color: 'var(--teal)', opacity: 0, animation: 'ci-rise 0.6s ease-out 2.7s both, ci-blink 2.4s ease-in-out 3.4s infinite' }}>▶ 点击开始</div>
      </div>
    </div>
  );
}
