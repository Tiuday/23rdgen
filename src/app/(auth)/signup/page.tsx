'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-ibm-mono), monospace',
  fontSize: 13,
  padding: '11px 14px',
  border: '2px solid rgba(0,0,0,0.25)',
  borderRadius: 0,
  background: '#E8E0D0',
  color: '#0A0A0F',
  outline: 'none',
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
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    setLoading(false)
    if (authError) { setError(authError.message) }
    else { setDone(true) }
  }

  function inputStyle(name: string): React.CSSProperties {
    return {
      ...INPUT_STYLE,
      ...(focused === name ? { borderColor: '#7C6A9E', boxShadow: '0 0 0 3px rgba(124,106,158,0.12)' } : {}),
    }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#F0E6D0', border: '2px solid #0A0A0F', boxShadow: '4px 4px 0px #0A0A0F', padding: '36px 32px', maxWidth: 360, width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif', fontSize: 26, color: '#0A0A0F', margin: '0 0 12px' }}>
            Check your email
          </h1>
          <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#4A3A2A', lineHeight: 1.6, margin: 0 }}>
            We sent a confirmation link to{' '}
            <strong style={{ color: '#0A0A0F' }}>{email}</strong>.
            Click it to activate your account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div
          style={{
            background: '#F0E6D0',
            border: '2px solid #0A0A0F',
            boxShadow: '4px 4px 0px #0A0A0F',
            padding: '36px 32px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif',
              fontSize: 28,
              color: '#0A0A0F',
              margin: '0 0 6px',
              lineHeight: 1.15,
            }}
          >
            Create account
          </h1>
          <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', margin: '0 0 28px' }}>
            Free forever. No credit card needed.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              style={inputStyle('email')}
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              style={inputStyle('password')}
            />

            {error && (
              <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#C4622D', margin: 0 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: loading ? 'rgba(10,10,15,0.5)' : '#0A0A0F',
                color: '#E8E0D0',
                border: '2px solid #0A0A0F',
                boxShadow: loading ? 'none' : '3px 3px 0px rgba(10,10,15,0.3)',
                borderRadius: 0,
                padding: '12px 0',
                width: '100%',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 4,
                transition: 'transform 60ms ease, box-shadow 60ms ease',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = 'translate(1px,1px)'
                  el.style.boxShadow = '2px 2px 0px rgba(10,10,15,0.3)'
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.transform = ''
                el.style.boxShadow = loading ? 'none' : '3px 3px 0px rgba(10,10,15,0.3)'
              }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', textAlign: 'center', margin: '20px 0 0' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#7C6A9E', fontWeight: 600, textDecoration: 'none' }}>
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
