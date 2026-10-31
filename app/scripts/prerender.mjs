// Mete la landing ya pintada en dist/index.html para que Google y los modelos
// de IA la lean sin JavaScript (memoria/contenido-en-html-crudo.md).
// dist/app.html queda vacío: lo sirven las rutas de obras (vercel.json).
import { readFileSync, writeFileSync, rmSync } from 'node:fs'

const dist = new URL('../dist/', import.meta.url)
// La imagen para compartir necesita dirección completa. Mientras no exista brai.art,
// se usa la dirección de producción que Vercel pone sola al publicar.
const origen = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://brai.art'
const plantilla = readFileSync(new URL('index.html', dist), 'utf8').replaceAll('https://brai.art/og.png', `${origen}/og.png`)
const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))

writeFileSync(new URL('app.html', dist), plantilla)
writeFileSync(new URL('index.html', dist), plantilla.replace('<!--app-->', render('/')))
rmSync(new URL('../dist-ssr/', import.meta.url), { recursive: true, force: true })
console.log('landing prerenderizada en dist/index.html')
