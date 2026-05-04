export interface PageSeo {
  slug: string
  brut: number
  cadre?: boolean
  label?: string
}

export const PAGES_SEO: PageSeo[] = [
  // SMIC et bas salaires
  { slug: 'smic-net-2026', brut: 1801.8, label: 'SMIC net 2026' },
  { slug: '1200-euros-brut-en-net', brut: 1200 },
  { slug: '1300-euros-brut-en-net', brut: 1300 },
  { slug: '1400-euros-brut-en-net', brut: 1400 },
  { slug: '1500-euros-brut-en-net', brut: 1500 },
  { slug: '1600-euros-brut-en-net', brut: 1600 },
  { slug: '1700-euros-brut-en-net', brut: 1700 },
  { slug: '1800-euros-brut-en-net', brut: 1800 },
  { slug: '1900-euros-brut-en-net', brut: 1900 },
  // Salaires courants
  { slug: '2000-euros-brut-en-net', brut: 2000 },
  { slug: '2100-euros-brut-en-net', brut: 2100 },
  { slug: '2200-euros-brut-en-net', brut: 2200 },
  { slug: '2300-euros-brut-en-net', brut: 2300 },
  { slug: '2400-euros-brut-en-net', brut: 2400 },
  { slug: '2500-euros-brut-en-net', brut: 2500 },
  { slug: '2600-euros-brut-en-net', brut: 2600 },
  { slug: '2700-euros-brut-en-net', brut: 2700 },
  { slug: '2800-euros-brut-en-net', brut: 2800 },
  { slug: '2900-euros-brut-en-net', brut: 2900 },
  { slug: '3000-euros-brut-en-net', brut: 3000 },
  // Salaires moyens-élevés
  { slug: '3200-euros-brut-en-net', brut: 3200 },
  { slug: '3500-euros-brut-en-net', brut: 3500 },
  { slug: '3800-euros-brut-en-net', brut: 3800 },
  { slug: '4000-euros-brut-en-net', brut: 4000 },
  { slug: '4500-euros-brut-en-net', brut: 4500 },
  { slug: '5000-euros-brut-en-net', brut: 5000 },
  { slug: '6000-euros-brut-en-net', brut: 6000 },
  { slug: '7000-euros-brut-en-net', brut: 7000 },
  { slug: '8000-euros-brut-en-net', brut: 8000 },
  { slug: '10000-euros-brut-en-net', brut: 10000 },
  // Cadres
  { slug: '3000-euros-brut-en-net-cadre', brut: 3000, cadre: true, label: '3000€ brut en net (cadre)' },
  { slug: '4000-euros-brut-en-net-cadre', brut: 4000, cadre: true, label: '4000€ brut en net (cadre)' },
  { slug: '5000-euros-brut-en-net-cadre', brut: 5000, cadre: true, label: '5000€ brut en net (cadre)' },
  // Salaires annuels
  { slug: '30000-euros-brut-annuel-en-net', brut: 2500, label: '30 000€ brut annuel en net' },
  { slug: '35000-euros-brut-annuel-en-net', brut: 2916, label: '35 000€ brut annuel en net' },
  { slug: '40000-euros-brut-annuel-en-net', brut: 3333, label: '40 000€ brut annuel en net' },
  { slug: '45000-euros-brut-annuel-en-net', brut: 3750, label: '45 000€ brut annuel en net' },
  { slug: '50000-euros-brut-annuel-en-net', brut: 4166, label: '50 000€ brut annuel en net' },
  { slug: '60000-euros-brut-annuel-en-net', brut: 5000, label: '60 000€ brut annuel en net' },
]

export function getPageSeo(slug: string): PageSeo | undefined {
  return PAGES_SEO.find(p => p.slug === slug)
}

export function getPageTitle(page: PageSeo, net: number): string {
  if (page.label) return `${page.label} : ${net}€ net en 2026`
  return `${page.brut}€ brut en net${page.cadre ? ' (cadre)' : ''} : ${net}€ net en 2026`
}

export function getPageDescription(page: PageSeo, net: number, taux: number): string {
  const label = page.label ?? `${page.brut}€ brut`
  return `Combien vaut ${label} en salaire net ? En 2026, ${label} = ${net}€ net/mois (taux de cotisation : ${taux}%). Calcul détaillé des charges salariales.`
}
