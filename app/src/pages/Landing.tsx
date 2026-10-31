import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, X } from 'lucide-react'
import { BarraProgreso, TarjetaTilt, Telefono3D } from '../components/movimiento'
import { Isotipo, Logo, SelloNFC, TarjetaDueno } from '../components/marca'
import { Cifra, EscenaSello, LinkReclamarDemo, Pregunta, Raspadita } from '../components/interaccion'
import { ARTISTA, CODIGO_DEMO, OBRAS } from '../data/demo'

// Pendiente: el dominio brai.art no está comprado. El buzón lo revisa un adulto.
const CORREO_EQUIPO = 'hola@brai.art'
const CORREO_FUNDADOR =
  `mailto:${CORREO_EQUIPO}?subject=${encodeURIComponent('Quiero ser artista fundador de Brai')}&body=` +
  encodeURIComponent(
    'Hola, soy:\nMi Instagram o página:\nObras que vendo al año, más o menos:\nRango de precio de mis obras:\nCómo vendo hoy (taller, redes, galería, encargos):\n',
  )
const OBRA_DEMO = OBRAS[0]

// Cifras con fuente (docs/ANALISIS.md y docs/COSTOS.md). No inventar.
const CIFRAS = [
  {
    valor: 69,
    sufijo: '%',
    texto: 'de los coleccionistas ya le compró directo a un artista, sin galería.',
    fuente: 'Art Basel y UBS, Survey of Global Collecting 2025',
    url: 'https://ocula.com/magazine/art-news/2025-art-basel-ubs-survey-global-collecting/',
  },
  {
    valor: 8870,
    texto: 'pintores, escultores y artistas visuales trabajan en Jalisco.',
    fuente: 'DataMéxico, ENOE 2025',
    url: 'https://www.economia.gob.mx/datamexico/es/profile/occupation/pintores-disenadores-y-dibujantes-artisticos-escultores-y-escenografos',
  },
  {
    valor: 1,
    texto: 'venta extra al año a quien ya te compró paga Brai desde el segundo año, si tu obra vale 12,000 MXN.',
    fuente: 'Cálculo del equipo con nuestro precio',
    url: null,
  },
]

const PROBLEMAS = [
  {
    n: '01',
    titulo: 'No sabes quién tiene tu obra.',
    texto: 'La vendiste en tu taller o por Instagram y ahí se acabó el rastro. Si mañana alguien la revende, te enteras tarde o nunca.',
  },
  {
    n: '02',
    titulo: 'No puedes volver a venderle a quien ya te compró.',
    texto: 'Tu mejor cliente es el que ya confió en ti. Sin su nombre ni su correo, cada obra nueva empieza de cero.',
  },
  {
    n: '03',
    titulo: 'La ley te da una parte de cada reventa. Casi nadie la cobra.',
    texto: 'El artículo 92 bis de la Ley Federal del Derecho de Autor te da ese derecho y no puedes renunciar a él. Para cobrarlo necesitas saber por dónde anda tu obra.',
  },
]

const PASOS = [
  { titulo: 'Registras la obra', texto: 'Fotos, tres fotos huella de detalles únicos, ficha e historia. La obra recibe su número: BRAI-0007.' },
  { titulo: 'Sellamos el cuadro', texto: 'Un sello NFC detrás, que se rompe si lo despegan, y un QR al lado para celulares sin NFC.' },
  { titulo: 'Entregas la tarjeta', texto: 'Firmada a mano por ti, con el código de dueño escondido bajo una raspadita.' },
  { titulo: 'Tu comprador la reclama', texto: 'Raspa, escribe su código y su correo, y la obra queda a su nombre. Tú sabes quién la tiene.' },
]

function Kicker({ children }: { children: string }) {
  return <p className="font-mono text-xs uppercase tracking-[0.16em] text-verde">{children}</p>
}

