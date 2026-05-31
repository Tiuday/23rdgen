import { createClient } from "@/lib/supabase/server";
import type { AgentType } from "@/lib/types";

const AGENT_SELECT =
  "*, creator:profiles!agents_creator_id_fkey (username, display_name, avatar_id)";

export async function getAgents(opts: { type?: string; category?: string; q?: string } = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  let query = supabase.from("agents").select(AGENT_SELECT).order("created_at", { ascending: false });

  if (opts.type) query = query.eq("type", opts.type);
  if (opts.category) query = query.eq("category", opts.category);
  if (opts.q) query = query.or(`name.ilike.%${opts.q}%,description.ilike.%${opts.q}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getAgent(id: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data, error } = await supabase.from("agents").select(AGENT_SELECT).eq("id", id).single();
  if (error) return null;
  return data;
}

export async function getCurrentProfile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: agents } = await supabase
    .from("agents")
    .select(AGENT_SELECT)
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false });

  return { profile, agents: agents ?? [] };
}

export async function getReviews(agentId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data } = await supabase
    .from("reviews")
    .select("*, user:profiles!reviews_user_id_fkey (username, display_name, avatar_id)")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAgentsByType(type: AgentType, limit = 3) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data } = await supabase
    .from("agents")
    .select(AGENT_SELECT)
    .eq("type", type)
    .order("deployed_count", { ascending: false })
    .limit(limit);
  return data ?? [];
}
