'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchModal from '@/components/search/SearchModal'

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

// Dot-leaf positions in SVG viewBox "0 0 520 700"
const LEAF_DOTS: { x: number; y: number }[] = [
  // Far-left cluster (branch tips ~x 2–44, y 58–148)
  { x: 22, y: 148 }, { x: 8,  y: 72  }, { x: 44, y: 62  }, { x: 4,  y: 92  },
  { x: 6,  y: 132 }, { x: 74, y: 130 }, { x: 35, y: 100 }, { x: 18, y: 58  },
  // Left-upper branch tips
  { x: 42, y: 160 }, { x: 26, y: 106 }, { x: 68, y: 78  }, { x: 67, y: 195 },
  { x: 38, y: 164 }, { x: 78, y: 168 },
  // Left-mid branch tips
  { x: 44, y: 220 }, { x: 6,  y: 130 }, { x: 74, y: 132 }, { x: 88, y: 263 },
  { x: 34, y: 140 }, { x: 76, y: 138 }, { x: 118, y: 136 },
  // Left-lower branch tips
  { x: 72, y: 315 }, { x: 15, y: 228 }, { x: 105, y: 224 }, { x: 62, y: 276 },
  // Far-right cluster (branch tips ~x 430–494, y 60–155)
  { x: 452, y: 155 }, { x: 472, y: 62  }, { x: 430, y: 62  }, { x: 474, y: 92  },
  { x: 464, y: 72  }, { x: 404, y: 72  }, { x: 430, y: 124 }, { x: 418, y: 122 },
  // Right-upper branch tips
  { x: 434, y: 162 }, { x: 455, y: 120 }, { x: 422, y: 170 }, { x: 462, y: 172 },
  // Right-mid branch tips
  { x: 444, y: 216 }, { x: 474, y: 122 }, { x: 414, y: 122 }, { x: 380, y: 122 },
  { x: 476, y: 120 }, { x: 460, y: 122 }, { x: 494, y: 114 },
  // Right-lower branch tips
  { x: 430, y: 305 }, { x: 477, y: 212 }, { x: 400, y: 215 }, { x: 427, y: 248 },
  { x: 395, y: 343 }, { x: 384, y: 120 }, { x: 424, y: 120 },
  // Mid-upper scattered along branches
  { x: 158, y: 403 }, { x: 340, y: 389 }, { x: 138, y: 324 }, { x: 365, y: 314 },
  { x: 138, y: 266 }, { x: 357, y: 262 }, { x: 122, y: 245 }, { x: 370, y: 252 },
  { x: 158, y: 339 }, { x: 350, y: 326 },
  // Mid-branch fill
  { x: 102, y: 271 }, { x: 183, y: 361 }, { x: 312, y: 359 }, { x: 402, y: 272 },
  { x: 52,  y: 192 }, { x: 462, y: 186 }, { x: 437, y: 171 }, { x: 58,  y: 249 },
  { x: 442, y: 244 }, { x: 82,  y: 216 }, { x: 438, y: 210 },
]

