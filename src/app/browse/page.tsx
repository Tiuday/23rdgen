'use client'
import { useState, useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import CartoonAvatar, { stableAvatarIdx } from '@/components/mascot/CartoonAvatar'

type TypeFilter = 'all' | 'agent' | 'prompt' | 'skill' | 'workflow' | 'team'
type SortOption = 'trending' | 'newest' | 'top_rated'

interface BrowseAgent {
  id: string
  name: string
  type: string
  category: string | null
  description: string | null
  deployed_count: number
  rating: number
  created_at: string
  creator: { username: string | null; display_name: string } | null
}

const CATEGORY_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  agent:    { bg: '#FFDDD0', text: '#7A2A10', border: '#C4622D' },
  prompt:   { bg: '#EAE0F5', text: '#4A2A7A', border: '#7C6A9E' },
  skill:    { bg: '#D0EDD5', text: '#1E4D28', border: '#6B8F71' },
  workflow: { bg: '#F5E6D0', text: '#6B3A1E', border: '#A0785A' },
  team:     { bg: '#F5D8DC', text: '#6B1E28', border: '#A05060' },
  browser:  { bg: '#D8E0EC', text: '#1E2E50', border: '#5A6A7A' },
}

const TYPE_HEADER: Record<string, string> = {
  agent:    '#F5D76E',
  prompt:   '#A8D8EA',
  skill:    '#B5EAD7',
  workflow: '#E8A0BF',
  team:     '#C9B1FF',
  browser:  '#A8D8EA',
}

const AKT = "'Akt', system-ui, -apple-system, sans-serif"

const MOCK_AGENTS: BrowseAgent[] = [
  { id: '1', name: 'Code Review Wizard',  type: 'agent',    category: 'engineering', description: 'Deeply analyzes pull requests for bugs, security vulnerabilities, and code quality improvements across any language.', creator: { username: 'devtools_hq',  display_name: 'devtools_hq'  }, deployed_count: 2840, rating: 4.8, created_at: '2026-01-15T00:00:00Z' },
  { id: '2', name: 'SEO Scribe',          type: 'prompt',   category: 'writing',    description: 'Generates SEO-optimized blog posts, meta descriptions, and landing page copy from a simple keyword list.',           creator: { username: 'marketers',    display_name: 'marketers'    }, deployed_count: 1650, rating: 4.5, created_at: '2026-02-10T00:00:00Z' },
  { id: '3', name: 'SQL Craftsperson',    type: 'skill',    category: 'data',       description: 'Translates natural language into optimized SQL for PostgreSQL, MySQL, and SQLite with clear explanations.',           creator: { username: 'dataeng',      display_name: 'dataeng'      }, deployed_count: 3200, rating: 4.9, created_at: '2026-01-20T00:00:00Z' },
  { id: '4', name: 'Research Conductor',  type: 'workflow', category: 'research',   description: 'Multi-step workflow that searches, summarizes, and formats research into structured reports with citations.',         creator: { username: 'researchers',  display_name: 'researchers'  }, deployed_count: 890,  rating: 4.3, created_at: '2026-03-01T00:00:00Z' },
  { id: '5', name: 'Bug Hunter Pro',      type: 'agent',    category: 'engineering',description: 'Scans code for common bug patterns, off-by-one errors, null pointer risks, and silent runtime exceptions.',         creator: { username: 'debuggers',    display_name: 'debuggers'    }, deployed_count: 1420, rating: 4.6, created_at: '2026-02-28T00:00:00Z' },
  { id: '6', name: 'Cold Email Machine',  type: 'prompt',   category: 'sales',      description: 'Writes high-converting cold email sequences personalized to any industry, pain point, or buyer persona.',           creator: { username: 'salescraft',   display_name: 'salescraft'   }, deployed_count: 2100, rating: 4.7, created_at: '2026-02-05T00:00:00Z' },
  { id: '7', name: 'LinkedIn Post Pro',   type: 'prompt',   category: 'marketing',  description: 'Generates viral LinkedIn posts that drive engagement: hooks, stories, carousels, and thought leadership content.',  creator: { username: 'contentguild', display_name: 'contentguild' }, deployed_count: 1780, rating: 4.6, created_at: '2026-03-10T00:00:00Z' },
  { id: '8', name: 'Market Radar',        type: 'agent',    category: 'research',   description: 'Tracks competitor moves, industry shifts, and emerging trends across markets. Weekly briefing format.',             creator: { username: 'strategos',    display_name: 'strategos'    }, deployed_count: 980,  rating: 4.4, created_at: '2026-01-28T00:00:00Z' },
  { id: '9', name: 'Pitch Deck Writer',   type: 'workflow', category: 'business',   description: 'Creates investor-ready pitch decks from a simple brief. Covers problem, solution, traction, and ask.',             creator: { username: 'foundry',      display_name: 'foundry'      }, deployed_count: 1340, rating: 4.5, created_at: '2026-03-20T00:00:00Z' },
  { id: '10', name: 'Brand Voice Guide',  type: 'skill',    category: 'marketing',  description: 'Analyzes your existing content and synthesizes a reusable brand voice guide with tone, vocabulary, and examples.',  creator: { username: 'brandcraft',   display_name: 'brandcraft'   }, deployed_count: 760,  rating: 4.3, created_at: '2026-02-18T00:00:00Z' },
  { id: '11', name: 'Content Team',       type: 'team',     category: 'marketing',  description: 'A coordinated 4-agent team: SEO writer, social scheduler, cold email specialist, and research summarizer.',         creator: { username: 'nakshatra',    display_name: 'Nakshatra Sharma' }, deployed_count: 3500, rating: 4.9, created_at: '2026-01-10T00:00:00Z' },
  { id: '12', name: 'Meeting Notes',      type: 'skill',    category: 'productivity',description: 'Converts a raw meeting transcript into structured decisions, action items with owners, and open questions.',         creator: { username: 'nakshatra',    display_name: 'Nakshatra Sharma' }, deployed_count: 820,  rating: 4.6, created_at: '2026-03-05T00:00:00Z' },
]

