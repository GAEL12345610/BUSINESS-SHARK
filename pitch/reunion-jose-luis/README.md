# Paquete para la reunión exploratoria con José Luis Malo

**Estado (5 nov 2026):** José Luis está **por contactar**. No hay reunión, fecha, permiso ni interés confirmado. Todo esto es preparación.

**Ojo, antes de usarlo:** el paquete describe la demo de la rama `claude/demo-honesta-jose-luis` (aviso de DEMO, `/demo`, "Simular reclamo", correos `@example.com`). Mientras esa rama no se una a `main` y Vercel no la publique, `braiart.vercel.app` sigue mostrando la versión anterior, con los textos viejos. Para probarla antes: `cd app && pnpm build && pnpm preview`.

| Archivo | Para qué | Formato |
|---|---|---|
| `../../docs/REUNION_JOSE_LUIS.md` | **Guion de 25 minutos**, agenda, qué anotar, qué hacer después | Markdown (dueño único del guion) |
| `checklist-demo.md` | Qué revisar antes, qué tocar en la demo y qué decir, qué hacer si algo falla | Markdown |
| `objeciones.md` | Objeciones probables con respuestas honestas, y lo que nunca se dice | Markdown |
| `onboarding.md` | Pasos propuestos para artista y comprador, con lo que existe hoy y lo que no | Markdown |
| `plan-piloto.md` | Borrador de piloto con huecos y los bloqueos antes de usar una obra real | Markdown |
| `one-pager.html` y `one-pager.pdf` | Hoja de una página para dejar impresa. Genérica, sin su nombre | HTML y PDF carta |
| `deck.html` y `deck.pdf` | 9 slides de respaldo si falla el internet. Genérico, sin su nombre | HTML 1920 × 1080 y PDF |
| `../../docs/ENTREVISTAS.md` | Preguntas: bloque A abiertas (antes de la demo), bloque B después | Markdown |
| `img/` | Capturas de la demo genérica para el deck | PNG |
| `fuentes/` | Fraunces, Schibsted Grotesk e IBM Plex Mono autohospedadas | woff2 |

**Lo que NO hay en el paquete, a propósito:** fotos de su obra, citas suyas, testimonios, métricas de clientes o ventas, un contrato o un formulario de alta. Nada de eso existe todavía y no se inventa.

## Volver a generar los PDF y las capturas
```
cd app
pnpm build
pnpm preview
```
En otra terminal, desde la raíz:
```
node pitch/reunion-jose-luis/exportar.cjs http://localhost:4173
```
Necesita Playwright con Chromium.
