'use client'
import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

const CATEGORIES = [
  { id: 'all',      label: 'All' },
  { id: 'agent',    label: 'Agents' },
  { id: 'prompt',   label: 'Prompts' },
  { id: 'skill',    label: 'Skills' },
  { id: 'workflow', label: 'Workflows' },
  { id: 'team',     label: 'Teams' },
  { id: 'browser',  label: 'Browser' },
]

const TRENDING = ['Code Review', 'SEO Writer', 'Data Analyst', 'Research Bot', 'Email Draft', 'SQL Helper', 'Unit Tests', 'Cover Letter']

const QUICK_ITEMS = [
  { title: 'Code Review Agent',  category: 'agent' },
  { title: 'SEO Content Writer', category: 'prompt' },
  { title: 'Data Analysis Flow', category: 'workflow' },
  { title: 'Research Assistant', category: 'agent' },
  { title: 'SQL Query Builder',  category: 'skill' },
  { title: 'Browser Automator',  category: 'browser' },
]

const CATEGORY_DOT: Record<string, string> = {
  agent:    '#D4521E',
  prompt:   '#7C6B9E',
  skill:    '#3A6B45',
  workflow: '#C4785A',
  team:     '#8C3A56',
  browser:  '#3A4560',
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    } else {
      setQuery('')
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(20,18,16,0.72)] backdrop-blur-sm"
        onMouseDown={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[720px] rounded-[16px] bg-[#1C1916] border border-[#332E28] shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Input row */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-[#2A2520]">
          <Search size={17} className="text-[rgba(237,232,223,0.45)] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search agents, prompts, skills…"
            className="flex-1 bg-transparent text-sm text-[#EDE8DF] placeholder:text-[rgba(237,232,223,0.4)] outline-none"
          />
          <button
            onClick={onClose}
            className="text-[rgba(237,232,223,0.45)] hover:text-[#EDE8DF] transition-colors p-0.5"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="flex" style={{ minHeight: 320 }}>
          {/* Left sidebar */}
          <div className="w-44 shrink-0 border-r border-[#2A2520] p-3 flex flex-col gap-0.5">
            <p className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-widest px-2 py-1.5 mb-0.5">
              Filter
            </p>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[rgba(124,107,158,0.15)] text-[#A594C4]'
                    : 'text-[rgba(237,232,223,0.55)] hover:bg-[#242018] hover:text-[#EDE8DF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div className="flex-1 p-4 overflow-y-auto">
            {query === '' ? (
              <>
                <p className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-widest mb-3">
                  Trending
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {TRENDING.map(tag => (
                    <button
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#242018] border border-[#2A2520] text-xs text-[#EDE8DF] hover:border-[#332E28] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-widest mb-3">
                  Quick Browse
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ITEMS.map(item => (
                    <button
                      key={item.title}
                      className="text-left px-3 py-2.5 rounded-[14px] bg-[#242018] border border-[#2A2520] hover:border-[#332E28] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: CATEGORY_DOT[item.category] }}
                        />
                        <span className="text-[10px] text-[rgba(237,232,223,0.4)] uppercase tracking-wider capitalize">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-[#EDE8DF]">{item.title}</div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-[rgba(237,232,223,0.4)] text-sm">
                Searching for &ldquo;{query}&rdquo;…
              </div>
            )}
          </div>
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-5 px-5 py-2.5 border-t border-[#2A2520]">
          {[['↵', 'select'], ['↑↓', 'navigate'], ['esc', 'close']].map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5 text-xs text-[rgba(237,232,223,0.35)]">
              <kbd className="font-mono">{key}</kbd>
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
