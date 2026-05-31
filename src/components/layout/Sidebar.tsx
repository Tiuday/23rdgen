'use client'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  LayoutGrid,
  PenLine,
  BookOpen,
  Code2,
  Briefcase,
  Palette,
  CheckCheck,
  Upload,
  User,
  Zap,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const CATEGORY_GROUPS = [
  {
    group: 'WRITING',
    icon: PenLine,
    items: [
      { label: 'Cold Emailing',   href: '/browse?category=cold-emailing' },
      { label: 'Script Writing',  href: '/browse?category=script-writing' },
      { label: 'Blog Posts',      href: '/browse?category=blog-posts' },
      { label: 'Ad Copywriting',  href: '/browse?category=ad-copywriting' },
      { label: 'LinkedIn Posts',  href: '/browse?category=linkedin-posts' },
    ],
  },
  {
    group: 'RESEARCH',
    icon: BookOpen,
    items: [
      { label: 'Market Research',      href: '/browse?category=market-research' },
      { label: 'Competitor Analysis',  href: '/browse?category=competitor-analysis' },
      { label: 'Literature Review',    href: '/browse?category=literature-review' },
      { label: 'Trend Spotting',       href: '/browse?category=trend-spotting' },
    ],
  },
  {
    group: 'CODING',
    icon: Code2,
    items: [
      { label: 'Code Review',     href: '/browse?category=code-review' },
      { label: 'Bug Fixing',      href: '/browse?category=bug-fixing' },
      { label: 'API Integration', href: '/browse?category=api-integration' },
      { label: 'Documentation',   href: '/browse?category=documentation' },
    ],
  },
  {
    group: 'BUSINESS',
    icon: Briefcase,
    items: [
      { label: 'Sales Automation',  href: '/browse?category=sales-automation' },
      { label: 'Lead Generation',   href: '/browse?category=lead-generation' },
      { label: 'Customer Support',  href: '/browse?category=customer-support' },
      { label: 'Pitch Decks',       href: '/browse?category=pitch-decks' },
    ],
  },
  {
    group: 'CREATIVE',
    icon: Palette,
    items: [
      { label: 'Image Prompts', href: '/browse?category=image-prompts' },
      { label: 'Storytelling',  href: '/browse?category=storytelling' },
      { label: 'Brand Voice',   href: '/browse?category=brand-voice' },
      { label: 'Social Content',href: '/browse?category=social-content' },
    ],
  },
  {
    group: 'PRODUCTIVITY',
    icon: CheckCheck,
    items: [
      { label: 'Task Management',    href: '/browse?category=task-management' },
      { label: 'Meeting Summaries',  href: '/browse?category=meeting-summaries' },
      { label: 'Email Drafting',     href: '/browse?category=email-drafting' },
      { label: 'Data Analysis',      href: '/browse?category=data-analysis' },
    ],
  },
]

const BOTTOM_LINKS = [
  { label: 'Upload Agent',    href: '/upload',   icon: Upload },
  { label: 'My Profile',      href: '/profile',  icon: User },
  { label: 'Plans & Pricing', href: '/plans',    icon: Zap },
  { label: 'Team Builder',    href: '/teams',    icon: Users },
]

const INACTIVE = '#8A8A92'
const ACTIVE   = '#FFFFFF'
const HOVER_BG = '#16161C'
const ACTIVE_BG = '#16161C'
const AKT = "'Akt', system-ui, -apple-system, sans-serif"

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed,
  onClick,
  indent = false,
  showChevron = false,
}: {
  href: string
  icon?: React.ComponentType<{ size?: number }>
  label: string
  active: boolean
  collapsed: boolean
  onClick?: () => void
  indent?: boolean
  showChevron?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: indent ? '7px 10px' : '9px 12px',
        borderRadius: 12,
        textDecoration: 'none',
        fontFamily: AKT,
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        color: active ? ACTIVE : INACTIVE,
        background: active ? ACTIVE_BG : 'transparent',
        border: active ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: active ? '0 2px 8px rgba(0,0,0,0.35)' : 'none',
        marginBottom: 1,
        transition: 'background 100ms ease, color 100ms ease',
        minWidth: 0,
      }}
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = HOVER_BG
          el.style.color = '#C8C8D0'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLAnchorElement
          el.style.background = 'transparent'
          el.style.color = INACTIVE
        }
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10, minWidth: 0, flex: 1 }}>
        {Icon && <Icon size={15} />}
        {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>}
      </span>
      {!collapsed && showChevron && active && <ChevronRight size={12} />}
    </Link>
  )
}

