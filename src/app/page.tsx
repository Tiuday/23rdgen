'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, LayoutGrid, PenLine, BookOpen, Code2, Briefcase, Palette, CheckCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import HeroTree from '@/components/HeroTree'
import TreeRoots from '@/components/TreeRoots'
import CartoonAvatar, { stableAvatarIdx } from '@/components/mascot/CartoonAvatar'
import Footer from '@/components/layout/Footer'

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
    { id: '1', name: 'Code Review Wizard',    description: 'Analyzes pull requests for bugs, security vulnerabilities, and SOLID violations across any language. Outputs findings with severity levels and concrete fix examples.', creator: 'devtools_hq',  deploys: 2840, rating: 4.8 },
    { id: '5', name: 'Bug Hunter Pro',         description: 'Performs systematic root-cause analysis: reproduces the bug, traces the execution path to failure, provides a minimal targeted patch, and suggests prevention tests.',   creator: 'debuggers',    deploys: 1420, rating: 4.6 },
    { id: '9', name: 'Market Radar',           description: 'Produces weekly intelligence briefings: top competitor moves, 3 emerging macro trends, 2 whitespace opportunities, and 2 risks — with sources cited throughout.',       creator: 'strategos',    deploys: 980,  rating: 4.4 },
  ],
  prompt: [
    { id: '2',  name: 'SEO Scribe',            description: 'Generates 1,200-word SEO articles with keyword-rich structure, FAQ section, and meta copy. Outputs the full article plus 5 ready-to-post social variants.',              creator: 'marketers',    deploys: 1650, rating: 4.5 },
    { id: '7',  name: 'Cold Email Machine',    description: 'Writes 3-email sequences (Day 1/4/9) with A/B subject lines, personalization tokens, and no buzzwords. Optimized for reply rate, not click rate.',                       creator: 'salescraft',   deploys: 2100, rating: 4.7 },
    { id: '8',  name: 'LinkedIn Post Pro',     description: 'Crafts scroll-stopping LinkedIn posts: a bold hook, white-space-friendly body, and a CTA. Under 1,300 characters with 3–5 hashtags and configurable tone.',               creator: 'contentguild', deploys: 1780, rating: 4.6 },
  ],
  skill: [
    { id: '3',  name: 'SQL Craftsperson',      description: 'Converts natural language into optimized SQL with inline comments, plain-English explanation, index recommendations, and a simpler alternative if one exists.',          creator: 'dataeng',      deploys: 3200, rating: 4.9 },
    { id: '11', name: 'Brand Voice Guide',     description: 'Analyzes your content samples and outputs 4 voice pillars, a tone dial across contexts, 10 words to use vs. avoid, and 3 before/after rewrites as a quick-reference card.', creator: 'brandcraft',   deploys: 760,  rating: 4.3 },
    { id: '13', name: 'API Error Explainer',   description: 'Decodes any API error in plain English: what happened, why it happened, the exact code change to fix it, and a validation pattern to prevent it from recurring.',          creator: 'devrel_hq',    deploys: 1190, rating: 4.7 },
  ],
  workflow: [
    { id: '4',  name: 'Research Conductor',    description: '5-step workflow: scopes the question into sub-questions, identifies authoritative sources per sub-question, extracts findings, synthesizes contradictions, and formats a cited executive report.', creator: 'researchers',  deploys: 890,  rating: 4.3 },
    { id: '10', name: 'Pitch Deck Writer',     description: 'Builds full investor decks from a brief: problem, solution, TAM/SAM/SOM, traction metrics, business model, competition matrix, team credentials, and use-of-funds. Includes speaker notes.', creator: 'foundry',      deploys: 1340, rating: 4.5 },
    { id: '14', name: 'Content Calendar',      description: 'Generates a 30-day multi-platform content calendar with weekly themes, post formats, hooks, body summaries, CTAs, hashtags, and time-zone-optimized posting schedules.',  creator: 'schedcraft',   deploys: 640,  rating: 4.4 },
  ],
  team: [
    { id: '12', name: 'Content Ops Team',      description: 'A 4-agent pipeline: Research Summarizer feeds the SEO Writer, who hands off to the Social Scheduler, who coordinates with the Cold Email Specialist. Full-cycle content operations.', creator: '23rdgen',      deploys: 3500, rating: 4.9 },
    { id: '15', name: 'Startup Launch Squad',  description: 'A 5-agent launch team: Market Researcher → Pitch Deck Writer → Cold Email Machine → PR Angle Finder → Launch Post Writer. From insight to announcement in one pipeline.',       creator: 'launchpad_ai', deploys: 1280, rating: 4.7 },
    { id: '16', name: 'Dev Squad',             description: 'A 3-agent engineering team: Code Reviewer catches bugs, SQL Craftsperson handles data queries, API Error Explainer unblocks integrations. Full-stack triage support.',              creator: 'builderx',     deploys: 870,  rating: 4.5 },
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
  const avatarIdx = stableAvatarIdx(card.id)

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
      {/* Colored header — big centered avatar */}
      <div
        style={{
          background: headerBg,
          padding: featured ? '28px 20px 20px' : '22px 18px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {featured && (
          <span
            style={{
              position: 'absolute', top: 10, left: 12,
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 9, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: '#0A0A0F', color: '#E8E0D0',
              padding: '3px 8px', borderRadius: 0,
            }}
          >
            ★ FEATURED PICK
          </span>
        )}
        <CartoonAvatar index={avatarIdx} size={featured ? 100 : 80} />
        <span
          style={{
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 9, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            color: 'rgba(10,10,15,0.55)',
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
          {/* Tiuday — AI team builder */}
          <div style={{ marginBottom: 6 }}>
            <Link
              href="/tiuday"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '9px 12px', borderRadius: 12, textDecoration: 'none', fontFamily: AKT, fontSize: 13, fontWeight: 600, color: '#A090C8', background: 'rgba(124,106,158,0.1)', border: '1px solid rgba(124,106,158,0.18)', transition: 'background 100ms, color 100ms' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(124,106,158,0.18)'; el.style.color = '#C4B4E8' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(124,106,158,0.1)'; el.style.color = '#A090C8' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Sparkles size={15} /><span>Tiuday</span></span>
              <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 9, color: '#7C6A9E', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(124,106,158,0.2)', padding: '2px 6px', borderRadius: 4 }}>AI TEAM</span>
            </Link>
          </div>

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

      {/* Floating logo — small, pinned top-left, always visible */}
      <Link
        href="/"
        style={{ position: 'fixed', top: 16, left: 62, zIndex: 200, textDecoration: 'none', lineHeight: 0, userSelect: 'none', animation: 'heroLogoIn 0.5s ease-out both' }}
      >
        <Image src="/inspiration/logo.png" alt="23rdGen" width={84} height={24} style={{ objectFit: 'contain' }} priority />
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

          {/* Subtle root tendrils growing through the scroll content */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            <svg
              viewBox="0 0 1440 3200"
              preserveAspectRatio="xMaxYMin meet"
              style={{ position: 'absolute', top: 0, right: 0, width: '90%', height: '100%', opacity: 0.07 }}
            >
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Main descending root — from hero tree base down through all sections */}
                <path d="M 1380 0 C 1360 180 1300 380 1220 580 C 1140 780 1040 960 980 1160 C 920 1360 910 1560 940 1760 C 970 1960 1010 2160 990 2380 C 970 2600 930 2800 900 3200" stroke="#2A1A0E" strokeWidth="10"/>
                {/* Secondary root — branches left */}
                <path d="M 1340 0 C 1300 220 1220 440 1120 660 C 1020 880 900 1060 820 1260 C 740 1460 720 1660 760 1860 C 800 2060 840 2260 820 2500 C 800 2740 760 2960 720 3200" stroke="#2A1A0E" strokeWidth="6"/>
                {/* Thin tendril — goes far left */}
                <path d="M 1290 0 C 1230 300 1140 580 1020 840 C 900 1100 760 1320 680 1560 C 600 1800 600 2040 640 2280 C 680 2520 700 2760 680 3200" stroke="#2A1A0E" strokeWidth="3.5"/>
                {/* Tertiary root — mid-right sweep */}
                <path d="M 1420 200 C 1400 420 1360 640 1300 860 C 1240 1080 1160 1280 1120 1500 C 1080 1720 1100 1940 1080 2160 C 1060 2380 1020 2600 1000 3200" stroke="#2A1A0E" strokeWidth="5"/>
                {/* Fine right-side tendril */}
                <path d="M 1440 400 C 1430 620 1410 840 1390 1060 C 1370 1280 1350 1500 1340 1720 C 1330 1940 1340 2160 1320 2400 C 1300 2640 1280 2880 1260 3200" stroke="#2A1A0E" strokeWidth="2"/>
                {/* Cross-branch at ~800px */}
                <path d="M 1200 820 C 1120 860 1020 880 900 900 C 780 920 660 930 540 940" stroke="#2A1A0E" strokeWidth="2.5"/>
                {/* Cross-branch at ~1600px */}
                <path d="M 1080 1600 C 980 1640 860 1660 740 1670 C 620 1680 500 1690 380 1700" stroke="#2A1A0E" strokeWidth="2"/>
                {/* Cross-branch at ~2400px */}
                <path d="M 920 2360 C 820 2390 700 2410 580 2420 C 460 2430 340 2440 200 2450" stroke="#2A1A0E" strokeWidth="1.5"/>
                {/* Fine capillary left */}
                <path d="M 1140 1100 C 1060 1120 960 1140 840 1150" stroke="#2A1A0E" strokeWidth="1.2"/>
                <path d="M 960 1900 C 880 1920 780 1940 660 1950" stroke="#2A1A0E" strokeWidth="1"/>
              </g>
            </svg>
          </div>

          {['agent', 'prompt', 'skill', 'workflow', 'team'].map(type => (
            <ContentSection key={type} type={type} />
          ))}

          <Footer />
        </div>
      </main>
    </>
  )
}
