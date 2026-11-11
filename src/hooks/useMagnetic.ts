import { useEffect, useRef } from 'react'

// L'élément « penche » vers la souris quand on le survole, puis revient en place avec un léger rebond.
// Utilise la propriété `transform`, distincte de `translate` (utilisée par les survols Tailwind), pour ne pas les écraser.
// Désactivé sur écran tactile et avec « réduire les animations ».
export function useMagnetic<T extends HTMLElement>(strength = { x: 0.25, y: 0.35 }) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    el.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)'
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) * strength.x
      const dy = (e.clientY - r.top - r.height / 2) * strength.y
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const onLeave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
      el.style.transition = ''
    }
  }, [strength.x, strength.y])

  return ref
}
