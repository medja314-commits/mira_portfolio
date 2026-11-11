import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type RevealVariant = 'up' | 'left' | 'right' | 'scale'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: RevealVariant
}

// Fait apparaître son contenu quand il entre dans la fenêtre : il sort d'un léger flou en glissant
// (ou en zoomant selon `variant`). Les styles sont dans index.css ([data-reveal]).
// - `data-visible` permet aux enfants de lancer leurs propres animations (puces en cascade, filets, rideau des photos…).
// - La marge haute géante de l'observateur compte comme « vu » tout ce qui est au-dessus de l'écran :
//   un saut direct vers une ancre (#contact) ne laisse jamais une section invisible.
// - Sans IntersectionObserver ou avec « réduire les animations », le contenu s'affiche directement.
export function Reveal({ children, className = '', delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100000px 0px -10% 0px', threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  )
}
