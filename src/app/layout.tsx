import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import AppShell from '@/components/layout/AppShell'
import CustomCursor from '@/components/layout/CustomCursor'
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
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#EDE8DF] antialiased font-sans">
        <Providers>
          <CustomCursor />
          <AppShell>
            {children}
          </AppShell>
        </Providers>
      </body>
    </html>
  )
}
