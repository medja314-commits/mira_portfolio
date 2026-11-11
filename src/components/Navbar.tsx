import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#a-propos', label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  // Au défilement (une fois par image) : barre de progression mise à jour directement dans le DOM,
  // fond de l'en-tête après 12 px, et en-tête masqué quand on descend / réaffiché dès qu'on remonte.
  useEffect(() => {
    let lastY = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`)
      setScrolled(y > 12)
      if (y < 120) setHidden(false)
      else if (y > lastY + 6) setHidden(true)
      else if (y < lastY - 6) setHidden(false)
      if (Math.abs(y - lastY) > 6 || y < 120) lastY = y
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Ferme le menu mobile avec la touche Échap.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
    {/* Barre de progression de lecture : hors de l'en-tête pour rester visible quand il se masque. */}
    <div
      ref={progressRef}
      aria-hidden="true"
      style={{ transform: 'scaleX(0)' }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-violet-deep via-rose to-violet"
    />
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,translate] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:translate-y-0 ${
        scrolled || open ? 'border-b border-lavender bg-cream/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      } ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#accueil" className="group font-display text-lg font-semibold tracking-tight text-ink">
          Mira <span className="inline-block text-violet-deep transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">EDJA</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-3 py-2 text-sm text-muted transition hover:bg-blush hover:text-ink"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-violet-deep to-rose transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-blush md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <ul id="menu-mobile" className="animate-enter border-t border-lavender bg-cream px-4 py-3 md:hidden" style={{ '--d': '0ms' } as CSSProperties}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base text-ink transition hover:bg-blush"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
    </>
  )
}
