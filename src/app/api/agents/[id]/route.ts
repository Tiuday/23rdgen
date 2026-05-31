import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const AGENT_SELECT =
  "*, creator:profiles!agents_creator_id_fkey (username, display_name, avatar_id)";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any;
  const { data, error } = await supabase
    .from("agents")
    .select(AGENT_SELECT)
    .eq("id", params.id)
    .single();

  if (error) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(data);
}
