import { ArrowUpRight, CheckCircle2, Code2, ExternalLink, UserCheck } from 'lucide-react'
import { Github } from './GithubIcon'
import { projects, type Project } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Capture d'écran de ${project.name}`}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
    )
  }
  // Visuel de remplacement tant qu'aucune capture d'écran n'est fournie.
  return (
    <div
      role="img"
      aria-label={`Visuel du projet ${project.name}`}
      className="relative flex aspect-[16/10] w-full items-end overflow-hidden bg-blush p-6"
    >
      <span aria-hidden="true" className="font-display text-8xl leading-none font-medium italic text-violet-deep/35 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-6">
        {project.name.charAt(0)}
      </span>
      <span aria-hidden="true" className="ml-3 mb-2 font-display text-lg text-ink/70">
        {project.name}
      </span>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-violet-deep">{project.status}</span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-semibold tracking-wide text-ink uppercase">Problème résolu</h4>
          <p className="text-sm leading-relaxed text-ink/85">{project.problem}</p>
        </div>

        {project.features.length > 0 && (
          <div className="mt-5">
            <h4 className="text-xs font-semibold tracking-wide text-ink uppercase">Fonctionnalités principales</h4>
            <ul className="mt-2 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-relaxed text-ink/85">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-violet-deep transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.tech.length > 0 && (
          <div className="mt-5">
            <h4 className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ink uppercase">
              <Code2 size={14} aria-hidden="true" />
              Technologies
            </h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.role && (
          <p className="mt-5 flex gap-2 rounded-2xl bg-blush/60 p-4 text-sm leading-relaxed text-ink/85">
            <UserCheck size={16} className="mt-0.5 shrink-0 text-violet-deep" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-ink">Mon rôle : </strong>
              {project.role}
            </span>
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-5 py-2.5"
          >
            <Github size={16} aria-hidden="true" />
            Voir le code source
            <span className="sr-only">de {project.name} (ouvre un nouvel onglet)</span>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2.5"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Voir la démo
              <span className="sr-only">de {project.name} (ouvre un nouvel onglet)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projets" aria-labelledby="titre-projets" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="titre-projets"
              eyebrow="Projets"
              title="Des projets qui répondent à de vrais besoins."
              description="Chaque projet part d'un besoin concret : une plateforme de santé, un service de messages pour les adhérents d'une mutuelle, et une solution développée pour un hackathon. Le code source est accessible sur GitHub."
            />
            <a
              href="https://github.com/medja314-commits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink underline decoration-rose underline-offset-4 transition hover:text-violet-deep"
            >
              Tous mes dépôts sur GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">(ouvre un nouvel onglet)</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 120} variant={i % 2 === 0 ? 'left' : 'right'} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
