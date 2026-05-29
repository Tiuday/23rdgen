export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          pixel_character: string
          points_total: number
          points_available: number
          created_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          pixel_character?: string
          points_total?: number
          points_available?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      agents: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          content: string
          category: string
          tags: string[]
          compatible_with: string[]
          creator_id: string
          pixel_character: string
          deploy_count: number
          points_per_deploy: number
          is_free: boolean
          is_featured: boolean
          quality_score: number
          gemini_tags: string[]
          gemini_score: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          content: string
          category: string
          tags?: string[]
          compatible_with?: string[]
          creator_id: string
          pixel_character: string
          deploy_count?: number
          points_per_deploy?: number
          is_free?: boolean
          is_featured?: boolean
          quality_score?: number
          gemini_tags?: string[]
          gemini_score?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['agents']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
