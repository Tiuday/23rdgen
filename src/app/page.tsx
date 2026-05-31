'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import HeroTree from '@/components/HeroTree'
import TreeRoots from '@/components/TreeRoots'

const SIDEBAR_CATS = [
  {
    group: 'WRITING',
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
    items: [
      { label: 'Market Research',     slug: 'market-research' },
      { label: 'Competitor Analysis', slug: 'competitor-analysis' },
      { label: 'Literature Review',   slug: 'literature-review' },
      { label: 'Trend Spotting',      slug: 'trend-spotting' },
    ],
  },
  {
    group: 'CODING',
    items: [
      { label: 'Code Review',     slug: 'code-review' },
      { label: 'Bug Fixing',      slug: 'bug-fixing' },
      { label: 'API Integration', slug: 'api-integration' },
      { label: 'Documentation',   slug: 'documentation' },
    ],
  },
  {
    group: 'BUSINESS',
    items: [
      { label: 'Sales Automation', slug: 'sales-automation' },
      { label: 'Lead Generation',  slug: 'lead-generation' },
      { label: 'Customer Support', slug: 'customer-support' },
      { label: 'Pitch Decks',      slug: 'pitch-decks' },
    ],
  },
  {
    group: 'CREATIVE',
    items: [
      { label: 'Image Prompts',  slug: 'image-prompts' },
      { label: 'Storytelling',   slug: 'storytelling' },
      { label: 'Brand Voice',    slug: 'brand-voice' },
      { label: 'Social Content', slug: 'social-content' },
    ],
  },
  {
    group: 'PRODUCTIVITY',
    items: [
      { label: 'Task Management',   slug: 'task-management' },
      { label: 'Meeting Summaries', slug: 'meeting-summaries' },
      { label: 'Email Drafting',    slug: 'email-drafting' },
      { label: 'Data Analysis',     slug: 'data-analysis' },
    ],
  },
]

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)
  const rootsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

      {/* Collapsible category sidebar */}
      <aside
        style={{
          position: 'fixed', left: 0, top: 0,
          width: 220, height: '100vh',
          overflowY: 'auto', zIndex: 150,
          background: 'rgba(240,230,208,0.97)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRight: '2px solid rgba(10,10,15,0.15)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-220px)',
          transition: 'transform 0.25s ease',
          paddingTop: 64, paddingBottom: 32,
        }}
      >
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 10, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: '#7C6A9E',
          }}>
            CATEGORIES
          </div>
        </div>

        {SIDEBAR_CATS.map(cat => (
          <div key={cat.group} style={{ marginTop: 16 }}>
            <div style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: '#5A4A7A',
              padding: '0 16px', marginBottom: 4,
            }}>
              {cat.group}
            </div>
            {cat.items.map(item => (
              <Link
                key={item.slug}
                href={`/browse?category=${item.slug}`}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                  fontSize: 13, color: '#2A1A0E',
                  textDecoration: 'none', padding: '6px 16px',
                  transition: 'background 120ms',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(124,106,158,0.12)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(v => !v)}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 200,
          width: 36, height: 36,
          border: '2px solid #0A0A0F',
          boxShadow: '2px 2px 0px #0A0A0F',
          background: '#F0E6D0', borderRadius: 0,
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {sidebarOpen
          ? <X size={18} color="#0A0A0F" />
          : <Menu size={18} color="#0A0A0F" />
        }
      </button>

      {/* 23rdGen wordmark */}
      <Link href="/" style={{
        position: 'fixed', top: 16, left: 68, zIndex: 200,
        fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
        fontStyle: 'italic', fontSize: 20, color: '#0A0A0F',
        textDecoration: 'none', lineHeight: 1, userSelect: 'none',
      }}>
        23rdGen
      </Link>

      {/* Top-right auth */}
      <div style={{
        position: 'fixed', top: 12, right: 24, zIndex: 200,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Link href="/login" style={{
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          fontSize: 13, color: '#2A1A0E', textDecoration: 'none',
        }}>
          Log in
        </Link>
        <Link href="/signup" style={{
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          fontSize: 12, color: '#E8E0D0',
          background: '#8B1A1A',
          border: '2px solid #E8E0D0',
          boxShadow: '2px 2px 0px #E8E0D0',
          borderRadius: 0, padding: '8px 18px',
          textDecoration: 'none',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          display: 'inline-block',
        }}>
          Sign Up
        </Link>
      </div>

      {/* Main — content shifts right when sidebar opens */}
      <main style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        marginLeft: sidebarOpen ? 220 : 0,
        transition: 'margin-left 0.25s ease',
      }}>
        {/* Hero: logo centered at 38% vh, search bar below */}
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
