// DATOS DE LA DEMO. Dos modos:
//  - "ejemplo": Lucía Arce, artista INVENTADA, con obras inventadas.
//  - "jose-luis": José Luis Malo, con datos PÚBLICOS y su fuente (DECISIONES #42).
//    Se activa entrando a /jose-luis y se quita con /?salir-demo.
//    Reglas: nada inventado (lo que no se sabe dice "Por confirmar"), ningún
//    dueño inventado sobre una obra real, ninguna cita que él no haya dicho y
//    ninguna foto de su obra sin su permiso (van en public/obras/jose-luis/).
//
// La forma de estos datos es la que va a devolver la vista pública de Supabase
// (docs/PROTOTIPO.md): sin correos, dueños solo con iniciales.

export type Evento = {
  tipo: 'registro' | 'entrega' | 'reclamo' | 'transferencia'
  fecha: string // ISO
  texto: string
}

export type Obra = {
  codigo: string // lo que va en el sello: brai.art/o/<codigo>
  registro: string // BRAI-0001
  titulo: string
  tecnica: string
  medidas: string
  /** null = año por confirmar */
  anio: number | null
  imagen: string
  /** Fotos huella: acercamientos de la misma foto (x, y en % del cuadro) */
  huellas: { x: number; y: number; nota: string }[]
  historia: string[]
  video: { duracion: string; disponible: boolean }
  eventos: Evento[]
  /** Iniciales del dueño actual, null si nadie la ha reclamado */
  dueno: string | null
  /** De dónde salen los datos (modo José Luis) */
  fuente?: { texto: string; url: string }
}

export type Artista = {
  slug: string
  nombre: string
  disciplina: string
  acento: string
  correo: string | null
  /** true mientras los datos no sean reales: la página muestra el aviso */
  ejemplo: boolean
  ciudad: string
  bio: string[]
  fuentes: { texto: string; url: string }[]
}

export function anioTexto(o: Pick<Obra, 'anio'>) {
  return o.anio === null ? 'Año por confirmar' : String(o.anio)
}

// ---------------------------------------------------------------- modo
export type Modo = 'ejemplo' | 'jose-luis'
const CLAVE_MODO = 'brai-demo-modo'
function leerModo(): Modo {
  if (import.meta.env.VITE_DEMO_JOSE_LUIS === '1') return 'jose-luis'
  if (typeof window === 'undefined') return 'ejemplo'
  try {
    const ruta = window.location.pathname
    // Entrar a una obra suya (por ejemplo, al escanear el QR impreso con otro
    // celular) o a su página también activa su modo.
    const suya = /^\/(o\/(TQ4RC|D7PNG|C8MNT|VJ6KC|K9FGR)|a\/jose-luis-malo|imprimir\/(TQ4RC|D7PNG|C8MNT|VJ6KC|K9FGR))(\/|$)/i.test(ruta)
    if (ruta === '/jose-luis' || ruta.startsWith('/jose-luis/') || suya) {
      localStorage.setItem(CLAVE_MODO, 'jose-luis')
      return 'jose-luis'
    }
    if (new URLSearchParams(window.location.search).has('salir-demo')) {
      localStorage.removeItem(CLAVE_MODO)
      return 'ejemplo'
    }
    return localStorage.getItem(CLAVE_MODO) === 'jose-luis' ? 'jose-luis' : 'ejemplo'
  } catch {
    return 'ejemplo'
  }
}
export const MODO: Modo = leerModo()
export const MODO_JOSE_LUIS = MODO === 'jose-luis'

