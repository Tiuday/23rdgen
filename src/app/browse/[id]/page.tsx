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
  created_at: string
}

const CATEGORY_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  agent:    { bg: 'rgba(212,82,30,0.12)',   text: '#D4521E', border: 'rgba(212,82,30,0.25)' },
  prompt:   { bg: 'rgba(124,107,158,0.15)', text: '#A594C4', border: 'rgba(124,107,158,0.3)' },
  skill:    { bg: 'rgba(107,143,113,0.15)', text: '#6B8F71', border: 'rgba(107,143,113,0.3)' },
  workflow: { bg: 'rgba(196,120,90,0.12)',  text: '#C4785A', border: 'rgba(196,120,90,0.25)' },
  team:     { bg: 'rgba(176,96,112,0.12)',  text: '#B06070', border: 'rgba(176,96,112,0.25)' },
  browser:  { bg: 'rgba(90,106,122,0.12)',  text: '#5A6A7A', border: 'rgba(90,106,122,0.25)' },
}

const MOCK_DETAIL: AgentDetail = {
  id: '1',
  name: 'Code Review Wizard',
  category: 'agent',
  description: 'Deeply analyzes pull requests for bugs, security vulnerabilities, and code quality improvements across any language.',
  long_description:
    'This agent performs comprehensive code analysis using static analysis patterns, security scanning heuristics, and best practice validation. It identifies common vulnerabilities (SQL injection, XSS, CSRF), evaluates error handling, checks naming conventions, and suggests targeted improvements with concrete code examples. Works with Python, TypeScript, Go, Rust, and more.',
  content:
    'You are an expert code reviewer with deep knowledge of security, performance, and best practices across all major programming languages.\n\nWhen reviewing code:\n1. Identify security vulnerabilities (SQL injection, XSS, CSRF, insecure deserialization)\n2. Flag performance bottlenecks and inefficiencies\n3. Check for proper error handling and edge cases\n4. Evaluate readability, maintainability, and naming conventions\n5. Suggest specific improvements with code examples\n\nFormat your review with clear sections: CRITICAL, WARNINGS, SUGGESTIONS.\nAlways explain WHY each issue matters and how to fix it.',
  creator_name: 'devtools_hq',
  deploy_count: 2840,
  rating: 4.8,
  tags: ['code', 'review', 'security', 'best-practices'],
  created_at: '2026-01-15T00:00:00Z',
}