const TYPE_TABS: { id: TypeFilter; label: string }[] = [
  { id: 'all',      label: 'All' },
  { id: 'agent',    label: 'Agents' },
  { id: 'prompt',   label: 'Prompts' },
  { id: 'skill',    label: 'Skills' },
  { id: 'workflow', label: 'Workflows' },
  { id: 'team',     label: 'Teams' },
]

const CATEGORY_LABEL: Record<string, string> = {
  'cold-emailing':      'Cold Emailing',
  'script-writing':     'Script Writing',
  'blog-posts':         'Blog Posts',
  'ad-copywriting':     'Ad Copywriting',
  'linkedin-posts':     'LinkedIn Posts',
  'market-research':    'Market Research',
  'competitor-analysis':'Competitor Analysis',
  'literature-review':  'Literature Review',
  'trend-spotting':     'Trend Spotting',
  'code-review':        'Code Review',
  'bug-fixing':         'Bug Fixing',
  'api-integration':    'API Integration',
  'documentation':      'Documentation',
  'sales-automation':   'Sales Automation',
  'lead-generation':    'Lead Generation',
  'customer-support':   'Customer Support',
  'pitch-decks':        'Pitch Decks',
  'image-prompts':      'Image Prompts',
  'storytelling':       'Storytelling',
  'brand-voice':        'Brand Voice',
  'social-content':     'Social Content',
  'task-management':    'Task Management',
  'meeting-summaries':  'Meeting Summaries',
  'email-drafting':     'Email Drafting',
  'data-analysis':      'Data Analysis',
}

function CardSkeleton() {
  return (
    <div
      style={{
        border: '2px solid #0A0A0F',
        boxShadow: '4px 4px 0 #0A0A0F',
        borderRadius: 16,
        overflow: 'hidden',
        background: '#FEFBF5',
      }}
      className="animate-pulse"
    >
      <div style={{ height: 140, background: '#D4C9A8' }} />
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ height: 16, width: 140, background: '#D4C9A8', borderRadius: 2 }} />
        <div style={{ height: 11, background: '#D4C9A8', borderRadius: 2 }} />
        <div style={{ height: 11, width: '75%', background: '#D4C9A8', borderRadius: 2 }} />
        <div style={{ height: 36, background: '#D4C9A8', marginTop: 4 }} />
      </div>
    </div>
  )
}

function BrowseContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || ''
  const qParam = searchParams.get('q') || ''

  const [agents, setAgents] = useState<BrowseAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [sort, setSort] = useState<SortOption>('trending')
  const [search, setSearch] = useState(qParam)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/agents')
        const data = await res.json()
        if (!res.ok || !Array.isArray(data) || data.length === 0) {
          setAgents(MOCK_AGENTS)
        } else {
          setAgents(data as BrowseAgent[])
        }
      } catch {
        setAgents(MOCK_AGENTS)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let result = agents

    if (typeFilter !== 'all') {
      result = result.filter(a => a.type === typeFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) || (a.description ?? '').toLowerCase().includes(q)
      )
    }

    const sorted = [...result]
    if (sort === 'trending') sorted.sort((a, b) => b.deployed_count - a.deployed_count)
    else if (sort === 'newest') sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    else if (sort === 'top_rated') sorted.sort((a, b) => b.rating - a.rating)

    return sorted
  }, [agents, typeFilter, sort, search])

  const headingLabel = categoryParam
    ? (CATEGORY_LABEL[categoryParam] ?? categoryParam)
    : typeFilter !== 'all'
    ? TYPE_TABS.find(t => t.id === typeFilter)?.label ?? 'Browse'
    : 'Browse All'

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Sticky filter bar ── */}
      <div
        style={{
          position: 'sticky',
          top: 48,
          zIndex: 30,
          background: 'rgba(232,224,208,0.97)',
          backdropFilter: 'blur(8px)',
          borderBottom: '2px solid rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '10px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Type filter pills */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }} className="scrollbar-none">
            {TYPE_TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                style={{
                  fontFamily: 'var(--font-ibm-mono), monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '5px 14px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '2px solid #0A0A0F',
                  borderRadius: 0,
                  transition: 'transform 60ms ease, box-shadow 60ms ease',
                  background: typeFilter === t.id ? '#0A0A0F' : 'transparent',
                  color: typeFilter === t.id ? '#E8E0D0' : '#0A0A0F',
                  boxShadow: typeFilter === t.id ? '2px 2px 0px rgba(10,10,15,0.3)' : 'none',
                }}
              >
                {t.label}
              </button>
            ))}

            <div style={{ flex: 1 }} />

            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 11,
                padding: '5px 12px',
                border: '2px solid #0A0A0F',
                borderRadius: 0,
                background: '#F0E6D0',
                color: '#0A0A0F',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                flexShrink: 0,
              }}
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="top_rated">Top Rated</option>
            </select>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 380 }}>
            <svg
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#8A7A6A', pointerEvents: 'none' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search agents…"
              style={{
                width: '100%',
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 12,
                padding: '7px 12px 7px 32px',
                border: '2px solid rgba(0,0,0,0.2)',
                borderRadius: 0,
                background: '#F0E6D0',
                color: '#0A0A0F',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 24px 64px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif',
            fontSize: 28,
            color: '#0A0A0F',
            margin: '0 0 4px',
          }}
        >
          {headingLabel}
        </h1>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', margin: '0 0 24px' }}>
          {loading ? 'Loading…' : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}${search ? ` for "${search}"` : ''}`}
        </p>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[1,2,3,4,5,6].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A' }}>
            No results{search ? ` for "${search}"` : ' in this category'}.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {filtered.map(agent => {
              const headerBg = TYPE_HEADER[agent.type] ?? '#F5D76E'
              const avatarIdx = stableAvatarIdx(agent.id)

              return (
                <Link key={agent.id} href={`/browse/${agent.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div
                    style={{
                      border: '2px solid #0A0A0F',
                      boxShadow: '4px 4px 0 #0A0A0F',
                      borderRadius: 16,
                      background: '#FEFBF5',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'transform 120ms ease, box-shadow 120ms ease',
                      cursor: 'pointer',
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
                    {/* Colored header with big avatar */}
                    <div
                      style={{
                        background: headerBg,
                        padding: '22px 18px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        flexShrink: 0,
                      }}
                    >
                      <CartoonAvatar index={avatarIdx} size={80} />
                      <span
                        style={{
                          fontFamily: 'var(--font-ibm-mono), monospace',
                          fontSize: 9, fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.14em',
                          color: 'rgba(10,10,15,0.55)',
                        }}
                      >
                        {agent.type}
                      </span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3
                        style={{
                          fontFamily: AKT,
                          fontSize: 15,
                          fontWeight: 700,
                          color: '#0A0A0F',
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {agent.name}
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
                          maxHeight: '3.1em',
                        }}
                      >
                        {agent.description}
                      </p>

                      {/* Meta row */}
                      <div
                        style={{
                          display: 'flex', gap: 6, flexWrap: 'wrap',
                          marginTop: 12,
                          fontFamily: 'var(--font-ibm-mono), monospace',
                          fontSize: 11, color: '#8A7A6A',
                        }}
                      >
                        <span>{agent.deployed_count.toLocaleString()} deploys</span>
                        <span>·</span>
                        <span>★ {agent.rating}</span>
                        <span>·</span>
                        <span>@{agent.creator?.display_name ?? agent.creator?.username ?? 'anon'}</span>
                      </div>

                      {/* Deploy button — brutalist inside rounded card */}
                      <button
                        style={{
                          marginTop: 14,
                          fontFamily: 'var(--font-ibm-mono), monospace',
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
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          await fetch(`/api/agents/${agent.id}/deploy`, { method: 'POST' })
                          setAgents(prev => prev.map(a =>
                            a.id === agent.id ? { ...a, deployed_count: a.deployed_count + 1 } : a
                          ))
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
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A' }}>
        Loading…
      </div>
    }>
      <BrowseContent />
    </Suspense>
  )
}
