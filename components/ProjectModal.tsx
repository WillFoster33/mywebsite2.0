"use client"

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Project } from '@/config'

export function ProjectModal({ project, onClose }: { project: Project, onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a,button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    closeBtnRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [])

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[60] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden"
        >
          <button ref={closeBtnRef} onClick={onClose} aria-label="Close" className="absolute top-3 right-3 glass-button p-2">
            <X className="h-5 w-5" />
          </button>
          <div className="aspect-video overflow-hidden">
            <img src={project.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white/90">{project.title}</h3>
            <p className="mt-2 text-white/75">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t: string) => (
                <span key={t} className="glass-chip px-2.5 py-1 text-xs text-white/80">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 