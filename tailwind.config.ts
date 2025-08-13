import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        glass: {
          bg: 'hsla(var(--glass-bg))',
          border: 'hsla(var(--glass-border))',
          highlight: 'hsla(var(--glass-highlight))',
        },
      },
      boxShadow: {
        glass: '0 10px 40px -10px rgba(0,0,0,0.35)',
        soft: '0 20px 60px -20px rgba(0,0,0,0.25)',
        chip: '0 8px 24px -12px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        blob: '2.5rem',
      },
      backdropBlur: {
        xl: '20px',
        '2xl': '32px',
        '3xl': '48px',
      },
      blur: {
        '4xl': '60px',
        '5xl': '100px',
      },
      transitionTimingFunction: {
        glass: 'cubic-bezier(0.21, 0.47, 0.32, 0.99)',
      },
      keyframes: {
        'blob-morph': {
          '0%, 100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' },
          '50%': { borderRadius: '58% 42% 35% 65% / 64% 33% 67% 36%' },
        },
        sheen: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        blob: 'blob-morph 30s ease-in-out infinite',
        sheen: 'sheen 2.2s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), 
    ({ addComponents, theme }: { addComponents: any; theme: any }) => {
      addComponents({
        '.glass-panel': {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: theme('colors.white / 0.06'),
          backdropFilter: 'blur(20px) saturate(115%)',
          WebkitBackdropFilter: 'blur(20px) saturate(115%)',
          border: `1px solid ${theme('colors.white / 0.18')}`,
          boxShadow: `${theme('boxShadow.glass')}, inset 0 0 0 1px rgba(255,255,255,0.28)`,
          borderRadius: theme('borderRadius.2xl'),
        },
        '.glass-panel::before': {
          content: '""',
          position: 'absolute',
          inset: '0 auto auto 0',
          height: '30%',
          width: '100%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06), rgba(255,255,255,0))',
          pointerEvents: 'none',
        },
        '.glass-panel::after': {
          content: '""',
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '18%',
          width: '100%',
          background: 'linear-gradient(0deg, rgba(255,255,255,0.08), rgba(255,255,255,0))',
          pointerEvents: 'none',
        },
        '.glass-chip': {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: theme('colors.white / 0.06'),
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${theme('colors.white / 0.18')}`,
          borderRadius: theme('borderRadius.blob'),
          boxShadow: `${theme('boxShadow.chip')}, inset 0 0 0 1px rgba(255,255,255,0.26)`,
        },
        '.glass-chip::before': {
          content: '""',
          position: 'absolute',
          inset: '0 auto auto 0',
          height: '60%',
          width: '100%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06), rgba(255,255,255,0))',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        },
        '.glass-chip::after': {
          content: '""',
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '26%',
          width: '100%',
          background: 'linear-gradient(0deg, rgba(255,255,255,0.10), rgba(255,255,255,0))',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        },
        '.glass-button': {
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))',
          backgroundColor: theme('colors.white / 0.06'),
          border: `1px solid ${theme('colors.white / 0.24')}`,
          backdropFilter: 'blur(14px) saturate(108%)',
          WebkitBackdropFilter: 'blur(14px) saturate(108%)',
          borderRadius: theme('borderRadius.xl'),
          boxShadow: `${theme('boxShadow.chip')}, inset 0 0 0 1px rgba(255,255,255,0.24)`,
        },
        '.glass-button::before': {
          content: '""',
          position: 'absolute',
          inset: '0 auto auto 0',
          height: '50%',
          width: '100%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08), rgba(255,255,255,0))',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        },
        '.glass-button::after': {
          content: '""',
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '26%',
          width: '100%',
          background: 'linear-gradient(0deg, rgba(255,255,255,0.10), rgba(255,255,255,0))',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        },
      })
    }
  ],
}

export default config 