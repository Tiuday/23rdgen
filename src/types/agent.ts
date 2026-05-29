export type AgentCategory = 'agent' | 'prompt' | 'skill' | 'workflow' | 'team' | 'browser'

export type CompatiblePlatform = 'claude' | 'chatgpt' | 'gemini' | 'n8n' | 'other'

export type AgentStatus = 'active' | 'draft' | 'archived'

// Core agent shape matching the Supabase agents table
export interface Agent {
  id: string
  name: string
  category: AgentCategory
  description: string
  long_description?: string | null
  content: string
  creator_name: string
  deploy_count: number
  rating: number
  tags: string[]
  created_at: string
}

// Extended with creator profile join
export interface AgentWithCreator extends Agent {
  profiles: {
    username: string
    display_name: string | null
    avatar_url: string | null
    pixel_character: string
  }
}

export interface CreateAgentInput {
  name: string
  description: string
  long_description?: string
  content: string
  category: AgentCategory
  creator_name: string
  tags?: string[]
}
