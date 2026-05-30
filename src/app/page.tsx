'use client'
import { useState } from 'react'
import Link from 'next/link'
import SearchModal from '@/components/search/SearchModal'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import HeroTree from '@/components/HeroTree'
import AgentCardsSection from '@/components/sections/AgentCardsSection'

const NAV_ITEMS = [
  { label: 'Browse All', href: '/browse' },
  { label: 'Agents', href: '/browse?category=agent' },
  { label: 'Prompts', href: '/browse?category=prompt' },
  { label: 'Skills', href: '/browse?category=skill' },
  { label: 'Workflows', href: '/browse?category=workflow' },
  { label: 'Teams', href: '/browse?category=team' },
  { label: 'Creators', href: '/browse?category=creator' },
]

const TICKER_ITEMS = ['Claude', 'ChatGPT', 'Gemini', 'n8n', 'Cursor', 'Windsurf', 'Make', 'Zapier', 'LangChain', 'AutoGen']

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .hero-tree-abs { display: none !important; }
          .hero-left { max-width: 560px !important; margin: 0 auto !important; text-align: center !important; }
          .hero-search { margin-left: auto !important; margin-right: auto !important; }
          .hero-btns { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-h1 { font-size: clamp(40px, 12vw, 64px) !important; }
        }
      `}</style>

      {/* ── TOP NAVIGATION ─────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 48,
        background: 'rgba(14, 14, 20, 0.97)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(124, 106, 158, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        {/* Wordmark */}
        <Link href="/" style={{
          fontSize: 15,
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          color: '#E8E0D0',
          textDecoration: 'none',
          fontWeight: 600,
          flexShrink: 0,
          letterSpacing: '0.02em',
        }}>23rdGen</Link>

        {/* Nav links — centered */}
        <div className="nav-links" style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 13,
                fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                color: '#A89880',
                textDecoration: 'none',
                padding: '5px 10px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                transition: 'color 120ms',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8E0D0')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#A89880')}
            >
              <span style={{ display: 'inline-block', width: 6, height: 6, background: '#7C6A9E', flexShrink: 0 }} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Link href="/login" style={{
            fontSize: 13,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#A89880',
            textDecoration: 'none',
            padding: '4px 12px',
            letterSpacing: '0.04em',
          }}>Log in</Link>

          <Link href="/signup" style={{
            fontSize: 12,
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            color: '#E8E0D0',
            background: '#7C6A9E',
            textDecoration: 'none',
            padding: '10px 20px',
            border: '2px solid #E8E0D0',
            boxShadow: '2px 2px 0px #E8E0D0',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'inline-block',
            borderRadius: 0,
            transition: 'box-shadow 80ms, transform 80ms',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #E8E0D0'; el.style.transform = 'translate(1px,1px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '2px 2px 0px #E8E0D0'; el.style.transform = 'translate(0,0)' }}
          >Sign Up</Link>
        </div>
      </nav>

      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 48,
        overflow: 'hidden',
      }}>
        {/* Left column */}
        <div className="hero-left" style={{
          width: '45%',
          paddingLeft: '6vw',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Eyebrow tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            border: '1px solid #7C6A9E',
            background: 'rgba(124, 106, 158, 0.1)',
            padding: '4px 12px',
            borderRadius: 0,
            marginBottom: 28,
          }}>
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              color: '#7C6A9E',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>● Open marketplace for deployable intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{
            fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            fontSize: 'clamp(3.2rem, 5.5vw, 5rem)',
            lineHeight: 1.05,
            color: '#0A0A0F',
            margin: 0,
            letterSpacing: 0,
            fontWeight: 400,
          }}>
            Step Into<br />
            <AnimatedTextCycle
              words={['Artificial', 'Agentic', 'Conscious', 'Automated', 'Intelligent']}
              interval={3000}
              className="text-[#7C6A9E]"
            />
            <br />
            Consciousness.
          </h1>

          {/* Sub-copy */}
          <p style={{
            fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
            fontSize: 14,
            lineHeight: 1.7,
            color: '#2A1A0E',
            margin: '2.5rem 0 0 0',
            maxWidth: 420,
          }}>
            Create AI agents, agentic teams, workflows and skills.<br />
            Embed them into your workflow. Save time. Earn automatically.
          </p>

          {/* Search bar */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hero-search"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              maxWidth: 420,
              height: 44,
              padding: '0 14px',
              background: '#F0E6D0',
              border: '2px solid #0A0A0F',
              boxShadow: '3px 3px 0px #0A0A0F',
              borderRadius: 0,
              cursor: 'text',
              marginTop: '2rem',
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              transition: 'box-shadow 80ms, transform 80ms',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
              <circle cx="6.5" cy="6.5" r="5" stroke="#0A0A0F" strokeWidth="1.5"/>
              <path d="M10.5 10.5L13.5 13.5" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ flex: 1, textAlign: 'left', fontSize: 13, color: 'rgba(10,10,15,0.38)', letterSpacing: '0.01em' }}>
              Search agents, prompts, skills, workflows...
            </span>
            <kbd style={{
              display: 'flex', alignItems: 'center',
              padding: '2px 6px',
              background: '#E8E0D0',
              border: '2px solid #0A0A0F',
              borderRadius: 0,
              fontSize: 11,
              color: 'rgba(10,10,15,0.45)',
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              flexShrink: 0,
            }}>⌘K</kbd>
          </button>

          {/* CTA buttons */}
          <div className="hero-btns" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href="/browse" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              color: '#E8E0D0', background: '#7C6A9E',
              border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F',
              borderRadius: 0, padding: '12px 28px',
              transition: 'box-shadow 80ms, transform 80ms',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
            >Browse Agents</Link>

            <Link href="/upload" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              color: '#0A0A0F', background: '#F0E6D0',
              border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F',
              borderRadius: 0, padding: '12px 28px',
              transition: 'box-shadow 80ms, transform 80ms',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '1px 1px 0px #0A0A0F'; el.style.transform = 'translate(2px,2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '3px 3px 0px #0A0A0F'; el.style.transform = 'translate(0,0)' }}
            >Upload Yours</Link>
          </div>
        </div>

        {/* Absolutely positioned tree */}
        <div className="hero-tree-abs">
          <HeroTree />
        </div>
      </section>

      {/* ── SECTION 2: Agent Cards ─────────────────────────────── */}
      <AgentCardsSection />

      {/* ── BOTTOM TICKER ─────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 36,
        background: '#0A0A0F',
        borderTop: '1px solid rgba(124, 106, 158, 0.4)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Static label */}
        <span style={{
          fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#7C6A9E',
          padding: '0 20px',
          flexShrink: 0,
          borderRight: '1px solid rgba(124,106,158,0.3)',
          marginRight: 8,
          whiteSpace: 'nowrap',
        }}>WORKS WITH:</span>

        {/* Scrolling content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'ticker-scroll 25s linear infinite',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}>
          {[0, 1].map(rep => (
            <span key={rep} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {TICKER_ITEMS.map((item, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-ibm-mono), IBM Plex Mono, monospace',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#D4C9A8',
                    padding: '0 18px',
                    flexShrink: 0,
                  }}>{item}</span>
                  {i < TICKER_ITEMS.length - 1 && (
                    <span style={{ color: '#7C6A9E', fontSize: 16, flexShrink: 0 }}>·</span>
                  )}
                </span>
              ))}
              <span style={{ color: '#7C6A9E', fontSize: 16, padding: '0 18px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
