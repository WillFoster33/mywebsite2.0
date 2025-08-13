"use client"

import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

function TypingBubble() {
  return (
    <div className="glass-panel rounded-2xl p-3 w-56 overflow-hidden">
      <div className="h-4 rounded bg-white/10 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
      <style jsx>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  )
}

function ChatBubble({ type, content, isThinking }: { type: 'question' | 'answer'; content: string; isThinking?: boolean }) {
  return (
    <div className={`flex ${type === 'question' ? 'justify-end' : 'justify-start items-start'} mb-4`}>
      {type === 'answer' && (
        <div className="relative mr-2 mt-1">
          <img src="/background/Headshot2.png" alt="Will Foster" className="w-10 h-10 rounded-full object-cover" />
        </div>
      )}
      {isThinking ? (
        <TypingBubble />
      ) : (
        <div className={`max-w-[80%] p-3 rounded-2xl ${type === 'question' ? 'glass-button' : 'glass-panel'}`}>
          <p className="text-sm text-white/90 whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  )
}

export default function QA() {
  const [question, setQuestion] = useState('')
  const [conversation, setConversation] = useState<{ type: 'question' | 'answer'; content: string }[]>([])
  const [streamingAnswer, setStreamingAnswer] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const endpoint = process.env.NEXT_PUBLIC_AZURE_QA_ENDPOINT

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim()) return

    setConversation((prev) => [...prev, { type: 'question', content: question }])
    const currentHistory = conversation
    setQuestion('')
    setStreamingAnswer('')
    setIsThinking(true)

    try {
      if (!endpoint) throw new Error('Q&A service not configured')
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: question,
          history: currentHistory.map((item) => `${item.type}: ${item.content}`).join('\n'),
        }),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const json = await response.json()
      const full = json?.response || json?.message || ''
      if (full) {
        for (let i = 0; i < full.length; i++) {
          await new Promise((r) => setTimeout(r, 16))
          setStreamingAnswer((prev) => prev + full[i])
        }
        setConversation((prev) => [...prev, { type: 'answer', content: full }])
      } else {
        throw new Error('Unexpected response format')
      }
    } catch (err: any) {
      setConversation((prev) => [
        ...prev,
        { type: 'answer', content: `Sorry, there was an error processing your request. Error details: ${err?.message || 'Unknown error'}` },
      ])
    } finally {
      setStreamingAnswer('')
      setIsThinking(false)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation, streamingAnswer])

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24">
        <div className="mx-auto max-w-4xl px-4">
          {conversation.map((item, idx) => (
            <ChatBubble key={idx} type={item.type} content={item.content} />
          ))}
          {(isThinking || streamingAnswer) && (
            <ChatBubble type="answer" content={streamingAnswer || ' '} isThinking={isThinking} />
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-sm p-4">
          <div className="mx-auto max-w-4xl relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full p-3 pr-12 rounded-full border bg-white/15 text-white placeholder-white/70 border-white/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/80 transition-colors">
              <ArrowUp size={24} />
            </button>
          </div>
        </form>
      </main>
    </>
  )
} 