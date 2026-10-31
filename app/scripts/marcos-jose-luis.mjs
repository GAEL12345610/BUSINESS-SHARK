// Marcos "foto pendiente" para las obras de José Luis Malo en la demo.
// NO son su obra: son una tela vacía con el título. Cuando él dé permiso,
// pon sus fotos en public/obras/jose-luis/<nombre>.jpg y cambia "imagen" en
// src/data/demo.ts (DECISIONES #42). Uso: node scripts/marcos-jose-luis.mjs
import { writeFileSync } from 'node:fs'

const OBRAS = {
  toricleto: ['Toricleto', 'Óleo sobre tela · 100 × 80 cm'],
  'diana-y-la-patria-naufraga': ['Diana y la', 'Patria Náufraga', 'Óleo sobre tela'],
  caminantes: ['Caminantes', 'Serie'],
  'viejo-loco': ['Viejo loco', '2016'],
  'configuraciones-de-un-personaje': ['Configuraciones', 'de un personaje', '1998'],
}

for (const [archivo, lineas] of Object.entries(OBRAS)) {
  const ficha = lineas.length > 1 && /cm|Óleo|Serie|\d{4}/.test(lineas.at(-1)) ? lineas.at(-1) : ''
  const titulo = ficha ? lineas.slice(0, -1) : lineas
  const t = titulo
    .map((l, i) => `<text x="300" y="${390 + i * 46 - (titulo.length - 1) * 23}" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="600" fill="#2B2622" text-anchor="middle">${l}</text>`)
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <pattern id="tela" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="#EFE7DA"/>
      <path d="M0 3h6M3 0v6" stroke="#E2D7C5" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="600" height="800" fill="url(#tela)"/>
  <rect x="28" y="28" width="544" height="744" fill="none" stroke="#D3C6B1" stroke-width="2" stroke-dasharray="10 8"/>
  <text x="300" y="300" font-family="ui-monospace, Menlo, monospace" font-size="16" letter-spacing="4" fill="#5E6C52" text-anchor="middle">FOTO PENDIENTE</text>
  ${t}
  ${ficha ? `<text x="300" y="${470 + (titulo.length - 1) * 23}" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="#5E6C52" text-anchor="middle">${ficha}</text>` : ''}
  <text x="300" y="700" font-family="Helvetica, Arial, sans-serif" font-size="17" fill="#5E6C52" text-anchor="middle">José Luis Malo</text>
  <text x="300" y="726" font-family="Helvetica, Arial, sans-serif" font-size="15" fill="#8A8E7E" text-anchor="middle">La foto se toma con él en la sesión de registro</text>
</svg>
`
  writeFileSync(new URL(`../public/obras/jose-luis/${archivo}.svg`, import.meta.url), svg)
}
console.log('listo')
