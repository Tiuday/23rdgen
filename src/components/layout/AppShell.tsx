'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const PIXEL_CHARS = [
  { emoji: '🧙', style: { top: '20%', left: '3%', animation: 'drift-1 28s ease-in-out infinite', animationDelay: '0s' } },
  { emoji: '🧝', style: { top: '10%', right: '5%', animation: 'drift-2 35s ease-in-out infinite', animationDelay: '-10s' } },
  { emoji: '🧚', style: { bottom: '25%', right: '3%', animation: 'drift-3 30s ease-in-out infinite', animationDelay: '-14s' } },
  { emoji: '🤖', style: { top: '55%', left: '1.5%', animation: 'drift-4 24s ease-in-out infinite', animationDelay: '-6s' } },
  { emoji: '👾', style: { bottom: '15%', left: '5%', animation: 'drift-5 40s ease-in-out infinite', animationDelay: '-20s' } },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Homepage has its own full layout
  if (pathname === '/') return <>{children}</>

  const isAuthPage = pathname === '/login' || pathname === '/signup'

  return (
    <>
      {/* Floating pixel characters */}
      {PIXEL_CHARS.map((char) => (
        <div
          key={char.emoji}
          aria-hidden="true"
          style={{
            position: 'fixed',
            fontSize: 28,
            zIndex: 2,
            pointerEvents: 'none',
            opacity: 0.12,
            lineHeight: 1,
            userSelect: 'none',
            ...char.style,
          }}
        >
          {char.emoji}
        </div>
      ))}

      <Navbar onMenuClick={() => setSidebarOpen(v => !v)} />

      {!isAuthPage && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main
        className={`flex-1 min-h-screen ${isAuthPage ? '' : 'md:ml-[220px]'}`}
        style={{ paddingTop: 48, position: 'relative', zIndex: 10 }}
      >
        {children}
      </main>
    </>
  )
}
