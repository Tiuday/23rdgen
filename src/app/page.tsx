'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchModal from '@/components/search/SearchModal'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'

const NAV_ITEMS = [
  { label: 'Browse All', href: '/browse' },
  { label: 'Agents', href: '/browse?category=agent' },
  { label: 'Prompts', href: '/browse?category=prompt' },
  { label: 'Skills', href: '/browse?category=skill' },
  { label: 'Workflows', href: '/browse?category=workflow' },
  { label: 'Teams', href: '/browse?category=team' },
  { label: 'Creators', href: '/browse?category=creator' },
]

const TICKER_ITEMS = ['Claude', 'ChatGPT', 'Gemini', 'n8n', 'Cursor', 'Windsurf', 'Make', 'Zapier']

// Dot-leaf positions in SVG viewBox "0 0 580 920" — 110 dots, dense at outer tips/upper canopy
const LEAF_DOTS: { x: number; y: number }[] = [
  // Far-left canopy cluster (dense, near outer twig tips)
  { x: 8,  y: 22  }, { x: 15, y: 70  }, { x: 25, y: 120 }, { x: 30, y: 165 }, { x: 10, y: 195 },
  { x: 40, y: 10  }, { x: 48, y: 60  }, { x: 55, y: 105 }, { x: 62, y: 185 }, { x: 35, y: 218 },
  { x: 70, y: 30  }, { x: 65, y: 90  }, { x: 72, y: 148 }, { x: 68, y: 222 }, { x: 18, y: 142 },
  { x: 22, y: 100 }, { x: 5,  y: 152 }, { x: 12, y: 90  }, { x: 42, y: 142 }, { x: 52, y: 178 },
  { x: 28, y: 242 }, { x: 18, y: 228 }, { x: 60, y: 242 }, { x: 45, y: 202 }, { x: 75, y: 195 },
  // Far-right canopy cluster (dense, near outer twig tips)
  { x: 512, y: 22  }, { x: 525, y: 70  }, { x: 535, y: 120 }, { x: 540, y: 165 }, { x: 550, y: 195 },
  { x: 520, y: 10  }, { x: 528, y: 60  }, { x: 545, y: 105 }, { x: 558, y: 185 }, { x: 538, y: 218 },
  { x: 510, y: 30  }, { x: 515, y: 90  }, { x: 522, y: 148 }, { x: 518, y: 222 }, { x: 555, y: 142 },
  { x: 562, y: 100 }, { x: 570, y: 152 }, { x: 568, y: 90  }, { x: 542, y: 142 }, { x: 532, y: 178 },
  { x: 548, y: 242 }, { x: 558, y: 228 }, { x: 505, y: 242 }, { x: 515, y: 202 }, { x: 505, y: 195 },
  // Left upper-mid (along branch 3 & 5 area)
  { x: 82,  y: 80  }, { x: 95,  y: 132 }, { x: 108, y: 55  }, { x: 118, y: 178 }, { x: 130, y: 102 },
  { x: 145, y: 228 }, { x: 155, y: 65  }, { x: 168, y: 148 }, { x: 178, y: 102 }, { x: 190, y: 52  },
  { x: 198, y: 188 }, { x: 88,  y: 242 }, { x: 112, y: 278 }, { x: 138, y: 298 }, { x: 162, y: 262 },
  // Right upper-mid (along branch 4 & 6 area)
  { x: 392, y: 80  }, { x: 405, y: 132 }, { x: 418, y: 55  }, { x: 428, y: 178 }, { x: 440, y: 102 },
  { x: 452, y: 228 }, { x: 462, y: 65  }, { x: 472, y: 148 }, { x: 482, y: 102 }, { x: 492, y: 52  },
  { x: 498, y: 188 }, { x: 400, y: 242 }, { x: 422, y: 278 }, { x: 448, y: 298 }, { x: 468, y: 262 },
  // Left lower branches (along branch 1 area)
  { x: 38,  y: 278 }, { x: 55,  y: 322 }, { x: 70,  y: 268 }, { x: 88,  y: 358 }, { x: 105, y: 298 },
  { x: 120, y: 378 }, { x: 140, y: 320 }, { x: 155, y: 360 }, { x: 172, y: 288 }, { x: 188, y: 338 },
  // Right lower branches (along branch 2 area)
  { x: 395, y: 278 }, { x: 412, y: 322 }, { x: 428, y: 268 }, { x: 444, y: 358 }, { x: 462, y: 298 },
  { x: 478, y: 378 }, { x: 492, y: 320 }, { x: 504, y: 360 }, { x: 518, y: 288 }, { x: 532, y: 338 },
  // Upper mid (near branch 7 / near-vertical branch area)
  { x: 212, y: 28  }, { x: 225, y: 82  }, { x: 238, y: 128 }, { x: 250, y: 42  }, { x: 260, y: 92  },
  { x: 315, y: 42  }, { x: 328, y: 90  }, { x: 340, y: 130 }, { x: 352, y: 50  }, { x: 290, y: 18  },
]

