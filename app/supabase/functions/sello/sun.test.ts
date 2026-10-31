// node --test app/supabase/functions/sello/sun.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { cmac, verificarSun, hexABytes, bytesAHex, llavePorChip } from "./sun.ts";

test("CMAC con el vector oficial del RFC 4493", () => {
  const k = hexABytes("2b7e151628aed2a6abf7158809cf4f3c");
  assert.equal(bytesAHex(cmac(k, new Uint8Array(0))), "BB1D6929E95937287FA37D129B756746");
  assert.equal(
    bytesAHex(cmac(k, hexABytes("6bc1bee22e409f96e93d7e117393172a"))),
    "070A16B46B4D4144F79BDD9DD04A287C",
  );
  assert.equal(
    bytesAHex(cmac(k, hexABytes("6bc1bee22e409f96e93d7e117393172aae2d8a571e03ac9c9eb76fac45af8e5130c81c46a35ce411"))),
    "DFA66747DE9AE63030CA32611497C827",
  );
});

test("SUN con el ejemplo de NXP AN12196 (llaves en cero)", () => {
  const cero = new Uint8Array(16);
  const r = verificarSun("EF963FF7828658A599F3041510671E88", "94EED9EE65337086", cero, cero);
  assert.deepEqual(r, { ok: true, uid: "04DE5F1EACC040", contador: 61 });
});

test("SUN rechaza una firma alterada", () => {
  const cero = new Uint8Array(16);
  const r = verificarSun("EF963FF7828658A599F3041510671E88", "94EED9EE65337087", cero, cero);
  assert.deepEqual(r, { ok: false, motivo: "firma" });
});

test("SUN rechaza basura", () => {
  const cero = new Uint8Array(16);
  assert.deepEqual(verificarSun("hola", "x", cero, cero), { ok: false, motivo: "formato" });
});

test("llave por chip es distinta por UID y estable", () => {
  const m = hexABytes("000102030405060708090A0B0C0D0E0F");
  const a = llavePorChip(m, hexABytes("04DE5F1EACC040"));
  const b = llavePorChip(m, hexABytes("04DE5F1EACC041"));
  assert.notEqual(bytesAHex(a), bytesAHex(b));
  assert.equal(bytesAHex(a), bytesAHex(llavePorChip(m, hexABytes("04DE5F1EACC040"))));
});
