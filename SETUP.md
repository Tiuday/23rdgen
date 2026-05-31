# 23rdGen — Priority 1 backend

Drop-in files. Standard Next.js 14 App Router paths — move them if your repo differs. No UI changed.

## Files
```
.env.local.example
middleware.ts                      # refreshes session every request
lib/supabase/client.ts             # browser client
lib/supabase/server.ts             # server client (RSC / routes / actions)
lib/supabase/admin.ts              # service-role (server only)
lib/supabase/middleware.ts         # session helper used by middleware.ts
lib/types.ts                       # table types + TYPE_ACCENT map
lib/queries.ts                     # getAgents / getAgent / getCurrentProfile / getReviews
app/(auth)/actions.ts              # signup / login / signout server actions
app/api/agents/route.ts            # GET (?type=&category=&q=) + POST
app/api/agents/[id]/route.ts       # GET one
app/api/agents/[id]/deploy/route.ts
app/api/agents/[id]/review/route.ts
app/api/messages/route.ts
supabase/migrations/0001_init.sql  # tables + RLS + functions/triggers
supabase/seed.sql                  # seed creator + 15 agents (3 per type)
```

## Run
```bash
pnpm add @supabase/supabase-js @supabase/ssr
cp .env.local.example .env.local      # fill in keys
supabase db reset                     # runs migration + seed locally
# or push the migration to your hosted project:
supabase db push
```

## Wiring into existing pages (the parts I couldn't touch blind)

**/login, /signup** — point the existing form fields at the actions:
```tsx
import { login } from "@/app/(auth)/actions";
<form action={login}>  {/* fields: name="email", name="password" */}
```
(`signup` also reads optional `name="username"`.)

**Browse page** — replace hardcoded list:
```tsx
import { getAgents } from "@/lib/queries";
const agents = await getAgents({ type, category, q: searchParams.q });
```

**Agent detail** — `getAgent(id)` + `getReviews(id)`. Deploy button → `POST /api/agents/${id}/deploy`. Message-the-author → `POST /api/messages`.

**Profile** — `getCurrentProfile()` returns `{ profile, agents }` (real avatar_id + points).

**Upload form** — `POST /api/agents` with `{ name, type, category, description, prompt, code, avatar_id }`.

**Search bar** — navigate to `/browse?q=${query}`; browse already reads `?q=`.

## Points & rating
- +10 to creator per deploy — handled atomically in `deploy_agent()`.
- `agents.rating` = avg of reviews — recomputed by the `on_review_change` trigger. Routes never set it manually.

## Notes
- `seed.sql` inserts an `auth.users` row (needs the `pgcrypto` ext — on by default in Supabase) so seed agents have a real creator FK. For a hosted prod seed, create the founder account via signup, then update its `display_name`/`username`.
- ⚠️ Seed creator name is set in two spots (marked in `0001_init.sql` default + `seed.sql`). One-line swap once you confirm Vrish vs Nakshatra Sharma.
