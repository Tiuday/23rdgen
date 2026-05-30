'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SearchModal from '@/components/search/SearchModal'
import HeroTree from '@/components/HeroTree'
import TreeRoots from '@/components/TreeRoots'
import Footer from '@/components/layout/Footer'

// ── Navigation ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Browse All', href: '/browse' },
  { label: 'Agents',     href: '/browse?type=agent' },
  { label: 'Prompts',    href: '/browse?type=prompt' },
  { label: 'Skills',     href: '/browse?type=skill' },
  { label: 'Workflows',  href: '/browse?type=workflow' },
  { label: 'Teams',      href: '/browse?type=team' },
  { label: 'Creators',   href: '/creators' },
]

// ── Sidebar categories ──────────────────────────────────────────────────────
const SIDEBAR_CATS = [
  {
    group: 'WRITING',
    items: [
      { label: 'Cold Emailing',   slug: 'cold-emailing' },
      { label: 'Script Writing',  slug: 'script-writing' },
      { label: 'Blog Posts',      slug: 'blog-posts' },
      { label: 'Ad Copywriting',  slug: 'ad-copywriting' },
      { label: 'LinkedIn Posts',  slug: 'linkedin-posts' },
    ],
  },
  {
    group: 'RESEARCH',
    items: [
      { label: 'Market Research',    slug: 'market-research' },
      { label: 'Competitor Analysis', slug: 'competitor-analysis' },
      { label: 'Literature Review',  slug: 'literature-review' },
      { label: 'Trend Spotting',     slug: 'trend-spotting' },
    ],
  },
  {
    group: 'CODING',
    items: [
      { label: 'Code Review',    slug: 'code-review' },
      { label: 'Bug Fixing',     slug: 'bug-fixing' },
      { label: 'API Integration', slug: 'api-integration' },
      { label: 'Documentation',  slug: 'documentation' },
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
      { label: 'Task Management',    slug: 'task-management' },
      { label: 'Meeting Summaries',  slug: 'meeting-summaries' },
      { label: 'Email Drafting',     slug: 'email-drafting' },
      { label: 'Data Analysis',      slug: 'data-analysis' },
    ],
  },
]

// ── Pixel characters ────────────────────────────────────────────────────────
function WizardChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <rect x="4" y="0" width="2" height="1" fill="#7C6B9E"/>
      <rect x="3" y="1" width="4" height="1" fill="#7C6B9E"/>
      <rect x="2" y="2" width="6" height="1" fill="#7C6B9E"/>
      <rect x="4" y="2" width="2" height="1" fill="#F5D76E"/>
      <rect x="0" y="3" width="10" height="1" fill="#5A4A7E"/>
      <rect x="2" y="4" width="6" height="4" fill="#F0D4B0"/>
      <rect x="3" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="6" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="3" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="6" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="4" y="7" width="2" height="1" fill="#8B4020"/>
      <rect x="2" y="7" width="6" height="1" fill="#E0D8C8"/>
      <rect x="1" y="8" width="8" height="1" fill="#7C6B9E"/>
      <rect x="0" y="9" width="10" height="1" fill="#6B5A8E"/>
      <rect x="0" y="10" width="10" height="1" fill="#6B5A8E"/>
      <rect x="3" y="10" width="4" height="1" fill="#F5D76E"/>
      <rect x="1" y="11" width="2" height="1" fill="#2A1E3E"/>
      <rect x="7" y="11" width="2" height="1" fill="#2A1E3E"/>
    </svg>
  )
}

function ScribeChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <rect x="2" y="0" width="6" height="1" fill="#3A4560"/>
      <rect x="1" y="1" width="8" height="1" fill="#3A4560"/>
      <rect x="1" y="2" width="8" height="1" fill="#4A5570"/>
      <rect x="2" y="3" width="6" height="4" fill="#F0D4B0"/>
      <rect x="2" y="4" width="2" height="2" fill="none" stroke="#8B7030" strokeWidth="0.2"/>
      <rect x="6" y="4" width="2" height="2" fill="none" stroke="#8B7030" strokeWidth="0.2"/>
      <rect x="4" y="5" width="2" height="1" fill="#8B7030" opacity="0.6"/>
      <rect x="3" y="5" width="1" height="1" fill="#0A0A0F" opacity="0.7"/>
      <rect x="6" y="5" width="1" height="1" fill="#0A0A0F" opacity="0.7"/>
      <rect x="4" y="6" width="2" height="1" fill="#8B4020" opacity="0.8"/>
      <rect x="1" y="7" width="8" height="4" fill="#7BB8D0"/>
      <rect x="1" y="7" width="3" height="4" fill="#F0E6D0"/>
      <rect x="1" y="7" width="3" height="1" fill="#D4C9A8"/>
      <rect x="1" y="10" width="3" height="1" fill="#D4C9A8"/>
      <rect x="2" y="8" width="1" height="1" fill="#0A0A0F" opacity="0.25"/>
      <rect x="2" y="9" width="1" height="1" fill="#0A0A0F" opacity="0.25"/>
      <rect x="5" y="6" width="1" height="5" fill="#E8E0D0"/>
      <rect x="4" y="6" width="1" height="2" fill="#F5F0E8" opacity="0.8"/>
      <rect x="6" y="6" width="1" height="2" fill="#F5F0E8" opacity="0.8"/>
      <rect x="3" y="11" width="2" height="1" fill="#2A1E3E"/>
      <rect x="6" y="11" width="2" height="1" fill="#2A1E3E"/>
    </svg>
  )
}

function CraftspersonChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <rect x="1" y="0" width="8" height="2" fill="#3A5A30"/>
      <rect x="0" y="2" width="10" height="1" fill="#2A4A20"/>
      <rect x="2" y="2" width="6" height="1" fill="#4A7A40"/>
      <rect x="2" y="3" width="6" height="4" fill="#F0D4B0"/>
      <rect x="3" y="4" width="1" height="2" fill="#0A0A0F"/>
      <rect x="6" y="4" width="1" height="2" fill="#0A0A0F"/>
      <rect x="3" y="4" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="6" y="4" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="4" y="6" width="2" height="1" fill="#8B4020"/>
      <rect x="0" y="7" width="10" height="4" fill="#4A7A40"/>
      <rect x="2" y="7" width="6" height="3" fill="#B5EAD7"/>
      <rect x="3" y="8" width="2" height="1" fill="#3A6B45"/>
      <rect x="8" y="5" width="1" height="4" fill="#8B8070"/>
      <rect x="7" y="5" width="2" height="1" fill="#8B8070"/>
      <rect x="7" y="8" width="2" height="1" fill="#8B8070"/>
      <rect x="1" y="11" width="3" height="1" fill="#2A1E3E"/>
      <rect x="6" y="11" width="3" height="1" fill="#2A1E3E"/>
    </svg>
  )
}

function ConductorChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <rect x="2" y="0" width="6" height="3" fill="#1A1020"/>
      <rect x="0" y="3" width="10" height="1" fill="#0A0A0F"/>
      <rect x="2" y="4" width="6" height="4" fill="#F0D4B0"/>
      <rect x="3" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="6" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="3" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="6" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="3" y="7" width="4" height="1" fill="#5A3018"/>
      <rect x="1" y="8" width="8" height="3" fill="#9B88E8"/>
      <rect x="3" y="8" width="4" height="2" fill="#E8E0D0"/>
      <rect x="4" y="8" width="2" height="1" fill="#0A0A0F"/>
      <rect x="9" y="2" width="1" height="7" fill="#0A0A0F"/>
      <rect x="9" y="2" width="1" height="1" fill="#F5D76E"/>
      <rect x="0" y="8" width="1" height="2" fill="#F0D4B0"/>
      <rect x="2" y="11" width="2" height="1" fill="#0A0A0F"/>
      <rect x="6" y="11" width="2" height="1" fill="#0A0A0F"/>
    </svg>
  )
}

type CardType = 'AGENT' | 'PROMPT' | 'SKILL' | 'WORKFLOW'

function CardChar({ type }: { type: CardType }) {
  switch (type) {
    case 'AGENT':    return <WizardChar />
    case 'PROMPT':   return <ScribeChar />
    case 'SKILL':    return <CraftspersonChar />
    case 'WORKFLOW': return <ConductorChar />
  }
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? '#0A0A0F' : 'none'}
      stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

