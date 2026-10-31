# Cómo Brai protege una obra (sin ser programadores)

**Idea central: la verdad vive en el registro, no en el chip.** El chip es solo la puerta. Lo que dice quién pintó la obra y quién es su dueño es la base de datos de Brai.

## Qué prometemos y qué no

| Decimos | No decimos |
|---|---|
| "Verificada por el artista": él mismo la registró, con fecha y fotos. | "Imposible de falsificar" |
| "Registro de propiedad y procedencia" | "Blockchain", "infalible" |
| Con 424 DNA (versión 2): "este sello es original" | |

## Las 5 capas

1. **Sello NFC antidesprendible + QR.** El sello se rompe si lo despegas. El QR sirve para celulares sin NFC (en México ~78% usa Android y muchos baratos no traen NFC o lo traen apagado).
2. **Fotos huella.** Al registrar, el artista toma 3 fotos macro de detalles únicos (una pincelada, una esquina, la firma). Quien escanee compara el cuadro con las fotos.
3. **Código de dueño bajo raspadita.** Como las tarjetas de recarga: si está raspado, alguien ya lo vio. Es de un solo uso.
4. **Historial de dueños encadenado.** Solo se agregan eventos, nunca se borran: registro, primer dueño, transferencias. Cada evento guarda la huella (hash) del anterior: si alguien edita uno viejo, la cadena deja de cuadrar y se nota. Por qué no NFT: `TOKENIZAR.md`.
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
2. **Escribir** → Agregar registro → URL → `https://brai.art/o/7KQ2X` → Escribir.
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

## Versión 2: NTAG 424 DNA
Cada toque genera una firma nueva (cifrado AES-128); copiar el tag no sirve. Cuesta ~2.50 a 5 USD por pieza y requiere configurar llaves y verificar en el servidor. Se considera para la Expo si el prototipo está listo en diciembre.

## Privacidad
Si guardan correos de compradores reales, necesitan un **aviso de privacidad** (Ley Federal de Protección de Datos Personales). Es una página, pero no se la salten.
