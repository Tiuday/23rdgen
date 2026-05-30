import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#141210',
        surface: '#1C1916',
        elevated: '#242018',
        'border-subtle': '#2A2520',
        'border-bright': '#332E28',
        parchment: {
          DEFAULT: '#EDE8DF',
          muted: 'rgba(237, 232, 223, 0.55)',
          subtle: 'rgba(237, 232, 223, 0.25)',
        },
        violet: {
          DEFAULT: '#7C6B9E',
          soft: '#A594C4',
          tint: 'rgba(124, 107, 158, 0.15)',
        },
        ember: {
          DEFAULT: '#D4521E',
          tint: 'rgba(212, 82, 30, 0.12)',
        },
        sage: {
          DEFAULT: '#3A6B45',
          tint: 'rgba(58, 107, 69, 0.15)',
        },
        clay: {
          DEFAULT: '#C4785A',
          tint: 'rgba(196, 120, 90, 0.12)',
        },
        rose: {
          DEFAULT: '#8C3A56',
          tint: 'rgba(140, 58, 86, 0.12)',
        },
        slate: {
          DEFAULT: '#3A4560',
          tint: 'rgba(58, 69, 96, 0.15)',
        },
      },
      borderRadius: {
        pill: '100px',
        card: '14px',
        input: '10px',
        modal: '16px',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
        sans: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
