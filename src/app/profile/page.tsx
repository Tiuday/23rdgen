'use client'
import { useState } from 'react'

type Tab = 'agents' | 'saved' | 'activity' | 'teams'

const AVATAR_OPTIONS = [
  { id: 'wizard',  emoji: '🧙', label: 'Wizard' },
  { id: 'elf',     emoji: '🧝', label: 'Elf' },
  { id: 'fairy',   emoji: '🧚', label: 'Fairy' },
  { id: 'robot',   emoji: '🤖', label: 'Robot' },
  { id: 'invader', emoji: '👾', label: 'Invader' },
  { id: 'ghost',   emoji: '👻', label: 'Ghost' },
  { id: 'ninja',   emoji: '🥷', label: 'Ninja' },
  { id: 'astronaut',emoji: '🧑‍🚀', label: 'Astronaut' },
  { id: 'alchemist',emoji: '🧪', label: 'Alchemist' },
  { id: 'dragon',  emoji: '🐉', label: 'Dragon' },
  { id: 'phoenix', emoji: '🦅', label: 'Phoenix' },
  { id: 'oracle',  emoji: '🔮', label: 'Oracle' },
]

const MOCK_AGENTS = [
  { id: '1', name: 'My Cold Email Sequence', category: 'prompt', deploys: 142 },
  { id: '2', name: 'Code Audit Agent',       category: 'agent',  deploys: 87  },
]

const MOCK_SAVED = [
  { id: '3', name: 'SEO Scribe',         creator: 'marketers',   category: 'prompt' },
  { id: '4', name: 'Research Conductor', creator: 'researchers', category: 'workflow' },
]

const MOCK_ACTIVITY = [
  { action: 'Deployed', name: 'Code Review Wizard', time: '2h ago' },
  { action: 'Saved',    name: 'SQL Craftsperson',   time: '5h ago' },
  { action: 'Uploaded', name: 'Code Audit Agent',   time: '2d ago' },
  { action: 'Deployed', name: 'SEO Scribe',         time: '3d ago' },
]

const MOCK_TEAMS = [
  { id: '1', name: 'Content Squad', members: 4, deploys: 230 },
]

