import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Browse',   href: '/browse' },
  { label: 'Agents',   href: '/browse?category=agent' },
  { label: 'Prompts',  href: '/browse?category=prompt' },
  { label: 'Skills',   href: '/browse?category=skill' },
  { label: 'Teams',    href: '/browse?category=team' },
  { label: 'Creators', href: '/creators' },
]

function LogoMark() {
  return (
    <svg width="22" height="30" viewBox="0 0 22 30" fill="none" aria-label="23rdGen">
      {/* Upper D */}
      <path d="M0 0 L0 11 L8 11 Q19 11 19 5.5 Q19 0 8 0 Z" fill="#EDE8DF" />
      {/* Violet pill separator */}
      <rect x="0" y="12.5" width="22" height="4" rx="2" fill="#7C6B9E" />
      {/* Lower D */}
      <path d="M0 18 L0 29 L8 29 Q19 29 19 23.5 Q19 18 8 18 Z" fill="#EDE8DF" />
    </svg>
  )
}

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-6 bg-[rgba(20,18,16,0.85)] backdrop-blur-md border-b border-[#2A2520]">
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
        <LogoMark />
      </Link>

      {/* Center nav */}
      <nav className="flex-1 flex items-center justify-center gap-7">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-sm text-[rgba(237,232,223,0.55)] hover:text-[#EDE8DF] transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right: Sign up */}
      <div className="shrink-0 flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm text-[rgba(237,232,223,0.55)] hover:text-[#EDE8DF] transition-colors"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="px-4 py-1.5 rounded-full bg-[#7C6B9E] text-[#EDE8DF] text-sm font-medium hover:bg-[#A594C4] transition-colors"
        >
          Sign up
        </Link>
      </div>
    </header>
  )
}
