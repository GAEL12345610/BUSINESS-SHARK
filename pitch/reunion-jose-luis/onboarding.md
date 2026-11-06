# Onboarding propuesto (artista y comprador)

**Esto es una propuesta, no un servicio que exista.** Cada paso dice si hoy está construido, simulado en la demo o pendiente. Precio y condiciones: `docs/OFERTA.md` (dueño único). Cómo se protege una obra: `docs/SEGURIDAD_OBRA.md`.

Estados: **Demo** = se puede ver simulado en `braiart.vercel.app`. **Escrito** = el código existe y tiene pruebas, pero no está conectado ni publicado. **Pendiente** = no existe.

## Para el artista

| Paso | Qué pasaría | Quién | Estado hoy |
|---|---|---|---|
| 0. Plática | 15 a 25 minutos para entender cómo vende. Sin compromiso. | Equipo con un adulto | Guion listo (`docs/REUNION_JOSE_LUIS.md`) |
| 1. Acuerdo por escrito | Condiciones, precio y permisos (nombre, fotos, caso). Lo redacta y revisa un adulto. | Adulto | **Pendiente.** No hay plantilla de acuerdo |
| 2. Cuenta del artista | El equipo crea la cuenta; nadie se registra solo (DECISIONES #32). | Equipo | **Escrito** (base de datos). Sin login en la app |
| 3. Sesión de registro en su taller | Por obra: foto, 3 fotos huella de detalles, ficha (título, técnica, medidas, año) e historia en sus palabras. | Equipo con el artista | **Demo** (formulario de prueba en el panel). Guardado real **Escrito**, no conectado |
| 4. Su página | Página del artista y de cada obra con su color. | Equipo | **Demo** |
| 5. Piezas físicas | Por obra: sello NFC con QR al lado y tarjeta de dueño firmada a mano con código bajo raspadita. | Equipo imprime, artista firma | **Demo** (hoja de impresión con QR de demostración). Sellos y raspaditas: **Pendiente** (sin comprar) |
| 6. Entrega | El artista entrega la tarjeta con la obra y le explica al comprador cómo reclamarla. | Artista | **Pendiente** (no hay guía impresa para el comprador) |
| 7. Panel | Ve qué obras ya reclamaron y el correo de quien lo hizo. | Artista | **Demo**. Sin cuentas reales |
| 8. Escribir a sus compradores | Avisar de obra nueva a quien reclamó. | Artista | **Demo** (simulado). Envío de correos **Pendiente** |
| 9. Salida | Llevarse todo lo registrado si se va. | Equipo | **Pendiente.** No existe la descarga |

### Lo que incluiría cada opción (en prueba)
| | Opción A, precio publicado sin validar | Opción B, alternativa en prueba |
|---|---|---|
| Arranque | 7,500 MXN: página, hasta 20 obras registradas, 20 sellos y 20 tarjetas | 2,500 MXN: página, sesión de registro y 5 obras con sello y tarjeta |
| Después | 990 MXN al mes: obras nuevas, transferencias, avisos | 450 MXN por obra adicional, sin mensualidad |
| Fundadores (primeros 3) | Arranque y 3 meses sin costo. Mes 4: 990 MXN al mes congelados, o se va | Mes 4: **por definir** (B no tiene mensualidad) |
| Lo que se pide a un fundador | Registrar 3 a 5 obras reales, entregar las tarjetas, 30 min de grabación y permiso por escrito para contar su caso | Igual |

Ninguna de las dos se ha cobrado ni validado con un artista. Lo que se decida va a `docs/OFERTA.md` y `docs/DECISIONES.md` (#26).

### Materiales que haría falta tener para un piloto real
- Sellos NFC (revisar el tipo de los 50 que ya tienen, `docs/SEGURIDAD_OBRA.md`) y etiquetas antidesprendibles. **Sin comprar.**
- Etiquetas de raspadita y cartulina para tarjetas. **Sin comprar.**
- Dominio `brai.art`. **Sin comprar.** Ningún sello se graba ni se bloquea antes (regla 4).
- Base de datos conectada, login y aviso de privacidad revisado por un adulto. **Pendiente** (`TODO.md`, sección 3).

## Para el comprador

| Paso | Qué pasaría | Estado hoy |
|---|---|---|
| 1. Recibe la obra | Con un sello detrás, un QR al lado y una tarjeta firmada por el artista. | **Demo** (piezas de ejemplo impresas dicen DEMO) |
| 2. Ve la página de la obra | Acerca el celular al sello o escanea el QR. No descarga ninguna app. | **Demo** (QR abre la demo). NFC **Pendiente** |
| 3. Reclama la obra, si quiere | Raspa el código, lo escribe con su nombre y correo. El código sirve una sola vez. | **Demo** (código público, solo correos `@example.com`). Reclamo real **Escrito**, no conectado |
| 4. Queda en el registro | En público solo sus iniciales. Su correo solo lo ve el artista. | **Demo** (en el navegador). Privacidad real **Escrito** y probado en Postgres local |
| 5. Recibe noticias del artista | Solo si reclamó y compartió su correo. | **Pendiente** |
| 6. Si la revende | Transfiere la obra al nuevo dueño con un código nuevo. | **Escrito** desde el artista. Desde el dueño: **Pendiente** |

**Lo que el comprador NO recibe:** una prueba legal de propiedad, una garantía de autenticidad ni un NFT. Recibe un registro hecho por el artista y la historia de la obra.
