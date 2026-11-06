import { ArrowDown, Download, Mail } from 'lucide-react'
import { Github } from './GithubIcon'
import { profile } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="titre-accueil" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Touches décoratives discrètes, sans animation. */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-[-6rem] h-96 w-96 rounded-full bg-rose-soft blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[-8rem] h-80 w-80 rounded-full bg-sand blur-3xl" />

      <div className="relative mx-auto grid grid-cols-1 max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-beige bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-muted uppercase">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose-deep" />
            Disponible pour un stage de trois mois
          </p>

          <h1 id="titre-accueil" className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl">
            {profile.firstName} <span className="text-rose-deep">{profile.lastName}</span>
          </h1>

          <p className="mt-4 text-xl font-medium text-ink/80 sm:text-2xl">{profile.title}</p>

          <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
            {profile.tagline}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projets" className="btn-primary">
              Découvrir mes projets
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={profile.cvPath} download className="btn-secondary">
              <Download size={16} aria-hidden="true" />
              Télécharger mon CV
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-ink"
              >
                <Github size={18} aria-hidden="true" />
                GitHub
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition hover:text-ink">
                <Mail size={18} aria-hidden="true" />
                {profile.email}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={150} className="justify-self-center lg:justify-self-end">
          <div className="relative w-64 sm:w-80">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-beige" />
            <figure className="relative overflow-hidden rounded-[2.5rem] bg-sand shadow-xl shadow-ink/10">
              <picture>
                <source srcSet={profile.photo.webp} type="image/webp" />
                <img
                  src={profile.photo.jpg}
                  alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                  width={720}
                  height={1080}
                  fetchPriority="high"
                  className="aspect-[2/3] w-full object-cover"
                />
              </picture>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
