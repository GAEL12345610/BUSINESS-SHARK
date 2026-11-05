// Revisa el ARTEFACTO publicado (dist/), no el código: lo que de verdad lee un
// visitante sin JavaScript, Google o WhatsApp. Corre al final de `pnpm build`
// y falla el build si el HTML vuelve a prometer algo que la demo no hace.
// memoria/verificar-el-artefacto.md
import { readFileSync } from 'node:fs'

const leer = (p) => readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8')
const landing = leer('index.html')
const privacidad = leer('privacidad.html')
const fallas = []
const debe = (html, texto, donde) => html.includes(texto) || fallas.push(`${donde}: falta "${texto}"`)
const nunca = (html, re, donde) => re.test(html) && fallas.push(`${donde}: aparece ${re}`)

debe(landing, 'Prototipo con personas, obras y correos ficticios', 'index.html (aviso de DEMO)')
debe(landing, 'Recorrer la demo en 5 minutos', 'index.html (CTA principal)')
debe(landing, 'Precio publicado, sin validar', 'index.html (estado del precio)')
debe(landing, 'registrar la procedencia de cada obra', 'index.html (frase de oferta)')
nunca(landing, /Ver una obra registrada|Se paga con|pagan el primer año|hola@brai\.art|@ejemplo\.com/, 'index.html')
debe(privacidad, 'sin servidor', 'privacidad.html')
nunca(privacidad, /hola@brai\.art|Los datos se guardan en Supabase/, 'privacidad.html')

if (fallas.length) {
  console.error('verificar-dist: el HTML publicado no dice la verdad sobre la demo:\n  ' + fallas.join('\n  '))
  process.exit(1)
}
console.log('verificar-dist: aviso de demo, CTA, precio y privacidad correctos en dist/')
