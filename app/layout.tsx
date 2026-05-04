import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://salaire-net.fr'),
  title: {
    default: 'Simulateur Salaire Brut en Net 2026',
    template: '%s | salaire-net.fr',
  },
  description: 'Calculez votre salaire net à partir du brut en 2026.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="qwzRjTkP3JEPRHeHS1gZkMVT5aCTLxxkcEou391joV4" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}