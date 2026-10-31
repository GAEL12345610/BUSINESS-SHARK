import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { ARTISTA, fecha, getObra, reclamar } from '../data/demo'
import { PaginaArtista } from './Obra'
import NoEncontrada from './NoEncontrada'

/** XXXX-XXXX mientras escribe, como viene impreso bajo la raspadita. */
function formatear(valor: string) {
  const limpio = valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  return limpio.length > 4 ? `${limpio.slice(0, 4)}-${limpio.slice(4)}` : limpio
}

/** El momento dorado: el isotipo real (nunca redibujado) se sella con un halo. */
function SelloDorado() {
  return (
    <div className="relative size-28" aria-hidden="true">
      <span className="halo-dorado absolute inset-0 rounded-full border-2 border-dorado" />
      <img src="/brand/isotipo.svg" alt="" className="sello-entra relative size-28" />
    </div>
  )
}

export default function Reclamar() {
  const { codigo = '' } = useParams()
  const obra = getObra(codigo)
  const [codigoDueno, setCodigoDueno] = useState('')
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState<string | null>(null)

  if (!obra) return <NoEncontrada />

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    // En la versión real: una función de Supabase hace todo en un paso (docs/PROTOTIPO.md)
    const r = reclamar(obra.codigo, codigoDueno, correo.trim())
    if (r.ok) setListo(r.iniciales)
    else setError(r.error)
  }

  if (listo) {
    return (
      <PaginaArtista>
        <main className="mx-auto flex max-w-md flex-col items-start px-4 pb-16 pt-14 sm:px-6">
          <SelloDorado />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-verde">{obra.registro}</p>
          <h1 className="mt-2 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.015em]">Esta obra ya es tuya.</h1>
          <p className="mt-4 text-lg leading-relaxed text-tinta/85">
            <span className="font-display italic">{obra.titulo}</span> quedó registrada a nombre de{' '}
            <span className="font-semibold">{listo}</span> el {fecha(new Date().toISOString().slice(0, 10))}. {ARTISTA.nombre} ya sabe
            que la tienes tú.
          </p>
          <p className="mt-3 text-sm text-tinta/70">El código de tu tarjeta ya no sirve. Guárdala: es parte de la obra.</p>
          <Link
            to={`/o/${obra.codigo}`}
            className="mt-9 inline-flex items-center justify-center rounded-[10px] bg-[var(--acento-texto)] px-6 py-3.5 font-semibold text-lienzo hover:opacity-90"
          >
            Ver mi obra
          </Link>
        </main>
      </PaginaArtista>
    )
  }

  return (
    <PaginaArtista>
      <main className="mx-auto max-w-md px-4 pb-16 pt-6 sm:px-6">
        <Link to={`/o/${obra.codigo}`} className="inline-flex items-center gap-1.5 text-sm text-terracota-btn hover:underline">
          <ArrowLeft size={16} /> Volver a la obra
        </Link>

        <div className="mt-6 flex items-center gap-4">
          <div className="w-16 shrink-0 bg-[var(--acento)] p-1">
            <img src={obra.imagen} alt="" className="aspect-[3/4] w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-tight">{obra.titulo}</p>
            <p className="font-mono text-xs text-verde">{obra.registro}</p>
          </div>
        </div>

        <h1 className="mt-8 font-display text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.015em]">Reclama tu obra</h1>
        <p className="mt-3 leading-relaxed text-tinta/85">
          Raspa la tarjeta que te entregó {ARTISTA.nombre} y escribe el código. Es de un solo uso: si la raspadita ya venía
          raspada, avísale al artista.
        </p>

        {obra.dueno ? (
          <p className="mt-8 border-l-2 border-[var(--acento)] pl-4">Esta obra ya tiene dueño: {obra.dueno}.</p>
        ) : (
          <form onSubmit={enviar} className="mt-8 space-y-6" noValidate>
            <div>
              <label htmlFor="codigo" className="block text-sm font-semibold">
                Código de dueño
              </label>
              <input
                id="codigo"
                value={codigoDueno}
                onChange={(e) => {
                  setCodigoDueno(formatear(e.target.value))
                  setError(null)
                }}
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="XXXX-XXXX"
                className="mt-2 w-full rounded-[10px] border-[1.5px] border-tinta/25 bg-white px-4 py-4 font-mono text-[1.7rem] tracking-[0.18em] placeholder:text-tinta/25 focus:border-tinta focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="correo" className="block text-sm font-semibold">
                Tu correo
              </label>
              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value)
                  setError(null)
                }}
                autoComplete="email"
                placeholder="tu@correo.com"
                className="mt-2 w-full rounded-[10px] border-[1.5px] border-tinta/25 bg-white px-4 py-3.5 text-base focus:border-tinta focus:outline-none"
              />
              <p className="mt-2 text-[13px] leading-snug text-tinta/70">
                Solo lo ve el artista. En la página pública apareces con tus iniciales.
              </p>
            </div>
            {error && (
              <p role="alert" className="rounded-[10px] bg-terracota/15 px-4 py-3 text-sm">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={codigoDueno.length < 9 || !correo}
              className="w-full rounded-[10px] bg-[var(--acento-texto)] px-6 py-3.5 font-semibold text-lienzo transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Reclamar mi obra
            </button>
          </form>
        )}
      </main>
    </PaginaArtista>
  )
}