// ── Seed cards ──────────────────────────────────────────────────────────────
interface SeedCard {
  id: number
  color: string
  name: string
  type: CardType
  desc: string
  deployed: string
  rating: string
  creator: string
}

const SEED_CARDS: SeedCard[] = [
  { id: 1, color: '#F5D76E', name: 'SEO Content Machine', type: 'AGENT',
    desc: 'Generates SEO-optimized blog posts, meta tags and keyword clusters automatically.',
    deployed: '3.4k', rating: '4.9', creator: '@builderx' },
  { id: 2, color: '#A8D8EA', name: 'Cold Email Writer', type: 'PROMPT',
    desc: 'Writes hyper-personalized cold emails that actually get replies. Plug in any niche.',
    deployed: '2.1k', rating: '4.7', creator: '@growthlab' },
  { id: 3, color: '#E8A0BF', name: 'Code Review Agent', type: 'AGENT',
    desc: 'Reviews pull requests with full codebase context. Catches bugs before they ship.',
    deployed: '5.6k', rating: '4.9', creator: '@devforge' },
  { id: 4, color: '#B5EAD7', name: 'Research Summarizer', type: 'SKILL',
    desc: 'Reads any PDF, URL or paper and returns a crisp executive summary in 30 seconds.',
    deployed: '1.8k', rating: '4.6', creator: '@paperbot' },
  { id: 5, color: '#FFB347', name: 'Social Media Scheduler', type: 'WORKFLOW',
    desc: 'End-to-end workflow: generate, review and schedule posts across all platforms.',
    deployed: '2.9k', rating: '4.8', creator: '@socialstk' },
  { id: 6, color: '#C9B1FF', name: 'Customer Support GPT', type: 'AGENT',
    desc: 'Trains on your docs and handles Tier 1 support tickets with zero hallucination.',
    deployed: '4.1k', rating: '4.9', creator: '@helpdesk' },
]

// ── Section definitions ─────────────────────────────────────────────────────
const SECTIONS = [
  { label: '★ TRENDING NOW', heading: 'Hot Shots',       desc: 'The most deployed agents this week.',                      id: 's1', cards: [SEED_CARDS[2], SEED_CARDS[5], SEED_CARDS[0], SEED_CARDS[4]] },
  { label: '🔥 EDITORS PICK', heading: 'Cult Classics',   desc: 'Beloved by power users. Tried, tested, deployed.',         id: 's2', cards: [SEED_CARDS[1], SEED_CARDS[3], SEED_CARDS[5], SEED_CARDS[0]] },
  { label: '✦ JUST LANDED',  heading: 'Fresh Drops',      desc: 'New uploads from the community — hot off the forge.',      id: 's3', cards: [SEED_CARDS[0], SEED_CARDS[1], SEED_CARDS[2], SEED_CARDS[3]] },
  { label: '⚡ SPEED RUNNERS', heading: 'One-Click Wonders', desc: 'Maximum output, minimum setup. Deploy in seconds.',    id: 's4', cards: [SEED_CARDS[4], SEED_CARDS[2], SEED_CARDS[0], SEED_CARDS[1]] },
  { label: '👁 HIDDEN GEMS',  heading: 'Under the Radar',  desc: 'Criminally underrated. Discovered by the few.',           id: 's5', cards: [SEED_CARDS[3], SEED_CARDS[5], SEED_CARDS[1], SEED_CARDS[4]] },
]

