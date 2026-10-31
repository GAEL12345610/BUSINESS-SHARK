# Auditoría de diseño (31 oct 2026)

Revisión de la landing, la página de la obra y reclamar, en celular (390 px) y escritorio. Cada hallazgo dice a quién le importa: **J** jurado, **C** comprador, **A** artista.

**Regla con la que se filtró "más animación":** cada efecto tiene que **explicar el producto o hacer sentir el ritual.** Si solo se mueve por moverse, no entra. El dorado sigue siendo exclusivo del momento de registrar o reclamar (`brand/BRAND.md`, sección 11). Todo respeta `prefers-reduced-motion`.

## Landing

| # | Hallazgo | Para | Arreglo | Estado |
|---|---|---|---|---|
| L1 | Nunca se ve **el gesto** que vende Brai: acercar el celular al cuadro. Se explica con texto. | J | Escena guiada por scroll: un celular se acerca al sello detrás del cuadro, salen ondas y se abre la cédula. | Hecho |
| L2 | La raspadita es el ritual más memorable y en la página es una imagen quieta. | J C | Raspadita que se raspa con el dedo y revela un código que sirve para reclamar la obra de la demo. | Hecho |
| L3 | Cero números. Viabilidad (Mate) no ve datos en toda la página. | J | Tres cifras con fuente que cuentan al aparecer. | Hecho |
| L4 | No responde las dudas obvias: ¿y si mi cel no tiene NFC?, ¿y si Brai desaparece?, ¿se puede copiar el sello?, ¿por qué no NFT? | J A | Preguntas frecuentes que se abren y cierran. Funcionan sin JavaScript. | Hecho |
| L5 | "Quiero registrar mis obras" abre un correo vacío. | A | El correo llega con 4 preguntas ya escritas (nombre, Instagram, obras al año, rango de precio). | Hecho |
| L6 | El sello NFC no parece "vivo". | J | Ondas que salen del sello. | Hecho |
| L7 | Los 4 pasos se ven como una tabla. | J | La línea de cada paso se dibuja al llegar. | Hecho |
| L8 | Sin aviso de privacidad en el pie. | A C | Pendiente: lo redacta el equipo antes de guardar correos reales (`SEGURIDAD_OBRA.md`). | Pendiente |

## Página de la obra

| # | Hallazgo | Para | Arreglo | Estado |
|---|---|---|---|---|
| O1 | La página aparece de golpe: no hay "momento" al tocar el sello. | C J | Entrada escalonada de 600 ms y el sello dorado se estampa. Sin pantalla de carga extra. | Hecho |
| O2 | No se puede ver la obra en grande ni de cerca. | C | Visor a pantalla completa con zoom y arrastre. | Hecho |
| O3 | Las fotos huella no dicen DÓNDE está cada detalle en el cuadro. Sin eso, comparar es adivinar. | C | Al tocar una huella se ve el cuadro completo con el detalle marcado. | Hecho |
| O4 | El comprador no puede presumir su obra. | C A | Botón Compartir (comparte nativo del celular o copia el link). Cada compartida es publicidad gratis del artista. | Hecho |
| O5 | Después de reclamar, la página se ve igual que para cualquiera. | C | Estado "Esta obra es tuya" para quien la reclamó. | Hecho |
| O6 | No hay forma de ver todas las obras del artista. | A | Página del artista `/a/:slug`, enlazada desde su nombre. | Hecho |
| O7 | La línea de tiempo no muestra que el registro es encadenado. | J | Huella corta del registro bajo la línea de tiempo (`TOKENIZAR.md`). | Hecho |
| O8 | Reclamar: hay que teclear el código aunque venga de la raspadita de la demo. | J | El código llega ya escrito desde la raspadita de la landing. | Hecho |
| O9 | Al reclamar no hay respuesta física. | C | Vibración corta en celulares que la soportan. | Hecho |
| O10 | El video es una portada sin video. | C | Pendiente: se graba con José Luis (30 min de la oferta de fundador). | Pendiente |

## Lo que NO se hizo, a propósito

- **Confeti, partículas, cursor personalizado, parallax en todo.** Es lo que hace que una página se vea hecha por IA, y en un Android de gama media con datos se traba.
- **Librería de animación** (Framer Motion, GSAP). Todo sale con CSS y unas líneas de JS: la app pesa lo mismo.
- **Pantalla de carga con logo antes de la obra.** Cada escaneo tardaría un segundo más. La entrada escalonada da el mismo efecto sin esperar.

## Piezas físicas

`/imprimir/:codigo` arma la tarjeta de dueño (85 × 55 mm), el sello (30 mm) y el QR a `brai.art/o/XXXX`, listos para imprimir en tamaño real para la Expo.
