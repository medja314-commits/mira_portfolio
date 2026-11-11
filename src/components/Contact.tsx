import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import { Github } from './GithubIcon'
import { Linkedin } from './LinkedinIcon'
import { contactIntro, profile } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type FormValues = { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>
type Status = 'idle' | 'sending' | 'sent' | 'opened-mail' | 'error'

// Adresse de réception du formulaire (service compatible JSON, par ex. Formspree).
// Si elle n'est pas définie, le formulaire ouvre le client mail avec le message pré-rempli.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Merci d’indiquer votre nom (2 caractères minimum).'
  if (!email) errors.email = 'Merci d’indiquer votre adresse e-mail.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Cette adresse e-mail ne semble pas valide.'
  if (message.length < 10) errors.message = 'Votre message doit contenir au moins 10 caractères.'
  else if (message.length > 2000) errors.message = 'Votre message ne doit pas dépasser 2000 caractères.'

  return errors
}

const fieldClass =
  'mt-2 w-full rounded-2xl border border-lavender bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition focus:border-violet-deep focus:outline-none focus:ring-2 focus:ring-violet-deep/20 aria-[invalid=true]:border-red-700'

export function Contact() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('') // champ piège contre les robots, masqué aux visiteurs

  const update = (field: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const sendWithEndpoint = async () => {
    const res = await fetch(FORM_ENDPOINT!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  }

  const openMailClient = () => {
    const subject = encodeURIComponent(`Contact depuis le portfolio : ${values.name.trim()}`)
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (honeypot) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('idle')
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    if (!FORM_ENDPOINT) {
      openMailClient()
      setStatus('opened-mail')
      return
    }

    setStatus('sending')
    try {
      await sendWithEndpoint()
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-labelledby="titre-contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <SectionHeading id="titre-contact" eyebrow="Contact" title="Parlons de votre projet ou d'une opportunité." description={contactIntro} />

          <ul className="mt-10 space-y-4 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-ink transition hover:text-violet-deep">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-violet-deep">
                  <Mail size={18} aria-hidden="true" />
                </span>
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-ink transition hover:text-violet-deep"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-violet-deep">
                  <Github size={18} aria-hidden="true" />
                </span>
                github.com/medja314-commits
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-ink transition hover:text-violet-deep"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-violet-deep">
                  <Linkedin size={17} aria-hidden="true" />
                </span>
                linkedin.com/in/miraedja
                <span className="sr-only">(ouvre un nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8" aria-labelledby="titre-formulaire">
            <h3 id="titre-formulaire" className="font-display text-xl font-semibold text-ink">
              Envoyer un message
            </h3>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-ink">
                Nom complet <span className="text-violet-deep" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={update('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={fieldClass}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-700">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Adresse e-mail <span className="text-violet-deep" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={update('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={fieldClass}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-700">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-ink">
                Message <span className="text-violet-deep" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${fieldClass} resize-y`}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-red-700">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Champ piège : invisible pour les visiteurs humains. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Ne pas remplir</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
              <Send size={16} aria-hidden="true" />
              {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>

            <div role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
              {status === 'sent' && <p className="text-ink">Merci, votre message a bien été envoyé. Je vous répondrai rapidement.</p>}
              {status === 'opened-mail' && (
                <p className="text-ink">Votre application de messagerie s'ouvre avec le message prérempli.</p>
              )}
              {status === 'error' && (
                <p className="text-red-700">
                  L'envoi n'a pas abouti. Vous pouvez réessayer ou écrire directement à {profile.email}.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
