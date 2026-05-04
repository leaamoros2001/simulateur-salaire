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
        {/* Google AdSense — décommenter après approbation */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-VOTRE_ID"
          crossOrigin="anonymous"
        /> */}
        {/* Google Analytics — décommenter après setup */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
