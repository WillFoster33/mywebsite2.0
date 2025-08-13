import config from '@/config'
import { Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-16 mb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between text-sm">
          <p className="text-white/70">© {new Date().getFullYear()} {config.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <a href={config.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="glass-button p-2 specular-stripe">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 