function GroupHeader({
  group,
  icon: Icon,
  expanded,
  hasActiveChild,
  collapsed,
  onClick,
}: {
  group: string
  icon: React.ComponentType<{ size?: number }>
  expanded: boolean
  hasActiveChild: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const active = hasActiveChild
  return (
    <button
      onClick={onClick}
      title={collapsed ? group : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? 'center' : 'space-between',
        width: '100%',
        padding: '9px 12px',
        borderRadius: 12,
        border: active ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        background: active ? ACTIVE_BG : 'transparent',
        boxShadow: active ? '0 2px 8px rgba(0,0,0,0.35)' : 'none',
        cursor: collapsed ? 'default' : 'pointer',
        color: active ? ACTIVE : INACTIVE,
        fontFamily: AKT,
        fontSize: 13,
        fontWeight: 500,
        transition: 'background 100ms ease, color 100ms ease',
        marginBottom: 1,
      }}
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = HOVER_BG
          el.style.color = '#C8C8D0'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = 'transparent'
          el.style.color = INACTIVE
        }
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
        <Icon size={15} />
        {!collapsed && <span>{group}</span>}
      </span>
      {!collapsed && (expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />)}
    </button>
  )
}

function SidebarContent({
  onClose,
  collapsed,
}: {
  onClose: () => void
  collapsed: boolean
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  function isActive(href: string) {
    const [path, qs] = href.split('?')
    if (qs) {
      const p = new URLSearchParams(qs)
      return pathname === path && currentCategory === p.get('category')
    }
    return pathname === path && !currentCategory
  }

  function toggleGroup(group: string) {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(group)) next.delete(group)
      else next.add(group)
      return next
    })
  }

  const browseActive = isActive('/browse')
  const tiudayActive = isActive('/tiuday')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 0 16px' : '20px 16px 16px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <Link href="/" onClick={onClose} style={{ display: 'block', textDecoration: 'none', lineHeight: 0 }}>
          <Image
            src="/inspiration/logo.png"
            alt="23rdGen"
            width={collapsed ? 24 : 84}
            height={collapsed ? 24 : 24}
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
            priority
          />
        </Link>
      </div>

      {/* Scrollable nav area */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 8px' }} className="scrollbar-none">
        {/* Tiuday — flagship AI team builder */}
        <div style={{ marginBottom: 6 }}>
          <Link
            href="/tiuday"
            onClick={onClose}
            title={collapsed ? 'Tiuday' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: collapsed ? 0 : 10,
              justifyContent: collapsed ? 'center' : 'space-between',
              padding: '9px 12px',
              borderRadius: 12,
              textDecoration: 'none',
              fontFamily: AKT,
              fontSize: 13,
              fontWeight: 600,
              color: tiudayActive ? '#FFFFFF' : '#A090C8',
              background: tiudayActive ? '#1E1530' : 'rgba(124,106,158,0.1)',
              border: tiudayActive ? '1px solid rgba(124,106,158,0.35)' : '1px solid rgba(124,106,158,0.18)',
              boxShadow: tiudayActive ? '0 0 0 1px rgba(124,106,158,0.15) inset' : 'none',
              transition: 'background 100ms ease, color 100ms ease',
            }}
            onMouseEnter={e => {
              if (!tiudayActive) {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(124,106,158,0.18)'
                el.style.color = '#C4B4E8'
              }
            }}
            onMouseLeave={e => {
              if (!tiudayActive) {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(124,106,158,0.1)'
                el.style.color = '#A090C8'
              }
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
              <Sparkles size={15} />
              {!collapsed && <span>Tiuday</span>}
            </span>
            {!collapsed && (
              <span style={{
                fontFamily: "'Akt', system-ui, sans-serif",
                fontSize: 9,
                color: '#7C6A9E',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'rgba(124,106,158,0.2)',
                padding: '2px 6px',
                borderRadius: 4,
              }}>
                AI TEAM
              </span>
            )}
          </Link>
        </div>

        {/* Browse All */}
        <div style={{ marginBottom: 4 }}>
          <NavItem
            href="/browse"
            icon={LayoutGrid}
            label="Browse All"
            active={browseActive}
            collapsed={collapsed}
            onClick={onClose}
          />
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 4px 10px' }} />

        {/* Category groups */}
        <nav>
          {CATEGORY_GROUPS.map(group => {
            const expanded = expandedGroups.has(group.group)
            const hasActiveChild = group.items.some(item => isActive(item.href))

            return (
              <div key={group.group} style={{ marginBottom: 2 }}>
                <GroupHeader
                  group={group.group}
                  icon={group.icon}
                  expanded={expanded}
                  hasActiveChild={hasActiveChild}
                  collapsed={collapsed}
                  onClick={() => toggleGroup(group.group)}
                />

                {/* Children — only when expanded and not collapsed sidebar */}
                {!collapsed && expanded && (
                  <div
                    style={{
                      marginLeft: 16,
                      paddingLeft: 12,
                      borderLeft: '1px solid rgba(255,255,255,0.07)',
                      marginTop: 2,
                      marginBottom: 4,
                    }}
                  >
                    {group.items.map(item => (
                      <NavItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        active={isActive(item.href)}
                        collapsed={false}
                        onClick={onClose}
                        indent
                        showChevron
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '8px 16px' }} />

      {/* Bottom utility links */}
      <div style={{ padding: '4px 8px 16px' }}>
        {BOTTOM_LINKS.map(link => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            active={pathname === link.href}
            collapsed={collapsed}
            onClick={onClose}
          />
        ))}
      </div>
    </div>
  )
}

interface SidebarProps {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const PANEL_STYLE = {
  background: '#0A0A0F',
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.03)',
  overflow: 'hidden' as const,
  height: '100%',
}

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const expandedWidth = 248
  const collapsedWidth = 64

  return (
    <>
      {/* Desktop: floating panel, always visible */}
      <aside
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          bottom: 16,
          width: collapsed ? collapsedWidth : expandedWidth,
          zIndex: 50,
          transition: 'width 200ms ease',
          overflow: 'visible',
        }}
      >
        {/* Collapse toggle — floats on the right edge of the panel */}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            position: 'absolute',
            right: -13,
            top: 28,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#16161C',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            color: INACTIVE,
            padding: 0,
            transition: 'color 100ms ease, background 100ms ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.color = '#C8C8D0'
            el.style.background = '#202028'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.color = INACTIVE
            el.style.background = '#16161C'
          }}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>

        {/* Panel */}
        <div style={PANEL_STYLE}>
          <Suspense fallback={null}>
            <SidebarContent onClose={() => {}} collapsed={collapsed} />
          </Suspense>
        </div>
      </aside>

      {/* Mobile: overlay drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(2px)' }}
            onClick={onClose}
          />
          <aside
            className="fixed top-0 left-0 bottom-0 z-50 md:hidden"
            style={{ width: 272 }}
          >
            <div style={{ ...PANEL_STYLE, borderRadius: '0 20px 20px 0' }}>
              <Suspense fallback={null}>
                <SidebarContent onClose={onClose} collapsed={false} />
              </Suspense>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
