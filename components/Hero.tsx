"use client"

import { motion, useReducedMotion } from 'framer-motion'
import config from '@/config'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] pt-8 pb-16 sm:pt-10 sm:pb-20">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="relative glass-panel specular-stripe rounded-3xl p-8 sm:p-12 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <h1 className="font-[family:var(--font-display)] text-4xl sm:text-6xl font-semibold tracking-tight">
            {config.name}
          </h1>
          <p className="mt-4 text-white/70 text-xl sm:text-2xl">Computer and Data Science major at the University of Wisconsin–Madison</p>
          <blockquote className="mt-5 text-white/60 text-base sm:text-lg italic">
            “Intelligence is the ability to avoid doing work, yet getting the work done.” <br />- Linus Torvalds
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="/qa"
              className="glass-button specular-stripe px-5 py-2.5 text-sm font-medium hover:-translate-y-0.5 hover:shadow-soft transition duration-200 ease-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Ask Me Anything
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 