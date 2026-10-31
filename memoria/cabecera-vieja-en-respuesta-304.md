---
name: cabecera-vieja-en-respuesta-304
description: "Cambiar una cabecera en vercel.json no basta si el HTML no cambió: el navegador revalida, recibe 304 sin la cabecera y sigue usando la vieja. Cada publicación debe cambiar el HTML"
---

**Qué pasó (31 oct 2026):** se cambió `X-Frame-Options` de `DENY` a `SAMEORIGIN` en `app/vercel.json`. En navegadores limpios funcionó, pero en el navegador del equipo el teléfono del hero siguió roto. La página de la obra no había cambiado, así que tenía la misma etiqueta (etag); el navegador preguntó "¿cambió?", Vercel respondió **304 sin la cabecera `X-Frame-Options`** y el navegador siguió usando la `DENY` que tenía guardada.

**Cómo aplicarlo:**
- `app/scripts/prerender.mjs` mete `<meta name="brai-version">` con el commit en cada publicación: el HTML siempre cambia y el navegador baja la página completa con las cabeceras nuevas.
- Para probarlo: `curl -sI -H 'If-None-Match: <etag>' URL` y ver si el 304 trae la cabecera.
- Si alguien sigue viendo algo viejo: recargar con Ctrl+Shift+R, o abrir en una ventana de incógnito.
- Probar siempre también con un navegador que ya haya visitado el sitio, no solo con uno limpio.
