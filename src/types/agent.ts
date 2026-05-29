export type AgentCategory = 'agent' | 'prompt' | 'skill' | 'workflow' | 'team' | 'browser'

export type CompatiblePlatform = 'claude' | 'chatgpt' | 'gemini' | 'n8n' | 'other'

export type AgentStatus = 'active' | 'draft' | 'archived'

export interface Agent {
  id: string
  slug: string
  title: string
  description: string
  content: string
  category: AgentCategory
  tags: string[]
  compatible_with: CompatiblePlatform[]
  creator_id: string
  pixel_character: string
  deploy_count: number
  points_per_deploy: number
  is_free: boolean
  is_featured: boolean
  quality_score: number
  gemini_tags: string[]
  gemini_score: number
  status: AgentStatus
  created_at: string
  updated_at: string
}

export interface AgentWithCreator extends Agent {
  profiles: {
    username: string
    display_name: string | null
    avatar_url: string | null
    pixel_character: string
  }
}

export interface CreateAgentInput {
  title: string
  description: string
  content: string
  category: AgentCategory
  tags: string[]
  compatible_with: CompatiblePlatform[]
  pixel_character: string
  is_free?: boolean
}
