export default function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center text-white/80">
      <div className="flex items-center gap-2 text-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-white/60 animate-pulse" />
        <span>Loading…</span>
      </div>
    </div>
  )
} 