export type AgentType = "agent" | "prompt" | "skill" | "workflow" | "team";

export const TYPE_ACCENT: Record<AgentType, string> = {
  agent: "#F5D76E",
  prompt: "#A8D8EA",
  skill: "#B5EAD7",
  workflow: "#E8A0BF",
  team: "#C9B1FF",
};

export interface Profile {
  id: string;
  username: string | null;
  display_name: string;
  avatar_id: string | null;
  points: number;
  created_at: string;
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  category: string | null;
  description: string | null;
  prompt: string | null;
  code: string | null;
  avatar_id: string | null;
  deployed_count: number;
  rating: number;
  creator_id: string | null;
  created_at: string;
}

export interface AgentWithCreator extends Agent {
  creator: Pick<Profile, "username" | "display_name" | "avatar_id"> | null;
}

export interface Review {
  id: string;
  agent_id: string;
  user_id: string;
  rating: number;
  body: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  agent_id: string;
  from_user_id: string;
  to_creator_id: string;
  body: string;
  created_at: string;
}
