// Calcula la llave SDMFileRead de un chip a partir de la llave maestra y su UID.
// Uso (en tu compu, nunca en un chat): node llave-chip.ts <MAESTRA 32 hex> <UID 14 hex>
import { llavePorChip, hexABytes, bytesAHex } from "../supabase/functions/sello/sun.ts";

const [maestra, uid] = process.argv.slice(2);
if (!/^[0-9a-fA-F]{32}$/.test(maestra ?? "") || !/^[0-9a-fA-F]{14}$/.test(uid ?? "")) {
  console.error("Uso: node llave-chip.ts <MAESTRA 32 hex> <UID 14 hex>");
  process.exit(1);
}
console.log(bytesAHex(llavePorChip(hexABytes(maestra), hexABytes(uid))));
