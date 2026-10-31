// MODO EJEMPLO: la app completa sin Supabase. Sirve para la demo frente al
// jurado si no hay internet estable, y para desarrollar sin llaves.
// Mismas reglas que el SQL: código de un solo uso, 5 intentos por hora,
// dueño solo con iniciales en lo público.
// Todo lo de aquí es de EJEMPLO (es_demo = true). Ningún dato es real.

import type {
  ArtistaPublico, Datos, EstadoSello, EventoPublico, NuevaObra, ObraPanel, ObraPublica, ResultadoReclamo, TipoSello,
} from "./tipos.ts";
import { codigoAleatorio, iniciales, normalizarCodigo, RE_CORREO } from "./reglas.ts";
import { pinturaEjemplo } from "./pinturas.ts";

interface ObraInterna {
  id: string;
  registro: string;
  codigo: string;
  titulo: string;
  tecnica: string | null;
  medidas: string | null;
  anio: number | null;
  historia: string | null;
  fotos: string[];
  fotos_huella: string[];
  sello: TipoSello;
  registrada_en: string;
  codigoVivo: string | null; // en SQL es un hash; aquí da igual, es de ejemplo
  eventos: { tipo: EventoPublico["tipo"]; fecha: string; nota: string | null; dueno: { nombre: string; email: string } | null }[];
  escaneos: number;
  fallidos: number[];
}

interface Estado {
  version: 2;
  siguienteRegistro: number;
  obras: ObraInterna[];
  sesion: boolean;
  contadorSello: number;
}

const CLAVE = "brai-ejemplo-v2";

// Códigos de dueño de EJEMPLO (también en docs/PROTOTIPO.md). Nunca en obras reales.
export const CODIGOS_EJEMPLO = { "7KQ2X": "HFKW-3P9Q", M4RTZ: "TQ7N-K2DV" } as const;
// Vector público de NXP (AN12196). En modo ejemplo simula un toque al 424 DNA.
export const TOQUE_424_EJEMPLO = { e: "EF963FF7828658A599F3041510671E88", c: "94EED9EE65337086" } as const;

const dias = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

function inicial(): Estado {
  const obra = (
    id: string, registro: string, codigo: string, titulo: string, tecnica: string, medidas: string,
    historia: string, sello: TipoSello, hace: number, vivo: string | null,
  ): ObraInterna => {
    const p = pinturaEjemplo(titulo);
    return {
      id, registro, codigo, titulo, tecnica, medidas, anio: 2026, historia,
      fotos: [p.foto], fotos_huella: p.huellas, sello, registrada_en: dias(hace),
      codigoVivo: vivo ? normalizarCodigo(vivo) : null,
      eventos: [{ tipo: "registro", fecha: dias(hace), nota: null, dueno: null }],
      escaneos: 0, fallidos: [],
    };
  };

  const lluvia = obra(
    "e3", "BRAI-0003", "R9WCH", "Lluvia sobre Chapultepec", "Óleo sobre tela", "70 × 50 cm",
    "Obra de ejemplo. La avenida vista desde un café, el día que se fue la luz en toda la colonia.",
    "ntag213", 120, null,
  );
  lluvia.eventos.push(
    { tipo: "reclamo", fecha: dias(112), nota: null, dueno: { nombre: "Andrea Gómez", email: "andrea@ejemplo.test" } },
    { tipo: "nota", fecha: dias(60), nota: "Prestada para una muestra colectiva de ejemplo.", dueno: null },
    { tipo: "transferencia", fecha: dias(9), nota: null, dueno: { nombre: "Raúl Medina", email: "raul@ejemplo.test" } },
  );
  lluvia.escaneos = 37;

  const tarde = obra(
    "e1", "BRAI-0001", "7KQ2X", "Tarde en Tlaquepaque", "Óleo sobre tela", "60 × 80 cm",
    "Obra de ejemplo. Pintada en tres sesiones durante la temporada de lluvias, con la luz de las cinco de la tarde.",
    "ntag213", 14, CODIGOS_EJEMPLO["7KQ2X"],
  );
  tarde.escaneos = 4;

  const barro = obra(
    "e2", "BRAI-0002", "M4RTZ", "Barro de Tonalá", "Óleo y espátula sobre tela", "50 × 50 cm",
    "Obra de ejemplo. Hecha con espátula y pigmento de tierra de Tonalá. Lleva el sello que no se puede copiar.",
    "ntag424", 6, CODIGOS_EJEMPLO.M4RTZ,
  );

  return { version: 2, siguienteRegistro: 4, obras: [tarde, barro, lluvia], sesion: false, contadorSello: 60 };
}

