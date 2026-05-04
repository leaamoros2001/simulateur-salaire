'use client'

import { useState } from 'react'
import { calculerSalaireNet, formatEuros, netVersBrut } from '@/lib/calcul-salaire'

export default function Simulateur({ brutInitial = 2500 }: { brutInitial?: number }) {
  const [brut, setBrut] = useState(brutInitial)
  const [cadre, setCadre] = useState(false)
  const [publicSector, setPublicSector] = useState(false)
  const [mode, setMode] = useState<'brut-vers-net' | 'net-vers-brut'>('brut-vers-net')
  const [inputValue, setInputValue] = useState(String(brutInitial))

  const result = mode === 'brut-vers-net'
    ? calculerSalaireNet(brut, cadre, publicSector)
    : calculerSalaireNet(netVersBrut(brut, cadre), cadre, publicSector)

  const displayed = mode === 'brut-vers-net' ? result : { ...result, brut: netVersBrut(brut, cadre) }

  function handleInput(val: string) {
    setInputValue(val)
    const num = parseFloat(val.replace(',', '.'))
    if (!isNaN(num) && num > 0) setBrut(num)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Tabs mode */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setMode('brut-vers-net')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            mode === 'brut-vers-net'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Brut → Net
        </button>
        <button
          onClick={() => setMode('net-vers-brut')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            mode === 'net-vers-brut'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Net → Brut
        </button>
      </div>

      <div className="p-6">
        {/* Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Salaire {mode === 'brut-vers-net' ? 'brut' : 'net'} mensuel (€)
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputValue}
              onChange={e => handleInput(e.target.value)}
              className="w-full px-4 py-3 pr-10 text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: 2500"
              min={0}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
          </div>
          {/* Slider */}
          <input
            type="range"
            min={500}
            max={15000}
            step={50}
            value={brut}
            onChange={e => {
              setBrut(Number(e.target.value))
              setInputValue(String(e.target.value))
            }}
            className="w-full mt-3 accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>500€</span><span>15 000€</span>
          </div>
        </div>

        {/* Options */}
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setCadre(!cadre)}
              className={`w-9 h-5 rounded-full transition-colors relative ${cadre ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cadre ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-gray-600">Cadre</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setPublicSector(!publicSector)}
              className={`w-9 h-5 rounded-full transition-colors relative ${publicSector ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${publicSector ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-gray-600">Secteur public</span>
          </label>
        </div>

        {/* Résultat principal */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-1">
                {mode === 'brut-vers-net' ? 'Salaire net mensuel' : 'Salaire brut mensuel'}
              </p>
              <p className="text-4xl font-bold text-blue-700">
                {mode === 'brut-vers-net'
                  ? formatEuros(result.net)
                  : formatEuros(displayed.brut)}
              </p>
              <p className="text-sm text-blue-500 mt-1">
                soit {mode === 'brut-vers-net'
                  ? formatEuros(result.net * 12)
                  : formatEuros(displayed.brut * 12)} / an
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-500 mb-1">Taux de prélèvement</p>
              <p className="text-2xl font-bold text-blue-600">{result.tauxGlobal}%</p>
            </div>
          </div>
        </div>

        {/* Détail cotisations */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Détail des cotisations</p>
          {[
            ['Assurance maladie', result.detail.assuranceMaladie],
            ['Retraite plafonnée', result.detail.retraitePlafonnee],
            ['Retraite déplafonnée', result.detail.retraiteDeplafonee],
            ['Assurance chômage', result.detail.assuranceChomage],
            ['Retraite complémentaire', result.detail.retraiteComplementaire],
            ['CSG / CRDS', result.detail.csgCrds],
          ].map(([label, val]) => (
            <div key={label as string} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-sm text-gray-600">{label as string}</span>
              <span className="text-sm font-medium text-red-500">−{formatEuros(val as number)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-semibold text-gray-700">Total cotisations</span>
            <span className="text-sm font-bold text-red-600">−{formatEuros(result.cotisations)}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-sm font-semibold text-gray-700">Salaire net imposable</span>
            <span className="text-sm font-bold text-gray-900">{formatEuros(result.netImposable)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
