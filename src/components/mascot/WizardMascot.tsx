'use client'

// 12 orbital particles — each gets a unique start angle via animationDelay
// delay = startAngle/360 * duration so they're evenly distributed
const PARTICLES: { radius: number; size: number; duration: number; delay: number; opacity: number; pulse?: boolean }[] = [
  { radius: 78,  size: 4, duration: 4.0, delay: 0.00, opacity: 0.6 },
  { radius: 95,  size: 3, duration: 5.5, delay: 0.46, opacity: 0.4 },
  { radius: 82,  size: 4, duration: 4.5, delay: 0.75, opacity: 0.7, pulse: true },
  { radius: 108, size: 3, duration: 7.0, delay: 1.17, opacity: 0.5 },
  { radius: 90,  size: 4, duration: 5.0, delay: 0.42, opacity: 0.6 },
  { radius: 115, size: 3, duration: 8.0, delay: 2.00, opacity: 0.3, pulse: true },
  { radius: 78,  size: 4, duration: 4.0, delay: 2.00, opacity: 0.5 },
  { radius: 100, size: 3, duration: 6.5, delay: 1.08, opacity: 0.8 },
  { radius: 88,  size: 4, duration: 4.8, delay: 2.40, opacity: 0.4 },
  { radius: 105, size: 3, duration: 6.0, delay: 1.00, opacity: 0.6 },
  { radius: 92,  size: 4, duration: 5.2, delay: 2.60, opacity: 0.7, pulse: true },
  { radius: 112, size: 3, duration: 7.5, delay: 3.12, opacity: 0.4 },
]

// 6 tiny upward-drifting sparks (white/violet)
const DRIFT_SPARKS: { left: string; delay: string; duration: string; color: string }[] = [
  { left: '35%', delay: '0s',    duration: '3.0s', color: '#EDE8DF' },
  { left: '55%', delay: '0.6s',  duration: '2.5s', color: '#A594C4' },
  { left: '62%', delay: '1.2s',  duration: '3.4s', color: '#EDE8DF' },
  { left: '42%', delay: '1.8s',  duration: '2.8s', color: '#A594C4' },
  { left: '48%', delay: '2.4s',  duration: '3.2s', color: '#EDE8DF' },
  { left: '70%', delay: '0.9s',  duration: '2.2s', color: '#A594C4' },
]

// Ember sparks from staff orb tip (right side of wizard)
// Orb SVG center: x≈38, y≈15 → at 240px wide (scale 4.8): x=182, y=72
const EMBER_SPARKS: { offsetX: number; delay: string; duration: string }[] = [
  { offsetX: -4,  delay: '0s',   duration: '1.8s' },
  { offsetX:  4,  delay: '0.7s', duration: '2.1s' },
  { offsetX:  0,  delay: '1.3s', duration: '1.6s' },
  { offsetX: -6,  delay: '0.4s', duration: '2.3s' },
]

