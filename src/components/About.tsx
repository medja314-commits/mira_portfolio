import { Languages, Sparkles } from 'lucide-react'
import { aboutParagraphs, profile } from '../data/portfolio'
import { InkText } from './InkText'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section id="a-propos" aria-labelledby="titre-a-propos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal variant="left">
          <SectionHeading id="titre-a-propos" eyebrow="À propos" title="Une développeuse curieuse, qui veut construire des solutions utiles." />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Sparkles size={16} className="wiggle-on-hover text-violet-deep" aria-hidden="true" />
                Qualités
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.strengths.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Languages size={16} className="wiggle-on-hover text-violet-deep" aria-hidden="true" />
                Langues
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <li key={l} className="chip">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} variant="right">
          <InkText paragraphs={aboutParagraphs} className="space-y-6 text-base leading-relaxed sm:text-lg" />
        </Reveal>
      </div>
    </section>
  )
}