const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  agent:    { bg: '#FFDDD0', text: '#7A2A10' },
  prompt:   { bg: '#EAE0F5', text: '#4A2A7A' },
  skill:    { bg: '#D0EDD5', text: '#1E4D28' },
  workflow: { bg: '#F5E6D0', text: '#6B3A1E' },
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'agents',   label: 'My Agents' },
  { id: 'saved',    label: 'Saved' },
  { id: 'activity', label: 'Activity' },
  { id: 'teams',    label: 'My Teams' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('agents')
  const [selectedAvatar, setSelectedAvatar] = useState('wizard')
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [username, setUsername] = useState('builder_anon')
  const [editingName, setEditingName] = useState(false)

  const avatar = AVATAR_OPTIONS.find(a => a.id === selectedAvatar)

  return (
    <div style={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Profile header */}
      <div
        style={{
          background: '#F0E6D0',
          border: '2px solid #0A0A0F',
          boxShadow: '4px 4px 0px #0A0A0F',
          padding: '28px 28px',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowAvatarPicker(v => !v)}
            style={{
              width: 80, height: 80,
              background: '#E8DCC8',
              border: '2px solid #0A0A0F',
              boxShadow: '3px 3px 0px #0A0A0F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, cursor: 'pointer',
              transition: 'transform 60ms ease, box-shadow 60ms ease',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(1px,1px)'; el.style.boxShadow = '2px 2px 0px #0A0A0F' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '3px 3px 0px #0A0A0F' }}
          >
            {avatar?.emoji}
          </button>
          <div
            style={{
              position: 'absolute', bottom: -6, right: -6,
              background: '#0A0A0F', color: '#E8E0D0',
              fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 8,
              padding: '2px 5px', pointerEvents: 'none',
            }}
          >
            EDIT
          </div>

          {/* Avatar picker dropdown */}
          {showAvatarPicker && (
            <div
              style={{
                position: 'absolute', top: 90, left: 0, zIndex: 50,
                background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '4px 4px 0px #0A0A0F',
                padding: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, width: 220,
              }}
            >
              {AVATAR_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setSelectedAvatar(opt.id); setShowAvatarPicker(false) }}
                  title={opt.label}
                  style={{
                    fontSize: 24, padding: 8, cursor: 'pointer',
                    background: selectedAvatar === opt.id ? '#E8DCC8' : 'transparent',
                    border: selectedAvatar === opt.id ? '2px solid #7C6A9E' : '2px solid transparent',
                  }}
                >
                  {opt.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Name + stats */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {editingName ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={e => e.key === 'Enter' && setEditingName(false)}
                style={{
                  fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 20, fontWeight: 600,
                  background: '#E8DCC8', border: '2px solid #7C6A9E', color: '#0A0A0F',
                  padding: '4px 10px', outline: 'none',
                }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 22, fontWeight: 700, color: '#0A0A0F', margin: 0 }}>
                {username}
              </h1>
              <button
                onClick={() => setEditingName(true)}
                style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, color: '#8A7A6A', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                [edit]
              </button>
            </div>
          )}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Agents', value: 2 },
              { label: 'Deploys', value: 229 },
              { label: 'Points', value: 850 },
              { label: 'Teams', value: 1 },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>{stat.value}</div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, color: '#8A7A6A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan badge */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ background: '#F5D76E', border: '2px solid #0A0A0F', boxShadow: '2px 2px 0px #0A0A0F', padding: '6px 16px' }}>
            <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2A1A0E' }}>FREE PLAN</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid rgba(0,0,0,0.12)' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: 'var(--font-ibm-mono), monospace',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
              padding: '10px 20px', cursor: 'pointer', border: 'none',
              background: activeTab === tab.id ? '#0A0A0F' : 'transparent',
              color: activeTab === tab.id ? '#E8E0D0' : '#6A5A4A',
              borderBottom: activeTab === tab.id ? '2px solid #0A0A0F' : '2px solid transparent',
              marginBottom: -2,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'agents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_AGENTS.map(agent => {
            const cat = CATEGORY_COLOR[agent.category] ?? CATEGORY_COLOR.agent
            return (
              <div key={agent.id} style={{ background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3 style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, fontWeight: 600, color: '#0A0A0F', margin: 0 }}>{agent.name}</h3>
                    <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 7px', background: cat.bg, color: cat.text }}>{agent.category}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#C4622D', fontWeight: 600 }}>{agent.deploys} deploys</div>
                </div>
                <button style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0F', border: '2px solid #0A0A0F', padding: '5px 12px', cursor: 'pointer' }}>
                  Edit
                </button>
              </div>
            )
          })}
          <button style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#0A0A0F', color: '#E8E0D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px rgba(10,10,15,0.3)', padding: '10px 0', cursor: 'pointer', width: '100%', marginTop: 4 }}>
            + Upload New Agent
          </button>
        </div>
      )}

      {activeTab === 'saved' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_SAVED.map(item => {
            const cat = CATEGORY_COLOR[item.category] ?? CATEGORY_COLOR.agent
            return (
              <div key={item.id} style={{ background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3 style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, fontWeight: 600, color: '#0A0A0F', margin: 0 }}>{item.name}</h3>
                    <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 7px', background: cat.bg, color: cat.text }}>{item.category}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#8A7A6A' }}>by {item.creator}</div>
                </div>
                <button style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', background: 'transparent', color: '#0A0A0F', border: '2px solid #0A0A0F', padding: '5px 12px', cursor: 'pointer' }}>
                  Deploy
                </button>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'activity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '2px solid rgba(0,0,0,0.12)' }}>
          {MOCK_ACTIVITY.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px', borderBottom: i < MOCK_ACTIVITY.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none', background: '#F0E6D0' }}>
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7C6A9E', width: 64, flexShrink: 0 }}>{item.action}</span>
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#0A0A0F', flex: 1 }}>{item.name}</span>
              <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#8A7A6A', flexShrink: 0 }}>{item.time}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'teams' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_TEAMS.map(team => (
            <div key={team.id} style={{ background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, fontWeight: 600, color: '#0A0A0F', margin: '0 0 4px' }}>{team.name}</h3>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#8A7A6A' }}>{team.members} agents · {team.deploys} deploys</div>
              </div>
              <button style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', background: 'transparent', color: '#0A0A0F', border: '2px solid #0A0A0F', padding: '5px 12px', cursor: 'pointer' }}>
                Open
              </button>
            </div>
          ))}
          <a
            href="/teams"
            style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#0A0A0F', color: '#E8E0D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px rgba(10,10,15,0.3)', padding: '10px 0', cursor: 'pointer', width: '100%', marginTop: 4, textAlign: 'center', textDecoration: 'none', display: 'block' }}
          >
            + Build New Team
          </a>
        </div>
      )}
    </div>
  )
}
