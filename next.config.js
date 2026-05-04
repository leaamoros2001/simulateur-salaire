/** @type {import('next').NextConfig} */
const nextConfig = {
  // Génération statique de toutes les pages SEO au build
  output: 'export', // Décommenter si tu veux un export 100% statique
  // Pour Vercel, laisse vide (génération hybride)
}

module.exports = nextConfig