function AnimatedTree() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
      <svg
        viewBox="0 0 580 920"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        style={{
          display: 'block',
          animation: 'tree-sway 4.5s ease-in-out infinite',
          transformOrigin: '50% 100%',
        }}
      >
        {/* ── Trunk — filled organic shape with root flare at base ── */}
        <path
          d="M 205 920
             C 215 895 228 868 240 840
             C 252 812 260 782 262 752
             C 264 722 265 692 265 662
             C 265 632 265 602 265 572
             C 266 542 267 512 268 482
             C 269 452 270 422 271 392
             C 272 362 273 344 276 328
             C 278 320 282 316 286 314
             L 298 314
             C 302 316 306 320 308 328
             C 311 344 312 362 313 392
             C 314 422 315 452 316 482
             C 317 512 318 542 319 572
             C 320 602 321 632 322 662
             C 323 692 325 722 328 752
             C 332 782 340 812 352 840
             C 362 868 372 895 380 920 Z"
          fill="#0A0A0F" stroke="none"
        />

        {/* ── Bark texture — subtle vertical strokes ── */}
        <path d="M 284 330 C 282 390 280 450 281 510 C 282 570 281 630 280 690 C 279 750 281 810 282 880"
          stroke="#4a3060" strokeWidth="1.5" fill="none" opacity="0.28" strokeLinecap="round"/>
        <path d="M 274 382 C 272 442 271 502 272 562 C 273 622 272 682 273 742 C 274 792 273 842 274 880"
          stroke="#4a3060" strokeWidth="1" fill="none" opacity="0.22" strokeLinecap="round"/>
        <path d="M 294 382 C 296 442 297 502 296 562 C 295 622 296 682 297 742 C 298 792 297 842 296 880"
          stroke="#4a3060" strokeWidth="1" fill="none" opacity="0.22" strokeLinecap="round"/>
        <path d="M 279 362 C 276 422 275 482 277 542 C 279 602 278 662 276 722"
          stroke="#4a3060" strokeWidth="0.8" fill="none" opacity="0.16" strokeLinecap="round"/>
        <path d="M 289 362 C 291 422 292 482 290 542 C 289 602 290 662 291 722"
          stroke="#4a3060" strokeWidth="0.8" fill="none" opacity="0.16" strokeLinecap="round"/>

        {/* ── Primary branches — 6 heavy structural limbs ── */}
        <path d="M 264 530 C 200 490 130 420 65 330 C 30 278 10 252 8 222"
          stroke="#0A0A0F" strokeWidth="17" fill="none" strokeLinecap="round"/>
        <path d="M 316 510 C 380 468 448 400 510 320 C 545 272 562 248 566 220"
          stroke="#0A0A0F" strokeWidth="17" fill="none" strokeLinecap="round"/>
        <path d="M 266 445 C 210 402 140 328 78 240 C 44 194 24 160 18 112"
          stroke="#0A0A0F" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 314 428 C 368 384 438 310 500 224 C 532 178 550 145 556 100"
          stroke="#0A0A0F" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 270 382 C 232 340 175 260 125 175 C 88 114 68 72 60 28"
          stroke="#0A0A0F" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M 310 368 C 348 325 402 244 452 162 C 488 100 510 58 518 16"
          stroke="#0A0A0F" strokeWidth="10" fill="none" strokeLinecap="round"/>

        {/* ── Near-vertical upper limb ── */}
        <path d="M 282 330 C 272 288 258 228 248 152 C 238 86 234 42 232 8"
          stroke="#0A0A0F" strokeWidth="8" fill="none" strokeLinecap="round"/>

        {/* ── Secondary branches — 2–3 per primary ── */}
        {/* From primary 1 (lower-left) */}
        <path d="M 140 412 C 95 360 50 295 14 212"
          stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M 140 412 C 168 370 185 320 188 272"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 85 330 C 60 280 38 235 22 178"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* From primary 2 (lower-right) */}
        <path d="M 435 398 C 480 342 525 278 558 198"
          stroke="#0A0A0F" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M 435 398 C 407 352 392 305 390 258"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 490 320 C 516 268 534 220 542 172"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* From primary 3 (mid-left) */}
        <path d="M 148 320 C 100 265 55 205 22 140"
          stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 148 320 C 172 272 186 222 190 178"
          stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From primary 4 (mid-right) */}
        <path d="M 432 308 C 478 252 520 192 550 130"
          stroke="#0A0A0F" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 432 308 C 408 258 394 208 390 164"
          stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From primary 5 (upper-left) */}
        <path d="M 168 258 C 132 206 90 155 62 100"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 168 258 C 190 210 202 158 208 112"
          stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* From primary 6 (upper-right) */}
        <path d="M 412 244 C 446 192 476 140 498 88"
          stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 412 244 C 390 196 378 145 378 102"
          stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* From near-vertical limb */}
        <path d="M 248 152 C 236 118 228 82 230 48"
          stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 248 152 C 262 118 270 82 265 48"
          stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>

        {/* ── Tertiary twigs — dozens of fine lines at the tips ── */}
        {/* Left outer tips */}
        <path d="M 8 222 C 2 185 0 150 4 118" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 8 222 C 22 188 30 155 28 122" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 14 212 C 6 178 4 145 8 115" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 14 212 C 26 180 32 148 28 115" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 22 178 C 12 148 8 116 12 88" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 22 178 C 34 148 38 116 34 88" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 18 112 C 8 82 4 52 8 25" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 18 112 C 30 84 36 54 32 25" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 18 112 C 6 90 2 68 5 46" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M 62 100 C 50 68 44 38 48 12" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 62 100 C 74 68 78 38 72 12" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 60 28 C 48 14 38 4 35 0" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 60 28 C 70 12 80 2 80 0" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Left mid twigs */}
        <path d="M 85 330 C 68 292 55 252 52 212" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 85 330 C 100 292 110 254 108 212" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 188 272 C 176 240 170 208 174 178" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 188 272 C 200 240 204 208 198 178" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 190 178 C 180 148 176 115 180 84" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 190 178 C 200 148 204 115 198 84" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M 208 112 C 196 82 190 52 194 25" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 208 112 C 218 82 222 52 216 25" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Right outer tips */}
        <path d="M 566 220 C 572 182 574 148 568 118" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 566 220 C 556 182 552 148 558 118" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 558 198 C 566 162 570 128 564 98" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 558 198 C 548 162 544 128 550 98" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 542 172 C 550 138 556 104 550 74" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 542 172 C 532 138 526 104 532 74" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M 556 100 C 562 68 564 38 558 12" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 556 100 C 546 68 542 38 548 12" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 556 100 C 566 80 572 60 568 38" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M 518 16 C 506 6 494 0 488 0" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 518 16 C 528 4 540 0 542 2" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Right mid twigs */}
        <path d="M 390 258 C 378 226 372 194 376 164" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 390 258 C 402 226 406 194 400 164" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 490 320 C 510 268 525 222 528 178" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 390 164 C 378 132 374 98 378 68" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 390 164 C 402 132 406 98 400 68" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M 498 88 C 486 58 480 28 484 4" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 498 88 C 510 58 514 28 508 4" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M 378 102 C 366 70 360 40 364 14" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 378 102 C 390 70 394 40 388 14" stroke="#0A0A0F" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Near-vertical limb tips */}
        <path d="M 232 8 C 222 -10 216 -25 220 -35" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 248 48 C 238 20 234 -4 238 -20" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 265 48 C 272 20 276 -6 272 -22" stroke="#0A0A0F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

        {/* ── Animated violet dot-leaves ── */}
        {LEAF_DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={i % 5 === 0 ? 5 : i % 5 === 1 ? 4.5 : i % 5 === 2 ? 4 : i % 5 === 3 ? 3.5 : 3}
            fill="#7C6A9E"
            style={{
              opacity: 0.65,
              animation: `leaf-float ${2.5 + (i % 9) * 0.17}s ease-in-out infinite`,
              animationDelay: `${(i * 0.11) % 4}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [imgErr, setImgErr]         = useState(false)

  return (
    <>
      {/* ── Responsive overrides ──────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .tree-col    { display: none !important; }
          .hero-left   { max-width: 560px !important; margin: 0 auto !important; text-align: center !important; }
          .hero-search { margin-left: auto !important; margin-right: auto !important; }
          .hero-btns   { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .nav-links   { display: none !important; }
          .hero-h1     { font-size: clamp(40px, 12vw, 64px) !important; }
        }
      `}</style>

      {/* ── Parchment background ──────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, background: '#E8E0D0', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Dot grid overlay ──────────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #C4B9A0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.45,
      }} />

      {/* ── TOP NAVIGATION ────────────────────────────────────────── */}
      <nav style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         50,
        height:         56,
        background:     'rgba(232,224,208,0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom:   '1px solid rgba(10,10,15,0.1)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '0 28px',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', flexShrink: 0,
        }}>
          {imgErr ? (
            <span style={{
              fontSize: 15, fontWeight: 700, color: '#0A0A0F',
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            }}>23rdGen</span>
          ) : (
            <div style={{ width: 28, height: 28, position: 'relative', flexShrink: 0 }}>
              <Image src="/inspiration/logo.png" alt="23rdGen" fill
                style={{ objectFit: 'contain' }} onError={() => setImgErr(true)} />
            </div>
          )}
        </Link>

        {/* Nav links — absolutely centered in the bar */}
        <div className="nav-links" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} style={{
              fontSize: 12,
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              color: 'rgba(10,10,15,0.6)',
              textDecoration: 'none',
              padding: '6px 11px',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transition: 'color 120ms',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#0A0A0F')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(10,10,15,0.6)')}
            >{item.label}</Link>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Link href="/login" style={{
            fontSize: 12,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#0A0A0F',
            textDecoration: 'none',
            padding: '7px 16px',
            border: '2px solid #0A0A0F',
            boxShadow: '2px 2px 0px #0A0A0F',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
            transition: 'box-shadow 80ms, transform 80ms',
            background: 'transparent',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(1px,1px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '2px 2px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
          >Log in</Link>

          <Link href="/signup" style={{
            fontSize: 12,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#E8E0D0',
            background: '#7C6A9E',
            textDecoration: 'none',
            padding: '7px 16px',
            border: '2px solid #0A0A0F',
            boxShadow: '2px 2px 0px #0A0A0F',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
            transition: 'box-shadow 80ms, transform 80ms',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(1px,1px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '2px 2px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
          >Sign up</Link>
        </div>
      </nav>

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section style={{
        position:      'relative',
        zIndex:        1,
        minHeight:     '100vh',
        display:       'flex',
        alignItems:    'center',
        paddingTop:    56,
        paddingBottom: 56,
      }}>
        <div className="hero-grid" style={{
          width:               '100%',
          maxWidth:            1320,
          margin:              '0 auto',
          padding:             '0 48px',
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 64,
          alignItems:          'center',
        }}>

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="hero-left">
            <h1 className="hero-h1" style={{
              fontFamily:  'var(--font-dm-serif), DM Serif Display, serif',
              fontSize:    'clamp(52px, 5.5vw, 88px)',
              lineHeight:  1.04,
              color:       '#0A0A0F',
              margin:      '0 0 22px 0',
              letterSpacing: '-0.01em',
              fontWeight:  400,
            }}>
              Step Into<br />
              <AnimatedTextCycle
                words={['Artificial', 'Agentic', 'Conscious', 'Automated', 'Intelligent']}
                interval={3000}
                className="text-[#7C6A9E]"
              />{' '}
              <br />
              Consciousness.
            </h1>

            <p style={{
              fontFamily:  'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize:    14,
              lineHeight:  1.75,
              color:       'rgba(10,10,15,0.52)',
              margin:      '0 0 28px 0',
              maxWidth:    420,
            }}>
              Create AI agents, agentic teams, workflows and skills.<br />
              Embed them into your work. Save time. Earn automatically.
            </p>

            {/* Search bar */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hero-search"
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         10,
                width:       '100%',
                maxWidth:    440,
                height:      50,
                padding:     '0 16px',
                background:  '#F0E6D0',
                border:      '2px solid #0A0A0F',
                boxShadow:   '3px 3px 0px #0A0A0F',
                borderRadius: 0,
                cursor:      'text',
                marginBottom: 22,
                fontFamily:  'var(--font-ibm-mono), IBM Plex Mono, monospace',
                transition:  'box-shadow 80ms, transform 80ms',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                <circle cx="6.5" cy="6.5" r="5" stroke="#0A0A0F" strokeWidth="1.5"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{
                flex: 1, textAlign: 'left', fontSize: 13,
                color: 'rgba(10,10,15,0.38)', letterSpacing: '0.01em',
              }}>
                Search agents, prompts, skills, workflows...
              </span>
              <kbd style={{
                display: 'flex', alignItems: 'center', gap: 2,
                padding: '3px 8px',
                background: '#E8E0D0',
                border: '2px solid #0A0A0F',
                borderRadius: 0,
                fontSize: 11,
                color: 'rgba(10,10,15,0.45)',
                fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                flexShrink: 0,
              }}>⌘K</kbd>
            </button>

            {/* CTA buttons */}
            <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/browse" style={{
                display:         'inline-flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontFamily:      'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize:        12,
                fontWeight:      600,
                letterSpacing:   '0.09em',
                textTransform:   'uppercase',
                textDecoration:  'none',
                color:           '#E8E0D0',
                background:      '#7C6A9E',
                border:          '2px solid #0A0A0F',
                boxShadow:       '3px 3px 0px #0A0A0F',
                borderRadius:    0,
                padding:         '12px 28px',
                transition:      'box-shadow 80ms, transform 80ms',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
              >
                Browse Agents
              </Link>

              <Link href="/upload" style={{
                display:         'inline-flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontFamily:      'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize:        12,
                fontWeight:      600,
                letterSpacing:   '0.09em',
                textTransform:   'uppercase',
                textDecoration:  'none',
                color:           '#0A0A0F',
                background:      '#F0E6D0',
                border:          '2px solid #0A0A0F',
                boxShadow:       '3px 3px 0px #0A0A0F',
                borderRadius:    0,
                padding:         '12px 28px',
                transition:      'box-shadow 80ms, transform 80ms',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
              >
                Upload Yours
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Animated SVG Tree ─────────────────── */}
          <div className="tree-col" style={{ height: 'min(88vh, 860px)', display: 'flex', alignItems: 'flex-end' }}>
            <AnimatedTree />
          </div>
        </div>
      </section>

      {/* ── BOTTOM TICKER ─────────────────────────────────────────── */}
      <div style={{
        position:   'fixed',
        bottom:     0,
        left:       0,
        right:      0,
        zIndex:     50,
        height:     44,
        background: '#0A0A0F',
        borderTop:  '1px solid #7C6A9E',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
      }}>
        {/* Scrolling strip — duplicated twice for seamless loop */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          animation:  'ticker-scroll 24s linear infinite',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}>
          {[0, 1].map(rep => (
            <span key={rep} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontFamily:    'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize:      11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'rgba(232,224,208,0.5)',
                padding:       '0 28px',
                flexShrink:    0,
              }}>
                Works with:
              </span>
              {TICKER_ITEMS.map((item, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily:    'var(--font-ibm-mono), IBM Plex Mono, monospace',
                    fontSize:      12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color:         '#E8E0D0',
                    padding:       '0 20px',
                    flexShrink:    0,
                  }}>{item}</span>
                  {i < TICKER_ITEMS.length - 1 && (
                    <span style={{ color: '#7C6A9E', fontSize: 16, flexShrink: 0 }}>·</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
