'use client'
import Link from 'next/link'

const MOCK_CREATORS = [
  { handle: 'devtools_hq',  name: 'DevTools HQ',   uploads: 12, deploys: 18420, specialty: 'Code & Engineering' },
  { handle: 'marketers',    name: 'Marketers Co',   uploads: 8,  deploys: 9800,  specialty: 'Content & SEO' },
  { handle: 'dataeng',      name: 'Data Engineers', uploads: 6,  deploys: 14200, specialty: 'Data & Analytics' },
  { handle: 'researchers',  name: 'Researchers',    uploads: 5,  deploys: 4200,  specialty: 'Research & Reports' },
  { handle: 'salescraft',   name: 'SalesCraft',     uploads: 9,  deploys: 11000, specialty: 'Sales & Outreach' },
  { handle: 'contentguild', name: 'Content Guild',  uploads: 7,  deploys: 7800,  specialty: 'Social & Brand' },
  { handle: 'strategos',    name: 'Strategos',      uploads: 4,  deploys: 3900,  specialty: 'Strategy & Market' },
  { handle: 'foundry',      name: 'Foundry Labs',   uploads: 6,  deploys: 6200,  specialty: 'Startups & Pitch' },
]

const EMOJIS = ['🧙','🧝','🧚','🤖','👾','👻','🥷','🧑‍🚀']

export default function CreatorsPage() {
  return (
    <div style={{ minHeight: '100vh', maxWidth: 960, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif',
          fontSize: 36, color: '#0A0A0F', margin: '0 0 8px', lineHeight: 1.15,
        }}
      >
        Top Creators
      </h1>
      <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A', margin: '0 0 36px' }}>
        The builders behind the best agents on 23rdGen.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {MOCK_CREATORS.map((creator, i) => (
          <div
            key={creator.handle}
            style={{
              background: '#F0E6D0',
              border: '2px solid #0A0A0F',
              boxShadow: '4px 4px 0px #0A0A0F',
              padding: '20px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              transition: 'transform 60ms ease, box-shadow 60ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = 'translate(2px,2px)'
              el.style.boxShadow = '2px 2px 0px #0A0A0F'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement
              el.style.transform = ''
              el.style.boxShadow = '4px 4px 0px #0A0A0F'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 48, height: 48,
                  background: '#E8DCC8',
                  border: '2px solid #0A0A0F',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}
              >
                {EMOJIS[i % EMOJIS.length]}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, fontWeight: 700, color: '#0A0A0F' }}>
                  {creator.name}
                </div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#8A7A6A' }}>
                  @{creator.handle}
                </div>
              </div>
            </div>

            {/* Specialty */}
            <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#4A3A2A', padding: '4px 10px', background: '#E8DCC8', border: '1px solid rgba(0,0,0,0.12)', display: 'inline-block', alignSelf: 'flex-start' }}>
              {creator.specialty}
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 18, fontWeight: 700, color: '#0A0A0F' }}>{creator.uploads}</div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, color: '#8A7A6A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Uploads</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 18, fontWeight: 700, color: '#C4622D' }}>{(creator.deploys / 1000).toFixed(1)}k</div>
                <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, color: '#8A7A6A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Deploys</div>
              </div>
            </div>

            {/* Link */}
            <Link
              href={`/browse?creator=${creator.handle}`}
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#7C6A9E', textDecoration: 'none',
                borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 12, marginTop: 2,
              }}
            >
              View agents →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
