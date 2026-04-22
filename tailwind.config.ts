import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark:  '#1a2e20',
        green: '#2d6a4f',
        gold:  '#7a5c2e',
        beige: '#f7f5f2',
        beige2:'#ede9e0',
        sage:  '#a8d5b5',
        sagel: '#e8f0eb',
        muted: '#647a6c',
      },
      fontFamily: {
        display: ['"Cormorant Garant"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
