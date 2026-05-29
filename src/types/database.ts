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
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          pixel_character?: string
          points_total?: number
          points_available?: number
          created_at?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          id: string
          slug: string
          title: string
          name: string | null
          description: string
          long_description: string | null
          content: string
          category: string
          tags: string[]
          compatible_with: string[]
          creator_id: string | null
          creator_name: string | null
          pixel_character: string | null
          deploy_count: number
          points_per_deploy: number
          is_free: boolean
          is_featured: boolean
          quality_score: number
          rating: number
          gemini_tags: string[]
          gemini_score: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug?: string
          title?: string
          name?: string | null
          description: string
          long_description?: string | null
          content: string
          category: string
          tags?: string[]
          compatible_with?: string[]
          creator_id?: string | null
          creator_name?: string | null
          pixel_character?: string | null
          deploy_count?: number
          points_per_deploy?: number
          is_free?: boolean
          is_featured?: boolean
          quality_score?: number
          rating?: number
          gemini_tags?: string[]
          gemini_score?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          name?: string | null
          description?: string
          long_description?: string | null
          content?: string
          category?: string
          tags?: string[]
          compatible_with?: string[]
          creator_id?: string | null
          creator_name?: string | null
          pixel_character?: string | null
          deploy_count?: number
          points_per_deploy?: number
          is_free?: boolean
          is_featured?: boolean
          quality_score?: number
          rating?: number
          gemini_tags?: string[]
          gemini_score?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_: string]: never }
    Functions: { [_: string]: never }
    Enums: { [_: string]: never }
  }
}
