'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const CATEGORY_GROUPS = [
  {
    group: 'WRITING',
    items: [
      { label: 'Cold Emailing',   href: '/browse?category=cold-emailing' },
      { label: 'Script Writing',  href: '/browse?category=script-writing' },
      { label: 'Blog Posts',      href: '/browse?category=blog-posts' },
      { label: 'Ad Copywriting',  href: '/browse?category=ad-copywriting' },
      { label: 'LinkedIn Posts',  href: '/browse?category=linkedin-posts' },
    ],
  },
  {
    group: 'RESEARCH',
    items: [
      { label: 'Market Research',      href: '/browse?category=market-research' },
      { label: 'Competitor Analysis',  href: '/browse?category=competitor-analysis' },
      { label: 'Literature Review',    href: '/browse?category=literature-review' },
      { label: 'Trend Spotting',       href: '/browse?category=trend-spotting' },
    ],
  },
  {
    group: 'CODING',
    items: [
      { label: 'Code Review',     href: '/browse?category=code-review' },
      { label: 'Bug Fixing',      href: '/browse?category=bug-fixing' },
      { label: 'API Integration', href: '/browse?category=api-integration' },
      { label: 'Documentation',   href: '/browse?category=documentation' },
    ],
  },
  {
    group: 'BUSINESS',
    items: [
      { label: 'Sales Automation',  href: '/browse?category=sales-automation' },
      { label: 'Lead Generation',   href: '/browse?category=lead-generation' },
      { label: 'Customer Support',  href: '/browse?category=customer-support' },
      { label: 'Pitch Decks',       href: '/browse?category=pitch-decks' },
    ],
  },
  {
    group: 'CREATIVE',
    items: [
      { label: 'Image Prompts', href: '/browse?category=image-prompts' },
      { label: 'Storytelling',  href: '/browse?category=storytelling' },
      { label: 'Brand Voice',   href: '/browse?category=brand-voice' },
      { label: 'Social Content',href: '/browse?category=social-content' },
    ],
  },
  {
    group: 'PRODUCTIVITY',
    items: [
      { label: 'Task Management',    href: '/browse?category=task-management' },
      { label: 'Meeting Summaries',  href: '/browse?category=meeting-summaries' },
      { label: 'Email Drafting',     href: '/browse?category=email-drafting' },
      { label: 'Data Analysis',      href: '/browse?category=data-analysis' },
    ],
  },
]

const BOTTOM_LINKS = [
  { label: 'Upload Agent',   href: '/upload' },
  { label: 'My Profile',     href: '/profile' },
  { label: 'Plans & Pricing',href: '/plans' },
  { label: 'Team Builder',   href: '/teams' },
]

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  function isActive(href: string) {
    const [path, qs] = href.split('?')
    if (qs) {
      const p = new URLSearchParams(qs)
      return pathname === path && currentCategory === p.get('category')
    }
    return pathname === path && !currentCategory
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'rgba(232,224,208,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRight: '1px solid rgba(0,0,0,0.08)',
        overflowY: 'auto',
      }}
      className="scrollbar-none"
    >
      {/* Wordmark */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
        <Link
          href="/"
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-dm-serif), "DM Serif Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 18,
            color: '#0A0A0F',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            display: 'block',
          }}
        >
          23rdGen
        </Link>
      </div>

      {/* Browse All */}
      <div style={{ padding: '10px 0 6px' }}>
        <Link
          href="/browse"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            color: '#0A0A0F',
            background: isActive('/browse') ? 'rgba(124,106,158,0.15)' : 'transparent',
            borderLeft: isActive('/browse') ? '2px solid #7C6A9E' : '2px solid transparent',
          }}
        >
          ⊞ Browse All
        </Link>
      </div>

      <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '0 0 4px' }} />

      {/* Category groups */}
      <nav style={{ flex: 1, paddingBottom: 4 }}>
        {CATEGORY_GROUPS.map(group => (
          <div key={group.group}>
            <div
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#7C6A9E',
                padding: '20px 16px 4px',
                fontWeight: 600,
              }}
            >
              {group.group}
            </div>
            {group.items.map(item => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="sidebar-nav-link"
                  style={{
                    display: 'block',
                    padding: '6px 16px 6px 24px',
                    fontFamily: 'var(--font-ibm-mono), monospace',
                    fontSize: 13,
                    textDecoration: 'none',
                    color: active ? '#0A0A0F' : '#2A1A0E',
                    background: active ? 'rgba(124,106,158,0.15)' : 'transparent',
                    borderLeft: active ? '2px solid #7C6A9E' : '2px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,106,158,0.1)'
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '8px 0 4px' }} />

      {/* Bottom utility links */}
      <div style={{ padding: '4px 0 16px' }}>
        {BOTTOM_LINKS.map(link => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                display: 'block',
                padding: '8px 16px',
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                color: active ? '#0A0A0F' : '#2A1A0E',
                background: active ? 'rgba(124,106,158,0.15)' : 'transparent',
                borderLeft: active ? '2px solid #7C6A9E' : '2px solid transparent',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop: always visible */}
      <aside
        className="hidden md:block fixed left-0 bottom-0 z-50"
        style={{ top: 0, width: 220 }}
      >
        <Suspense fallback={null}>
          <SidebarContent onClose={() => {}} />
        </Suspense>
      </aside>

      {/* Mobile: overlay drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(42,10,10,0.5)' }}
            onClick={onClose}
          />
          <aside
            className="fixed top-0 left-0 bottom-0 z-50 md:hidden"
            style={{ width: 220 }}
          >
            <Suspense fallback={null}>
              <SidebarContent onClose={onClose} />
            </Suspense>
          </aside>
        </>
      )}
    </>
  )
}