export default function AgentDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [agent, setAgent] = useState<AgentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [deployCount, setDeployCount] = useState(0)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('agents')
          .select(
            'id, name, category, description, long_description, content, creator_name, deploy_count, rating, tags, created_at'
          )
          .eq('id', id)
          .single()

        if (error || !data) {
          setAgent(MOCK_DETAIL)
          setDeployCount(MOCK_DETAIL.deploy_count)
        } else {
          const row = data as AgentDetail & { title?: string }
          const normalized: AgentDetail = {
            ...row,
            name: row.name ?? row.title ?? 'Untitled',
            rating: row.rating ?? 0,
          }
          setAgent(normalized)
          setDeployCount(normalized.deploy_count)
        }
      } catch {
        setAgent(MOCK_DETAIL)
        setDeployCount(MOCK_DETAIL.deploy_count)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  function fireDeployIncrement(agentId: string, current: number) {
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    void (supabase as any)
      .from('agents')
      .update({ deploy_count: current + 1 })
      .eq('id', agentId)
      .then(() => setDeployCount(n => n + 1))
  }

  async function handleCopy() {
    if (!agent) return
    try {
      await navigator.clipboard.writeText(agent.content)
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea')
      el.value = agent.content
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    fireDeployIncrement(agent.id, deployCount)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleOpenPlatform(url: string) {
    if (!agent) return
    fireDeployIncrement(agent.id, deployCount)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-[rgba(232,224,208,0.35)] animate-pulse">Loading agent…</span>
      </div>
    )
  }

  if (!agent) return null

  const cat = (agent.category in CATEGORY_BADGE ? agent.category : 'agent') as AgentCategory
  const badge = CATEGORY_BADGE[agent.category] ?? CATEGORY_BADGE.agent

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/browse"
        className="inline-flex items-center gap-1.5 text-xs transition-colors mb-8"
        style={{ color: 'rgba(232,224,208,0.4)' }}
        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,224,208,0.7)')}
        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,224,208,0.4)')}
      >
        ← Back to Browse
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Left: main content ─────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'rgba(124,106,158,0.1)',
              boxShadow: '0 0 32px rgba(124,106,158,0.22)',
              border: '1px solid rgba(124,106,158,0.25)',
            }}
          >
            <PixelAvatar category={cat} size={52} />
          </div>

          {/* Name */}
          <h1
            className="font-bold text-[#E8E0D0] leading-tight mb-3"
            style={{ fontSize: '2.5rem' }}
          >
            {agent.name}
          </h1>

          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className="text-xs px-2.5 py-1 rounded-full border font-medium capitalize"
              style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}
            >
              {agent.category}
            </span>
            {agent.rating > 0 && (
              <span
                className="text-xs px-2.5 py-1 rounded-full border font-medium"
                style={{
                  background: 'rgba(196,98,45,0.1)',
                  color: '#C4622D',
                  borderColor: 'rgba(196,98,45,0.22)',
                }}
              >
                ★ {agent.rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Creator */}
          <p className="text-sm mb-6" style={{ color: 'rgba(232,224,208,0.4)' }}>
            by {agent.creator_name ?? 'anonymous'}
          </p>

          {/* Description */}
          <p
            className="leading-relaxed mb-8"
            style={{ color: 'rgba(232,224,208,0.75)', fontSize: '0.95rem' }}
          >
            {agent.description}
          </p>

          {/* What this does */}
          <div className="mb-8">
            <h2
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: 'rgba(232,224,208,0.4)' }}
            >
              What this does
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,224,208,0.68)' }}>
              {agent.long_description ?? agent.description}
            </p>
          </div>

          {/* Tags */}
          {agent.tags && agent.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {agent.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(160,120,90,0.1)',
                    color: '#A0785A',
                    border: '1px solid rgba(160,120,90,0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: sticky action panel ─────────────────────── */}
        <div className="lg:w-72 shrink-0">
          <div className="sticky top-24">
            <div
              className="rounded-[16px] p-5 border"
              style={{ background: '#12121A', borderColor: 'rgba(124,106,158,0.2)' }}
            >
              {/* Deploy count */}
              <div
                className="text-center mb-5 pb-5 border-b"
                style={{ borderColor: 'rgba(124,106,158,0.1)' }}
              >
                <div className="text-3xl font-bold" style={{ color: '#C4622D' }}>
                  {deployCount.toLocaleString()}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(232,224,208,0.4)' }}>
                  deployments
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2.5">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: copied ? '#6B8F71' : '#7C6A9E',
                    color: '#E8E0D0',
                  }}
                >
                  {copied ? 'Copied ✓' : 'Copy to Clipboard'}
                </button>

                {/* Open in Claude */}
                <button
                  onClick={() =>
                    handleOpenPlatform(
                      `https://claude.ai/new?q=${encodeURIComponent(agent.content)}`
                    )
                  }
                  className="w-full py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: '#0E0E16',
                    color: '#A594C4',
                    border: '1px solid rgba(124,106,158,0.35)',
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,106,158,0.6)')
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,106,158,0.35)')
                  }
                >
                  Open in Claude
                </button>

                {/* Open in Gemini */}
                <button
                  onClick={() =>
                    handleOpenPlatform(
                      `https://gemini.google.com/app?q=${encodeURIComponent(agent.content)}`
                    )
                  }
                  className="w-full py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: '#0E0E16',
                    color: '#A594C4',
                    border: '1px solid rgba(124,106,158,0.35)',
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,106,158,0.6)')
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,106,158,0.35)')
                  }
                >
                  Open in Gemini
                </button>

                {/* Open in ChatGPT */}
                <button
                  onClick={() =>
                    handleOpenPlatform(
                      `https://chatgpt.com/?q=${encodeURIComponent(agent.content)}`
                    )
                  }
                  className="w-full py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: '#0E0E16',
                    color: '#A594C4',
                    border: '1px solid rgba(124,106,158,0.35)',
                  }}
                  onMouseEnter={e =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,106,158,0.6)')
                  }
                  onMouseLeave={e =>
                    ((e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,106,158,0.35)')
                  }
                >
                  Open in ChatGPT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
