// Kit de marca vivo, en el mismo link de la app. Fuente de verdad: brand/BRAND.md.
// Si algo de aquí choca con BRAND.md, gana BRAND.md y se corrige aquí.
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Isotipo, Logo, SelloNFC, SelloRegistroBrai, TarjetaDueno } from '../components/marca'
import { Punto, type EstadoPunto } from '../components/punto'
import { ARTISTA, OBRAS } from '../data/demo'

const COLORES = [
  { nombre: 'Terracota', hex: '#C06E52', uso: 'Logo y superficies grandes. Texto encima solo en tinta.', texto: 'text-tinta' },
  { nombre: 'Terracota botón', hex: '#A2563D', uso: 'Botones, links y texto chico. 4.75:1 sobre lienzo.', texto: 'text-lienzo' },
  { nombre: 'Tinta carbón', hex: '#2B2622', uso: 'Texto y fondos oscuros. Nunca negro puro.', texto: 'text-lienzo' },
  { nombre: 'Dorado', hex: '#C9A24B', uso: 'Solo el momento "obra registrada". Nunca texto.', texto: 'text-tinta' },
  { nombre: 'Lienzo', hex: '#F6F1EA', uso: 'Fondos.', texto: 'text-tinta' },
  { nombre: 'Verde sabio', hex: '#5E6C52', uso: 'Texto secundario y etiquetas. 5.0:1.', texto: 'text-lienzo' },
]

const ESTADOS: { estado: EstadoPunto; nombre: string; cuando: string }[] = [
  { estado: 'tranquilo', nombre: 'Tranquilo', cuando: 'Por default. Parpadea y te sigue con los ojos.' },
  { estado: 'toque', nombre: 'Toque', cuando: 'Cuando lo tocas: salen las ondas del NFC.' },
  { estado: 'feliz', nombre: 'Feliz', cuando: 'Cuando el artista registra una obra nueva en su panel.' },
  { estado: 'duda', nombre: 'Duda', cuando: 'Página no encontrada.' },
]

function Seccion({ kicker, titulo, children }: { kicker: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-linea py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.01em] sm:text-4xl">{titulo}</h2>
      <div className="mt-10">{children}</div>
    </section>
  )
}

