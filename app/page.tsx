'use client'

import Simulateur from '@/components/Simulateur'
import Link from 'next/link'
import { PAGES_SEO } from '@/lib/pages-seo'
import { calculerSalaireNet, formatEuros } from '@/lib/calcul-salaire'

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
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">salaire-net.fr</Link>
          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/calculer" className="hover:text-blue-600">Simulateur avancé</Link>
          </nav>
        </div>
      </header>

      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Simulateur salaire <span className="text-blue-600">brut en net 2026</span>
          </h1>
          <p className="text-gray-500 mb-8">Calcul instantané basé sur les taux 2026.</p>
          <Simulateur />
        </div>
      </section>

      <section className="bg-blue-600 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="text-white flex-1">
            <p className="font-semibold">Mise à jour 2027 disponible dès janvier</p>
            <p className="text-blue-200 text-sm">Recevez les nouveaux taux dès leur publication</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input type="email" placeholder="votre@email.fr" className="px-4 py-2 rounded-lg flex-1 sm:w-64 text-sm focus:outline-none" />
            <button type="button" className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
              Me notifier
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Calculs fréquents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {pages.map(page => {
            const r = calculerSalaireNet(page.brut, page.cadre)
            return (
              <Link key={page.slug} href={`/salaire/${page.slug}`} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
                <p className="text-xs text-gray-400 mb-1">{page.label ?? `${page.brut}€ brut`}</p>
                <p className="text-lg font-bold text-gray-900">{formatEuros(r.net)}</p>
                <p className="text-xs text-gray-400">net/mois</p>
              </Link>
            )
          })}
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-gray-400">
          Calculs basés sur les taux officiels 2026. © 2026 salaire-net.fr
        </div>
      </footer>
    </main>
  )
}