// Fuentes públicas consultadas el 31 oct 2026 (docs/DEMO_JOSE_LUIS.md)
const F = {
  vertice: { texto: 'Galería Vértice', url: 'https://galeriavertice.mx/pages/jose-luis-malo' },
  mutualart: { texto: 'MutualArt', url: 'https://www.mutualart.com/Artist/Jose-Luis-Malo/8BB17FDEB44116E3' },
  informador2012: { texto: 'El Informador, 2012', url: 'https://www.informador.mx/Cultura/Jose-Luis-Malo-y-su-arte-politico-20120810-0257.html' },
  pincelada: { texto: 'Pincelada de Vida, Gobierno de Jalisco', url: 'https://pinceladadevida.jalisco.gob.mx/jose-luis-malo/' },
  despertador: { texto: 'El Despertador Panamericano', url: 'https://eldespertadorpanamericano.com/arte-combatir-delincuencia-jl-malo/' },
  arteinformado: { texto: 'Arte Informado', url: 'https://www.arteinformado.com/guia/f/jose-luis-malo-213461' },
  udgtv: { texto: 'UDGTV, 2026', url: 'https://udgtv.com/noticias/jose-luis-malo-interviene-siteur/314993' },
}

const ARTISTA_EJEMPLO: Artista = {
  slug: 'ejemplo',
  nombre: 'Lucía Arce',
  disciplina: 'Pintura',
  acento: '#2F5D62',
  correo: null,
  ejemplo: true,
  ciudad: 'Guadalajara, Jalisco',
  bio: ['Aquí va la presentación del artista, en sus palabras: qué pinta, desde cuándo y por qué.'],
  fuentes: [],
}

const ARTISTA_JOSE_LUIS: Artista = {
  slug: 'jose-luis-malo',
  nombre: 'José Luis Malo',
  disciplina: 'Pintura y escultura',
  acento: '#2F5D62', // por confirmar: el color lo escoge él
  correo: null,
  ejemplo: true,
  ciudad: 'Guadalajara, Jalisco',
  bio: [
    'Pintor y escultor tapatío, nacido en 1971, con más de 30 años de trayectoria. Su obra mezcla el juego con la crítica política.',
    'Ha expuesto en México y en Asia. Según su perfil público, su obra está en colecciones como las del Museum of Contemporary Art de Chicago, el Museo Nacional del Tequila, el Senado de la República y el Congreso de Jalisco.',
    'En 2026 presentó Portador de la Paz, pintura y escultura contra la violencia normalizada, en la galería de la Estación Juárez del Tren Ligero.',
  ],
  fuentes: [F.pincelada, F.arteinformado, F.informador2012, F.udgtv],
}

export const ARTISTA: Artista = { ...(MODO_JOSE_LUIS ? ARTISTA_JOSE_LUIS : ARTISTA_EJEMPLO) }

// PERSONALIZACIÓN POR LINK (DECISIONES #38): /recorrido?para=Nombre pinta ese
// nombre en la demo SOLO en el navegador de quien abre el link. Para quitarlo:
// ?para= vacío. No aplica en modo José Luis (ahí ya es él).
const CLAVE_PARA = 'brai-demo-para'
function leerPara(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const q = new URLSearchParams(window.location.search).get('para')
    if (q !== null) {
      const limpio = q.replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 60)
      if (limpio) sessionStorage.setItem(CLAVE_PARA, limpio)
      else sessionStorage.removeItem(CLAVE_PARA)
      return limpio || null
    }
    return sessionStorage.getItem(CLAVE_PARA)
  } catch {
    return null
  }
}
export const NOMBRE_PARA = MODO_JOSE_LUIS ? ARTISTA_JOSE_LUIS.nombre : leerPara()
if (NOMBRE_PARA) ARTISTA.nombre = NOMBRE_PARA
/** El HTML prerenderizado (Lucía) no coincide: hay que pintar desde cero. */
export const DEMO_PERSONALIZADA = MODO_JOSE_LUIS || Boolean(NOMBRE_PARA)

/** Código de dueño de la demo. En la real va cifrado en la base y bajo raspadita. */
export const CODIGO_DEMO = '4K7P-9QX2'

