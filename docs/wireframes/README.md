# Wireframes

Los drafts del equipo y lo que salió de ellos. Lo decidido está en `docs/DECISIONES.md` (#17 a #24).

| Archivo | Qué es |
|---|---|
| `00_draft_web.png` | Draft de la landing (Screen 8 y 9) |
| `00_draft_app.png` | Draft de la página de la obra: 3 headers y 4 bloques |

## Qué tomamos de los drafts y qué cambió

| Del draft | Se queda | Cambia |
|---|---|---|
| Barra de progreso arriba | Sí, una línea terracota de 2 px bajo el logo | |
| "Conectando artistas con sus compradores" | | Headline: "Vendiste tu obra. ¿Sabes dónde está hoy?" (#17) |
| Teléfono manipulable | Sí, se inclina al arrastrarlo y adentro corre la página real de la obra | 3D con CSS, sin librería (#22) |
| Tarjetas 3D con los problemas | Sí, 3 tarjetas que se inclinan con el dedo o el mouse | |
| Header de la obra, ejemplo 2 | Sí, marco del color del artista | Sello "Registrada por el artista", no "Verificado por Brai" (#19) |
| Video del artista | Sí | Va después de la cédula, sin autoplay (#21) |
| Historia de la obra | Sí | |
| Catálogo | Sí, como "Más obras de José Luis Malo" | Es el dolor real: volver a venderle a quien ya compró |
| CTA "Inicia sesión" | | "Reclamar mi obra" (#18) |
| (no estaba) | | Ficha, fotos huella, línea de dueños, sello Registro Brai (#21) |

## Landing (`brai.art`), de arriba a abajo

1. **Barra:** isotipo + "Brai", línea de progreso de scroll, botón "Ver una obra registrada".
2. **Hero:** headline de dolor, subtítulo de qué hace Brai en una frase, 2 botones. Teléfono 3D a la derecha (en celular, abajo).
3. **El problema:** 3 tarjetas 3D. No sabes quién tiene tu obra; no puedes volver a venderle a quien ya te compró; la ley te da una parte de cada reventa y nadie la cobra.
4. **Cómo funciona:** 4 pasos (registras, sellamos, entregas la tarjeta, el comprador reclama).
5. **Las 3 piezas:** sello, tarjeta de dueño, página de la obra.
6. **Lo que prometemos y lo que no:** la promesa honesta como diferencia.
7. **Fundadores:** buscamos 3 artistas. Precio público.
8. **Cierre:** "Cada obra sabe de dónde viene." + botones.

## Página de la obra (`brai.art/o/XXXX`), de arriba a abajo

1. **Barra del artista:** su nombre en Fraunces.
2. **Obra a sangre** con marco del color del artista.
3. **Cédula:** título, artista, sello dorado "Registrada por el artista" con fecha, ficha en monoespaciada.
4. **Reclamar mi obra** (botón principal; fijo abajo al hacer scroll).
5. **Video del artista** (portada, se reproduce al tocar).
6. **Historia de la obra**, contada por el artista.
7. **Fotos huella:** 3 detalles para comparar con el cuadro.
8. **Línea de tiempo:** registro y dueños, solo iniciales.
9. **Más obras del artista.**
10. **Sello "Registro Brai"** y link chico "¿Eres el artista? Entra".

Reclamar (`/o/XXXX/reclamar`): código grande en monoespaciada + correo → momento dorado "Esta obra ya es tuya".
