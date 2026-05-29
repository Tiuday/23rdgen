'use client'
import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Fixed background depth layer */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}
      >
        {/* Top-right violet radial */}
        <div style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,106,158,0.06) 0%, transparent 70%)',
        }} />
        {/* Bottom-left ember radial */}
        <div style={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,98,45,0.04) 0%, transparent 70%)',
        }} />
        {/* Noise texture */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id="bg-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#bg-noise)" />
        </svg>
      </div>

      <Navbar onMenuClick={() => setSidebarOpen(v => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 pt-14 md:ml-[240px] min-h-screen">
        {children}
      </main>
    </>
  )
}
