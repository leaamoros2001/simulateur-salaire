import type { Metadata } from 'next'
import Simulateur from '@/components/Simulateur'
import Link from 'next/link'
import { PAGES_SEO } from '@/lib/pages-seo'
import { calculerSalaireNet, formatEuros } from '@/lib/calcul-salaire'

export const metadata: Metadata = {
  title: 'Simulateur Salaire Brut en Net 2026 — Calcul Instantané',
  description:
    'Calculez votre salaire net à partir du brut en 2026. Cadre, non-cadre, secteur public. Résultat instantané avec détail des cotisations.',
  keywords: 'salaire brut net, simulateur salaire, calcul salaire net, cotisations salariales 2026',
  openGraph: {
    title: 'Simulateur Salaire Brut en Net 2026',
    description: 'Calcul instantané de votre salaire net. Résultat en temps réel.',
    type: 'website',
  },
}

const PAGES_POPULAIRES = [
  'smic-net-2026',
  '2000-euros-brut-en-net',
  '2500-euros-brut-en-net',
  '3000-euros-brut-en-net',
  '4000-euros-brut-en-net',
  '5000-euros-brut-en-net',
  '35000-euros-brut-annuel-en-net',
  '50000-euros-brut-annuel-en-net',
]

export default function HomePage() {
  const pages = PAGES_SEO.filter(p => PAGES_POPULAIRES.includes(p.slug))

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            salaire-net.fr
          </Link>
          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/calculer" className="hover:text-blue-600">Simulateur avancé</Link>
            <Link href="/guide/brut-vs-net" className="hover:text-blue-600">C'est quoi le brut/net ?</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Simulateur salaire<br />
              <span className="text-blue-600">brut en net 2026</span>
            </h1>
            <p className="text-gray-500 mb-8">
              Calcul instantané basé sur les taux de cotisations 2026. Cadre, non-cadre, public ou privé.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Simulateur />
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h2 className="font-semibold text-blue-800 mb-2">💡 Le saviez-vous ?</h2>
                <p className="text-sm text-blue-700">
                  En France, les cotisations salariales représentent en moyenne <strong>22 à 25%</strong> du salaire brut pour un non-cadre dans le privé.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h2 className="font-semibold text-gray-800 mb-3">Références 2026</h2>
                <div className="space-y-2">
                  {[
                    { label: 'SMIC brut mensuel', val: '1 801,80 €' },
                    { label: 'SMIC net mensuel', val: '≈ 1 426 €' },
                    { label: 'Salaire médian brut', val: '≈ 2 590 €' },
                    { label: 'Salaire moyen brut', val: '≈ 3 200 €' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capture email */}
      <section className="bg-blue-600 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="text-white flex-1">
            <p className="font-semibold">Mise à jour 2027 disponible dès janvier</p>
            <p className="text-blue-200 text-sm">Recevez les nouveaux taux dès leur publication</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="votre@email.fr"
              className="px-4 py-2 rounded-lg flex-1 sm:w-64 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Me notifier
            </button>
          </form>
        </div>
      </section>

      {/* Pages populaires */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Calculs fréquents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {pages.map(page => {
            const r = calculerSalaireNet(page.brut, page.cadre)
            return (
              <Link
                key={page.slug}
                href={`/salaire/${page.slug}`}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <p className="text-xs text-gray-400 mb-1 group-hover:text-blue-400">
                  {page.label ?? `${page.brut}€ brut`}
                </p>
                <p className="text-lg font-bold text-gray-900">{formatEuros(r.net)}</p>
                <p className="text-xs text-gray-400">net/mois</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FAQ SEO */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Quelle est la différence entre salaire brut et salaire net ?',
              a: 'Le salaire brut est le montant total versé par l\'employeur avant déduction des cotisations sociales salariales. Le salaire net est ce que vous recevez réellement sur votre compte bancaire, après déduction de ces cotisations (retraite, assurance maladie, chômage, CSG/CRDS).',
            },
            {
              q: 'Quel est le taux de cotisations salariales en 2026 ?',
              a: 'En 2026, le taux global de cotisations salariales est d\'environ 22 à 25% du salaire brut pour un salarié du secteur privé (non-cadre). Pour un cadre, ce taux est légèrement supérieur (24-27%) en raison des cotisations de retraite complémentaire Agirc-Arrco plus élevées.',
            },
            {
              q: 'Comment calculer son salaire net à partir du brut ?',
              a: 'Pour une estimation rapide, multipliez votre salaire brut par 0,77 (non-cadre privé) ou par 0,75 (cadre privé). Pour un calcul précis, utilisez notre simulateur qui applique les vrais taux 2026 poste par poste.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-gray-400">
          Calculs basés sur les taux officiels 2026. Ce simulateur est fourni à titre indicatif.
          <br />
          © 2026 salaire-net.fr — Tous droits réservés
        </div>
      </footer>
    </main>
  )
}
