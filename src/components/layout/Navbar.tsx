'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Browse',       href: '/browse' },
  { label: 'Upload',       href: '/upload' },
  { label: 'Plans',        href: '/plans' },
  { label: 'Team Builder', href: '/teams' },
  { label: 'Creators',     href: '/creators' },
]

interface NavbarProps {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        background: '#2A0A0A',
        borderBottom: '1px solid rgba(124,106,158,0.25)',
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="md:hidden"
        style={{
          background: 'none',
          border: 'none',
          color: '#D4C9A8',
          cursor: 'pointer',
          padding: '4px 8px 4px 0',
          marginRight: 8,
        }}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect width="18" height="2" fill="currentColor" />
          <rect y="6" width="12" height="2" fill="currentColor" />
          <rect y="12" width="18" height="2" fill="currentColor" />
        </svg>
      </button>

      {/* Wordmark */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-dm-serif), "DM Serif Display", Georgia, serif',
          fontStyle: 'italic',
          fontSize: 18,
          color: '#E8E0D0',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        23rdGen
      </Link>

      {/* Center nav — desktop only */}
      <nav
        className="hidden md:flex items-center gap-7"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {NAV_LINKS.map(link => {
          const active = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-ibm-mono), "IBM Plex Mono", monospace',
                fontSize: 13,
                textDecoration: 'none',
                color: active ? '#E8E0D0' : '#D4C9A8',
                transition: 'color 120ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#E8E0D0')}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = active ? '#E8E0D0' : '#D4C9A8'
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <Link
          href="/login"
          style={{
            fontFamily: 'var(--font-ibm-mono), "IBM Plex Mono", monospace',
            fontSize: 13,
            color: '#D4C9A8',
            textDecoration: 'none',
            transition: 'color 120ms ease',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#E8E0D0')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4C9A8')}
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
            color: '#2A0A0A',
            background: '#E8E0D0',
            border: '2px solid #E8E0D0',
            boxShadow: '2px 2px 0px rgba(232,224,208,0.35)',
            padding: '4px 12px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'transform 60ms ease, box-shadow 60ms ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = 'translate(1px,1px)'
            el.style.boxShadow = '1px 1px 0px rgba(232,224,208,0.35)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = ''
            el.style.boxShadow = '2px 2px 0px rgba(232,224,208,0.35)'
          }}
        >
          Sign Up
        </Link>

        {/* Avatar circle */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(232,224,208,0.12)',
            border: '1px solid rgba(232,224,208,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: 11,
            color: '#D4C9A8',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          ?
        </div>
      </div>
    </header>
  )
}
