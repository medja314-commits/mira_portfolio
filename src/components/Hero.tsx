import type { CSSProperties } from 'react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { Github } from './GithubIcon'
import { profile } from '../data/portfolio'

// Délai d'entrée en cascade pour chaque élément du hero.
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="titre-accueil" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Taches de couleur qui dérivent lentement en arrière-plan. */}
      <div aria-hidden="true" className="animate-blob pointer-events-none absolute -top-24 right-[-6rem] h-96 w-96 rounded-full bg-powder/70 blur-3xl" />
      <div
        aria-hidden="true"
        style={{ animationDelay: '-5s' }}
        className="animate-blob pointer-events-none absolute top-1/3 left-1/3 h-72 w-72 rounded-full bg-lavender/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        style={{ animationDelay: '-9s' }}
        className="animate-blob pointer-events-none absolute bottom-0 left-[-8rem] h-80 w-80 rounded-full bg-blush blur-3xl"
      />

      <div className="relative mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        <div>
          <p
            style={delay(0)}
            className="animate-enter mb-5 inline-flex items-center gap-2 rounded-full border border-lavender bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-muted uppercase"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-deep" />
            </span>
            Disponible pour un stage de trois mois
          </p>

          <h1
            id="titre-accueil"
            style={delay(120)}
            className="animate-enter font-display text-5xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl"
          >
            {profile.firstName} <em className="text-gradient pr-1">{profile.lastName}</em>
          </h1>

          <p style={delay(240)} className="animate-enter mt-4 text-xl font-medium text-ink/80 sm:text-2xl">
            {profile.title}
          </p>

          <p style={delay(360)} className="animate-enter mt-6 max-w-xl font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
            {profile.tagline}
          </p>

          <p style={delay(480)} className="animate-enter mt-5 max-w-xl text-base leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div style={delay(600)} className="animate-enter mt-9 flex flex-wrap items-center gap-3">
            <a href="#projets" className="btn-primary group">
              Découvrir mes projets
              <ArrowDown size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <a href={profile.cvPath} download className="btn-secondary group">
              <Download size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              Télécharger mon CV
            </a>
          </div>

          <ul style={delay(720)} className="animate-enter mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 transition hover:text-ink"
              >
                <Github size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
                GitHub
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-2 transition hover:text-ink">
                <Mail size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />
                {profile.email}
              </a>
            </li>
          </ul>
        </div>

        <div style={delay(300)} className="animate-enter justify-self-center lg:justify-self-end">
          <div className="animate-float relative w-64 sm:w-80">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2.5rem] bg-gradient-to-br from-lavender via-powder to-violet/60"
            />
            <figure className="group relative overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-blush shadow-xl shadow-violet-deep/20">
              <picture>
                <source srcSet={profile.photo.webp} type="image/webp" />
                <img
                  src={profile.photo.jpg}
                  alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                  width={720}
                  height={1080}
                  fetchPriority="high"
                  className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </picture>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
