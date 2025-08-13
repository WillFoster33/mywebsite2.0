"use client"

import { motion, useReducedMotion } from 'framer-motion'

export function BlobField({ reducedMotion }: { reducedMotion?: boolean }) {
  const prefersReduced = useReducedMotion()
  const disabled = reducedMotion || prefersReduced

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg className="absolute -top-40 -left-40 h-[60vmax] w-[60vmax] blur-5xl opacity-60" viewBox="0 0 800 800">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>
        </defs>
        <motion.path
          d="M616 364c0 123-107 242-240 242S120 506 120 383 228 120 361 120s255 121 255 244z"
          fill="url(#g1)"
          animate={disabled ? undefined : { d: [
            'M616 364c0 123-107 242-240 242S120 506 120 383 228 120 361 120s255 121 255 244z',
            'M636 364c0 143-127 262-260 262S100 526 100 383 228 100 381 100s255 141 255 264z',
            'M616 364c0 123-107 242-240 242S120 506 120 383 228 120 361 120s255 121 255 244z'
          ]}}
          transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <svg className="absolute -bottom-40 -right-40 h-[55vmax] w-[55vmax] blur-5xl opacity-50" viewBox="0 0 800 800">
        <defs>
          <radialGradient id="g2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#60a5fa" />
          </radialGradient>
        </defs>
        <motion.circle cx="400" cy="400" r="300" fill="url(#g2)"
          animate={disabled ? undefined : { r: [280, 320, 300] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
} 