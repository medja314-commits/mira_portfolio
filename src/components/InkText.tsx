import { Fragment, useEffect, useRef } from 'react'

type InkTextProps = {
  paragraphs: string[]
  className?: string
  /** Ligne de lecture, en fraction de la hauteur de fenêtre (0.62 = un peu sous le milieu). */
  line?: number
}

// Paragraphes dont les mots passent de la couleur secondaire à l'encre quand ils franchissent
// la ligne de lecture. Le texte reste lisible avant (contraste suffisant de la couleur secondaire).
// Performance : la position de chaque mot est mesurée une fois (puis à chaque redimensionnement) ;
// pendant le défilement on ne lit qu'un seul rectangle, et seulement quand le bloc est à l'écran.
export function InkText({ paragraphs, className = '', line = 0.62 }: InkTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const words = [...root.querySelectorAll<HTMLElement>('.ink-word')]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.classList.add('is-on'))
      return
    }

    let offsets: number[] = []
    const measure = () => {
      const base = root.getBoundingClientRect().top
      offsets = words.map((w) => w.getBoundingClientRect().top - base)
    }

    let raf = 0
    const update = () => {
      raf = 0
      const threshold = window.innerHeight * line - root.getBoundingClientRect().top
      for (let i = 0; i < words.length; i++) {
        const on = offsets[i] < threshold
        if (on !== words[i].classList.contains('is-on')) words[i].classList.toggle('is-on', on)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const resize = new ResizeObserver(() => {
      measure()
      update()
    })
    resize.observe(root)

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
      } else {
        window.removeEventListener('scroll', onScroll)
      }
      update()
    })
    io.observe(root)

    return () => {
      io.disconnect()
      resize.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [line])

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 30)}>
          {p.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="ink-word">{word}</span>
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}
