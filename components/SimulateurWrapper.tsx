'use client'

import Simulateur from './Simulateur'

export default function SimulateurWrapper({ brutInitial }: { brutInitial?: number }) {
  return <Simulateur brutInitial={brutInitial} />
}