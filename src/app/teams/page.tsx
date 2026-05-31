'use client'
import { useState, useRef, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ── Types ─────────────────────────────────────────────────────────────────────

type LibraryTab = 'agents' | 'skills' | 'prompts' | 'workflows'

interface LibraryItem {
  id: string
  type: LibraryTab
  name: string
  description: string
  systemPrompt: string
}

interface CanvasCard extends LibraryItem {
  instanceId: string
}

// ── Color palette per type ────────────────────────────────────────────────────

const TYPE_COLORS: Record<LibraryTab, { bg: string; text: string; border: string }> = {
  agents:    { bg: '#F5D76E', text: '#2A1A0E', border: '#B8960C' },
  skills:    { bg: '#B5EAD7', text: '#1E4D28', border: '#6B8F71' },
  prompts:   { bg: '#A8D8EA', text: '#1E2E50', border: '#5A6A7A' },
  workflows: { bg: '#E8A0BF', text: '#4A1E2A', border: '#A05060' },
}

// ── Seed library data ─────────────────────────────────────────────────────────

const SEED_DATA: LibraryItem[] = [
  // AGENTS
  { id: 'ag1', type: 'agents', name: 'Code Review Wizard', description: 'Analyzes PRs for bugs, security vulnerabilities, and quality.', systemPrompt: 'You are an expert code reviewer. Analyze the provided code for bugs, security vulnerabilities, and quality issues. Provide structured feedback with severity levels (critical/high/medium/low) and specific improvement suggestions.' },
  { id: 'ag2', type: 'agents', name: 'SEO Content Machine', description: 'Generates SEO-optimized blog posts from keyword lists.', systemPrompt: 'You are an SEO content expert. Generate well-structured, keyword-rich content that ranks in search engines while remaining engaging and valuable to readers. Include proper heading hierarchy and meta descriptions.' },
  { id: 'ag3', type: 'agents', name: 'Research Conductor', description: 'Multi-step workflow synthesizing research into reports.', systemPrompt: 'You are a research analyst. Conduct thorough research, synthesize findings from multiple sources, and produce structured reports with citations. Always note the confidence level of your findings.' },
  { id: 'ag4', type: 'agents', name: 'Bug Hunter Pro', description: 'Scans code for bug patterns, null pointer risks, exceptions.', systemPrompt: 'You are a bug detection specialist. Systematically scan code for off-by-one errors, null pointer dereferences, race conditions, and silent failures. Provide detailed reports with reproduction steps and suggested fixes.' },
  { id: 'ag5', type: 'agents', name: 'Market Radar', description: 'Tracks competitor moves, industry shifts, and trends.', systemPrompt: 'You are a market intelligence analyst. Monitor competitor strategies, industry news, and emerging trends. Deliver concise briefings with actionable insights organized by priority and business impact.' },
  { id: 'ag6', type: 'agents', name: 'Pitch Deck Writer', description: 'Creates investor-ready pitch decks from a simple brief.', systemPrompt: 'You are a startup pitch expert. Transform brief inputs into compelling investor presentations covering problem, solution, market size, business model, traction, team, and funding ask.' },
  { id: 'ag7', type: 'agents', name: 'Cold Email Machine', description: 'Writes high-converting cold email sequences.', systemPrompt: 'You are a cold email copywriting expert. Write personalized, high-converting sequences tailored to specific industries and buyer personas. Focus on clarity, brevity, and a single compelling CTA per email.' },
  { id: 'ag8', type: 'agents', name: 'LinkedIn Post Pro', description: 'Generates viral LinkedIn posts with proven hooks.', systemPrompt: 'You are a LinkedIn content strategist. Create engaging posts using storytelling, data, and personal insights with proven hook formulas and engagement-driving calls to action.' },
  { id: 'ag9', type: 'agents', name: 'Brand Voice Guide', description: 'Analyzes content and synthesizes a brand voice guide.', systemPrompt: 'You are a brand voice specialist. Analyze content samples to extract tone, vocabulary, and personality traits. Synthesize a comprehensive brand voice guide with do/don\'t examples and writing principles.' },
  { id: 'ag10', type: 'agents', name: 'Explorer Bot', description: 'Automates web navigation, extraction, and screenshots.', systemPrompt: 'You are a web automation assistant. Plan and execute web scraping, data extraction, and browser automation tasks. Handle dynamic content and complex navigation flows.' },
  { id: 'ag11', type: 'agents', name: 'SQL Craftsperson', description: 'Translates natural language to optimized SQL queries.', systemPrompt: 'You are a database query expert. Translate natural language to optimized SQL for PostgreSQL, MySQL, and SQLite. Explain query logic, suggest indexes, and identify performance bottlenecks.' },
  { id: 'ag12', type: 'agents', name: 'Content Team Lead', description: 'Coordinates SEO writer, social, email, and research.', systemPrompt: 'You are a content team orchestrator. Coordinate four specialists — SEO writer, social media scheduler, cold email writer, and research summarizer — into a unified content strategy with consistent brand voice.' },
  // SKILLS
  { id: 'sk1', type: 'skills', name: 'Web Search', description: 'Searches the internet in real time for current info.', systemPrompt: 'SKILL: Web Search — You have the ability to search the internet in real time. Use this to find current information, verify facts, and gather data from live sources. Always cite URLs and note publication dates.' },
  { id: 'sk2', type: 'skills', name: 'Memory', description: 'Retains context and information across sessions.', systemPrompt: 'SKILL: Memory — You maintain persistent memory across conversations. Store key facts, preferences, decisions, and context. Reference previous interactions when relevant and update stored information when corrections are provided.' },
  { id: 'sk3', type: 'skills', name: 'Code Executor', description: 'Runs Python and JavaScript in a sandbox.', systemPrompt: 'SKILL: Code Execution — You can execute Python and JavaScript code in a secure sandbox. Use this to run calculations, process data, test algorithms, generate files, and produce visualizations. Always show code before executing.' },
  { id: 'sk4', type: 'skills', name: 'File Reader', description: 'Parses PDFs, CSVs, spreadsheets, and documents.', systemPrompt: 'SKILL: File Reading — You can parse and extract data from PDFs, CSVs, Excel spreadsheets, Word documents, and plain text files. Extract structured data, summarize content, and answer questions about uploaded files.' },
  { id: 'sk5', type: 'skills', name: 'Email Sender', description: 'Sends emails via SMTP integration.', systemPrompt: 'SKILL: Email Sending — You can compose and send emails via SMTP. Draft professional emails, handle CC/BCC, and always confirm content with the user before sending.' },
  { id: 'sk6', type: 'skills', name: 'API Caller', description: 'Hits any REST endpoint and parses the response.', systemPrompt: 'SKILL: API Integration — You can make HTTP requests to REST APIs. Handle authentication (Bearer, API key, OAuth), parse JSON/XML responses, handle pagination, and transform data into usable formats.' },
  // PROMPTS
  { id: 'pr1', type: 'prompts', name: 'Cold Email Sequence', description: 'B2B outreach with personalized angles per email.', systemPrompt: 'Write a 5-email cold outreach sequence for [COMPANY] targeting [ICP]. Each email: unique angle, specific pain points, social proof, low-friction CTA. Keep emails 50-100 words each. Use {First Name} for personalization.' },
  { id: 'pr2', type: 'prompts', name: 'LinkedIn Hook Generator', description: 'Viral opening lines that stop the scroll.', systemPrompt: 'Generate 10 LinkedIn hooks about [TOPIC] using formats: contrarian statement, surprising statistic, story opener, lesson learned, bold prediction, challenging question. Max 150 characters each. Design each to stop the scroll.' },
  { id: 'pr3', type: 'prompts', name: 'Product Description', description: 'E-commerce product copy that converts browsers.', systemPrompt: 'Write a product description for [PRODUCT]. Include: attention-grabbing headline, key benefits (not features), specific use cases, sensory language, CTA. Format for listing (150 words) and detail page (300 words). Optimize for [KEYWORDS].' },
  { id: 'pr4', type: 'prompts', name: 'Meeting Agenda', description: 'Structured agendas with outcomes and time blocks.', systemPrompt: 'Create a meeting agenda for [MEETING TYPE] with [ATTENDEES]. Include: clear objectives, time-boxed items with owners, pre-reads needed, decision vs discussion items, and success criteria. Duration: [LENGTH].' },
  // WORKFLOWS
  { id: 'wf1', type: 'workflows', name: 'Content Pipeline', description: 'Blog → Social → Email newsletter workflow.', systemPrompt: 'WORKFLOW: Content Pipeline\n\nStep 1 (RESEARCH): Research the topic and compile key insights.\nStep 2 (BLOG): Write a 1500-word SEO-optimized blog post.\nStep 3 (SOCIAL): Adapt into 3 LinkedIn posts, 5 tweets, 1 Instagram caption.\nStep 4 (EMAIL): Write a newsletter edition featuring the content.\nStep 5 (REVIEW): Check brand voice consistency across all formats.\n\nPresent each output before proceeding to the next step.' },
  { id: 'wf2', type: 'workflows', name: 'Research Report', description: 'Web search → Analysis → Formatted report.', systemPrompt: 'WORKFLOW: Research Report\n\nStep 1 (SCOPE): Define research questions and boundaries.\nStep 2 (SEARCH): Conduct multi-source web searches.\nStep 3 (ANALYZE): Identify patterns, contradictions, key insights.\nStep 4 (STRUCTURE): Executive summary, main sections, appendix.\nStep 5 (CITE): Add proper citations with confidence levels.\n\nTarget length: [LENGTH]. Flag any low-confidence claims.' },
  { id: 'wf3', type: 'workflows', name: 'Sales Funnel Builder', description: 'Lead gen → Nurture → Conversion copy workflow.', systemPrompt: 'WORKFLOW: Sales Funnel Builder\n\nStep 1 (ICP): Define ideal customer profile and pain points.\nStep 2 (AWARENESS): Lead magnet concept and landing page copy.\nStep 3 (NURTURE): 7-email nurture sequence.\nStep 4 (CONVERT): Sales page with objection handling and CTA.\nStep 5 (RETAIN): Post-purchase onboarding sequence.\n\nAdapt tone and offers to [INDUSTRY] and [PRICE POINT].' },
]

const TABS: { id: LibraryTab; label: string }[] = [
  { id: 'agents', label: 'Agents' },
  { id: 'skills', label: 'Skills' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'workflows', label: 'Workflows' },
]

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildMergedPrompt(teamName: string, cards: CanvasCard[]): string {
  if (cards.length === 0) return ''
  const name = teamName.trim() || 'My Agent Team'
  const lines: string[] = [
    `You are an agentic team called "${name}" composed of ${cards.length} specialized AI agents working in concert.\n`,
  ]
  cards.forEach((c, i) => {
    const typeLabel = c.type === 'agents' ? 'AGENT' : c.type === 'skills' ? 'SKILL' : c.type === 'prompts' ? 'PROMPT' : 'WORKFLOW'
    lines.push(`## ${typeLabel} ${i + 1}: ${c.name}`)
    lines.push(c.systemPrompt)
    lines.push('')
  })
  lines.push('## ORCHESTRATION RULES')
  lines.push('- Agents execute in the order listed above')
  lines.push('- Each agent passes its output to the next')
  lines.push('- The final agent delivers the consolidated result')
  lines.push('- If any agent cannot complete its task, it flags for human review')
  lines.push('')
  lines.push("Begin by acknowledging your team composition and awaiting the user's first instruction.")
  return lines.join('\n')
}

// ── Library draggable item ────────────────────────────────────────────────────

function LibraryDraggable({ item, inCanvas }: { item: LibraryItem; inCanvas: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: { source: 'library', item },
    disabled: inCanvas,
  })
  const c = TYPE_COLORS[item.type]
  return (
    <div
      ref={setNodeRef}
      {...(inCanvas ? {} : listeners)}
      {...(inCanvas ? {} : attributes)}
      style={{
        background: c.bg,
        border: '2px solid #0A0A0F',
        boxShadow: isDragging ? 'none' : '2px 2px 0px #0A0A0F',
        padding: '10px 12px',
        marginBottom: 8,
        cursor: inCanvas ? 'default' : isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.35 : inCanvas ? 0.42 : 1,
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-ibm-mono), monospace',
        fontSize: 9, fontWeight: 600, textTransform: 'uppercase' as const,
        letterSpacing: '0.08em', padding: '1px 6px',
        background: 'rgba(0,0,0,0.09)', color: c.text,
        border: `1px solid ${c.border}`, display: 'inline-block', marginBottom: 4,
      }}>
        {item.type.slice(0, -1)}{inCanvas ? ' ✓' : ''}
      </span>
      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, fontWeight: 600, color: '#0A0A0F', marginBottom: 2 }}>
        {item.name}
      </div>
      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#2A1A0E', lineHeight: 1.4 }}>
        {item.description}
      </div>
    </div>
  )
}

