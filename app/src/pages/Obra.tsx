import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { Play } from 'lucide-react'
import { SelloRegistroBrai } from '../components/marca'
import { ARTISTA, CODIGO_DEMO, OBRAS, fecha, getObra, type Obra as TObra } from '../data/demo'
import { varsTema } from '../lib/tema'
import NoEncontrada from './NoEncontrada'

/** Marco y barra del artista: lo comparten la obra y reclamar. */
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
          <span className="font-display text-xl font-semibold tracking-tight">{ARTISTA.nombre}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-verde">{ARTISTA.disciplina}</span>
        </div>
      </header>
      {children}
    </div>
  )
}

function Etiqueta({ children }: { children: ReactNode }) {
  return <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-verde">{children}</h2>
}

function Huella({ obra, x, y, nota }: { obra: TObra; x: number; y: number; nota: string }) {
  return (
    <figure>
      <div
        className="aspect-square rounded-lg border border-linea bg-no-repeat"
        style={{ backgroundImage: `url(${obra.imagen})`, backgroundSize: '480%', backgroundPosition: `${x}% ${y}%` }}
        role="img"
        aria-label={`Detalle: ${nota}`}
      />
      <figcaption className="mt-2 text-[13px] leading-snug text-tinta/75">{nota}</figcaption>
    </figure>
  )
}

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
          <span className="flex size-16 items-center justify-center rounded-full bg-lienzo text-tinta transition-transform group-hover:scale-105">
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
  if (!obra) return <NoEncontrada />

  const registro = obra.eventos.find((e) => e.tipo === 'registro')
  const otras = OBRAS.filter((o) => o.codigo !== obra.codigo)
  const ficha: [string, string][] = [
    ['Registro', obra.registro],
    ['Técnica', obra.tecnica],
    ['Medidas', obra.medidas],
    ['Año', String(obra.anio)],
    ['Dueño', obra.dueno ?? 'Sin reclamar'],
  ]

  return (
    <PaginaArtista>
      <main className="mx-auto max-w-5xl pb-28 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-6 lg:pb-16 lg:pt-10">
        {/* Obra con el marco del color del artista */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <div className="bg-[var(--acento)] p-3 sm:p-4 lg:rounded-sm">
            <img src={obra.imagen} alt={`${obra.titulo}, de ${ARTISTA.nombre}`} className="block aspect-[3/4] w-full object-cover" />
          </div>
          {ARTISTA.ejemplo && <p className="px-4 pt-2 font-mono text-[10px] text-verde lg:px-0">Imagen de ejemplo</p>}
        </div>

        <div className="px-4 sm:px-6 lg:px-0">
          {/* Cédula */}
          <section className="pt-7 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-verde">{ARTISTA.nombre}</p>
            <h1 className="mt-1.5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.015em]">{obra.titulo}</h1>
            {registro && (
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-dorado-suave py-2 pl-2.5 pr-4 text-[13px] font-semibold">
                <span className="relative flex size-3.5 items-center justify-center">
                  <span className="absolute size-3.5 rounded-full bg-dorado/40" />
                  <span className="size-2 rounded-full bg-dorado" />
                </span>
                Registrada por el artista
                <span className="font-mono text-[11px] font-normal text-tinta/70">{fecha(registro.fecha)}</span>
              </p>
            )}
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-linea pt-4 font-mono text-[13px]">
              {ficha.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-verde">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Acción principal */}
          {!obra.dueno ? (
            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-linea bg-lienzo px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 lg:static lg:mt-8 lg:border-0 lg:p-0">
              <Link
                to={`/o/${obra.codigo}/reclamar`}
                className="flex w-full items-center justify-center rounded-[10px] bg-[var(--acento-texto)] px-6 py-3.5 font-semibold text-lienzo transition-opacity hover:opacity-90 lg:w-auto lg:inline-flex"
              >
                Reclamar mi obra
              </Link>
              <p className="mt-2 hidden text-sm text-tinta/70 lg:block">¿La acabas de comprar? Raspa tu tarjeta y queda a tu nombre.</p>
            </div>
          ) : (
            <p className="mt-8 border-l-2 border-[var(--acento)] pl-4 text-sm leading-relaxed text-tinta/80">
              Esta obra ya tiene dueño. Si la compraste de segunda mano, pídele a {obra.dueno} que te la transfiera.
            </p>
          )}

          <section className="mt-12">
            <Etiqueta>El artista te cuenta</Etiqueta>
            <div className="mt-4">
              <Video obra={obra} />
            </div>
          </section>

          <section className="mt-12">
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

          <section className="mt-12">
            <Etiqueta>Fotos huella</Etiqueta>
            <p className="mt-3 leading-relaxed text-tinta/80">
              Tres detalles que el artista fotografió al registrarla. Compáralos con el cuadro que tienes enfrente.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {obra.huellas.map((h) => (
                <Huella key={h.nota} obra={obra} {...h} />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <Etiqueta>Línea de tiempo</Etiqueta>
            <ol className="mt-5 border-l-2 border-[var(--acento)] pl-5">
              {obra.eventos.map((e, i) => (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span className="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-[var(--acento)] bg-lienzo" />
                  <p className="font-mono text-xs text-verde">{fecha(e.fecha)}</p>
                  <p className="mt-0.5">{e.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-tinta/60">Por privacidad, los dueños aparecen solo con sus iniciales.</p>
          </section>
        </div>
      </main>

      {/* Catálogo */}
      <section id="mas-obras" className="border-t border-linea bg-white py-12">
        <div className="mx-auto max-w-5xl">
          <div className="px-4 sm:px-6">
            <Etiqueta>Más obras de {ARTISTA.nombre}</Etiqueta>
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
        <Link to="/entrar" className="text-sm text-terracota-btn hover:underline">
          ¿Eres el artista? Entra a tu panel
        </Link>
      </footer>
    </PaginaArtista>
  )
}
