import { skillGroups } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section id="competences" aria-labelledby="titre-competences" className="scroll-mt-20 bg-blush/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="titre-competences"
            eyebrow="Compétences techniques"
            title="Des outils choisis pour construire, tester et déployer."
            description="Les technologies listées ici sont celles de mon parcours académique, de mes projets et de mes dépôts."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60}>
              <article className="card h-full p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{group.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies : ${group.title}`}>
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