// ── Canvas sortable card ──────────────────────────────────────────────────────

interface CanvasCardProps {
  card: CanvasCard
  onRemove: () => void
  onEl: (el: HTMLDivElement | null) => void
}

function CanvasSortableCard({ card, onRemove, onEl }: CanvasCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.instanceId,
    data: { source: 'canvas' },
  })
  const c = TYPE_COLORS[card.type]

  function mergeRef(el: HTMLDivElement | null) {
    setNodeRef(el)
    onEl(el)
  }

  return (
    <div
      ref={mergeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
        width: 200,
        flexShrink: 0,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{
        background: c.bg,
        border: '2px solid #0A0A0F',
        boxShadow: '4px 4px 0px #0A0A0F',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'var(--font-ibm-mono), monospace',
            fontSize: 9, fontWeight: 600, textTransform: 'uppercase' as const,
            letterSpacing: '0.08em', padding: '1px 6px',
            background: 'rgba(0,0,0,0.09)', color: c.text, border: `1px solid ${c.border}`,
          }}>
            {card.type.slice(0, -1)}
          </span>
          <button
            onClick={onRemove}
            style={{
              background: '#0A0A0F', color: '#E8E0D0', border: 'none',
              width: 18, height: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, fontWeight: 700,
              flexShrink: 0, padding: 0, lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 14, fontWeight: 600, color: '#0A0A0F' }}>
          {card.name}
        </div>
        <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#2A1A0E', lineHeight: 1.4 }}>
          {card.description}
        </div>
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          style={{ textAlign: 'center', color: '#A89880', fontSize: 16, cursor: 'grab', paddingTop: 4, touchAction: 'none', userSelect: 'none' }}
        >
          ⠿
        </div>
      </div>
    </div>
  )
}

