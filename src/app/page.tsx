'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, LayoutGrid, PenLine, BookOpen, Code2, Briefcase, Palette, CheckCheck, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import HeroTree from '@/components/HeroTree'
import TreeRoots from '@/components/TreeRoots'

const SIDEBAR_CATS = [
  {
    group: 'WRITING',
    icon: PenLine,
    items: [
      { label: 'Cold Emailing',    slug: 'cold-emailing' },
      { label: 'Script Writing',   slug: 'script-writing' },
      { label: 'Blog Posts',       slug: 'blog-posts' },
      { label: 'Ad Copywriting',   slug: 'ad-copywriting' },
      { label: 'LinkedIn Posts',   slug: 'linkedin-posts' },
    ],
  },
  {
    group: 'RESEARCH',
    icon: BookOpen,
    items: [
      { label: 'Market Research',     slug: 'market-research' },
      { label: 'Competitor Analysis', slug: 'competitor-analysis' },
      { label: 'Literature Review',   slug: 'literature-review' },
      { label: 'Trend Spotting',      slug: 'trend-spotting' },
    ],
  },
  {
    group: 'CODING',
    icon: Code2,
    items: [
      { label: 'Code Review',     slug: 'code-review' },
      { label: 'Bug Fixing',      slug: 'bug-fixing' },
      { label: 'API Integration', slug: 'api-integration' },
      { label: 'Documentation',   slug: 'documentation' },
    ],
  },
  {
    group: 'BUSINESS',
    icon: Briefcase,
    items: [
      { label: 'Sales Automation', slug: 'sales-automation' },
      { label: 'Lead Generation',  slug: 'lead-generation' },
      { label: 'Customer Support', slug: 'customer-support' },
      { label: 'Pitch Decks',      slug: 'pitch-decks' },
    ],
  },
  {
    group: 'CREATIVE',
    icon: Palette,
    items: [
      { label: 'Image Prompts',  slug: 'image-prompts' },
      { label: 'Storytelling',   slug: 'storytelling' },
      { label: 'Brand Voice',    slug: 'brand-voice' },
      { label: 'Social Content', slug: 'social-content' },
    ],
  },
  {
    group: 'PRODUCTIVITY',
    icon: CheckCheck,
    items: [
      { label: 'Task Management',   slug: 'task-management' },
      { label: 'Meeting Summaries', slug: 'meeting-summaries' },
      { label: 'Email Drafting',    slug: 'email-drafting' },
      { label: 'Data Analysis',     slug: 'data-analysis' },
    ],
  },
]

