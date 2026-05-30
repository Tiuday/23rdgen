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
        obsidian: '#0A0A0F',
        parchment: '#E8E0D0',
        ivory: '#F0E6D0',
        maroon: '#2A0A0A',
        mahogany: '#2A1A0E',
        violet: {
          DEFAULT: '#7C6A9E',
          soft: '#9B88BF',
        },
        ember: '#C4622D',
        sage: '#6B8F71',
        clay: '#A0785A',
        slate: '#5A6A7A',
        gold: '#B8960C',
        aged: '#D4C9A8',
      },
      borderRadius: {
        pill: '0px',
        card: '0px',
        input: '0px',
        modal: '0px',
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
