// Recorrido guiado para enseñarle Brai a un artista en 5 minutos (la reunión
// con José Luis Malo: docs/REUNION_JOSE_LUIS.md). Se personaliza con
// /recorrido?para=Nombre (DECISIONES #38): el nombre no se guarda en el sitio.
// Precios: docs/OFERTA.md (A vigente, B en prueba). Si cambian allá, cambian aquí.
import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Logo, SelloNFC, TarjetaDueno } from '../components/marca'
import { Raspadita, LinkReclamarDemo } from '../components/interaccion'
import { Punto } from '../components/punto'
import { ARTISTA, CODIGO_DEMO, NOMBRE_PARA, OBRAS } from '../data/demo'

const OFERTA_A = { setup: 7500, mes: 990, incluidas: 20 }
const OFERTA_B = { arranque: 2500, incluidas: 5, porObra: 450 }

const mxn = (n: number) => `${Math.round(n).toLocaleString('es-MX')} MXN`

function Paso({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="revela border-t border-linea py-14 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">Paso {n} de 5</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">{titulo}</h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

function Calculadora() {
  const [obras, setObras] = useState(10)
  const [precio, setPrecio] = useState(12000)
  const vende = obras * precio
  const a1 = OFERTA_A.setup + OFERTA_A.mes * 12
  const a2 = OFERTA_A.mes * 12
  const b1 = OFERTA_B.arranque + OFERTA_B.porObra * Math.max(0, obras - OFERTA_B.incluidas)
  const b2 = OFERTA_B.porObra * obras
  const pct = (c: number) => (vende > 0 ? `${((c / vende) * 100).toFixed(1)}%` : '?')
  const ventas = (c: number) => Math.ceil(c / precio)

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[inset_0_0_0_1px_var(--color-linea)] sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-semibold">
            Obras que vendes al año <span className="font-mono text-lg">{obras}</span>
          </span>
          <input type="range" min={1} max={40} value={obras} onChange={(e) => setObras(+e.target.value)} className="mt-3 w-full accent-terracota-btn" />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between text-sm font-semibold">
            Precio promedio por obra <span className="font-mono text-lg">{mxn(precio)}</span>
          </span>
          <input type="range" min={2000} max={60000} step={1000} value={precio} onChange={(e) => setPrecio(+e.target.value)} className="mt-3 w-full accent-terracota-btn" />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          { nombre: 'Opción A', como: `${mxn(OFERTA_A.setup)} de arranque + ${mxn(OFERTA_A.mes)} al mes`, nota: `Incluye ${OFERTA_A.incluidas} obras en el arranque.`, y1: a1, y2: a2 },
          { nombre: 'Opción B', como: `${mxn(OFERTA_B.arranque)} de arranque + ${mxn(OFERTA_B.porObra)} por obra`, nota: `El arranque incluye ${OFERTA_B.incluidas} obras. Sin mensualidad.`, y1: b1, y2: b2 },
        ].map((o) => (
          <div key={o.nombre} className="rounded-2xl bg-lienzo p-5">
            <p className="font-semibold">{o.nombre}</p>
            <p className="mt-1 text-sm text-tinta/75">{o.como}</p>
            <p className="text-xs text-tinta/60">{o.nota}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-tinta/65">Primer año</dt>
                <dd className="font-mono text-xl">{mxn(o.y1)}</dd>
                <dd className="font-mono text-[11px] text-verde">{pct(o.y1)} de lo que vendes</dd>
              </div>
              <div>
                <dt className="text-xs text-tinta/65">Desde el segundo</dt>
                <dd className="font-mono text-xl">{mxn(o.y2)}</dd>
                <dd className="font-mono text-[11px] text-verde">{pct(o.y2)} de lo que vendes</dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-linea pt-3 text-sm">
              Se paga con <span className="font-semibold">{ventas(o.y1)} {ventas(o.y1) === 1 ? 'venta extra' : 'ventas extra'}</span> el primer año.
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-tinta/60">
        "Venta extra" es una obra que le vendes a alguien que ya te compró y que sin Brai no te habría vuelto a comprar. Es una estimación, no
        una promesa. La galería, como referencia, se queda con 40 a 50% de cada venta.
      </p>
    </div>
  )
}

export default function Recorrido() {
  const obra = OBRAS[0]
  const nombre = NOMBRE_PARA ?? null
  const primer = nombre?.split(' ')[0]
  const [raspada, setRaspada] = useState(false)

  return (
    <>
      <header className="border-b border-linea">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Logo />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-verde">Recorrido</span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 sm:px-6">
        <section className="grid items-center gap-8 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">Brai en 5 minutos</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              {primer ? `Hola, ${primer}.` : 'Hola.'}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta/85">
              Te enseñamos cómo funcionaría Brai con tu obra. Todo lo que ves es un ejemplo: tus obras, tus colores y tus historias van después,
              si te late.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Punto tam={150} mira interactivo frases={['Soy Punto, el sello.', 'Voy detrás de tu cuadro.', 'Acércame un celular.']} />
          </div>
        </section>

        <Paso n={1} titulo="Tu obra lleva un sello.">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              <SelloNFC registro={obra.registro} ondas />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-tinta/85">
                Va detrás del cuadro, con un QR al lado. Quien acerca su celular ve la página de la obra: su historia, su ficha y que la
                registraste tú. Sin descargar ninguna app.
              </p>
              <Link to={`/o/${obra.codigo}?v=n`} className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-terracota-btn px-5 py-3 font-semibold text-lienzo hover:bg-terracota-hover">
                Ver lo que abre el sello <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </Paso>

        <Paso n={2} titulo="Tu comprador la pone a su nombre.">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              <TarjetaDueno titulo={obra.titulo} artista={ARTISTA.nombre} ficha={`${obra.registro} · ${obra.tecnica}`}>
                <Raspadita codigo={CODIGO_DEMO} alRevelar={() => setRaspada(true)} />
              </TarjetaDueno>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-tinta/85">
                Con la obra le entregas una tarjeta firmada por ti. Raspa su código, lo escribe con su correo y la obra queda a su nombre. El
                código sirve una sola vez.
              </p>
              <p className="mt-4 font-semibold">{raspada ? <LinkReclamarDemo codigoObra={obra.codigo} codigo={CODIGO_DEMO} titulo={obra.titulo} /> : 'Ráspala con el dedo.'}</p>
            </div>
          </div>
        </Paso>

        <Paso n={3} titulo="Tú sabes quién la tiene.">
          <p className="max-w-2xl text-lg leading-relaxed text-tinta/85">
            En tu panel ves cada obra, quién es su dueño y su correo. Cuando terminas una obra nueva, les avisas primero a quienes ya te compraron.
            En la página pública el dueño solo aparece con sus iniciales.
          </p>
          <Link to="/panel" className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-terracota-btn px-5 py-3 font-semibold text-lienzo hover:bg-terracota-hover">
            Abrir el panel de ejemplo <ArrowRight size={18} />
          </Link>
          <p className="mt-3 text-sm text-tinta/65">Si reclamaste la obra en el paso 2, ahí vas a ver tu correo.</p>
        </Paso>

        <Paso n={4} titulo="Cuánto cuesta, con tus números.">
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-tinta/85">
            Tenemos dos formas de cobrarlo y queremos saber cuál te hace más sentido. Mueve las barras con lo que vendes de verdad.
          </p>
          <Calculadora />
        </Paso>

        <Paso n={5} titulo="Queremos que seas de los primeros tres.">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-semibold">Lo que te damos</p>
              <ul className="mt-3 space-y-2 text-tinta/85">
                <li>El arranque, sin costo.</li>
                <li>Tres meses sin costo.</li>
                <li>Tu página con tu nombre y tu color.</li>
                <li>Al cuarto mes sigues con precio de fundador, o te vas y te quedas con todo lo registrado.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Lo que te pedimos</p>
              <ul className="mt-3 space-y-2 text-tinta/85">
                <li>Registrar de 3 a 5 obras reales.</li>
                <li>Entregar las tarjetas a tus compradores.</li>
                <li>30 minutos de grabación para nuestro video.</li>
                <li>Permiso por escrito para contar tu caso.</li>
              </ul>
            </div>
          </div>
        </Paso>

        <section className="border-t border-linea py-16 text-center">
          <p className="mx-auto max-w-xl font-display text-3xl font-semibold leading-tight">Cada obra sabe de dónde viene.</p>
          <p className="mx-auto mt-4 max-w-md text-tinta/75">Gracias por tu tiempo. Lo que nos digas hoy decide cómo construimos Brai.</p>
        </section>
      </main>
    </>
  )
}
