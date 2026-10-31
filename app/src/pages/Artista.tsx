import { Link, useParams } from 'react-router'
import { SelloRegistroBrai } from '../components/marca'
import { ARTISTA, OBRAS, getObra } from '../data/demo'
import NoEncontrada from './NoEncontrada'
import { Etiqueta, PaginaArtista } from './Obra'

// Página del artista (docs/PROTOTIPO.md, punto 3). Con su color; Brai solo firma abajo.
export default function Artista() {
  const { slug = '' } = useParams()
  if (slug !== ARTISTA.slug) return <NoEncontrada />
  const obras = OBRAS.map((o) => getObra(o.codigo) ?? o)
  const conDueno = obras.filter((o) => o.dueno).length

  return (
    <PaginaArtista>
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6">
        <section className="entra max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-verde">{ARTISTA.disciplina}</p>
          <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl">{ARTISTA.nombre}</h1>
          {ARTISTA.ejemplo && <p className="mt-3 font-mono text-[10px] text-verde">Texto de ejemplo. Lo escribe el artista.</p>}
          <p className="mt-4 text-lg leading-relaxed text-tinta/85">
            Aquí va la presentación del artista, en sus palabras: qué pinta, desde cuándo y por qué.
          </p>
          <dl className="mt-8 flex gap-10 border-t border-linea pt-5">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-verde">Obras registradas</dt>
              <dd className="mt-1 font-display text-4xl font-semibold">{obras.length}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-verde">Con dueño</dt>
              <dd className="mt-1 font-display text-4xl font-semibold">{conDueno}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-14">
          <Etiqueta>Obras</Etiqueta>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-8">
            {obras.map((o, i) => (
              <Link key={o.codigo} to={`/o/${o.codigo}`} className="entra group" style={{ animationDelay: `${150 + i * 90}ms` }}>
                <div className="overflow-hidden bg-[var(--acento)] p-2">
                  <img src={o.imagen} alt="" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 font-display text-lg font-semibold leading-tight">{o.titulo}</p>
                <p className="mt-1 font-mono text-[11px] text-verde">
                  {o.registro} · {o.tecnica} · {o.anio}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold">
                  <i className={`size-2 rounded-full ${o.dueno ? 'bg-[var(--acento)]' : 'bg-dorado'}`} />
                  {o.dueno ? `Con dueño, ${o.dueno}` : 'Registrada, sin reclamar'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <SelloRegistroBrai />
      </footer>
    </PaginaArtista>
  )
}
