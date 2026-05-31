'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, LayoutGrid, PenLine, BookOpen, Code2, Briefcase, Palette, CheckCheck, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import HeroTree from '@/components/HeroTree'
import TreeRoots from '@/components/TreeRoots'
import PixelAvatar from '@/components/mascot/PixelAvatar'
import Footer from '@/components/layout/Footer'
import type { AgentCategory } from '@/types/agent'

// ── Sidebar categories ──────────────────────────────────────────────────────
const SIDEBAR_CATS = [
  { group: 'WRITING',      icon: PenLine,    items: [{ label: 'Cold Emailing', slug: 'cold-emailing' }, { label: 'Script Writing', slug: 'script-writing' }, { label: 'Blog Posts', slug: 'blog-posts' }, { label: 'Ad Copywriting', slug: 'ad-copywriting' }, { label: 'LinkedIn Posts', slug: 'linkedin-posts' }] },
  { group: 'RESEARCH',     icon: BookOpen,   items: [{ label: 'Market Research', slug: 'market-research' }, { label: 'Competitor Analysis', slug: 'competitor-analysis' }, { label: 'Literature Review', slug: 'literature-review' }, { label: 'Trend Spotting', slug: 'trend-spotting' }] },
  { group: 'CODING',       icon: Code2,      items: [{ label: 'Code Review', slug: 'code-review' }, { label: 'Bug Fixing', slug: 'bug-fixing' }, { label: 'API Integration', slug: 'api-integration' }, { label: 'Documentation', slug: 'documentation' }] },
  { group: 'BUSINESS',     icon: Briefcase,  items: [{ label: 'Sales Automation', slug: 'sales-automation' }, { label: 'Lead Generation', slug: 'lead-generation' }, { label: 'Customer Support', slug: 'customer-support' }, { label: 'Pitch Decks', slug: 'pitch-decks' }] },
  { group: 'CREATIVE',     icon: Palette,    items: [{ label: 'Image Prompts', slug: 'image-prompts' }, { label: 'Storytelling', slug: 'storytelling' }, { label: 'Brand Voice', slug: 'brand-voice' }, { label: 'Social Content', slug: 'social-content' }] },
  { group: 'PRODUCTIVITY', icon: CheckCheck, items: [{ label: 'Task Management', slug: 'task-management' }, { label: 'Meeting Summaries', slug: 'meeting-summaries' }, { label: 'Email Drafting', slug: 'email-drafting' }, { label: 'Data Analysis', slug: 'data-analysis' }] },
]

// ── Seed cards (from MOCK_AGENTS, grouped by type) ─────────────────────────
interface HomeCard {
  id: string
  name: string
  description: string
  creator: string
  deploys: number
  rating: number
}

const CARDS: Record<string, HomeCard[]> = {
  agent: [
    { id: '1', name: 'Code Review Wizard',  description: 'Deeply analyzes pull requests for bugs, security vulnerabilities, and code quality improvements across any language.', creator: 'devtools_hq',  deploys: 2840, rating: 4.8 },
    { id: '5', name: 'Bug Hunter Pro',       description: 'Scans code for common bug patterns, off-by-one errors, null pointer risks, and silent runtime exceptions.',         creator: 'debuggers',    deploys: 1420, rating: 4.6 },
    { id: '9', name: 'Market Radar',         description: 'Tracks competitor moves, industry shifts, and emerging trends across markets. Weekly briefing format.',             creator: 'strategos',    deploys: 980,  rating: 4.4 },
  ],
  prompt: [
    { id: '2',  name: 'SEO Scribe',          description: 'Generates SEO-optimized blog posts, meta descriptions, and landing page copy from a simple keyword list.',          creator: 'marketers',    deploys: 1650, rating: 4.5 },
    { id: '7',  name: 'Cold Email Machine',  description: 'Writes high-converting cold email sequences personalized to any industry, pain point, or buyer persona.',           creator: 'salescraft',   deploys: 2100, rating: 4.7 },
    { id: '8',  name: 'LinkedIn Post Pro',   description: 'Generates viral LinkedIn posts that drive engagement: hooks, stories, carousels, and thought leadership content.',  creator: 'contentguild', deploys: 1780, rating: 4.6 },
  ],
  skill: [
    { id: '3',  name: 'SQL Craftsperson',    description: 'Translates natural language into optimized SQL for PostgreSQL, MySQL, and SQLite with clear explanations.',          creator: 'dataeng',      deploys: 3200, rating: 4.9 },
    { id: '11', name: 'Brand Voice Guide',   description: 'Analyzes your existing content and synthesizes a reusable brand voice guide with tone, vocabulary, and examples.',  creator: 'brandcraft',   deploys: 760,  rating: 4.3 },
  ],
  workflow: [
    { id: '4',  name: 'Research Conductor',  description: 'Multi-step workflow that searches, summarizes, and formats research into structured reports with citations.',       creator: 'researchers',  deploys: 890,  rating: 4.3 },
    { id: '10', name: 'Pitch Deck Writer',   description: 'Creates investor-ready pitch decks from a simple brief. Covers problem, solution, traction, and ask.',            creator: 'foundry',      deploys: 1340, rating: 4.5 },
  ],
  team: [
    { id: '12', name: 'Content Team',        description: 'A coordinated 4-agent team: SEO writer, social scheduler, cold email specialist, and research summarizer.',         creator: '23rdgen',      deploys: 3500, rating: 4.9 },
  ],
}

