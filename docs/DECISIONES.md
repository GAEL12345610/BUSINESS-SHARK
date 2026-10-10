# Decisiones de Brai

Una línea por decisión, con su porqué. Lo más reciente arriba. Si una decisión cambia, se tacha y se agrega la nueva con fecha: nunca se borra.

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
| 8 | **NTAG 424 DNA = versión 2.** Para el 26 nov no se compra; para la Expo, ~5 piezas si el prototipo está listo en diciembre. | Requiere llaves de cifrado y verificación en servidor; la rúbrica no califica criptografía. |
| 9 | **Los 50 stickers NFC que ya compramos se usan** si son NTAG213, 215 o 216. | Revisar el tipo en NFC Tools. Bloquear es permanente: probar en 1 primero. |
| 10 | **Una plataforma, muchas caras (white label).** Cada artista con su logo, colores y dominio; el mismo código para todos. Web, no App Store. | 20 apps distintas no se mantienen entre 4 personas. Nadie descarga una app para ver un cuadro. |
| 11 | **Sello "Registro Brai" chico en cada página del artista**, como el "Secured by Stripe". | Si el artista se certifica en su propia app, se certifica a sí mismo. La autoridad viene de un registro externo. |
| 12 | **Los chips SIEMPRE apuntan a `brai.art/o/XXXX`**, nunca al dominio del artista. | El tag bloqueado es para siempre: si el dominio del artista caduca, mueren todos los chips de sus cuadros. |
| 13 | **Dominio del artista: subdominio por default** (`artista.brai.art`). Dominio propio como extra del setup, a nombre del artista. | El artista no depende de nosotros para su dominio. |
| 14 | **Marca v2:** isotipo enso, Schibsted Grotesk en vez de Inter, voz "Registro" en IBM Plex Mono, verde y Ghost corregidos a AA, tagline "Cada obra sabe de dónde viene". | Ver historial en `brand/BRAND.md`. |
| 15 | **Repo privado.** | Tiene nombres e Instagram de artistas prospecto y es el plan de un equipo de menores. Lo hace la cuenta dueña del repo. |
| 16 | **El código de la app vive en `C:\dev\brai\app`, fuera de OneDrive.** | pnpm usa symlinks y OneDrive los rompe. |
