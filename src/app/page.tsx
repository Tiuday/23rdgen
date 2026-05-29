'use client'
import { useState } from 'react'
import Link from 'next/link'
import WizardMascot from '@/components/mascot/WizardMascot'
import SearchBar from '@/components/search/SearchBar'
import SearchModal from '@/components/search/SearchModal'
import AgentCard from '@/components/cards/AgentCard'
import PixelAvatar from '@/components/mascot/PixelAvatar'
import type { AgentCategory } from '@/types/agent'

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_AGENTS = [
  {
    id: '1', title: 'Code Review Pro',
    description: 'Deeply analyzes pull requests for bugs, security issues, and code quality improvements. Works with any language.',
    category: 'agent' as AgentCategory, deploy_count: 2840, points_per_deploy: 10, creator: 'devtools',
  },
  {
    id: '2', title: 'SEO Content Writer',
    description: 'Generates SEO-optimized blog posts, meta descriptions, and landing page copy from a keyword list.',
    category: 'prompt' as AgentCategory, deploy_count: 1650, points_per_deploy: 10, creator: 'marketers',
  },
  {
    id: '3', title: 'SQL Query Builder',
    description: 'Translates natural language into optimized SQL for PostgreSQL, MySQL, and SQLite. Explains every query.',
    category: 'skill' as AgentCategory, deploy_count: 3200, points_per_deploy: 10, creator: 'dataeng',
  },
  {
    id: '4', title: 'Research Pipeline',
    description: 'Multi-step workflow that searches, summarizes, and formats research into structured reports with citations.',
    category: 'workflow' as AgentCategory, deploy_count: 890, points_per_deploy: 10, creator: 'researchers',
  },
  {
    id: '5', title: 'Startup Launch Team',
    description: 'Pre-configured team of agents: Copywriter, Developer, Designer, and Growth Analyst — all in sync.',
    category: 'team' as AgentCategory, deploy_count: 450, points_per_deploy: 10, creator: 'founders',
  },
  {
    id: '6', title: 'Browser Automator',
    description: 'Automates repetitive browser tasks: form filling, data scraping, screenshot capture, and navigation.',
    category: 'browser' as AgentCategory, deploy_count: 1100, points_per_deploy: 10, creator: 'automators',
  },
  {
    id: '7', title: 'Email Campaign AI',
    description: 'Writes personalized cold emails and follow-up sequences optimized for high open and reply rates.',
    category: 'prompt' as AgentCategory, deploy_count: 2100, points_per_deploy: 10, creator: 'salesteam',
  },
  {
    id: '8', title: 'Data Analysis Agent',
    description: 'Analyzes CSV and JSON datasets, produces summaries, chart recommendations, and plain-language insights.',
    category: 'agent' as AgentCategory, deploy_count: 1750, points_per_deploy: 10, creator: 'analysts',
  },
]

const SIDEBAR_CATEGORIES: { id: AgentCategory | 'all'; label: string; color: string }[] = [
  { id: 'all',      label: 'All',       color: '#EDE8DF' },
  { id: 'agent',    label: 'Agents',    color: '#D4521E' },
  { id: 'prompt',   label: 'Prompts',   color: '#7C6B9E' },
  { id: 'skill',    label: 'Skills',    color: '#3A6B45' },
  { id: 'workflow', label: 'Workflows', color: '#C4785A' },
  { id: 'team',     label: 'Teams',     color: '#8C3A56' },
  { id: 'browser',  label: 'Browser',   color: '#3A4560' },
]

