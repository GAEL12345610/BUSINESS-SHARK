// Verificación SUN (Secure Unique NFC) de un NTAG 424 DNA.
// Cada vez que alguien toca el sello, el chip arma una URL nueva con:
//   e = datos cifrados (UID del chip + contador de toques)
//   c = firma corta (CMAC) que solo puede calcular quien tiene la llave
// Copiar el chip no sirve: sin la llave no se puede firmar el siguiente toque.
// Referencia: NXP AN12196, "NTAG 424 DNA features and hints".
//
// Usa node:crypto, que existe en Node (pruebas) y en Deno (Supabase Edge).
import { createCipheriv, createDecipheriv } from "node:crypto";

const CERO16 = new Uint8Array(16);

function hexABytes(hex: string): Uint8Array {
  if (!/^([0-9a-fA-F]{2})+$/.test(hex)) throw new Error("hex inválido");
  return Uint8Array.from(hex.match(/../g)!.map((b) => parseInt(b, 16)));
}

function bytesAHex(b: Uint8Array): string {
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function aesEcb(llave: Uint8Array, bloque: Uint8Array): Uint8Array {
  const c = createCipheriv("aes-128-ecb", llave, null);
  c.setAutoPadding(false);
  return new Uint8Array(Buffer.concat([c.update(bloque), c.final()]));
}

function aesCbcDescifrar(llave: Uint8Array, datos: Uint8Array): Uint8Array {
  const d = createDecipheriv("aes-128-cbc", llave, CERO16);
  d.setAutoPadding(false);
  return new Uint8Array(Buffer.concat([d.update(datos), d.final()]));
}

function desplazarIzq(b: Uint8Array): Uint8Array {
  const out = new Uint8Array(16);
  for (let i = 0; i < 16; i++) out[i] = ((b[i] << 1) | (i < 15 ? b[i + 1] >> 7 : 0)) & 0xff;
  if (b[0] & 0x80) out[15] ^= 0x87;
  return out;
}

/** AES-CMAC (RFC 4493). */
export function cmac(llave: Uint8Array, msg: Uint8Array): Uint8Array {
  const k1 = desplazarIzq(aesEcb(llave, CERO16));
  const k2 = desplazarIzq(k1);
  const n = Math.max(1, Math.ceil(msg.length / 16));
  const completo = msg.length > 0 && msg.length % 16 === 0;
  const ultimo = new Uint8Array(16);
  ultimo.set(msg.subarray((n - 1) * 16));
  if (completo) {
    for (let i = 0; i < 16; i++) ultimo[i] ^= k1[i];
  } else {
    ultimo[msg.length - (n - 1) * 16] = 0x80;
    for (let i = 0; i < 16; i++) ultimo[i] ^= k2[i];
  }
  let x: Uint8Array = new Uint8Array(16);
  for (let b = 0; b < n - 1; b++) {
    const y = new Uint8Array(16);
    for (let i = 0; i < 16; i++) y[i] = x[i] ^ msg[b * 16 + i];
    x = aesEcb(llave, y);
  }
  const y = new Uint8Array(16);
  for (let i = 0; i < 16; i++) y[i] = x[i] ^ ultimo[i];
  return aesEcb(llave, y);
}

/** Llave por chip: así, si una llave se filtra, solo cae un sello. */
export function llavePorChip(maestra: Uint8Array, uid: Uint8Array): Uint8Array {
  const msg = new Uint8Array(1 + uid.length + 4);
  msg[0] = 0x01;
  msg.set(uid, 1);
  msg.set([0x42, 0x52, 0x41, 0x49], 1 + uid.length); // "BRAI"
  return cmac(maestra, msg);
}

export type ResultadoSun =
  | { ok: true; uid: string; contador: number }
  | { ok: false; motivo: "formato" | "firma" };

/**
 * @param e   picc_data cifrado (32 hex)
 * @param c   CMAC truncado (16 hex)
 * @param llaveMeta   K_SDMMetaRead (descifra UID y contador)
 * @param llaveArchivo  K_SDMFileRead del chip, o una función que la calcula con el UID
 */
export function verificarSun(
  e: string,
  c: string,
  llaveMeta: Uint8Array,
  llaveArchivo: Uint8Array | ((uid: Uint8Array) => Uint8Array),
): ResultadoSun {
  if (!/^[0-9a-fA-F]{32}$/.test(e) || !/^[0-9a-fA-F]{16}$/.test(c)) return { ok: false, motivo: "formato" };

  const plano = aesCbcDescifrar(llaveMeta, hexABytes(e));
  const etiqueta = plano[0];
  const traeUid = (etiqueta & 0x80) !== 0;
  const traeContador = (etiqueta & 0x40) !== 0;
  const largoUid = etiqueta & 0x0f;
  if (!traeUid || !traeContador || largoUid !== 7) return { ok: false, motivo: "formato" };

  const uid = plano.subarray(1, 8);
  const ctrBytes = plano.subarray(8, 11); // little endian
  const contador = ctrBytes[0] | (ctrBytes[1] << 8) | (ctrBytes[2] << 16);

  const kArchivo = typeof llaveArchivo === "function" ? llaveArchivo(uid) : llaveArchivo;

  // Vector de sesión SV2 = 3CC3 0001 0080 || UID || contador
  const sv2 = new Uint8Array(16);
  sv2.set([0x3c, 0xc3, 0x00, 0x01, 0x00, 0x80]);
  sv2.set(uid, 6);
  sv2.set(ctrBytes, 13);
  const llaveSesion = cmac(kArchivo, sv2);
  const completo = cmac(llaveSesion, new Uint8Array(0));
  const truncado = new Uint8Array(8);
  for (let i = 0; i < 8; i++) truncado[i] = completo[i * 2 + 1];

  const esperado = hexABytes(c);
  let dif = 0;
  for (let i = 0; i < 8; i++) dif |= truncado[i] ^ esperado[i];
  if (dif !== 0) return { ok: false, motivo: "firma" };

  return { ok: true, uid: bytesAHex(uid), contador };
}

export { hexABytes, bytesAHex };
