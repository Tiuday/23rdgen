'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const PIXEL_CHARS = [
  {
    emoji: '🧙',
    style: {
      top: '18%',
      left: '4%',
      animation: 'drift-1 28s ease-in-out infinite',
      animationDelay: '0s',
    },
  },
  {
    emoji: '🧝',
    style: {
      top: '8%',
      right: '6%',
      animation: 'drift-2 35s ease-in-out infinite',
      animationDelay: '-10s',
    },
  },
  {
    emoji: '🧚',
    style: {
      bottom: '22%',
      right: '4%',
      animation: 'drift-3 30s ease-in-out infinite',
      animationDelay: '-14s',
    },
  },
  {
    emoji: '🤖',
    style: {
      top: '52%',
      left: '2%',
      animation: 'drift-4 24s ease-in-out infinite',
      animationDelay: '-6s',
    },
  },
  {
    emoji: '👾',
    style: {
      bottom: '12%',
      left: '6%',
      animation: 'drift-5 40s ease-in-out infinite',
      animationDelay: '-20s',
    },
  },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Homepage has its own full layout — bypass AppShell entirely
  if (pathname === '/') return <>{children}</>

  return (
    <>
      {/* ── Layer 1: base background ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, background: '#0A0A0F', zIndex: -2, pointerEvents: 'none' }}
      />

      {/* ── Layer 2: dot grid ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(124,106,158,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Layer 3: ambient glows ────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      >
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'rgba(124,106,158,0.07)',
          filter: 'blur(120px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'rgba(196,98,45,0.05)',
          filter: 'blur(100px)',
        }} />
      </div>

      {/* ── Layer 4: scanline overlay ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.025,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )`,
        }}
      />

      {/* ── Floating pixel characters ─────────────────────────────── */}
      {PIXEL_CHARS.map((char) => (
        <div
          key={char.emoji}
          aria-hidden="true"
          style={{
            position: 'fixed',
            fontSize: 32,
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0.4,
            lineHeight: 1,
            userSelect: 'none',
            ...char.style,
          }}
        >
          {char.emoji}
        </div>
      ))}

      <Navbar onMenuClick={() => setSidebarOpen(v => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main
        className="flex-1 pt-14 md:ml-[240px] min-h-screen"
        style={{ position: 'relative', zIndex: 10 }}
      >
        {children}
      </main>
    </>
  )
}