// ── AgentCard ───────────────────────────────────────────────────────────────
function AgentCard({ card }: { card: SeedCard }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [deployHovered, setDeployHovered] = useState(false)

  return (
    <Link
      href={`/agent/${card.id}`}
      style={{ textDecoration: 'none', display: 'block', flexShrink: 0, width: 280 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        border: '2px solid #0A0A0F',
        borderRadius: 0,
        boxShadow: hovered ? '9px 9px 0px #0A0A0F' : '5px 5px 0px #0A0A0F',
        background: card.color,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transform: hovered ? 'translate(-4px, -4px) scale(1.02)' : 'translate(0,0) scale(1)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))',
        zIndex: 2,
      }}>
        {/* Card header */}
        <div style={{ width: '100%', height: 160, background: card.color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.62)', border: '1.5px solid #0A0A0F', borderRadius: 0, padding: '3px 8px' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, background: '#0A0A0F', flexShrink: 0 }}/>
            <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0A0A0F', lineHeight: 1 }}>{card.type}</span>
          </div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setSaved(!saved) }}
            title="Save"
            style={{ position: 'absolute', top: 10, right: 12, background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <BookmarkIcon filled={saved}/>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80 }}>
            <CardChar type={card.type}/>
          </div>
        </div>

        {/* Card body */}
        <div style={{ background: '#FFF8F0', borderTop: '2px solid #0A0A0F', padding: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 18, color: '#0A0A0F', fontWeight: 600, margin: '0 0 6px 0', lineHeight: 1.2 }}>
            {card.name}
          </h3>
          <p style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 12, color: '#2A1A0E', lineHeight: 1.6, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, textOverflow: 'ellipsis' }}>
            {card.desc}
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, color: '#7C6A9E' }}>⚡ {card.deployed} deployed</span>
            <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, color: '#B8960C' }}>★ {card.rating}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
            <span style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, color: '#5A6A7A' }}>by {card.creator}</span>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation() }}
              onMouseEnter={() => setDeployHovered(true)}
              onMouseLeave={() => setDeployHovered(false)}
              style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#E8E0D0', background: '#0A0A0F', border: '2px solid #0A0A0F', boxShadow: deployHovered ? '3px 3px 0px #7C6A9E' : '2px 2px 0px #7C6A9E', padding: '6px 14px', borderRadius: 0, cursor: 'pointer', transform: deployHovered ? 'translate(-1px,-1px)' : 'translate(0,0)', transition: 'transform 0.1s ease, box-shadow 0.1s ease' }}>
              Deploy
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Category sidebar ────────────────────────────────────────────────────────
function CategorySidebar() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 48,
      width: 220,
      height: 'calc(100vh - 48px)',
      overflowY: 'auto',
      zIndex: 50,
      background: 'rgba(232, 224, 208, 0.92)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRight: '1px solid rgba(0,0,0,0.1)',
      paddingBottom: 32,
    }}>
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C6A9E', marginBottom: 8 }}>
          CATEGORIES
        </div>
      </div>

      {SIDEBAR_CATS.map(cat => (
        <div key={cat.group} style={{ marginTop: 20 }}>
          <div style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5A4A7A', padding: '0 16px', marginBottom: 4 }}>
            {cat.group}
          </div>
          {cat.items.map(item => (
            <Link
              key={item.slug}
              href={`/browse?category=${item.slug}`}
              onClick={() => setActiveSlug(item.slug)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                fontSize: 13,
                color: '#2A1A0E',
                textDecoration: 'none',
                padding: '6px 16px',
                borderLeft: activeSlug === item.slug ? '2px solid #7C6A9E' : '2px solid transparent',
                background: activeSlug === item.slug ? 'rgba(124,106,158,0.2)' : 'transparent',
                transition: 'background 120ms, border-color 120ms',
              }}
              onMouseEnter={e => {
                if (activeSlug !== item.slug) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(124,106,158,0.12)'
                }
              }}
              onMouseLeave={e => {
                if (activeSlug !== item.slug) {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  )
}

// ── Horizontal section row ──────────────────────────────────────────────────
function SectionRow({ section }: { section: typeof SECTIONS[0] }) {
  return (
    <section style={{ padding: '48px 4vw 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C6A9E', margin: '0 0 6px 0' }}>
            {section.label}
          </p>
          <h2 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0A0A0F', fontWeight: 400, margin: '0 0 6px 0', lineHeight: 1.1 }}>
            {section.heading}
          </h2>
          <p style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 13, color: '#5A4A7A', margin: 0 }}>
            {section.desc}
          </p>
        </div>
        <Link href="/browse" style={{ fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace', fontSize: 12, color: '#7C6A9E', textDecoration: 'none', flexShrink: 0, marginLeft: 24 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.textDecoration = 'underline')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.textDecoration = 'none')}
        >
          See all →
        </Link>
      </div>
      <div className="scrollbar-none" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 16 }}>
        {section.cards.map((card, i) => (
          <AgentCard key={`${section.id}-${i}`} card={card}/>
        ))}
      </div>
    </section>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const rootsWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rootsWrapRef.current) {
        rootsWrapRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .hero-tree-wrap { display: none !important; }
          .content-main { margin-left: 0 !important; }
          .cat-sidebar { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* ── Fixed TreeRoots parallax background ─────────────────── */}
      <div
        ref={rootsWrapRef}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, opacity: 0.18 }}
      >
        <TreeRoots/>
      </div>

      {/* ── TOP NAVIGATION ──────────────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 48,
        background: '#2A0A0A',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(180,60,60,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        {/* Wordmark */}
        <Link href="/" style={{
          fontSize: 18,
          fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
          fontStyle: 'italic',
          color: '#E8E0D0',
          textDecoration: 'none',
          fontWeight: 400,
          flexShrink: 0,
          letterSpacing: '0.01em',
        }}>
          23rdGen
        </Link>

        {/* Nav links */}
        <div className="nav-links" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: 13,
                fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                color: '#D4C9A8',
                textDecoration: 'none',
                padding: '5px 10px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                transition: 'color 120ms',
                textUnderlineOffset: '3px',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#E8E0D0'
                el.style.textDecoration = 'underline'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#D4C9A8'
                el.style.textDecoration = 'none'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Link href="/login" style={{
            fontSize: 13,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#D4C9A8',
            textDecoration: 'none',
            padding: '4px 12px',
            letterSpacing: '0.04em',
            transition: 'color 120ms',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8E0D0')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#D4C9A8')}
          >
            Log in
          </Link>

          <Link href="/signup" style={{
            fontSize: 12,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#E8E0D0',
            background: '#8B1A1A',
            textDecoration: 'none',
            padding: '8px 18px',
            border: '2px solid #E8E0D0',
            boxShadow: '2px 2px 0px #E8E0D0',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'inline-block',
            borderRadius: 0,
            transition: 'box-shadow 80ms, transform 80ms',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '3px 3px 0px #E8E0D0'
              el.style.transform = 'translate(-1px,-1px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '2px 2px 0px #E8E0D0'
              el.style.transform = 'translate(0,0)'
            }}
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 48,
        overflow: 'hidden',
        zIndex: 2,
      }}>
        {/* Centered content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 80,
        }}>
          {/* Logo mark */}
          <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1, userSelect: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
              fontSize: 'clamp(64px, 8vw, 96px)',
              color: '#0A0A0F',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}>
              23
            </span>
            <span style={{
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
              fontSize: 'clamp(48px, 6vw, 72px)',
              color: '#7C6A9E',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}>
              rdGen
            </span>
          </div>

          {/* Search bar */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: 'min(680px, 85vw)',
              height: 56,
              padding: '0 16px',
              background: '#F0E6D0',
              border: '2px solid #0A0A0F',
              boxShadow: '4px 4px 0px #0A0A0F',
              borderRadius: 0,
              cursor: 'text',
              marginTop: 32,
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              transition: 'box-shadow 80ms, transform 80ms',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '2px 2px 0px #0A0A0F'
              el.style.transform = 'translate(2px,2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '4px 4px 0px #0A0A0F'
              el.style.transform = 'translate(0,0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C6A9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ flex: 1, textAlign: 'left', fontSize: 15, color: 'rgba(10,10,15,0.38)', letterSpacing: '0.01em' }}>
              Search agents, prompts, skills, workflows...
            </span>
            <kbd style={{
              display: 'flex', alignItems: 'center',
              padding: '4px 8px',
              background: '#E8E0D0',
              border: '2px solid #0A0A0F',
              borderRadius: 0,
              fontSize: 11,
              color: 'rgba(10,10,15,0.45)',
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              flexShrink: 0,
            }}>
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Tree — erupts from right edge */}
        <div className="hero-tree-wrap" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <HeroTree/>
        </div>
      </section>

      {/* ── FIXED CATEGORY SIDEBAR ──────────────────────────────── */}
      <CategorySidebar/>

      {/* ── 5 AGENT SECTIONS ────────────────────────────────────── */}
      <main className="content-main" style={{
        position: 'relative',
        zIndex: 2,
        marginLeft: 220,
      }}>
        {SECTIONS.map(section => (
          <SectionRow key={section.id} section={section}/>
        ))}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <Footer/>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)}/>
    </>
  )
}
