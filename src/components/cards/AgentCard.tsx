import type { AgentCategory } from '@/types/agent'
import PixelAvatar from '@/components/mascot/PixelAvatar'

const BADGE: Record<AgentCategory, { bg: string; text: string; border: string }> = {
  agent:    { bg: 'rgba(212,82,30,0.12)',   text: '#D4521E', border: 'rgba(212,82,30,0.25)' },
  prompt:   { bg: 'rgba(124,107,158,0.15)', text: '#A594C4', border: 'rgba(124,107,158,0.3)' },
  skill:    { bg: 'rgba(58,107,69,0.15)',   text: '#3A6B45', border: 'rgba(58,107,69,0.3)' },
  workflow: { bg: 'rgba(196,120,90,0.12)',  text: '#C4785A', border: 'rgba(196,120,90,0.25)' },
  team:     { bg: 'rgba(140,58,86,0.12)',   text: '#8C3A56', border: 'rgba(140,58,86,0.25)' },
  browser:  { bg: 'rgba(58,69,96,0.15)',    text: '#6B7CA8', border: 'rgba(58,69,96,0.3)' },
}

interface AgentCardData {
  id: string
  title: string
  description: string
  category: AgentCategory
  deploy_count: number
  points_per_deploy: number
  creator?: string
}

interface AgentCardProps {
  agent: AgentCardData
}

export default function AgentCard({ agent }: AgentCardProps) {
  const badge = BADGE[agent.category] ?? BADGE.agent

  return (
    <div className="group flex flex-col gap-3 p-4 rounded-[14px] bg-[#1C1916] border border-[#2A2520] hover:border-[#332E28] hover:bg-[#242018] transition-all duration-200 cursor-pointer">
      {/* Header */}
      <div className="flex items-start gap-3">
        <PixelAvatar category={agent.category} />
        <div className="flex-1 min-w-0 pt-0.5">
          <span
            className="inline-block text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize mb-1"
            style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}
          >
            {agent.category}
          </span>
          <h3 className="text-sm font-semibold text-[#EDE8DF] leading-snug truncate">
            {agent.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[rgba(237,232,223,0.55)] leading-relaxed line-clamp-2">
        {agent.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-1.5 text-xs text-[rgba(237,232,223,0.45)]">
          <span>{agent.deploy_count.toLocaleString()} deploys</span>
          <span>·</span>
          <span className="text-[#A594C4] font-medium">{agent.points_per_deploy}pts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="text-xs px-2.5 py-1 rounded-full border border-[#332E28] text-[rgba(237,232,223,0.55)] hover:text-[#EDE8DF] hover:border-[rgba(237,232,223,0.2)] transition-colors">
            Copy
          </button>
          <button className="text-xs px-2.5 py-1 rounded-full bg-[#7C6B9E] text-[#EDE8DF] hover:bg-[#A594C4] transition-colors">
            Deploy
          </button>
        </div>
      </div>
    </div>
  )
}
