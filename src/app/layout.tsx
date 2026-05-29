import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import Navbar from '@/components/layout/Navbar'
import './globals.css'
import '../styles/tokens.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '23rdGen — Deploy Intelligence',
    template: '%s | 23rdGen',
  },
  description:
    'The open marketplace for deployable AI agents, prompts, skills, and workflows. Browse, copy, and deploy intelligence into any AI system.',
  keywords: ['AI agents', 'prompts', 'skills', 'workflows', 'Claude', 'ChatGPT', 'Gemini'],
  openGraph: {
    title: '23rdGen — Deploy Intelligence',
    description: 'Browse and deploy AI agents, prompts, skills, and workflows.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#141210] text-[#EDE8DF] antialiased font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-14">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
