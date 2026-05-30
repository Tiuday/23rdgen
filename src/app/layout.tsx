import type { Metadata } from 'next'
import { DM_Serif_Display, IBM_Plex_Mono } from 'next/font/google'
import { Providers } from '@/components/Providers'
import AppShell from '@/components/layout/AppShell'
import './globals.css'
import '../styles/tokens.css'

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-mono',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
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
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${ibmPlexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <AppShell>
            {children}
          </AppShell>
        </Providers>
      </body>
    </html>
  )
}
