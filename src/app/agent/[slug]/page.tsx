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
  agent:    { bg: 'rgba(212,82,30,0.12)',   text: '#D4521E', border: 'rgba(212,82,30,0.25)' },
  prompt:   { bg: 'rgba(124,107,158,0.15)', text: '#A594C4', border: 'rgba(124,107,158,0.3)' },
  skill:    { bg: 'rgba(107,143,113,0.15)', text: '#6B8F71', border: 'rgba(107,143,113,0.3)' },
  workflow: { bg: 'rgba(196,120,90,0.12)',  text: '#C4785A', border: 'rgba(196,120,90,0.25)' },
  team:     { bg: 'rgba(176,96,112,0.12)',  text: '#B06070', border: 'rgba(176,96,112,0.25)' },
  browser:  { bg: 'rgba(90,106,122,0.12)',  text: '#5A6A7A', border: 'rgba(90,106,122,0.25)' },
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
          .eq('slug', slug)
          .single()
        if (!error && data) setAgent(data as AgentDetail)
      } catch {
        // no-op — show not found
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
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-[rgba(232,224,208,0.35)] animate-pulse">Loading…</span>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[rgba(232,224,208,0.55)]">Agent not found.</p>
        <Link href="/browse" className="text-[#A594C4] text-sm hover:underline">← Back to Browse</Link>
      </div>
    )
  }

  const cat = (agent.category in CATEGORY_BADGE ? agent.category : 'agent') as AgentCategory
  const badge = CATEGORY_BADGE[agent.category] ?? CATEGORY_BADGE.agent

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link href="/browse" className="inline-flex items-center gap-1.5 text-xs mb-8 transition-colors" style={{ color: 'rgba(232,224,208,0.4)' }}>
        ← Back to Browse
      </Link>

      <div className="flex items-start gap-5 mb-6">
        <PixelAvatar category={cat} size={64} />
        <div>
          <span className="inline-block text-xs px-2.5 py-1 rounded-full border font-medium capitalize mb-2"
            style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}>
            {agent.category}
          </span>
          <h1 className="text-3xl font-bold text-[#E8E0D0]">{agent.name}</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(232,224,208,0.4)' }}>
            by {agent.creator_name ?? 'anonymous'} · {agent.deploy_count.toLocaleString()} deploys
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(232,224,208,0.7)' }}>
        {agent.long_description ?? agent.description}
      </p>

      {agent.tags && agent.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {agent.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(160,120,90,0.1)', color: '#A0785A', border: '1px solid rgba(160,120,90,0.2)' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={handleCopy}
        className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
        style={{ background: copied ? '#6B8F71' : '#7C6A9E', color: '#E8E0D0' }}
      >
        {copied ? 'Copied ✓' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}
