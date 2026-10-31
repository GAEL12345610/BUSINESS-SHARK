import { useCallback, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { Expand, Play } from 'lucide-react'
import { SelloRegistroBrai } from '../components/marca'
import { Capa, CompararHuella, Compartir, VisorObra } from '../components/visor'
import { ARTISTA, CODIGO_DEMO, OBRAS, esMia, fecha, getObra, huellaRegistro, type Obra as TObra } from '../data/demo'
import { varsTema } from '../lib/tema'
import NoEncontrada from './NoEncontrada'

/** Marco y barra del artista: lo comparten la obra, reclamar y la página del artista. */
export function PaginaArtista({ children }: { children: ReactNode }) {
  return (
    <div style={varsTema(ARTISTA.acento)} className="min-h-[100dvh] bg-lienzo">
      {ARTISTA.ejemplo && (
        <p className="bg-arena px-4 py-2 text-center text-[12px] leading-snug text-tinta/80">
          Obra de ejemplo. {ARTISTA.nombre} todavía no registra obras en Brai. Para probar, el código de dueño es{' '}
          <span className="font-mono font-medium text-tinta">{CODIGO_DEMO}</span>.
        </p>
      )}
      <header className="border-b border-linea bg-lienzo">
        <div className="mx-auto flex max-w-5xl items-baseline justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to={`/a/${ARTISTA.slug}`} className="font-display text-xl font-semibold tracking-tight hover:text-[var(--acento-texto)]">
            {ARTISTA.nombre}
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-verde">{ARTISTA.disciplina}</span>
        </div>
      </header>
      {children}
    </div>
  )
}

export function Etiqueta({ children }: { children: ReactNode }) {
  return <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-verde">{children}</h2>
}

/** Retraso de la entrada escalonada (clase .entra en index.css). */
const paso = (n: number): CSSProperties => ({ animationDelay: `${n * 90}ms` })

function Video({ obra }: { obra: TObra }) {
  const [aviso, setAviso] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setAviso(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-tinta text-left"
      >
        <img src={obra.imagen} alt="" className="absolute inset-0 size-full object-cover opacity-45 blur-[2px] transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-lienzo text-tinta transition-transform duration-300 group-hover:scale-110">
            <Play size={24} fill="currentColor" className="ml-1" />
          </span>
        </span>
        <span className="absolute inset-x-4 bottom-3 flex items-baseline justify-between text-lienzo">
          <span className="text-sm font-semibold">{ARTISTA.nombre.split(' ')[0]} cuenta esta obra</span>
          <span className="font-mono text-xs">{obra.video.duracion}</span>
        </span>
      </button>
      {aviso && !obra.video.disponible && (
        <p className="mt-3 text-sm text-verde" role="status">
          El video todavía no se graba. Lo grabamos con el artista en su taller.
        </p>
      )}
    </div>
  )
}

export default function Obra() {
  const { codigo = '' } = useParams()
  const obra = getObra(codigo)
  const [verObra, setVerObra] = useState(false)
  const [huella, setHuella] = useState<number | null>(null)
  const cerrarObra = useCallback(() => setVerObra(false), [])
  const cerrarHuella = useCallback(() => setHuella(null), [])
  if (!obra) return <NoEncontrada />

  const mia = esMia(obra.codigo)
  const registro = obra.eventos.find((e) => e.tipo === 'registro')
  const otras = OBRAS.filter((o) => o.codigo !== obra.codigo)
  const ficha: [string, string][] = [
    ['Registro', obra.registro],
    ['Técnica', obra.tecnica],
    ['Medidas', obra.medidas],
    ['Año', String(obra.anio)],
    ['Dueño', obra.dueno ?? 'Sin reclamar'],
  ]
  const h = huella === null ? null : obra.huellas[huella]

  return (
    <PaginaArtista>
      {mia && (
        <div className="entra border-b border-linea bg-dorado-suave">
          <p className="mx-auto flex max-w-5xl items-center gap-2.5 px-4 py-3 text-sm font-semibold sm:px-6">
            <span className="size-2.5 rounded-full bg-dorado" /> Esta obra es tuya. En su página pública apareces como {obra.dueno}
          </p>
        </div>
      )}

      <main className="mx-auto max-w-5xl pb-28 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-6 lg:pb-16 lg:pt-10">
        {/* Obra con el marco del color del artista. Se toca para verla en grande. */}
        <div className="entra lg:sticky lg:top-10 lg:self-start">
          <button
            type="button"
            onClick={() => setVerObra(true)}
            className="group relative block w-full bg-[var(--acento)] p-3 text-left sm:p-4 lg:rounded-sm"
            aria-label={`Ver ${obra.titulo} en grande`}
          >
            <img src={obra.imagen} alt={`${obra.titulo}, de ${ARTISTA.nombre}`} className="block aspect-[3/4] w-full object-cover" />
            <span className="absolute bottom-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-tinta/75 px-3 py-1.5 text-xs font-semibold text-lienzo opacity-90 transition-opacity group-hover:opacity-100">
              <Expand size={14} /> Ver en grande
            </span>
          </button>
          {ARTISTA.ejemplo && <p className="px-4 pt-2 font-mono text-[10px] text-verde lg:px-0">Imagen de ejemplo</p>}
        </div>

        <div className="px-4 sm:px-6 lg:px-0">
          {/* Cédula */}
          <section className="pt-7 lg:pt-0">
            <p className="entra text-xs font-semibold uppercase tracking-[0.12em] text-verde" style={paso(1)}>
              {ARTISTA.nombre}
            </p>
            <h1 className="entra mt-1.5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.015em]" style={paso(2)}>
              {obra.titulo}
            </h1>
            {registro && (
              <p className="estampa mt-5 inline-flex items-center gap-2.5 rounded-full bg-dorado-suave py-2 pl-2.5 pr-4 text-[13px] font-semibold">
                <span className="latido relative flex size-3.5 items-center justify-center rounded-full">
                  <span className="absolute size-3.5 rounded-full bg-dorado/40" />
                  <span className="size-2 rounded-full bg-dorado" />
                </span>
                Registrada por el artista
                <span className="font-mono text-[11px] font-normal text-tinta/70">{fecha(registro.fecha)}</span>
              </p>
            )}
            <dl className="entra mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-linea pt-4 font-mono text-[13px]" style={paso(4)}>
              {ficha.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-verde">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="entra mt-6" style={paso(5)}>
              <Compartir titulo={`${obra.titulo}, de ${ARTISTA.nombre}`} texto={`Mira la historia de ${obra.titulo}, registrada por ${ARTISTA.nombre}.`} />
            </div>
          </section>

          {/* Acción principal */}
          {!obra.dueno ? (
            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-linea bg-lienzo px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 lg:static lg:mt-8 lg:border-0 lg:p-0">
              <Link
                to={`/o/${obra.codigo}/reclamar`}
                className="flex w-full items-center justify-center rounded-[10px] bg-[var(--acento-texto)] px-6 py-3.5 font-semibold text-lienzo transition-[opacity,transform] hover:opacity-90 active:scale-[.98] lg:inline-flex lg:w-auto"
              >
                Reclamar mi obra
              </Link>
              <p className="mt-2 hidden text-sm text-tinta/70 lg:block">¿La acabas de comprar? Raspa tu tarjeta y queda a tu nombre.</p>
            </div>
          ) : (
            !mia && (
              <p className="mt-8 border-l-2 border-[var(--acento)] pl-4 text-sm leading-relaxed text-tinta/80">
                Esta obra ya tiene dueño. Si la compraste de segunda mano, pídele a {obra.dueno} que te la transfiera.
              </p>
            )
          )}

          <section className="revela mt-12">
            <Etiqueta>El artista te cuenta</Etiqueta>
            <div className="mt-4">
              <Video obra={obra} />
            </div>
          </section>

          <section className="revela mt-12">
            <Etiqueta>Historia de la obra</Etiqueta>
            {ARTISTA.ejemplo && <p className="mt-2 font-mono text-[10px] text-verde">Texto de ejemplo. Lo escribe el artista.</p>}
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed">
              {obra.historia.map((p, i) => (
                <p key={i} className={i === 0 ? 'font-display text-xl italic leading-snug' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section className="revela mt-12">
            <Etiqueta>Fotos huella</Etiqueta>
            <p className="mt-3 leading-relaxed text-tinta/80">
              Tres detalles que el artista fotografió al registrarla. Toca uno para ver dónde está y compáralo con el cuadro que tienes
              enfrente.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {obra.huellas.map((hu, i) => (
                <button key={hu.nota} type="button" onClick={() => setHuella(i)} className="group text-left">
                  <span
                    className="block aspect-square rounded-lg border border-linea bg-no-repeat transition-[background-size] duration-500 group-hover:[background-size:560%]"
                    style={{ backgroundImage: `url(${obra.imagen})`, backgroundSize: '480%', backgroundPosition: `${hu.x}% ${hu.y}%` }}
                    role="img"
                    aria-label={`Detalle: ${hu.nota}`}
                  />
                  <span className="mt-2 block text-[13px] leading-snug text-tinta/75 group-hover:text-tinta">{hu.nota}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="revela mt-12">
            <Etiqueta>Línea de tiempo</Etiqueta>
            <ol className="relative mt-5 pl-5">
              <span aria-hidden="true" className="crece absolute bottom-1 left-0 top-1 w-0.5 bg-[var(--acento)]" />
              {obra.eventos.map((e, i) => (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span className="absolute -left-[25px] top-1.5 size-3 rounded-full border-2 border-[var(--acento)] bg-lienzo" />
                  <p className="font-mono text-xs text-verde">{fecha(e.fecha)}</p>
                  <p className="mt-0.5">{e.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-tinta/60">Por privacidad, los dueños aparecen solo con sus iniciales.</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-xs text-tinta/60">
              Huella del registro
              <span className="font-mono text-[11px] text-tinta">{huellaRegistro(obra).replace(/(.{4})/, '$1·')}</span>
              <span>Cada evento lleva la huella del anterior. Si alguien cambia uno, deja de cuadrar.</span>
            </p>
          </section>
        </div>
      </main>

      {/* Catálogo */}
      <section id="mas-obras" className="border-t border-linea bg-white py-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between gap-4 px-4 sm:px-6">
            <Etiqueta>Más obras de {ARTISTA.nombre}</Etiqueta>
            <Link to={`/a/${ARTISTA.slug}`} className="shrink-0 text-sm text-terracota-btn hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="mt-5 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6">
            {otras.map((o) => (
              <Link key={o.codigo} to={`/o/${o.codigo}`} className="group w-40 shrink-0 snap-start sm:w-48">
                <div className="overflow-hidden bg-[var(--acento)] p-1.5">
                  <img src={o.imagen} alt="" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-2 font-display font-semibold leading-tight">{o.titulo}</p>
                <p className="font-mono text-[11px] text-verde">
                  {o.registro} · {o.anio}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-4 pb-32 pt-10 sm:px-6 lg:pb-12">
        <SelloRegistroBrai registro={obra.registro} />
        <Link to="/panel" className="text-sm text-terracota-btn hover:underline">
          ¿Eres el artista? Entra a tu panel
        </Link>
      </footer>

      <Capa abierta={verObra} alCerrar={cerrarObra} titulo={obra.titulo}>
        <VisorObra imagen={obra.imagen} alt={`${obra.titulo}, de ${ARTISTA.nombre}`} />
      </Capa>
      <Capa abierta={h !== null} alCerrar={cerrarHuella} titulo="Foto huella">
        {h && <CompararHuella imagen={obra.imagen} {...h} />}
      </Capa>
    </PaginaArtista>
  )
}
