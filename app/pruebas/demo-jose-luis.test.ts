// Modo José Luis (DECISIONES #42): nada inventado sobre una persona real.
import { test } from 'node:test'
import assert from 'node:assert/strict'

const mem = new Map<string, string>()
const st = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k) }
const g = globalThis as Record<string, unknown>
g.window = { location: { pathname: '/jose-luis', search: '' } }
g.localStorage = st
g.sessionStorage = st

const d = await import('../src/data/demo.ts')

test('entrar a /jose-luis activa su modo y no lo marca como ficticio', () => {
  assert.equal(d.MODO, 'jose-luis')
  assert.equal(d.ES_FICTICIA, false)
})

test('sus obras no tienen dueño, ni foto, y cada una cita su fuente', () => {
  for (const o of d.OBRAS) {
    assert.equal(o.dueno, null, o.titulo)
    assert.match(o.imagen, /^\/obras\/jose-luis\/.+\.svg$/, `${o.titulo}: solo marco "foto pendiente"`)
    assert.ok(o.fuente?.url.startsWith('https://'), `${o.titulo} sin fuente`)
  }
})

test('ninguna historia habla por él ni especula sobre lo que sabría', () => {
  const todo = d.OBRAS.flatMap((o) => o.historia).join(' ')
  assert.doesNotMatch(todo, /\b(yo|mi|mis|me)\b/i)
  assert.doesNotMatch(todo, /sabría/)
})

test('capas de confianza de sus obras: registro y fotos huella pendientes, nada cumplido', () => {
  for (const o of d.OBRAS) {
    const capas = d.capasDeConfianza(o)
    assert.equal(capas.find((c) => c.id === 'registro')!.estado, 'pendiente', o.titulo)
    assert.equal(capas.find((c) => c.id === 'huellas')!.estado, 'pendiente', o.titulo)
    assert.ok(capas.every((c) => c.estado !== 'cumplida'), o.titulo)
  }
})
