'use client'

const SPARKS = [
  { left: '8%',  delay: '0s',    duration: '2.1s' },
  { left: '16%', delay: '0.5s',  duration: '1.8s' },
  { left: '24%', delay: '1.1s',  duration: '2.4s' },
  { left: '32%', delay: '0.3s',  duration: '1.9s' },
  { left: '40%', delay: '1.6s',  duration: '2.2s' },
  { left: '20%', delay: '0.8s',  duration: '2.6s' },
]

export default function WizardMascot() {
  return (
    <div className="relative select-none" style={{ width: 200, height: 268 }}>

      {/* Violet orb glow blur */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 60, height: 60,
          top: 28, left: 128,
          background: 'radial-gradient(circle, rgba(124,107,158,0.55) 0%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'orb-glow 2.4s ease-in-out infinite',
        }}
      />

      {/* Rising sparks */}
      {SPARKS.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-sm"
          style={{
            width: 3, height: 3,
            left: s.left,
            bottom: '54%',
            background: '#A594C4',
            animation: `spark-rise ${s.duration} ease-in infinite`,
            animationDelay: s.delay,
            opacity: 0,
          }}
        />
      ))}

      {/* Wizard SVG */}
      <svg
        width="200"
        height="268"
        viewBox="0 0 50 67"
        fill="none"
        style={{ imageRendering: 'pixelated', animation: 'wizard-float 3.2s ease-in-out infinite' }}
      >
        {/* ─── HAT (dark, stacked rects for pixel triangle) ─── */}
        <rect x="19" y="0"  width="2"  height="1" fill="#1A1520"/>
        <rect x="18" y="1"  width="4"  height="1" fill="#1A1520"/>
        <rect x="17" y="2"  width="6"  height="1" fill="#1A1520"/>
        <rect x="16" y="3"  width="8"  height="1" fill="#1A1520"/>
        <rect x="15" y="4"  width="10" height="1" fill="#1A1520"/>
        <rect x="14" y="5"  width="12" height="1" fill="#1A1520"/>
        <rect x="13" y="6"  width="14" height="1" fill="#1A1520"/>
        <rect x="12" y="7"  width="16" height="1" fill="#1A1520"/>
        {/* Hat moon decoration */}
        <rect x="16" y="4"  width="1"  height="1" fill="#7C6B9E" opacity="0.7"/>
        <rect x="20" y="2"  width="1"  height="1" fill="#A594C4" opacity="0.6"/>
        {/* Hat brim (violet) */}
        <rect x="9"  y="8"  width="22" height="3"  fill="#7C6B9E"/>

        {/* ─── HEAD ─── */}
        <rect x="12" y="11" width="16" height="9"  fill="#EDE8DF"/>
        {/* Eyebrows */}
        <rect x="13" y="12" width="4"  height="1"  fill="#8B7060"/>
        <rect x="22" y="12" width="4"  height="1"  fill="#8B7060"/>
        {/* Left eye */}
        <rect x="13" y="13" width="3"  height="3"  fill="#141210" style={{ animation: 'blink 4s ease-in-out infinite' }}/>
        <rect x="13" y="13" width="1"  height="1"  fill="#EDE8DF" opacity="0.7"/>
        {/* Right eye */}
        <rect x="22" y="13" width="3"  height="3"  fill="#141210" style={{ animation: 'blink 4s ease-in-out infinite' }}/>
        <rect x="22" y="13" width="1"  height="1"  fill="#EDE8DF" opacity="0.7"/>
        {/* Nose */}
        <rect x="19" y="16" width="2"  height="2"  fill="#C4A080"/>
        {/* Smile */}
        <rect x="14" y="18" width="1"  height="1"  fill="#8B6050"/>
        <rect x="15" y="19" width="8"  height="1"  fill="#8B6050"/>
        <rect x="23" y="18" width="1"  height="1"  fill="#8B6050"/>

        {/* ─── BEARD ─── */}
        <rect x="10" y="19" width="20" height="2"  fill="#D4C4A8"/>
        <rect x="12" y="21" width="16" height="2"  fill="#D4C4A8"/>
        <rect x="14" y="23" width="12" height="2"  fill="#D4C4A8"/>
        <rect x="16" y="25" width="8"  height="1"  fill="#D4C4A8"/>

        {/* ─── COLLAR ─── */}
        <rect x="10" y="19" width="20" height="4"  fill="#7C6B9E" opacity="0.85"/>

        {/* ─── ROBE (body) ─── */}
        {/* Shoulders */}
        <rect x="6"  y="23" width="28" height="3"  fill="#2A1E3E"/>
        {/* Main body */}
        <rect x="8"  y="26" width="24" height="18" fill="#2A1E3E"/>
        {/* Robe center detail */}
        <rect x="18" y="24" width="4"  height="20" fill="#321E4A"/>
        {/* Star decorations on robe */}
        <rect x="11" y="28" width="2"  height="2"  fill="#7C6B9E" opacity="0.7"/>
        <rect x="22" y="32" width="2"  height="2"  fill="#7C6B9E" opacity="0.5"/>
        <rect x="13" y="36" width="1"  height="1"  fill="#A594C4" opacity="0.6"/>
        {/* Robe hem */}
        <rect x="9"  y="44" width="22" height="2"  fill="#1E1530"/>

        {/* ─── ARMS ─── */}
        <rect x="2"  y="23" width="7"  height="11" fill="#2A1E3E"/>
        <rect x="31" y="23" width="7"  height="11" fill="#2A1E3E"/>
        {/* Hands */}
        <rect x="2"  y="34" width="6"  height="4"  fill="#EDE8DF"/>
        <rect x="32" y="34" width="6"  height="4"  fill="#EDE8DF"/>

        {/* ─── FEET ─── */}
        <rect x="10" y="46" width="8"  height="3"  fill="#2A1E3E"/>
        <rect x="22" y="46" width="8"  height="3"  fill="#2A1E3E"/>
        {/* Shoes */}
        <rect x="9"  y="49" width="9"  height="2"  fill="#141210"/>
        <rect x="22" y="49" width="9"  height="2"  fill="#141210"/>

        {/* ─── STAFF ─── */}
        {/* Staff pole */}
        <rect x="37" y="20" width="2"  height="32" fill="#8B6914"/>
        {/* Cross piece */}
        <rect x="35" y="24" width="6"  height="2"  fill="#8B6914"/>

        {/* ─── ORB (animated glow) ─── */}
        {/* Outer glow ring */}
        <rect x="34" y="11" width="8"  height="8"  fill="#7C6B9E" opacity="0.3" style={{ animation: 'orb-pulse 2.4s ease-in-out infinite' }}/>
        {/* Main orb */}
        <rect x="35" y="12" width="6"  height="6"  fill="#7C6B9E" style={{ animation: 'orb-pulse 2.4s ease-in-out infinite' }}/>
        {/* Orb core */}
        <rect x="36" y="13" width="4"  height="4"  fill="#A594C4" style={{ animation: 'orb-pulse 2.4s ease-in-out infinite' }}/>
        {/* Orb shine */}
        <rect x="36" y="13" width="2"  height="2"  fill="#EDE8DF" opacity="0.8"/>
        {/* Staff knob */}
        <rect x="36" y="19" width="2"  height="1"  fill="#A0790A"/>
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
          50%       { opacity: 1; filter: drop-shadow(0 0 4px #A594C4); }
        }
        @keyframes orb-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.25); }
        }
        @keyframes spark-rise {
          0%   { transform: translateY(0) scale(1);    opacity: 0.9; }
          60%  { opacity: 0.6; }
          100% { transform: translateY(-55px) scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
