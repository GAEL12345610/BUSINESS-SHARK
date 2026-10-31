# ¿Tokenizar las obras como NFT?

Fecha: 31 oct 2026. Pregunta del equipo: *¿hacer cada obra un NFT la vuelve más robusta?*

**Respuesta corta: no ahora, y quizá nunca.** Un NFT protege la parte del sistema que no está rota y deja igual la que sí lo está. Lo que sí hacemos: tomar la idea buena de blockchain (un registro que no se puede editar sin que se note) y meterla en nuestra base de datos, gratis y sin que nadie tenga que entender nada. Decisión en `DECISIONES.md` #25.

---

## 1. Dónde está el punto débil de Brai hoy

Imagina una cadena con tres eslabones:

| Eslabón | Qué hace | ¿Qué tan fuerte es hoy? |
|---|---|---|
| **Cuadro ↔ sello** | El sello está pegado a ESE cuadro | **Débil.** Un NTAG213 se copia con una app gratis (`SEGURIDAD_OBRA.md`). |
| **Sello ↔ registro** | El sello abre la página correcta | Medio. Depende de que `brai.art` siga viva. |
| **Registro** | Quién la pintó, quién es el dueño, en qué orden | Fuerte si la base de datos solo agrega eventos y nadie puede editarlos. |

