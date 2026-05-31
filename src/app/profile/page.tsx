'use client'
import { useState } from 'react'
import Link from 'next/link'
import CartoonAvatar, { AVATAR_NAMES } from '@/components/mascot/CartoonAvatar'

type Tab = 'agents' | 'saved' | 'activity' | 'teams'

// 12 avatar options — index matches CartoonAvatar index
const AVATAR_OPTIONS = [
  { id: 'wizard',     label: 'Wizard'     },
  { id: 'elf',        label: 'Elf'        },
  { id: 'fairy',      label: 'Fairy'      },
  { id: 'robot',      label: 'Robot'      },
  { id: 'invader',    label: 'Invader'    },
  { id: 'ghost',      label: 'Ghost'      },
  { id: 'ninja',      label: 'Ninja'      },
  { id: 'astronaut',  label: 'Astronaut'  },
  { id: 'alchemist',  label: 'Alchemist'  },
  { id: 'dragon',     label: 'Dragon'     },
  { id: 'phoenix',    label: 'Phoenix'    },
  { id: 'oracle',     label: 'Oracle'     },
]

// Accent color per avatar index (cycles through type palette)
const AVATAR_ACCENTS = [
  '#C9B1FF', '#B5EAD7', '#E8A0BF', '#A8D8EA', '#F5D76E', '#E8E0D0',
  '#0A0A0F', '#A8D8EA', '#B5EAD7', '#B5EAD7', '#F5D76E', '#C9B1FF',
]
const AVATAR_ACCENT_TEXT = [
  '#2A1A0E', '#1E4D28', '#4A1E2A', '#1E2E50', '#2A1A0E', '#0A0A0F',
  '#E8E0D0', '#1E2E50', '#1E4D28', '#1E4D28', '#2A1A0E', '#2A1A0E',
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

const TYPE_HEADER: Record<string, string> = {
  agent:    '#F5D76E',
  prompt:   '#A8D8EA',
  skill:    '#B5EAD7',
  workflow: '#E8A0BF',
  team:     '#C9B1FF',
}

const MONO = 'var(--font-ibm-mono), IBM Plex Mono, monospace'
const AKT  = "'Akt', system-ui, -apple-system, sans-serif"

const TABS: { id: Tab; label: string }[] = [
  { id: 'agents',   label: 'My Agents' },
  { id: 'saved',    label: 'Saved' },
  { id: 'activity', label: 'Activity' },
  { id: 'teams',    label: 'My Teams' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('agents')
  const [avatarIdx, setAvatarIdx] = useState(0) // 0 = Wizard by default
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [username, setUsername] = useState('builder_anon')
  const [editingName, setEditingName] = useState(false)

  const accentBg   = AVATAR_ACCENTS[avatarIdx]
  const accentText = AVATAR_ACCENT_TEXT[avatarIdx]

  return (
    <div style={{ minHeight: '100vh', maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* ── Profile header ──────────────────────────────────────────────── */}
      <div
        style={{
          border: '2px solid #0A0A0F',
          boxShadow: '4px 4px 0 #0A0A0F',
          background: '#F0E6D0',
          marginBottom: 32,
          overflow: 'hidden',
        }}
      >
        {/* Big avatar zone */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              background: accentBg,
              padding: '32px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              borderBottom: '2px solid #0A0A0F',
            }}
          >
            {/* Avatar button */}
            <button
              onClick={() => setShowAvatarPicker(v => !v)}
              style={{
                background: 'transparent',
                border: '3px solid #0A0A0F',
                boxShadow: '4px 4px 0 #0A0A0F',
                padding: 0,
                cursor: 'pointer',
                display: 'block',
                transition: 'transform 60ms ease, box-shadow 60ms ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = '2px 2px 0 #0A0A0F' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '4px 4px 0 #0A0A0F' }}
              title="Change avatar"
            >
              <CartoonAvatar index={avatarIdx} size={130} />
            </button>

            <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${accentText}99` }}>
              {AVATAR_NAMES[avatarIdx]} · tap to change
            </div>

            {/* Avatar picker dropdown */}
            {showAvatarPicker && (
              <div
                style={{
                  position: 'absolute',
                  top: 200,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 50,
                  background: '#F0E6D0',
                  border: '2px solid #0A0A0F',
                  boxShadow: '4px 4px 0 #0A0A0F',
                  padding: 12,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 6,
                  width: 336,
                }}
              >
                {AVATAR_OPTIONS.map((opt, idx) => (
                  <button
                    key={opt.id}
                    onClick={() => { setAvatarIdx(idx); setShowAvatarPicker(false) }}
                    title={opt.label}
                    style={{
                      padding: 4,
                      cursor: 'pointer',
                      background: avatarIdx === idx ? '#E8DCC8' : 'transparent',
                      border: avatarIdx === idx ? '2px solid #7C6A9E' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CartoonAvatar index={idx} size={42} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Name + stats row */}
          <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              {editingName ? (
                <input
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyDown={e => e.key === 'Enter' && setEditingName(false)}
                  style={{
                    fontFamily: MONO, fontSize: 20, fontWeight: 700,
                    background: '#E8DCC8', border: '2px solid #7C6A9E', color: '#0A0A0F',
                    padding: '4px 10px', outline: 'none', marginBottom: 8,
                  }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <h1 style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: '#0A0A0F', margin: 0 }}>
                    {username}
                  </h1>
                  <button
                    onClick={() => setEditingName(true)}
                    style={{ fontFamily: MONO, fontSize: 9, color: '#8A7A6A', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    [edit]
                  </button>
                </div>
              )}
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { label: 'Agents',  value: 2   },
                  { label: 'Deploys', value: 229 },
                  { label: 'Points',  value: 850 },
                  { label: 'Teams',   value: 1   },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>{stat.value}</div>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: '#8A7A6A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan badge */}
            <div style={{ background: '#F5D76E', border: '2px solid #0A0A0F', boxShadow: '2px 2px 0 #0A0A0F', padding: '6px 16px', flexShrink: 0 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2A1A0E' }}>FREE PLAN</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid rgba(0,0,0,0.12)' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: MONO,
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

      {/* ── My Agents ───────────────────────────────────────────────────── */}
      {activeTab === 'agents' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>
            {MOCK_AGENTS.map(agent => {
              const headerBg = TYPE_HEADER[agent.category] ?? '#F5D76E'
              return (
                <div
                  key={agent.id}
                  style={{
                    border: '2px solid #0A0A0F',
                    boxShadow: '4px 4px 0 #0A0A0F',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#FEFBF5',
                    transition: 'transform 120ms ease, box-shadow 120ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = '6px 6px 0 #0A0A0F' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '4px 4px 0 #0A0A0F' }}
                >
                  <div style={{ background: headerBg, padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <CartoonAvatar index={parseInt(agent.id) - 1} size={70} />
                    <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(10,10,15,0.5)' }}>
                      {agent.category}
                    </span>
                  </div>
                  <div style={{ padding: '14px 16px 16px' }}>
                    <div style={{ fontFamily: AKT, fontSize: 14, fontWeight: 700, color: '#0A0A0F', marginBottom: 6 }}>{agent.name}</div>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: '#C4622D', fontWeight: 600, marginBottom: 10 }}>{agent.deploys} deploys</div>
                    <button style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0F', border: '2px solid #0A0A0F', padding: '5px 14px', cursor: 'pointer', width: '100%', boxShadow: '2px 2px 0 #0A0A0F', transition: 'transform 60ms ease, box-shadow 60ms ease' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(1px,1px)'; el.style.boxShadow = '1px 1px 0 #0A0A0F' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '2px 2px 0 #0A0A0F' }}
                    >
                      Edit →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <button style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#0A0A0F', color: '#E8E0D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0 rgba(10,10,15,0.3)', padding: '12px 0', cursor: 'pointer', width: '100%' }}>
            + Upload New Agent
          </button>
        </div>
      )}

      {/* ── Saved ───────────────────────────────────────────────────────── */}
      {activeTab === 'saved' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {MOCK_SAVED.map(item => {
            const headerBg = TYPE_HEADER[item.category] ?? '#F5D76E'
            return (
              <div
                key={item.id}
                style={{
                  border: '2px solid #0A0A0F',
                  boxShadow: '4px 4px 0 #0A0A0F',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#FEFBF5',
                  transition: 'transform 120ms ease, box-shadow 120ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translate(-2px,-2px)'; el.style.boxShadow = '6px 6px 0 #0A0A0F' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ''; el.style.boxShadow = '4px 4px 0 #0A0A0F' }}
              >
                <div style={{ background: headerBg, padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <CartoonAvatar index={parseInt(item.id) - 1} size={70} />
                  <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(10,10,15,0.5)' }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '14px 16px 16px' }}>
                  <div style={{ fontFamily: AKT, fontSize: 14, fontWeight: 700, color: '#0A0A0F', marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A', marginBottom: 10 }}>by {item.creator}</div>
                  <button style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: '#0A0A0F', color: '#E8E0D0', border: '2px solid #0A0A0F', boxShadow: `3px 3px 0 ${headerBg}`, padding: '8px 14px', cursor: 'pointer', width: '100%', transition: 'transform 60ms ease, box-shadow 60ms ease' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(1px,1px)'; el.style.boxShadow = `2px 2px 0 ${headerBg}` }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = `3px 3px 0 ${headerBg}` }}
                  >
                    DEPLOY →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Activity ─────────────────────────────────────────────────────── */}
      {activeTab === 'activity' && (
        <div style={{ border: '2px solid #0A0A0F', boxShadow: '3px 3px 0 #0A0A0F' }}>
          {MOCK_ACTIVITY.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px',
                borderBottom: i < MOCK_ACTIVITY.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                background: '#F0E6D0',
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7C6A9E', width: 64, flexShrink: 0 }}>{item.action}</span>
              <span style={{ fontFamily: MONO, fontSize: 13, color: '#0A0A0F', flex: 1 }}>{item.name}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A', flexShrink: 0 }}>{item.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── My Teams ─────────────────────────────────────────────────────── */}
      {activeTab === 'teams' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_TEAMS.map(team => (
            <div
              key={team.id}
              style={{
                border: '2px solid #0A0A0F', boxShadow: '3px 3px 0 #0A0A0F',
                background: '#F0E6D0', padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              }}
            >
              <div>
                <h3 style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#0A0A0F', margin: '0 0 4px' }}>{team.name}</h3>
                <div style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A' }}>{team.members} agents · {team.deploys} deploys</div>
              </div>
              <button style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', background: 'transparent', color: '#0A0A0F', border: '2px solid #0A0A0F', padding: '5px 12px', cursor: 'pointer' }}>
                Open
              </button>
            </div>
          ))}
          <Link
            href="/teams"
            style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#0A0A0F', color: '#E8E0D0', border: '2px solid #0A0A0F', boxShadow: '3px 3px 0 rgba(10,10,15,0.3)', padding: '12px 0', cursor: 'pointer', width: '100%', textAlign: 'center', textDecoration: 'none', display: 'block' }}
          >
            + Build New Team
          </Link>
        </div>
      )}
    </div>
  )
}
