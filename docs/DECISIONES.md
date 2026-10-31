# Decisiones de Brai

Una línea por decisión, con su porqué. Lo más reciente arriba. Si una decisión cambia, se tacha y se agrega la nueva con fecha: nunca se borra.

## 31 oct 2026, cuarta sesión (prototipo para José Luis, mascota)

| # | Decisión | Por qué |
|---|---|---|
| 38 | **La demo se personaliza por link:** `/recorrido?para=Nombre` pinta ese nombre solo en el navegador de quien lo abre. No se guarda en el código ni en el sitio, y se borra al cerrar la pestaña. Con nombre personalizado, la historia de la obra pasa a texto neutro. | Permite enseñarle a José Luis la demo con su nombre sin publicarlo (#24 y #36) y sin atribuirle una cita que no dijo (regla 3). |
| 39 | **Mascota propia, Punto (el sello con cara), en lugar de copiar una existente.** Se copian los principios de Michelin, Duolingo y el anti ejemplo de Clippy, no el dibujo. | Las mascotas famosas son marcas registradas, copiarlas nos baja en Innovación y no cuentan nuestra historia. Detalle en `MASCOTA.md`. |
| 40 | **El prototipo para la reunión es `/recorrido` + `/panel`.** El recorrido tiene 5 pasos y una calculadora con Oferta A y B. La landing pública solo enseña la Oferta A, que sigue vigente. | El artista compra por lo que ve él (el panel), no por lo que ve el comprador. Y la entrevista tiene que probar A contra B (#26). |
| 41 | **La imagen para compartir usa la dirección de Vercel** hasta que exista `brai.art`. | WhatsApp no puede bajar una imagen de un dominio que no existe. |

## 31 oct 2026, cierre (se unen las dos ramas)

| # | Decisión | Por qué |
|---|---|---|
| 35 | **Se unen las dos sesiones del 31 oct.** La app es la de la segunda sesión (landing prerenderizada, obra, reclamar, artista, imprimir). El backend es el de la tercera (`app/supabase/migrations/`, 21 pruebas, 424 DNA), con la cadena de huellas de la #25 pasada a una migración. Sale `schema.sql`. | Dos apps y dos bases que se contradicen rompen "un dato, un dueño". El equipo escogió esa landing; el backend de migraciones es el que tiene más pruebas. |
| 36 | **Candado de José Luis Malo en el código:** lo publicado usa una artista inventada (Lucía Arce, marcada como ejemplo). Su nombre solo aparece en local con `VITE_DEMO_JOSE_LUIS=1`. Su historia en primera persona se quita hasta entrevistarlo. | Cumple la #24 aunque alguien publique sin acordarse. Una cita inventada de una persona real rompe la regla 3. |
| 37 | **Contacto del equipo: correo normal del proyecto, no corporativo.** Pendiente cuál. Nunca el correo personal de un integrante. | No hace falta pagar correo con dominio. El aviso de privacidad sí necesita un contacto. Somos menores: nada personal en público. |

## 31 oct 2026, tercera sesión (backend, competencia, costos)

| # | Decisión | Por qué |
|---|---|---|
| 26 | **Precio en prueba: Oferta A (7,500 + 990 al mes) y Oferta B (2,500 de arranque con 5 obras + 450 por obra, sin mensualidad) se presentan las dos en cada entrevista.** Gana la que escojan 2 de 3 artistas. | La competencia con servicio cobra por obra (Tagsmart, 20 a 120 libras). 990 al mes es 2 a 6 veces lo que cuesta el software hazlo tú mismo. A gana más por cliente, B se vende más fácil. Ver `COSTOS.md` y `COMPETENCIA.md`. |
| 27 | ~~Decisión 8~~ **NTAG 424 DNA entra para la Expo**: comprar 20 a 50 piezas en cuanto se cotice el envío. El backend ya lo verifica. | Cuesta ~18.50 MXN la pieza, no 46 a 92 como creíamos. Por ~15 MXN más por obra podemos decir "este sello es el original". |
| 28 | **El derecho de reventa baja a beneficio secundario.** Nunca es argumento de venta principal. | Solo aplica en reventas por subasta, galería o comerciante, no entre particulares, y la sociedad de gestión se queda hasta 15%. En una obra de 12,000 son ~408 MXN. |
| 29 | **La app tiene modo ejemplo**: corre completa sin Supabase, con las mismas reglas. | La demo frente al jurado no puede depender del wifi del evento ni de que Supabase Free esté despierto. |
| 30 | ~~La landing es HTML crudo aparte de la app React.~~ Cambiada por la 35: la landing se prerenderiza dentro de la app (mismo fin: Google y los bots de IA la leen sin JavaScript). | |
| 31 | **El NFC graba `brai.art/o/XXXXX?v=n` y el QR `?v=q`.** | Así sabemos cuántos toques vienen por NFC y cuántos por QR, sin romper la regla 4. |
| 32 | **Las cuentas de artista las crea el equipo en el setup.** Nadie se registra solo en el panel. | El setup es un servicio pagado; una cuenta suelta no tiene artista ligado y sería ruido. |
| 33 | **Tipografía v2.2:** tamaño óptico de Fraunces, peso 560, escala fluida, fuentes autohospedadas. **No se cambia de familia.** | Ver `brand/BRAND.md`, sección 6. |
| 34 | **La página de la obra enseña sus capas de confianza** (pendiente de pasar a la app actual) (sello, fotos huella, dueño), cada una marcada como cumplida o pendiente. | Lo copiamos del "COA+" de Verisart: la confianza se explica, no se presume. |

## 31 oct 2026, segunda sesión (auditoría y NFT)

| # | Decisión | Por qué |
|---|---|---|
| 25 | **No tokenizar las obras como NFT.** En su lugar, eventos encadenados por huella (hash): editar uno a escondidas rompe la cadena. Se reabre con los criterios de `TOKENIZAR.md`. | Un NFT no protege el punto débil (el sello copiable), el arte en NFT cayó más de 90% desde 2021, pide cartera al comprador y nos vuelve copia de Verisart. Detalle y fuentes en `TOKENIZAR.md`. |

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
| 8 | ~~**NTAG 424 DNA = versión 2.**~~ (cambiada por la 27) Para el 26 nov no se compra; para la Expo, ~5 piezas si el prototipo está listo en diciembre. | Requiere llaves de cifrado y verificación en servidor; la rúbrica no califica criptografía. |
| 9 | **Los 50 stickers NFC que ya compramos se usan** si son NTAG213, 215 o 216. | Revisar el tipo en NFC Tools. Bloquear es permanente: probar en 1 primero. |
| 10 | **Una plataforma, muchas caras (white label).** Cada artista con su logo, colores y dominio; el mismo código para todos. Web, no App Store. | 20 apps distintas no se mantienen entre 4 personas. Nadie descarga una app para ver un cuadro. |
| 11 | **Sello "Registro Brai" chico en cada página del artista**, como el "Secured by Stripe". | Si el artista se certifica en su propia app, se certifica a sí mismo. La autoridad viene de un registro externo. |
| 12 | **Los chips SIEMPRE apuntan a `brai.art/o/XXXX`**, nunca al dominio del artista. | El tag bloqueado es para siempre: si el dominio del artista caduca, mueren todos los chips de sus cuadros. |
| 13 | **Dominio del artista: subdominio por default** (`artista.brai.art`). Dominio propio como extra del setup, a nombre del artista. | El artista no depende de nosotros para su dominio. |
| 14 | **Marca v2:** isotipo enso, Schibsted Grotesk en vez de Inter, voz "Registro" en IBM Plex Mono, verde y Ghost corregidos a AA, tagline "Cada obra sabe de dónde viene". | Ver historial en `brand/BRAND.md`. |
| 15 | **Repo privado.** | Tiene nombres e Instagram de artistas prospecto y es el plan de un equipo de menores. Lo hace la cuenta dueña del repo. |
| 16 | **El código de la app vive en `C:\dev\brai\app`, fuera de OneDrive.** | pnpm usa symlinks y OneDrive los rompe. |
