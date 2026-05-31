'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const FOOTER_COLS: Record<string, [string, string][]> = {
  PRODUCT: [
    ['Agents',    '/browse?type=agent'],
    ['Prompts',   '/browse?type=prompt'],
    ['Skills',    '/browse?type=skill'],
    ['Workflows', '/browse?type=workflow'],
    ['Teams',     '/browse?type=team'],
  ],
  EXPLORE: [
    ['Hot Shots',        '/browse'],
    ['Cult Classics',    '/browse'],
    ['Fresh Drops',      '/browse'],
    ['Under the Radar',  '/browse'],
    ['One-Click',        '/browse'],
  ],
  RESOURCES: [
    ['Blog',        '#'],
    ['Changelog',   '#'],
    ['Guides',      '#'],
    ['Community',   '#'],
    ['Newsletter',  '#'],
  ],
  DEVELOPERS: [
    ['API Docs', '#'],
    ['SDK',      '#'],
    ['Status',   '#'],
    ['Discord',  '#'],
    ['GitHub',   '#'],
  ],
  COMPANY: [
    ['About',    '#'],
    ['Careers',  '#'],
    ['Partners', '#'],
    ['Contact',  '#'],
  ],
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
        fontSize: 13,
        color: '#A89880',
        textDecoration: 'none',
        marginBottom: 10,
        paddingLeft: 0,
        transition: 'color 200ms ease, padding-left 200ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.color = '#E8E0D0'
        el.style.paddingLeft = '4px'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.color = '#A89880'
        el.style.paddingLeft = '0px'
      }}
    >
      {label}
    </Link>
  )
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      style={{
        color: '#5A6A7A',
        textDecoration: 'none',
        transition: 'color 200ms ease',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8E0D0')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#5A6A7A')}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </Link>
  )
}

function WizardPixel() {
  return (
    <svg
      width="100"
      height="134"
      viewBox="0 0 50 67"
      fill="none"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="19" y="0"  width="2"  height="1" fill="#1A1520"/>
      <rect x="18" y="1"  width="4"  height="1" fill="#1A1520"/>
      <rect x="17" y="2"  width="6"  height="1" fill="#1A1520"/>
      <rect x="16" y="3"  width="8"  height="1" fill="#1A1520"/>
      <rect x="15" y="4"  width="10" height="1" fill="#1A1520"/>
      <rect x="14" y="5"  width="12" height="1" fill="#1A1520"/>
      <rect x="13" y="6"  width="14" height="1" fill="#1A1520"/>
      <rect x="12" y="7"  width="16" height="1" fill="#1A1520"/>
      <rect x="16" y="4"  width="1"  height="1" fill="#7C6B9E" opacity="0.7"/>
      <rect x="20" y="2"  width="1"  height="1" fill="#A594C4" opacity="0.6"/>
      <rect x="9"  y="8"  width="22" height="3" fill="#7C6B9E"/>
      <rect x="12" y="11" width="16" height="9" fill="#EDE8DF"/>
      <rect x="13" y="12" width="4"  height="1" fill="#8B7060"/>
      <rect x="22" y="12" width="4"  height="1" fill="#8B7060"/>
      <rect x="13" y="13" width="3" height="3" fill="#141210"/>
      <rect x="13" y="13" width="1" height="1" fill="#EDE8DF" opacity="0.7"/>
      <rect x="22" y="13" width="3" height="3" fill="#141210"/>
      <rect x="22" y="13" width="1" height="1" fill="#EDE8DF" opacity="0.7"/>
      <rect x="19" y="16" width="2" height="2" fill="#C4A080"/>
      <rect x="14" y="18" width="1" height="1" fill="#8B6050"/>
      <rect x="15" y="19" width="8" height="1" fill="#8B6050"/>
      <rect x="23" y="18" width="1" height="1" fill="#8B6050"/>
      <rect x="10" y="19" width="20" height="2" fill="#D4C4A8"/>
      <rect x="12" y="21" width="16" height="2" fill="#D4C4A8"/>
      <rect x="14" y="23" width="12" height="2" fill="#D4C4A8"/>
      <rect x="16" y="25" width="8"  height="1" fill="#D4C4A8"/>
      <rect x="10" y="19" width="20" height="4" fill="#7C6B9E" opacity="0.85"/>
      <rect x="6"  y="23" width="28" height="3"  fill="#2A1E3E"/>
      <rect x="8"  y="26" width="24" height="18" fill="#2A1E3E"/>
      <rect x="18" y="24" width="4"  height="20" fill="#321E4A"/>
      <rect x="11" y="28" width="2"  height="2"  fill="#7C6B9E" opacity="0.7"/>
      <rect x="22" y="32" width="2"  height="2"  fill="#7C6B9E" opacity="0.5"/>
      <rect x="13" y="36" width="1"  height="1"  fill="#A594C4" opacity="0.6"/>
      <rect x="9"  y="44" width="22" height="2"  fill="#1E1530"/>
      <rect x="2"  y="23" width="7"  height="11" fill="#2A1E3E"/>
      <rect x="31" y="23" width="7"  height="11" fill="#2A1E3E"/>
      <rect x="2"  y="34" width="6"  height="4"  fill="#EDE8DF"/>
      <rect x="32" y="34" width="6"  height="4"  fill="#EDE8DF"/>
      <rect x="10" y="46" width="8" height="3" fill="#2A1E3E"/>
      <rect x="22" y="46" width="8" height="3" fill="#2A1E3E"/>
      <rect x="9"  y="49" width="9" height="2" fill="#141210"/>
      <rect x="22" y="49" width="9" height="2" fill="#141210"/>
      <rect x="37" y="20" width="2" height="32" fill="#8B6914"/>
      <rect x="35" y="24" width="6" height="2"  fill="#8B6914"/>
      <rect x="34" y="11" width="8" height="8" fill="#7C6B9E" opacity="0.3"/>
      <rect x="35" y="12" width="6" height="6" fill="#7C6B9E"/>
      <rect x="36" y="13" width="4" height="4" fill="#A594C4"/>
      <rect x="36" y="13" width="2" height="2" fill="#EDE8DF" opacity="0.8"/>
      <rect x="36" y="19" width="2" height="1" fill="#A0790A"/>
    </svg>
  )
}

