import { GraduationCap, Briefcase, Sparkles } from 'lucide-react'
import { education, experience, otherWork, type TimelineItem } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-2 space-y-10 border-l border-lavender pl-8">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} className="relative">
          <span aria-hidden="true" className="absolute top-1.5 -left-[2.3rem] h-3 w-3 rounded-full border-2 border-violet-deep bg-cream" />
          <p className="text-xs font-semibold tracking-wide text-violet-deep uppercase">{item.period}</p>
          <h4 className="mt-1.5 font-display text-xl font-semibold text-ink">{item.title}</h4>
          <p className="mt-1 text-sm text-muted">
            {item.organisation}
            {item.location ? ` · ${item.location}` : ''}
          </p>
          {item.description && <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.description}</p>}
        </li>
      ))}
    </ol>
  )
}

export function Journey() {
  return (
    <section id="parcours" aria-labelledby="titre-parcours" className="scroll-mt-20 bg-blush/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="titre-parcours" eyebrow="Formation & expériences" title="Mon parcours jusqu'ici." />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <GraduationCap size={22} className="text-violet-deep" aria-hidden="true" />
              Formation
            </h3>
            <div className="mt-8">
              <Timeline items={education} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <Briefcase size={22} className="text-violet-deep" aria-hidden="true" />
              Expériences
            </h3>
            <div className="mt-8">
              <Timeline items={experience} />
            </div>

            <div className="card mt-12 p-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Sparkles size={16} className="text-violet-deep" aria-hidden="true" />
                Autres réalisations personnelles et académiques
              </h4>
              <ul className="mt-4 space-y-3">
                {otherWork.map((w) => (
                  <li key={w.name} className="text-sm leading-relaxed text-ink/85">
                    <strong className="font-semibold text-ink">{w.name}</strong> : {w.description}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
