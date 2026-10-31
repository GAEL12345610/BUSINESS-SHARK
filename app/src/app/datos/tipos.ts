// Contrato entre las pantallas y el backend. Las dos implementaciones
// (Supabase y modo ejemplo) devuelven exactamente esto.

export type TipoEvento = "registro" | "reclamo" | "transferencia" | "nota";
export type TipoSello = "ntag213" | "ntag424" | "solo_qr";
export type Via = "nfc" | "qr" | "link";

export interface Tema {
  acento?: string;
  logo?: string;
}

export interface EventoPublico {
  tipo: TipoEvento;
  fecha: string;
  nota: string | null;
  dueno: string | null; // iniciales, nunca el nombre completo
}

export interface ArtistaResumen {
  slug: string;
  nombre: string;
  ciudad: string | null;
  instagram: string | null;
  tema: Tema;
  es_demo: boolean;
}

export interface ObraPublica {
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
  artista: ArtistaResumen;
  eventos: EventoPublico[];
  reclamada: boolean;
  codigo_vivo: boolean;
  escaneos: number;
}

export interface ObraEnLista {
  registro: string;
  codigo: string;
  titulo: string;
  tecnica: string | null;
  anio: number | null;
  foto: string | null;
  reclamada: boolean;
}

export interface ArtistaPublico extends ArtistaResumen {
  bio: string | null;
  obras: ObraEnLista[];
}

export type ErrorReclamo =
  | "correo_invalido"
  | "nombre_invalido"
  | "obra_no_encontrada"
  | "demasiados_intentos"
  | "sin_codigo_vivo"
  | "codigo_incorrecto"
  | "red";

export type ResultadoReclamo =
  | { ok: true; tipo: "reclamo" | "transferencia"; registro: string; dueno: string }
  | { ok: false; error: ErrorReclamo; intentos_restantes?: number };

export type EstadoSello =
  | "original"
  | "enlace_repetido"
  | "no_valido"
  | "chip_desconocido"
  | "chip_de_otra_obra"
  | "obra_no_encontrada"
  | "sin_verificar";

export interface ObraPanel {
  id: string;
  registro: string;
  codigo: string;
  titulo: string;
  tecnica: string | null;
  medidas: string | null;
  anio: number | null;
  foto: string | null;
  sello: TipoSello;
  publicada: boolean;
  registrada_en: string;
  codigo_vivo: boolean;
  escaneos: number;
  dueno: { nombre: string; email: string; desde: string } | null;
}

export interface ArtistaPanel {
  id: string;
  slug: string;
  nombre: string;
  es_demo: boolean;
}

export interface NuevaObra {
  titulo: string;
  tecnica: string;
  medidas: string;
  anio: number | null;
  historia: string;
  sello: TipoSello;
  fotos: File[];
  fotos_huella: File[];
}

export interface Datos {
  modo: "supabase" | "ejemplo";
  obraPublica(codigo: string): Promise<ObraPublica | null>;
  artistaPublico(slug: string): Promise<ArtistaPublico | null>;
  registrarEscaneo(codigo: string, via: Via): Promise<void>;
  reclamar(codigo: string, codigoDueno: string, email: string, nombre: string): Promise<ResultadoReclamo>;
  verificarSello(codigo: string, e: string, c: string): Promise<EstadoSello>;
  urlFoto(ruta: string): string;

  // Panel
  sesion(): Promise<{ email: string } | null>;
  entrar(email: string): Promise<{ ok: boolean; mensaje: string }>;
  salir(): Promise<void>;
  miArtista(): Promise<ArtistaPanel | null>;
  panelObras(): Promise<ObraPanel[]>;
  registrarObra(artistaId: string, obra: NuevaObra): Promise<{ id: string; codigo: string }>;
  generarCodigoDueno(obraId: string): Promise<string>;
  agregarNota(obraId: string, nota: string): Promise<void>;
}
