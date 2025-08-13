import config from '@/config'

const fallbackLogoMap: Record<string, string> = {
  'Ford Motor Company': '/background/ford-logo.png',
  'Lawrence AI': '/background/lawrenceai.jpg',
  'Quanta (Startup)': '/background/q.png',
  'ArcTwo': '/background/ArcaTwo-Logo.svg',
}

export function Experience() {
  return (
    <div className="space-y-4">
      {config.experience?.map((item) => {
        const logoSrc = (item as any).logo || fallbackLogoMap[item.company]
        const sizeClass = item.company === 'Ford Motor Company' || item.company === 'Lawrence AI' ? 'h-16' : item.company === 'ArcTwo' || item.company === 'Quanta (Startup)' ? 'h-10' : 'h-12'
        return (
          <article key={`${item.company}-${item.period}`} className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-white/90 text-lg sm:text-xl font-medium">{item.role} — {item.company}</h3>
                {item.summary ? <p className="mt-2 text-white/75 text-sm">{item.summary}</p> : null}
                {item.tech?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tech.map((t: string) => (
                      <span key={t} className="glass-chip px-2.5 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col items-center text-center gap-2 shrink-0">
                <span className="text-white/60 text-sm">{item.period}</span>
                {logoSrc && (
                  <img src={logoSrc} alt="" className={`${sizeClass} w-auto rounded-sm object-contain`} />
                )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
} 