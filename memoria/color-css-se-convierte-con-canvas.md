---
name: color-css-se-convierte-con-canvas
description: "Para medir contraste en el navegador, convierte el color con un canvas, nunca con una regex sobre getComputedStyle: Tailwind 4 devuelve color(srgb ...) y la regex da falsos"
---

El 5 nov 2026 un chequeo de contraste con Playwright leía `getComputedStyle(el).color` con una regex de números. Tailwind 4 escribe los colores con opacidad (`text-tinta/70`) como `color(srgb 0.17 0.15 0.13 / 0.7)`: la regex tomaba 0.17 como si fuera de 0 a 255. Resultado: reportó contraste bueno en páginas que tenían texto a 3.9:1, y malo en una sección que estaba bien.

- Convierte cualquier color CSS pintando un pixel: `ctx.fillStyle = color; ctx.fillRect(0,0,1,1); ctx.getImageData(0,0,1,1)`.
- Antes de fiarte del medidor, revisa un caso que sabes que está mal y uno que sabes que está bien (`memoria/verificar-el-artefacto.md`).
