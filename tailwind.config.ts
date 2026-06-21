import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        cream: 'var(--cream)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        gold: 'var(--gold)',
        espresso: 'var(--espresso)',
        surface: 'var(--surface)',
        border: 'var(--border)',
      },
      boxShadow: {
        glow: '0 4px 24px rgba(200, 121, 65, 0.25)',
        card: '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
