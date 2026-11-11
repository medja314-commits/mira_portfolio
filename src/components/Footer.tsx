import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { Github } from './GithubIcon'
import { Linkedin } from './LinkedinIcon'
import { profile } from '../data/portfolio'

// Grande signature décorative : les lettres montent une à une quand elle apparaît,
// se soulèvent au survol (souris uniquement) et le point rose sautille de temps en temps.
function Signoff({ name }: { name: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '100000px 0px 0px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const lift = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== 'mouse') return
    const letter = e.currentTarget
    letter.classList.add('is-lift')
    window.setTimeout(() => letter.classList.remove('is-lift'), 650)
  }

  return (
    <p ref={ref} aria-hidden="true" data-visible={visible} className="signoff text-center sm:text-left">
      {[...name].map((ch, i) => (
        <span key={i} className="signoff-letter" style={{ '--i': i } as CSSProperties} onPointerEnter={lift}>
          {ch}
        </span>
      ))}
      <span className="signoff-letter signoff-dot" style={{ '--i': name.length } as CSSProperties}>
        .
      </span>
    </p>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="overflow-hidden border-t border-lavender bg-blush/60">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <Signoff name={profile.firstName} />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <a href="#accueil" className="font-display text-lg font-semibold text-ink">
          {profile.firstName} <span className="text-violet-deep">{profile.lastName}</span>
        </a>

        <nav aria-label="Liens utiles">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            <li>
              <a href="#projets" className="transition hover:text-ink">
                Projets
              </a>
            </li>
            <li>
              <a href={profile.cvPath} download className="transition hover:text-ink">
                CV (PDF)
              </a>
            </li>
            <li>
              <a href="#contact" className="transition hover:text-ink">
                Contact
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-ink">
                <Github size={15} aria-hidden="true" />
                GitHub
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-ink">
                <Linkedin size={14} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-xs text-muted">© {year} {profile.firstName} {profile.lastName}. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
