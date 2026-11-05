// Lógica de la demo (src/data/demo.ts) en modo ejemplo: Lucía Arce, ficticia.
// Correr: pnpm test. Node no tiene navegador: se imitan window y el storage.
import { test } from 'node:test'
import assert from 'node:assert/strict'

function storage() {
  const m = new Map<string, string>()
  return {
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  }
}
const g = globalThis as Record<string, unknown>
g.window = { location: { pathname: '/', search: '' } }
g.localStorage = storage()
g.sessionStorage = storage()

const d = await import('../src/data/demo.ts')

test('arranca en modo ejemplo con la artista ficticia', () => {
  assert.equal(d.MODO, 'ejemplo')
  assert.equal(d.ES_FICTICIA, true)
  assert.equal(d.ARTISTA.ejemplo, true)
  assert.match(d.ARTISTA.bio.join(' '), /ficticia/)
})

test('un correo que parece real se rechaza y no se guarda nada', () => {
  const r = d.reclamar('7KQ2X', d.CODIGO_DEMO, 'persona.real@gmail.com')
  assert.equal(r.ok, false)
  assert.match(r.ok ? '' : r.error, /example\.com/)
  assert.equal(d.getObra('7KQ2X')?.dueno, null)
  assert.equal(localStorage.getItem('brai-demo-reclamos-ejemplo'), null)
})

test('un código equivocado se rechaza', () => {
  const r = d.reclamar('7KQ2X', 'AAAA-BBBB', d.CORREO_PRUEBA)
  assert.equal(r.ok, false)
})

test('con el código público y un correo de prueba, el reclamo queda solo en el storage local', () => {
  const r = d.reclamar('7KQ2X', d.CODIGO_DEMO, 'ana.lopez@example.com')
  assert.deepEqual(r, { ok: true, iniciales: 'A. L.' })
  assert.equal(d.getObra('7KQ2X')?.dueno, 'A. L.')
  const fila = d.panel().find((f) => f.obra.codigo === '7KQ2X')
  assert.equal(fila?.dueno?.correo, 'ana.lopez@example.com')
  // la obra ya tiene dueño: un segundo reclamo no pasa
  assert.equal(d.reclamar('7KQ2X', d.CODIGO_DEMO, d.CORREO_PRUEBA).ok, false)
})

test('reiniciar la demo borra los reclamos', () => {
  d.reiniciarDemo()
  assert.equal(d.getObra('7KQ2X')?.dueno, null)
})

test('todos los correos del panel de ejemplo son de un dominio reservado', () => {
  for (const f of d.panel()) if (f.dueno) assert.ok(d.esCorreoDePrueba(f.dueno.correo), f.dueno.correo)
})

test('los eventos de las obras ficticias dicen que son ejemplo', () => {
  for (const o of d.OBRAS) for (const e of o.eventos) assert.match(e.texto, /^Ejemplo/, `${o.codigo}: ${e.texto}`)
})

test('esCorreoDePrueba no se deja engañar por subdominios ni espacios raros', () => {
  assert.equal(d.esCorreoDePrueba('a@example.com'), true)
  assert.equal(d.esCorreoDePrueba(' A@Example.COM '), true)
  assert.equal(d.esCorreoDePrueba('a@example.com.mx'), false)
  assert.equal(d.esCorreoDePrueba('a@notexample.com'), false)
  assert.equal(d.esCorreoDePrueba('a@b@example.com'), false)
})

test('la huella de muestra es la misma para los mismos eventos', () => {
  const o = d.getObra('M3RT8')!
  assert.equal(d.huellaRegistro(o), d.huellaRegistro({ ...o }))
  assert.notEqual(d.huellaRegistro(o), d.huellaRegistro({ ...o, eventos: o.eventos.slice(1) }))
})
