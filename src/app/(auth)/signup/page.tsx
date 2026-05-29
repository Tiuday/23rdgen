'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    if (authError) {
      setError(authError.message)
    } else {
      setDone(true)
    }
  }

  const inputStyle = {
    background: '#0E0E16',
    border: '1px solid rgba(124,106,158,0.3)',
    color: '#E8E0D0',
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-[#E8E0D0] mb-3">Check your email</h1>
          <p className="text-sm" style={{ color: 'rgba(232,224,208,0.55)' }}>
            We sent a confirmation link to <strong className="text-[#E8E0D0]">{email}</strong>.
            Click it to activate your account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#E8E0D0] mb-1">Create account</h1>
        <p className="text-sm mb-8" style={{ color: 'rgba(232,224,208,0.45)' }}>
          Free forever. No credit card needed.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
          {error && <p className="text-sm" style={{ color: '#C4622D' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: '#7C6A9E', color: '#E8E0D0', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="text-sm text-center mt-6" style={{ color: 'rgba(232,224,208,0.45)' }}>
          Already have an account?{' '}
          <Link href="/login" className="text-[#A594C4] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
