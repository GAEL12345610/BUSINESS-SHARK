# Cómo Brai protege una obra (sin ser programadores)

**Idea central: la verdad vive en el registro, no en el chip.** El chip es solo la puerta. Lo que dice quién pintó la obra y quién es su dueño es la base de datos de Brai.

## Qué prometemos y qué no

| Decimos | No decimos |
|---|---|
| "Verificada por el artista": él mismo la registró, con fecha y fotos. | "Imposible de falsificar" |
| "Registro de propiedad y procedencia" | "Blockchain", "infalible" |
| Con 424 DNA: "este sello es original" | |

## Las 5 capas

1. **Sello NFC antidesprendible + QR.** El sello se rompe si lo despegas. El QR sirve para celulares sin NFC (en México ~78% usa Android y muchos baratos no traen NFC o lo traen apagado).
2. **Fotos huella.** Al registrar, el artista toma 3 fotos macro de detalles únicos (una pincelada, una esquina, la firma). Quien escanee compara el cuadro con las fotos.
3. **Código de dueño bajo raspadita.** Como las tarjetas de recarga: si está raspado, alguien ya lo vio. Es de un solo uso.
4. **Historial de dueños.** Solo se agregan eventos, nunca se borran: registro, primer dueño, transferencias.
5. **Sello "Registro Brai".** La autoridad viene de un registro externo, no de la página del propio artista.

**Para engañar a alguien tendrías que** clonar el tag, **y** que el cuadro coincida con las fotos macro, **y** brincarte el registro de dueños.

## Paso a paso

### 1. Registrar la obra (panel del artista)
Fotos + 3 fotos huella + ficha (título, técnica, medidas, año) + historia. El sistema genera:
- Registro: `BRAI-0007`
- URL corta: `brai.art/o/7KQ2X`
- Código de dueño de un solo uso (se guarda cifrado, nunca en texto plano)

### 2. Grabar el NFC (app gratis NFC Tools)
1. NFC Tools → **Leer**: confirma que el tag sea NTAG213, 215 o 216.
2. **Escribir** → Agregar registro → URL → `https://brai.art/o/7KQ2X?v=n` → Escribir. (El `?v=n` cuenta el toque como NFC. El QR lleva `?v=q`.) **Copia la URL desde el panel** (`/panel`, Imprimir tarjeta, botón Copiar): escrita a mano se cuela un punto o un espacio, y bloqueado es para siempre.
3. Acerca el celular otra vez y confirma que abre la página correcta.
4. **Otras opciones → Bloquear tag.** ⚠️ **Es permanente.** Prueben primero con 1 de los 50.
5. Pegar el sello detrás del cuadro, sobre bastidor o tela. **Nunca sobre metal** (los marcos metálicos bloquean la señal). Imprimir el QR con la misma URL al lado.

**La URL siempre es de `brai.art`, nunca del dominio del artista.** El tag bloqueado dura para siempre; si el dominio del artista caduca, todos sus chips mueren.

### 3. Imprimir la tarjeta
Título, ficha en monoespaciada, código bajo raspadita y **firma a mano del artista**.

### 4. Venta
El comprador toca el sello → página de la obra → **Reclamar** → raspa → escribe el código y su correo → queda como dueño. El código muere al usarse.

### 5. Reventa
El dueño actual presiona **Transferir** → sale un código nuevo para el siguiente dueño → se agrega a la línea de tiempo → **el artista recibe aviso** (le sirve para su derecho de reventa, LFDA art. 92 bis).

### 6. Verificar (cualquiera)
Toca el sello y ve: "Verificada por el artista" con fecha, las fotos huella para comparar, y el dueño actual **solo con iniciales** (privacidad).

## NTAG 424 DNA (sello seguro, entra para la Expo)
Cada toque genera una firma nueva (cifrado AES-128); copiar el tag no sirve. Cuesta **~18.50 MXN por pieza** (Shop NFC, lote de 50), más envío (ver `COSTOS.md`).

Cómo funciona en Brai (ya construido, `app/supabase/functions/sello/`):
1. El chip arma la URL `brai.art/o/XXXXX?e=...&c=...`: `e` trae cifrados el UID del chip y un contador de toques; `c` es la firma.
2. La página de la obra manda `e` y `c` a la función `sello`, que tiene las llaves. Si la firma no cuadra: "Este enlace no viene del sello de la obra".
3. La base revisa que ese chip sea de esa obra y que **el contador haya subido**. Si alguien copió un enlace viejo y lo comparte, el contador no sube: "Este enlace ya se usó".
4. La página borra `e` y `c` de la barra de direcciones para que el enlace no se quede para compartirse.

Cada chip tiene su propia llave (sale de una llave maestra y el UID): si se filtra la de un chip, solo cae ese chip. Configuración paso a paso en `PROTOTIPO.md`.

## Privacidad
Si guardan correos de compradores reales, necesitan un **aviso de privacidad** (Ley Federal de Protección de Datos Personales). Ya existe en `app/privacidad.html` (`brai.art/privacidad`) y el formulario de reclamar pide aceptarlo. **Pendiente: que lo lea un adulto antes de usar datos reales**, y que exista el correo `hola@brai.art`.