// Type accent colors for card headers
const TYPE_COLORS: Record<string, string> = {
  agent:    '#F5D76E',
  prompt:   '#A8D8EA',
  skill:    '#B5EAD7',
  workflow: '#E8A0BF',
  team:     '#C9B1FF',
}

const TYPE_LABELS: Record<string, string> = {
  agent: 'Agents', prompt: 'Prompts', skill: 'Skills', workflow: 'Workflows', team: 'Teams',
}

const INACTIVE = '#8A8A92'
const AKT = "'Akt', system-ui, -apple-system, sans-serif"

// ── Homepage card component ─────────────────────────────────────────────────
function HomepageCard({
  card,
  type,
  featured = false,
}: {
  card: HomeCard
  type: string
  featured?: boolean
}) {
  const headerBg = TYPE_COLORS[type] ?? '#F5D76E'
  const pixelType = type as AgentCategory

  return (
    <div
      style={{
        border: '2px solid #0A0A0F',
        boxShadow: '4px 4px 0 #0A0A0F',
        borderRadius: 16,
        background: '#FEFBF5',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
        cursor: 'pointer',
        height: '100%',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translate(-2px,-2px)'
        el.style.boxShadow = '6px 6px 0 #0A0A0F'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = ''
        el.style.boxShadow = '4px 4px 0 #0A0A0F'
      }}
    >
      {/* Colored header */}
      <div
        style={{
          background: headerBg,
          padding: featured ? '22px 20px 18px' : '18px 18px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {featured && (
          <span
            style={{
              position: 'absolute', top: 10, right: 12,
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 9, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: '#0A0A0F', color: '#E8E0D0',
              padding: '3px 8px', borderRadius: 4,
            }}
          >
            ★ FEATURED PICK
          </span>
        )}
        <PixelAvatar category={pixelType} size={featured ? 50 : 42} />
        <span
          style={{
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'rgba(10,10,15,0.6)',
          }}
        >
          {type}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontFamily: AKT,
            fontSize: featured ? 19 : 15,
            fontWeight: 700,
            color: '#0A0A0F',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {card.name}
        </h3>
        <p
          style={{
            fontFamily: AKT,
            fontSize: 13,
            color: '#5A4A3A',
            lineHeight: 1.55,
            marginTop: 8,
            flex: 1,
            overflow: 'hidden',
            maxHeight: featured ? '4.65em' : '3.1em',
          }}
        >
          {card.description}
        </p>

        {/* Meta */}
        <div
          style={{
            display: 'flex', gap: 6,
            marginTop: 12, flexWrap: 'wrap',
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 11, color: '#8A7A6A',
          }}
        >
          <span>{card.deploys.toLocaleString()} deploys</span>
          <span>·</span>
          <span>★ {card.rating}</span>
          <span>·</span>
          <span>@{card.creator}</span>
        </div>

        {/* Deploy button — brutalist inside rounded card */}
        <button
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: '#0A0A0F', color: '#E8E0D0',
            border: '2px solid #0A0A0F',
            boxShadow: `3px 3px 0 ${headerBg}`,
            padding: '9px 16px',
            borderRadius: 0,
            cursor: 'pointer',
            width: '100%',
            transition: 'transform 60ms ease, box-shadow 60ms ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = 'translate(1px,1px)'
            el.style.boxShadow = `2px 2px 0 ${headerBg}`
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.transform = ''
            el.style.boxShadow = `3px 3px 0 ${headerBg}`
          }}
        >
          DEPLOY →
        </button>
      </div>
    </div>
  )
}