// ── Canvas drop zone ──────────────────────────────────────────────────────────

function CanvasDropZone({ children, hasCards }: { children: React.ReactNode; hasCards: boolean }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'canvas-droppable' })
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: 24,
        border: isOver ? '2px dashed #7C6A9E' : '2px dashed transparent',
        background: isOver ? 'rgba(124,106,158,0.05)' : 'transparent',
        transition: 'border 0.15s ease, background 0.15s ease',
        position: 'relative',
        overflow: 'auto',
        minHeight: 0,
      }}
    >
      {!hasCards && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: isOver ? 0.7 : 0.35, pointerEvents: 'none', transition: 'opacity 0.15s ease',
        }}>
          <div style={{ fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif', fontSize: 80, color: '#7C6A9E', lineHeight: 1 }}>+</div>
          <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#2A1A0E', marginTop: 12, textAlign: 'center', lineHeight: 1.6 }}>
            Drag agents and skills here<br />to build your team
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

// ── Drag overlay card (shown while dragging) ──────────────────────────────────

function DragCard({ item }: { item: LibraryItem }) {
  const c = TYPE_COLORS[item.type]
  return (
    <div style={{
      background: c.bg, border: '2px solid #0A0A0F', boxShadow: '6px 6px 0px rgba(10,10,15,0.3)',
      padding: '10px 12px', width: 200, cursor: 'grabbing', opacity: 0.92,
    }}>
      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, fontWeight: 600, color: '#0A0A0F' }}>{item.name}</div>
      <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#2A1A0E', marginTop: 2 }}>{item.description}</div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function TeamsPage() {
  const [tab, setTab] = useState<LibraryTab>('agents')
  const [search, setSearch] = useState('')
  const [canvasCards, setCanvasCards] = useState<CanvasCard[]>([])
  const [teamName, setTeamName] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const cardElMap = useRef<Map<string, HTMLDivElement>>(new Map())
  const [svgLines, setSvgLines] = useState<[number, number, number, number][]>([])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  // Recompute SVG connection lines after each canvas change
  useEffect(() => {
    if (!canvasWrapRef.current || canvasCards.length < 2) {
      setSvgLines([])
      return
    }
    const raf = requestAnimationFrame(() => {
      if (!canvasWrapRef.current) return
      const wrap = canvasWrapRef.current.getBoundingClientRect()
      const lines: [number, number, number, number][] = []
      for (let i = 0; i < canvasCards.length - 1; i++) {
        const el1 = cardElMap.current.get(canvasCards[i].instanceId)
        const el2 = cardElMap.current.get(canvasCards[i + 1].instanceId)
        if (el1 && el2) {
          const r1 = el1.getBoundingClientRect()
          const r2 = el2.getBoundingClientRect()
          lines.push([
            r1.left - wrap.left + r1.width / 2,
            r1.top - wrap.top + r1.height / 2,
            r2.left - wrap.left + r2.width / 2,
            r2.top - wrap.top + r2.height / 2,
          ])
        }
      }
      setSvgLines(lines)
    })
    return () => cancelAnimationFrame(raf)
  }, [canvasCards])

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id.toString())
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over) return

    const source = active.data.current?.source
    const overId = over.id.toString()

    if (source === 'library') {
      const onCanvas = overId === 'canvas-droppable' || canvasCards.some(c => c.instanceId === overId)
      if (onCanvas) {
        const item = active.data.current?.item as LibraryItem
        if (item && !canvasCards.some(c => c.id === item.id)) {
          setCanvasCards(prev => [...prev, { ...item, instanceId: `${item.id}-${Date.now()}` }])
        }
      }
    } else if (source === 'canvas' && active.id !== over.id) {
      setCanvasCards(prev => {
        const oldIdx = prev.findIndex(c => c.instanceId === active.id)
        const newIdx = prev.findIndex(c => c.instanceId === over.id)
        return oldIdx !== -1 && newIdx !== -1 ? arrayMove(prev, oldIdx, newIdx) : prev
      })
    }
  }

  function removeCard(instanceId: string) {
    cardElMap.current.delete(instanceId)
    setCanvasCards(prev => prev.filter(c => c.instanceId !== instanceId))
  }

  function handleCopy() {
    navigator.clipboard.writeText(mergedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredLibrary = SEED_DATA.filter(i => i.type === tab).filter(i =>
    !search.trim() ||
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.description.toLowerCase().includes(search.toLowerCase())
  )

  const canvasItemIds = canvasCards.map(c => c.instanceId)
  const inCanvasIds = new Set(canvasCards.map(c => c.id))

  // Resolve drag overlay item
  const activeLibrary = activeId ? SEED_DATA.find(i => i.id === activeId) : null
  const activeCanvas = activeId ? canvasCards.find(c => c.instanceId === activeId) : null
  const activeItem = activeLibrary || activeCanvas

  const mergedPrompt = buildMergedPrompt(teamName, canvasCards)

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        {/* ── LEFT PANEL: Library ─────────────────────────────────────────── */}
        <div style={{
          width: 340, flexShrink: 0,
          background: 'rgba(240,230,208,0.96)',
          borderRight: '2px solid #0A0A0F',
          display: 'flex', flexDirection: 'column',
          height: '100%', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '20px 16px 12px', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#7C6A9E', marginBottom: 10 }}>
              Drag to Build Team
            </div>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, color: '#8A7A6A', pointerEvents: 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search library..."
                style={{ width: '100%', fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, padding: '6px 10px 6px 26px', border: '2px solid rgba(0,0,0,0.2)', borderRadius: 0, background: '#E8E0D0', color: '#0A0A0F', outline: 'none' }}
              />
            </div>
          </div>

          {/* Tab strip */}
          <div style={{ display: 'flex', borderBottom: '2px solid #0A0A0F', flexShrink: 0 }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, padding: '7px 4px',
                  fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600,
                  textTransform: 'uppercase' as const, letterSpacing: '0.06em',
                  cursor: 'pointer', border: 'none',
                  borderRight: t.id !== 'workflows' ? '1px solid rgba(0,0,0,0.12)' : 'none',
                  background: tab === t.id ? '#7C6A9E' : 'transparent',
                  color: tab === t.id ? '#E8E0D0' : '#2A1A0E',
                  transition: 'background 100ms ease, color 100ms ease',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Scrollable library list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 16px' }} className="scrollbar-none">
            {filteredLibrary.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 12, color: '#8A7A6A', padding: '16px 0' }}>
                No results.
              </div>
            ) : (
              filteredLibrary.map(item => (
                <LibraryDraggable key={item.id} item={item} inCanvas={inCanvasIds.has(item.id)} />
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Canvas ─────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', overflow: 'hidden' }}>

          {/* Canvas top bar */}
          <div style={{
            padding: '14px 20px',
            borderBottom: '2px solid rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
            background: 'rgba(240,230,208,0.7)',
          }}>
            <input
              type="text"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              placeholder="Name your team..."
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13,
                width: 200, padding: '5px 10px',
                border: '2px solid rgba(0,0,0,0.2)', borderRadius: 0,
                background: '#F0E6D0', color: '#0A0A0F', outline: 'none',
              }}
            />
            <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11, color: '#7C6A9E', whiteSpace: 'nowrap' }}>
              TEAM CANVAS · {canvasCards.length} member{canvasCards.length !== 1 ? 's' : ''}
            </span>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => { cardElMap.current.clear(); setCanvasCards([]) }}
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                background: 'transparent', color: '#0A0A0F',
                border: '2px solid #0A0A0F', boxShadow: '2px 2px 0px rgba(10,10,15,0.2)',
                padding: '5px 12px', cursor: 'pointer', borderRadius: 0,
              }}
              onMouseDown={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = 'none' }}
              onMouseUp={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '2px 2px 0px rgba(10,10,15,0.2)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '2px 2px 0px rgba(10,10,15,0.2)' }}
            >
              Clear
            </button>
            <button
              onClick={() => canvasCards.length > 0 && setDrawerOpen(true)}
              disabled={canvasCards.length === 0}
              style={{
                fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                background: canvasCards.length > 0 ? '#7C6A9E' : 'rgba(124,106,158,0.35)',
                color: '#E8E0D0',
                border: '2px solid #0A0A0F',
                boxShadow: canvasCards.length > 0 ? '3px 3px 0px #0A0A0F' : 'none',
                padding: '5px 14px', cursor: canvasCards.length > 0 ? 'pointer' : 'not-allowed', borderRadius: 0,
                transition: 'background 100ms ease',
              }}
              onMouseDown={e => { if (canvasCards.length > 0) { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = 'none' } }}
              onMouseUp={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = canvasCards.length > 0 ? '3px 3px 0px #0A0A0F' : 'none' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = canvasCards.length > 0 ? '3px 3px 0px #0A0A0F' : 'none' }}
            >
              Convert to Prompt ▶
            </button>
          </div>

          {/* Drop zone + sortable cards */}
          <CanvasDropZone hasCards={canvasCards.length > 0}>
            <div
              ref={canvasWrapRef}
              style={{
                position: 'relative',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                alignContent: 'flex-start',
              }}
            >
              {/* SVG connection lines */}
              {svgLines.length > 0 && (
                <svg
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 0 }}
                >
                  <style>{`
                    @keyframes dashFlow { to { stroke-dashoffset: -20; } }
                    .pipe-line { animation: dashFlow 1.5s linear infinite; }
                  `}</style>
                  {svgLines.map(([x1, y1, x2, y2], i) => (
                    <line key={i} className="pipe-line" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7C6A9E" strokeWidth="1.5" strokeDasharray="6 4" />
                  ))}
                </svg>
              )}
              {/* Sortable cards */}
              <SortableContext items={canvasItemIds} strategy={rectSortingStrategy}>
                {canvasCards.map(card => (
                  <CanvasSortableCard
                    key={card.instanceId}
                    card={card}
                    onRemove={() => removeCard(card.instanceId)}
                    onEl={el => {
                      if (el) cardElMap.current.set(card.instanceId, el)
                      else cardElMap.current.delete(card.instanceId)
                    }}
                  />
                ))}
              </SortableContext>
            </div>
          </CanvasDropZone>
        </div>

        {/* ── Drag overlay ────────────────────────────────────────────────── */}
        <DragOverlay dropAnimation={null}>
          {activeItem ? <DragCard item={activeItem} /> : null}
        </DragOverlay>
      </div>

      {/* ── Convert to Prompt drawer ─────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="md:left-[220px] left-0"
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 300,
            height: 380,
            background: '#F0E6D0',
            borderTop: '2px solid #0A0A0F',
            boxShadow: '0 -4px 0px #0A0A0F',
            display: 'flex',
            flexDirection: 'column',
            animation: 'drawerUp 0.3s ease-out',
          }}
        >
          <style>{`@keyframes drawerUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

          {/* Drawer header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#7C6A9E' }}>
              Generated Team Prompt
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              style={{ background: '#0A0A0F', color: '#E8E0D0', border: 'none', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}
            >
              ×
            </button>
          </div>

          {/* Drawer body: two columns */}
          <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
            {/* Left: prompt textarea */}
            <div style={{ flex: 1, padding: '16px 16px 16px 20px', minWidth: 0 }}>
              <textarea
                readOnly
                value={mergedPrompt}
                style={{
                  width: '100%', height: '100%',
                  fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 11,
                  background: '#1A0A0A', color: '#E8E0D0',
                  border: '2px solid #0A0A0F', borderRadius: 0,
                  padding: 14, resize: 'none', outline: 'none',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Right: deploy buttons */}
            <div style={{ width: 220, flexShrink: 0, padding: '16px 20px 16px 8px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
              {[
                { label: copied ? '✓ COPIED!' : '📋 COPY PROMPT', bg: copied ? '#6B8F71' : '#0A0A0F', color: '#E8E0D0', action: handleCopy },
                { label: '⚡ OPEN IN CLAUDE', bg: '#7C6A9E', color: '#E8E0D0', action: () => window.open(`https://claude.ai/new?q=${encodeURIComponent(mergedPrompt)}`, '_blank') },
                { label: '💬 OPEN IN CHATGPT', bg: '#2A6A3A', color: '#E8E0D0', action: () => window.open(`https://chat.openai.com/?q=${encodeURIComponent(mergedPrompt)}`, '_blank') },
                { label: '✦ OPEN IN GEMINI', bg: '#C4622D', color: '#E8E0D0', action: () => window.open(`https://gemini.google.com/app?q=${encodeURIComponent(mergedPrompt)}`, '_blank') },
              ].map(btn => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  style={{
                    fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                    background: btn.bg, color: btn.color,
                    border: '2px solid #0A0A0F', boxShadow: '3px 3px 0px #0A0A0F',
                    borderRadius: 0, padding: '9px 12px', cursor: 'pointer', width: '100%',
                    transition: 'transform 60ms ease, box-shadow 60ms ease',
                  }}
                  onMouseDown={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = 'translate(2px,2px)'; el.style.boxShadow = 'none' }}
                  onMouseUp={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '3px 3px 0px #0A0A0F' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ''; el.style.boxShadow = '3px 3px 0px #0A0A0F' }}
                >
                  {btn.label}
                </button>
              ))}
              <div style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 9, color: '#7C6A9E', textAlign: 'center', marginTop: 4, lineHeight: 1.5 }}>
                Free: max 3 agents · Builder: max 10<br />Forge: unlimited
              </div>
            </div>
          </div>
        </div>
      )}
    </DndContext>
  )
}
