'use client'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  onOpen: () => void
  className?: string
}

export default function SearchBar({ onOpen, className }: SearchBarProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'flex items-center gap-3 w-full h-[52px] px-5',
        'rounded-full border border-[#2A2520]',
        'hover:border-[rgba(124,107,158,0.4)] transition-colors cursor-text',
        'focus-visible:outline-none',
        className,
      )}
      style={{
        background: '#0E0E16',
      }}
      onFocus={e => {
        const el = e.currentTarget
        el.style.boxShadow = '0 0 0 2px rgba(124,107,158,0.35), 0 0 16px rgba(124,107,158,0.15)'
        el.style.borderColor = 'rgba(124,107,158,0.5)'
      }}
      onBlur={e => {
        const el = e.currentTarget
        el.style.boxShadow = ''
        el.style.borderColor = ''
      }}
    >
      <Search size={17} className="text-[rgba(237,232,223,0.45)] shrink-0" />
      <span className="flex-1 text-left text-[rgba(237,232,223,0.45)] text-sm">
        Search agents, prompts, skills, workflows...
      </span>
      <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-md bg-[#1C1916] border border-[#2A2520] text-xs text-[rgba(237,232,223,0.35)] font-sans pointer-events-none">
        ⌘K
      </kbd>
    </button>
  )
}
