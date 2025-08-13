"use client"

import { useCallback, useState } from 'react'
import { Menu, X } from 'lucide-react'
import config from '@/config'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const openResume = useCallback(() => {
    const resumeUrl = 'https://fosterportfolioresume.blob.core.windows.net/resume/Will Foster Resume 2025.pdf'
    window.open(resumeUrl, '_blank')
  }, [])

  const openTestimony = useCallback(() => {
    const referralURL = 'https://fosterportfolioresume.blob.core.windows.net/letterofrecomendation/Recommendation Letter for Will Foster.pdf'
    window.open(referralURL, '_blank')
  }, [])

  const links = [
    { href: '/#about', label: 'About' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
    { href: '/qa', label: 'Q&A' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="glass-panel relative rounded-b-2xl h-16 flex items-center justify-between px-3 sm:px-4">
        <a href="/" aria-label="Home" className="flex items-center gap-2 rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
          <img src="/background/wf-logo.png" alt="WF logo" className="h-6 w-6 rounded-sm" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1 sm:gap-3">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="glass-button relative specular-stripe px-3 py-1.5 text-sm text-white/90 hover:text-white transition-transform duration-200 ease-glass hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {item.label}
            </a>
          ))}
          <button onClick={openResume} className="glass-button relative specular-stripe px-3 py-1.5 text-sm text-white/90 hover:text-white transition-transform duration-200 ease-glass hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">Resume</button>
          <button onClick={openTestimony} className="glass-button relative specular-stripe px-3 py-1.5 text-sm text-white/90 hover:text-white transition-transform duration-200 ease-glass hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">Testimony</button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden glass-button p-2 specular-stripe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden fixed top-16 left-2 right-2 z-50 glass-panel rounded-2xl p-3 flex flex-col gap-2">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="glass-button w-full flex justify-start px-3 py-2 text-sm text-white/90 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); openResume() }} className="glass-button w-full flex justify-start px-3 py-2 text-sm text-white/90 hover:text-white">Resume</button>
          <button onClick={() => { setOpen(false); openTestimony() }} className="glass-button w-full flex justify-start px-3 py-2 text-sm text-white/90 hover:text-white">Testimony</button>
        </div>
      )}
    </header>
  )
} 