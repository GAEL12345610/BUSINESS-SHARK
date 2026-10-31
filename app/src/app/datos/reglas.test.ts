import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizarCodigo, formatearCodigoDueno, iniciales, codigoAleatorio, RE_CODIGO_OBRA, fechaCorta } from "./reglas.ts";

test("normaliza lo que escribe una persona", () => {
  assert.equal(normalizarCodigo(" hfkw 3p9q "), "HFKW3P9Q");
  assert.equal(normalizarCodigo("hfkw-3p9q"), "HFKW3P9Q");
  assert.equal(formatearCodigoDueno("hfkw3p9qZZ"), "HFKW-3P9Q");
  assert.equal(formatearCodigoDueno("hf"), "HF");
});

test("iniciales igual que en SQL", () => {
  assert.equal(iniciales("  María   Rodríguez "), "M. R.");
  assert.equal(iniciales("nuevo dueño"), "N. D.");
});

test("códigos aleatorios sin caracteres confusos", () => {
  for (let i = 0; i < 500; i++) assert.match(codigoAleatorio(5), RE_CODIGO_OBRA);
});

test("fecha corta en español", () => {
  assert.equal(fechaCorta("2026-10-31T12:00:00Z"), "31 oct 2026");
});