const OBRAS_EJEMPLO: Obra[] = [
  {
    codigo: '7KQ2X',
    registro: 'BRAI-0001',
    titulo: 'Figuras del barrio',
    tecnica: 'Óleo sobre tela',
    medidas: '60 × 80 cm',
    anio: 2026,
    imagen: '/obras/los-olvidados.svg',
    huellas: [
      { x: 12, y: 40, nota: 'La primera figura, con el empaste más grueso' },
      { x: 55, y: 30, nota: 'Veladura sobre la figura del centro' },
      { x: 50, y: 92, nota: 'Trazo oscuro de la base, de un solo gesto' },
    ],
    historia: [
      'Empecé este cuadro pensando en la gente que pasa por la vida de un barrio y nadie nombra. Las figuras se van borrando de izquierda a derecha, como se borra la memoria.',
      'Lo pinté en capas durante tres meses. La última figura casi no se ve a propósito: quería que quien la mire tenga que acercarse.',
    ],
    video: { duracion: '0:40', disponible: false },
    eventos: [
      { tipo: 'registro', fecha: '2026-10-20', texto: 'Registrada por el artista en su taller' },
    ],
    dueno: null,
  },
  {
    codigo: 'M3RT8',
    registro: 'BRAI-0002',
    titulo: 'Sin título I',
    tecnica: 'Acrílico sobre tela',
    medidas: '50 × 70 cm',
    anio: 2025,
    imagen: '/obras/sin-titulo-1.svg',
    huellas: [
      { x: 30, y: 25, nota: 'Cruce de trazos verde y terracota' },
      { x: 70, y: 70, nota: 'Zona oscura con textura de espátula' },
      { x: 20, y: 85, nota: 'Esquina inferior izquierda' },
    ],
    historia: ['Texto de ejemplo. Aquí el artista cuenta cómo nació la obra.'],
    video: { duracion: '0:35', disponible: false },
    eventos: [
      { tipo: 'registro', fecha: '2026-10-20', texto: 'Registrada por el artista en su taller' },
      { tipo: 'entrega', fecha: '2026-10-24', texto: 'Entregada en persona con su tarjeta firmada' },
      { tipo: 'reclamo', fecha: '2026-10-24', texto: 'Reclamada por su primer dueño, M. R.' },
    ],
    dueno: 'M. R.',
  },
  {
    codigo: 'P9WD4',
    registro: 'BRAI-0003',
    titulo: 'Sin título II',
    tecnica: 'Acrílico sobre tela',
    medidas: '50 × 70 cm',
    anio: 2025,
    imagen: '/obras/sin-titulo-2.svg',
    huellas: [
      { x: 40, y: 40, nota: 'Trazo dorado sobre fondo oscuro' },
      { x: 75, y: 20, nota: 'Borde superior derecho' },
      { x: 25, y: 80, nota: 'Capa de ocre en la base' },
    ],
    historia: ['Texto de ejemplo. Aquí el artista cuenta cómo nació la obra.'],
    video: { duracion: '0:30', disponible: false },
    eventos: [{ tipo: 'registro', fecha: '2026-10-21', texto: 'Registrada por el artista en su taller' }],
    dueno: null,
  },
  {
    codigo: 'H2ZC6',
    registro: 'BRAI-0004',
    titulo: 'Sin título III',
    tecnica: 'Óleo sobre tela',
    medidas: '40 × 50 cm',
    anio: 2026,
    imagen: '/obras/sin-titulo-3.svg',
    huellas: [
      { x: 35, y: 45, nota: 'Trazo azul que cruza el centro' },
      { x: 80, y: 15, nota: 'Esquina superior derecha' },
      { x: 15, y: 70, nota: 'Mancha terracota' },
    ],
    historia: ['Texto de ejemplo. Aquí el artista cuenta cómo nació la obra.'],
    video: { duracion: '0:25', disponible: false },
    eventos: [{ tipo: 'registro', fecha: '2026-10-22', texto: 'Registrada por el artista en su taller' }],
    dueno: null,
  },
]

// ---------------------------------------------------------------- obras de José Luis
// Solo datos públicos con fuente. Lo que no se sabe: "Por confirmar".
// Las imágenes son marcos vacíos hasta que él nos dé fotos (public/obras/jose-luis/).
const SIN_FOTO = [
  { x: 25, y: 30, nota: 'Detalle que fotografiamos contigo' },
  { x: 65, y: 55, nota: 'Detalle que fotografiamos contigo' },
  { x: 40, y: 85, nota: 'La firma' },
]
const DEMO_REGISTRO: Evento[] = [
  { tipo: 'registro', fecha: new Date().toISOString().slice(0, 10), texto: 'Demostración: esta obra todavía no está registrada en Brai' },
]
const sinVideo = { duracion: '0:00', disponible: false }

