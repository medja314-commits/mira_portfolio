// Contenu du portfolio. Toutes les informations proviennent du CV (CV-Mira-EDJA.pdf)
// et des dépôts GitHub fournis. Ne rien ajouter ici qui ne soit pas vérifiable.

export const profile = {
  firstName: "Mira",
  lastName: "EDJA",
  title: "Développeuse Web & Mobile",
  tagline: "L'ingénierie logicielle au service d'idées qui font la différence.",
  intro:
    "Étudiante en dernière année de licence Systèmes Informatiques et Génie Logiciel à l'ESATIC, à Abidjan. Je développe des applications web, mobiles et des API REST, et je m'intéresse de près à l'intelligence artificielle.",
  email: "medja314@gmail.com",
  github: "https://github.com/medja314-commits",
  linkedin: "https://www.linkedin.com/in/miraedja",
  cvPath: "/cv/CV-Mira-EDJA.pdf",
  photo: { jpg: "/images/mira-profil.jpg", webp: "/images/mira-profil.webp" },
  location: "Abidjan, Côte d'Ivoire",
  languages: ["Français", "Anglais"],
  strengths: ["Curiosité", "Rigueur", "Esprit d'équipe"],
};

export const aboutParagraphs = [
  "Je suis étudiante à l'ESATIC, à Abidjan. Après une première année en Systèmes Informatiques, Réseaux et Télécommunications, je poursuis mon cursus en Systèmes Informatiques et Génie Logiciel, où j'apprends à concevoir des logiciels structurés et maintenables.",
  "Mon intérêt va au développement web frontend et backend, aux applications mobiles, et à l'intégration de modèles d'intelligence artificielle. J'aime les projets qui répondent à des problèmes réels.",
  "Je contribue actuellement à la brique IA/ML d'un projet d'équipe de gestion intelligente de l'énergie : prévision de consommation, détection d'anomalies et assistant conversationnel. Je renforce aussi mes compétences en machine learning avec PyTorch et les assistants basés sur des LLM, lors de projets personnels et de hackathons combinant IA et IoT.",
  "Rigoureuse et orientée résultats, je recherche un stage de trois mois pour valider mon diplôme et continuer à progresser au sein d'une équipe.",
];

export type SkillGroup = { title: string; items: string[] };

// Compétences extraites du CV et, pour le frontend et les API, des dépôts GitHub.
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "API REST", "FastAPI", "Java (POO)", "C++ (POO)", "Structures de données & algorithmique"],
  },
  {
    title: "Développement mobile",
    items: ["React Native", "Expo", "Kotlin"],
  },
  {
    title: "Bases de données",
    items: ["Firestore", "Règles de sécurité Firestore", "Modélisation des données"],
  },
  {
    title: "Intelligence artificielle",
    items: ["Python", "Machine learning", "PyTorch", "Scikit-learn", "Pandas", "Évaluation de modèles (MAE)", "RAG", "Assistants LLM"],
  },
  {
    title: "Outils & environnements",
    items: ["Git", "GitHub", "Figma", "Render", "ESP32 & capteurs (IoT)"],
  },
];

export type Project = {
  id: string;
  name: string;
  summary: string;
  problem: string;
  features: string[];
  tech: string[];
  role?: string;
  status: string;
  repo: string;
  demo?: string; // aucune démo fournie pour l'instant : le bouton n'apparaît pas tant que ce champ est vide
  image?: ProjectImage;
};

// Photo d'illustration (banque d'images libre) : ce n'est pas une capture du projet.
// Le crédit est affiché sur la carte, comme l'exigent les licences CC BY.
export type ProjectImage = {
  webp: string;
  jpg: string;
  alt: string;
  credit: { author: string; license: string; url: string };
};