const INACTIVE = '#8A8A92'
const AKT = "'Akt', system-ui, -apple-system, sans-serif"

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const searchRef = useRef<HTMLInputElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)
  const rootsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  function toggleGroup(group: string) {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (treeRef.current) treeRef.current.style.transform = `translateY(${window.scrollY * 0.06}px)`
      if (rootsRef.current) rootsRef.current.style.transform = `translateY(${window.scrollY * 0.03}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const SIDEBAR_WIDTH = 248

  return (
    <>
      <style>{`
        @keyframes heroLogoIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* TreeRoots — fixed full-screen background */}
      <div
        id="hero-roots"
        ref={rootsRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          pointerEvents: 'none', zIndex: 0, opacity: 0.15,
        }}
      >
        <TreeRoots />
      </div>

      {/* HeroTree — fixed, erupts from right */}
      <div
        id="hero-tree"
        ref={treeRef}
        style={{
          position: 'fixed', right: '-6vw', bottom: 0,
          height: '105vh', width: '72vw',
          pointerEvents: 'none', zIndex: 1, overflow: 'visible',
        }}
      >
        <HeroTree />
      </div>

      {/* Dark floating sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 16,
          left: sidebarOpen ? 16 : -(SIDEBAR_WIDTH + 16),
          bottom: 16,
          width: SIDEBAR_WIDTH,
          zIndex: 150,
          background: '#0A0A0F',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'left 0.25s ease',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', flexShrink: 0 }}>
          <Link href="/" style={{ display: 'block', textDecoration: 'none', lineHeight: 0 }}>
            <Image
              src="/inspiration/logo.png"
              alt="23rdGen"
              width={110}
              height={32}
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </Link>
        </div>

        {/* Scrollable nav */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 8px' }} className="scrollbar-none">
          {/* Browse All */}
          <div style={{ marginBottom: 4 }}>
            <Link
              href="/browse"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 12,
                textDecoration: 'none', fontFamily: AKT,
                fontSize: 13, color: INACTIVE,
                transition: 'background 100ms, color 100ms',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#16161C'; el.style.color = '#C8C8D0' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = INACTIVE }}
            >
              <LayoutGrid size={15} />
              <span>Browse All</span>
            </Link>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 4px 10px' }} />

          {/* Category groups */}
          <nav>
            {SIDEBAR_CATS.map(cat => {
              const expanded = expandedGroups.has(cat.group)
              const Icon = cat.icon
              return (
                <div key={cat.group} style={{ marginBottom: 2 }}>
                  <button
                    onClick={() => toggleGroup(cat.group)}
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%', padding: '9px 12px', borderRadius: 12,
                      border: '1px solid transparent', background: 'transparent',
                      cursor: 'pointer', color: INACTIVE, fontFamily: AKT,
                      fontSize: 13, fontWeight: 500,
                      transition: 'background 100ms, color 100ms',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#16161C'; el.style.color = '#C8C8D0' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = INACTIVE }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon size={15} />
                      <span>{cat.group}</span>
                    </span>
                    {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>

                  {expanded && (
                    <div
                      style={{
                        marginLeft: 16, paddingLeft: 12,
                        borderLeft: '1px solid rgba(255,255,255,0.07)',
                        marginTop: 2, marginBottom: 4,
                      }}
                    >
                      {cat.items.map(item => (
                        <Link
                          key={item.slug}
                          href={`/browse?category=${item.slug}`}
                          style={{
                            display: 'block', padding: '7px 10px', borderRadius: 12,
                            fontFamily: AKT, fontSize: 13,
                            color: INACTIVE, textDecoration: 'none',
                            marginBottom: 1,
                            transition: 'background 100ms, color 100ms',
                          }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#16161C'; el.style.color = '#C8C8D0' }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = INACTIVE }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(v => !v)}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 200,
          width: 34, height: 34,
          background: 'rgba(10,10,15,0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#8A8A92',
          transition: 'color 100ms ease',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#C8C8D0')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#8A8A92')}
      >
        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Floating logo — top left, always visible */}
      <Link
        href="/"
        style={{
          position: 'fixed', top: 16, left: 68, zIndex: 200,
          textDecoration: 'none', lineHeight: 0, userSelect: 'none',
          animation: 'heroLogoIn 0.5s ease-out both',
        }}
      >
        <Image
          src="/inspiration/logo.png"
          alt="23rdGen"
          width={90}
          height={28}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>

      {/* Top-right auth buttons */}
      <div style={{
        position: 'fixed', top: 14, right: 24, zIndex: 200,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link
          href="/login"
          style={{
            fontFamily: AKT, fontSize: 13, fontWeight: 400,
            color: '#8A8A92', textDecoration: 'none',
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
            fontFamily: AKT, fontSize: 12, fontWeight: 500,
            letterSpacing: '0.04em',
            color: '#F0E6D0',
            background: '#16161C',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '5px 14px',
            textDecoration: 'none', display: 'inline-block',
            transition: 'background 120ms ease, color 120ms ease',
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#202028'; el.style.color = '#FFFFFF' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#16161C'; el.style.color = '#F0E6D0' }}
        >
          Sign Up
        </Link>
      </div>

      {/* Main content */}
      <main style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
      }}>
        {/* Hero: logo mark centered at 38% vh, search bar below */}
        <div style={{
          position: 'absolute',
          top: '38%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: '100%',
        }}>
          {/* Logo mark */}
          <div style={{
            display: 'flex', alignItems: 'baseline',
            userSelect: 'none',
            animation: 'heroLogoIn 0.6s ease-out both',
          }}>
            <span style={{
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
              fontSize: 'clamp(4rem, 8vw, 7rem)',
              color: '#0A0A0F', fontWeight: 400,
              letterSpacing: '-0.02em', lineHeight: 1,
            }}>
              23rd
            </span>
            <span style={{
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
              fontSize: 'clamp(4rem, 8vw, 7rem)',
              color: '#7C6A9E', fontWeight: 400,
              letterSpacing: '-0.01em', lineHeight: 1,
            }}>
              Gen
            </span>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            style={{ marginTop: 32, width: 'min(640px, 80vw)', position: 'relative' }}
          >
            <div style={{
              position: 'absolute', left: 14, top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none', display: 'flex', alignItems: 'center',
            }}>
              <Search size={18} color="#7C6A9E" />
            </div>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search agents, prompts, skills, workflows..."
              style={{
                width: '100%', height: 52,
                paddingLeft: 44, paddingRight: 72,
                background: '#F0E6D0',
                border: '2px solid #0A0A0F',
                boxShadow: '4px 4px 0px #0A0A0F',
                borderRadius: 0,
                fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize: 14, color: '#2A1A0E',
                outline: 'none',
                transition: 'box-shadow 0.15s',
              }}
              onFocus={e => { (e.currentTarget as HTMLInputElement).style.boxShadow = '6px 6px 0px #7C6A9E' }}
              onBlur={e => { (e.currentTarget as HTMLInputElement).style.boxShadow = '4px 4px 0px #0A0A0F' }}
            />
            <kbd style={{
              position: 'absolute', right: 12, top: '50%',
              transform: 'translateY(-50%)',
              border: '2px solid #0A0A0F', borderRadius: 0,
              background: '#E8E0D0',
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 11, color: '#0A0A0F',
              padding: '3px 7px',
              pointerEvents: 'none', userSelect: 'none',
            }}>
              ⌘K
            </kbd>
          </form>
        </div>
      </main>
    </>
  )
}
