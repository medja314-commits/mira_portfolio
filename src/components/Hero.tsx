import type { CSSProperties } from 'react'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { Github } from './GithubIcon'
import { Linkedin } from './LinkedinIcon'
import { profile } from '../data/portfolio'
import { useMagnetic } from '../hooks/useMagnetic'

// Délai d'entrée en cascade pour chaque élément du hero.
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

// Les mots de l'accroche à partir de celui-ci sont surlignés (« qui font la différence. »).
const HIGHLIGHT_FROM = 'qui'
const WORD_STEP_MS = 110

// Accroche animée : les mots sortent du flou un par un, puis un surligneur en dégradé
// se dessine sous la fin de la phrase. Le texte complet reste lu d'un bloc par les lecteurs d'écran.
function AnimatedTagline({ text, startMs, highlightFrom }: { text: string; startMs: number; highlightFrom: string }) {
  const words = text.split(' ')
  const cut = words.lastIndexOf(highlightFrom)
  const splitAt = cut === -1 ? words.length : cut
  const word = (w: string, i: number) => (
    <span key={i} className="animate-word inline-block" style={delay(startMs + i * WORD_STEP_MS)}>
      {w}
      {i < words.length - 1 ? ' ' : ''}
    </span>
  )
  const highlightDelay = startMs + words.length * WORD_STEP_MS + 150

  return (
    <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.slice(0, splitAt).map((w, i) => word(w, i))}
        {splitAt < words.length && (
          <span className="relative isolate inline-block whitespace-nowrap">
            <span
              className="tagline-highlight absolute inset-x-0 bottom-1 -z-10 h-[0.45em] rounded-sm bg-gradient-to-r from-powder via-lavender to-powder"
              style={delay(highlightDelay)}
            />
            {words.slice(splitAt).map((w, j) => word(w, splitAt + j))}
          </span>
        )}
      </span>
    </p>
  )
}

export function Hero() {
  const primaryRef = useMagnetic<HTMLAnchorElement>()
  const secondaryRef = useMagnetic<HTMLAnchorElement>()

  return (
    <section id="accueil" aria-labelledby="titre-accueil" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Deux halos très légers qui dérivent lentement en arrière-plan. */}
      <div aria-hidden="true" className="animate-blob pointer-events-none absolute -top-24 right-[-6rem] h-96 w-96 rounded-full bg-powder/50 blur-3xl" />
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

          {/* Chaque mot monte depuis un masque, puis le point rose tombe avec un rebond. */}
          <h1 id="titre-accueil" className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl">
            <span className="word-mask">
              <span className="word-rise" style={delay(100)}>
                {profile.firstName}
              </span>
            </span>{' '}
            <span className="word-mask">
              <span className="word-rise" style={delay(240)}>
                <em>{profile.lastName}</em>
              </span>
            </span>
            <span aria-hidden="true" className="dot-drop text-rose" style={delay(750)}>
              .
            </span>
          </h1>

          <p style={delay(240)} className="animate-enter mt-4 text-xl font-medium text-ink/80 sm:text-2xl">
            {profile.title}
          </p>

          <AnimatedTagline text={profile.tagline} startMs={450} highlightFrom={HIGHLIGHT_FROM} />

          <p style={delay(800)} className="animate-enter mt-5 max-w-xl text-base leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div style={delay(950)} className="animate-enter mt-9 flex flex-wrap items-center gap-3">
            <a ref={primaryRef} href="#projets" className="btn-primary group">
              Découvrir mes projets
              <ArrowDown size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <a ref={secondaryRef} href={profile.cvPath} download className="btn-secondary group">
              <Download size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              Télécharger mon CV
            </a>
          </div>

          <ul style={delay(1050)} className="animate-enter mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
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
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 transition hover:text-ink"
              >
                <Linkedin size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />
                LinkedIn
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

        {/* Portrait : en premier et plus petit sur mobile, centré dans sa colonne sur ordinateur.
            Le fond de la figure reprend celui de la photo (#fbfbfc) pour laisser de l'air au-dessus de la tête. */}
        <div style={delay(300)} className="animate-enter order-first justify-self-center lg:order-none">
          <div className="animate-float relative w-44 sm:w-60 lg:w-80">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-[2rem] border border-violet/60 lg:translate-x-4 lg:translate-y-4"
            />
            <figure className="group relative overflow-hidden rounded-t-full rounded-b-[2rem] bg-[#fafafb] pt-[14%] shadow-[0_30px_60px_-30px_rgba(28,26,31,0.3)]">
              <picture>
                <source srcSet={profile.photo.webp} type="image/webp" />
                <img
                  src={profile.photo.jpg}
                  alt={`Portrait de ${profile.firstName} ${profile.lastName}`}
                  width={720}
                  height={1080}
                  fetchPriority="high"
                  className="portrait-fade aspect-[2/3] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </picture>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
