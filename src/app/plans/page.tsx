'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'bot'
  text: string
  showActions?: boolean
}

const FREE_FEATURES = [
  'Browse all agents, prompts, skills',
  'Deploy up to 10 agents/month',
  'Build teams of up to 3 agents',
  '1 saved team slot',
  'Community access',
  '100 points on signup',
]

const BUILDER_FEATURES = [
  'Everything in Free',
  'Unlimited deployments',
  'Teams of up to 10 agents',
  '10 saved team slots',
  'Priority agent review (upload)',
  'Analytics dashboard',
  '500 points/month bonus',
  'Early access to new drops',
]

const FORGE_FEATURES = [
  'Everything in Builder',
  'Unlimited team slots',
  'Multi-team orchestration',
  'Revenue sharing on uploads',
  'API access',
  'White-label team export',
  'Dedicated support',
  '2000 points/month bonus',
]

const TEAM_PROMPT = `You are a coordinated content marketing team of 4 specialized AI agents:

SEO Content Machine: Generates SEO-optimized blog posts, articles, and web copy. Targets keywords strategically and structures content for search engines while keeping readers engaged.

Social Media Scheduler: Takes content and adapts it for Twitter/X, LinkedIn, Instagram, and TikTok. Creates platform-native captions, hashtag strategies, and posting schedules.

Cold Email Writer: Crafts personalized cold outreach sequences and newsletter campaigns. Focuses on open rates, click-throughs, and list nurturing with a human voice.

Research Summarizer: Scours the web, papers, and competitor content to fuel your pipeline with fresh angles, data points, and trending topics.

Work together to respond to any content marketing request by coordinating these four roles to produce a complete, deployable content strategy.`

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'Build me a content marketing team' },
  {
    role: 'bot',
    text: "I've assembled a 4-agent content team for you:\n■ SEO Content Machine — generates optimized posts\n■ Social Media Scheduler — distributes across platforms\n■ Cold Email Writer — nurtures your list\n■ Research Summarizer — fuels your content pipeline",
    showActions: true,
  },
]

function PixelBtn({
  onClick, bg, color, border, shadow, children,
}: {
  onClick?: () => void; bg: string; color: string; border: string; shadow: string; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
        fontSize: 10,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        background: bg, color, border, boxShadow: shadow,
        borderRadius: 0, padding: '5px 10px', cursor: 'pointer',
        transition: 'transform 60ms, box-shadow 60ms', whiteSpace: 'nowrap',
      }}
      onMouseDown={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = 'none' }}
      onMouseUp={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = shadow }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = shadow }}
    >
      {children}
    </button>
  )
}

function PlanCard({ name, bg, textColor, features, price, btnText, btnBg, btnColor, featured }: {
  name: string; bg: string; textColor: string; features: string[]; price?: string;
  btnText: string; btnBg: string; btnColor: string; featured?: boolean
}) {
  return (
    <div
      style={{
        background: bg,
        border: '3px solid #0A0A0F',
        boxShadow: featured ? '8px 8px 0px #0A0A0F' : '6px 6px 0px #0A0A0F',
        padding: '28px 24px',
        flex: 1, minWidth: 220,
        transform: featured ? 'scale(1.03)' : undefined,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
    >
      {featured && (
        <div style={{
          position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
          background: '#0A0A0F', color: '#E8E0D0',
          fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 12px', whiteSpace: 'nowrap',
        }}>
          ★ FEATURED
        </div>
      )}

      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: textColor, marginBottom: 6, opacity: 0.55 }}>
        PLAN
      </div>
      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 28, fontWeight: 600, color: textColor, marginBottom: 2, letterSpacing: '0.04em' }}>
        {name}
      </div>
      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 20, fontWeight: 600, color: textColor, marginBottom: 20, opacity: price ? 1 : 0.7 }}>
        {price ?? 'FREE'}
      </div>
      <div style={{ borderTop: `2px solid rgba(10,10,15,0.18)`, marginBottom: 18 }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1 }}>
        {features.map(f => (
          <li key={f} style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: textColor, marginBottom: 9, display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.4 }}>
            <span style={{ flexShrink: 0, opacity: 0.6, marginTop: 1 }}>■</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        style={{
          fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600,
          background: btnBg, color: btnColor, border: '2px solid #0A0A0F',
          boxShadow: '3px 3px 0px rgba(10,10,15,0.3)', borderRadius: 0, padding: '11px 0', width: '100%',
          cursor: 'pointer', transition: 'transform 60ms, box-shadow 60ms',
        }}
        onMouseDown={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = 'none' }}
        onMouseUp={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '3px 3px 0px rgba(10,10,15,0.3)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '3px 3px 0px rgba(10,10,15,0.3)' }}
      >
        {btnText}
      </button>
    </div>
  )
}