const ARTISTA = {
  id: "00000000-0000-4000-8000-000000000001",
  slug: "ejemplo",
  nombre: "Lucía Arce",
  ciudad: "Guadalajara, Jalisco",
  instagram: null,
  tema: { acento: "#A2563D" },
  es_demo: true,
  bio: "Artista de ejemplo para probar Brai. Pinta al óleo escenas de Tlaquepaque, Tonalá y Guadalajara. Nada de esta página es real.",
};

function cargar(): Estado {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo) {
      const e = JSON.parse(crudo) as Estado;
      if (e.version === 2) {
        // Las imágenes no se guardan (pesan): se regeneran.
        for (const o of e.obras) {
          if (o.id.startsWith("e")) {
            const p = pinturaEjemplo(o.titulo);
            o.fotos = [p.foto];
            o.fotos_huella = p.huellas;
          }
        }
        return e;
      }
    }
  } catch {
    /* modo privado o storage bloqueado: seguimos en memoria */
  }
  return inicial();
}

let estado = cargar();

function guardar() {
  try {
    const ligero = {
      ...estado,
      obras: estado.obras.map((o) => (o.id.startsWith("e") ? { ...o, fotos: [], fotos_huella: [] } : o)),
    };
    localStorage.setItem(CLAVE, JSON.stringify(ligero));
  } catch {
    /* sin storage no pasa nada: la demo vive en memoria */
  }
}

export function reiniciarEjemplo() {
  estado = inicial();
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    /* nada */
  }
}

const esperar = (ms = 220) => new Promise((r) => setTimeout(r, ms));
const buscar = (codigo: string) => estado.obras.find((o) => o.codigo === normalizarCodigo(codigo));
const reclamada = (o: ObraInterna) => o.eventos.some((e) => e.tipo === "reclamo" || e.tipo === "transferencia");

function aPublica(o: ObraInterna): ObraPublica {
  return {
    registro: o.registro, codigo: o.codigo, titulo: o.titulo, tecnica: o.tecnica, medidas: o.medidas,
    anio: o.anio, historia: o.historia, fotos: o.fotos, fotos_huella: o.fotos_huella, sello: o.sello,
    registrada_en: o.registrada_en,
    artista: { slug: ARTISTA.slug, nombre: ARTISTA.nombre, ciudad: ARTISTA.ciudad, instagram: ARTISTA.instagram, tema: ARTISTA.tema, es_demo: true },
    eventos: o.eventos.map((e) => ({ tipo: e.tipo, fecha: e.fecha, nota: e.nota, dueno: e.dueno ? iniciales(e.dueno.nombre) : null })),
    reclamada: reclamada(o),
    codigo_vivo: o.codigoVivo !== null,
    escaneos: o.escaneos,
  };
}

