import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealVariant = 'up' | 'left' | 'right' | 'scale'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: RevealVariant
}

const hiddenClass: Record<RevealVariant, string> = {
  up: 'translate-y-10 opacity-0',
  left: '-translate-x-12 opacity-0',
  right: 'translate-x-12 opacity-0',
  scale: 'scale-90 opacity-0',
}

// Fait apparaître son contenu quand il entre dans la fenêtre (glissement ou zoom selon `variant`).
// Expose `data-visible` pour que les enfants puissent lancer leurs propres animations (puces en cascade, filets…).
// Sans IntersectionObserver ou avec « réduire les animations », le contenu s'affiche directement.
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : `${hiddenClass[variant]} motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100`
      } ${className}`}
    >
      {children}
    </div>
  )
}
