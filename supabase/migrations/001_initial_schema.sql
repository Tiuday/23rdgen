-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users / Creators
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  pixel_character text default 'wizard',
  points_total integer default 0,
  points_available integer default 0,
  created_at timestamptz default now()
);

-- Agents (covers agents, prompts, skills, workflows, teams, browser)
create table public.agents (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  content text not null,
  category text not null check (category in ('agent','prompt','skill','workflow','team','browser')),
  tags text[] default '{}',
  compatible_with text[] default '{}',
  creator_id uuid references public.profiles(id) on delete cascade,
  pixel_character text not null,
  deploy_count integer default 0,
  points_per_deploy integer default 10,
  is_free boolean default true,
  is_featured boolean default false,
  quality_score float default 0,
  gemini_tags text[] default '{}',
  gemini_score float default 0,
  status text default 'active' check (status in ('active','draft','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Deployments
create table public.deployments (
  id uuid default uuid_generate_v4() primary key,
  agent_id uuid references public.agents(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  deployed_to text,
  created_at timestamptz default now()
);

-- Agentic teams
create table public.teams (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  description text,
  agent_ids uuid[] not null,
  combined_prompt text,
  creator_id uuid references public.profiles(id) on delete cascade,
  deploy_count integer default 0,
  created_at timestamptz default now()
);

-- Points ledger
create table public.points_ledger (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.profiles(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  deployment_id uuid references public.deployments(id) on delete set null,
  points integer not null,
  reason text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.deployments enable row level security;
alter table public.teams enable row level security;
alter table public.points_ledger enable row level security;

-- Profiles policies
create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Agents policies
create policy "Agents are publicly readable" on public.agents for select using (status = 'active');
create policy "Creators can insert agents" on public.agents for insert with check (auth.uid() = creator_id);
create policy "Creators can update own agents" on public.agents for update using (auth.uid() = creator_id);

-- Deployments policies
create policy "Anyone can record a deployment" on public.deployments for insert with check (true);
create policy "Users can read own deployments" on public.deployments for select using (auth.uid() = user_id);

-- Teams policies
create policy "Teams are publicly readable" on public.teams for select using (true);
create policy "Creators can insert teams" on public.teams for insert with check (auth.uid() = creator_id);

-- Points policies
create policy "Creators can read own points" on public.points_ledger for select using (auth.uid() = creator_id);

-- Indexes
create index agents_category_idx on public.agents (category);
create index agents_creator_idx on public.agents (creator_id);
create index agents_slug_idx on public.agents (slug);
create index deployments_agent_idx on public.deployments (agent_id);
create index points_creator_idx on public.points_ledger (creator_id);