const OBRAS_JOSE_LUIS: Obra[] = [
  {
    codigo: 'TQ4RC', registro: 'BRAI-0001', titulo: 'Toricleto', tecnica: 'Óleo sobre tela', medidas: '100 × 80 cm', anio: null,
    imagen: '/obras/jose-luis/toricleto.svg', huellas: SIN_FOTO, video: sinVideo, eventos: DEMO_REGISTRO, dueno: null,
    historia: ['Obra única (1 de 1), en exhibición en Galería Vértice. La historia de la obra la cuenta José Luis con sus palabras en la sesión de registro.'],
    fuente: F.vertice,
  },
  {
    codigo: 'D7PNG', registro: 'BRAI-0002', titulo: 'Diana y la Patria Náufraga', tecnica: 'Óleo sobre tela', medidas: 'Por confirmar', anio: null,
    imagen: '/obras/jose-luis/diana-y-la-patria-naufraga.svg', huellas: SIN_FOTO, video: sinVideo, eventos: DEMO_REGISTRO, dueno: null,
    historia: [
      'Un barco de vela que resiste la tempestad con una tripulación peculiar a bordo, entre ella Benito Juárez y El Chapulín Colorado: una sátira de México.',
      'Formó parte de Lúdico, su exposición de 2012 en la sala de arte del Congreso de Jalisco.',
    ],
    fuente: F.informador2012,
  },
  {
    codigo: 'C8MNT', registro: 'BRAI-0003', titulo: 'Caminantes', tecnica: 'Por confirmar', medidas: 'Por confirmar', anio: null,
    imagen: '/obras/jose-luis/caminantes.svg', huellas: SIN_FOTO, video: sinVideo, eventos: DEMO_REGISTRO, dueno: null,
    historia: [
      'Con el fondo blanco de sus paisajes, la serie capta el instante en que una persona pierde su identidad y empieza a desprenderse.',
      'Nació de buscar una colección menos cruda sin dejar de provocar, y lo llevó al tema de la migración.',
    ],
    fuente: F.despertador,
  },
  {
    codigo: 'VJ6KC', registro: 'BRAI-0004', titulo: 'Viejo loco', tecnica: 'Por confirmar', medidas: 'Por confirmar', anio: 2016,
    imagen: '/obras/jose-luis/viejo-loco.svg', huellas: SIN_FOTO, video: sinVideo, eventos: DEMO_REGISTRO, dueno: null,
    historia: ['Se vendió en una subasta en línea en 2021. Con Brai, José Luis sabría hoy dónde está y podría escribirle a quien la tiene.'],
    fuente: F.mutualart,
  },
  {
    codigo: 'K9FGR', registro: 'BRAI-0005', titulo: 'Configuraciones de un personaje', tecnica: 'Por confirmar', medidas: 'Por confirmar', anio: 1998,
    imagen: '/obras/jose-luis/configuraciones-de-un-personaje.svg', huellas: SIN_FOTO, video: sinVideo, eventos: DEMO_REGISTRO, dueno: null,
    historia: ['Premiada en el Salón de Octubre de 1998, en Guadalajara.'],
    fuente: F.arteinformado,
  },
]

export const OBRAS: Obra[] = MODO_JOSE_LUIS ? OBRAS_JOSE_LUIS : OBRAS_EJEMPLO

// Con un nombre real en pantalla (?para=) no se le atribuye una cita inventada
// (regla 3 de CLAUDE.md): la historia pasa a texto de ejemplo neutro.
if (NOMBRE_PARA && !MODO_JOSE_LUIS) {
  OBRAS[0].historia = ['Texto de ejemplo. Aquí cuentas, con tus palabras, cómo nació la obra. Lo escribimos contigo en la sesión de registro.']
}