function BarcodeStripes() {
  const pattern = [3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2]
  let x = 0
  const bars: { x: number; w: number; fill: boolean }[] = []
  pattern.forEach((w, i) => {
    bars.push({ x, w, fill: i % 2 === 0 })
    x += w
  })
  const total = x
  return (
    <svg width="100" height="36" viewBox={`0 0 ${total} 36`} style={{ imageRendering: 'pixelated' }}>
      {bars
        .filter(b => b.fill)
        .map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={36} fill="#0A0A0F" />
        ))}
    </svg>
  )
}

// Standalone ID card — used both in modal and inline in footer
export function FounderIDCard() {
  return (
    <div
      style={{
        background: '#F0E6D0',
        border: '3px solid #0A0A0F',
        boxShadow: '6px 6px 0px #7C6A9E',
        borderRadius: 0,
        overflow: 'hidden',
        position: 'relative',
        maxWidth: 420,
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
        }}
      />
      {/* Top bar */}
      <div style={{ background: '#2A0A0A', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 12, color: '#E8E0D0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          23RDGEN // FOUNDER IDENTIFICATION
        </span>
      </div>
      {/* Issued line */}
      <div style={{ background: 'rgba(42,10,10,0.08)', padding: '5px 16px', borderBottom: '1px solid rgba(10,10,15,0.15)' }}>
        <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, color: '#5A4A3A', letterSpacing: '0.08em' }}>
          Issued: 2026 · Active: Ongoing
        </span>
      </div>
      {/* Two-column body */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Left — avatar + barcode */}
        <div style={{ width: 130, flexShrink: 0, borderRight: '1.5px solid rgba(10,10,15,0.15)', padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: 'rgba(124,106,158,0.06)' }}>
          <WizardPixel />
          <BarcodeStripes />
          <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 9, color: '#5A4A3A', letterSpacing: '0.12em', textAlign: 'center' }}>
            23RDGEN-001
          </span>
        </div>
        {/* Right — details */}
        <div style={{ flex: 1, padding: '16px' }}>
          {(
            [
              ['Name',    'Nakshatra Sharma'],
              ['Title',   'Co-Founder & CEO, 23rdGen'],
              ['Agency',  '23rdGen AI Agency'],
              ['Mission', 'Building the world’s first open marketplace for deployable AI intelligence'],
              ['Vision',  'A future where anyone can build, share and earn from AI agents — the builder class economy'],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 9, color: '#7C6A9E', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2 }}>
                {label}
              </div>
              <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, color: '#0A0A0F', lineHeight: 1.45 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quote */}
      <div style={{ borderTop: '1.5px solid rgba(10,10,15,0.15)', padding: '12px 16px', background: 'rgba(124,106,158,0.05)' }}>
        <p style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, color: '#2A1A0E', lineHeight: 1.65, margin: 0 }}>
          &ldquo;23rdGen was built for the builder generation. We believe AI intelligence should be open, deployable, and rewarded. Every agent uploaded is a step toward a world where human creativity scales infinitely through AI.&rdquo;
        </p>
      </div>
      {/* Signature + stamp */}
      <div style={{ borderTop: '1.5px solid rgba(10,10,15,0.15)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 16, color: '#2A1A0E', fontStyle: 'italic' }}>
          Nakshatra Sharma
        </span>
        <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, color: '#7C6A9E', border: '1.5px solid #7C6A9E', padding: '3px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          VERIFIED BUILDER ■
        </span>
      </div>
    </div>
  )
}

