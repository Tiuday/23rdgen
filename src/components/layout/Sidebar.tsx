'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Browse All',  href: '/browse',                  icon: '🗺' },
  { label: 'Agents',      href: '/browse?category=agent',   icon: '🧙' },
  { label: 'Prompts',     href: '/browse?category=prompt',  icon: '📜' },
  { label: 'Skills',      href: '/browse?category=skill',   icon: '🔧' },
  { label: 'Workflows',   href: '/browse?category=workflow', icon: '🎼' },
  { label: 'Teams',       href: '/browse?category=team',    icon: '👥' },
  { label: 'Creators',    href: '/creators',                icon: '⭐' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const [imgErr, setImgErr] = useState(false)

  const isActive = (href: string) => {
    const path = href.split('?')[0]
    if (href.includes('?')) return false
    return pathname === path || (path === '/browse' && pathname.startsWith('/browse'))
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: '#0E0E16',
        borderRight: '1px solid rgba(124,106,158,0.15)',
      }}
    >
      {/* Logo header */}
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-[rgba(124,106,158,0.1)] shrink-0">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          {imgErr ? (
            <span
              className="text-sm font-semibold text-[#EDE8DF]"
              style={{ fontFamily: 'var(--font-ibm-mono), monospace' }}
            >
              23rdGen
            </span>
          ) : (
            <>
              <div className="w-7 h-7 relative shrink-0">
                <Image
                  src="/inspiration/logo.png"
                  alt="23rdGen logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  onError={() => {
                    console.warn('23rdGen: logo not found at /inspiration/logo.png, using text fallback')
                    setImgErr(true)
                  }}
                />
              </div>
              <span
                className="text-sm font-semibold text-[#EDE8DF]"
                style={{ fontFamily: 'var(--font-ibm-mono), monospace' }}
              >
                23rdGen
              </span>
            </>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={onClose}
              className="sidebar-nav-link flex items-center gap-2.5 text-sm py-2 transition-all duration-150"
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                ...(active
                  ? {
                      color: '#A594C4',
                      background: 'rgba(124,106,158,0.08)',
                      borderLeft: '3px solid #7C6B9E',
                      paddingLeft: 10,
                      paddingRight: 12,
                    }
                  : {
                      color: 'rgba(237,232,223,0.55)',
                      borderLeft: '3px solid transparent',
                      paddingLeft: 10,
                      paddingRight: 12,
                    }),
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1, opacity: active ? 1 : 0.7 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom auth links */}
      <div className="px-5 py-4 border-t border-[rgba(124,106,158,0.1)] flex items-center gap-4 shrink-0">
        <Link
          href="/login"
          onClick={onClose}
          className="text-xs text-[rgba(237,232,223,0.4)] hover:text-[rgba(237,232,223,0.65)] transition-colors"
          style={{ fontFamily: 'var(--font-ibm-mono), monospace' }}
        >
          Log in
        </Link>
        <Link
          href="/signup"
          onClick={onClose}
          className="text-xs text-[rgba(237,232,223,0.4)] hover:text-[rgba(237,232,223,0.65)] transition-colors"
          style={{ fontFamily: 'var(--font-ibm-mono), monospace' }}
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop: always visible */}
      <aside
        className="hidden md:block fixed top-14 left-0 bottom-0 z-40"
        style={{ width: 240 }}
      >
        <SidebarContent onClose={() => {}} />
      </aside>

      {/* Mobile: overlay drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={onClose}
          />
          <aside
            className="fixed top-0 left-0 bottom-0 z-50 md:hidden"
            style={{ width: 240 }}
          >
            <SidebarContent onClose={onClose} />
          </aside>
        </>
      )}
    </>
  )
}
