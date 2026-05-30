'use client'
import { useState } from 'react'
import TreeRoots from '@/components/TreeRoots'

// ── Pixel Characters (10×12 viewBox → 80×96px each) ─────────
function WizardChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      {/* Hat tip */}
      <rect x="4" y="0" width="2" height="1" fill="#7C6B9E"/>
      {/* Hat body */}
      <rect x="3" y="1" width="4" height="1" fill="#7C6B9E"/>
      <rect x="2" y="2" width="6" height="1" fill="#7C6B9E"/>
      {/* Star on hat */}
      <rect x="4" y="2" width="2" height="1" fill="#F5D76E"/>
      {/* Brim */}
      <rect x="0" y="3" width="10" height="1" fill="#5A4A7E"/>
      {/* Face */}
      <rect x="2" y="4" width="6" height="4" fill="#F0D4B0"/>
      {/* Eyes */}
      <rect x="3" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="6" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="3" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="6" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      {/* Mouth */}
      <rect x="4" y="7" width="2" height="1" fill="#8B4020"/>
      {/* Beard fluff */}
      <rect x="2" y="7" width="6" height="1" fill="#E0D8C8"/>
      {/* Robe shoulders */}
      <rect x="1" y="8" width="8" height="1" fill="#7C6B9E"/>
      {/* Robe body */}
      <rect x="0" y="9" width="10" height="1" fill="#6B5A8E"/>
      <rect x="0" y="10" width="10" height="1" fill="#6B5A8E"/>
      {/* Gold belt */}
      <rect x="3" y="10" width="4" height="1" fill="#F5D76E"/>
      {/* Boots */}
      <rect x="1" y="11" width="2" height="1" fill="#2A1E3E"/>
      <rect x="7" y="11" width="2" height="1" fill="#2A1E3E"/>
    </svg>
  )
}

function ScribeChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      {/* Cap */}
      <rect x="2" y="0" width="6" height="1" fill="#3A4560"/>
      <rect x="1" y="1" width="8" height="1" fill="#3A4560"/>
      <rect x="1" y="2" width="8" height="1" fill="#4A5570"/>
      {/* Face */}
      <rect x="2" y="3" width="6" height="4" fill="#F0D4B0"/>
      {/* Spectacle frames */}
      <rect x="2" y="4" width="2" height="2" fill="none" stroke="#8B7030" strokeWidth="0.2"/>
      <rect x="6" y="4" width="2" height="2" fill="none" stroke="#8B7030" strokeWidth="0.2"/>
      <rect x="4" y="5" width="2" height="1" fill="#8B7030" opacity="0.6"/>
      {/* Eyes behind glasses */}
      <rect x="3" y="5" width="1" height="1" fill="#0A0A0F" opacity="0.7"/>
      <rect x="6" y="5" width="1" height="1" fill="#0A0A0F" opacity="0.7"/>
      {/* Mouth */}
      <rect x="4" y="6" width="2" height="1" fill="#8B4020" opacity="0.8"/>
      {/* Robe body */}
      <rect x="1" y="7" width="8" height="4" fill="#7BB8D0"/>
      {/* Scroll in hands */}
      <rect x="1" y="7" width="3" height="4" fill="#F0E6D0"/>
      <rect x="1" y="7" width="3" height="1" fill="#D4C9A8"/>
      <rect x="1" y="10" width="3" height="1" fill="#D4C9A8"/>
      {/* Text on scroll */}
      <rect x="2" y="8" width="1" height="1" fill="#0A0A0F" opacity="0.25"/>
      <rect x="2" y="9" width="1" height="1" fill="#0A0A0F" opacity="0.25"/>
      {/* Quill tip */}
      <rect x="5" y="6" width="1" height="5" fill="#E8E0D0"/>
      <rect x="4" y="6" width="1" height="2" fill="#F5F0E8" opacity="0.8"/>
      <rect x="6" y="6" width="1" height="2" fill="#F5F0E8" opacity="0.8"/>
      {/* Feet */}
      <rect x="3" y="11" width="2" height="1" fill="#2A1E3E"/>
      <rect x="6" y="11" width="2" height="1" fill="#2A1E3E"/>
    </svg>
  )
}

function CraftspersonChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      {/* Hardhat */}
      <rect x="1" y="0" width="8" height="2" fill="#3A5A30"/>
      <rect x="0" y="2" width="10" height="1" fill="#2A4A20"/>
      {/* Visor stripe */}
      <rect x="2" y="2" width="6" height="1" fill="#4A7A40"/>
      {/* Face */}
      <rect x="2" y="3" width="6" height="4" fill="#F0D4B0"/>
      {/* Eyes */}
      <rect x="3" y="4" width="1" height="2" fill="#0A0A0F"/>
      <rect x="6" y="4" width="1" height="2" fill="#0A0A0F"/>
      <rect x="3" y="4" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="6" y="4" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      {/* Mouth */}
      <rect x="4" y="6" width="2" height="1" fill="#8B4020"/>
      {/* Coveralls body */}
      <rect x="0" y="7" width="10" height="4" fill="#4A7A40"/>
      {/* Apron bib */}
      <rect x="2" y="7" width="6" height="3" fill="#B5EAD7"/>
      {/* Pocket */}
      <rect x="3" y="8" width="2" height="1" fill="#3A6B45"/>
      {/* Wrench side */}
      <rect x="8" y="5" width="1" height="4" fill="#8B8070"/>
      <rect x="7" y="5" width="2" height="1" fill="#8B8070"/>
      <rect x="7" y="8" width="2" height="1" fill="#8B8070"/>
      {/* Boots */}
      <rect x="1" y="11" width="3" height="1" fill="#2A1E3E"/>
      <rect x="6" y="11" width="3" height="1" fill="#2A1E3E"/>
    </svg>
  )
}

function ConductorChar() {
  return (
    <svg width="80" height="96" viewBox="0 0 10 12" fill="none" style={{ imageRendering: 'pixelated', display: 'block' }}>
      {/* Top hat */}
      <rect x="2" y="0" width="6" height="3" fill="#1A1020"/>
      {/* Hat brim */}
      <rect x="0" y="3" width="10" height="1" fill="#0A0A0F"/>
      {/* Face */}
      <rect x="2" y="4" width="6" height="4" fill="#F0D4B0"/>
      {/* Eyes */}
      <rect x="3" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="6" y="5" width="1" height="2" fill="#0A0A0F"/>
      <rect x="3" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      <rect x="6" y="5" width="1" height="1" fill="rgba(255,255,255,0.55)"/>
      {/* Mustache */}
      <rect x="3" y="7" width="4" height="1" fill="#5A3018"/>
      {/* Tuxedo body */}
      <rect x="1" y="8" width="8" height="3" fill="#9B88E8"/>
      {/* White shirt */}
      <rect x="3" y="8" width="4" height="2" fill="#E8E0D0"/>
      {/* Bow tie */}
      <rect x="4" y="8" width="2" height="1" fill="#0A0A0F"/>
      {/* Baton (raised right) */}
      <rect x="9" y="2" width="1" height="7" fill="#0A0A0F"/>
      <rect x="9" y="2" width="1" height="1" fill="#F5D76E"/>
      {/* Left hand/arm */}
      <rect x="0" y="8" width="1" height="2" fill="#F0D4B0"/>
      {/* Legs */}
      <rect x="2" y="11" width="2" height="1" fill="#0A0A0F"/>
      <rect x="6" y="11" width="2" height="1" fill="#0A0A0F"/>
    </svg>
  )
}

// ── Card Type → Character map ─────────────────────────────────
type CardType = 'AGENT' | 'PROMPT' | 'SKILL' | 'WORKFLOW'

function CardChar({ type }: { type: CardType }) {
  switch (type) {
    case 'AGENT':    return <WizardChar />
    case 'PROMPT':   return <ScribeChar />
    case 'SKILL':    return <CraftspersonChar />
    case 'WORKFLOW': return <ConductorChar />
  }
}

// ── Bookmark icon ─────────────────────────────────────────────
function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? '#0A0A0F' : 'none'}
      stroke="#0A0A0F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// ── Seed data ─────────────────────────────────────────────────
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
  {
    id: 1,
    color: '#F5D76E',
    name: 'SEO Content Machine',
    type: 'AGENT',
    desc: 'Generates SEO-optimized blog posts, meta tags and keyword clusters automatically.',
    deployed: '3.4k',
    rating: '4.9',
    creator: '@builderx',
  },
  {
    id: 2,
    color: '#A8D8EA',
    name: 'Cold Email Writer',
    type: 'PROMPT',
    desc: 'Writes hyper-personalized cold emails that actually get replies. Plug in any niche.',
    deployed: '2.1k',
    rating: '4.7',
    creator: '@growthlab',
  },
  {
    id: 3,
    color: '#E8A0BF',
    name: 'Code Review Agent',
    type: 'AGENT',
    desc: 'Reviews pull requests with full codebase context. Catches bugs before they ship.',
    deployed: '5.6k',
    rating: '4.9',
    creator: '@devforge',
  },
  {
    id: 4,
    color: '#B5EAD7',
    name: 'Research Summarizer',
    type: 'SKILL',
    desc: 'Reads any PDF, URL or paper and returns a crisp executive summary in 30 seconds.',
    deployed: '1.8k',
    rating: '4.6',
    creator: '@paperbot',
  },
  {
    id: 5,
    color: '#FFB347',
    name: 'Social Media Scheduler',
    type: 'WORKFLOW',
    desc: 'End-to-end workflow: generate, review and schedule posts across all platforms.',
    deployed: '2.9k',
    rating: '4.8',
    creator: '@socialstk',
  },
  {
    id: 6,
    color: '#C9B1FF',
    name: 'Customer Support GPT',
    type: 'AGENT',
    desc: 'Trains on your docs and handles Tier 1 support tickets with zero hallucination.',
    deployed: '4.1k',
    rating: '4.9',
    creator: '@helpdesk',
  },
]

