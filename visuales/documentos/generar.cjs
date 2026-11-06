// Convierte los documentos del repo (Markdown) a PDF para abrirlos en la
// Chromebook de la escuela, que no abre .md. Los .md siguen siendo la fuente:
// si cambias uno, vuelve a correr esto.
// Uso, desde la raíz del repo: node visuales/documentos/generar.cjs
// Necesita pandoc y Playwright con Chromium.
const { execFileSync } = require('node:child_process')
const { chromium } = require('playwright')
const fs = require('node:fs')
const path = require('node:path')

const RAIZ = path.join(__dirname, '../..')
const SALIDA = __dirname
const fuentes = path.join(RAIZ, 'pitch/reunion-jose-luis/fuentes')

const LISTA = [
  'README.md',
  'TODO.md',
  ...fs.readdirSync(path.join(RAIZ, 'docs')).filter((n) => n.endsWith('.md')).map((n) => `docs/${n}`),
  'docs/wireframes/AUDITORIA.md',
  'pitch/infomercial_guion.md',
  ...fs.readdirSync(path.join(RAIZ, 'pitch/reunion-jose-luis')).filter((n) => n.endsWith('.md')).map((n) => `pitch/reunion-jose-luis/${n}`),
  'pitch/jurado-26nov/README.md',
  'brand/BRAND.md',
]

const CSS = `
@font-face{font-family:Fraunces;src:url(file://${fuentes}/fraunces-latin-opsz-normal.woff2)}
@font-face{font-family:Schibsted;src:url(file://${fuentes}/schibsted-grotesk-latin-wght-normal.woff2);font-weight:400 900}
@font-face{font-family:Plex;src:url(file://${fuentes}/ibm-plex-mono-latin-400-normal.woff2)}
@page{size:letter;margin:16mm 15mm}
body{font:10.5pt/1.5 Schibsted,system-ui,sans-serif;color:#2B2622}
h1,h2,h3{font-family:Fraunces,Georgia,serif;font-weight:600;line-height:1.15}
h1{font-size:22pt;margin:0 0 10px} h2{font-size:15pt;margin:22px 0 8px;color:#A2563D} h3{font-size:12pt;margin:16px 0 6px}
a{color:#A2563D;word-break:break-word}
code{font:9pt Plex,monospace;background:#F3ECE2;padding:1px 4px;border-radius:3px}
pre{background:#F3ECE2;padding:10px;border-radius:6px;white-space:pre-wrap}
pre code{background:none;padding:0}
table{border-collapse:collapse;width:100%;margin:10px 0;font-size:9pt;page-break-inside:auto}
th,td{border-bottom:1px solid #E5DDCF;padding:5px 6px;text-align:left;vertical-align:top}
th{font:8pt Plex,monospace;text-transform:uppercase;letter-spacing:.06em;color:#5E6C52}
tr{page-break-inside:avoid}
blockquote{border-left:3px solid #C06E52;margin:10px 0;padding:2px 12px;color:#5b534c}
.ruta{font:8pt Plex,monospace;color:#5E6C52;margin-bottom:14px}
`

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage()
  const hechos = []
  for (const rel of LISTA) {
    const md = path.join(RAIZ, rel)
    if (!fs.existsSync(md)) continue
    const cuerpo = execFileSync('pandoc', ['-f', 'gfm', '-t', 'html', md], { encoding: 'utf8' })
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}</style></head><body><p class="ruta">${rel} · generado el ${new Date().toISOString().slice(0, 10)}</p>${cuerpo}</body></html>`
    await p.setContent(html, { waitUntil: 'load' })
    await p.evaluate(() => document.fonts.ready)
    const nombre = rel.replace(/\.md$/, '').replace(/\//g, '__') + '.pdf'
    await p.pdf({ path: path.join(SALIDA, nombre), format: 'Letter', printBackground: true, margin: { top: '16mm', bottom: '16mm', left: '15mm', right: '15mm' } })
    hechos.push([rel, nombre])
  }
  await b.close()
  const filas = hechos.map(([rel, n]) => `| \`${rel}\` | [${n}](${n}) |`).join('\n')
  fs.writeFileSync(
    path.join(SALIDA, 'README.md'),
    `# Documentos en PDF (para la Chromebook)\n\nCada PDF es una copia del documento Markdown del repo. **Si cambias el .md, vuelve a generar**: \`node visuales/documentos/generar.cjs\` (necesita pandoc y Playwright). Si un PDF y su .md no coinciden, gana el .md.\n\n| Documento original | PDF |\n|---|---|\n${filas}\n`,
  )
  console.log(`listo: ${hechos.length} PDF en visuales/documentos/`)
})()
