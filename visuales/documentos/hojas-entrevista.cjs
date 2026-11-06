// Hojas de entrevista para imprimir y llenar a mano (artista y comprador).
// Las preguntas se LEEN de docs/ENTREVISTAS.md: si cambias una pregunta allá,
// vuelve a correr esto. Nunca escribas las preguntas aquí a mano.
// Uso, desde la raíz del repo: node visuales/documentos/hojas-entrevista.cjs
const { execFileSync } = require('node:child_process')
const { chromium } = require('playwright')
const fs = require('node:fs')
const path = require('node:path')

const RAIZ = path.join(__dirname, '../..')
const md = fs.readFileSync(path.join(RAIZ, 'docs/ENTREVISTAS.md'), 'utf8')
const fuentes = path.join(RAIZ, 'pitch/reunion-jose-luis/fuentes')

function seccion(titulo) {
  const i = md.indexOf(`## ${titulo}`)
  const j = md.indexOf('\n## ', i + 3)
  return md.slice(i, j === -1 ? undefined : j)
}
const html = (t) => execFileSync('pandoc', ['-f', 'gfm', '-t', 'html'], { input: t, encoding: 'utf8' }).replace(/^<p>|<\/p>\s*$/g, '')
function preguntas(texto) {
  return texto.split('\n').filter((l) => /^\d+\.\s/.test(l)).map((l) => html(l.replace(/^\d+\.\s/, '')))
}

const CSS = `
@font-face{font-family:Fraunces;src:url(file://${fuentes}/fraunces-latin-opsz-normal.woff2)}
@font-face{font-family:Schibsted;src:url(file://${fuentes}/schibsted-grotesk-latin-wght-normal.woff2);font-weight:400 900}
@font-face{font-family:Plex;src:url(file://${fuentes}/ibm-plex-mono-latin-400-normal.woff2)}
body{font:10.5pt/1.45 Schibsted,sans-serif;color:#2B2622}
h1{font:600 18pt Fraunces,Georgia,serif;margin:0}
.datos{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;margin:12px 0 16px;font-size:9.5pt}
.datos span{border-bottom:1px solid #b9ad9c;padding:6px 0}
.aviso{font:8.5pt Plex,monospace;color:#5E6C52;margin:4px 0 0}
ol{padding-left:1.2em;margin:0}
li{margin:0 0 4px;page-break-inside:avoid}
.lineas{height:58px;background:repeating-linear-gradient(#fff 0 27px,#d8cdbb 27px 28px);margin:4px 0 10px}
.bloque{font:600 11pt Fraunces,Georgia,serif;color:#A2563D;margin:14px 0 8px;border-top:1px solid #E5DDCF;padding-top:10px}
.salto{page-break-before:always}
code{font:8.5pt Plex,monospace}
`
function hoja(titulo, lista, primera, corte = -1) {
  return `<section class="${primera ? '' : 'salto'}"><h1>${titulo}</h1>
<p class="aviso">Siempre con un adulto presente. Notas en papel; no se graba ni se fotografía sin permiso por escrito. Anota frases textuales.</p>
<div class="datos"><span>Fecha:</span><span>Lugar:</span><span>Quién entrevista:</span><span>Adulto presente:</span><span>Nombre o iniciales (si da permiso):</span><span>¿Acepta otra plática? Sí / No</span></div>
<ol>${lista.map((q, i) => `${i === corte ? '<p class="bloque">Después de enseñar la demo</p>' : ''}<li value="${i + 1}">${q}<div class="lineas"></div></li>`).join('')}</ol></section>`
}

;(async () => {
  const artista = preguntas(seccion('Artista'))
  const comprador = preguntas(seccion('Comprador de arte'))
  // Bloque B de ENTREVISTAS.md: las preguntas que van después de la demo
  const sec = seccion('Artista')
  const corteArtista = preguntas(sec.slice(0, sec.indexOf('**Bloque B'))).length
  if (artista.length < 10 || comprador.length < 6) throw new Error(`Pocas preguntas leídas (artista ${artista.length}, comprador ${comprador.length}): revisa el formato de ENTREVISTAS.md`)
  const doc = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${hoja('Entrevista a un artista (15 min)', artista, true, corteArtista)}${hoja('Entrevista a un comprador de arte (10 min)', comprador, false)}</body></html>`
  const b = await chromium.launch()
  const p = await b.newPage()
  await p.setContent(doc, { waitUntil: 'load' })
  await p.evaluate(() => document.fonts.ready)
  await p.pdf({ path: path.join(__dirname, 'hojas-de-entrevista.pdf'), format: 'Letter', margin: { top: '14mm', bottom: '14mm', left: '15mm', right: '15mm' } })
  await b.close()
  console.log(`listo: hojas-de-entrevista.pdf (${artista.length} preguntas de artista, ${comprador.length} de comprador)`)
})()
