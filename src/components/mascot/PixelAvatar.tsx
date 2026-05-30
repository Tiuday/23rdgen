import type { FC } from 'react'
import { cn } from '@/lib/utils'
import type { AgentCategory } from '@/types/agent'

const CATEGORY_COLORS: Record<AgentCategory, string> = {
  agent:    '#D4521E',
  prompt:   '#7C6B9E',
  skill:    '#3A6B45',
  workflow: '#C4785A',
  team:     '#8C3A56',
  browser:  '#3A4560',
}

function AgentPixel({ c }: { c: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="0" width="1" height="1" fill={c}/>
      <rect x="4" y="1" width="1" height="1" fill={c}/>
      <rect x="2" y="2" width="8" height="5" fill={c}/>
      <rect x="3" y="3" width="2" height="2" fill="#141210"/>
      <rect x="7" y="3" width="2" height="2" fill="#141210"/>
      <rect x="3" y="3" width="1" height="1" fill="#EDE8DF" opacity="0.6"/>
      <rect x="7" y="3" width="1" height="1" fill="#EDE8DF" opacity="0.6"/>
      <rect x="3" y="6" width="6" height="1" fill="#141210"/>
      <rect x="3" y="8" width="6" height="4" fill={c}/>
      <rect x="4" y="9" width="1" height="1" fill="#141210"/>
      <rect x="7" y="9" width="1" height="1" fill="#141210"/>
    </svg>
  )
}

function PromptPixel({ c }: { c: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="1" width="11" height="7" fill={c}/>
      <rect x="1" y="0" width="9" height="1" fill={c}/>
      <rect x="1" y="8" width="9" height="1" fill={c}/>
      <rect x="1" y="9" width="3" height="1" fill={c}/>
      <rect x="1" y="10" width="2" height="1" fill={c}/>
      <rect x="1" y="11" width="1" height="1" fill={c}/>
      <rect x="2" y="3" width="7" height="1" fill="#141210" opacity="0.45"/>
      <rect x="2" y="5" width="5" height="1" fill="#141210" opacity="0.45"/>
    </svg>
  )
}

function SkillPixel({ c }: { c: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="0" width="4" height="2" fill={c}/>
      <rect x="4" y="10" width="4" height="2" fill={c}/>
      <rect x="0" y="4" width="2" height="4" fill={c}/>
      <rect x="10" y="4" width="2" height="4" fill={c}/>
      <rect x="2" y="1" width="2" height="2" fill={c}/>
      <rect x="8" y="1" width="2" height="2" fill={c}/>
      <rect x="2" y="9" width="2" height="2" fill={c}/>
      <rect x="8" y="9" width="2" height="2" fill={c}/>
      <rect x="2" y="2" width="8" height="8" fill={c}/>
      <rect x="4" y="4" width="4" height="4" fill="#141210" opacity="0.5"/>
      <rect x="5" y="5" width="2" height="2" fill={c} opacity="0.8"/>
    </svg>
  )
}

function WorkflowPixel({ c }: { c: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="3" width="4" height="4" fill={c}/>
      <rect x="1" y="4" width="2" height="2" fill="#141210" opacity="0.4"/>
      <rect x="8" y="5" width="4" height="4" fill={c}/>
      <rect x="9" y="6" width="2" height="2" fill="#141210" opacity="0.4"/>
      <rect x="4" y="4" width="2" height="1" fill={c}/>
      <rect x="6" y="3" width="1" height="3" fill={c}/>
      <rect x="7" y="4" width="1" height="1" fill={c}/>
      <rect x="0" y="0" width="2" height="2" fill={c} opacity="0.5"/>
      <rect x="10" y="10" width="2" height="2" fill={c} opacity="0.5"/>
    </svg>
  )
}

function TeamPixel({ c }: { c: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="4" height="4" fill={c}/>
      <rect x="1" y="1" width="2" height="2" fill="#141210" opacity="0.3"/>
      <rect x="0" y="5" width="4" height="6" fill={c}/>
      <rect x="8" y="0" width="4" height="4" fill={c}/>
      <rect x="9" y="1" width="2" height="2" fill="#141210" opacity="0.3"/>
      <rect x="8" y="5" width="4" height="6" fill={c}/>
      <rect x="4" y="2" width="4" height="1" fill={c} opacity="0.6"/>
      <rect x="4" y="6" width="4" height="1" fill={c} opacity="0.4"/>
    </svg>
  )
}

function BrowserPixel({ c }: { c: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 12 12" fill="none" style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="12" height="12" fill={c}/>
      <rect x="0" y="0" width="12" height="3" fill="#141210" opacity="0.55"/>
      <rect x="1" y="1" width="1" height="1" fill={c}/>
      <rect x="3" y="1" width="1" height="1" fill={c}/>
      <rect x="5" y="1" width="1" height="1" fill={c}/>
      <rect x="1" y="5" width="10" height="1" fill="#141210" opacity="0.3"/>
      <rect x="1" y="7" width="7" height="1" fill="#141210" opacity="0.3"/>
      <rect x="1" y="9" width="5" height="1" fill="#141210" opacity="0.3"/>
    </svg>
  )
}

const PIXELS: Record<AgentCategory, FC<{ c: string }>> = {
  agent:    AgentPixel,
  prompt:   PromptPixel,
  skill:    SkillPixel,
  workflow: WorkflowPixel,
  team:     TeamPixel,
  browser:  BrowserPixel,
}

interface PixelAvatarProps {
  category: AgentCategory
  className?: string
  size?: number
}

export default function PixelAvatar({ category, className, size = 36 }: PixelAvatarProps) {
  const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.agent
  const Pixel = PIXELS[category] ?? AgentPixel
  return (
    <div
      className={cn('flex items-center justify-center shrink-0', className)}
      style={{ width: size, height: size, background: 'transparent' }}
    >
      <Pixel c={color} />
    </div>
  )
}
