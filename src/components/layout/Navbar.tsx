'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-5 bg-[rgba(10,10,15,0.92)] backdrop-blur-md border-b border-[rgba(124,106,158,0.12)]">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden mr-3 p-2 rounded-lg text-[rgba(237,232,223,0.55)] hover:text-[#EDE8DF] hover:bg-[rgba(124,106,158,0.1)] transition-colors"
        aria-label="Open navigation"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect width="18" height="2" rx="1" fill="currentColor" />
          <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
          <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
        {imgErr ? (
          <span className="text-sm font-semibold text-[#EDE8DF]">23rdGen</span>
        ) : (
          <div className="w-8 h-8 relative shrink-0">
            <Image
              src="/inspiration/logo.png"
              alt="23rdGen"
              fill
              style={{ objectFit: 'contain' }}
              priority
              onError={() => {
                console.warn('23rdGen: logo not found at /inspiration/logo.png, using text fallback')
                setImgErr(true)
              }}
            />
          </div>
        )}
      </Link>

      <div className="flex-1" />

      {/* Auth buttons */}
      <div className="shrink-0 flex items-center gap-3">
        <Link
          href="/login"
          className="btn-ghost px-3 py-1.5 rounded-full text-sm text-[rgba(237,232,223,0.6)] hover:text-[#EDE8DF]"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="btn-primary px-4 py-1.5 rounded-full bg-[#7C6B9E] text-[#EDE8DF] text-sm font-medium"
        >
          Sign up
        </Link>
      </div>
    </header>
  )
}
