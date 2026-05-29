'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import PixelAvatar from '@/components/mascot/PixelAvatar'
import type { AgentCategory } from '@/types/agent'

type TabCategory = AgentCategory | 'all'
type SortOption = 'trending' | 'newest' | 'top_rated'

interface BrowseAgent {
  id: string
  name: string
  category: string
  description: string
  creator_name: string | null
  deploy_count: number
  rating: number
  created_at: string
  tags: string[] | null
}

const CATEGORY_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  agent:    { bg: 'rgba(212,82,30,0.12)',   text: '#D4521E', border: 'rgba(212,82,30,0.25)' },
  prompt:   { bg: 'rgba(124,107,158,0.15)', text: '#A594C4', border: 'rgba(124,107,158,0.3)' },
  skill:    { bg: 'rgba(107,143,113,0.15)', text: '#6B8F71', border: 'rgba(107,143,113,0.3)' },
  workflow: { bg: 'rgba(196,120,90,0.12)',  text: '#C4785A', border: 'rgba(196,120,90,0.25)' },
  team:     { bg: 'rgba(176,96,112,0.12)',  text: '#B06070', border: 'rgba(176,96,112,0.25)' },
  browser:  { bg: 'rgba(90,106,122,0.12)',  text: '#5A6A7A', border: 'rgba(90,106,122,0.25)' },
}

const MOCK_AGENTS: BrowseAgent[] = [
  {
    id: '1',
    name: 'Code Review Wizard',
    category: 'agent',
    description: 'Deeply analyzes pull requests for bugs, security vulnerabilities, and code quality improvements across any language.',
    creator_name: 'devtools_hq',
    deploy_count: 2840,
    rating: 4.8,
    created_at: '2026-01-15T00:00:00Z',
    tags: ['code', 'review', 'security'],
  },
  {
    id: '2',
    name: 'SEO Scribe',
    category: 'prompt',
    description: 'Generates SEO-optimized blog posts, meta descriptions, and landing page copy from a simple keyword list.',
    creator_name: 'marketers',
    deploy_count: 1650,
    rating: 4.5,
    created_at: '2026-02-10T00:00:00Z',
    tags: ['seo', 'content', 'writing'],
  },
  {
    id: '3',
    name: 'SQL Craftsperson',
    category: 'skill',
    description: 'Translates natural language into optimized SQL for PostgreSQL, MySQL, and SQLite with clear explanations.',
    creator_name: 'dataeng',
    deploy_count: 3200,
    rating: 4.9,
    created_at: '2026-01-20T00:00:00Z',
    tags: ['sql', 'database', 'data'],
  },
  {
    id: '4',
    name: 'Research Conductor',
    category: 'workflow',
    description: 'Multi-step workflow that searches, summarizes, and formats research into structured reports with citations.',
    creator_name: 'researchers',
    deploy_count: 890,
    rating: 4.3,
    created_at: '2026-03-01T00:00:00Z',
    tags: ['research', 'workflow', 'reports'],
  },
  {
    id: '5',
    name: 'Bug Hunter Pro',
    category: 'agent',
    description: 'Scans code for common bug patterns, off-by-one errors, null pointer risks, and silent runtime exceptions.',
    creator_name: 'debuggers',
    deploy_count: 1420,
    rating: 4.6,
    created_at: '2026-02-28T00:00:00Z',
    tags: ['debugging', 'testing', 'quality'],
  },
  {
    id: '6',
    name: 'Explorer Bot',
    category: 'browser',
    description: 'Automates web navigation, form filling, data extraction, and screenshot capture across any website.',
    creator_name: 'automators',
    deploy_count: 1100,
    rating: 4.4,
    created_at: '2026-03-15T00:00:00Z',
    tags: ['automation', 'scraping', 'web'],
  },
]

const TABS: { id: TabCategory; label: string }[] = [
  { id: 'all',      label: 'All' },
  { id: 'agent',    label: 'Agents' },
  { id: 'prompt',   label: 'Prompts' },
  { id: 'skill',    label: 'Skills' },
  { id: 'workflow', label: 'Workflows' },
  { id: 'team',     label: 'Teams' },
  { id: 'browser',  label: 'Browser' },
]

function CardSkeleton() {
  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-[14px] border animate-pulse"
      style={{ background: '#12121A', borderColor: 'rgba(124,106,158,0.1)' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: '#1C1920' }} />
        <div className="flex-1 pt-0.5 space-y-2">
          <div className="h-3 w-14 rounded-full" style={{ background: '#1C1920' }} />
          <div className="h-4 w-28 rounded" style={{ background: '#1C1920' }} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded" style={{ background: '#1C1920' }} />
        <div className="h-3 w-4/5 rounded" style={{ background: '#1C1920' }} />
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="h-3 w-20 rounded" style={{ background: '#1C1920' }} />
        <div className="h-7 w-14 rounded-full" style={{ background: '#1C1920' }} />
      </div>
    </div>
  )
}