// Reclamos hechos en esta sesión de la demo. En la versión real esto lo hace
// UNA función en Supabase (revisa el código cifrado, cuenta intentos, crea el evento).
// localStorage (no sessionStorage): lo que se reclama en una pestaña se ve en el
// panel abierto en otra, en el mismo navegador. Claves separadas por modo.
const CLAVE = `brai-demo-reclamos-${MODO}`

type Reclamo = { iniciales: string; fecha: string; correo?: string }

function leerReclamos(): Record<string, Reclamo> {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) ?? '{}')
  } catch {
    return {}
  }
}

// Obras que el artista registra en el panel durante la demo (en este navegador).
const CLAVE_OBRAS = `brai-demo-obras-${MODO}`

export function obrasRegistradas(): Obra[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(CLAVE_OBRAS) ?? '[]')
  } catch {
    return []
  }
}

/** Todas las obras de la demo: las de ejemplo y las registradas en esta pestaña. */
export function todasLasObras(): Obra[] {
  return [...obrasRegistradas(), ...OBRAS].map((o) => getObra(o.codigo) ?? o)
}

const ALFABETO = '23456789ABCDEFGHJKMNPQRSTVWXYZ' // sin 0 O 1 I L U, igual que la base
function codigoNuevo(): string {
  const usados = new Set([...OBRAS, ...obrasRegistradas()].map((o) => o.codigo))
  let c = ''
  do {
    const b = crypto.getRandomValues(new Uint8Array(5))
    c = Array.from(b, (x) => ALFABETO[x % ALFABETO.length]).join('')
  } while (usados.has(c))
  return c
}

export type NuevaObra = { titulo: string; tecnica: string; medidas: string; anio: number; historia: string; imagen: string }

/** Registrar obra en la demo. En la real: insert en Supabase + fotos en Storage. */
export function registrarObra(n: NuevaObra): Obra {
  const lista = obrasRegistradas()
  const numero = OBRAS.length + lista.length + 1
  const hoy = new Date().toISOString().slice(0, 10)
  const obra: Obra = {
    codigo: codigoNuevo(),
    registro: `BRAI-${String(numero).padStart(4, '0')}`,
    titulo: n.titulo,
    tecnica: n.tecnica || 'Técnica por definir',
    medidas: n.medidas || 'Medidas por definir',
    anio: n.anio,
    imagen: n.imagen || OBRAS[0].imagen,
    huellas: [
      { x: 30, y: 30, nota: 'Detalle 1 que eligió el artista' },
      { x: 65, y: 55, nota: 'Detalle 2 que eligió el artista' },
      { x: 40, y: 85, nota: 'Detalle 3 que eligió el artista' },
    ],
    historia: n.historia ? [n.historia] : ['El artista todavía no escribe la historia de esta obra.'],
    video: { duracion: '0:00', disponible: false },
    eventos: [{ tipo: 'registro', fecha: hoy, texto: 'Registrada por el artista en su panel' }],
    dueno: null,
  }
  try {
    localStorage.setItem(CLAVE_OBRAS, JSON.stringify([obra, ...lista]))
  } catch {
    // Si la foto no cabe en el storage, se registra sin ella.
    obra.imagen = OBRAS[0].imagen
    try {
      localStorage.setItem(CLAVE_OBRAS, JSON.stringify([obra, ...lista]))
    } catch {
      /* sin storage: la obra vive solo en esta pantalla */
    }
  }
  return obra
}

// Dueños y toques de EJEMPLO para el panel. Nadie de aquí es real.
const DUENOS_EJEMPLO: Record<string, { nombre: string; correo: string; desde: string }> = {
  M3RT8: { nombre: 'Mariana Ruiz (ejemplo)', correo: 'mariana.ruiz@ejemplo.com', desde: '2026-10-24' },
}
const TOQUES_EJEMPLO: Record<string, number> = { '7KQ2X': 12, M3RT8: 37, P9WD4: 5, H2ZC6: 2 }

export type FilaPanel = { obra: Obra; dueno: { nombre: string; correo: string; desde: string } | null; toques: number }

