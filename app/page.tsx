"use client"

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

import { ProjectCard } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Experience } from '@/components/Experience'
import config from '@/config'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState<number | null>(null)

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } },
  }), [])

  return (
    <main id="content" className="relative">
      <Navbar />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <Section id="about" title="About">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-4">
              {config.avatar && (
                <img src={config.avatar} alt="Portrait of Will Foster" className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover" />
              )}
              <div>
                <h3 className="text-xl font-semibold text-white/90">Hi, I'm Will</h3>
                <p className="mt-2 text-white/80">I'm a CS + DS student at the University of Wisconsin–Madison ('26) from Ann Arbor, Michigan.</p>
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/60">Education</h3>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="text-white/80">University of Wisconsin–Madison — CS + Data Science (’26)</div>
                  <div className="text-white/70">IFSA Tech Accelerator — Prague, Czech Republic (Study Abroad)</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/60">Interests</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {config.interests?.map((it: string) => (
                    <span key={it} className="glass-chip px-3 py-1.5 text-xs">{it}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/60">Skills</h3>
                <div className="mt-3 grid gap-2 text-sm">
                  <div>
                    <span className="text-white/60">Languages: </span>
                    <span className="text-white/85">{config.skills?.languages?.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Cloud: </span>
                    <span className="text-white/85">{config.skills?.cloud?.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Other: </span>
                    <span className="text-white/85">{config.skills?.other?.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <Experience />
        </Section>

        <Section id="projects" title="Projects & Achievements">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <a href="https://devpost.com/software/madshell" target="_blank" rel="noreferrer" className="group glass-panel rounded-2xl p-5 specular-stripe hover:-translate-y-0.5 transition">
              <h3 className="text-white/90 font-medium">MadHacks Hackathon — 2nd Place and Best Cloud Implementation</h3>
              <p className="mt-1 text-white/60 text-sm">Dec 2024</p>
              <p className="mt-3 text-white/75">Placed 2nd at one of the largest hackathons in the Midwest with MadShell, a native terminal that autonomously executes bash commands from natural language.</p>
              <span className="mt-3 inline-block text-sm text-white/80 group-hover:text-white">View on Devpost →</span>
            </a>
            <a href="https://devpost.com/software/bager" target="_blank" rel="noreferrer" className="group glass-panel rounded-2xl p-5 specular-stripe hover:-translate-y-0.5 transition">
              <h3 className="text-white/90 font-medium">MadData Hackathon — Winner</h3>
              <p className="mt-1 text-white/60 text-sm">Feb 2024</p>
              <p className="mt-3 text-white/75">One of four winning teams out of 160+ contestants at UW–Madison’s MadData Hackathon. Built Badger+, a student-centric academic hub with personalized guidance.</p>
              <span className="mt-3 inline-block text-sm text-white/80 group-hover:text-white">View on Devpost →</span>
            </a>
            <a href="https://pypi.org/project/fazah/" target="_blank" rel="noreferrer" className="group glass-panel rounded-2xl p-5 specular-stripe hover:-translate-y-0.5 transition">
              <h3 className="text-white/90 font-medium">Fazah — AI-Powered Language Learning</h3>
              <p className="mt-3 text-white/75">An AI-powered language learning platform revolutionizing how people acquire new languages.</p>
              <span className="mt-3 inline-block text-sm text-white/80 group-hover:text-white">View on PyPI →</span>
            </a>
            <a href="https://github.com/WillFoster33/Lung-Recognition-Model" target="_blank" rel="noreferrer" className="group glass-panel rounded-2xl p-5 specular-stripe hover:-translate-y-0.5 transition">
              <h3 className="text-white/90 font-medium">LungVision — AI Lung Image Analysis</h3>
              <p className="mt-3 text-white/75">Advanced AI tool for analyzing lung images, assisting medical professionals in diagnostics.</p>
              <span className="mt-3 inline-block text-sm text-white/80 group-hover:text-white">View on GitHub →</span>
            </a>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <ContactForm />
        </Section>

        <Footer />
      </motion.div>

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectModal project={config.projects[activeProject]} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </main>
  )
} 