'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

const FOOTER_COLS: Record<string, [string, string][]> = {
  PRODUCT: [
    ['Agents', '/browse?type=agent'],
    ['Prompts', '/browse?type=prompt'],
    ['Skills', '/browse?type=skill'],
    ['Workflows', '/browse?type=workflow'],
    ['Teams', '/browse?type=team'],
  ],
  EXPLORE: [
    ['Hot Shots', '/browse'],
    ['Cult Classics', '/browse'],
    ['Fresh Drops', '/browse'],
    ['Under the Radar', '/browse'],
    ['One-Click', '/browse'],
  ],
  RESOURCES: [
    ['Blog', '#'],
    ['Changelog', '#'],
    ['Guides', '#'],
    ['Community', '#'],
    ['Newsletter', '#'],
  ],
  DEVELOPERS: [
    ['API Docs', '#'],
    ['SDK', '#'],
    ['Status', '#'],
    ['Discord', '#'],
    ['GitHub', '#'],
  ],
  COMPANY: [
    ['About', '#'],
    ['Careers', '#'],
    ['Partners', '#'],
    ['Contact', '#'],
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

export default function Footer() {
  const colRefs = useRef<(HTMLDivElement | null)[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1 }
    )

    colRefs.current.forEach(col => { if (col) observer.observe(col) })
    if (bottomRef.current) observer.observe(bottomRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <footer style={{
      background: '#0A0A0F',
      padding: '80px 6vw 40px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* 5-column link grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 32,
        marginBottom: 60,
      }}>
        {Object.entries(FOOTER_COLS).map(([col, links], colIdx) => (
          <div
            key={col}
            ref={el => { colRefs.current[colIdx] = el }}
            className="footer-col"
            style={{ transitionDelay: `${colIdx * 80}ms` }}
          >
            <div style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#7C6A9E',
              marginBottom: 16,
            }}>
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
          style={{
            fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            color: 'rgba(232,224,208,0.06)',
            animation: 'footer-drift 8s ease-in-out infinite',
            display: 'inline-block',
            cursor: 'default',
            transition: 'color 400ms ease',
            userSelect: 'none',
            lineHeight: 1,
          }}
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
        style={{
          borderTop: '1px solid rgba(124,106,158,0.2)',
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          transitionDelay: '400ms',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          fontSize: 11,
          color: '#5A6A7A',
        }}>
          © 2026 23rdGen. Open marketplace for deployable intelligence.
        </span>

        <span style={{
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          fontSize: 10,
          color: '#3A3A4A',
          fontStyle: 'italic',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{ color: '#7C6A9E', fontStyle: 'normal' }}>♦</span>
          Crafted by Nakshatra Sharma
          <span style={{ color: '#7C6A9E', fontStyle: 'normal' }}>♦</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Twitter/X */}
          <SocialIcon href="#" label="Twitter / X">
            <path d="M18 6L6 18M6 6l12 12" />
          </SocialIcon>
          {/* GitHub */}
          <SocialIcon href="#" label="GitHub">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </SocialIcon>
          {/* Discord */}
          <SocialIcon href="#" label="Discord">
            <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>
            <path d="M7.5 7.5c2.5-1 7.5-1 9 0M7.5 16.5c2.5 1 7.5 1 9 0M5 5.5C3 7 2 9.5 2 12s1 5 3 6.5M19 5.5c2 1.5 3 4 3 6.5s-1 5-3 6.5" />
          </SocialIcon>
        </div>
      </div>
    </footer>
  )
}
