// Genera las pinturas de EJEMPLO de la demo (public/obras/*.svg).
// No son obra de José Luis Malo: se reemplazan por fotos reales cuando registre.
// Uso: node scripts/pinturas.mjs
import { writeFileSync } from 'node:fs'

function azar(semilla) {
  let s = semilla
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

// Trazo de pincel: polígono irregular alrededor de una línea
function trazo(r, x1, y1, x2, y2, grosor) {
  const pasos = 14
  const ida = []
  const vuelta = []
  const ang = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos
    const x = x1 + (x2 - x1) * t
    const y = y1 + (y2 - y1) * t
    const g = grosor * (0.55 + r() * 0.6) * Math.sin(Math.PI * (0.08 + t * 0.84))
    ida.push(`${(x + Math.cos(ang) * g).toFixed(1)},${(y + Math.sin(ang) * g).toFixed(1)}`)
    vuelta.unshift(`${(x - Math.cos(ang) * g).toFixed(1)},${(y - Math.sin(ang) * g).toFixed(1)}`)
  }
  return `M${ida.join(' L')} L${vuelta.join(' L')} Z`
}

function lienzo(contenido, fondo, semilla) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
<defs>
<filter id="pincel" x="-10%" y="-10%" width="120%" height="120%">
<feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="${semilla}"/>
<feDisplacementMap in="SourceGraphic" scale="14"/>
</filter>
<filter id="grano"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${semilla + 3}"/>
<feColorMatrix values="0 0 0 0 0.17  0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 0.16 0"/></filter>
</defs>
<rect width="600" height="800" fill="${fondo}"/>
<g filter="url(#pincel)">${contenido}</g>
<rect width="600" height="800" filter="url(#grano)"/>
</svg>`
}

// "Los olvidados": figuras verticales que se desvanecen sobre un fondo terroso
function olvidados() {
  const r = azar(7)
  let c = ''
  const capas = ['#8C4932', '#A2563D', '#6E4B36', '#C06E52']
  for (let i = 0; i < 26; i++) {
    const y = r() * 800
    c += `<path d="${trazo(r, -40, y, 640, y + (r() - 0.5) * 120, 40 + r() * 50)}" fill="${capas[i % 4]}" opacity="${0.35 + r() * 0.4}"/>`
  }
  const tonos = ['#2B2622', '#3A322C', '#4A3F37', '#5E534A', '#7A6E62', '#9C9084', '#BDB2A4']
  for (let i = 0; i < 7; i++) {
    const x = 70 + i * 72 + (r() - 0.5) * 20
    const alto = 280 + r() * 160
    const base = 700 - r() * 40
    c += `<ellipse cx="${x}" cy="${base - alto - 34}" rx="${22 + r() * 6}" ry="${28 + r() * 6}" fill="${tonos[i]}" opacity="${0.92 - i * 0.1}"/>`
    c += `<path d="${trazo(r, x, base - alto, x + (r() - 0.5) * 16, base, 36 + r() * 12)}" fill="${tonos[i]}" opacity="${0.92 - i * 0.1}"/>`
  }
  for (let i = 0; i < 10; i++) {
    const x = r() * 600
    c += `<path d="${trazo(r, x, 0, x + (r() - 0.5) * 80, 800, 4 + r() * 6)}" fill="#F6F1EA" opacity="${0.08 + r() * 0.12}"/>`
  }
  c += `<path d="${trazo(r, 40, 740, 560, 755, 16)}" fill="#2B2622" opacity="0.7"/>`
  return lienzo(c, '#D9C2A3', 11)
}

// "Sin título I, II, III": campos de color con trazos gestuales
function sinTitulo(semilla, fondo, paleta) {
  const r = azar(semilla)
  let c = ''
  for (let i = 0; i < 34; i++) {
    const x = r() * 600
    const y = r() * 800
    const largo = 160 + r() * 380
    const a = r() * Math.PI
    c += `<path d="${trazo(r, x, y, x + Math.cos(a) * largo, y + Math.sin(a) * largo, 18 + r() * 46)}" fill="${paleta[i % paleta.length]}" opacity="${0.45 + r() * 0.45}"/>`
  }
  return lienzo(c, fondo, semilla)
}

const salida = new URL('../public/obras/', import.meta.url)
writeFileSync(new URL('los-olvidados.svg', salida), olvidados())
writeFileSync(new URL('sin-titulo-1.svg', salida), sinTitulo(23, '#E8DCC8', ['#2B2622', '#C06E52', '#5E6C52', '#F6F1EA']))
writeFileSync(new URL('sin-titulo-2.svg', salida), sinTitulo(41, '#2B2622', ['#C9A24B', '#A2563D', '#E8DCC8', '#5E6C52']))
writeFileSync(new URL('sin-titulo-3.svg', salida), sinTitulo(59, '#B9C2B0', ['#2F5D62', '#2B2622', '#F6F1EA', '#C06E52']))
console.log('4 pinturas de ejemplo en public/obras/')
