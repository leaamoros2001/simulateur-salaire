import type { Metadata } from 'next'
import Link from 'next/link'
import Simulateur from '@/components/Simulateur'

export const metadata: Metadata = {
  title: 'Simulateur avancé salaire brut net 2026 — Cadre, public, privé',
  description:
    'Calculateur de salaire brut en net avec options avancées : cadre/non-cadre, secteur public/privé, calcul inverse net vers brut.',
}

export default function CalculerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="text-blue-600 font-semibold">salaire-net.fr</Link>
          <span>/</span>
          <span className="text-gray-700">Simulateur avancé</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Simulateur salaire brut / net 2026
        </h1>
        <p className="text-gray-500 mb-8">
          Calcul précis avec détail des cotisations. Cadre, non-cadre, public ou privé.
          Conversion brut → net et net → brut.
        </p>
        <Simulateur />
      </div>
    </main>
  )
}
