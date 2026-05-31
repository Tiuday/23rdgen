'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import CartoonAvatar from '@/components/mascot/CartoonAvatar'
import { ArrowLeft, Plus, Trash2, Copy, Check, ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react'

const AKT = "'Akt', system-ui, -apple-system, sans-serif"
const MONO = 'var(--font-ibm-mono), IBM Plex Mono, monospace'
const SERIF = 'var(--font-dm-serif), DM Serif Display, serif'

// ─── Types ──────────────────────────────────────────────────────────────────

interface TeamNode {
  id: string
  name: string
  role: string
  color: string
  avatarIdx: number
}

interface ChatMsg {
  from: 'user' | 'tiuday'
  text: string
}

// ─── Stub team configs ───────────────────────────────────────────────────────

const STUB_TEAMS: Array<{ keywords: RegExp; reply: string; nodes: TeamNode[] }> = [
  {
    keywords: /content|marketing|social|blog|seo|publish|copy|writer/i,
    reply: `I've assembled a **Content Ops Team** — a 4-agent pipeline that handles everything from research to distribution:\n\n• **Research Summarizer** — gathers and digests source material\n• **SEO Writer** — crafts keyword-optimized long-form content\n• **Social Scheduler** — adapts each piece for every platform\n• **Cold Email Specialist** — drives targeted outreach\n\nNodes flow left → right on the canvas. Add, remove, or rewire any agent, then hit **CONVERT** to turn this into a deployable prompt + orchestration code.`,
    nodes: [
      { id: 'n1', name: 'Research Summarizer',  role: 'researcher', color: '#A8D8EA', avatarIdx: 4  },
      { id: 'n2', name: 'SEO Writer',            role: 'writer',     color: '#F5D76E', avatarIdx: 0  },
      { id: 'n3', name: 'Social Scheduler',      role: 'marketer',   color: '#E8A0BF', avatarIdx: 6  },
      { id: 'n4', name: 'Cold Email Specialist', role: 'marketer',   color: '#E8A0BF', avatarIdx: 2  },
    ],
  },
  {
    keywords: /dev|code|coding|engineer|bug|software|api|debug|test/i,
    reply: `Here's your **Dev Squad** — a 3-agent engineering team:\n\n• **Code Reviewer** — analyzes PRs for bugs, security issues, and quality\n• **Bug Hunter** — traces root causes systematically with full reproduction steps\n• **API Error Explainer** — unblocks integration failures fast\n\nPipeline: code enters for review → bugs get traced → API errors get decoded. Want to add a Documentation Writer or Test Author?`,
    nodes: [
      { id: 'n1', name: 'Code Reviewer',       role: 'coder',    color: '#B5EAD7', avatarIdx: 3 },
      { id: 'n2', name: 'Bug Hunter',           role: 'coder',    color: '#B5EAD7', avatarIdx: 7 },
      { id: 'n3', name: 'API Error Explainer',  role: 'analyst',  color: '#C9B1FF', avatarIdx: 9 },
    ],
  },
  {
    keywords: /sales|lead|outreach|pitch|prospect|revenue|b2b|cold/i,
    reply: `Your **Sales Acceleration Team** is ready:\n\n• **Lead Generator** — finds and qualifies target prospects\n• **Cold Email Machine** — writes hyper-personalized sequences\n• **Pitch Deck Writer** — builds investor-ready narratives\n• **Market Radar** — tracks competitor moves weekly\n\nThis pipeline turns a prospect list into personalized outreach + supporting materials. Want to add a CRM Updater or Proposal Writer?`,
    nodes: [
      { id: 'n1', name: 'Lead Generator',     role: 'analyst',    color: '#C9B1FF', avatarIdx: 1  },
      { id: 'n2', name: 'Cold Email Machine', role: 'marketer',   color: '#E8A0BF', avatarIdx: 5  },
      { id: 'n3', name: 'Pitch Deck Writer',  role: 'writer',     color: '#F5D76E', avatarIdx: 10 },
      { id: 'n4', name: 'Market Radar',       role: 'researcher', color: '#A8D8EA', avatarIdx: 8  },
    ],
  },
  {
    keywords: /research|analysis|data|competitor|intelligence|insight|trend/i,
    reply: `**Research Intelligence Team** assembled:\n\n• **Market Researcher** — maps the competitive landscape\n• **Competitor Analyzer** — digs into rival moves and strategies\n• **Data Analyst** — finds patterns and signals in numbers\n• **Report Writer** — synthesizes findings into executive briefs\n\nThis team turns a research question into a structured intelligence report. Want a Trend Spotter or Literature Reviewer added?`,
    nodes: [
      { id: 'n1', name: 'Market Researcher',   role: 'researcher', color: '#A8D8EA', avatarIdx: 11 },
      { id: 'n2', name: 'Competitor Analyzer', role: 'researcher', color: '#A8D8EA', avatarIdx: 4  },
      { id: 'n3', name: 'Data Analyst',        role: 'analyst',    color: '#C9B1FF', avatarIdx: 1  },
      { id: 'n4', name: 'Report Writer',       role: 'writer',     color: '#F5D76E', avatarIdx: 0  },
    ],
  },
]

const DEFAULT_REPLY = `I can assemble a custom AI team for almost any workflow. Try describing what you need — for example:\n\n• "I need a content marketing team"\n• "Build me a dev team for code review"\n• "I want a sales outreach pipeline"\n• "Research intelligence team"\n\nOnce I assemble the team, you can edit the canvas and hit CONVERT to deploy it.`

function matchTeam(input: string) {
  for (const t of STUB_TEAMS) {
    if (t.keywords.test(input)) return t
  }
  return null
}

// ─── Agent catalogue (for Add Agent picker) ──────────────────────────────────

const AGENT_CATALOGUE: TeamNode[] = [
  { id: 'c1',  name: 'Research Summarizer',  role: 'researcher', color: '#A8D8EA', avatarIdx: 4  },
  { id: 'c2',  name: 'SEO Writer',           role: 'writer',     color: '#F5D76E', avatarIdx: 0  },
  { id: 'c3',  name: 'Social Scheduler',     role: 'marketer',   color: '#E8A0BF', avatarIdx: 6  },
  { id: 'c4',  name: 'Cold Email Machine',   role: 'marketer',   color: '#E8A0BF', avatarIdx: 2  },
  { id: 'c5',  name: 'Code Reviewer',        role: 'coder',      color: '#B5EAD7', avatarIdx: 3  },
  { id: 'c6',  name: 'Bug Hunter',           role: 'coder',      color: '#B5EAD7', avatarIdx: 7  },
  { id: 'c7',  name: 'API Error Explainer',  role: 'analyst',    color: '#C9B1FF', avatarIdx: 9  },
  { id: 'c8',  name: 'SQL Craftsperson',     role: 'analyst',    color: '#C9B1FF', avatarIdx: 1  },
  { id: 'c9',  name: 'Market Radar',         role: 'researcher', color: '#A8D8EA', avatarIdx: 8  },
  { id: 'c10', name: 'Pitch Deck Writer',    role: 'writer',     color: '#F5D76E', avatarIdx: 10 },
  { id: 'c11', name: 'Brand Voice Guide',    role: 'marketer',   color: '#E8A0BF', avatarIdx: 5  },
  { id: 'c12', name: 'Report Writer',        role: 'writer',     color: '#F5D76E', avatarIdx: 11 },
]

// ─── Prompt + code generation ────────────────────────────────────────────────

function generateOutput(nodes: TeamNode[]): { prompt: string; code: string } {
  const names = nodes.map(n => n.name)

  const prompt = `You are the 23rdGen AI Team — a coordinated pipeline of ${nodes.length} specialized agents: ${names.join(' → ')}.

AGENT ROLES:
${nodes.map((n, i) => `${i + 1}. ${n.name} (${n.role}) — receives context from ${i === 0 ? 'the user input' : nodes[i - 1].name} and passes structured output to ${i === nodes.length - 1 ? 'the final response' : nodes[i + 1].name}.`).join('\n')}

OPERATING RULES:
- Each agent stays strictly within its defined role — no scope creep
- Pass structured output to the next agent; never summarize away key data
- If blocked, output: BLOCKED: [reason] so the pipeline can adapt
- Final agent formats the complete result clearly for the end user

USER INPUT FOLLOWS:`

  const code = `// 23rdGen Team Pipeline — Generated by Tiuday
// TODO: connect POST /api/gemini/team for live assembly
// TODO: connect POST /api/gemini/convert for prompt+code generation

const team = {
  id: "${Math.random().toString(36).slice(2, 10)}",
  name: "Custom Team",
  agents: [
${nodes.map((n, i) => `    { id: "${n.id}", name: "${n.name}", role: "${n.role}", order: ${i + 1} },`).join('\n')}
  ],
  pipeline: "sequential",
  created: new Date().toISOString(),
}

// Run the team pipeline sequentially
// Each agent call should POST to /api/gemini/team with { agentId, context }
async function runTeam(userInput: string): Promise<string> {
  let context = userInput
  for (const agent of team.agents) {
    // TODO: const result = await fetch('/api/gemini/team', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ agentId: agent.id, agentName: agent.name, context }),
    // }).then(r => r.json())
    // context = result.output
    console.log(\`[Tiuday] Running \${agent.name} (order \${agent.order})...\`)
  }
  return context
}

export { team, runTeam }`

  return { prompt, code }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderMsgText(text: string) {
  return text.split('\n').map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <span key={li} style={{ display: 'block', marginBottom: line === '' ? 6 : 0 }}>
        {parts.map((part, pi) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={pi} style={{ color: '#E8E0D0', fontWeight: 600 }}>{part.slice(2, -2)}</strong>
            : <span key={pi}>{part}</span>
        )}
      </span>
    )
  })
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CanvasNode({
  node,
  isFirst,
  isLast,
  onRemove,
  onMoveLeft,
  onMoveRight,
}: {
  node: TeamNode
  isFirst: boolean
  isLast: boolean
  onRemove: () => void
  onMoveLeft: () => void
  onMoveRight: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Node card */}
      <div style={{ position: 'relative', width: 140 }}>
        {/* Remove */}
        {hovered && (
          <button
            onClick={onRemove}
            style={{
              position: 'absolute', top: -9, right: -9, zIndex: 5,
              width: 22, height: 22, borderRadius: '50%',
              background: '#1C1916', border: '1px solid rgba(255,255,255,0.14)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8A8A92', padding: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = '#E8A0BF'; el.style.background = '#2A1920' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = '#8A8A92'; el.style.background = '#1C1916' }}
          >
            <Trash2 size={10} />
          </button>
        )}

        {/* Move left */}
        {hovered && !isFirst && (
          <button
            onClick={onMoveLeft}
            style={{
              position: 'absolute', top: '50%', left: -9, transform: 'translateY(-50%)', zIndex: 5,
              width: 18, height: 18, borderRadius: '50%',
              background: '#16161C', border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7C6A9E', padding: 0,
            }}
          >
            <ChevronLeft size={10} />
          </button>
        )}
        {/* Move right */}
        {hovered && !isLast && (
          <button
            onClick={onMoveRight}
            style={{
              position: 'absolute', top: '50%', right: -9, transform: 'translateY(-50%)', zIndex: 5,
              width: 18, height: 18, borderRadius: '50%',
              background: '#16161C', border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7C6A9E', padding: 0,
            }}
          >
            <ChevronRight size={10} />
          </button>
        )}

        {/* Left port */}
        {!isFirst && (
          <div style={{
            position: 'absolute', left: -6, top: '50%', transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: '50%',
            background: node.color, border: '2px solid #0A0A0F', zIndex: 3,
          }} />
        )}

        {/* Card */}
        <div style={{
          border: `1.5px solid ${hovered ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#13131A',
          boxShadow: hovered ? '0 6px 24px rgba(0,0,0,0.5)' : '0 3px 12px rgba(0,0,0,0.35)',
          transition: 'box-shadow 150ms, border-color 150ms',
        }}>
          {/* Colored header */}
          <div style={{ background: node.color, padding: '14px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <CartoonAvatar index={node.avatarIdx} size={56} />
          </div>
          {/* Name */}
          <div style={{ padding: '8px 10px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: AKT, fontSize: 11, fontWeight: 600, color: '#E8E0D0', lineHeight: 1.3 }}>
              {node.name}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: '#5A5A72', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {node.role}
            </div>
          </div>
        </div>

        {/* Right port */}
        {!isLast && (
          <div style={{
            position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
            width: 12, height: 12, borderRadius: '50%',
            background: node.color, border: '2px solid #0A0A0F', zIndex: 3,
          }} />
        )}
      </div>

      {/* Arrow to next */}
      {!isLast && (
        <div style={{ display: 'flex', alignItems: 'center', width: 44, flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1.5, background: 'rgba(255,255,255,0.18)' }} />
          <div style={{
            width: 0, height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '8px solid rgba(255,255,255,0.18)',
          }} />
        </div>
      )}
    </div>
  )
}

function AddAgentPicker({
  onAdd,
  onClose,
}: {
  onAdd: (node: TeamNode) => void
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#13131A',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          width: 480,
          maxWidth: '100%',
          maxHeight: '70vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: AKT, fontSize: 15, fontWeight: 600, color: '#E8E0D0' }}>Add Agent to Canvas</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5A72', padding: 4 }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {AGENT_CATALOGUE.map(agent => (
            <button
              key={agent.id}
              onClick={() => { onAdd({ ...agent, id: `a${Date.now()}` }); onClose() }}
              style={{
                background: '#0F0F16',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textAlign: 'left',
                transition: 'background 100ms, border-color 100ms',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#1A1A26'; el.style.borderColor = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#0F0F16'; el.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: agent.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CartoonAvatar index={agent.avatarIdx} size={22} />
              </div>
              <div>
                <div style={{ fontFamily: AKT, fontSize: 12, fontWeight: 600, color: '#E8E0D0' }}>{agent.name}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: '#5A5A72', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{agent.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function TiudayPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      from: 'tiuday',
      text: `Hello. I'm **Tiuday** — 23rdGen's AI team builder.\n\nDescribe the team or workflow you need and I'll assemble a custom agent pipeline for you. Once it's on the canvas, you can add, remove, or rewire any agent — then hit **CONVERT** to generate a deployable prompt and orchestration code.`,
    },
  ])
  const [nodes, setNodes] = useState<TeamNode[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [convertOpen, setConvertOpen] = useState(false)
  const [convertTab, setConvertTab] = useState<'prompt' | 'code'>('prompt')
  const [copied, setCopied] = useState<'prompt' | 'code' | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return
    setInput('')
    setMessages(prev => [...prev, { from: 'user', text: trimmed }])
    setIsTyping(true)

    const matched = matchTeam(trimmed)
    setTimeout(() => {
      setIsTyping(false)
      if (matched) {
        setMessages(prev => [...prev, { from: 'tiuday', text: matched.reply }])
        setNodes(matched.nodes)
      } else {
        setMessages(prev => [...prev, { from: 'tiuday', text: DEFAULT_REPLY }])
      }
    }, 1400)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  function removeNode(id: string) {
    setNodes(prev => prev.filter(n => n.id !== id))
  }

  function moveNode(id: string, dir: -1 | 1) {
    setNodes(prev => {
      const idx = prev.findIndex(n => n.id === id)
      if (idx < 0) return prev
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }

  function addNode(node: TeamNode) {
    setNodes(prev => [...prev, node])
  }

  function copyToClipboard(text: string, tab: 'prompt' | 'code') {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(tab)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  function openInService(service: 'claude' | 'chatgpt' | 'gemini', promptText: string) {
    navigator.clipboard.writeText(promptText)
    const urls: Record<string, string> = {
      claude:  'https://claude.ai/new',
      chatgpt: 'https://chatgpt.com/',
      gemini:  'https://gemini.google.com/',
    }
    window.open(urls[service], '_blank')
  }

  const output = generateOutput(nodes)

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0A0A0F', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{
        height: 56,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#0A0A0F',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: MONO, fontSize: 11, color: '#5A5A72',
              textDecoration: 'none', transition: 'color 100ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#A090C8')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#5A5A72')}
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </Link>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} color="#9B88BF" />
            <span style={{ fontFamily: AKT, fontSize: 17, fontWeight: 700, color: '#E8E0D0', letterSpacing: '-0.01em' }}>Tiuday</span>
            <span style={{
              fontFamily: MONO, fontSize: 9, color: '#7C6A9E',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'rgba(124,106,158,0.15)',
              border: '1px solid rgba(124,106,158,0.25)',
              padding: '2px 7px', borderRadius: 4,
            }}>
              AI TEAM BUILDER
            </span>
          </div>
        </div>

        {/* CONVERT button */}
        <button
          onClick={() => nodes.length > 0 && setConvertOpen(true)}
          disabled={nodes.length === 0}
          style={{
            fontFamily: MONO, fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            background: nodes.length > 0 ? '#7C6A9E' : 'rgba(124,106,158,0.2)',
            color: nodes.length > 0 ? '#FFFFFF' : '#5A5A72',
            border: `2px solid ${nodes.length > 0 ? '#0A0A0F' : 'rgba(255,255,255,0.05)'}`,
            boxShadow: nodes.length > 0 ? '3px 3px 0 #0A0A0F' : 'none',
            padding: '9px 20px',
            borderRadius: 0,
            cursor: nodes.length > 0 ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'transform 80ms, box-shadow 80ms, background 200ms',
          }}
          onMouseEnter={e => {
            if (nodes.length > 0) {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = 'translate(1px,1px)'
              el.style.boxShadow = '2px 2px 0 #0A0A0F'
            }
          }}
          onMouseLeave={e => {
            if (nodes.length > 0) {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = ''
              el.style.boxShadow = '3px 3px 0 #0A0A0F'
            }
          }}
        >
          <Zap size={12} />
          CONVERT → PROMPT + CODE
        </button>
      </div>

      {/* ── Body: Chat + Canvas ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: Chat panel */}
        <div style={{
          width: 380,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          background: '#0A0A0F',
        }}>
          {/* Chat label */}
          <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            <span style={{ fontFamily: MONO, fontSize: 9, color: '#5A5A72', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              BRIEF YOUR TEAM
            </span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                  gap: 8,
                  alignItems: 'flex-start',
                }}
              >
                {/* Avatar bubble */}
                {msg.from === 'tiuday' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(124,106,158,0.2)',
                    border: '1px solid rgba(124,106,158,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Sparkles size={13} color="#9B88BF" />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '82%',
                    background: msg.from === 'user' ? '#16161C' : 'rgba(124,106,158,0.07)',
                    border: msg.from === 'user' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(124,106,158,0.15)',
                    borderRadius: msg.from === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                    padding: '10px 13px',
                    fontFamily: MONO,
                    fontSize: 12,
                    color: msg.from === 'user' ? '#C8C8D0' : '#A0A0B8',
                    lineHeight: 1.65,
                  }}
                >
                  {renderMsgText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(124,106,158,0.2)',
                  border: '1px solid rgba(124,106,158,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Sparkles size={13} color="#9B88BF" />
                </div>
                <div style={{
                  background: 'rgba(124,106,158,0.07)',
                  border: '1px solid rgba(124,106,158,0.15)',
                  borderRadius: '12px 12px 12px 4px',
                  padding: '12px 16px',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: '#7C6A9E',
                        animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the team you need…"
                rows={2}
                style={{
                  flex: 1,
                  fontFamily: MONO, fontSize: 12,
                  background: '#13131A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '10px 12px',
                  color: '#C8C8D0',
                  outline: 'none',
                  resize: 'none',
                  lineHeight: 1.55,
                  transition: 'border-color 100ms',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,106,158,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                style={{
                  width: 38, height: 38,
                  background: input.trim() && !isTyping ? '#7C6A9E' : 'rgba(124,106,158,0.15)',
                  border: 'none', borderRadius: 10,
                  cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF', flexShrink: 0,
                  transition: 'background 150ms',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 9, color: '#3A3A4A', marginTop: 6, letterSpacing: '0.05em' }}>
              Enter to send · Shift+Enter for new line
            </div>
          </div>
        </div>

        {/* Right: Canvas */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0A0A0F', overflow: 'hidden' }}>
          {/* Canvas toolbar */}
          <div style={{
            padding: '10px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', gap: 10,
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: MONO, fontSize: 9, color: '#5A5A72', textTransform: 'uppercase', letterSpacing: '0.14em', flex: 1 }}>
              TEAM CANVAS {nodes.length > 0 && `— ${nodes.length} AGENT${nodes.length > 1 ? 'S' : ''}`}
            </span>
            {nodes.length > 0 && (
              <>
                <button
                  onClick={() => setPickerOpen(true)}
                  style={{
                    fontFamily: MONO, fontSize: 10, color: '#A090C8',
                    background: 'rgba(124,106,158,0.1)',
                    border: '1px solid rgba(124,106,158,0.2)',
                    borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5,
                    transition: 'background 100ms',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,106,158,0.18)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,106,158,0.1)'}
                >
                  <Plus size={11} /> Add Agent
                </button>
                <button
                  onClick={() => setNodes([])}
                  style={{
                    fontFamily: MONO, fontSize: 10, color: '#5A5A72',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
                    transition: 'color 100ms, border-color 100ms',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = '#E8A0BF'; el.style.borderColor = 'rgba(232,160,191,0.3)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.color = '#5A5A72'; el.style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  Clear All
                </button>
              </>
            )}
          </div>

          {/* Canvas area */}
          <div style={{
            flex: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: nodes.length > 0 ? 'flex-start' : 'center',
            padding: 40,
            background: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)
            `,
            backgroundSize: '28px 28px',
          }}>
            {nodes.length === 0 ? (
              /* Empty state */
              <div style={{ textAlign: 'center', pointerEvents: 'none', userSelect: 'none' }}>
                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>◈</div>
                <div style={{ fontFamily: AKT, fontSize: 16, color: '#3A3A4A', marginBottom: 8 }}>
                  Your team will appear here
                </div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: '#2A2A36', lineHeight: 1.7 }}>
                  Describe what you need in the chat →<br />
                  Tiuday assembles the team and places it on the canvas
                </div>
                <button
                  onClick={() => setPickerOpen(true)}
                  style={{
                    marginTop: 20,
                    fontFamily: MONO, fontSize: 10, fontWeight: 600,
                    color: '#7C6A9E',
                    background: 'rgba(124,106,158,0.1)',
                    border: '1px solid rgba(124,106,158,0.25)',
                    borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    pointerEvents: 'all',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}
                >
                  <Plus size={12} /> Add Agent Manually
                </button>
              </div>
            ) : (
              /* Node pipeline */
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, paddingBottom: 16 }}>
                {nodes.map((node, idx) => (
                  <CanvasNode
                    key={node.id}
                    node={node}
                    isFirst={idx === 0}
                    isLast={idx === nodes.length - 1}
                    onRemove={() => removeNode(node.id)}
                    onMoveLeft={() => moveNode(node.id, -1)}
                    onMoveRight={() => moveNode(node.id, 1)}
                  />
                ))}
                {/* Add node button at end of pipeline */}
                <button
                  onClick={() => setPickerOpen(true)}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(124,106,158,0.08)',
                    border: '1.5px dashed rgba(124,106,158,0.3)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#7C6A9E', marginLeft: 20, flexShrink: 0,
                    transition: 'background 100ms, border-color 100ms',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(124,106,158,0.16)'; el.style.borderColor = 'rgba(124,106,158,0.5)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(124,106,158,0.08)'; el.style.borderColor = 'rgba(124,106,158,0.3)' }}
                  title="Add agent"
                >
                  <Plus size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Canvas hint */}
          {nodes.length > 0 && (
            <div style={{ padding: '8px 24px', borderTop: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
              <span style={{ fontFamily: MONO, fontSize: 9, color: '#3A3A4A', letterSpacing: '0.06em' }}>
                Hover a node to remove it or reorder · Ports connect left-to-right through the pipeline
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Add Agent Picker ── */}
      {pickerOpen && <AddAgentPicker onAdd={addNode} onClose={() => setPickerOpen(false)} />}

      {/* ── Convert Result Panel ── */}
      {convertOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setConvertOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxHeight: '75vh',
              background: '#0F0F16',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px 20px 0 0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Result header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0,
            }}>
              <Zap size={15} color="#9B88BF" />
              <span style={{ fontFamily: AKT, fontSize: 15, fontWeight: 700, color: '#E8E0D0', flex: 1 }}>
                Team Output — Prompt + Code
              </span>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: 4, background: '#13131A', borderRadius: 8, padding: 3 }}>
                {(['prompt', 'code'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setConvertTab(tab)}
                    style={{
                      fontFamily: MONO, fontSize: 10, fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      padding: '5px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: convertTab === tab ? '#7C6A9E' : 'transparent',
                      color: convertTab === tab ? '#FFFFFF' : '#5A5A72',
                      transition: 'background 100ms, color 100ms',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Copy */}
              <button
                onClick={() => copyToClipboard(convertTab === 'prompt' ? output.prompt : output.code, convertTab)}
                style={{
                  fontFamily: MONO, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  background: copied === convertTab ? 'rgba(100,200,100,0.15)' : 'rgba(124,106,158,0.15)',
                  color: copied === convertTab ? '#82C882' : '#A090C8',
                  border: `1px solid ${copied === convertTab ? 'rgba(100,200,100,0.3)' : 'rgba(124,106,158,0.3)'}`,
                  borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'all 200ms',
                }}
              >
                {copied === convertTab ? <Check size={11} /> : <Copy size={11} />}
                {copied === convertTab ? 'Copied!' : 'Copy'}
              </button>
              {/* Close */}
              <button
                onClick={() => setConvertOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A5A72', padding: 6 }}
              >
                ✕
              </button>
            </div>

            {/* Code/Prompt content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <pre style={{
                fontFamily: MONO, fontSize: 12,
                color: '#C4C4D8',
                background: '#0A0A0F',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: 20,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: 1.7,
              }}>
                {convertTab === 'prompt' ? output.prompt : output.code}
              </pre>
            </div>

            {/* Open-in buttons */}
            <div style={{
              padding: '14px 24px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, flexWrap: 'wrap',
            }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: '#5A5A72', marginRight: 4 }}>
                COPY PROMPT THEN OPEN IN →
              </span>
              {[
                { label: 'Claude', service: 'claude' as const,  bg: '#D97706' },
                { label: 'ChatGPT', service: 'chatgpt' as const, bg: '#10B981' },
                { label: 'Gemini', service: 'gemini' as const,  bg: '#3B82F6' },
              ].map(({ label, service, bg }) => (
                <button
                  key={service}
                  onClick={() => openInService(service, output.prompt)}
                  style={{
                    fontFamily: MONO, fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.06em',
                    background: bg + '22',
                    color: bg,
                    border: `1px solid ${bg}44`,
                    borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5,
                    transition: 'background 100ms',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = bg + '38'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = bg + '22'}
                >
                  {label} ↗
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bounce animation for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
