'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import PixelAvatar from '@/components/mascot/PixelAvatar'
import type { AgentCategory } from '@/types/agent'

interface AgentDetail {
  id: string
  name: string
  type: string
  category: string | null
  description: string | null
  prompt: string | null
  code: string | null
  deployed_count: number
  rating: number
  created_at: string
  creator: { username: string | null; display_name: string } | null
}

const TYPE_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  agent:    { bg: '#FFDDD0', text: '#7A2A10', border: '#C4622D' },
  prompt:   { bg: '#EAE0F5', text: '#4A2A7A', border: '#7C6A9E' },
  skill:    { bg: '#D0EDD5', text: '#1E4D28', border: '#6B8F71' },
  workflow: { bg: '#F5E6D0', text: '#6B3A1E', border: '#A0785A' },
  team:     { bg: '#F5D8DC', text: '#6B1E28', border: '#A05060' },
}

function PixelActionBtn({
  onClick, label, bg, color, border, shadow, disabled,
}: {
  onClick: () => void; label: string; bg: string; color: string; border: string; shadow: string; disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: 'var(--font-ibm-mono), monospace',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        background: disabled ? 'rgba(10,10,15,0.3)' : bg, color, border, boxShadow: disabled ? 'none' : shadow,
        borderRadius: 0, padding: '9px 0', width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 60ms ease, box-shadow 60ms ease',
      }}
      onMouseEnter={e => {
        if (disabled) return
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = 'translate(2px,2px)'
        el.style.boxShadow = shadow.replace(/\d+px \d+px/, '1px 1px')
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.transform = ''
        el.style.boxShadow = disabled ? 'none' : shadow
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
  const [deploying, setDeploying] = useState(false)

  const [msgBody, setMsgBody] = useState('')
  const [msgStatus, setMsgStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [msgError, setMsgError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/agents/${id}`)
        const data = await res.json()
        if (!res.ok || !data?.id) {
          setLoading(false)
          return
        }
        setAgent(data as AgentDetail)
        setDeployCount(data.deployed_count ?? 0)
      } catch {
        // leave agent null
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleDeploy() {
    if (!agent || deploying) return
    setDeploying(true)
    try {
      const res = await fetch(`/api/agents/${agent.id}/deploy`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setDeployCount(data.deployed_count ?? deployCount + 1)
      } else {
        setDeployCount(n => n + 1)
      }
    } catch {
      setDeployCount(n => n + 1)
    } finally {
      setDeploying(false)
    }
  }

  async function handleCopy() {
    if (!agent) return
    const text = agent.prompt ?? agent.code ?? ''
    try { await navigator.clipboard.writeText(text) } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!msgBody.trim() || !agent) return
    setMsgStatus('sending')
    setMsgError('')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: agent.id, body: msgBody.trim() }),
      })
      if (res.ok) {
        setMsgStatus('sent')
        setMsgBody('')
      } else {
        const d = await res.json()
        setMsgError(d.error ?? 'Failed to send message.')
        setMsgStatus('error')
      }
    } catch {
      setMsgError('Failed to send message.')
      setMsgStatus('error')
    }
  }

  function handleOpenPlatform(url: string) {
    void handleDeploy()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A' }}>Loading agent…</span>
      </div>
    )
  }

  if (!agent) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#8A7A6A' }}>Agent not found.</span>
      <Link href="/browse" style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#7C6A9E' }}>← Back to Browse</Link>
    </div>
  )

  const agentType = (agent.type in TYPE_BADGE ? agent.type : 'agent') as AgentCategory
  const badge = TYPE_BADGE[agent.type] ?? TYPE_BADGE.agent
  const promptText = agent.prompt ?? agent.code ?? ''
  const creatorName = agent.creator?.display_name ?? agent.creator?.username ?? 'anonymous'

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
            <PixelAvatar category={agentType} size={48} />
          </div>

          {/* Type badge */}
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
            {agent.type}
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
              by {creatorName}
            </span>
            {agent.rating > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, fontWeight: 600,
                  padding: '2px 8px',
                  background: '#FFF0D0', color: '#8A6A0A', border: '1px solid #B8960C',
                }}
              >
                ★ {Number(agent.rating).toFixed(1)}
              </span>
            )}
            {agent.category && (
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#8A7A6A' }}>
                {agent.category}
              </span>
            )}
          </div>

          {/* Description */}
          {agent.description && (
            <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#2A1A0E', lineHeight: 1.7, marginBottom: 28 }}>
              {agent.description}
            </p>
          )}

          {/* System prompt / code */}
          {promptText && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7C6A9E', marginBottom: 10 }}>
                {agent.prompt ? 'SYSTEM PROMPT' : 'CODE'}
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
                {promptText}
              </div>
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
                  onClick={handleDeploy}
                  label={deploying ? 'Deploying…' : 'Deploy →'}
                  bg="#C4622D"
                  color="#E8E0D0"
                  border="2px solid #0A0A0F"
                  shadow="3px 3px 0px rgba(10,10,15,0.3)"
                  disabled={deploying}
                />
                <PixelActionBtn
                  onClick={handleCopy}
                  label={copied ? '✓ Copied!' : 'Copy Prompt'}
                  bg={copied ? '#6B8F71' : '#0A0A0F'}
                  color="#E8E0D0"
                  border={`2px solid ${copied ? '#6B8F71' : '#0A0A0F'}`}
                  shadow={`3px 3px 0px ${copied ? '#2A5A2A' : 'rgba(10,10,15,0.3)'}`}
                />
                <PixelActionBtn
                  onClick={() => handleOpenPlatform(`https://claude.ai/new?q=${encodeURIComponent(promptText)}`)}
                  label="Open in Claude"
                  bg="#7C6A9E"
                  color="#E8E0D0"
                  border="2px solid #0A0A0F"
                  shadow="3px 3px 0px rgba(10,10,15,0.3)"
                />
                <PixelActionBtn
                  onClick={() => handleOpenPlatform(`https://chat.openai.com/?q=${encodeURIComponent(promptText)}`)}
                  label="Open in ChatGPT"
                  bg="#2A6A3A"
                  color="#E8E0D0"
                  border="2px solid #0A0A0F"
                  shadow="3px 3px 0px rgba(10,10,15,0.3)"
                />
              </div>

              {/* Message the author */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '2px solid rgba(0,0,0,0.1)' }}>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C6A9E', marginBottom: 10 }}>
                  Message Author
                </div>
                {msgStatus === 'sent' ? (
                  <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#6B8F71' }}>
                    Message sent!
                  </p>
                ) : (
                  <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <textarea
                      value={msgBody}
                      onChange={e => setMsgBody(e.target.value)}
                      placeholder="Write a message to the creator…"
                      rows={3}
                      style={{
                        fontFamily: 'var(--font-ibm-mono), monospace',
                        fontSize: 11,
                        padding: '8px 10px',
                        border: '2px solid rgba(0,0,0,0.2)',
                        background: '#E8DCC8',
                        color: '#0A0A0F',
                        resize: 'none',
                        outline: 'none',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    />
                    {msgStatus === 'error' && (
                      <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#C4622D', margin: 0 }}>
                        {msgError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={msgStatus === 'sending' || !msgBody.trim()}
                      style={{
                        fontFamily: 'var(--font-ibm-mono), monospace',
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        background: 'transparent', color: '#0A0A0F',
                        border: '2px solid #0A0A0F',
                        boxShadow: '2px 2px 0 #0A0A0F',
                        padding: '7px 0', cursor: 'pointer', width: '100%',
                        opacity: (msgStatus === 'sending' || !msgBody.trim()) ? 0.5 : 1,
                        transition: 'transform 60ms ease, box-shadow 60ms ease',
                      }}
                      onMouseEnter={e => {
                        if (msgStatus === 'sending') return
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.transform = 'translate(1px,1px)'
                        el.style.boxShadow = '1px 1px 0 #0A0A0F'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.transform = ''
                        el.style.boxShadow = '2px 2px 0 #0A0A0F'
                      }}
                    >
                      {msgStatus === 'sending' ? 'Sending…' : 'Send →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
