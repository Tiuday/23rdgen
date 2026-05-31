'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/(auth)/actions'

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

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const result = await signup(formData)
    setLoading(false)
    if (result?.error) { setError(result.error) }
    else { setDone(true) }
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

  if (done) {
    return (
      <div style={DOT_BG}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ border: '2px solid #0A0A0F', boxShadow: '6px 6px 0 #0A0A0F', overflow: 'hidden' }}>
            {/* Title bar */}
            <div style={{ background: '#2A1E3E', padding: '0 12px', height: 34, display: 'flex', alignItems: 'center', position: 'relative', borderBottom: '2px solid #0A0A0F' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56', border: '1px solid rgba(0,0,0,0.3)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', border: '1px solid rgba(0,0,0,0.3)' }} />
              </div>
              <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A89880' }}>
                signup
              </span>
            </div>
            <div style={{ background: '#F0E6D0', padding: '32px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>📬</div>
              <h1 style={{ fontFamily: SERIF, fontSize: 24, color: '#0A0A0F', margin: '0 0 10px' }}>
                Check your email
              </h1>
              <p style={{ fontFamily: MONO, fontSize: 12, color: '#4A3A2A', lineHeight: 1.65, margin: 0 }}>
                We sent a confirmation link to{' '}
                <strong style={{ color: '#0A0A0F' }}>{email}</strong>.
                Click it to activate your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={DOT_BG}>
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
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56', border: '1px solid rgba(0,0,0,0.3)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', border: '1px solid rgba(0,0,0,0.3)' }} />
            </div>
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
              signup
            </span>
          </div>

          {/* Window body */}
          <div style={{ padding: '28px 28px 32px' }}>
            <h1 style={{ fontFamily: SERIF, fontSize: 26, color: '#0A0A0F', margin: '0 0 6px', lineHeight: 1.15 }}>
              Join 23rdGen!
            </h1>
            <p style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A', margin: '0 0 26px', letterSpacing: '0.02em' }}>
              Free forever. No credit card needed.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
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

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontFamily: MONO, fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5A4A3A', marginBottom: 5 }}>
                  Password <span style={{ color: '#8A7A6A', textTransform: 'none', letterSpacing: 0 }}>(min 6 chars)</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
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
                {loading ? 'Creating account…' : 'Create Account →'}
              </button>
            </form>

            <p style={{ fontFamily: MONO, fontSize: 11, color: '#8A7A6A', textAlign: 'center', margin: '20px 0 0' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#7C6A9E', fontWeight: 600, textDecoration: 'none' }}>
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