export default function PlansPage() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Got it. I'm analyzing your request and assembling a custom agent team from the marketplace. Describe your workflow in more detail for a precise team build.",
        showActions: false,
      }])
    }, 700)
  }

  function copyTeamPrompt() {
    navigator.clipboard.writeText(TEAM_PROMPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <main style={{ minHeight: '100vh', padding: '56px 32px 100px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h1 style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif', fontSize: 40, color: '#0A0A0F', margin: 0, lineHeight: 1.1 }}>
          Choose Your Plan
        </h1>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#8A7A6A', margin: 0 }}>
          Pick the tier that fits your build. Upgrade or cancel anytime.
        </p>
      </div>

      {/* Plan cards */}
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-start', marginBottom: 100, flexWrap: 'wrap' }}>
        <PlanCard name="FREE"    bg="#F5D76E" textColor="#2A1A0E" features={FREE_FEATURES}    btnText="START FREE"   btnBg="#0A0A0F" btnColor="#F5D76E" />
        <PlanCard name="BUILDER" bg="#7C6A9E" textColor="#E8E0D0" features={BUILDER_FEATURES} price="$12/month" btnText="GO BUILDER"  btnBg="#0A0A0F" btnColor="#E8E0D0" featured />
        <PlanCard name="FORGE"   bg="#C4622D" textColor="#F0E6D0" features={FORGE_FEATURES}   price="$39/month" btnText="JOIN FORGE"  btnBg="#0A0A0F" btnColor="#E8E0D0" />
      </div>

      {/* Team Builder section */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif', fontSize: 32, color: '#0A0A0F', margin: '0 0 8px' }}>
          Build Your Team
        </h2>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, color: '#8A7A6A', margin: 0 }}>
          Type what you need. We&apos;ll assemble the perfect agent team.
        </p>
      </div>

      {/* Chat */}
      <div style={{ border: '2px solid #0A0A0F', boxShadow: '4px 4px 0px #0A0A0F', background: '#F0E6D0', maxWidth: 700, overflow: 'hidden' }}>
        <div style={{ height: 300, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: '#7C6A9E', color: '#E8E0D0', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, padding: '8px 12px', border: '1.5px solid #0A0A0F', boxShadow: '2px 2px 0px #0A0A0F', maxWidth: '80%', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C6A9E', fontWeight: 600 }}>
                    23rdGen
                  </div>
                  <div style={{ background: '#E8DCC8', color: '#0A0A0F', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, padding: '10px 12px', border: '1.5px solid #0A0A0F', boxShadow: '2px 2px 0px rgba(10,10,15,0.15)', maxWidth: '88%', whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
                    {msg.text}
                  </div>
                  {msg.showActions && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
                      <PixelBtn onClick={copyTeamPrompt} bg={copied ? '#2A5A2A' : '#0A0A0F'} color={copied ? '#A8D8A8' : '#E8E0D0'} border="1.5px solid #0A0A0F" shadow="2px 2px 0px rgba(10,10,15,0.4)">
                        {copied ? '✓ COPIED' : '[COPY TEAM PROMPT]'}
                      </PixelBtn>
                      <PixelBtn onClick={() => window.open(`https://claude.ai/new?q=${encodeURIComponent(TEAM_PROMPT)}`, '_blank')} bg="#7C6A9E" color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px #0A0A0F">
                        [OPEN IN CLAUDE]
                      </PixelBtn>
                      <PixelBtn onClick={() => window.open(`https://chat.openai.com/?q=${encodeURIComponent(TEAM_PROMPT)}`, '_blank')} bg="#2A6A3A" color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px #0A0A0F">
                        [OPEN IN CHATGPT]
                      </PixelBtn>
                      <PixelBtn onClick={() => window.open(`https://gemini.google.com/app?q=${encodeURIComponent(TEAM_PROMPT)}`, '_blank')} bg="#C4622D" color="#E8E0D0" border="1.5px solid #0A0A0F" shadow="2px 2px 0px #0A0A0F">
                        [OPEN IN GEMINI]
                      </PixelBtn>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ borderTop: '2px solid #0A0A0F', display: 'flex' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Describe the team you need..."
            style={{ flex: 1, fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, background: '#F0E6D0', border: 'none', borderRight: '2px solid #0A0A0F', padding: '12px 14px', color: '#0A0A0F', outline: 'none' }}
          />
          <button
            onClick={handleSend}
            style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, background: '#7C6A9E', color: '#E8E0D0', border: 'none', padding: '12px 20px', cursor: 'pointer', transition: 'opacity 150ms' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            SEND →
          </button>
        </div>
      </div>
    </main>
  )
}