/** Lo que ve el artista: cada obra con su dueño completo (en público solo iniciales). */
export function panel(): FilaPanel[] {
  const reclamos = typeof window === 'undefined' ? {} : leerReclamos()
  return todasLasObras().map((obra) => {
    const r = reclamos[obra.codigo]
    const dueno = r
      ? { nombre: r.iniciales, correo: r.correo ?? 'sin correo', desde: r.fecha }
      : DUENOS_EJEMPLO[obra.codigo] ?? null
    return { obra, dueno, toques: TOQUES_EJEMPLO[obra.codigo] ?? 0 }
  })
}

export function getObra(codigo: string): Obra | null {
  const base = [...OBRAS, ...obrasRegistradas()].find((o) => o.codigo === codigo.toUpperCase())
  if (!base) return null
  const reclamo = typeof window === 'undefined' ? undefined : leerReclamos()[base.codigo]
  if (!reclamo) return base
  return {
    ...base,
    dueno: reclamo.iniciales,
    eventos: [
      ...base.eventos,
      { tipo: 'reclamo', fecha: reclamo.fecha, texto: `Reclamada por su primer dueño, ${reclamo.iniciales}` },
    ],
  }
}

/** ¿Esta obra la reclamaste tú, en este navegador? */
export function esMia(codigo: string) {
  if (typeof window === 'undefined') return false
  return Boolean(leerReclamos()[codigo.toUpperCase()])
}

// Cadena de huellas (docs/TOKENIZAR.md): cada evento lleva la huella del anterior.
// En la demo es FNV-1a para mostrarlo; en Supabase es SHA-256 (app/supabase/schema.sql).
function fnv(texto: string) {
  let h = 0x811c9dc5
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

export function huellaRegistro(obra: Obra) {
  return obra.eventos.reduce((anterior, e) => fnv(`${anterior}|${obra.registro}|${e.tipo}|${e.fecha}|${e.texto}`), '00000000')
}

export function iniciales(correo: string) {
  const usuario = correo.split('@')[0].replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ._]/g, '')
  const partes = usuario.split(/[._]/).filter(Boolean)
  const letras = (partes.length > 1 ? [partes[0][0], partes[1][0]] : [usuario[0], usuario[1]]).filter(Boolean)
  return letras.map((l) => l.toUpperCase() + '.').join(' ')
}

export type ResultadoReclamo = { ok: true; iniciales: string } | { ok: false; error: string }

const intentos: Record<string, number> = {}

export function reclamar(codigoObra: string, codigoDueno: string, correo: string): ResultadoReclamo {
  const obra = getObra(codigoObra)
  if (!obra) return { ok: false, error: 'No encontramos esta obra.' }
  if (obra.dueno) return { ok: false, error: 'Esta obra ya tiene dueño. Si es tuya y la compraste de segunda mano, pídele al dueño anterior que te la transfiera.' }
  intentos[obra.codigo] = (intentos[obra.codigo] ?? 0) + 1
  if (intentos[obra.codigo] > 5) return { ok: false, error: 'Demasiados intentos. Espera una hora y vuelve a probar.' }
  const limpio = codigoDueno.toUpperCase().replace(/[^A-Z0-9]/g, '')
  if (limpio !== CODIGO_DEMO.replace('-', '')) return { ok: false, error: 'Ese código no coincide. Revisa la tarjeta: son 8 letras y números.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return { ok: false, error: 'Revisa tu correo, parece que le falta algo.' }
  const ini = iniciales(correo)
  try {
    const todos = leerReclamos()
    todos[obra.codigo] = { iniciales: ini, fecha: new Date().toISOString().slice(0, 10), correo }
    localStorage.setItem(CLAVE, JSON.stringify(todos))
  } catch {
    // Sin storage la demo sigue: solo no recuerda el reclamo al recargar.
  }
  return { ok: true, iniciales: ini }
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
export function fecha(iso: string) {
  const [a, m, d] = iso.split('-').map(Number)
  return `${d} ${MESES[m - 1]} ${a}`
}

/** Deja la demo como nueva: borra reclamos y obras registradas de este modo. */
export function reiniciarDemo() {
  try {
    localStorage.removeItem(CLAVE)
    localStorage.removeItem(CLAVE_OBRAS)
  } catch {
    /* sin storage no hay nada que borrar */
  }
}
