'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Agent {
  id: string
  name: string
  category: string
  description: string
  emoji: string
}

interface TeamMember extends Agent {
  role: string
}

interface Message {
  role: 'user' | 'bot'
  text: string
}

const AVAILABLE_AGENTS: Agent[] = [
  { id: '1', name: 'SEO Content Machine',   category: 'prompt',  description: 'Generates SEO-optimized blog posts and web copy.',          emoji: '📝' },
  { id: '2', name: 'Social Media Scheduler', category: 'skill',   description: 'Adapts content for all social platforms.',                  emoji: '📱' },
  { id: '3', name: 'Cold Email Writer',      category: 'prompt',  description: 'Crafts personalized outreach sequences.',                   emoji: '📧' },
  { id: '4', name: 'Research Summarizer',    category: 'agent',   description: 'Scours the web and synthesizes key findings.',              emoji: '🔍' },
  { id: '5', name: 'Code Review Wizard',     category: 'agent',   description: 'Analyzes pull requests for bugs and vulnerabilities.',       emoji: '🧙' },
  { id: '6', name: 'SQL Craftsperson',       category: 'skill',   description: 'Translates natural language to optimized SQL.',             emoji: '🗄️' },
  { id: '7', name: 'Bug Hunter Pro',         category: 'agent',   description: 'Scans code for common bug patterns and risks.',             emoji: '🐛' },
  { id: '8', name: 'Pitch Deck Writer',      category: 'workflow', description: 'Creates investor-ready pitch decks from a brief.',         emoji: '📊' },
  { id: '9', name: 'Market Radar',           category: 'agent',   description: 'Tracks competitor moves and industry shifts.',              emoji: '📡' },
  { id: '10', name: 'Brand Voice Guide',     category: 'skill',   description: 'Synthesizes your brand tone and vocabulary.',               emoji: '🎨' },
]

const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  agent:    { bg: '#FFDDD0', text: '#7A2A10' },
  prompt:   { bg: '#EAE0F5', text: '#4A2A7A' },
  skill:    { bg: '#D0EDD5', text: '#1E4D28' },
  workflow: { bg: '#F5E6D0', text: '#6B3A1E' },
}

function buildTeamPrompt(team: TeamMember[]): string {
  if (team.length === 0) return ''
  const roles = team.map(m => `${m.name} (${m.category.toUpperCase()}): ${m.description}`).join('\n\n')
  return `You are a coordinated AI agent team of ${team.length} specialists:\n\n${roles}\n\nWork together to respond to any request by coordinating these roles to produce a complete, high-quality result.`
}

function PixelBtn({
  onClick, bg, color, border, shadow, children, fullWidth,
}: {
  onClick?: () => void; bg: string; color: string; border: string; shadow: string; children: React.ReactNode; fullWidth?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
        background: bg, color, border, boxShadow: shadow, borderRadius: 0,
        padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'transform 60ms, box-shadow 60ms',
        width: fullWidth ? '100%' : undefined,
      }}
      onMouseDown={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = 'none' }}
      onMouseUp={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = shadow }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = shadow }}
    >
      {children}
    </button>
  )
}

