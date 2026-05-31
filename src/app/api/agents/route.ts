import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const AGENT_SELECT =
  "*, creator:profiles!agents_creator_id_fkey (username, display_name, avatar_id)";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  let query = supabase.from("agents").select(AGENT_SELECT).order("created_at", { ascending: false });

  if (type) query = query.eq("type", type);
  if (category) query = query.eq("category", category);
  if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "auth required" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.type) {
    return NextResponse.json({ error: "name and type are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agents")
    .insert({
      name: body.name,
      type: body.type,
      category: body.category ?? null,
      description: body.description ?? null,
      prompt: body.prompt ?? null,
      code: body.code ?? null,
      avatar_id: body.avatar_id ?? null,
      creator_id: user.id,
    })
    .select(AGENT_SELECT)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