export default function Landing() {
  const [raspada, setRaspada] = useState(false)
  return (
    <>
      <header className="sticky top-0 z-30 bg-lienzo">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Logo />
          <Link
            to={`/o/${OBRA_DEMO.codigo}`}
            className="rounded-[10px] px-3 py-2 text-sm font-medium text-terracota-btn hover:text-terracota-hover hover:underline"
          >
            Ver una obra registrada
          </Link>
        </div>
        <BarraProgreso />
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-20">
          <div>
            <Kicker>Registro de obra para artistas independientes</Kicker>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-6xl lg:text-[4.4rem]">
              <span className="block">Vendiste tu obra.</span>
              <span className="block text-terracota-btn">¿Sabes dónde está hoy?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinta/85">
              Brai pone un sello detrás de cada cuadro. Quien acerque su celular ve la historia de la obra, que la registraste tú
              y quién es su dueño. Y tú nunca pierdes de vista a quien te compró.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to={`/o/${OBRA_DEMO.codigo}`}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-terracota-btn px-6 py-3.5 font-semibold text-lienzo transition-colors hover:bg-terracota-hover active:bg-terracota-active"
              >
                Ver una obra registrada <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <a
                href="#fundadores"
                className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-tinta px-6 py-3.5 font-semibold transition-colors hover:bg-tinta/5"
              >
                Quiero registrar mis obras
              </a>
            </div>
          </div>
          <div className="revela md:justify-self-end">
            <Telefono3D src={`/o/${OBRA_DEMO.codigo}`} titulo={`Página de la obra ${OBRA_DEMO.titulo}`} />
          </div>
        </section>

        {/* El problema */}
        <section className="border-t border-linea bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="revela max-w-2xl">
              <Kicker>El problema</Kicker>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">
                Una obra vendida es una obra que se pierde de vista.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {PROBLEMAS.map((p) => (
                <div key={p.n} className="revela">
                  <TarjetaTilt className="rounded-2xl border border-linea bg-lienzo p-7">
                    <span className="block font-mono text-sm text-terracota-btn [transform:translateZ(30px)]">{p.n}</span>
                    <h3 className="mt-10 font-display text-[1.45rem] font-semibold leading-snug [transform:translateZ(22px)]">{p.titulo}</h3>
                    <p className="mt-4 leading-relaxed text-tinta/80 [transform:translateZ(12px)]">{p.texto}</p>
                  </TarjetaTilt>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cifras */}
        <section className="border-t border-linea">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 md:py-20">
            {CIFRAS.map((c) => (
              <div key={c.fuente} className="revela">
                <p className="font-display text-6xl font-semibold tracking-[-0.02em] text-terracota-btn">
                  <Cifra valor={c.valor} sufijo={c.sufijo} />
                </p>
                <p className="mt-3 max-w-xs leading-relaxed">{c.texto}</p>
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-[11px] text-verde underline-offset-2 hover:underline">
                    {c.fuente}
                  </a>
                ) : (
                  <p className="mt-3 font-mono text-[11px] text-verde">{c.fuente}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <EscenaSello titulo={OBRA_DEMO.titulo} artista={ARTISTA.nombre} registro={OBRA_DEMO.registro} imagen={OBRA_DEMO.imagen} />

        {/* Cómo funciona */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="revela max-w-2xl">
            <Kicker>Cómo funciona</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">
              Lo montamos contigo, obra por obra.
            </h2>
          </div>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="revela paso pt-5">
                <span className="font-mono text-xs text-verde">Paso {i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-tinta/80">{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Las 3 piezas */}
        <section className="bg-arena">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="revela max-w-2xl">
              <Kicker>Lo que recibe tu comprador</Kicker>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">
                Tres piezas, como la cédula de un museo.
              </h2>
            </div>
            <div className="mt-14 grid items-end gap-12 md:grid-cols-3">
              <figure className="revela flex flex-col items-center gap-5">
                <SelloNFC registro={OBRA_DEMO.registro} ondas />
                <figcaption className="max-w-xs text-center">
                  <span className="font-semibold">El sello.</span> Va detrás del cuadro y abre la página de la obra al acercar el celular.
                </figcaption>
              </figure>
              <figure className="revela flex flex-col items-center gap-5">
                <TarjetaDueno
                  titulo={OBRA_DEMO.titulo}
                  artista={ARTISTA.nombre}
                  ficha={`${OBRA_DEMO.registro} · Óleo · 60×80 cm · ${OBRA_DEMO.anio}`}
                >
                  <Raspadita codigo={CODIGO_DEMO} alRevelar={() => setRaspada(true)} />
                </TarjetaDueno>
                <figcaption className="max-w-xs text-center">
                  {raspada ? (
                    <LinkReclamarDemo codigoObra={OBRA_DEMO.codigo} codigo={CODIGO_DEMO} titulo={OBRA_DEMO.titulo} />
                  ) : (
                    <>
                      <span className="font-semibold">La tarjeta de dueño.</span> Firmada a mano. Ráspala: si la raspadita está intacta, nadie vio el código antes.
                    </>
                  )}
                </figcaption>
              </figure>
              <figure className="revela flex flex-col items-center gap-5">
                <Link
                  to={`/o/${OBRA_DEMO.codigo}`}
                  className="group block w-40 overflow-hidden rounded-[22px] border-[6px] border-tinta bg-white"
                >
                  <img src={OBRA_DEMO.imagen} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="px-2.5 py-2">
                    <div className="truncate font-display text-sm font-semibold">{OBRA_DEMO.titulo}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold">
                      <i className="size-2 rounded-full bg-dorado" /> Registrada
                    </div>
                  </div>
                </Link>
                <figcaption className="max-w-xs text-center">
                  <span className="font-semibold">La página de la obra.</span> Su historia, su ficha y su línea de dueños.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Promesa honesta */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="revela max-w-2xl">
            <Kicker>Lo que prometemos</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">
              Te decimos lo que sí hace, y lo que no.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-tinta/85">
              La verdad de una obra vive en su registro, no en el chip. El sello es la puerta. Lo que dice quién la pintó y de quién es,
              lo guarda Brai.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <ul className="revela space-y-4 border-t border-tinta pt-6">
              {[
                'Verificada por el artista: tú la registraste, con fecha y fotos.',
                'Registro de propiedad y procedencia, con cada dueño en orden.',
                'Fotos huella para comparar el cuadro con su registro.',
                'Un código de dueño de un solo uso, bajo raspadita.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 shrink-0 text-verde" size={20} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <ul className="revela space-y-4 border-t border-linea pt-6 text-tinta/70">
              {[
                'Que nadie pueda copiar jamás tu obra. Nadie serio puede prometer eso.',
                'Tecnología rara que tengas que entender para usarla.',
                'Ventas garantizadas.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-0.5 shrink-0" size={20} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fundadores */}
        <section id="fundadores" className="scroll-mt-20 bg-tinta text-lienzo">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-28">
            <div className="revela">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-lienzo/70">Artistas fundadores</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">
                Buscamos a los primeros 3 artistas.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-lienzo/85">
                Te montamos Brai gratis y te damos 3 meses sin costo. A cambio, registras de 3 a 5 obras reales, entregas las tarjetas
                a tus compradores y nos dejas contar tu caso.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-lienzo/70">
                Es para ti si vendes obra original directo, en tu taller, por redes o por encargo, y vendes 10 obras o más al año, o
                tienes tu propia audiencia.
              </p>
              <a
                href={CORREO_FUNDADOR}
                className="mt-9 inline-flex items-center gap-2 rounded-[10px] bg-lienzo px-6 py-3.5 font-semibold text-tinta transition-colors hover:bg-white"
              >
                Quiero registrar mis obras <ArrowRight size={18} />
              </a>
            </div>
            <div className="revela self-end border-t border-lienzo/25 pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-lienzo/70">Después del periodo de fundador</p>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-sm text-lienzo/70">Arranque, una vez</dt>
                  <dd className="font-display text-4xl font-semibold">7,500 MXN</dd>
                  <dd className="mt-1 text-sm text-lienzo/70">Tu página, 20 obras registradas, 20 sellos y 20 tarjetas.</dd>
                </div>
                <div>
                  <dt className="text-sm text-lienzo/70">Cada mes</dt>
                  <dd className="font-display text-4xl font-semibold">990 MXN</dd>
                  <dd className="mt-1 text-sm text-lienzo/70">Obras nuevas, transferencias y aviso cuando una obra cambia de dueño.</dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-lienzo/85">
                Si tu obra vale 12,000, dos ventas extra a quien ya te compró pagan el primer año.
              </p>
            </div>
          </div>
        </section>

        {/* Preguntas */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:grid md:grid-cols-[1fr_1.6fr] md:gap-14 md:py-28">
          <div className="revela">
            <Kicker>Preguntas</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-[2.6rem]">Lo que nos preguntan.</h2>
          </div>
          <div className="revela mt-8 border-t border-linea md:mt-0">
            <Pregunta pregunta="¿Y si mi comprador no tiene NFC en su celular?">
              Cada sello lleva un QR al lado. Cualquier celular con cámara abre la misma página. En México casi 8 de cada 10 celulares son
              Android y muchos traen el NFC apagado, por eso el QR no es opcional.
            </Pregunta>
            <Pregunta pregunta="¿Se puede copiar el sello?">
              Un sello básico, sí. Por eso no te prometemos lo imposible. La verdad vive en el registro: las fotos huella para comparar el
              cuadro, un código de dueño que solo sirve una vez y un historial donde cada evento lleva la huella del anterior. Si alguien
              cambia uno, la cadena deja de cuadrar.
            </Pregunta>
            <Pregunta pregunta="¿Por qué no es un NFT?">
              Lo evaluamos. Un NFT protege el registro, que ya está protegido, y no el sello, que es lo que se puede copiar. Además obliga a
              tu comprador a manejar una cartera digital, y el arte en NFT cayó más de 90% desde 2021. Tomamos solo la idea buena: un
              registro que delata cualquier cambio.
            </Pregunta>
            <Pregunta pregunta="¿Quién ve los datos de mi comprador?">
              Solo tú. En la página pública el dueño aparece con sus iniciales. Su correo sirve para que sepas quién tiene tu obra y para
              avisarle cuando tengas obra nueva, si así lo quiere.
            </Pregunta>
            <Pregunta pregunta="¿Y si un día me voy de Brai?">
              Te llevas todo lo registrado: fichas, fotos, historias y dueños. Tu historial es tuyo, no de la plataforma.
            </Pregunta>
            <Pregunta pregunta="¿Qué gana quien compra mi obra?">
              La historia contada por ti, una prueba de procedencia si algún día la revende o la hereda, y una línea directa contigo.
            </Pregunta>
          </div>
        </section>

        {/* Cierre */}
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
          <div className="revela flex flex-col items-start gap-8">
            <Isotipo size={64} />
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-6xl">
              Cada obra sabe de dónde viene.
            </h2>
            <Link
              to={`/o/${OBRA_DEMO.codigo}`}
              className="inline-flex items-center gap-2 rounded-[10px] bg-terracota-btn px-6 py-3.5 font-semibold text-lienzo transition-colors hover:bg-terracota-hover"
            >
              Ver una obra registrada <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-linea">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-verde sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Brai es un proyecto de estudiantes para Business Shark 8°.</span>
          <span className="font-mono text-xs">Registro de propiedad y procedencia</span>
        </div>
      </footer>
    </>
  )
}
