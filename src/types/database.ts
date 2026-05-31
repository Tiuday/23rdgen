export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string
          avatar_id: string | null
          points: number
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string
          avatar_id?: string | null
          points?: number
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string
          avatar_id?: string | null
          points?: number
          created_at?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          id: string
          name: string
          type: string
          category: string | null
          description: string | null
          prompt: string | null
          code: string | null
          avatar_id: string | null
          deployed_count: number
          rating: number
          creator_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          category?: string | null
          description?: string | null
          prompt?: string | null
          code?: string | null
          avatar_id?: string | null
          deployed_count?: number
          rating?: number
          creator_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          category?: string | null
          description?: string | null
          prompt?: string | null
          code?: string | null
          avatar_id?: string | null
          deployed_count?: number
          rating?: number
          creator_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      deployments: {
        Row: {
          id: string
          agent_id: string
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          user_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          agent_id: string
          user_id: string
          rating: number
          body: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          user_id: string
          rating: number
          body?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          user_id?: string
          rating?: number
          body?: string | null
          created_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          agent_id: string
          from_user_id: string
          to_creator_id: string
          body: string
          created_at: string
        }
        Insert: {
          id?: string
          agent_id: string
          from_user_id: string
          to_creator_id: string
          body: string
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string
          from_user_id?: string
          to_creator_id?: string
          body?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_: string]: never }
    Functions: {
      deploy_agent: {
        Args: { p_agent_id: string }
        Returns: number
      }
    }
    Enums: { [_: string]: never }
  }
}
