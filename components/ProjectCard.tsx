"use client"

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Project } from '@/config'

export function ProjectCard({ project, onOpen }: { project: Project, onOpen: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl glass-panel specular-stripe"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen() }}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="aspect-video overflow-hidden">
        <img src={project.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-white/90">{project.title}</h3>
        <p className="mt-1 text-sm text-white/70 line-clamp-2">{project.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t: string) => (
            <span key={t} className="glass-chip px-2.5 py-1 text-xs text-white/80">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-white" onClick={(e) => e.stopPropagation()}>
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-white" onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
} 