Un NFT **solo refuerza el tercer eslabón.** Si alguien copia el sello y lo pega en una copia del cuadro, el NFT sigue diciendo "esta obra existe y es de Ana". No sabe qué cuadro tienes enfrente. A esto se le llama **el problema del oráculo**: la blockchain no puede ver el mundo físico; alguien de fuera le tiene que decir qué es verdad ([Urth, ¿se pueden ligar obras físicas a NFTs?](https://magazine.urth.co/articles/physical-nft)). Hasta las empresas que venden esto reconocen que ligar el certificado digital al objeto físico "sigue sin resolverse del todo" ([HodlHub sobre Verisart, 2025](https://hodlhub.blogspot.com/2025/05/verisart-how-blockchain-is-solving-art.html)).

**Analogía:** es como poner una caja fuerte para guardar la copia de la llave de tu casa, mientras dejas la puerta abierta.

Lo que de verdad refuerza el primer eslabón ya está en el plan: **NTAG 424 DNA** (versión 2, cada toque genera una firma nueva) y las **fotos huella**.

## 2. Lo que dicen los datos del mercado

- El volumen de NFTs de arte pasó de **2,900 millones de USD en 2021 a 197 millones en 2024**, y a **23.8 millones en el primer trimestre de 2025** (caída de más del 90%) ([CryptoPotato con datos de DappRadar](https://cryptopotato.com/from-2-9-billion-to-23-8-million-the-rise-and-fall-of-art-nfts/)).
- El valor total del mercado NFT cayó **72% en 2025**, de 9,200 a 2,500 millones de USD ([KuCoin News](https://www.kucoin.com/news/flash/nft-market-hits-2025-low-total-market-cap-drops-72-year-to-date), [CoinMarketCap](https://coinmarketcap.com/academy/article/nft-sales-drop-to-dollar320m-as-market-cap-falls-66percent)).
- Ojo: varias de estas fuentes citan los mismos reportes de DappRadar. La dirección es clara aunque los porcentajes exactos varíen.

**Traducción:** para un profesor de Arte o de Mate en 2026, "NFT" suena a la moda de 2021 que se cayó. Para un comprador que paga 12,000 por un cuadro, suena a especulación. Eso le resta credibilidad a una marca cuyo valor es la confianza.

## 3. Los costos que no se ven

| Problema | Qué pasa en la vida real |
|---|---|
| **Cartera digital (wallet)** | El comprador tendría que crear una, guardar una frase secreta de 12 palabras y no perderla. Si la pierde, pierde la prueba de que la obra es suya. Hoy solo raspa y escribe su correo. |
| **Comisiones de la red** | Cada registro y cada transferencia cuesta. Hay redes baratas, pero alguien tiene que pagar y mantener cripto. |
| **El equipo es menor de edad** | Los exchanges donde se compra cripto piden mayoría de edad para abrir cuenta (requisito típico de verificación de identidad, confirmar con el exchange). El equipo no podría operar la parte de pagos solo. |
| **México** | Banxico no autoriza a instituciones financieras a ofrecer intercambio o custodia de activos virtuales, y el SAT trata ciertas operaciones con activos virtuales como actividades vulnerables de antilavado ([Xataka México](https://www.xataka.com.mx/criptomonedas/mexico-regulo-a-fintech-muchos-paises-ahora-criptomonedas-su-gran-pendiente), [Tax Today México](https://www.taxtodaymexico.com/como-se-regulan-las-criptomonedas-en-mexico/)). No es ilegal tener NFTs, pero es terreno legal gris para un proyecto escolar. |
| **Nuestra propia promesa** | `CLAUDE.md` regla 1: nunca "blockchain". La decidimos porque es lo que podemos sostener. |

## 4. Si lo hacemos, nos volvemos una copia peor de Verisart

Verisart ya registra certificados en blockchain y los liga a chips NFC y QR en la obra ([Verisart, QR seguros](https://help.verisart.com/en/articles/5779331-how-do-secure-qr-stickers-work), [Verisart, ligar lo digital a lo físico](https://verisart.com/blog/link-the-digital-to-the-physical)), con más de 50,000 creadores. Si Brai dice "también usamos blockchain", entramos a su juego, donde ellos ganan. Nuestra diferencia es otra: el ritual de entrega, el servicio en persona, el español. Ver `brand/BRAND.md`.

## 5. Lo que sí hacemos: la cadena de huellas

Tomamos la idea buena de blockchain sin el resto:

1. Cada evento de una obra (registro, reclamo, transferencia) guarda la **huella** (hash) del evento anterior.
2. Un hash es como la huella digital de un texto: si cambias una sola letra, la huella cambia por completo.
3. Si alguien edita a escondidas un evento viejo (por ejemplo, para cambiar al dueño), su huella cambia y **todos los eventos que siguen dejan de cuadrar**. Se nota.
4. La página de la obra muestra la huella corta del último evento. Cualquiera puede comprobar la cadena.

**Analogía:** es un cuaderno donde cada página lleva escrito un resumen de la página anterior. Si arrancas o cambias una, las siguientes te delatan.

Cuesta cero, no pide cartera ni cripto, y nadie tiene que entender nada para usarla. Ya está en `app/supabase/migrations/20261031000500_cadena_huellas.sql`, con su prueba.

**Versión 3, opcional:** publicar una vez al día la huella de todo el registro en un lugar público que no controlamos (por ejemplo OpenTimestamps, gratis, que prueba que un dato existía en cierta fecha sin publicar el dato) ([cómo funciona OpenTimestamps](https://www.spark.money/glossary/bitcoin-timestamp-server)). Con eso ni Brai podría reescribir el pasado sin que se note. No se construye antes de la Expo.

## 6. Cuándo volver a preguntarlo

Se reabre si pasa **cualquiera** de estas:
- Un artista cliente vende ediciones digitales además de obra física.
- En las entrevistas, 3 o más compradores dicen que quieren su obra en una cartera digital.
- Una galería o casa de subastas aliada lo pide como requisito.

## 7. Cómo usar esto con el jurado

Esta página es una diapositiva de **Viabilidad**: *"Evaluamos hacerlo NFT. El arte en NFT cayó más de 90% desde 2021, obliga al comprador a manejar una cartera, y no protege lo que de verdad se puede falsificar: el sello. Así que tomamos solo la idea buena: un registro encadenado que delata cualquier cambio."* Demuestra que decidieron con datos, no por moda.