export function crearDatosEjemplo(): Datos {
  return {
    modo: "ejemplo",

    async obraPublica(codigo) {
      await esperar();
      const o = buscar(codigo);
      return o ? aPublica(o) : null;
    },

    async artistaPublico(slug): Promise<ArtistaPublico | null> {
      await esperar();
      if (slug.toLowerCase() !== ARTISTA.slug) return null;
      return {
        ...ARTISTA,
        obras: [...estado.obras]
          .sort((a, b) => b.registrada_en.localeCompare(a.registrada_en))
          .map((o) => ({ registro: o.registro, codigo: o.codigo, titulo: o.titulo, tecnica: o.tecnica, anio: o.anio, foto: o.fotos[0] ?? null, reclamada: reclamada(o) })),
      };
    },

    async registrarEscaneo(codigo) {
      const o = buscar(codigo);
      if (o) {
        o.escaneos++;
        guardar();
      }
    },

    async reclamar(codigo, codigoDueno, email, nombre): Promise<ResultadoReclamo> {
      await esperar(500);
      const correo = email.trim().toLowerCase();
      const nom = nombre.trim().replace(/\s+/g, " ");
      if (!RE_CORREO.test(correo)) return { ok: false, error: "correo_invalido" };
      if (nom.length < 2 || nom.length > 80) return { ok: false, error: "nombre_invalido" };
      const o = buscar(codigo);
      if (!o) return { ok: false, error: "obra_no_encontrada" };
      const hace1h = Date.now() - 3600000;
      o.fallidos = o.fallidos.filter((t) => t > hace1h);
      if (o.fallidos.length >= 5) return { ok: false, error: "demasiados_intentos" };
      if (!o.codigoVivo) return { ok: false, error: "sin_codigo_vivo" };
      if (normalizarCodigo(codigoDueno) !== o.codigoVivo) {
        o.fallidos.push(Date.now());
        guardar();
        return { ok: false, error: "codigo_incorrecto", intentos_restantes: Math.max(0, 5 - o.fallidos.length) };
      }
      const tipo = reclamada(o) ? "transferencia" : "reclamo";
      o.codigoVivo = null;
      o.eventos.push({ tipo, fecha: new Date().toISOString(), nota: null, dueno: { nombre: nom, email: correo } });
      guardar();
      return { ok: true, tipo, registro: o.registro, dueno: iniciales(nom) };
    },

    async verificarSello(codigo, e, c): Promise<EstadoSello> {
      await esperar(350);
      const o = buscar(codigo);
      if (!o) return "obra_no_encontrada";
      if (o.sello !== "ntag424") return "chip_desconocido";
      if (e.toUpperCase() !== TOQUE_424_EJEMPLO.e || c.toUpperCase() !== TOQUE_424_EJEMPLO.c) return "no_valido";
      // El vector trae el contador 61. La primera vez es original; si se reusa el enlace, repetido.
      if (estado.contadorSello >= 61) return "enlace_repetido";
      estado.contadorSello = 61;
      o.escaneos++;
      guardar();
      return "original";
    },

    urlFoto: (ruta) => ruta,

    async sesion() {
      return estado.sesion ? { email: "ejemplo@brai.art" } : null;
    },

    async entrar() {
      await esperar(300);
      estado.sesion = true;
      guardar();
      return { ok: true, mensaje: "Entraste al panel de ejemplo." };
    },

    async salir() {
      estado.sesion = false;
      guardar();
    },

    async miArtista() {
      return estado.sesion ? { id: ARTISTA.id, slug: ARTISTA.slug, nombre: ARTISTA.nombre, es_demo: true } : null;
    },

    async panelObras(): Promise<ObraPanel[]> {
      await esperar();
      return [...estado.obras]
        .sort((a, b) => b.registrada_en.localeCompare(a.registrada_en))
        .map((o) => {
          const ultimo = [...o.eventos].reverse().find((e) => e.tipo === "reclamo" || e.tipo === "transferencia");
          return {
            id: o.id, registro: o.registro, codigo: o.codigo, titulo: o.titulo, tecnica: o.tecnica, medidas: o.medidas,
            anio: o.anio, foto: o.fotos[0] ?? null, sello: o.sello, publicada: true, registrada_en: o.registrada_en,
            codigo_vivo: o.codigoVivo !== null, escaneos: o.escaneos,
            dueno: ultimo?.dueno ? { nombre: ultimo.dueno.nombre, email: ultimo.dueno.email, desde: ultimo.fecha } : null,
          };
        });
    },

    async registrarObra(_artistaId: string, n: NuevaObra) {
      await esperar(600);
      let codigo = codigoAleatorio(5);
      while (buscar(codigo)) codigo = codigoAleatorio(5);
      const id = `n${Date.now()}`;
      const ahora = new Date().toISOString();
      estado.obras.push({
        id, codigo, registro: `BRAI-${String(estado.siguienteRegistro++).padStart(4, "0")}`,
        titulo: n.titulo, tecnica: n.tecnica || null, medidas: n.medidas || null, anio: n.anio,
        historia: n.historia || null,
        // En modo ejemplo las fotos viven solo mientras la pestaña está abierta.
        fotos: n.fotos.map((f) => URL.createObjectURL(f)),
        fotos_huella: n.fotos_huella.map((f) => URL.createObjectURL(f)),
        sello: n.sello, registrada_en: ahora, codigoVivo: null,
        eventos: [{ tipo: "registro", fecha: ahora, nota: null, dueno: null }], escaneos: 0, fallidos: [],
      });
      guardar();
      return { id, codigo };
    },

    async generarCodigoDueno(obraId) {
      const o = estado.obras.find((x) => x.id === obraId);
      if (!o) throw new Error("no es tu obra");
      const c = codigoAleatorio(8);
      o.codigoVivo = c;
      guardar();
      return `${c.slice(0, 4)}-${c.slice(4)}`;
    },

    async agregarNota(obraId, nota) {
      const o = estado.obras.find((x) => x.id === obraId);
      if (!o) throw new Error("no es tu obra");
      const t = nota.trim();
      if (t.length < 3 || t.length > 280) throw new Error("La nota debe tener de 3 a 280 caracteres.");
      o.eventos.push({ tipo: "nota", fecha: new Date().toISOString(), nota: t, dueno: null });
      guardar();
    },
  };
}
