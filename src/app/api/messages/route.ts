import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth required" }, { status: 401 });

  const payload = await req.json().catch(() => null);
  if (!payload?.agent_id || !payload?.body?.trim()) {
    return NextResponse.json({ error: "agent_id and body are required" }, { status: 400 });
  }

  const { data: agent, error: agentErr } = await supabase
    .from("agents")
    .select("creator_id")
    .eq("id", payload.agent_id)
    .single();

  if (agentErr || !agent?.creator_id) {
    return NextResponse.json({ error: "agent or creator not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      agent_id: payload.agent_id,
      from_user_id: user.id,
      to_creator_id: agent.creator_id,
      body: payload.body.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
