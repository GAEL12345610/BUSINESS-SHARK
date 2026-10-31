import type { Datos } from "./tipos.ts";
import { crearDatosEjemplo } from "./ejemplo.ts";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Sin llaves: modo ejemplo. Con llaves: Supabase real (cargado aparte para
// que el modo ejemplo no descargue supabase-js).
let promesa: Promise<Datos> | null = null;
export function obtenerDatos(): Promise<Datos> {
  if (!promesa) {
    promesa = url && anon
      ? import("./supabase.ts").then((m) => m.crearDatosSupabase(url, anon))
      : Promise.resolve(crearDatosEjemplo());
  }
  return promesa;
}

export * from "./tipos.ts";
export * from "./reglas.ts";
