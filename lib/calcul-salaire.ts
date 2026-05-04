export interface ResultatCalcul {
  brut: number
  net: number
  netImposable: number
  cotisations: number
  tauxGlobal: number
  detail: {
    assuranceMaladie: number
    retraitePlafonnee: number
    retraiteDeplafonee: number
    assuranceChomage: number
    retraiteComplementaire: number
    csgCrds: number
  }
}

export function calculerSalaireNet(
  brut: number,
  cadre = false,
  publicSector = false
): ResultatCalcul {
  if (publicSector) {
    // Secteur public : taux réduit ~16.5%
    const cotisations = brut * 0.165
    return {
      brut,
      net: Math.round(brut - cotisations),
      netImposable: Math.round(brut - cotisations * 0.1),
      cotisations: Math.round(cotisations),
      tauxGlobal: 16.5,
      detail: {
        assuranceMaladie: Math.round(brut * 0.0075),
        retraitePlafonnee: Math.round(brut * 0.0891),
        retraiteDeplafonee: Math.round(brut * 0),
        assuranceChomage: 0,
        retraiteComplementaire: Math.round(brut * 0.03),
        csgCrds: Math.round(brut * 0.9825 * 0.0397),
      },
    }
  }

  // Secteur privé
  const tauxSecu = 0.0075
  const tauxVieillesse = 0.069
  const tauxVieillDep = 0.004
  const tauxChomage = 0.024
  const tauxRetraiteComp = cadre ? 0.0629 : 0.0428

  const assietteCsg = brut * 0.9825
  const csgCrds = assietteCsg * 0.098

  const cotisationsHorsCsg =
    brut * (tauxSecu + tauxVieillesse + tauxVieillDep + tauxChomage + tauxRetraiteComp)
  const cotisations = cotisationsHorsCsg + csgCrds

  const net = brut - cotisations
  const tauxGlobal = (cotisations / brut) * 100

  return {
    brut,
    net: Math.round(net),
    netImposable: Math.round(net + assietteCsg * 0.029), // CSG non déductible réintégrée
    cotisations: Math.round(cotisations),
    tauxGlobal: Math.round(tauxGlobal * 10) / 10,
    detail: {
      assuranceMaladie: Math.round(brut * tauxSecu),
      retraitePlafonnee: Math.round(brut * tauxVieillesse),
      retraiteDeplafonee: Math.round(brut * tauxVieillDep),
      assuranceChomage: Math.round(brut * tauxChomage),
      retraiteComplementaire: Math.round(brut * tauxRetraiteComp),
      csgCrds: Math.round(csgCrds),
    },
  }
}

// Inverse : net → brut (approximation)
export function netVersBrut(net: number, cadre = false): number {
  const tauxApprox = cadre ? 0.25 : 0.228
  return Math.round(net / (1 - tauxApprox))
}

export function formatEuros(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}
