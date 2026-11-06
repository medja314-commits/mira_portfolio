<<<<<<< HEAD
# Portfolio — Mira EDJA

Portfolio de développeuse Web & Mobile, construit avec React, TypeScript, Vite et Tailwind CSS.
Tout le contenu provient du CV et des dépôts GitHub. Il se modifie dans un seul fichier : `src/data/portfolio.ts`.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vérifie TypeScript et produit le dossier dist/
npm run preview    # prévisualise le build
```

## Structure

```
src/
├── data/portfolio.ts        # Contenu : profil, compétences, projets, parcours, contact
├── components/              # Une section = un composant
│   ├── Hero.tsx  About.tsx  Skills.tsx  Projects.tsx  Journey.tsx  Contact.tsx  Footer.tsx
│   ├── Navbar.tsx  Reveal.tsx (apparition au scroll)  SectionHeading.tsx  GithubIcon.tsx
├── index.css                # Palette et styles (tokens Tailwind dans @theme)
public/
├── cv/CV-Mira-EDJA.pdf      # Bouton « Télécharger mon CV »
├── images/mira-profil.*     # Photo de profil (jpg + webp)
└── favicon.svg
```

## Ajouter des captures d'écran aux projets

Déposer les images dans `public/projects/`, puis renseigner le champ `image` du projet dans `src/data/portfolio.ts` :

```ts
image: "/projects/passsante.png",
```

Tant que ce champ est vide, une carte de remplacement est affichée.

## Ajouter une démo

Renseigner le champ `demo` d'un projet (URL). Le bouton « Voir la démo » apparaît alors automatiquement.

## Formulaire de contact

Le formulaire valide les champs (nom, e-mail, message) puis envoie le message à l'adresse définie dans `VITE_FORM_ENDPOINT`.

1. Créer un formulaire gratuit sur [Formspree](https://formspree.io) (il fournit une URL du type `https://formspree.io/f/xxxxxxx`).
2. Copier `.env.example` en `.env` et renseigner `VITE_FORM_ENDPOINT`.
3. Définir la même variable dans les paramètres d'environnement de l'hébergeur (voir ci-dessous).

Sans cette variable, le formulaire ouvre simplement le client mail avec le message pré-rempli.

## Déploiement

Site statique : n'importe quel hébergeur de fichiers statiques convient.

- **Vercel / Netlify** : importer le dépôt, commande de build `npm run build`, dossier de sortie `dist`.
- **GitHub Pages** : ajouter `base: '/nom-du-depot/'` dans `vite.config.ts` si le site n'est pas à la racine.

## Liens à compléter

- LinkedIn : aucune URL n'a été fournie. Ajouter le lien dans `profile` (`src/data/portfolio.ts`) et dans `Hero.tsx` / `Contact.tsx` si besoin.
=======
# mira_portfolio
>>>>>>> 0fb5e4aab58890a834d8e32b060e00fd2430b489
