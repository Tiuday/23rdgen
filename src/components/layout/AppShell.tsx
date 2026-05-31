'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'

const PIXEL_CHARS = [
  { emoji: '🧙', style: { top: '20%', left: '3%', animation: 'drift-1 28s ease-in-out infinite', animationDelay: '0s' } },
  { emoji: '🧝', style: { top: '10%', right: '5%', animation: 'drift-2 35s ease-in-out infinite', animationDelay: '-10s' } },
  { emoji: '🧚', style: { bottom: '25%', right: '3%', animation: 'drift-3 30s ease-in-out infinite', animationDelay: '-14s' } },
  { emoji: '🤖', style: { top: '55%', left: '1.5%', animation: 'drift-4 24s ease-in-out infinite', animationDelay: '-6s' } },
  { emoji: '👾', style: { bottom: '15%', left: '5%', animation: 'drift-5 40s ease-in-out infinite', animationDelay: '-20s' } },
]

const AKT = "'Akt', system-ui, -apple-system, sans-serif"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  if (pathname === '/') return <>{children}</>

  const isAuthPage = pathname === '/login' || pathname === '/signup'

  // Desktop left margin: sidebar (248 or 64) + 16 left gap + 16 right gap
  const mainMarginLeft = sidebarCollapsed ? 96 : 280

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

      {/* Floating auth buttons — top right */}
      {!isAuthPage && (
        <div
          style={{
            position: 'fixed',
            top: 14,
            right: 24,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Link
            href="/login"
            style={{
              fontFamily: AKT,
              fontSize: 13,
              fontWeight: 400,
              color: '#8A8A92',
              textDecoration: 'none',
              transition: 'color 120ms ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#C8C8D0')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#8A8A92')}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            style={{
              fontFamily: AKT,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: '#F0E6D0',
              background: '#16161C',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '5px 14px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 120ms ease, color 120ms ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#202028'
              el.style.color = '#FFFFFF'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#16161C'
              el.style.color = '#F0E6D0'
            }}
          >
            Sign Up
          </Link>
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(10,10,15,0.06)',
                border: '1.5px solid rgba(10,10,15,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: AKT,
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
            background: 'rgba(10,10,15,0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: '#8A8A92',
            cursor: 'pointer',
            padding: '6px 8px',
            backdropFilter: 'blur(8px)',
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
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(v => !v)}
        />
      )}

      <main
        className={`flex-1 min-h-screen ${isAuthPage ? '' : sidebarCollapsed ? 'md:ml-[96px]' : 'md:ml-[280px]'}`}
        style={{ position: 'relative', zIndex: 10, transition: 'margin-left 200ms ease' }}
      >
        {children}
      </main>
    </>
  )
}
