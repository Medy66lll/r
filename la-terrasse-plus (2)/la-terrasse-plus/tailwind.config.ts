import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C88A32',
          'primary-dark': '#9B651B',
          'primary-light': '#E5A955',
          'primary-subtle': '#FDF7ED',
          secondary: '#1E3A2B',
          'secondary-dark': '#12241A',
          'secondary-light': '#2D5841',
          'secondary-subtle': '#EEF4F0',
          accent: '#D9532F',
          'accent-dark': '#B53A19',
          surface: '#FAF7F2',
          'surface-elevated': '#FFFFFF',
          'surface-muted': '#F2ECE1',
          'surface-dark': '#141210',
          'surface-dark-elevated': '#201D19',
          text: '#1C1814',
          'text-muted': '#6B635B',
          'text-inverse': '#FAF7F2',
          border: '#E8E1D5',
          'border-dark': '#2C2824',
          success: '#1E824C',
          'success-bg': '#E8F5E9',
          gold: '#E5A93C',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(28, 24, 20, 0.04)',
        md: '0 8px 24px rgba(28, 24, 20, 0.07)',
        lg: '0 16px 48px rgba(28, 24, 20, 0.11)',
        fire: '0 0 35px rgba(217, 83, 47, 0.35)',
        glow: '0 0 30px rgba(200, 138, 50, 0.25)',
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.875rem',
        lg: '1.25rem',
        xl: '2rem',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
