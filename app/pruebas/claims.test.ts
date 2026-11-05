// Frases que NO pueden volver a la app publicada (docs/DEMO_HONESTA.md).
// Revisa el texto fuente: falla sola si alguien reintroduce un claim engañoso.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const APP = new URL('..', import.meta.url).pathname
function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? archivos(p) : /\.(tsx?|html)$/.test(n) ? [p] : []
  })
}
const FUENTES = [...archivos(join(APP, 'src')), join(APP, 'public/privacidad.html'), join(APP, 'index.html')]
const leer = (p: string) => readFileSync(p, 'utf8')

const PROHIBIDAS: [RegExp, string, string[]?][] = [
  [/hola@brai\.art/, 'correo que no existe (DECISIONES #37 y #45)'],
  [/@ejemplo\.com/, 'dominio que podría ser real: usa @example.com'],
  [/Se paga con/, 'promesa de retorno: usa "equivale al precio de"'],
  [/pagan? (el primer año|Brai)/, 'promesa de retorno'],
  [/Ver una obra registrada/, 'ninguna obra está registrada de verdad'],
  [/Imposible de falsificar/i, 'promesa prohibida (CLAUDE.md, regla 1)', ['Marca.tsx']],
  [/blockchain|infalible/i, 'promesa prohibida (CLAUDE.md, regla 1)'],
  [/>\s*Mandar\s*</, 'el envío de correos no existe: "Simular envío"'],
  [/>\s*Entrar\s*</, 'no hay cuentas: no hay login'],
  [/Esta obra es tuya\./, 'el reclamo es simulado: dilo'],
  [/Datos de la demo se borran al cerrar/i, 'falso: localStorage persiste'],
  [/—|…/, 'puntuación humana (CLAUDE.md, regla 6)'],
]

for (const [re, porque, excepto = []] of PROHIBIDAS) {
  test(`no aparece ${re}: ${porque}`, () => {
    const malos = FUENTES.filter((f) => !excepto.some((e) => f.endsWith(e)) && re.test(leer(f)))
    assert.deepEqual(malos.map((f) => f.replace(APP, '')), [])
  })
}

test('/entrar ya no redirige al panel como si fuera un login', () => {
  assert.doesNotMatch(leer(join(APP, 'src/App.tsx')), /path="\/entrar" element=\{<Navigate/)
})

test('el aviso de DEMO se monta en todas las rutas', () => {
  assert.match(leer(join(APP, 'src/App.tsx')), /<AvisoDemo \/>\s*<Routes>/)
})

test('el aviso de privacidad no dice que hay base de datos conectada', () => {
  const p = leer(join(APP, 'public/privacidad.html'))
  assert.match(p, /sin servidor/)
  assert.doesNotMatch(p, /Los datos se guardan en Supabase/)
})
