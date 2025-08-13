import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: 'Email service not configured' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Portfolio <no-reply@resend.dev>',
      to: process.env.TO_EMAIL || 'foster.will@gmail.com',
      subject: `New message from ${name}`,
      replyTo: email,
      text: message,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 })
  }
} 