export default function BrowsePage() {
  const [agents, setAgents] = useState<BrowseAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<TabCategory>('all')
  const [sort, setSort] = useState<SortOption>('trending')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('agents')
          .select('id, name, category, description, creator_name, deploy_count, rating, created_at, tags')
          .eq('status', 'active')

        if (error || !data || data.length === 0) {
          setAgents(MOCK_AGENTS)
        } else {
          // Normalize: fall back to id as name if name column missing
          setAgents(
            data.map(row => ({
              ...row,
              name: (row as BrowseAgent & { title?: string }).name ?? (row as BrowseAgent & { title?: string }).title ?? 'Untitled',
              rating: (row as BrowseAgent).rating ?? 0,
            })) as BrowseAgent[]
          )
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

    if (tab !== 'all') {
      result = result.filter(a => a.category === tab)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        a =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      )
    }

    const sorted = [...result]
    if (sort === 'trending') {
      sorted.sort((a, b) => b.deploy_count - a.deploy_count)
    } else if (sort === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sort === 'top_rated') {
      sorted.sort((a, b) => b.rating - a.rating)
    }

    return sorted
  }, [agents, tab, sort, search])

  return (
    <div className="min-h-screen">
      {/* ── Sticky filters bar ───────────────────────────────────────── */}
      <div
        className="sticky top-14 z-30 border-b backdrop-blur-md"
        style={{
          background: 'rgba(10,10,15,0.92)',
          borderColor: 'rgba(124,106,158,0.12)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 shrink-0 scrollbar-none">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0"
                style={
                  tab === t.id
                    ? {
                        background: 'rgba(124,106,158,0.2)',
                        color: '#A594C4',
                        border: '1px solid rgba(124,106,158,0.35)',
                      }
                    : {
                        color: 'rgba(237,232,223,0.5)',
                        border: '1px solid transparent',
                      }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 hidden sm:block" />

          {/* Sort + Search */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="text-xs px-3 py-1.5 rounded-full outline-none cursor-pointer shrink-0 appearance-none"
              style={{
                background: '#0A0A0F',
                border: '1px solid rgba(124,106,158,0.2)',
                color: 'rgba(237,232,223,0.7)',
              }}
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="top_rated">Top Rated</option>
            </select>

            <div className="relative flex-1 sm:w-64">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: 'rgba(237,232,223,0.35)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search agents…"
                className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs outline-none placeholder:text-[rgba(237,232,223,0.3)]"
                style={{
                  background: '#0A0A0F',
                  border: '1px solid rgba(124,106,158,0.2)',
                  color: '#E8E0D0',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-xs text-[rgba(237,232,223,0.4)] mb-5">
          {loading
            ? 'Loading…'
            : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}${search ? ` for "${search}"` : ''}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-[rgba(237,232,223,0.35)] text-sm">
            No results{search ? ` for "${search}"` : ' in this category'}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(agent => {
              const badge = CATEGORY_BADGE[agent.category] ?? CATEGORY_BADGE.agent
              const cat = (agent.category as AgentCategory) in CATEGORY_BADGE
                ? (agent.category as AgentCategory)
                : 'agent'

              return (
                <Link key={agent.id} href={`/browse/${agent.id}`} className="group block">
                  <div
                    className="flex flex-col gap-3 p-4 rounded-[14px] border transition-all duration-200 h-full
                                group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_24px_rgba(124,106,158,0.12)]"
                    style={{ background: '#12121A', borderColor: 'rgba(124,106,158,0.2)' }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,106,158,0.5)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,106,158,0.2)'
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <PixelAvatar category={cat} size={40} />
                      <div className="flex-1 min-w-0 pt-0.5">
                        <span
                          className="inline-block text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize mb-1"
                          style={{
                            background: badge.bg,
                            color: badge.text,
                            borderColor: badge.border,
                          }}
                        >
                          {agent.category}
                        </span>
                        <h3 className="text-sm font-bold text-[#E8E0D0] leading-snug truncate">
                          {agent.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[rgba(232,224,208,0.55)] leading-relaxed line-clamp-2 flex-1">
                      {agent.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1 mt-auto">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-[rgba(232,224,208,0.4)]">
                          by {agent.creator_name ?? 'anonymous'}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: '#C4622D' }}>
                          {agent.deploy_count.toLocaleString()} deploys
                        </span>
                      </div>
                      <span
                        className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                        style={{ borderColor: 'rgba(124,106,158,0.35)', color: '#A594C4' }}
                      >
                        View →
                      </span>
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
