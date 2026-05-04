# Simulateur Salaire Brut → Net 2026

Site Next.js optimisé SEO pour générer du trafic organique sur les requêtes "X euros brut en net".

## Structure

```
app/
├── page.tsx                    → Page d'accueil (simulateur + liens SEO)
├── calculer/page.tsx           → Simulateur avancé
├── salaire/[slug]/page.tsx     → ~40 pages SEO statiques
├── sitemap.ts                  → Sitemap auto (soumis à Google)
├── robots.ts                   → robots.txt
└── layout.tsx                  → Layout global (AdSense + Analytics)

lib/
├── calcul-salaire.ts           → Logique de calcul (taux 2026)
└── pages-seo.ts                → Liste des 40 pages à générer

components/
└── Simulateur.tsx              → Composant simulateur interactif
```

## Installation locale

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Déploiement sur Vercel (gratuit)

### Méthode 1 : Via GitHub (recommandé)
1. Pousse ce code sur un repo GitHub
2. Va sur vercel.com → "New Project"
3. Importe ton repo → Deploy
4. C'est tout ! Vercel détecte Next.js automatiquement

### Méthode 2 : Via CLI
```bash
npm install -g vercel
vercel
```

## Ajouter Google AdSense

1. Inscris-toi sur google.com/adsense
2. Attends l'approbation (besoin de ~20 pages de contenu)
3. Dans `app/layout.tsx`, décommente les lignes AdSense
4. Remplace `ca-pub-VOTRE_ID` par ton vrai ID

## Ajouter Google Analytics

1. Crée une propriété sur analytics.google.com
2. Dans `app/layout.tsx`, décommente les lignes Analytics
3. Remplace `G-XXXXXXXXXX` par ton ID de mesure

## Ajouter des pages SEO

Dans `lib/pages-seo.ts`, ajoute des entrées :
```typescript
{ slug: '1600-euros-brut-en-net', brut: 1600 },
```

## Domaine personnalisé

Dans Vercel → Settings → Domains → ajoute ton domaine.
Conseils pour le nom de domaine : salaire-net.fr, brut-en-net.fr, simulateur-salaire.fr

## Monétisation

- **AdSense** : 1-3€ RPM en France (finance/emploi)
- **Affiliation** : Lien vers des comparateurs de banques, mutuelles, courtiers
- **Email** : Capture email → newsletter mise à jour annuelle

## Roadmap SEO

- [ ] Semaine 1 : Deploy + Google Search Console
- [ ] Semaine 2 : Soumettre sitemap.xml
- [ ] Mois 1 : Premiers crawls Google
- [ ] Mois 2-3 : Premières positions sur longue traîne
- [ ] Mois 4-6 : Trafic significatif, AdSense approuvé
