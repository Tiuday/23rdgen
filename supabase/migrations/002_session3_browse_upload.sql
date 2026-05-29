-- Migration 002: Add fields for session 3 browse/upload flow

-- New display columns
ALTER TABLE public.agents
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS creator_name text,
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS rating numeric(3,2) DEFAULT 0;

-- Back-fill name from title for existing rows
UPDATE public.agents SET name = title WHERE name IS NULL;

-- Make auth-coupled columns optional so anonymous upload works
ALTER TABLE public.agents
  ALTER COLUMN creator_id DROP NOT NULL,
  ALTER COLUMN slug SET DEFAULT '',
  ALTER COLUMN pixel_character SET DEFAULT 'robot',
  ALTER COLUMN title SET DEFAULT '';

-- Allow anyone to insert agents (anonymous upload)
DROP POLICY IF EXISTS "Creators can insert agents" ON public.agents;
CREATE POLICY "Anyone can insert agents" ON public.agents
  FOR INSERT WITH CHECK (true);

-- Allow anyone to increment deploy_count (fire-and-forget from detail page)
CREATE POLICY "Anyone can update deploy_count" ON public.agents
  FOR UPDATE USING (true) WITH CHECK (true);

-- Index on name for search
CREATE INDEX IF NOT EXISTS agents_name_idx ON public.agents (name);
CREATE INDEX IF NOT EXISTS agents_rating_idx ON public.agents (rating DESC);
