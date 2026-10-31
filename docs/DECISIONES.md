# Decisiones de Brai

Una línea por decisión, con su porqué. Lo más reciente arriba. Si una decisión cambia, se tacha y se agrega la nueva con fecha: nunca se borra.

## 31 oct 2026 (sesión larga con Claude: backend, app, competencia, costos)

| # | Decisión | Por qué |
|---|---|---|
| 17 | **Precio en prueba: Oferta A (7,500 + 990 al mes) y Oferta B (2,500 de arranque con 5 obras + 450 por obra, sin mensualidad) se presentan las dos en cada entrevista.** Gana la que escojan 2 de 3 artistas. | La competencia con servicio cobra por obra (Tagsmart, 20 a 120 libras). 990 al mes es 2 a 6 veces lo que cuesta el software hazlo tú mismo. A gana más por cliente, B se vende más fácil. Ver `COSTOS.md` y `COMPETENCIA.md`. |
| 18 | ~~Decisión 8~~ **NTAG 424 DNA entra para la Expo**: comprar 20 a 50 piezas en cuanto se cotice el envío. El backend ya lo verifica. | Cuesta ~18.50 MXN la pieza, no 46 a 92 como creíamos. Por ~15 MXN más por obra podemos decir "este sello es el original". |
| 19 | **El derecho de reventa baja a beneficio secundario.** Nunca es argumento de venta principal. | Solo aplica en reventas por subasta, galería o comerciante, no entre particulares, y la sociedad de gestión se queda hasta 15%. En una obra de 12,000 son ~408 MXN. |
| 20 | **La app tiene modo ejemplo**: corre completa sin Supabase, con las mismas reglas. | La demo frente al jurado no puede depender del wifi del evento ni de que Supabase Free esté despierto. |
| 21 | **La landing es HTML crudo** (`app/index.html`), y la app React solo atiende `/o`, `/a` y `/panel`. | Google y los bots de IA no ejecutan JavaScript. Y la landing pesa 0.5 KB de JS. |
| 22 | **El NFC graba `brai.art/o/XXXXX?v=n` y el QR `?v=q`.** | Así sabemos cuántos toques vienen por NFC y cuántos por QR, sin romper la regla 4. |
| 23 | **Las cuentas de artista las crea el equipo en el setup.** Nadie se registra solo en el panel. | El setup es un servicio pagado; una cuenta suelta no tiene artista ligado y sería ruido. |
| 24 | **Tipografía v2.1:** tamaño óptico de Fraunces, peso 560, escala fluida, fuentes autohospedadas. **No se cambia de familia.** | Ver `brand/BRAND.md`, sección 6. |
| 25 | **La página de la obra enseña sus capas de confianza** (sello, fotos huella, dueño), cada una marcada como cumplida o pendiente. | Lo copiamos del "COA+" de Verisart: la confianza se explica, no se presume. |

## 10 oct 2026 (sesión de análisis con Claude, grill de 3 rondas)

| # | Decisión | Por qué |
|---|---|---|
| 1 | **Titular: autoridad para el artista + rastro de su obra.** "Autenticación" pasa a beneficio secundario. | Las falsificaciones persiguen nombres que valen millones, no a un artista local. El dolor real es no saber quién tiene su obra. |
| 2 | **Cliente ideal: mezcla de artista establecido y artista con audiencia.** Filtro común: vende obra original directo. | El artista promedio gana ~4,960 MXN al mes (DataMéxico). High ticket solo cuadra con el que ya vende. |
| 3 | **Precio: setup 7,500 MXN + 990 MXN al mes.** | Debajo de Verisart Pro (99.99 USD al mes) y con servicio personalizado. Una venta extra al año lo paga. Sin experiencia en el sector, es justo. |
| 4 | **José Luis Malo entra como cliente fundador**, no como "prueba gratis". | Gratis a secas atrae a quien no se compromete. Fundador = gratis a cambio de un caso documentado. Condiciones en `OFERTA.md`. |
| 5 | **El álbum Panini pasa a club de coleccionistas por artista.** Niveles por relación, no por cantidad de obras. | Con un solo artista, un álbum por cantidad tiene 1 estampa. Por relación sirve desde la primera obra. |
| 6 | **La seguridad vive en el registro, no en el chip.** NTAG213 + QR + sello antidesprendible + código bajo raspadita + fotos huella + historial de dueños. | El NTAG213 se clona con una app gratis. Detalle en `SEGURIDAD_OBRA.md`. |
| 7 | **Lo que prometemos: "Verificada por el artista" y "registro de propiedad y procedencia".** Nunca "imposible de falsificar". | Es lo que de verdad podemos sostener. |
| 8 | ~~**NTAG 424 DNA = versión 2.**~~ (cambiada por la 18) Para el 26 nov no se compra; para la Expo, ~5 piezas si el prototipo está listo en diciembre. | Requiere llaves de cifrado y verificación en servidor; la rúbrica no califica criptografía. |
| 9 | **Los 50 stickers NFC que ya compramos se usan** si son NTAG213, 215 o 216. | Revisar el tipo en NFC Tools. Bloquear es permanente: probar en 1 primero. |
| 10 | **Una plataforma, muchas caras (white label).** Cada artista con su logo, colores y dominio; el mismo código para todos. Web, no App Store. | 20 apps distintas no se mantienen entre 4 personas. Nadie descarga una app para ver un cuadro. |
| 11 | **Sello "Registro Brai" chico en cada página del artista**, como el "Secured by Stripe". | Si el artista se certifica en su propia app, se certifica a sí mismo. La autoridad viene de un registro externo. |
| 12 | **Los chips SIEMPRE apuntan a `brai.art/o/XXXX`**, nunca al dominio del artista. | El tag bloqueado es para siempre: si el dominio del artista caduca, mueren todos los chips de sus cuadros. |
| 13 | **Dominio del artista: subdominio por default** (`artista.brai.art`). Dominio propio como extra del setup, a nombre del artista. | El artista no depende de nosotros para su dominio. |
| 14 | **Marca v2:** isotipo enso, Schibsted Grotesk en vez de Inter, voz "Registro" en IBM Plex Mono, verde y Ghost corregidos a AA, tagline "Cada obra sabe de dónde viene". | Ver historial en `brand/BRAND.md`. |
| 15 | **Repo privado.** | Tiene nombres e Instagram de artistas prospecto y es el plan de un equipo de menores. Lo hace la cuenta dueña del repo. |
| 16 | **El código de la app vive en `C:\dev\brai\app`, fuera de OneDrive.** | pnpm usa symlinks y OneDrive los rompe. |