// ── Content section ─────────────────────────────────────────────────────────
function ContentSection({ type }: { type: string }) {
  const cards = CARDS[type] ?? []
  const isAgents = type === 'agent'
  const isTeam   = type === 'team'

  return (
    <section
      style={{
        background: '#E8E0D0',
        padding: '64px 6vw',
        position: 'relative',
      }}
    >
      {/* Section heading + View all */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        <h2
          style={{
            fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 400,
            color: '#0A0A0F',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {TYPE_LABELS[type]}
        </h2>
        <Link
          href={`/browse?type=${type}`}
          style={{
            fontFamily: AKT,
            fontSize: 13,
            color: '#7C6A9E',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'color 120ms ease',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#0A0A0F')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#7C6A9E')}
        >
          View all →
        </Link>
      </div>

      {/* Agents: featured (left, spans 2 rows) + 2 normal (right column) */}
      {isAgents && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gridTemplateRows: 'auto auto', gap: 20, alignItems: 'start' }}>
          <div style={{ gridRow: '1 / 3' }}>
            <HomepageCard card={cards[0]} type={type} featured />
          </div>
          {cards.slice(1).map(card => (
            <HomepageCard key={card.id} card={card} type={type} />
          ))}
        </div>
      )}

      {/* Teams: single wide featured card */}
      {isTeam && (
        <div style={{ maxWidth: 460 }}>
          <HomepageCard card={cards[0]} type={type} featured />
        </div>
      )}

      {/* Everything else: equal-width grid */}
      {!isAgents && !isTeam && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(cards.length, 3)}, 1fr)`,
            gap: 20,
            alignItems: 'start',
          }}
        >
          {cards.map(card => (
            <HomepageCard key={card.id} card={card} type={type} />
          ))}
        </div>
      )}
    </section>
  )
}

// ── Homepage ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [sidebarOpen, setSidebarOpen]     = useState(false)
  const [searchQuery, setSearchQuery]     = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const searchRef = useRef<HTMLInputElement>(null)
  const treeRef   = useRef<HTMLDivElement>(null)
  const rootsRef  = useRef<HTMLDivElement>(null)
  const router    = useRouter()

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
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus() }
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (treeRef.current)  treeRef.current.style.transform  = `translateY(${window.scrollY * 0.06}px)`
      if (rootsRef.current) rootsRef.current.style.transform = `translateY(${window.scrollY * 0.03}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`)
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

      {/* Fixed background layers */}
      <div id="hero-roots" ref={rootsRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, opacity: 0.15 }}>
        <TreeRoots />
      </div>
      <div id="hero-tree" ref={treeRef} style={{ position: 'fixed', right: '-6vw', bottom: 0, height: '105vh', width: '72vw', pointerEvents: 'none', zIndex: 1, overflow: 'visible' }}>
        <HeroTree />
      </div>

      {/* Dark floating sidebar */}
      <aside
        style={{
          position: 'fixed', top: 16,
          left: sidebarOpen ? 16 : -(SIDEBAR_WIDTH + 16),
          bottom: 16, width: SIDEBAR_WIDTH,
          zIndex: 150,
          background: '#0A0A0F',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          transition: 'left 0.25s ease',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', flexShrink: 0 }}>
          <Link href="/" style={{ display: 'block', textDecoration: 'none', lineHeight: 0 }}>
            <Image src="/inspiration/logo.png" alt="23rdGen" width={78} height={22} style={{ objectFit: 'contain', objectPosition: 'left center' }} priority />
          </Link>
        </div>

        {/* Scrollable nav */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 8px' }} className="scrollbar-none">
          <div style={{ marginBottom: 4 }}>
            <Link
              href="/browse"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 12, textDecoration: 'none', fontFamily: AKT, fontSize: 13, color: INACTIVE, transition: 'background 100ms, color 100ms' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#16161C'; el.style.color = '#C8C8D0' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = INACTIVE }}
            >
              <LayoutGrid size={15} />
              <span>Browse All</span>
            </Link>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 4px 10px' }} />

          <nav>
            {SIDEBAR_CATS.map(cat => {
              const expanded = expandedGroups.has(cat.group)
              const Icon = cat.icon
              return (
                <div key={cat.group} style={{ marginBottom: 2 }}>
                  <button
                    onClick={() => toggleGroup(cat.group)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '9px 12px', borderRadius: 12, border: '1px solid transparent', background: 'transparent', cursor: 'pointer', color: INACTIVE, fontFamily: AKT, fontSize: 13, fontWeight: 500, transition: 'background 100ms, color 100ms' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#16161C'; el.style.color = '#C8C8D0' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'transparent'; el.style.color = INACTIVE }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon size={15} /><span>{cat.group}</span></span>
                    {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  {expanded && (
                    <div style={{ marginLeft: 16, paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.07)', marginTop: 2, marginBottom: 4 }}>
                      {cat.items.map(item => (
                        <Link
                          key={item.slug}
                          href={`/browse?category=${item.slug}`}
                          style={{ display: 'block', padding: '7px 10px', borderRadius: 12, fontFamily: AKT, fontSize: 13, color: INACTIVE, textDecoration: 'none', marginBottom: 1, transition: 'background 100ms, color 100ms' }}
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

      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(v => !v)}
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        style={{ position: 'fixed', top: 20, left: 20, zIndex: 200, width: 34, height: 34, background: 'rgba(10,10,15,0.85)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, backdropFilter: 'blur(8px)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A8A92', transition: 'color 100ms ease' }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#C8C8D0')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = '#8A8A92')}
      >
        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Floating logo — top left, always visible */}
      <Link
        href="/"
        style={{ position: 'fixed', top: 18, left: 68, zIndex: 200, textDecoration: 'none', lineHeight: 0, userSelect: 'none', animation: 'heroLogoIn 0.5s ease-out both' }}
      >
        <Image src="/inspiration/logo.png" alt="23rdGen" width={68} height={20} style={{ objectFit: 'contain' }} priority />
      </Link>

      {/* Top-right auth buttons */}
      <div style={{ position: 'fixed', top: 14, right: 24, zIndex: 200, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link
          href="/login"
          style={{ fontFamily: AKT, fontSize: 13, fontWeight: 400, color: '#8A8A92', textDecoration: 'none', transition: 'color 120ms ease' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#C8C8D0')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#8A8A92')}
        >
          Log in
        </Link>
        <Link
          href="/signup"
          style={{ fontFamily: AKT, fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', color: '#F0E6D0', background: '#16161C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 14px', textDecoration: 'none', display: 'inline-block', transition: 'background 120ms ease, color 120ms ease' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#202028'; el.style.color = '#FFFFFF' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#16161C'; el.style.color = '#F0E6D0' }}
        >
          Sign Up
        </Link>
      </div>

      {/* ── Main ── */}
      <main style={{ position: 'relative', zIndex: 10 }}>

        {/* Hero — 100vh spacer with centered logo + search */}
        <div style={{ height: '100vh', position: 'relative' }}>
          <div
            style={{
              position: 'absolute', top: '38%', left: '50%',
              transform: 'translate(-50%,-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Logo mark */}
            <div style={{ display: 'flex', alignItems: 'baseline', userSelect: 'none', animation: 'heroLogoIn 0.6s ease-out both' }}>
              <span style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(4rem, 8vw, 7rem)', color: '#0A0A0F', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1 }}>23rd</span>
              <span style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(4rem, 8vw, 7rem)', color: '#7C6A9E', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1 }}>Gen</span>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} style={{ marginTop: 32, width: 'min(640px, 80vw)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                <Search size={18} color="#7C6A9E" />
              </div>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search agents, prompts, skills, workflows..."
                style={{ width: '100%', height: 52, paddingLeft: 44, paddingRight: 72, background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '4px 4px 0px #0A0A0F', borderRadius: 0, fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 14, color: '#2A1A0E', outline: 'none', transition: 'box-shadow 0.15s' }}
                onFocus={e => { (e.currentTarget as HTMLInputElement).style.boxShadow = '6px 6px 0px #7C6A9E' }}
                onBlur={e => { (e.currentTarget as HTMLInputElement).style.boxShadow = '4px 4px 0px #0A0A0F' }}
              />
              <kbd style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: '2px solid #0A0A0F', borderRadius: 0, background: '#E8E0D0', fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, color: '#0A0A0F', padding: '3px 7px', pointerEvents: 'none', userSelect: 'none' }}>⌘K</kbd>
            </form>
          </div>

          {/* Scroll cue */}
          <div
            style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.45, animation: 'heroLogoIn 1s 0.8s ease-out both' }}
            aria-hidden
          >
            <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, color: '#0A0A0F', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: 'heroLogoIn 2s 1.5s ease-in-out infinite alternate' }}>
              <rect x="7" y="0" width="2" height="12" fill="#0A0A0F" />
              <path d="M3 8l5 8 5-8" fill="none" stroke="#0A0A0F" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* ── Scrollable parchment sections — cover the tree ── */}
        <div style={{ position: 'relative', zIndex: 5 }}>
          {/* Thin top shadow so sections don't hard-cut the hero */}
          <div style={{ height: 1, background: 'rgba(10,10,15,0.1)' }} />

          {['agent', 'prompt', 'skill', 'workflow', 'team'].map(type => (
            <ContentSection key={type} type={type} />
          ))}

          <Footer />
        </div>
      </main>
    </>
  )
}
