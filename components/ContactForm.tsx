"use client"

import { useState } from 'react'

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function validate() {
    const next: typeof errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email.'
    if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (res.ok && data.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-white/80">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="mt-1 w-full rounded-xl bg-white/10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" role="alert" className="mt-1 text-sm text-red-300">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-white/80">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="mt-1 w-full rounded-xl bg-white/10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-red-300">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-sm text-white/80">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          className="mt-1 w-full rounded-xl bg-white/10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" role="alert" className="mt-1 text-sm text-red-300">{errors.message}</p>}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button type="submit" disabled={status==='sending'} className="glass-button specular-stripe px-5 py-2.5 text-sm font-medium hover:-translate-y-0.5 transition disabled:opacity-60">
          {status==='sending' ? 'Sending…' : 'Send'}
        </button>
        <span aria-live="polite" className="text-sm {status==='error' ? 'text-red-300' : 'text-green-300'}">
          {status==='sent' ? 'Thanks! I’ll get back to you.' : status==='error' ? 'Something went wrong. Try again.' : ''}
        </span>
      </div>
    </form>
  )
} 