export default function WizardMascot() {
  return (
    <div
      className="relative select-none"
      style={{ width: 260, height: 360 }}
    >

      {/* ─── Violet radial glow behind wizard ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,106,158,0.3) 0%, transparent 70%)',
          filter: 'blur(24px)',
          zIndex: 0,
        }}
      />

      {/* ─── 12 orbital particles ─── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: p.size,
            height: p.size,
            marginLeft: -(p.size / 2),
            marginTop: -(p.size / 2),
            borderRadius: '50%',
            background: '#7C6A9E',
            opacity: p.opacity,
            zIndex: 1,
            animationName: p.pulse
              ? `wizard-orbit-${p.radius}, wizard-particle-pulse`
              : `wizard-orbit-${p.radius}`,
            animationDuration: p.pulse ? `${p.duration}s, 2.5s` : `${p.duration}s`,
            animationDelay: p.pulse ? `${p.delay}s, ${p.delay}s` : `${p.delay}s`,
            animationTimingFunction: 'linear, ease-in-out',
            animationIterationCount: 'infinite, infinite',
          }}
        />
      ))}

      {/* ─── Orb glow blur ─── */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 72, height: 72,
          top: 42, left: 152,
          background: 'radial-gradient(circle, rgba(124,107,158,0.6) 0%, transparent 70%)',
          filter: 'blur(10px)',
          animation: 'orb-glow 2.4s ease-in-out infinite',
          zIndex: 2,
        }}
      />

      {/* ─── Ember sparks from staff orb ─── */}
      {EMBER_SPARKS.map((s, i) => (
        <div
          key={`ember-${i}`}
          className="absolute pointer-events-none rounded-sm"
          style={{
            width: 2,
            height: 3,
            left: 188 + s.offsetX,
            top: 72,
            background: '#C4781E',
            zIndex: 3,
            animation: `ember-spark ${s.duration} ease-out infinite`,
            animationDelay: s.delay,
            opacity: 0,
          }}
        />
      ))}

      {/* ─── 6 drifting upward sparks ─── */}
      {DRIFT_SPARKS.map((s, i) => (
        <div
          key={`drift-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 2,
            height: 2,
            left: s.left,
            bottom: '45%',
            borderRadius: '50%',
            background: s.color,
            zIndex: 3,
            animation: `spark-rise ${s.duration} ease-in infinite`,
            animationDelay: s.delay,
            opacity: 0,
          }}
        />
      ))}

      {/* ─── Wizard SVG ─── */}
      <svg
        width="240"
        height="321"
        viewBox="0 0 50 67"
        fill="none"
        style={{
          imageRendering: 'pixelated',
          animation: 'wizard-float 3s ease-in-out infinite',
          position: 'relative',
          zIndex: 2,
          display: 'block',
          margin: '0 auto',
          marginTop: 10,
        }}
      >
        {/* ─── HAT ─── */}
        <rect x="19" y="0"  width="2"  height="1" fill="#1A1520"/>
        <rect x="18" y="1"  width="4"  height="1" fill="#1A1520"/>
        <rect x="17" y="2"  width="6"  height="1" fill="#1A1520"/>
        <rect x="16" y="3"  width="8"  height="1" fill="#1A1520"/>
        <rect x="15" y="4"  width="10" height="1" fill="#1A1520"/>
        <rect x="14" y="5"  width="12" height="1" fill="#1A1520"/>
        <rect x="13" y="6"  width="14" height="1" fill="#1A1520"/>
        <rect x="12" y="7"  width="16" height="1" fill="#1A1520"/>
        {/* Hat moon */}
        <rect x="16" y="4"  width="1"  height="1" fill="#7C6B9E" opacity="0.7"/>
        <rect x="20" y="2"  width="1"  height="1" fill="#A594C4" opacity="0.6"/>
        {/* Hat brim */}
        <rect x="9"  y="8"  width="22" height="3" fill="#7C6B9E"/>

        {/* ─── HEAD ─── */}
        <rect x="12" y="11" width="16" height="9" fill="#EDE8DF"/>
        <rect x="13" y="12" width="4"  height="1" fill="#8B7060"/>
        <rect x="22" y="12" width="4"  height="1" fill="#8B7060"/>
        {/* Left eye */}
        <rect x="13" y="13" width="3" height="3" fill="#141210" style={{ animation: 'blink 4s ease-in-out infinite' }}/>
        <rect x="13" y="13" width="1" height="1" fill="#EDE8DF" opacity="0.7"/>
        {/* Right eye */}
        <rect x="22" y="13" width="3" height="3" fill="#141210" style={{ animation: 'blink 4s ease-in-out infinite' }}/>
        <rect x="22" y="13" width="1" height="1" fill="#EDE8DF" opacity="0.7"/>
        <rect x="19" y="16" width="2" height="2" fill="#C4A080"/>
        <rect x="14" y="18" width="1" height="1" fill="#8B6050"/>
        <rect x="15" y="19" width="8" height="1" fill="#8B6050"/>
        <rect x="23" y="18" width="1" height="1" fill="#8B6050"/>

        {/* ─── BEARD ─── */}
        <rect x="10" y="19" width="20" height="2" fill="#D4C4A8"/>
        <rect x="12" y="21" width="16" height="2" fill="#D4C4A8"/>
        <rect x="14" y="23" width="12" height="2" fill="#D4C4A8"/>
        <rect x="16" y="25" width="8"  height="1" fill="#D4C4A8"/>

        {/* ─── COLLAR ─── */}
        <rect x="10" y="19" width="20" height="4" fill="#7C6B9E" opacity="0.85"/>

        {/* ─── ROBE ─── */}
        <rect x="6"  y="23" width="28" height="3"  fill="#2A1E3E"/>
        <rect x="8"  y="26" width="24" height="18" fill="#2A1E3E"/>
        <rect x="18" y="24" width="4"  height="20" fill="#321E4A"/>
        <rect x="11" y="28" width="2"  height="2"  fill="#7C6B9E" opacity="0.7"/>
        <rect x="22" y="32" width="2"  height="2"  fill="#7C6B9E" opacity="0.5"/>
        <rect x="13" y="36" width="1"  height="1"  fill="#A594C4" opacity="0.6"/>
        <rect x="9"  y="44" width="22" height="2"  fill="#1E1530"/>

        {/* ─── ARMS ─── */}
        <rect x="2"  y="23" width="7"  height="11" fill="#2A1E3E"/>
        <rect x="31" y="23" width="7"  height="11" fill="#2A1E3E"/>
        <rect x="2"  y="34" width="6"  height="4"  fill="#EDE8DF"/>
        <rect x="32" y="34" width="6"  height="4"  fill="#EDE8DF"/>

        {/* ─── FEET ─── */}
        <rect x="10" y="46" width="8" height="3" fill="#2A1E3E"/>
        <rect x="22" y="46" width="8" height="3" fill="#2A1E3E"/>
        <rect x="9"  y="49" width="9" height="2" fill="#141210"/>
        <rect x="22" y="49" width="9" height="2" fill="#141210"/>

        {/* ─── STAFF ─── */}
        <rect x="37" y="20" width="2" height="32" fill="#8B6914"/>
        <rect x="35" y="24" width="6" height="2"  fill="#8B6914"/>

        {/* ─── ORB ─── */}
        <rect x="34" y="11" width="8" height="8" fill="#7C6B9E" opacity="0.3" style={{ animation: 'orb-pulse 2.4s ease-in-out infinite' }}/>
        <rect x="35" y="12" width="6" height="6" fill="#7C6B9E" style={{ animation: 'orb-pulse 2.4s ease-in-out infinite' }}/>
        <rect x="36" y="13" width="4" height="4" fill="#A594C4" style={{ animation: 'orb-pulse 2.4s ease-in-out infinite' }}/>
        <rect x="36" y="13" width="2" height="2" fill="#EDE8DF" opacity="0.8"/>
        <rect x="36" y="19" width="2" height="1" fill="#A0790A"/>
      </svg>

      <style>{`
        @keyframes wizard-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-11px); }
        }
        @keyframes blink {
          0%, 88%, 100% { transform: scaleY(1); transform-origin: center; }
          92%            { transform: scaleY(0.05); transform-origin: center; }
        }
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.8; }
          50%       { opacity: 1; filter: drop-shadow(0 0 5px #A594C4); }
        }
        @keyframes orb-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes spark-rise {
          0%   { transform: translateY(0) scale(1);     opacity: 0.9; }
          60%  { opacity: 0.5; }
          100% { transform: translateY(-60px) scale(0.2); opacity: 0; }
        }
        @keyframes ember-spark {
          0%   { transform: translateY(0) translateX(0) scale(1);    opacity: 0.9; }
          40%  { opacity: 0.6; }
          100% { transform: translateY(-40px) translateX(var(--ex, 6px)) scale(0.2); opacity: 0; }
        }
        @keyframes wizard-particle-pulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.8; }
        }
        /* Orbit keyframes per radius */
        @keyframes wizard-orbit-78  { from { transform: rotate(0deg)   translateX(78px); }  to { transform: rotate(360deg)  translateX(78px); } }
        @keyframes wizard-orbit-82  { from { transform: rotate(0deg)   translateX(82px); }  to { transform: rotate(360deg)  translateX(82px); } }
        @keyframes wizard-orbit-88  { from { transform: rotate(0deg)   translateX(88px); }  to { transform: rotate(360deg)  translateX(88px); } }
        @keyframes wizard-orbit-90  { from { transform: rotate(0deg)   translateX(90px); }  to { transform: rotate(360deg)  translateX(90px); } }
        @keyframes wizard-orbit-92  { from { transform: rotate(0deg)   translateX(92px); }  to { transform: rotate(360deg)  translateX(92px); } }
        @keyframes wizard-orbit-95  { from { transform: rotate(0deg)   translateX(95px); }  to { transform: rotate(360deg)  translateX(95px); } }
        @keyframes wizard-orbit-100 { from { transform: rotate(0deg)   translateX(100px); } to { transform: rotate(360deg)  translateX(100px); } }
        @keyframes wizard-orbit-105 { from { transform: rotate(0deg)   translateX(105px); } to { transform: rotate(360deg)  translateX(105px); } }
        @keyframes wizard-orbit-108 { from { transform: rotate(0deg)   translateX(108px); } to { transform: rotate(360deg)  translateX(108px); } }
        @keyframes wizard-orbit-112 { from { transform: rotate(0deg)   translateX(112px); } to { transform: rotate(360deg)  translateX(112px); } }
        @keyframes wizard-orbit-115 { from { transform: rotate(0deg)   translateX(115px); } to { transform: rotate(360deg)  translateX(115px); } }
      `}</style>
    </div>
  )
}
