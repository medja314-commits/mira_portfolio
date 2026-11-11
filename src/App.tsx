import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Journey } from './components/Journey'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  // Les sections sont créées par React après le chargement : le navigateur ne peut donc pas sauter
  // tout seul à l'ancre d'un lien partagé (ex. …/#projets). On le fait une fois la page affichée.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' }))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="contenu" className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