export default function Marca() {
  const obra = OBRAS[0]
  return (
    <>
      <header className="border-b border-linea">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Logo />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-verde">Kit de marca v2.2</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid items-center gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">Marca</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-7xl">Cada obra sabe de dónde viene.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinta/85">
              Tres palabras para revisar cualquier pieza: <em>museo</em> (orden, ficha, aire), <em>taller</em> (calidez, mano, voz cercana) y{' '}
              <em>registro</em> (fechas, números, nada que no podamos sostener).
            </p>
          </div>
          <div className="flex justify-center">
            <Punto tam={190} mira interactivo frases={['Hola, soy Punto.', 'Vivo detrás del cuadro.', 'Acércame un celular.', 'Yo me acuerdo de todo.']} etiqueta="Punto, la mascota de Brai. Tócalo." />
          </div>
        </section>

        <Seccion kicker="Isotipo" titulo="El enso: un trazo que casi se cierra.">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8"><Isotipo size={96} /><span className="font-mono text-xs text-verde">Color</span></div>
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-tinta p-8"><Isotipo size={96} variante="_claro" /><span className="font-mono text-xs text-lienzo/70">Una tinta, fondo oscuro</span></div>
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-arena p-8"><Isotipo size={96} variante="_tinta" /><span className="font-mono text-xs text-verde">Una tinta, impresión barata</span></div>
          </div>
          <p className="mt-5 max-w-2xl text-tinta/80">El hueco va siempre a las 2 en punto. El punto dorado lo cierra: es el último gesto, el que verifica. Mínimo 8 mm.</p>
        </Seccion>

        <Seccion kicker="Mascota" titulo="Punto, el sello que todo lo recuerda.">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ESTADOS.map((e) => (
              <li key={e.estado} className="flex flex-col items-center rounded-2xl bg-white px-5 pb-6 pt-8 text-center">
                <Punto tam={110} estado={e.estado} />
                <p className="mt-4 font-semibold">{e.nombre}</p>
                <p className="mt-1 text-sm text-tinta/75">{e.cuando}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border-t border-tinta pt-5">
              <p className="font-semibold">Por qué es así</p>
              <p className="mt-2 leading-relaxed text-tinta/80">
                Está hecho del producto, como el muñeco de Michelin está hecho de llantas: es el sello que va detrás del cuadro. Tomamos de Clawd, la
                mascota de Claude Code, el color plano, los ojos sin boca y las patitas. El hueco y el punto dorado son los del logo.
              </p>
            </div>
            <div className="border-t border-linea pt-5">
              <p className="font-semibold">Lo que nunca hace</p>
              <p className="mt-2 leading-relaxed text-tinta/80">
                Interrumpir, tapar contenido o salir en la página de la obra, que es del artista. Una vez por pantalla, como mucho. La historia
                completa está en <span className="font-mono text-sm">docs/MASCOTA.md</span>.
              </p>
            </div>
          </div>
        </Seccion>

        <Seccion kicker="Color" titulo="Seis colores, un solo acento.">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COLORES.map((c) => (
              <li key={c.hex} className={`rounded-2xl p-6 ${c.texto}`} style={{ background: c.hex, boxShadow: c.hex === '#F6F1EA' ? 'inset 0 0 0 1px #E5DDCF' : undefined }}>
                <p className="font-semibold">{c.nombre}</p>
                <p className="font-mono text-sm">{c.hex}</p>
                <p className="mt-6 text-sm opacity-90">{c.uso}</p>
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion kicker="Tipografía" titulo="Tres voces.">
          <div className="divide-y divide-linea border-y border-linea">
            <div className="grid gap-2 py-6 md:grid-cols-[12rem_1fr]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-verde">Galería · Fraunces</p>
              <p className="font-display text-5xl font-semibold leading-tight tracking-[-0.02em]">Obras con historia</p>
            </div>
            <div className="grid gap-2 py-6 md:grid-cols-[12rem_1fr]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-verde">Taller · Schibsted</p>
              <p className="text-xl leading-relaxed">Cada obra lleva su historia, su artista y su dueño. Así se escribe todo lo que se lee.</p>
            </div>
            <div className="grid gap-2 py-6 md:grid-cols-[12rem_1fr]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-verde">Registro · Plex Mono</p>
              <p className="font-mono text-lg">BRAI-0007 · Óleo sobre tela · 60 × 80 cm · 2026</p>
            </div>
          </div>
        </Seccion>

        <Seccion kicker="Voz" titulo="Hablamos como el artista en su taller.">
          <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {[
              ['Acerca tu celular al sello.', 'Escanea el tag NFC habilitado.'],
              ['Registrada por el artista.', 'Verificado por Brai.'],
              ['Raspa tu código y la obra queda a tu nombre.', 'Complete el proceso de verificación de titularidad.'],
              ['Registro de propiedad y procedencia.', 'Imposible de falsificar.'],
            ].map(([si, no]) => (
              <li key={si} className="border-t border-linea pt-4">
                <p className="font-semibold">{si}</p>
                <p className="mt-1 text-tinta/55 line-through decoration-terracota/60">{no}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-tinta/75">Puntuación humana: comas y puntos. Sin guion largo, sin puntos suspensivos, sin barras entre palabras.</p>
        </Seccion>

        <Seccion kicker="Piezas físicas" titulo="Lo que toca el comprador.">
          <div className="grid items-center gap-12 rounded-3xl bg-arena px-6 py-12 md:grid-cols-3">
            <div className="flex justify-center"><SelloNFC registro={obra.registro} /></div>
            <div className="flex justify-center">
              <TarjetaDueno titulo={obra.titulo} artista={ARTISTA.nombre} ficha={`${obra.registro} · Óleo · ${obra.medidas}`} />
            </div>
            <div className="flex justify-center"><SelloRegistroBrai registro={obra.registro} /></div>
          </div>
          <Link to={`/imprimir/${obra.codigo}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-terracota-btn hover:underline">
            Imprimir las piezas en tamaño real <ArrowRight size={18} />
          </Link>
        </Seccion>
      </main>
      <footer className="border-t border-linea">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-verde sm:px-6">Fuente de verdad: brand/BRAND.md y brand/kit.html en el repositorio.</div>
      </footer>
    </>
  )
}
