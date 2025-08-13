import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { query, history } = await req.json()
    if (!query) return NextResponse.json({ ok: false, error: 'Missing query' }, { status: 400 })

    const endpoint = process.env.AZURE_QA_ENDPOINT // e.g. https://.../http_trigger[?code=...]
    if (!endpoint) {
      return NextResponse.json({ ok: false, error: 'Service not configured' }, { status: 500 })
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, history }),
      // mode: 'no-cors' is not applicable server-side; rely on server-side fetch
    })

    let data: any = null
    try {
      data = await res.json()
    } catch {
      // upstream returned non-JSON
    }

    if (!res.ok) {
      const message = data?.error || `Upstream ${res.status} ${res.statusText}`
      return NextResponse.json({ ok: false, error: message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, response: data?.response ?? '' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Failed to reach service' }, { status: 500 })
  }
} 