export default function TeamsPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Add agents from the left panel to build your team. Then describe what you want them to accomplish.' }
  ])
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function addAgent(agent: Agent) {
    if (team.find(m => m.id === agent.id)) return
    setTeam(prev => [...prev, { ...agent, role: agent.name }])
    setMessages(prev => [...prev, { role: 'bot', text: `Added ${agent.name} to your team. Team now has ${team.length + 1} member${team.length + 1 !== 1 ? 's' : ''}.` }])
  }

  function removeAgent(id: string) {
    setTeam(prev => prev.filter(m => m.id !== id))
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      const reply = team.length > 0
        ? `Your team of ${team.length} agents is ready for that task. ${team.map(m => m.name).join(', ')} will collaborate to produce a complete result. Copy the team prompt below to deploy.`
        : "Add some agents from the left panel first, then I can build a targeted team prompt for you."
      setMessages(prev => [...prev, { role: 'bot', text: reply }])
    }, 600)
  }

  const teamPrompt = buildTeamPrompt(team)

  function copyPrompt() {
    if (!teamPrompt) return
    navigator.clipboard.writeText(teamPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '28px 24px 16px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif', fontSize: 28, color: '#0A0A0F', margin: '0 0 4px' }}>
          Team Builder
        </h1>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A', margin: 0 }}>
          Assemble agents into a coordinated team. Export a merged system prompt.
        </p>
      </div>

      {/* Three-column layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Left: Available agents */}
        <div
          style={{
            width: 260, flexShrink: 0,
            borderRight: '2px solid rgba(0,0,0,0.1)',
            overflowY: 'auto',
            background: 'rgba(240,230,208,0.5)',
          }}
          className="scrollbar-none"
        >
          <div style={{ padding: '14px 16px 6px', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7C6A9E' }}>
            AVAILABLE AGENTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {AVAILABLE_AGENTS.map(agent => {
              const inTeam = !!team.find(m => m.id === agent.id)
              const cat = CATEGORY_COLOR[agent.category] ?? CATEGORY_COLOR.agent
              return (
                <div
                  key={agent.id}
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                    background: inTeam ? 'rgba(107,143,113,0.1)' : 'transparent',
                    opacity: inTeam ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 14 }}>{agent.emoji}</span>
                        <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, fontWeight: 600, color: '#0A0A0F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {agent.name}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '1px 6px', background: cat.bg, color: cat.text }}>
                        {agent.category}
                      </span>
                    </div>
                    {!inTeam && (
                      <button
                        onClick={() => addAgent(agent)}
                        style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, background: '#0A0A0F', color: '#E8E0D0', border: '1px solid #0A0A0F', padding: '3px 8px', cursor: 'pointer', flexShrink: 0 }}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '14px 16px' }}>
            <Link href="/browse" style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#7C6A9E', textDecoration: 'none', fontWeight: 600 }}>
              Browse all agents →
            </Link>
          </div>
        </div>

        {/* Center: Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }} className="scrollbar-none">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === 'user' ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#7C6A9E', color: '#E8E0D0', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, padding: '8px 12px', border: '1.5px solid #0A0A0F', boxShadow: '2px 2px 0px #0A0A0F', maxWidth: '75%', lineHeight: 1.5 }}>
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C6A9E' }}>23rdGen</div>
                    <div style={{ background: '#E8DCC8', color: '#0A0A0F', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, padding: '10px 12px', border: '1.5px solid rgba(0,0,0,0.15)', maxWidth: '80%', lineHeight: 1.6 }}>
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', display: 'flex' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Describe the task for your team..."
              style={{ flex: 1, fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, background: '#F0E6D0', border: 'none', borderRight: '2px solid rgba(0,0,0,0.1)', padding: '12px 14px', color: '#0A0A0F', outline: 'none' }}
            />
            <button
              onClick={handleSend}
              style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, background: '#7C6A9E', color: '#E8E0D0', border: 'none', padding: '12px 20px', cursor: 'pointer' }}
            >
              SEND →
            </button>
          </div>

          {/* Deploy bar */}
          {teamPrompt && (
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', padding: '12px 16px', background: 'rgba(240,230,208,0.6)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, color: '#6A5A4A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: 4 }}>
                Deploy:
              </span>
              <PixelBtn onClick={copyPrompt} bg={copied ? '#6B8F71' : '#0A0A0F'} color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px rgba(10,10,15,0.35)">
                {copied ? '✓ Copied' : '[Copy Team Prompt]'}
              </PixelBtn>
              <PixelBtn onClick={() => window.open(`https://claude.ai/new?q=${encodeURIComponent(teamPrompt)}`, '_blank')} bg="#7C6A9E" color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px #0A0A0F">
                [Open in Claude]
              </PixelBtn>
              <PixelBtn onClick={() => window.open(`https://chat.openai.com/?q=${encodeURIComponent(teamPrompt)}`, '_blank')} bg="#2A6A3A" color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px #0A0A0F">
                [Open in ChatGPT]
              </PixelBtn>
              <PixelBtn onClick={() => window.open(`https://gemini.google.com/app?q=${encodeURIComponent(teamPrompt)}`, '_blank')} bg="#C4622D" color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px #0A0A0F">
                [Open in Gemini]
              </PixelBtn>
            </div>
          )}
        </div>

        {/* Right: Team composition */}
        <div
          style={{
            width: 260, flexShrink: 0,
            borderLeft: '2px solid rgba(0,0,0,0.1)',
            overflowY: 'auto',
            background: 'rgba(240,230,208,0.5)',
          }}
          className="scrollbar-none"
        >
          <div style={{ padding: '14px 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7C6A9E' }}>
              YOUR TEAM ({team.length})
            </span>
          </div>

          {team.length === 0 ? (
            <div style={{ padding: '24px 16px', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#A89880', lineHeight: 1.6 }}>
              Add agents from the left panel to start building your team.
            </div>
          ) : (
            <div>
              {team.map(member => {
                const cat = CATEGORY_COLOR[member.category] ?? CATEGORY_COLOR.agent
                return (
                  <div key={member.id} style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                          <span style={{ fontSize: 13 }}>{member.emoji}</span>
                          <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, fontWeight: 600, color: '#0A0A0F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {member.name}
                          </span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '1px 6px', background: cat.bg, color: cat.text }}>
                          {member.category}
                        </span>
                      </div>
                      <button
                        onClick={() => removeAgent(member.id)}
                        style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, fontWeight: 700, background: 'none', border: 'none', color: '#C4622D', cursor: 'pointer', padding: '2px 4px', flexShrink: 0 }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Merged prompt preview */}
          {teamPrompt && (
            <div style={{ margin: '12px 16px 16px' }}>
              <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C6A9E', marginBottom: 8 }}>
                MERGED PROMPT PREVIEW
              </div>
              <div
                style={{
                  background: '#E8DCC8', border: '1.5px solid rgba(0,0,0,0.15)',
                  padding: '10px 12px', fontFamily: 'var(--font-ibm-mono), monospace',
                  fontSize: 10, color: '#4A3A2A', lineHeight: 1.6,
                  maxHeight: 200, overflowY: 'auto', whiteSpace: 'pre-wrap',
                }}
                className="scrollbar-none"
              >
                {teamPrompt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
