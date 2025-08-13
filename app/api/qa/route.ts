import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { query, history } = await req.json()
    if (!query) return NextResponse.json({ ok: false, error: 'Missing query' }, { status: 400 })

    const endpoint = process.env.AZURE_QA_ENDPOINT // e.g. https://port-pipeline.azurewebsites.net/api/http_trigger
    if (!endpoint) {
      return NextResponse.json({ ok: false, error: 'Service not configured' }, { status: 500 })
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // If your function requires a code, append it to the endpoint via env (e.g. endpoint?code=...)
      body: JSON.stringify({ query, history }),
      // No credentials from client are forwarded
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) return NextResponse.json({ ok: false, error: data?.error || 'Upstream error' }, { status: 500 })
    return NextResponse.json({ ok: true, response: data?.response ?? '' })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Failed to reach service' }, { status: 500 })
  }
} 