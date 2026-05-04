import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Simulateur from '@/components/Simulateur'
import { calculerSalaireNet, formatEuros } from '@/lib/calcul-salaire'
import { PAGES_SEO, getPageSeo, getPageTitle, getPageDescription } from '@/lib/pages-seo'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return PAGES_SEO.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPageSeo(params.slug)
  if (!page) return {}

  const result = calculerSalaireNet(page.brut, page.cadre)
  const title = getPageTitle(page, result.net)
  const description = getPageDescription(page, result.net, result.tauxGlobal)

  return {
    title,
    description,
    keywords: `${page.brut} brut en net, salaire net ${page.brut}, calcul salaire ${page.brut} euros`,
    openGraph: { title, description, type: 'website' },
    alternates: {
      canonical: `https://salaire-net.fr/salaire/${page.slug}`,
    },
  }
}

export default function PageSalaire({ params }: Props) {
  const page = getPageSeo(params.slug)
  if (!page) notFound()

  const result = calculerSalaireNet(page.brut, page.cadre)
  const label = page.label ?? `${page.brut}€ brut`

  // Pages voisines pour le maillage interne
  const idx = PAGES_SEO.findIndex(p => p.slug === page.slug)
  const voisines = [
    PAGES_SEO[idx - 2],
    PAGES_SEO[idx - 1],
    PAGES_SEO[idx + 1],
    PAGES_SEO[idx + 2],
  ].filter(Boolean)

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Combien vaut ${label} en salaire net ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${label} correspond à ${formatEuros(result.net)} net par mois en 2026, soit ${formatEuros(result.net * 12)} net par an. Le taux de prélèvement est de ${result.tauxGlobal}%.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quelles sont les cotisations pour ${label} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pour un salaire de ${label}, les cotisations salariales s'élèvent à ${formatEuros(result.cotisations)} par mois (${result.tauxGlobal}% du brut).`,
        },
      },
    ],
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="text-blue-600 font-semibold">salaire-net.fr</Link>
          <span>/</span>
          <span className="text-gray-700">{label}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {label} en net : <span className="text-blue-600">{formatEuros(result.net)}</span>
              </h1>
              <p className="text-gray-500">Calcul basé sur les taux de cotisations 2026</p>
            </div>

            {/* Résultat principal */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Salaire brut</p>
                    <p className="text-xl font-bold">{formatEuros(page.brut)}</p>
                    <p className="text-blue-300 text-xs">/mois</p>
                  </div>
                  <div className="text-3xl font-light flex items-center justify-center opacity-50">→</div>
                  <div>
                    <p className="text-blue-200 text-xs mb-1">Salaire net</p>
                    <p className="text-2xl font-bold">{formatEuros(result.net)}</p>
                    <p className="text-blue-300 text-xs">/mois</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  ['Salaire brut mensuel', formatEuros(page.brut), 'gray'],
                  ['Assurance maladie', `−${formatEuros(result.detail.assuranceMaladie)}`, 'red'],
                  ['Retraite (base)', `−${formatEuros(result.detail.retraitePlafonnee + result.detail.retraiteDeplafonee)}`, 'red'],
                  ['Assurance chômage', `−${formatEuros(result.detail.assuranceChomage)}`, 'red'],
                  ['Retraite complémentaire', `−${formatEuros(result.detail.retraiteComplementaire)}`, 'red'],
                  ['CSG / CRDS', `−${formatEuros(result.detail.csgCrds)}`, 'red'],
                ].map(([label, val, color]) => (
                  <div key={label as string} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600">{label as string}</span>
                    <span className={`text-sm font-semibold ${color === 'red' ? 'text-red-500' : 'text-gray-900'}`}>
                      {val as string}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-gray-900">Salaire net mensuel</span>
                  <span className="font-bold text-blue-600 text-lg">{formatEuros(result.net)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Salaire net annuel</span>
                  <span className="text-sm font-semibold text-gray-700">{formatEuros(result.net * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Taux de prélèvement</span>
                  <span className="text-sm font-semibold text-gray-700">{result.tauxGlobal}%</span>
                </div>
              </div>
            </div>

            {/* Emplacement AdSense */}
            <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200">
              {/* Google AdSense — remplacer par le code AdSense ici */}
              Emplacement publicité
            </div>

            {/* FAQ */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Questions fréquentes</h2>
              {[
                {
                  q: `Combien vaut ${label} en salaire net annuel ?`,
                  a: `Un salaire de ${label} représente ${formatEuros(result.net * 12)} net par an, soit ${formatEuros(result.net)} net par mois.`,
                },
                {
                  q: `Quel est le taux de cotisations pour ${label} ?`,
                  a: `Pour ${label}, le taux de cotisations salariales est de ${result.tauxGlobal}%, soit ${formatEuros(result.cotisations)} de charges par mois.`,
                },
                {
                  q: `${label} est-ce un bon salaire en France ?`,
                  a: `Le salaire médian en France est d'environ 2 590€ brut (2 020€ net). ${label} (${formatEuros(result.net)} net) se situe ${result.net > 2020 ? 'au-dessus' : 'en-dessous'} de la médiane nationale.`,
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700">Calculer un autre montant</h2>
            <Simulateur brutInitial={page.brut} />

            {/* Liens voisins */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Montants proches</p>
              <div className="space-y-2">
                {voisines.map(v => {
                  const r = calculerSalaireNet(v.brut, v.cadre)
                  return (
                    <Link
                      key={v.slug}
                      href={`/salaire/${v.slug}`}
                      className="flex justify-between items-center py-1.5 text-sm hover:text-blue-600 transition-colors"
                    >
                      <span className="text-gray-600">{v.label ?? `${v.brut}€ brut`}</span>
                      <span className="font-medium">{formatEuros(r.net)}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <Link
              href="/"
              className="block text-center bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              ← Retour au simulateur
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
