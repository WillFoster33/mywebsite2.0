import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { query, history } = await req.json()
    if (!query) {
      return NextResponse.json({ ok: false, error: 'Missing query' }, { status: 400 })
    }

    const endpoint = process.env.AZURE_QA_ENDPOINT || process.env.NEXT_PUBLIC_AZURE_QA_ENDPOINT
    if (!endpoint) {
      return NextResponse.json({ ok: false, error: 'Q&A service not configured' }, { status: 500 })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    try {
      const upstream = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, history }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!upstream.ok) {
        const text = await upstream.text().catch(() => '')
        return NextResponse.json({ ok: false, error: `Upstream error: ${upstream.status} ${text}` }, { status: 502 })
      }

      // Expect JSON with { response: string } or { message: string }
      const data = await upstream.json().catch(() => ({}))
      const response = data?.response || data?.message
      if (!response || typeof response !== 'string') {
        return NextResponse.json({ ok: false, error: 'Unexpected upstream response' }, { status: 502 })
      }

      return NextResponse.json({ ok: true, response })
    } catch (err: any) {
      const msg = err?.name === 'AbortError' ? 'Request timed out' : (err?.message || 'Fetch failed')
      return NextResponse.json({ ok: false, error: msg }, { status: 500 })
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }
} 