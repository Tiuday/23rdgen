-- 23rdGen seed data. Run after 0001_init.sql.
-- Works with `supabase db reset` (local) which runs migrations then this file.
--
-- ⚠️ SEED CREATOR NAME (2 of 2): change 'Nakshatra Sharma' below + the default in 0001_init.sql.

insert into auth.users (instance_id, id, aud, role, email, encrypted_password,
                        email_confirmed_at, created_at, updated_at,
                        raw_app_meta_data, raw_user_meta_data)
values (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-0000000000aa',
  'authenticated', 'authenticated',
  'seed@23rdgen.com',
  crypt('seed-disabled-login', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Nakshatra Sharma","username":"nakshatra"}'
)
on conflict (id) do nothing;

insert into public.profiles (id, username, display_name, avatar_id, points)
values ('00000000-0000-0000-0000-0000000000aa', 'nakshatra', 'Nakshatra Sharma', 'avatar_founder', 0)
on conflict (id) do update
  set username = excluded.username,
      display_name = excluded.display_name,
      avatar_id = excluded.avatar_id;

-- ── AGENTS (#F5D76E) ──────────────────────────────────────────
insert into public.agents (name, type, category, description, prompt, avatar_id, creator_id) values
('Inbox Zero Agent', 'agent', 'productivity',
 'Triages your inbox: sorts, drafts replies, flags what needs you.',
 'You are an inbox triage agent. For each email, classify it as [Reply Needed], [FYI], [Spam], or [Schedule]. For [Reply Needed], draft a concise reply in my voice. For [Schedule], extract the proposed time and add it to a list. Summarize the rest in one line each. Ask before sending anything.',
 'avatar_inbox', '00000000-0000-0000-0000-0000000000aa'),
('Cold Outreach Agent', 'agent', 'sales',
 'Researches a lead and writes a personalized first-touch email.',
 'You are a B2B outreach agent. Given a prospect name, company, and role, research their company''s recent news and pain points, then write a 90-word cold email: a specific hook tied to their work, one line on the value we provide, and a soft CTA. No buzzwords. Output subject + body only.',
 'avatar_outreach', '00000000-0000-0000-0000-0000000000aa'),
('Bug Repro Agent', 'agent', 'engineering',
 'Turns a vague bug report into a minimal reproduction and root-cause hypothesis.',
 'You are a debugging agent. Given a bug report and stack trace, (1) restate the expected vs actual behavior, (2) list the most likely root causes ranked by probability, (3) produce the smallest code snippet that reproduces it, and (4) propose a fix with a test. Ask for missing context before guessing.',
 'avatar_bug', '00000000-0000-0000-0000-0000000000aa');

-- ── PROMPTS (#A8D8EA) ─────────────────────────────────────────
insert into public.agents (name, type, category, description, prompt, avatar_id, creator_id) values
('Plain-English Explainer', 'prompt', 'writing',
 'Rewrites any jargon-heavy text so a smart 12-year-old gets it.',
 'Rewrite the following text in plain English. Keep every fact, drop every buzzword. Use short sentences and concrete examples. If a term is unavoidable, define it in five words or fewer the first time. Target a smart 12-year-old. Return only the rewrite.',
 'avatar_explain', '00000000-0000-0000-0000-0000000000aa'),
('Decision Memo Prompt', 'prompt', 'business',
 'Structures a messy decision into a one-page memo with a recommendation.',
 'Turn my notes into a one-page decision memo with these sections: Decision to make, Options (2-4, each with pros/cons), Recommendation (pick one, say why in 3 sentences), and Risks. Be opinionated. End with the single next action.',
 'avatar_memo', '00000000-0000-0000-0000-0000000000aa'),
('Socratic Tutor Prompt', 'prompt', 'education',
 'Teaches any topic by asking questions instead of lecturing.',
 'Be a Socratic tutor for the topic I name. Never give the answer outright. Ask one focused question at a time, adapt to my replies, and only confirm understanding once I can explain it back. If I''m stuck twice, give a small hint, not the answer.',
 'avatar_tutor', '00000000-0000-0000-0000-0000000000aa');

-- ── SKILLS (#B5EAD7) ──────────────────────────────────────────
insert into public.agents (name, type, category, description, prompt, code, avatar_id, creator_id) values
('CSV Cleaner Skill', 'skill', 'data',
 'Detects and fixes common CSV messes: bad headers, mixed types, dupes.',
 'You are a data-cleaning skill. Given a CSV, detect header row, infer column types, flag and fix: duplicate rows, inconsistent date formats, stray whitespace, and mixed numeric/string columns. Return the cleaned CSV plus a short changelog of what you fixed.',
 'def clean_csv(path):\n    import pandas as pd\n    df = pd.read_csv(path)\n    df = df.drop_duplicates()\n    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]\n    return df',
 'avatar_csv', '00000000-0000-0000-0000-0000000000aa'),
('Meeting Notes Skill', 'skill', 'productivity',
 'Converts a raw transcript into decisions, action items, and owners.',
 'You are a meeting-notes skill. From a transcript, output three sections: Decisions (bullet each), Action Items (owner — task — due date), and Open Questions. Attribute action items to the person who committed. Ignore small talk.',
 null,
 'avatar_notes', '00000000-0000-0000-0000-0000000000aa'),
('SQL Translator Skill', 'skill', 'data',
 'Turns a plain-English question into a safe, read-only SQL query.',
 'You are a SQL skill. Given a schema and a plain-English question, return a single read-only SELECT query (no writes/DDL). Use explicit column names, add LIMIT 100 unless told otherwise, and one comment line explaining the query. Refuse anything that mutates data.',
 null,
 'avatar_sql', '00000000-0000-0000-0000-0000000000aa');

-- ── WORKFLOWS (#E8A0BF) ───────────────────────────────────────
insert into public.agents (name, type, category, description, prompt, code, avatar_id, creator_id) values
('Content Repurpose Flow', 'workflow', 'marketing',
 'One blog post -> tweet thread, LinkedIn post, and newsletter blurb.',
 'Workflow: (1) Read the source post and extract the 3 core ideas. (2) Write a 7-tweet thread (hook first). (3) Write a LinkedIn post (story + lesson + CTA). (4) Write a 120-word newsletter blurb. Keep the author''s voice consistent across all four.',
 null,
 'avatar_repurpose', '00000000-0000-0000-0000-0000000000aa'),
('Support Triage Flow', 'workflow', 'support',
 'Classifies a ticket, drafts a reply, and routes escalations.',
 'Workflow: (1) Classify the incoming ticket: Billing / Bug / How-to / Feature request. (2) Set priority P1-P3. (3) Draft a reply matching the category. (4) If P1 or Bug, produce an escalation summary for engineering with repro steps. Output JSON: {category, priority, reply, escalation}.',
 null,
 'avatar_support', '00000000-0000-0000-0000-0000000000aa'),
('Weekly Review Flow', 'workflow', 'productivity',
 'Pulls the week''s notes into a review + next-week plan.',
 'Workflow: (1) Summarize what got done this week from my notes. (2) List what slipped and why. (3) Surface 3 wins and 1 lesson. (4) Propose next week''s top 3 priorities with a first action each. Keep it under 300 words.',
 null,
 'avatar_review', '00000000-0000-0000-0000-0000000000aa');

-- ── TEAMS (#C9B1FF) ───────────────────────────────────────────
insert into public.agents (name, type, category, description, prompt, code, avatar_id, creator_id) values
('Launch Squad', 'team', 'marketing',
 'A 3-agent team that takes a product to a launch-ready campaign.',
 'Team of three. Researcher: gather positioning + competitor angles. Copywriter: turn research into landing copy + 5 ad variants. Editor: tighten everything to one consistent voice and flag weak claims. Run in order; Editor has final say. Output the campaign pack.',
 null,
 'avatar_launch', '00000000-0000-0000-0000-0000000000aa'),
('Research Pod', 'team', 'research',
 'Planner + Searcher + Synthesizer for deep-dive briefs.',
 'Team of three. Planner: break the question into sub-questions. Searcher: answer each with sources. Synthesizer: merge into a structured brief with a confidence note per claim and a list of open gaps. Planner reviews the brief before it ships.',
 null,
 'avatar_pod', '00000000-0000-0000-0000-0000000000aa'),
('Ship-It Dev Team', 'team', 'engineering',
 'Architect + Coder + Reviewer that turns a spec into reviewed code.',
 'Team of three. Architect: turn the spec into a file plan and interfaces. Coder: implement each file. Reviewer: check for bugs, edge cases, and missing tests, then request changes until clean. Output final code + a short review log.',
 null,
 'avatar_shipit', '00000000-0000-0000-0000-0000000000aa');
