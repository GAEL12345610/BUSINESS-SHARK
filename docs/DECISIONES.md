# Decisiones de Brai

Una línea por decisión, con su porqué. Lo más reciente arriba. Si una decisión cambia, se tacha y se agrega la nueva con fecha: nunca se borra.

## 31 oct 2026 (diseño de la web y la app, sobre los drafts del equipo)

| # | Decisión | Por qué |
|---|---|---|
| 17 | **Headline de la landing: "Vendiste tu obra. ¿Sabes dónde está hoy?"** El tagline "Cada obra sabe de dónde viene" cierra la página. Sale "Conectando artistas con sus compradores". | Nombra el dolor real (#1). "Conectando" suena a marketplace y Brai no vende obra. |
| 18 | **El botón de la página de la obra es "Reclamar mi obra"**, no "Inicia sesión". El artista entra por un link chico abajo. | El comprador nunca crea cuenta: raspa y escribe código y correo (`SEGURIDAD_OBRA.md`, paso 4). |
| 19 | **Header de la obra: foto a sangre con marco del color del artista** (ejemplo 2 del draft) y sello dorado "Registrada por el artista". | La obra manda y el color hace el white label (#10). "Verificado por Brai" promete algo que Brai no hace. |
| 20 | **La landing es para jurado y artistas.** Botón 1 "Ver una obra registrada" (demo real), botón 2 "Quiero registrar mis obras" (correo del equipo, revisado por un adulto). | El jurado ve la demo con un toque; el artista tiene por dónde escribir. |
| 21 | **La página de la obra lleva lo que el draft no tenía:** ficha en monoespaciada, fotos huella, línea de tiempo de dueños con iniciales y sello "Registro Brai". El video del artista va después de la cédula, sin autoplay. | Sin esas capas es un portafolio, no un registro. El video pesa: con datos en la Expo, primero carga lo que prueba. |
| 22 | **Teléfono 3D y tarjetas 3D con CSS, sin librería de 3D.** El teléfono muestra la página real de la obra. | Mismo efecto para el jurado, sin cientos de KB en celulares de gama media. |
| 23 | **La app vive en `app/` dentro del repo**, que se clona en `C:\dev\brai`. | Un solo repo, un solo historial. Sigue fuera de OneDrive (#16). |
| 24 | **El artista de la demo es José Luis Malo, con candados:** solo su nombre y "Los olvidados" (del draft); ficha, historia y dueños marcados como ejemplo con aviso visible; todo en `app/src/data/demo.ts`. **No se publica con su nombre hasta que firme el permiso de fundador.** | Lo pidió el equipo. Es persona real sin entrevistar: inventarle datos en público rompe la regla 3 y arriesga su "sí". |

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
