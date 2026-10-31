---
name: cabecera-que-rompe-tu-propio-iframe
description: "X-Frame-Options DENY bloquea también los iframes de tu propio sitio; si la app se muestra a sí misma en un iframe, usa SAMEORIGIN y revisa la página publicada en un celular"
---

**Qué pasó (31 oct 2026):** se agregó `X-Frame-Options: DENY` a `app/vercel.json` como cabecera de seguridad. La landing muestra la página real de una obra dentro de un teléfono dibujado (un iframe). En producción el teléfono salió con la carita triste del navegador: DENY prohíbe cualquier iframe, incluso del mismo sitio.

Las pruebas locales no lo vieron: el servidor de prueba no mandaba las cabeceras de `vercel.json`.

**Cómo aplicarlo:**
- Si la app se usa a sí misma en un iframe: `SAMEORIGIN`, no `DENY`.
- Las cabeceras solo se prueban en lo publicado: `curl -sI https://braiart.vercel.app/ | grep -i frame` y abrir la página en un celular.
- Un servidor de prueba local que no imita las cabeceras de Vercel no prueba nada sobre ellas (`verificar-el-artefacto.md`).
