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
  agent:    { bg: '#FFDDD0', text: '#7A2A10', border: '#C4622D' },
  prompt:   { bg: '#EAE0F5', text: '#4A2A7A', border: '#7C6A9E' },
  skill:    { bg: '#D0EDD5', text: '#1E4D28', border: '#6B8F71' },
  workflow: { bg: '#F5E6D0', text: '#6B3A1E', border: '#A0785A' },
  team:     { bg: '#F5D8DC', text: '#6B1E28', border: '#A05060' },
  browser:  { bg: '#D8E0EC', text: '#1E2E50', border: '#5A6A7A' },
}

const MOCK_DETAIL: AgentDetail = {
  id: '1',
  name: 'Code Review Wizard',
  category: 'agent',
  description: 'Deeply analyzes pull requests for bugs, security vulnerabilities, and code quality improvements across any language.',
  long_description: 'This agent performs comprehensive code analysis using static analysis patterns, security scanning heuristics, and best practice validation. It identifies common vulnerabilities (SQL injection, XSS, CSRF), evaluates error handling, checks naming conventions, and suggests targeted improvements with concrete code examples. Works with Python, TypeScript, Go, Rust, and more.',
  content: `You are an expert code reviewer with deep knowledge of security, performance, and best practices across all major programming languages.

When reviewing code:
1. Identify security vulnerabilities (SQL injection, XSS, CSRF, insecure deserialization)
2. Flag performance bottlenecks and inefficiencies
3. Check for proper error handling and edge cases
4. Evaluate readability, maintainability, and naming conventions
5. Suggest specific improvements with code examples

Format your review with clear sections: CRITICAL, WARNINGS, SUGGESTIONS.
Always explain WHY each issue matters and how to fix it.`,
  creator_name: 'devtools_hq',
  deploy_count: 2840,
  rating: 4.8,
  tags: ['code', 'review', 'security', 'best-practices'],
  created_at: '2026-01-15T00:00:00Z',
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
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
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
          .select('id, name, category, description, long_description, content, creator_name, deploy_count, rating, tags, created_at')
          .eq('id', id).single()
        if (error || !data) {
          setAgent(MOCK_DETAIL)
          setDeployCount(MOCK_DETAIL.deploy_count)
        } else {
          const row = data as AgentDetail & { title?: string }
          const normalized: AgentDetail = { ...row, name: row.name ?? row.title ?? 'Untitled', rating: row.rating ?? 0 }
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
    void (supabase as any).from('agents').update({ deploy_count: current + 1 }).eq('id', agentId)
      .then(() => setDeployCount(n => n + 1))
  }

  async function handleCopy() {
    if (!agent) return
    try { await navigator.clipboard.writeText(agent.content) } catch {
      const el = document.createElement('textarea')
      el.value = agent.content
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A' }}>Loading agent…</span>
      </div>
    )
  }

  if (!agent) return null

  const cat = (agent.category in CATEGORY_BADGE ? agent.category : 'agent') as AgentCategory
  const badge = CATEGORY_BADGE[agent.category] ?? CATEGORY_BADGE.agent

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 24px 80px' }}>
      <Link
        href="/browse"
        style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', textDecoration: 'none', display: 'inline-block', marginBottom: 28 }}
        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#0A0A0F')}
        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#8A7A6A')}
      >
        ← Back to Browse
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }} className="lg:flex-row lg:gap-10">
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Avatar circle */}
          <div
            style={{
              width: 72, height: 72,
              background: '#F0E6D0',
              border: '2px solid #0A0A0F',
              boxShadow: '3px 3px 0px #0A0A0F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <PixelAvatar category={cat} size={48} />
          </div>

          {/* Category badge */}
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-ibm-mono), monospace',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '3px 10px',
              background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`,
              marginBottom: 10,
            }}
          >
            {agent.category}
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif',
              fontSize: '2.4rem', color: '#0A0A0F', margin: '0 0 8px', lineHeight: 1.15,
            }}
          >
            {agent.name}
          </h1>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A' }}>
              by {agent.creator_name ?? 'anonymous'}
            </span>
            {agent.rating > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, fontWeight: 600,
                  padding: '2px 8px',
                  background: '#FFF0D0', color: '#8A6A0A', border: '1px solid #B8960C',
                }}
              >
                ★ {agent.rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#2A1A0E', lineHeight: 1.7, marginBottom: 28 }}>
            {agent.description}
          </p>

          {/* What this does */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7C6A9E', marginBottom: 10 }}>
              WHAT THIS DOES
            </div>
            <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#4A3A2A', lineHeight: 1.7, margin: 0 }}>
              {agent.long_description ?? agent.description}
            </p>
          </div>

          {/* Prompt preview */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7C6A9E', marginBottom: 10 }}>
              SYSTEM PROMPT
            </div>
            <div
              style={{
                background: '#E8DCC8',
                border: '2px solid rgba(0,0,0,0.15)',
                padding: '16px 18px',
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 12,
                color: '#2A1A0E',
                lineHeight: 1.75,
                whiteSpace: 'pre-wrap',
                maxHeight: 280,
                overflowY: 'auto',
              }}
              className="scrollbar-none"
            >
              {agent.content}
            </div>
          </div>

          {/* Tags */}
          {agent.tags && agent.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {agent.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11,
                    padding: '3px 10px',
                    background: '#E8DCC8', color: '#6A5A4A', border: '1px solid rgba(0,0,0,0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sticky action panel */}
        <div style={{ width: '100%', maxWidth: 280, flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: 72 }}>
            <div
              style={{
                background: '#F0E6D0',
                border: '2px solid #0A0A0F',
                boxShadow: '4px 4px 0px #0A0A0F',
                padding: 20,
              }}
            >
              {/* Deploy count */}
              <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 20, borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 32, fontWeight: 700, color: '#C4622D' }}>
                  {deployCount.toLocaleString()}
                </div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A7A6A', marginTop: 2 }}>
                  deployments
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <PixelActionBtn
                  onClick={handleCopy}
                  label={copied ? '✓ Copied!' : 'Copy to Clipboard'}
                  bg={copied ? '#6B8F71' : '#0A0A0F'}
                  color="#E8E0D0"
                  border={`2px solid ${copied ? '#6B8F71' : '#0A0A0F'}`}
                  shadow={`3px 3px 0px ${copied ? '#2A5A2A' : 'rgba(10,10,15,0.3)'}`}
                />
                <PixelActionBtn
                  onClick={() => handleOpenPlatform(`https://claude.ai/new?q=${encodeURIComponent(agent.content)}`)}
                  label="Open in Claude"
                  bg="#7C6A9E"
                  color="#E8E0D0"
                  border="2px solid #0A0A0F"
                  shadow="3px 3px 0px rgba(10,10,15,0.3)"
                />
                <PixelActionBtn
                  onClick={() => handleOpenPlatform(`https://chat.openai.com/?q=${encodeURIComponent(agent.content)}`)}
                  label="Open in ChatGPT"
                  bg="#2A6A3A"
                  color="#E8E0D0"
                  border="2px solid #0A0A0F"
                  shadow="3px 3px 0px rgba(10,10,15,0.3)"
                />
                <PixelActionBtn
                  onClick={() => handleOpenPlatform(`https://gemini.google.com/app?q=${encodeURIComponent(agent.content)}`)}
                  label="Open in Gemini"
                  bg="#C4622D"
                  color="#E8E0D0"
                  border="2px solid #0A0A0F"
                  shadow="3px 3px 0px rgba(10,10,15,0.3)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
