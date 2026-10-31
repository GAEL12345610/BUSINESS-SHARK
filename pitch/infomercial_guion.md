# Infomercial de Brai: guion

**Duración objetivo: 75 segundos** (el concurso pide de 30 s a 1.5 min, con subtítulos en español). Subtítulos en `pitch/infomercial.srt`. Fecha de entrega: pendiente confirmar con el profesor (`docs/CONCURSO.md`).

**La idea en una línea:** una obra sale del taller y se pierde de vista; con Brai, cualquiera que acerque su celular sabe de dónde viene.

**Regla de oro: mostrar, no explicar.** Nadie dice "NFC" en voz. La tecnología se ve funcionar.

## Escenas

| # | Tiempo | Toma (qué se ve) | Voz | Texto en pantalla | Graba |
|---|---|---|---|---|---|
| 1 | 0:00 a 0:05 | Primerísimo plano: una mano acerca un celular a la parte de atrás de un cuadro. El celular vibra. Corte a negro. | (sin voz, solo el "tic" de la vibración) | | ? |
| 2 | 0:05 a 0:12 | Manos del artista terminando un cuadro: última pincelada, firma en la esquina. Luz de tarde. | "Pinté este cuadro durante tres meses." | | ? |
| 3 | 0:12 a 0:20 | Las mismas manos envuelven el cuadro y lo entregan en una puerta. La puerta se cierra. Plano quieto de la puerta, 1 segundo. | "Lo vendí. Y nunca volví a saber de él." | ¿Sabes dónde está tu obra hoy? | ? |
| 4 | 0:20 a 0:28 | Reverso del cuadro, sobre el bastidor. Una mano pega el sello redondo y el QR al lado. | "Ahora cada obra lleva un sello." | Un sello detrás de cada obra | ? |
| 5 | 0:28 a 0:38 | Sala de una casa, el cuadro colgado. Alguien acerca su celular y se abre la página: la obra, el nombre del artista, el sello dorado "Registrada por el artista". Grabación de pantalla en vivo, no simulada. | "Acercas tu celular y la obra te cuenta su historia." | Registrada por el artista | ? |
| 6 | 0:38 a 0:50 | La tarjeta de dueño firmada a mano. Una moneda raspa el código. Se teclea. Aparece "Esta obra ya es tuya" con el sello dorado. | "Raspas tu tarjeta, y la obra queda a tu nombre." | | ? |
| 7 | 0:50 a 0:58 | La línea de tiempo de la obra en la pantalla: registro, entrega, nuevo dueño. Corte a las manos del artista sonriendo, limpiando un pincel. | "Y quien la pintó sabe siempre dónde está." | Registro de propiedad y procedencia | ? |
| 8 | 0:58 a 1:08 | **Prueba.** Ver las dos versiones abajo. | | | ? |
| 9 | 1:08 a 1:15 | Fondo lienzo. Aparece el isotipo, el punto dorado cierra el círculo. Debajo, "Brai" y la dirección web. | "Brai. Cada obra sabe de dónde viene." | brai.art | ? |

### Escena 8, dos versiones

- **Si José Luis Malo firmó el permiso de fundador** (`docs/OFERTA.md`): él a cuadro, en su taller, una sola frase **suya, sin guion**. Se le pregunta "¿qué te gustaría saber de las obras que ya vendiste?" y se usa su respuesta tal cual. No se le dicta nada.
- **Si no ha firmado:** un integrante del equipo, frente al cuadro de la demo, acerca un iPhone (abre por NFC) y luego un Android viejo apunta al QR (abre igual). Texto en pantalla: "Con NFC o con QR. Cualquier celular." Es la prueba honesta de que funciona. (El subtítulo 8 del `.srt` es de esta versión; si sale José Luis, se reemplaza por su frase textual.)

## Lista de tomas por lugar (para grabar todo en una tarde)

| Lugar | Escenas | Qué se necesita |
|---|---|---|
| Mesa de trabajo con luz de ventana | 2, 4, 6 | Cuadro, pincel, sello, QR impreso, tarjeta, moneda |
| Una puerta de casa | 3 | Cuadro envuelto en papel kraft |
| Una sala con el cuadro colgado | 1, 5, 7, 8 | Cuadro colgado SIN marco metálico (bloquea el NFC), dos celulares |
| Pantalla (grabación del celular) | 5, 6, 7 | La demo corriendo, ver `app/README.md` |
| Edición | 9 | Isotipo de `brand/isotipo.svg` |

**Truco para la escena 5:** graba la pantalla del celular con su grabador integrado MIENTRAS otra persona graba la mano desde fuera. En edición se ponen lado a lado o se corta de uno a otro.

## Objetos

- [ ] Un cuadro real (de José Luis si firmó; si no, uno del equipo, sin firma de otro artista).
- [ ] Sello NFC grabado con `https://brai.art/o/7KQ2X` y probado. **Sin bloquear** hasta tener el dominio (`memoria/tag-nfc-bloqueado-es-para-siempre.md`).
- [ ] Tarjeta de dueño y QR impresos desde `/imprimir/7KQ2X`, en tamaño real.
- [ ] Etiqueta de raspadita sobre el código (MercadoLibre, ver `README.md`, pendientes).
- [ ] Un iPhone o Android con NFC, y otro celular para el QR.
- [ ] Moneda para raspar.

**Ojo con el dominio:** mientras `brai.art` no exista, el sello y el QR abren una página que no carga. Para grabar: correr la demo en una compu y abrir en el celular la dirección "Network" (ver `app/README.md`), o publicar la demo antes de grabar.

## Reglas de la grabación

- Música sin derechos de autor: Biblioteca de audio de YouTube. Una sola pista, suave, de guitarra o piano.
- Voz: un integrante, hablando como el artista. Despacio. Se graba aparte, en un cuarto sin eco (un clóset con ropa sirve).
- Quien salga a cuadro y sea menor de edad, con permiso de sus papás. El artista, con permiso por escrito para usar su imagen.
- Al final se mide la duración real. **Si pasa de 1:30, se recorta una escena, no se acelera.** La primera que sale es la 7.
- Subtítulos: el `.srt` se carga en el editor (CapCut, DaVinci o YouTube). Máximo 42 caracteres por línea.
