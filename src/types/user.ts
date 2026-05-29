export interface Profile {
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

export interface UpdateProfileInput {
  username?: string
  display_name?: string
  bio?: string
  avatar_url?: string
  pixel_character?: string
}
