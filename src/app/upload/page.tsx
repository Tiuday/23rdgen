'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Category = 'agent' | 'prompt' | 'skill' | 'workflow'

interface FormState {
  name: string
  category: Category
  description: string
  content: string
  creator_name: string
}

interface FieldErrors {
  name?: string
  category?: string
  description?: string
  content?: string
  creator_name?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const PIXEL_CHAR: Record<Category, string> = {
  agent: 'robot',
  prompt: 'scroll',
  skill: 'gear',
  workflow: 'arrows',
}

function makeSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 48) +
    '-' +
    Date.now().toString(36)
  )
}

const LABEL =
  'block text-[10px] uppercase tracking-widest mb-1.5 font-medium'
const LABEL_COLOR = { color: 'rgba(232,224,208,0.65)' }
const INPUT_BASE =
  'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all'
const INPUT_STYLE = {
  background: '#0E0E16',
  border: '1px solid rgba(124,106,158,0.3)',
  color: '#E8E0D0',
}
const INPUT_FOCUS_STYLE = {
  border: '1px solid rgba(124,106,158,0.65)',
  boxShadow: '0 0 0 3px rgba(124,106,158,0.1)',
}
const ERR_STYLE = { color: '#C4622D', fontSize: '0.75rem', marginTop: '0.375rem' }

export default function UploadPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    category: 'agent',
    description: '',
    content: '',
    creator_name: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [publishedId, setPublishedId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState('')

  // Track focused field for visual ring
  const [focused, setFocused] = useState<string | null>(null)

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.category) e.category = 'Category is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.content.trim()) e.content = 'Content is required'
    else if (form.content.trim().length < 20)
      e.content = 'Content must be at least 20 characters'
    if (!form.creator_name.trim()) e.creator_name = 'Your name is required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('loading')
    setSubmitError('')

    try {
      const supabase = createClient()
      const slug = makeSlug(form.name)

      const { data, error } = await supabase
        .from('agents')
        .insert({
          name: form.name,
          title: form.name,
          category: form.category,
          description: form.description,
          content: form.content,
          creator_name: form.creator_name,
          slug,
          pixel_character: PIXEL_CHAR[form.category],
          deploy_count: 0,
          status: 'active',
        })
        .select('id')
        .single()

      if (error) {
        setSubmitError(error.message)
        setStatus('error')
      } else {
        setPublishedId(data.id)
        setStatus('success')
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  function fieldStyle(name: string, hasError?: boolean) {
    return {
      ...INPUT_STYLE,
      ...(focused === name ? INPUT_FOCUS_STYLE : {}),
      ...(hasError
        ? { borderColor: 'rgba(196,98,45,0.55)', boxShadow: '0 0 0 3px rgba(196,98,45,0.08)' }
        : {}),
    }
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-[560px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#E8E0D0] mb-2">Share your agent</h1>
          <p className="text-sm" style={{ color: 'rgba(232,224,208,0.45)' }}>
            One form. Instant publish.
          </p>
        </div>

        {/* Success state */}
        {status === 'success' && publishedId && (
          <div
            className="mb-8 px-5 py-4 rounded-xl border"
            style={{
              background: 'rgba(107,143,113,0.08)',
              borderColor: 'rgba(107,143,113,0.3)',
            }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: '#6B8F71' }}>
              Published.{' '}
              <span style={{ color: 'rgba(232,224,208,0.6)', fontWeight: 400 }}>
                Share the link:
              </span>
            </p>
            <Link
              href={`/browse/${publishedId}`}
              className="text-sm font-medium underline underline-offset-2"
              style={{ color: '#A594C4' }}
            >
              /browse/{publishedId}
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className={LABEL} style={LABEL_COLOR}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              placeholder="What do you call it?"
              className={INPUT_BASE}
              style={fieldStyle('name', !!errors.name)}
            />
            {errors.name && <p style={ERR_STYLE}>{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={LABEL} style={LABEL_COLOR}>
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={e => set('category', e.target.value as Category)}
              onFocus={() => setFocused('category')}
              onBlur={() => setFocused(null)}
              className={INPUT_BASE + ' cursor-pointer appearance-none'}
              style={fieldStyle('category', !!errors.category)}
            >
              <option value="agent">Agent</option>
              <option value="prompt">Prompt</option>
              <option value="skill">Skill</option>
              <option value="workflow">Workflow</option>
            </select>
            {errors.category && <p style={ERR_STYLE}>{errors.category}</p>}
          </div>

          {/* Short description */}
          <div>
            <label htmlFor="description" className={LABEL} style={LABEL_COLOR}>
              Short description
            </label>
            <textarea
              id="description"
              rows={2}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              onFocus={() => setFocused('description')}
              onBlur={() => setFocused(null)}
              placeholder="One sentence. What does it do?"
              className={INPUT_BASE + ' resize-none'}
              style={fieldStyle('description', !!errors.description)}
            />
            {errors.description && <p style={ERR_STYLE}>{errors.description}</p>}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className={LABEL} style={LABEL_COLOR}>
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              value={form.content}
              onChange={e => set('content', e.target.value)}
              onFocus={() => setFocused('content')}
              onBlur={() => setFocused(null)}
              placeholder="Paste your full agent, prompt, or system prompt here"
              className={INPUT_BASE + ' resize-none'}
              style={fieldStyle('content', !!errors.content)}
            />
            {errors.content && <p style={ERR_STYLE}>{errors.content}</p>}
          </div>

          {/* Creator name */}
          <div>
            <label htmlFor="creator_name" className={LABEL} style={LABEL_COLOR}>
              Your name
            </label>
            <input
              id="creator_name"
              type="text"
              value={form.creator_name}
              onChange={e => set('creator_name', e.target.value)}
              onFocus={() => setFocused('creator_name')}
              onBlur={() => setFocused(null)}
              placeholder="How should we credit you?"
              className={INPUT_BASE}
              style={fieldStyle('creator_name', !!errors.creator_name)}
            />
            {errors.creator_name && <p style={ERR_STYLE}>{errors.creator_name}</p>}
          </div>

          {/* Submit error */}
          {status === 'error' && submitError && (
            <p className="text-sm" style={ERR_STYLE}>
              {submitError}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded-full text-sm font-semibold transition-all mt-1"
            style={{
              background: status === 'loading' ? 'rgba(124,106,158,0.5)' : '#7C6A9E',
              color: '#E8E0D0',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? 'Publishing…' : 'Publish'}
          </button>
        </form>
      </div>
    </div>
  )
}