// ── Individual card ───────────────────────────────────────────
function AgentCard({ card }: { card: SeedCard }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [deployHovered, setDeployHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '2px solid #0A0A0F',
        borderRadius: 0,
        boxShadow: hovered ? '9px 9px 0px #0A0A0F' : '5px 5px 0px #0A0A0F',
        background: card.color,
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transform: hovered ? 'translate(-4px, -4px) scale(1.02)' : 'translate(0, 0) scale(1)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))',
        zIndex: 2,
      }}
    >
      {/* ── Card Header ── */}
      <div
        style={{
          width: '100%',
          height: 160,
          background: card.color,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Category pill — top left */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(255,255,255,0.62)',
            border: '1.5px solid #0A0A0F',
            borderRadius: 0,
            padding: '3px 8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              background: '#0A0A0F',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0A0A0F',
              lineHeight: 1,
            }}
          >
            {card.type}
          </span>
        </div>

        {/* Bookmark button — top right */}
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
          title="Save"
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BookmarkIcon filled={saved} />
        </button>

        {/* Pixel character — centered */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
          }}
        >
          <CardChar type={card.type} />
        </div>
      </div>

      {/* ── Card Body ── */}
      <div
        style={{
          background: '#FFF8F0',
          borderTop: '2px solid #0A0A0F',
          padding: 16,
        }}
      >
        {/* Agent name */}
        <h3
          style={{
            fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            fontSize: 18,
            color: '#0A0A0F',
            fontWeight: 600,
            margin: '0 0 6px 0',
            lineHeight: 1.2,
          }}
        >
          {card.name}
        </h3>

        {/* Description — 2 lines max */}
        <p
          style={{
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 12,
            color: '#2A1A0E',
            lineHeight: 1.6,
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            textOverflow: 'ellipsis',
          }}
        >
          {card.desc}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 12,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 11,
              color: '#7C6A9E',
            }}
          >
            ⚡ {card.deployed} deployed
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 11,
              color: '#B8960C',
            }}
          >
            ★ {card.rating}
          </span>
        </div>

        {/* Action row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 10,
              color: '#5A6A7A',
            }}
          >
            by {card.creator}
          </span>

          <button
            onMouseEnter={() => setDeployHovered(true)}
            onMouseLeave={() => setDeployHovered(false)}
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#E8E0D0',
              background: '#0A0A0F',
              border: '2px solid #0A0A0F',
              boxShadow: deployHovered ? '3px 3px 0px #7C6A9E' : '2px 2px 0px #7C6A9E',
              padding: '6px 14px',
              borderRadius: 0,
              cursor: 'pointer',
              transform: deployHovered ? 'translate(-1px, -1px)' : 'translate(0, 0)',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            }}
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Browse All button ─────────────────────────────────────────
function BrowseAllButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#0A0A0F',
        background: 'transparent',
        border: '2px solid #0A0A0F',
        boxShadow: hovered ? '5px 5px 0px #0A0A0F' : '3px 3px 0px #0A0A0F',
        padding: '10px 28px',
        borderRadius: 0,
        cursor: 'pointer',
        transform: hovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        marginTop: 16,
        display: 'inline-block',
      }}
    >
      Browse All Agents →
    </button>
  )
}

// ── Section ───────────────────────────────────────────────────
export default function AgentCardsSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'visible',
        background: 'transparent',
      }}
    >
      {/* TreeRoots at z-index 0 — bleeds behind all cards */}
      <TreeRoots />

      {/* Content at z-index 2 — sits above root layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '80px 6vw 100px',
        }}
      >
        {/* ── Section heading ── */}
        <div style={{ marginBottom: 48 }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#7C6A9E',
              margin: '0 0 14px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                background: '#7C6A9E',
                flexShrink: 0,
              }}
            />
            Featured Agents
          </p>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#0A0A0F',
              fontWeight: 400,
              lineHeight: 1.1,
              margin: '0 0 14px 0',
              letterSpacing: 0,
            }}
          >
            Deploy Intelligence.
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 14,
              color: '#2A1A0E',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Browse, copy and deploy the most powerful AI agents — built by the community.
          </p>
        </div>

        {/* ── Card grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {SEED_CARDS.map((card) => (
            <AgentCard key={card.id} card={card} />
          ))}
        </div>

        {/* ── Section footer ── */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 56,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 13,
              color: '#7C6A9E',
              margin: 0,
            }}
          >
            Showing 6 of 2,400+ agents
          </p>
          <BrowseAllButton />
        </div>
      </div>
    </section>
  )
}
