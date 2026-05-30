'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import PixelAvatar from '@/components/mascot/PixelAvatar'
import type { AgentCategory } from '@/types/agent'

interface AgentDetail {
  id: string
  name: string
  category: string
  description: string
  long_description: string | null
  content: string
  creator_name: string | null
  deploy_count: number
  rating: number
  tags: string[] | null
}

const CATEGORY_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  agent:    { bg: '#FFDDD0', text: '#7A2A10', border: '#C4622D' },
  prompt:   { bg: '#EAE0F5', text: '#4A2A7A', border: '#7C6A9E' },
  skill:    { bg: '#D0EDD5', text: '#1E4D28', border: '#6B8F71' },
  workflow: { bg: '#F5E6D0', text: '#6B3A1E', border: '#A0785A' },
  team:     { bg: '#F5D8DC', text: '#6B1E28', border: '#A05060' },
  browser:  { bg: '#D8E0EC', text: '#1E2E50', border: '#5A6A7A' },
}

function PixelActionBtn({
  onClick, label, bg, color, border, shadow,
}: {
  onClick: () => void; label: string; bg: string; color: string; border: string; shadow: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-ibm-mono), monospace',
        fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
        background: bg, color, border, boxShadow: shadow,
        borderRadius: 0, padding: '9px 0', width: '100%',
        cursor: 'pointer', transition: 'transform 60ms ease, box-shadow 60ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = 'translate(2px,2px)'
        el.style.boxShadow = shadow.replace(/\d+px \d+px/, '1px 1px')
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = ''
        el.style.boxShadow = shadow
      }}
    >
      {label}
    </button>
  )
}

export default function AgentSlugPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [agent, setAgent] = useState<AgentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('agents')
          .select('id, name, category, description, long_description, content, creator_name, deploy_count, rating, tags')
          .eq('slug', slug).single()
        if (!error && data) setAgent(data as AgentDetail)
      } catch {
        // show not found
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  async function handleCopy() {
    if (!agent) return
    await navigator.clipboard.writeText(agent.content).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A' }}>Loading…</span>
      </div>
    )
  }

  if (!agent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#6A5A4A' }}>Agent not found.</p>
        <Link href="/browse" style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#7C6A9E', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Browse
        </Link>
      </div>
    )
  }

  const cat = (agent.category in CATEGORY_BADGE ? agent.category : 'agent') as AgentCategory
  const badge = CATEGORY_BADGE[agent.category] ?? CATEGORY_BADGE.agent

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 24px 80px' }}>
      <Link
        href="/browse"
        style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', textDecoration: 'none', display: 'inline-block', marginBottom: 28 }}
      >
        ← Back to Browse
      </Link>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PixelAvatar category={cat} size={44} />
        </div>
        <div>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`, marginBottom: 8 }}>
            {agent.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif', fontSize: '2rem', color: '#0A0A0F', margin: '0 0 6px', lineHeight: 1.15 }}>
            {agent.name}
          </h1>
          <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', margin: 0 }}>
            by {agent.creator_name ?? 'anonymous'} · {agent.deploy_count.toLocaleString()} deploys
          </p>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#2A1A0E', lineHeight: 1.7, marginBottom: 24 }}>
        {agent.long_description ?? agent.description}
      </p>

      {/* Prompt */}
      <div
        style={{
          background: '#E8DCC8', border: '2px solid rgba(0,0,0,0.15)',
          padding: '16px 18px', fontFamily: 'var(--font-ibm-mono), monospace',
          fontSize: 12, color: '#2A1A0E', lineHeight: 1.75, whiteSpace: 'pre-wrap',
          maxHeight: 300, overflowY: 'auto', marginBottom: 24,
        }}
        className="scrollbar-none"
      >
        {agent.content}
      </div>

      {agent.tags && agent.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {agent.tags.map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, padding: '3px 10px', background: '#E8DCC8', color: '#6A5A4A', border: '1px solid rgba(0,0,0,0.2)' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <PixelActionBtn onClick={handleCopy} label={copied ? '✓ Copied!' : 'Copy to Clipboard'} bg={copied ? '#6B8F71' : '#0A0A0F'} color="#E8E0D0" border={`2px solid ${copied ? '#6B8F71' : '#0A0A0F'}`} shadow="3px 3px 0px rgba(10,10,15,0.3)" />
        <PixelActionBtn onClick={() => window.open(`https://claude.ai/new?q=${encodeURIComponent(agent.content)}`, '_blank')} label="Open in Claude" bg="#7C6A9E" color="#E8E0D0" border="2px solid #0A0A0F" shadow="3px 3px 0px rgba(10,10,15,0.3)" />
        <PixelActionBtn onClick={() => window.open(`https://chat.openai.com/?q=${encodeURIComponent(agent.content)}`, '_blank')} label="Open in ChatGPT" bg="#2A6A3A" color="#E8E0D0" border="2px solid #0A0A0F" shadow="3px 3px 0px rgba(10,10,15,0.3)" />
        <PixelActionBtn onClick={() => window.open(`https://gemini.google.com/app?q=${encodeURIComponent(agent.content)}`, '_blank')} label="Open in Gemini" bg="#C4622D" color="#E8E0D0" border="2px solid #0A0A0F" shadow="3px 3px 0px rgba(10,10,15,0.3)" />
      </div>
    </div>
  )
}
