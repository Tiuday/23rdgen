# 23rdGen — Project Context

## What We Are Building
23rdGen is an open marketplace for deployable AI agents, prompts, skills, workflows, and agentic teams.
Builders browse, copy, and deploy intelligence directly into Claude, ChatGPT, Gemini, or any AI system.
Creators upload what they build and earn points per deployment. Points convert to real income.

## Competition Context
- Competition: Build with Gemini XPRIZE
- Prize pool: $2M
- Deadline: August 17, 2026
- Hard requirement: Google Gemini API must be the primary AI powering user-facing features

## Tech Stack (Locked — Do Not Change)
| Layer | Tool |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (Postgres + Auth + Storage) |
| Hosting | Vercel |
| Primary AI | Google Gemini API |
| Customisation AI | Anthropic Claude API |
| Payments | Stripe (Phase 3) |
| Package manager | pnpm |

## Build Phases
- Phase 1 — Foundation (Sessions 1-2): Scaffold, schema, auth, CSS tokens
- Phase 2 — Homepage (Sessions 2-3): Layout, navbar, hero, search, cards, sidebar, team builder, prompt customiser sections
- Phase 3 — Core features (Sessions 3-5): Browse page, agent detail, upload flow, deploy button, creator dashboard
- Phase 4 — AI features (Sessions 5-6): Gemini semantic search, auto-tagger, quality scorer, Claude prompt customiser, agentic team builder
- Phase 5 — Revenue + launch (Sessions 6-8): Points system, Stripe, onboarding, Vercel deploy, soft launch (r/n8n, ProductHunt)

## Brand Design System
### Colors
- Background: obsidian #141210, surface #1C1916, elevated #242018
- Text: parchment #EDE8DF (primary), parchment-muted (secondary), parchment-subtle (tertiary)
- Accent primary: violet #7C6B9E / violet-soft #A594C4
- Accent secondary: ember #D4521E
- Supporting: sage #3A6B45, clay #C4785A, rose #8C3A56, slate #3A4560
### Radius tokens
- pill: 100px, card: 14px, input: 10px, modal: 16px
### Typography
- Font: Inter (variable)
### Mascots
- Pixel art characters: wizard (default), rogue, mage, archer — one per agent category

## Agent Categories
| Value | Description |
|---|---|
| agent | Full autonomous agents |
| prompt | Single-purpose prompts |
| skill | Reusable skills and tools |
| workflow | Multi-step automation flows |
| team | Pre-built agentic teams |
| browser | Browser-use agents |

## Compatible Platforms
claude, chatgpt, gemini, n8n, other

## Points System
- Creators earn points when their agents are deployed by others
- Default: 10 points per deployment
- Points tracked in points_ledger table
- Phase 5: points convert to cash via Stripe

## Code Standards
- TypeScript strict mode — no any types
- Server components by default — use client only when needed
- All Supabase calls through src/lib/supabase/ — never raw in components
- All Gemini calls through src/lib/gemini/ — never raw in components
- cn() utility for all conditional Tailwind classes
- Commit after every completed section

## Founder
Nakshatra Sharma — direct, iterative, strong visual sense. Gives feedback session by session.