const TEAM_MEMBERS: { category: AgentCategory; label: string }[] = [
  { category: 'agent',    label: 'Researcher' },
  { category: 'prompt',   label: 'Copywriter' },
  { category: 'skill',    label: 'Coder' },
  { category: 'workflow', label: 'Planner' },
  { category: 'browser',  label: 'Scraper' },
  { category: 'team',     label: 'Manager' },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<AgentCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? MOCK_AGENTS
    : MOCK_AGENTS.filter(a => a.category === activeCategory)

  return (
    <>
      {/* ── SEARCH BAR (top of main content) ─────────────────────────── */}
      <div className="relative w-full border-b border-[rgba(124,106,158,0.08)]" style={{ background: 'rgba(10,10,15,0.6)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <SearchBar onOpen={() => setSearchOpen(true)} className="w-full" />
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-visible" style={{ minHeight: 500 }}>
        {/* Radial gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 55% at 68% 45%, rgba(124,107,158,0.13) 0%, transparent 68%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 flex flex-col lg:flex-row items-center gap-12">
          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-6"
              style={{ background: 'rgba(124,107,158,0.1)', borderColor: 'rgba(124,107,158,0.3)', color: '#A594C4' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A594C4] animate-pulse" />
              Open marketplace for deployable intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#EDE8DF] leading-[1.08] tracking-tight mb-5">
              Deploy
              <br />
              {/* "Intelligence." shimmer animation */}
              <span
                style={{
                  background: 'linear-gradient(90deg, #A594C4 0%, #EDE8DF 45%, #7C6A9E 70%, #A594C4 100%)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  animation: 'text-shimmer 4s linear infinite',
                }}
              >
                Intelligence.
              </span>
              <br />
              Anywhere.
            </h1>

            <p className="text-base text-[rgba(237,232,223,0.55)] leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
              Browse thousands of AI agents, prompts, skills, and workflows. Copy any item into your AI system with one click. Earn points every time yours gets deployed.
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              {/* Browse Agents — primary with pulse ring */}
              <span className="relative inline-flex">
                {/* Pulse ring */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    border: '2px solid rgba(124,106,158,0.5)',
                    borderRadius: '100px',
                    animation: 'pulse-ring 3s ease-out infinite',
                  }}
                />
                <Link
                  href="/browse"
                  className="btn-primary relative px-6 py-2.5 rounded-full bg-[#7C6B9E] text-[#EDE8DF] font-medium text-sm"
                >
                  Browse Agents
                </Link>
              </span>

              {/* Upload Yours — ghost */}
              <Link
                href="/upload"
                className="btn-ghost px-6 py-2.5 rounded-full border border-[#332E28] text-[rgba(237,232,223,0.7)] font-medium text-sm hover:border-[rgba(124,106,158,0.5)] hover:text-[#EDE8DF]"
              >
                Upload Yours
              </Link>
            </div>
          </div>

          {/* Right: WizardMascot (larger, with particles) */}
          <div className="shrink-0 flex items-center justify-center" style={{ width: 300, height: 400 }}>
            <WizardMascot />
          </div>
        </div>
      </section>

      {/* ── BROWSE SECTION ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex gap-8">
          {/* Category filter sidebar */}
          <aside className="w-44 shrink-0 hidden md:block">
            <h2 className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-widest mb-4">
              Filter
            </h2>
            <nav className="flex flex-col gap-0.5">
              {SIDEBAR_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg transition-colors text-left"
                  style={
                    activeCategory === cat.id
                      ? { background: 'rgba(124,107,158,0.15)', color: '#EDE8DF' }
                      : { color: 'rgba(237,232,223,0.55)' }
                  }
                >
                  {cat.id !== 'all' && (
                    <span
                      className="w-2 h-2 rounded-sm shrink-0"
                      style={{ background: cat.color, opacity: activeCategory === cat.id ? 1 : 0.6 }}
                    />
                  )}
                  {cat.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Card grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-[#EDE8DF]">
                {activeCategory === 'all' ? 'All items' : SIDEBAR_CATEGORIES.find(c => c.id === activeCategory)?.label}
                <span className="ml-2 text-[rgba(237,232,223,0.4)] font-normal text-xs">
                  {filtered.length} results
                </span>
              </h2>
              <button className="btn-ghost text-xs text-[rgba(237,232,223,0.45)] hover:text-[#EDE8DF] px-2 py-1 rounded">
                Sort: Most Deployed ↓
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="flex items-center justify-center h-40 text-[rgba(237,232,223,0.35)] text-sm">
                No items in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TEAM BUILDER FEATURE ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-t border-[#2A2520]"
        style={{ background: 'linear-gradient(135deg, #1C1916 0%, #1A1230 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(124,107,158,0.1) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border mb-5" style={{ background: 'rgba(124,107,158,0.12)', borderColor: 'rgba(124,107,158,0.3)', color: '#A594C4' }}>
              Team Builder
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#EDE8DF] mb-4 leading-tight">
              Assemble your
              <br />
              <span style={{ color: '#A594C4' }}>dream agent team.</span>
            </h2>
            <p className="text-[rgba(237,232,223,0.55)] leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
              Mix and match agents into a coordinated team with defined roles. One export, ready for any orchestration platform.
            </p>
            <Link
              href="/team-builder"
              className="btn-primary inline-flex px-5 py-2.5 rounded-full bg-[#7C6B9E] text-[#EDE8DF] text-sm font-medium"
            >
              Try Team Builder
            </Link>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <div className="flex gap-3">
              {TEAM_MEMBERS.slice(0, 3).map(m => (
                <div key={m.label} className="flex flex-col items-center gap-1.5">
                  <PixelAvatar category={m.category} size={52} className="ring-2 ring-[#2A2520]" />
                  <span className="text-[10px] text-[rgba(237,232,223,0.45)]">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 ml-6">
              {TEAM_MEMBERS.slice(3).map(m => (
                <div key={m.label} className="flex flex-col items-center gap-1.5">
                  <PixelAvatar category={m.category} size={52} className="ring-2 ring-[#2A2520]" />
                  <span className="text-[10px] text-[rgba(237,232,223,0.45)]">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-1">
              <span className="text-xs text-[rgba(237,232,223,0.35)]">6-agent startup team · 1 export</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMPT CUSTOMISER FEATURE ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-t border-[#2A2520]"
        style={{ background: '#0E0E16' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(212,82,30,0.07) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border mb-5" style={{ background: 'rgba(212,82,30,0.08)', borderColor: 'rgba(212,82,30,0.25)', color: '#D4521E' }}>
              Prompt Customiser · Powered by Claude
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#EDE8DF] mb-4 leading-tight">
              Make every agent
              <br />
              <span style={{ color: '#C4785A' }}>yours.</span>
            </h2>
            <p className="text-[rgba(237,232,223,0.55)] leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
              Describe your use case in plain English. Claude rewrites the agent's instructions to fit your workflow perfectly — no prompt engineering required.
            </p>
            <Link
              href="/browse"
              className="btn-ghost inline-flex px-5 py-2.5 rounded-full border border-[#332E28] text-[rgba(237,232,223,0.7)] text-sm font-medium hover:border-[rgba(124,106,158,0.4)] hover:text-[#EDE8DF]"
            >
              Browse &amp; Customise
            </Link>
          </div>

          {/* Mock editor */}
          <div className="shrink-0 w-full max-w-sm">
            <div className="rounded-[14px] bg-[#1C1916] border border-[#2A2520] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#2A2520]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#332E28]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#332E28]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#332E28]" />
                <span className="ml-2 text-xs text-[rgba(237,232,223,0.35)]">Prompt Customiser</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-wider mb-1.5">Your use case</p>
                  <div className="rounded-lg bg-[#242018] border border-[#332E28] px-3 py-2 text-sm text-[rgba(237,232,223,0.7)]">
                    I run a SaaS for B2B clients and need cold emails that mention their specific product category…
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-[#2A2520]" />
                  <span className="text-[10px] text-[rgba(237,232,223,0.3)]">Claude rewrites ↓</span>
                  <div className="flex-1 h-px bg-[#2A2520]" />
                </div>
                <div>
                  <p className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-wider mb-1.5">Customised agent</p>
                  <div className="rounded-lg bg-[#1A1520] border border-[rgba(124,107,158,0.25)] px-3 py-2 text-xs text-[rgba(237,232,223,0.65)] leading-relaxed line-clamp-3">
                    You are a B2B cold email specialist for SaaS companies. When given a prospect's company name and product category, write a 3-sentence email…
                  </div>
                </div>
                <button className="btn-primary w-full py-2 rounded-full bg-[#7C6B9E] text-[#EDE8DF] text-sm font-medium">
                  Apply &amp; Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <section className="border-t border-[#2A2520] py-20 text-center">
        <h2 className="text-3xl font-bold text-[#EDE8DF] mb-3">Ready to deploy?</h2>
        <p className="text-[rgba(237,232,223,0.55)] mb-7 max-w-sm mx-auto">
          Join thousands of builders sharing and deploying intelligence.
        </p>
        <Link
          href="/signup"
          className="btn-primary inline-flex px-7 py-3 rounded-full bg-[#7C6B9E] text-[#EDE8DF] font-semibold text-sm"
        >
          Get started free
        </Link>
      </section>

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