function AnimatedTree() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
      <svg
        viewBox="0 0 520 700"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax meet"
        style={{
          display: 'block',
          animation: 'tree-sway 4.5s ease-in-out infinite',
          transformOrigin: '50% 100%',
        }}
      >
        {/* ── Trunk (tapering) ──────────────────────────────────────── */}
        <path d="M 260 700 C 258 672 254 640 257 608 C 260 576 264 550 261 518"
          stroke="#0A0A0F" strokeWidth="22" fill="none" strokeLinecap="round"/>
        <path d="M 261 518 C 258 488 255 464 258 432 C 261 408 262 388 260 362"
          stroke="#0A0A0F" strokeWidth="14" fill="none" strokeLinecap="round"/>
        <path d="M 260 362 C 258 344 256 330 258 312"
          stroke="#0A0A0F" strokeWidth="8"  fill="none" strokeLinecap="round"/>

        {/* ── Main branches ─────────────────────────────────────────── */}
        <path d="M 260 475 C 232 452 195 428 160 400 C 128 374 98 344 70 312"
          stroke="#0A0A0F" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M 262 462 C 290 436 322 410 354 383 C 382 358 410 330 438 302"
          stroke="#0A0A0F" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M 260 430 C 225 398 182 360 145 325 C 112 292 78 255 45 220"
          stroke="#0A0A0F" strokeWidth="9"  fill="none" strokeLinecap="round"/>
        <path d="M 260 418 C 295 386 335 350 368 316 C 398 284 425 250 448 216"
          stroke="#0A0A0F" strokeWidth="9"  fill="none" strokeLinecap="round"/>
        <path d="M 258 385 C 220 348 175 305 138 266 C 104 230 68 194 40 160"
          stroke="#0A0A0F" strokeWidth="7"  fill="none" strokeLinecap="round"/>
        <path d="M 262 378 C 298 342 335 300 368 263 C 398 230 428 196 452 162"
          stroke="#0A0A0F" strokeWidth="7"  fill="none" strokeLinecap="round"/>
        <path d="M 258 358 C 218 320 172 278 128 243 C 88 212 52 180 22 148"
          stroke="#0A0A0F" strokeWidth="5"  fill="none" strokeLinecap="round"/>
        <path d="M 262 352 C 302 315 342 276 378 244 C 410 215 440 184 465 153"
          stroke="#0A0A0F" strokeWidth="5"  fill="none" strokeLinecap="round"/>

        {/* ── Secondary branches ────────────────────────────────────── */}
        {/* From lower-left end */}
        <path d="M 70 312 C 50 284 30 254 14 224"  stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 70 312 C 86 283 98 252 105 222" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 120 368 C 98 336 78 302 60 272" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From lower-right end */}
        <path d="M 438 302 C 458 272 472 240 478 208" stroke="#0A0A0F" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M 438 302 C 420 272 412 242 408 212" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 398 342 C 415 310 424 276 428 246" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* From mid-left end */}
        <path d="M 45 220 C 25 190 10 158 6 128"   stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 45 220 C 62 190 72 158 74 128"  stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 90 262 C 68 228 50 194 42 162"  stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* From mid-right end */}
        <path d="M 448 216 C 464 184 474 152 476 120" stroke="#0A0A0F" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 448 216 C 430 184 420 152 418 120" stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* From upper-left end */}
        <path d="M 40 160 C 22 130 12 100 8 70"   stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 40 160 C 58 130 68 100 66 70"  stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 68 196 C 50 164 36 130 32 98"  stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* From upper-right end */}
        <path d="M 452 162 C 466 130 474 100 472 70" stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 452 162 C 434 130 424 100 422 70" stroke="#0A0A0F" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* From far-left end */}
        <path d="M 22 148 C 8 118 4 86 6 58"     stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 22 148 C 40 118 48 86 44 58"  stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* From far-right end */}
        <path d="M 465 153 C 478 122 485 90 482 60" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 465 153 C 448 122 440 90 442 60" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>

        {/* ── Tertiary twigs ────────────────────────────────────────── */}
        <path d="M 14 224 C 2 194 2 162 4 132"    stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 14 224 C 30 194 36 162 32 132" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 105 222 C 90 192 80 160 78 130"   stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 105 222 C 118 192 122 160 118 130" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 478 208 C 492 176 498 144 494 112" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 478 208 C 464 176 458 144 460 112" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 408 212 C 393 180 385 148 384 118" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 408 212 C 422 180 428 148 424 118" stroke="#0A0A0F" strokeWidth="2" fill="none" strokeLinecap="round"/>

        {/* ── Animated violet dot-leaves ────────────────────────────── */}
        {LEAF_DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={i % 3 === 0 ? 5 : i % 3 === 1 ? 4 : 3.5}
            fill="#7C6A9E"
            style={{
              opacity: 0.72,
              animation: `leaf-float ${2.8 + (i % 7) * 0.38}s ease-in-out infinite`,
              animationDelay: `${(i * 0.17) % 3.4}s`,
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
        padding:        '0 28px',
        gap:            0,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginRight: 28, textDecoration: 'none', flexShrink: 0,
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

        {/* Nav links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2 }}>
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
              Artificial<br />
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
          <div className="tree-col" style={{ height: 'min(640px, 78vh)', display: 'flex', alignItems: 'flex-end' }}>
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
