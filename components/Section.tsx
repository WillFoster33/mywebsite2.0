import { ReactNode } from 'react'

export function Section({ id, title, children }: { id: string, title: string, children: ReactNode }) {
  return (
    <section id={id} className="relative py-14 sm:py-16">
      <div className="mb-6">
        <h2 className="font-[family:var(--font-display)] text-2xl sm:text-3xl font-semibold tracking-tight text-white/90">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
} 