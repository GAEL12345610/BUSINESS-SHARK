// Reglas compartidas, iguales a las de la base de datos (migración 0200).
// Si cambias algo aquí, cámbialo también en el SQL.

export const ALFABETO = "23456789ABCDEFGHJKMNPQRSTVWXYZ"; // sin 0 O 1 I L U
export const RE_CODIGO_OBRA = /^[2-9A-HJKMNP-TV-Z]{5}$/;
export const RE_CORREO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function normalizarCodigo(entrada: string): string {
  return (entrada ?? "").replace(/[^0-9A-Za-z]/g, "").toUpperCase();
}

export function formatearCodigoDueno(entrada: string): string {
  const n = normalizarCodigo(entrada).slice(0, 8);
  return n.length > 4 ? `${n.slice(0, 4)}-${n.slice(4)}` : n;
}

export function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + ".")
    .join(" ");
}

export function codigoAleatorio(largo: number): string {
  const bytes = new Uint8Array(largo);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]).join("");
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
export function fechaCorta(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}
