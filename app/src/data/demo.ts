// DATOS DE EJEMPLO. José Luis Malo todavía no registra obras en Brai.
// Solo su nombre y el título "Los olvidados" salen del draft del equipo.
// Todo lo demás es ejemplo (docs/DECISIONES.md #24): se cambia aquí por sus
// datos reales después de la entrevista. NO publicar con su nombre hasta que
// firme el permiso de fundador (docs/OFERTA.md).
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
  anio: number
  imagen: string
  /** Fotos huella: acercamientos de la misma foto (x, y en % del cuadro) */
  huellas: { x: number; y: number; nota: string }[]
  historia: string[]
  video: { duracion: string; disponible: boolean }
  eventos: Evento[]
  /** Iniciales del dueño actual, null si nadie la ha reclamado */
  dueno: string | null
}

export type Artista = {
  slug: string
  nombre: string
  disciplina: string
  acento: string
  correo: string | null
  /** true mientras los datos no sean reales: la página muestra el aviso */
  ejemplo: boolean
}

// CANDADO (DECISIONES #24): con su nombre SOLO en tu compu, con
// VITE_DEMO_JOSE_LUIS=1 en app/.env.local. Lo publicado en Vercel usa una
// artista inventada y marcada como ejemplo hasta que él firme el permiso.
export const CON_NOMBRE_REAL = import.meta.env.VITE_DEMO_JOSE_LUIS === '1'

export const ARTISTA: Artista = CON_NOMBRE_REAL
  ? {
      slug: 'jose-luis-malo',
      nombre: 'José Luis Malo',
      disciplina: 'Pintura', // ejemplo, por confirmar
      acento: '#2F5D62', // ejemplo: el color lo elige él
      correo: null,
      ejemplo: true,
    }
  : {
      slug: 'ejemplo',
      nombre: 'Lucía Arce',
      disciplina: 'Pintura',
      acento: '#2F5D62',
      correo: null,
      ejemplo: true,
    }

// PERSONALIZACIÓN POR LINK (DECISIONES #38): /recorrido?para=Nombre pinta ese
// nombre en la demo SOLO en el navegador de quien abre el link. El nombre no se
// guarda en el código ni en el sitio publicado, y se borra al cerrar la pestaña.
// Para quitarlo: ?para= vacío.
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
export const NOMBRE_PARA = CON_NOMBRE_REAL ? null : leerPara()
if (NOMBRE_PARA) ARTISTA.nombre = NOMBRE_PARA

/** Código de dueño de la demo. En la real va cifrado en la base y bajo raspadita. */
export const CODIGO_DEMO = '4K7P-9QX2'

export const OBRAS: Obra[] = [
  {
    codigo: '7KQ2X',
    registro: 'BRAI-0001',
    titulo: CON_NOMBRE_REAL ? 'Los olvidados' : 'Figuras del barrio',
    tecnica: 'Óleo sobre tela',
    medidas: '60 × 80 cm',
    anio: 2026,
    imagen: '/obras/los-olvidados.svg',
    huellas: [
      { x: 12, y: 40, nota: 'La primera figura, con el empaste más grueso' },
      { x: 55, y: 30, nota: 'Veladura sobre la figura del centro' },
      { x: 50, y: 92, nota: 'Trazo oscuro de la base, de un solo gesto' },
    ],
    historia: CON_NOMBRE_REAL ? ['Texto de ejemplo. Aquí José Luis cuenta, con sus palabras, cómo nació la obra. Se llena después de la entrevista.'] : [
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

// Con un nombre real en pantalla (?para=) no se le atribuye una cita inventada
// (regla 3 de CLAUDE.md): la historia pasa a texto de ejemplo neutro.
if (NOMBRE_PARA) {
  OBRAS[0].historia = ['Texto de ejemplo. Aquí cuentas, con tus palabras, cómo nació la obra. Lo escribimos contigo en la sesión de registro.']
}

// Reclamos hechos en esta sesión de la demo. En la versión real esto lo hace
// UNA función en Supabase (revisa el código cifrado, cuenta intentos, crea el evento).
const CLAVE = 'brai-demo-reclamos'

type Reclamo = { iniciales: string; fecha: string; correo?: string }

function leerReclamos(): Record<string, Reclamo> {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE) ?? '{}')
  } catch {
    return {}
  }
}

// Obras que el artista registra en el panel durante la demo (solo esta pestaña).
const CLAVE_OBRAS = 'brai-demo-obras'

export function obrasRegistradas(): Obra[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_OBRAS) ?? '[]')
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
    sessionStorage.setItem(CLAVE_OBRAS, JSON.stringify([obra, ...lista]))
  } catch {
    // Si la foto no cabe en el storage, se registra sin ella.
    obra.imagen = OBRAS[0].imagen
    try {
      sessionStorage.setItem(CLAVE_OBRAS, JSON.stringify([obra, ...lista]))
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
    sessionStorage.setItem(CLAVE, JSON.stringify(todos))
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