export const projects: Project[] = [
  {
    id: "passsante",
    name: "PassSanté",
    summary: "Plateforme hospitalière : espaces professionnel, patient et administration, avec un assistant IA encadré.",
    problem:
      "Réunir dans un même outil la gestion des patients, les rendez-vous, le suivi médical et l'administration, tout en proposant un assistant IA qui reste fiable et traçable.",
    features: [
      "Espaces dédiés selon le rôle (professionnels, patients, administration) avec contrôle d'accès",
      "Gestion des patients, des dossiers, des rendez-vous et des constantes vitales",
      "Assistant IA fondé sur la recherche de passages (RAG) : il cite ses sources et ne pose pas de diagnostic",
      "Recherche web pour les questions de santé générale, avec anonymisation des données",
      "Administration : validation des comptes, gestion des rôles et journal d'audit",
    ],
    tech: ["TypeScript", "Next.js", "React", "Firebase", "RAG", "API de recherche web (Tavily)"],
    role: "Responsable du module Assistant IA (RAG), au sein d'une équipe de quatre personnes.",
    status: "Prototype de démonstration · données fictives",
    repo: "https://github.com/medja314-commits/PassSante",
    image: {
      webp: "/projects/passsante.webp",
      jpg: "/projects/passsante.jpg",
      alt: "Une médecin consulte un dossier patient sur une tablette, à son bureau.",
      credit: {
        author: "Shixart1985",
        license: "CC BY 2.0",
        url: "https://commons.wikimedia.org/wiki/File:Doctor_reviews_patient_information_on_tablet_in_an_office_setting.jpg",
      },
    },
  },
  {
    id: "lastic-whatsapp",
    name: "Service WhatsApp LASTIC",
    summary: "Service backend qui envoie automatiquement des confirmations de paiement et des relances via WhatsApp.",
    problem:
      "Informer les adhérents de la mutuelle LASTIC de leurs paiements et des cotisations en retard, par un canal qu'ils utilisent au quotidien.",
    features: [
      "Deux routes sécurisées : confirmation de paiement et relance de retard",
      "Authentification par clé d'API ; les jetons restent dans les variables d'environnement du serveur",
      "Journal des envois et suivi des références déjà envoyées",
      "Modèles de messages validés par Meta (API WhatsApp Cloud)",
      "Sans dépendance externe : Node.js natif, prêt pour un hébergement sur Render",
    ],
    tech: ["Node.js", "API WhatsApp Cloud (Meta)", "API REST", "Render"],
    status: "Service configuré pour Render",
    repo: "https://github.com/medja314-commits/lastic-whatsapp",
    image: {
      webp: "/projects/lastic-whatsapp.webp",
      jpg: "/projects/lastic-whatsapp.jpg",
      alt: "Deux mains tapent un message dans une conversation WhatsApp sur un smartphone.",
      credit: {
        author: "Helar Lukats",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Whatsapp_texting.jpg",
      },
    },
  },
  {
    id: "renewguard-ai",
    name: "Renewguard-ai",
    summary: "Projet créé pour l'hackathon SIREX, édition 2026.",
    problem: "Solution développée dans le cadre de l'hackathon SIREX 2026.",
    features: [],
    tech: [],
    status: "En cours de développement",
    repo: "https://github.com/medja314-commits/Renewguard-ai",
    image: {
      webp: "/projects/renewguard-ai.webp",
      jpg: "/projects/renewguard-ai.jpg",
      alt: "Des techniciens transportent des panneaux solaires dans un village.",
      credit: {
        author: "IAfrica76",
        license: "CC0",
        url: "https://commons.wikimedia.org/wiki/File:Innovation_Africa_-_solar_panels.jpg",
      },
    },
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  organisation: string;
  location?: string;
  description?: string;
};

export const education: TimelineItem[] = [
  {
    period: "2025 – aujourd'hui",
    title: "Licence Systèmes Informatiques et Génie Logiciel",
    organisation: "ESATIC",
    location: "Treichville, Abidjan",
    description: "Dernière année de licence.",
  },
  {
    period: "2024 – 2025",
    title: "Licence 1 Systèmes Informatiques, Réseaux et Télécommunications",
    organisation: "ESATIC",
    location: "Treichville, Abidjan",
  },
  {
    period: "2023 – 2024",
    title: "Baccalauréat D",
    organisation: "Collège Saint Viateur d'Abidjan",
    location: "Abidjan",
  },
];

export const experience: TimelineItem[] = [
  {
    period: "2026",
    title: "Membre d'équipe, participation à des hackathons",
    organisation: "Hackathons",
    location: "Abidjan",
    description: "Contribution à des projets combinant IoT et intelligence artificielle, notamment avec l'ESP32 et des capteurs.",
  },
  {
    period: "2025",
    title: "Assistante de formation digitale",
    organisation: "Digital 60",
    location: "Abidjan",
    description: "Accompagnement des participants et assistance lors des formations numériques.",
  },
];

export const otherWork = [
  {
    name: "Site web EMLI",
    description: "Développement du site web du projet EMLI.",
  },
  {
    name: "IVOX AI",
    description: "Application d'apprentissage des langues locales ivoiriennes, avec une composante IA.",
  },
  {
    name: "Application de gestion des notes",
    description: "Application pour la gestion des notes.",
  },
];

export const contactIntro =
  "Vous êtes recruteur, responsable de stage ou professionnel du secteur informatique ? Je serais ravie d'échanger avec vous sur une opportunité de stage ou de collaboration.";
