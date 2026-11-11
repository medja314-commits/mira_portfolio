type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
}

// Le filet sous le sur-titre se dessine quand le bloc parent (<Reveal>) devient visible.
export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="inline-flex flex-col gap-2 text-xs font-semibold tracking-[0.18em] text-violet-deep uppercase">
        {eyebrow}
        <span aria-hidden="true" className="eyebrow-line h-0.5 w-12 rounded-full bg-gradient-to-r from-violet-deep to-rose" />
      </p>
      <h2 id={id} className="section-title mt-3">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  )
}
