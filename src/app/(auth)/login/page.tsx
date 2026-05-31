'use client'
import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/(auth)/actions'

const MONO = 'var(--font-ibm-mono), IBM Plex Mono, monospace'
const SERIF = 'var(--font-dm-serif), DM Serif Display, serif'

const DOT_BG: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  backgroundImage: 'radial-gradient(circle, rgba(10,10,15,0.18) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  backgroundColor: '#E8E0D0',
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const result = await login(formData)
    setLoading(false)
    if (result?.error) setError(result.error)
    // On success the server action redirects — no client navigation needed.
  }

  function inputStyle(name: string): React.CSSProperties {
    return {
      width: '100%',
      fontFamily: MONO,
      fontSize: 13,
      padding: '10px 12px',
      border: focused === name ? '2px solid #7C6A9E' : '2px solid #0A0A0F',
      borderRadius: 0,
      background: '#E8DCC8',
      color: '#0A0A0F',
      outline: 'none',
      boxSizing: 'border-box',
    }
  }

  return (
    <div style={DOT_BG}>
      {/* Retro OS window */}
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div
          style={{
            border: '2px solid #0A0A0F',
            boxShadow: '6px 6px 0 #0A0A0F',
            background: '#F0E6D0',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: '#2A1E3E',
              padding: '0 12px',
              height: 34,
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              borderBottom: '2px solid #0A0A0F',
            }}
          >
            {/* Mac dots */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56', border: '1px solid rgba(0,0,0,0.3)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', border: '1px solid rgba(0,0,0,0.3)' }} />
            </div>
            {/* Centered title */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A89880',
              }}
            >
              login
            </span>
          </div>

          {/* Window body */}
          <div style={{ padding: '28px 28px 32px' }}>
            <h1 style={{ fontFamily: SERIF, fontSize: 26, color: '#0A0A0F', margin: '0 0 6px', lineHeight: 1.15 }}>
              Welcome back!
            </h1>
            <p style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A', margin: '0 0 26px', letterSpacing: '0.02em' }}>
              Sign in to deploy your agents.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Email field */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5A4A3A', marginBottom: 5 }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('email')}
                />
              </div>

              {/* Password field */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5A4A3A', marginBottom: 5 }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('password')}
                />
              </div>

              {error && (
                <p style={{ fontFamily: MONO, fontSize: 11, color: '#C4622D', margin: '0 0 12px' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  background: loading ? 'rgba(10,10,15,0.45)' : '#0A0A0F',
                  color: '#E8E0D0',
                  border: '2px solid #0A0A0F',
                  boxShadow: loading ? 'none' : '3px 3px 0 #0A0A0F',
                  borderRadius: 0,
                  padding: '12px 0',
                  width: '100%',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'transform 60ms ease, box-shadow 60ms ease',
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.transform = 'translate(1px,1px)'
                    el.style.boxShadow = '2px 2px 0 #0A0A0F'
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = ''
                  el.style.boxShadow = loading ? 'none' : '3px 3px 0 #0A0A0F'
                }}
              >
                {loading ? 'Signing in…' : 'Sign In →'}
              </button>
            </form>

            <p style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A', textAlign: 'center', margin: '20px 0 0' }}>
              No account?{' '}
              <Link href="/signup" style={{ color: '#7C6A9E', fontWeight: 600, textDecoration: 'none' }}>
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
