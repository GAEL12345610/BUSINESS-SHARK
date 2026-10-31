# Demo para José Luis Malo

**Link:** `https://braiart.vercel.app/jose-luis` (abre el recorrido con su nombre).
**Salir de la demo:** `https://braiart.vercel.app/?salir-demo` (vuelve a la artista de ejemplo).
Decisión: `docs/DECISIONES.md` #42. Guion de la reunión: `docs/REUNION_JOSE_LUIS.md`.

## Qué es real y qué no

| Dato | Lo que dice la demo | Fuente | Estado |
|---|---|---|---|
| Nombre, ciudad | José Luis Malo, Guadalajara | [Pincelada de Vida, Gobierno de Jalisco](https://pinceladadevida.jalisco.gob.mx/jose-luis-malo/) | Público |
| Nacimiento y trayectoria | Nacido en 1971, más de 30 años de trayectoria | Pincelada de Vida | Público, confirmar |
| Estilo | Mezcla el juego con la crítica política | [El Informador, 2012](https://www.informador.mx/Cultura/Jose-Luis-Malo-y-su-arte-politico-20120810-0257.html) | Público |
| Colecciones | MCA Chicago, Museo Nacional del Tequila, Senado, Congreso de Jalisco | Pincelada de Vida ("según su perfil público") | Público, **confirmar** |
| Portador de la Paz (2026) | Pintura y escultura en la Estación Juárez del Tren Ligero | [UDGTV](https://udgtv.com/noticias/jose-luis-malo-interviene-siteur/314993) | Público |
| *Toricleto* | Óleo sobre tela, 100 × 80 cm, 1 de 1. Año por confirmar | [Galería Vértice](https://galeriavertice.mx/pages/jose-luis-malo) | Público |
| *Diana y la Patria Náufraga* | Óleo sobre tela, expuesta en Lúdico (2012). Medidas y año por confirmar | El Informador, 2012 | Público |
| *Caminantes* | Serie; descripción de prensa. Técnica, medidas y año por confirmar | [El Despertador Panamericano](https://eldespertadorpanamericano.com/arte-combatir-delincuencia-jl-malo/) | Público |
| *Viejo loco* | 2016, vendida en subasta en línea en 2021. Técnica y medidas por confirmar | [MutualArt](https://www.mutualart.com/Artist/Jose-Luis-Malo/8BB17FDEB44116E3) | Público |
| *Configuraciones de un personaje* | 1998, premiada en el Salón de Octubre | [Arte Informado](https://www.arteinformado.com/guia/f/jose-luis-malo-213461) | Público |
| Fotos de las obras | Marco "foto pendiente" | | **Falta su permiso** |
| Dueños | Ninguno. Solo los que se reclamen en la demo | | Nunca se inventan |
| Historia de cada obra | Texto de prensa en tercera persona, con fuente | | Él la escribe en la versión real |
| Número de registro (BRAI-0001...) | De demostración | | Ninguna obra está registrada |
| Color de su página | Verde petróleo `#2F5D62` | | Lo escoge él |

## Reglas que no se rompen en esta demo
- **Nada inventado:** lo que no tiene fuente dice "Por confirmar" (regla 3).
- **Ningún dueño inventado sobre una obra real.** *Toricleto* está a la venta en una galería: inventarle un dueño en una página pública sería un registro falso, justo lo que Brai promete evitar.
- **Ninguna cita suya que no haya dicho.** Las historias van en tercera persona y con su fuente.
- **Ninguna foto de su obra sin su permiso.** Cuando la dé: guardar las fotos en `app/public/obras/jose-luis/<nombre>.jpg` y cambiar `imagen` en `app/src/data/demo.ts`.

## Lo que funciona y lo que no
- **Funciona:** recorrido, página de cada obra, reclamar con el código `4K7P-9QX2`, panel con quien reclamó, registrar una obra nueva con la cámara, imprimir piezas con un QR que abre la demo al escanearlo.
- **Funciona entre pestañas del mismo navegador.** Lo que se reclama en una pestaña aparece en el panel abierto en otra.
- **No se comparte entre dos celulares distintos.** Si José Luis reclama en su celular, ese reclamo no aparece en la laptop del equipo. Para eso hace falta conectar Supabase (`TODO.md`, sección 3). En la reunión: hacer todo el recorrido en **un mismo celular**.
- El QR de la hoja de impresión apunta a `braiart.vercel.app` mientras no exista `brai.art`. **Nunca grabar ni bloquear un sello NFC con esa dirección** (regla 4).
