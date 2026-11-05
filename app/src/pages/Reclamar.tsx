import { useState, type FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { ARTISTA, CORREO_PRUEBA, DOMINIO_PRUEBA, MODO_JOSE_LUIS, fecha, getObra, reclamar } from '../data/demo'
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
  const [params] = useSearchParams()
  // La raspadita de la landing manda el código ya escrito
  const [codigoDueno, setCodigoDueno] = useState(() => formatear(params.get('codigo') ?? ''))
  // Correo inventado ya escrito: la demo no debe invitar a dejar un correo real.
  const [correo, setCorreo] = useState(CORREO_PRUEBA)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState<string | null>(null)

  if (!obra) return <NoEncontrada />

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    // En la versión real: una función de Supabase hace todo en un paso (docs/PROTOTIPO.md)
    const r = reclamar(obra.codigo, codigoDueno, correo.trim())
    if (r.ok) {
      setListo(r.iniciales)
      // un toque corto en el celular: la obra es tuya
      if ('vibrate' in navigator) navigator.vibrate([25, 60, 25])
    }
    else setError(r.error)
  }

  if (listo) {
    return (
      <PaginaArtista>
        <main className="mx-auto flex max-w-md flex-col items-start px-4 pb-16 pt-14 sm:px-6">
          <SelloDorado />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-verde">{obra.registro}</p>
          <h1 className="mt-2 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.015em]">Así se ve cuando la obra es tuya.</h1>
          <p className="mt-4 text-lg leading-relaxed text-tinta/85">
            Simulación: en este navegador, <span className="font-display italic">{obra.titulo}</span> quedó a nombre de{' '}
            <span className="font-semibold">{listo}</span> el {fecha(new Date().toISOString().slice(0, 10))}. En la versión real, quedarías en el
            registro de {ARTISTA.nombre} como su dueño y el código de tu tarjeta dejaría de servir.
          </p>
          <p className="mt-3 rounded-[10px] bg-arena px-4 py-3 text-sm leading-relaxed text-tinta/80">
            No se registró nada en ningún servidor ni se mandó ningún correo.
            {MODO_JOSE_LUIS && ' Esta obra no tiene dueño en Brai: es una demostración sobre una obra real.'}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={`/o/${obra.codigo}`}
              className="inline-flex items-center justify-center rounded-[10px] bg-[var(--acento-texto)] px-6 py-3.5 font-semibold text-lienzo hover:opacity-90"
            >
              Ver la obra
            </Link>
            <Link to="/panel" className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-tinta px-6 py-3.5 font-semibold hover:bg-tinta/5">
              Ver lo que ve el artista
            </Link>
          </div>
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
          Raspa la tarjeta que te entregó {ARTISTA.nombre} y escribe el código. En la versión real es de un solo uso. En esta demo el código
          es público y el reclamo es simulado.
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
                Correo de prueba
              </label>
              <input
                id="correo"
                type="email"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value)
                  setError(null)
                }}
                autoComplete="off"
                aria-describedby="correo-ayuda"
                placeholder={CORREO_PRUEBA}
                className="mt-2 w-full rounded-[10px] border-[1.5px] border-tinta/25 bg-white px-4 py-3.5 text-base focus:border-tinta focus:outline-none"
              />
              <p id="correo-ayuda" className="mt-2 text-[13px] leading-snug text-tinta/70">
                <span className="font-semibold text-tinta">No escribas tu correo real.</span> La demo solo acepta correos inventados que terminan
                en @{DOMINIO_PRUEBA}. No se manda a nadie y se queda solo en este navegador. En la versión real, solo el artista vería tu correo
                y en público saldrían tus iniciales.{' '}
                <a href="/privacidad" target="_blank" rel="noopener" className="underline underline-offset-2">
                  Qué datos guarda la demo
                </a>
                .
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
              Simular reclamo
            </button>
          </form>
        )}
      </main>
    </PaginaArtista>
  )
}