// Standalone contact form — used both in modal and inline in footer
export function FounderContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
    fontSize: 11,
    background: '#E8DCC8',
    border: '1.5px solid #0A0A0F',
    borderRadius: 0,
    padding: '8px 10px',
    color: '#0A0A0F',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('Message from 23rdGen — ' + name)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nWhat I'm building:\n${message}`)
    window.open(`mailto:nakshatrasharma669@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <input required placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
        <input required type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
      </div>
      <textarea
        required
        placeholder="What are you building?"
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={4}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
          background: sent ? '#2A5A2A' : '#0A0A0F',
          color: sent ? '#A8D8A8' : '#E8E0D0',
          border: '2px solid #0A0A0F',
          boxShadow: '3px 3px 0px rgba(10,10,15,0.4)',
          padding: '10px 0',
          cursor: 'pointer',
          transition: 'background 300ms, color 300ms',
          borderRadius: 0,
        }}
      >
        {sent ? '✓ MESSAGE SENT' : 'SEND TO NAKSHATRA →'}
      </button>
    </form>
  )
}

function FounderModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', overflowY: 'auto' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: 420, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <FounderIDCard />
        <div style={{ background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '4px 4px 0px #0A0A0F', padding: 16 }}>
          <FounderContactForm />
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const colRefs = useRef<(HTMLDivElement | null)[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const [founderOpen, setFounderOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view') }) },
      { threshold: 0.1 }
    )
    colRefs.current.forEach(col => { if (col) observer.observe(col) })
    if (bottomRef.current) observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = founderOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [founderOpen])

  return (
    <>
      {founderOpen && <FounderModal onClose={() => setFounderOpen(false)} />}

      <footer style={{ background: '#0A0A0F', padding: '72px 6vw 40px', position: 'relative', zIndex: 2 }}>

        {/* ── Founder section ── */}
        <div style={{ marginBottom: 64, display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Left: label + ID card */}
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7C6A9E', marginBottom: 16 }}>
              About the Founder
            </div>
            <FounderIDCard />
          </div>

          {/* Right: label + contact form */}
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7C6A9E', marginBottom: 16 }}>
              Get in Touch
            </div>
            <FounderContactForm />
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(124,106,158,0.15)', marginBottom: 56 }} />

        {/* ── 5-column link grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32, marginBottom: 60 }}>
          {Object.entries(FOOTER_COLS).map(([col, links], colIdx) => (
            <div
              key={col}
              ref={el => { colRefs.current[colIdx] = el }}
              className="footer-col"
              style={{ transitionDelay: `${colIdx * 80}ms` }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7C6A9E', marginBottom: 16 }}>
                {col}
              </div>
              {links.map(([label, href]) => (
                <FooterLink key={label} label={label} href={href} />
              ))}
            </div>
          ))}
        </div>

        {/* Ghost wordmark */}
        <div style={{ textAlign: 'center', margin: '60px 0' }}>
          <span
            style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(5rem, 12vw, 10rem)', color: 'rgba(232,224,208,0.06)', animation: 'footer-drift 8s ease-in-out infinite', display: 'inline-block', cursor: 'default', transition: 'color 400ms ease', userSelect: 'none', lineHeight: 1 }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(232,224,208,0.12)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(232,224,208,0.06)')}
          >
            23rdGen
          </span>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="footer-col"
          style={{ borderTop: '1px solid rgba(124,106,158,0.2)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, transitionDelay: '400ms' }}
        >
          <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, color: '#5A6A7A' }}>
            © 2026 23rdGen. Open marketplace for deployable intelligence.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setFounderOpen(true)}
              style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: '#7C6A9E', border: '2px solid #7C6A9E', boxShadow: '2px 2px 0px #7C6A9E', padding: '4px 10px', cursor: 'pointer', borderRadius: 0, transition: 'background 150ms, color 150ms' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#7C6A9E'; el.style.color = '#E8E0D0' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#7C6A9E' }}
            >
              ABOUT THE FOUNDER ↗
            </button>
            <SocialIcon href="#" label="Twitter / X">
              <path d="M18 6L6 18M6 6l12 12" />
            </SocialIcon>
            <SocialIcon href="#" label="GitHub">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </SocialIcon>
            <SocialIcon href="#" label="Discord">
              <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>
              <path d="M7.5 7.5c2.5-1 7.5-1 9 0M7.5 16.5c2.5 1 7.5 1 9 0M5 5.5C3 7 2 9.5 2 12s1 5 3 6.5M19 5.5c2 1.5 3 4 3 6.5s-1 5-3 6.5" />
            </SocialIcon>
          </div>
        </div>
      </footer>
    </>
  )
}
