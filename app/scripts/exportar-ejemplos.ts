// Exporta las pinturas de EJEMPLO a public/ejemplos/ para la landing.
// Uso: node scripts/exportar-ejemplos.ts
import { writeFileSync } from "node:fs";
import { pinturaEjemplo } from "../src/app/datos/pinturas.ts";

const desUri = (u: string) => decodeURIComponent(u.replace(/^data:image\/svg\+xml;charset=utf-8,/, ""));
const obras: Record<string, string> = {
  "Tarde en Tlaquepaque": "tarde-en-tlaquepaque",
  "Barro de Tonalá": "barro-de-tonala",
  "Lluvia sobre Chapultepec": "lluvia-sobre-chapultepec",
};
for (const [titulo, archivo] of Object.entries(obras)) {
  const p = pinturaEjemplo(titulo);
  writeFileSync(`public/ejemplos/${archivo}.svg`, desUri(p.foto));
  p.huellas.forEach((h, i) => writeFileSync(`public/ejemplos/${archivo}-huella-${i + 1}.svg`, desUri(h)));
}
console.log("listo");
