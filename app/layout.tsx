import './globals.css'
import type { Metadata } from 'next'
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'
import config from '@/config'
import Background from '@/components/Background'

const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: `${config.name} — ${config.tagline}`,
    template: `%s — ${config.name}`,
  },
  description: config.description,
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: `${config.name} — ${config.tagline}`,
    description: config.description,
    url: 'https://example.com',
    siteName: config.name,
    images: [
      {
        url: '/background/bg2.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/background/wf-logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/background/bg2.jpg" />
      </head>
      <body className={cn(body.variable, display.variable, 'min-h-screen bg-[#0b0f14] text-white font-[family:var(--font-body)]')}>        
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:glass-button focus:px-3 focus:py-1.5">Skip to content</a>
        {/* Background */}
        <Background />
        {children}
      </body>
    </html>
  )
} 