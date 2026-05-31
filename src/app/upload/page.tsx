'use client'
import { useState } from 'react'
import Link from 'next/link'

type AgentType = 'agent' | 'prompt' | 'skill' | 'workflow' | 'team'

interface FormState {
  name: string
  type: AgentType
  description: string
  content: string
}

interface FieldErrors {
  name?: string
  type?: string
  description?: string
  content?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ibm-mono), monospace',
  fontSize: 10,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#6A5A4A',
  marginBottom: 6,
}

const INPUT_BASE: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-ibm-mono), monospace',
  fontSize: 13,
  padding: '10px 14px',
  border: '2px solid rgba(0,0,0,0.25)',
  borderRadius: 0,
  background: '#F0E6D0',
  color: '#0A0A0F',
  outline: 'none',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',
}

const ERR_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-mono), monospace',
  fontSize: 11,
  color: '#C4622D',
  marginTop: 4,
}

export default function UploadPage() {
  const [form, setForm] = useState<FormState>({ name: '', type: 'agent', description: '', content: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [publishedId, setPublishedId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.content.trim()) e.content = 'Content is required'
    else if (form.content.trim().length < 20) e.content = 'Content must be at least 20 characters'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    setSubmitError('')

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          description: form.description,
          prompt: form.content,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setSubmitError(data.error ?? 'Something went wrong'); setStatus('error') }
      else { setPublishedId(data.id); setStatus('success') }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  function fieldStyle(name: string, hasError?: boolean): React.CSSProperties {
    return {
      ...INPUT_BASE,
      ...(focused === name ? { borderColor: '#7C6A9E', boxShadow: '0 0 0 3px rgba(124,106,158,0.12)' } : {}),
      ...(hasError ? { borderColor: '#C4622D', boxShadow: '0 0 0 3px rgba(196,98,45,0.1)' } : {}),
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px 80px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* Card wrapper */}
        <div
          style={{
            background: '#F0E6D0',
            border: '2px solid #0A0A0F',
            boxShadow: '6px 6px 0px #0A0A0F',
            padding: '36px 32px',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif',
                fontSize: 32,
                color: '#0A0A0F',
                margin: '0 0 6px',
                lineHeight: 1.15,
              }}
            >
              Share your agent
            </h1>
            <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A', margin: 0 }}>
              One form. Instant publish.
            </p>
          </div>

          {/* Success state */}
          {status === 'success' && publishedId && (
            <div
              style={{
                marginBottom: 28,
                padding: '14px 16px',
                background: '#D0EDD5',
                border: '2px solid #6B8F71',
                boxShadow: '3px 3px 0px #6B8F71',
              }}
            >
              <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#1E4D28', margin: '0 0 6px', fontWeight: 600 }}>
                Published. Share the link:
              </p>
              <Link
                href={`/browse/${publishedId}`}
                style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#7C6A9E', fontWeight: 600 }}
              >
                /browse/{publishedId}
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Name */}
            <div>
              <label style={LABEL_STYLE}>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                placeholder="What do you call it?"
                style={fieldStyle('name', !!errors.name)}
              />
              {errors.name && <p style={ERR_STYLE}>{errors.name}</p>}
            </div>

            {/* Type */}
            <div>
              <label style={LABEL_STYLE}>Type</label>
              <select
                value={form.type}
                onChange={e => set('type', e.target.value as AgentType)}
                onFocus={() => setFocused('type')}
                onBlur={() => setFocused(null)}
                style={{ ...fieldStyle('type', !!errors.type), cursor: 'pointer', appearance: 'none' }}
              >
                <option value="agent">Agent</option>
                <option value="prompt">Prompt</option>
                <option value="skill">Skill</option>
                <option value="workflow">Workflow</option>
                <option value="team">Team</option>
              </select>
              {errors.type && <p style={ERR_STYLE}>{errors.type}</p>}
            </div>

            {/* Description */}
            <div>
              <label style={LABEL_STYLE}>Short description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                onFocus={() => setFocused('description')}
                onBlur={() => setFocused(null)}
                placeholder="One sentence. What does it do?"
                style={{ ...fieldStyle('description', !!errors.description), resize: 'none' }}
              />
              {errors.description && <p style={ERR_STYLE}>{errors.description}</p>}
            </div>

            {/* Content */}
            <div>
              <label style={LABEL_STYLE}>Content</label>
              <textarea
                rows={7}
                value={form.content}
                onChange={e => set('content', e.target.value)}
                onFocus={() => setFocused('content')}
                onBlur={() => setFocused(null)}
                placeholder="Paste your full agent, prompt, or system prompt here"
                style={{ ...fieldStyle('content', !!errors.content), resize: 'none' }}
              />
              {errors.content && <p style={ERR_STYLE}>{errors.content}</p>}
            </div>

            {/* Submit error */}
            {status === 'error' && submitError && (
              <p style={ERR_STYLE}>{submitError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: status === 'loading' ? 'rgba(10,10,15,0.5)' : '#0A0A0F',
                color: '#E8E0D0',
                border: '2px solid #0A0A0F',
                boxShadow: status === 'loading' ? 'none' : '4px 4px 0px rgba(10,10,15,0.3)',
                borderRadius: 0,
                padding: '13px 0',
                width: '100%',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                marginTop: 4,
                transition: 'transform 60ms ease, box-shadow 60ms ease',
              }}
              onMouseEnter={e => {
                if (status !== 'loading') {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = 'translate(2px,2px)'
                  el.style.boxShadow = '2px 2px 0px rgba(10,10,15,0.3)'
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.transform = ''
                el.style.boxShadow = status !== 'loading' ? '4px 4px 0px rgba(10,10,15,0.3)' : 'none'
              }}
            >
              {status === 'loading' ? 'Publishing…' : 'Publish Agent'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
