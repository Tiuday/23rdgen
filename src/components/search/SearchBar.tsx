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
        'rounded-full bg-[#1C1916] border border-[#2A2520]',
        'hover:border-[#332E28] transition-colors cursor-text',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6B9E]/50',
        className,
      )}
    >
      <Search size={18} className="text-[rgba(237,232,223,0.55)] shrink-0" />
      <span className="flex-1 text-left text-[rgba(237,232,223,0.55)] text-sm">
        Search agents, prompts, skills…
      </span>
      <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-md bg-[#242018] border border-[#2A2520] text-xs text-[rgba(237,232,223,0.45)] font-sans pointer-events-none">
        ⌘K
      </kbd>
    </button>
  )
}
