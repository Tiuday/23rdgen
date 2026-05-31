'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Sidebar from './Sidebar'

const PIXEL_CHARS = [
  { emoji: '🧙', style: { top: '20%', left: '3%', animation: 'drift-1 28s ease-in-out infinite', animationDelay: '0s' } },
  { emoji: '🧝', style: { top: '10%', right: '5%', animation: 'drift-2 35s ease-in-out infinite', animationDelay: '-10s' } },
  { emoji: '🧚', style: { bottom: '25%', right: '3%', animation: 'drift-3 30s ease-in-out infinite', animationDelay: '-14s' } },
  { emoji: '🤖', style: { top: '55%', left: '1.5%', animation: 'drift-4 24s ease-in-out infinite', animationDelay: '-6s' } },
  { emoji: '👾', style: { bottom: '15%', left: '5%', animation: 'drift-5 40s ease-in-out infinite', animationDelay: '-20s' } },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === '/') return <>{children}</>

  const isAuthPage = pathname === '/login' || pathname === '/signup'

  return (
    <>
      {/* Floating pixel characters */}
      {PIXEL_CHARS.map((char) => (
        <div
          key={char.emoji}
          aria-hidden="true"
          style={{
            position: 'fixed',
            fontSize: 28,
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0.12,
            lineHeight: 1,
            userSelect: 'none',
            ...char.style,
          }}
        >
          {char.emoji}
        </div>
      ))}

      {/* Floating 23rdGen wordmark — desktop only, right of sidebar */}
      {!isAuthPage && (
        <Link
          href="/"
          className="hidden md:block"
          style={{
            position: 'fixed',
            top: 16,
            left: 236,
            zIndex: 100,
            fontFamily: 'var(--font-dm-serif), "DM Serif Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 20,
            color: '#0A0A0F',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            userSelect: 'none',
            opacity: 0.85,
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
        >
          23rdGen
        </Link>
      )}

      {/* Floating auth buttons — top right */}
      {!isAuthPage && (
        <div
          style={{
            position: 'fixed',
            top: 12,
            right: 24,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Link
            href="/login"
            style={{
              fontFamily: 'var(--font-ibm-mono), "IBM Plex Mono", monospace',
              fontSize: 12,
              color: '#2A1A0E',
              textDecoration: 'none',
              opacity: 0.65,
              transition: 'opacity 120ms ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.65')}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            style={{
              fontFamily: 'var(--font-ibm-mono), "IBM Plex Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F0E6D0',
              background: '#0A0A0F',
              border: '2px solid #0A0A0F',
              boxShadow: '2px 2px 0px rgba(10,10,15,0.35)',
              padding: '4px 12px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 60ms ease, box-shadow 60ms ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translate(1px,1px)'
              el.style.boxShadow = '1px 1px 0px rgba(10,10,15,0.35)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = ''
              el.style.boxShadow = '2px 2px 0px rgba(10,10,15,0.35)'
            }}
          >
            Sign Up
          </Link>
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(10,10,15,0.06)',
                border: '1.5px solid rgba(10,10,15,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 11,
                color: '#2A1A0E',
                userSelect: 'none',
                flexShrink: 0,
              }}
            >
              ?
            </div>
          </Link>
        </div>
      )}

      {/* Mobile hamburger */}
      {!isAuthPage && (
        <button
          onClick={() => setSidebarOpen(v => !v)}
          aria-label="Open navigation"
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 14,
            left: 16,
            zIndex: 100,
            background: 'rgba(240,230,208,0.92)',
            border: '1.5px solid rgba(10,10,15,0.18)',
            color: '#2A1A0E',
            cursor: 'pointer',
            padding: '6px 8px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect width="16" height="2" fill="currentColor" />
            <rect y="5" width="10" height="2" fill="currentColor" />
            <rect y="10" width="16" height="2" fill="currentColor" />
          </svg>
        </button>
      )}

      {!isAuthPage && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main
        className={`flex-1 min-h-screen ${isAuthPage ? '' : 'md:ml-[220px]'}`}
        style={{ position: 'relative', zIndex: 10 }}
      >
        {children}
      </main>
    </>
  )
}
