-- 23rdGen — Priority 1 schema
-- Tables: profiles, agents, deployments, reviews, messages
-- Plus: new-user -> profile trigger, deploy (+10 points) RPC, rating recompute trigger, RLS.

-- ─────────────────────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique,
  -- ⚠️ SEED CREATOR NAME (1 of 2). See seed.sql for the other.
  display_name text not null default 'Nakshatra Sharma',
  avatar_id    text,
  points       integer not null default 0,
  created_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- AGENTS  (agents / prompts / skills / workflows / teams)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.agents (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  type           text not null check (type in ('agent','prompt','skill','workflow','team')),
  category       text,
  description    text,
  prompt         text,
  code           text,
  avatar_id      text,
  deployed_count integer not null default 0,
  rating         numeric(2,1) not null default 0,
  creator_id     uuid references public.profiles (id) on delete set null,
  created_at     timestamptz not null default now()
);

create index if not exists agents_type_idx     on public.agents (type);
create index if not exists agents_category_idx on public.agents (category);
create index if not exists agents_creator_idx  on public.agents (creator_id);

-- ─────────────────────────────────────────────────────────────
-- DEPLOYMENTS  (one row per deploy; drives +10 points)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.deployments (
  id         uuid primary key default gen_random_uuid(),
  agent_id   uuid not null references public.agents (id) on delete cascade,
  user_id    uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- REVIEWS  (rating recomputed by trigger)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  agent_id   uuid not null references public.agents (id) on delete cascade,
  user_id    uuid not null references public.profiles (id) on delete cascade,
  rating     integer not null check (rating between 1 and 5),
  body       text,
  created_at timestamptz not null default now(),
  unique (agent_id, user_id)
);

-- ─────────────────────────────────────────────────────────────
-- MESSAGES  ("message the author")
-- ─────────────────────────────────────────────────────────────
create table if not exists public.messages (
  id            uuid primary key default gen_random_uuid(),
  agent_id      uuid not null references public.agents (id) on delete cascade,
  from_user_id  uuid not null references public.profiles (id) on delete cascade,
  to_creator_id uuid not null references public.profiles (id) on delete cascade,
  body          text not null,
  created_at    timestamptz not null default now()
);

-- ═════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═════════════════════════════════════════════════════════════

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', 'Nakshatra Sharma'),
    new.raw_user_meta_data ->> 'username'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.deploy_agent(p_agent_id uuid)
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  v_user_id    uuid := auth.uid();
  v_creator_id uuid;
  v_new_count  integer;
begin
  if v_user_id is null then
    raise exception 'auth required';
  end if;

  select creator_id into v_creator_id from public.agents where id = p_agent_id;
  if not found then
    raise exception 'agent not found';
  end if;

  insert into public.deployments (agent_id, user_id) values (p_agent_id, v_user_id);

  update public.agents
     set deployed_count = deployed_count + 1
   where id = p_agent_id
   returning deployed_count into v_new_count;

  if v_creator_id is not null then
    update public.profiles set points = points + 10 where id = v_creator_id;
  end if;

  return v_new_count;
end;
$$;

create or replace function public.recompute_agent_rating()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_agent_id uuid := coalesce(new.agent_id, old.agent_id);
begin
  update public.agents
     set rating = coalesce(
       (select round(avg(rating)::numeric, 1) from public.reviews where agent_id = v_agent_id),
       0
     )
   where id = v_agent_id;
  return null;
end;
$$;

drop trigger if exists on_review_change on public.reviews;
create trigger on_review_change
  after insert or update or delete on public.reviews
  for each row execute function public.recompute_agent_rating();

-- ═════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═════════════════════════════════════════════════════════════
alter table public.profiles    enable row level security;
alter table public.agents      enable row level security;
alter table public.deployments enable row level security;
alter table public.reviews     enable row level security;
alter table public.messages    enable row level security;

create policy "profiles readable"      on public.profiles for select using (true);
create policy "profiles update own"    on public.profiles for update using (auth.uid() = id);

create policy "agents readable"        on public.agents for select using (true);
create policy "agents insert own"      on public.agents for insert with check (auth.uid() = creator_id);
create policy "agents update own"      on public.agents for update using (auth.uid() = creator_id);
create policy "agents delete own"      on public.agents for delete using (auth.uid() = creator_id);

create policy "deployments insert own" on public.deployments for insert with check (auth.uid() = user_id);
create policy "deployments read own"   on public.deployments for select using (auth.uid() = user_id);

create policy "reviews readable"       on public.reviews for select using (true);
create policy "reviews insert own"     on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews update own"     on public.reviews for update using (auth.uid() = user_id);
create policy "reviews delete own"     on public.reviews for delete using (auth.uid() = user_id);

create policy "messages insert own"    on public.messages for insert with check (auth.uid() = from_user_id);
create policy "messages read own"      on public.messages for select using (auth.uid() = from_user_id or auth.uid() = to_creator_id);
