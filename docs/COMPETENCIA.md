# Competencia de Brai: ingeniería inversa

Fecha: 31 oct 2026. Fuentes al final. Lo que no se pudo confirmar dice `?`.

**Cómo leer esto:** no copiamos el producto de nadie. Copiamos **cómo cobran, cómo consiguen clientes y qué prometen**, y le ponemos lo nuestro (servicio en persona, en español, en México).

---

## 1. El mapa en una tabla

| Quién | Qué vende | A quién | Cómo cobra | Chip |
|---|---|---|---|---|
| **Verisart** (EUA, Reino Unido) | Certificado digital + packs físicos (NFC, QR, holograma) | Artistas, galerías, tiendas Shopify | Starter a 1 USD por certificado, Growth 29.99 USD al mes, Premium 49.99, Pro 99.99. En Shopify, 0.25 USD por venta certificada | **NFC Pack: 25 sellos por 50 USD más envío (2 USD por sello).** QR Pack: 25 por 25 USD. Verificado en su página el 31 oct 2026 |
| **Tagsmart** (Reino Unido) | Servicio administrado: certificado + etiqueta con ADN sintético | Artistas e impresores | Plataforma gratis. **Cobra por obra:** de 20 a 120 libras según el soporte (papel, aluminio, lienzo) | Etiqueta con ADN, no NFC |
| **Artwork Archive** (EUA) | Inventario de obra + contactos de coleccionistas + certificados en PDF | Artistas y coleccionistas | Suscripción de ~8 a 24 USD al mes | Ninguno |
| **Arteïa** (Francia) | Pasaporte digital con NFC cifrado + "VIP Room" para el dueño | Casas de subasta, galerías, herederos | `?` (venta a la medida) | NFC cifrado, se destruye si lo despegas |
| **Startbahn Cert.** (Japón) | Certificado con chip IC | Galerías, escuelas, fundaciones | `?`. Una fundación compró 3,000 sellos y **se los regaló a artistas** | Chip IC |
| **Hahnemühle My Art Registry** (Alemania) | Registro en línea ligado a sus certificados con holograma | Quien imprime en papel Hahnemühle | Viene con el certificado físico | Holograma |
| **Fine Art Ledger, markmy, Ixkio** | Variantes de NFC + registro | Artistas sueltos y galerías | `?` | NFC |
| **INDAUTOR** (gobierno de México) | Registro de obra (prueba de autoría) | Cualquier autor | **~367 MXN por obra** (2026, dato de un blog; confirmar) | Ninguno |

**En México y Latinoamérica no encontramos a nadie que haga NFC + registro de dueño para artistas plásticos.** Lo más cercano en la región fueron plataformas de NFT (Perú, Argentina), que no es lo mismo. Ojo: "no lo encontramos" no es lo mismo que "no existe". Hay que preguntarle a cada artista entrevistado si ha visto algo así.

---

## 2. Lo que aprendimos de cada uno (y qué copiamos)

### Verisart: el líder, y su truco es el físico
- **Dato verificado (31 oct 2026, verisart.com/pricing):** cobran **2 USD por sello NFC** (pack de 25 en 50 USD más envío). A nosotros un NTAG 424 DNA nos cuesta 0.92 euros (~19 MXN) en Shop NFC. El sello solo, a precio de Verisart, ya deja margen.
- **Cómo gana dinero de verdad:** el software es casi gratis; el margen está en los **packs físicos** (NFC, QR, certificados con holograma) y en la **comisión por venta** en Shopify.
- **El truco de producto que copiamos:** su certificado sube de nivel ("COA+") cuando ligas un chip físico a la obra. La página **enseña el nivel de confianza**. Brai hace lo mismo: la página de la obra dice qué capas tiene (sello, fotos huella, dueño reclamado).
- **Su debilidad:** todo es "hazlo tú mismo", en inglés, con la palabra blockchain al frente. El artista mexicano promedio no va a configurar Shopify.

### Tagsmart: la prueba de que se puede cobrar por obra
- Cobran **de 20 a 120 libras por obra** (unos 500 a 3,000 MXN) y el software es gratis. Es un servicio administrado, igual que el nuestro.
- **Lección:** el mercado ya acepta pagar **por obra registrada**. Cobrar por obra se siente justo para el artista: paga cuando vende, no cada mes.
- Eso abre la **Oferta B** (ver `OFERTA.md`).

### Artwork Archive: el sustituto real de "saber quién tiene mi obra"
- Por 8 a 24 USD al mes (150 a 450 MXN) el artista ya puede llevar inventario y lista de compradores.
- **Esto es lo que nos va a preguntar un profesor de Mate:** "¿por qué pagaría 990 si hay algo de 300?". Respuesta honesta: en Artwork Archive **el artista captura los datos a mano**; en Brai **el comprador se registra solo** al reclamar su obra, y la obra se lleva su historia pegada. Si esa diferencia no le importa al artista, perdemos. Se valida en la entrevista.

### Arteïa: el club ya existe en el mundo de lujo
- Al tocar el chip, el dueño entra a un "VIP Room" privado. Es nuestro **club de coleccionistas**, pero para casas de subasta.
- **Lección:** la idea del club no es locura nuestra; lo hace alguien que le vende a subastas en París. Sirve para el pitch de Innovación.

### Startbahn: que pague un patrocinador, no el artista
- Una fundación japonesa compró 3,000 sellos y los **regaló** a artistas que ella eligió.
- **Lección para México:** el artista tiene poco dinero, pero las **galerías, escuelas de arte, festivales y programas de cultura** sí tienen presupuesto para "apoyar artistas". Canal a explorar después del 26 nov: un patrocinador paga 20 kits y los regala.

### Hahnemühle: el registro viaja con un producto físico
- Un fabricante de papel mete el registro dentro de algo que el artista ya compra.
- **Lección:** distribución por tiendas de arte (papelerías de bellas artes en Guadalajara). Idea para la diapositiva de crecimiento, no para ahora.

### INDAUTOR: no es competencia, es aliado
- Registrar una obra en INDAUTOR prueba **quién la hizo**, no **quién la tiene**. Brai no lo sustituye.
- En la página del artista se puede mostrar "obra registrada también en INDAUTOR" si el artista lo hizo. Suma autoridad sin costarnos nada.

---

## 3. Hallazgo incómodo: el derecho de reventa vale menos de lo que pensábamos

Lo usábamos como argumento fuerte. Los datos:

- INDAUTOR publicó el esquema en el DOF (19 ene 2023, vigente desde el 20 ene 2023): **4% si la obra se revende en hasta 50,000 MXN**, 3% de 50,001 a 200,000, 2% de 200,001 a 500,000, 1.5% arriba de 500,000.
- **Solo aplica** a reventas en **subasta pública, en un establecimiento mercantil o con un comerciante o agente** de por medio. **Una reventa entre dos particulares no entra.**
- Se cobra a través de una sociedad de gestión colectiva, que puede quedarse con el **15%** de administración.

**Cuenta:** obra revendida en 12,000 MXN en una galería → 4% = 480 → menos 15% = **408 MXN para el artista.**

**Conclusión:** el derecho de reventa **no paga Brai**. Se queda como beneficio secundario ("te enteras cuando tu obra cambia de dueño"). El argumento de venta sigue siendo **volver a venderle a quien ya te compró**. Ya estaba prohibido prometer montos (`OFERTA.md`); ahora sabemos por qué.

---

## 4. Hallazgo bueno: el sello seguro ya no es caro

Pensábamos que un NTAG 424 DNA (el chip que genera una firma nueva en cada toque y no se puede copiar) costaba 46 a 92 MXN. Precio real en una tienda especializada europea (Shop NFC, oct 2026):

| Chip | Precio por pieza | En pesos (supuesto 21 MXN por euro) |
|---|---|---|
| NTAG 424 DNA, sticker 22 mm | 0.88 EUR (50 piezas) a 0.49 EUR (8,000) | **~18.50 MXN** en lote de 50 |
| NTAG 424 DNA, sticker 29 mm | 1.09 EUR | ~23 MXN |
| NTAG213 en MercadoLibre | 2.40 a 3.40 MXN (lote de 100) | |

Falta sumar envío desde Italia (`?`, cotizar) y posible impuesto de importación (`?`).

**Traducción:** por **~15 MXN más por obra**, la promesa pasa de "registro de propiedad" a "y además **este sello es el original**". Eso cambia la decisión 8 (ver `DECISIONES.md`, 31 oct). El backend ya trae la verificación lista (`app/supabase/functions/sello/`).

---

## 5. Dónde gana Brai (y dónde no)

| | Brai gana | Brai pierde |
|---|---|---|
| Idioma y cercanía | Español, en persona, en Guadalajara | |
| Ritual | Tarjeta firmada a mano y raspadita en la entrega | |
| Datos del comprador | Los captura el comprador al reclamar, no el artista | |
| Precio mensual | | 990 MXN contra 150 a 550 MXN de software hazlo tú mismo |
| Marca y confianza | | Verisart tiene +50,000 creadores. Nosotros, cero casos. **Por eso el caso fundador vale oro.** |
| Escala | | Cada setup son ~8 horas en persona. Eso no escala sin contratar. |

---

## 6. Qué cambia por esta investigación
1. **Oferta B por obra** para probar en la entrevista junto a la actual (`OFERTA.md`).
2. **NTAG 424 DNA pasa a la Expo** como sello oficial si llegan a tiempo (`DECISIONES.md`).
3. **La página de la obra muestra sus capas de confianza**, como el COA+ de Verisart.
4. **El derecho de reventa baja a beneficio secundario** en todo el copy.
5. **Canal futuro:** patrocinador que regala kits a artistas (modelo Startbahn).

## Fuentes
- Verisart, planes y precios: [verisart.com/pricing](https://verisart.com/pricing), [Shopify app pricing](https://help.verisart.com/en/articles/6303087-verisart-shopify-app-pricing-and-limits), [NFC ligado a certificados](https://help.verisart.com/en/articles/8899434-linking-nfc-tags-to-certificates), [productos impresos](https://help.verisart.com/en/articles/5772715-what-are-secure-printed-products).
- Tagsmart: [Pricing & Payment](https://tagsmart.helpscoutdocs.com/article/72-pricing), [artnet, precios por tag](https://news.artnet.com/art-world/dna-art-forgery-954971), [Seedrs](https://www.seedrs.com/tagsmart).
- Artwork Archive: [Capterra, precios 2026](https://www.capterra.com/p/169087/Artwork-Archive/pricing/).
- Arteïa: [Tezos, Millon y Arteïa](https://spotlight.tezos.com/leading-auction-house-millon-to-use-arteia-and-tezos-blockchain-to-authenticate-art-sales/).
- Startbahn: [Bijutsu Techo, lanzamiento de Startbahn Cert.](https://bijutsutecho.com/magazine/news/headline/21573).
- Hahnemühle: [My Art Registry](https://www.hahnemuehle.com/es/digital-fineart/my-art-registry.html).
- Otros: [NFCW, Fine Art Ledger](https://www.nfcw.com/?p=58091), [Ixkio y Mahajati](https://www.nfcw.com/2023/03/06/382289/mahajati-picks-ixkio-to-authenticate-artworks-with-nfc/), [markmy](https://alternativeto.net/software/markmy/about/).
- INDAUTOR registro de obra: [TramiTeca, tarifa 2026](https://www.tramitecadigital.com/?p=4753) (blog, confirmar en el DOF).
- Derecho de participación: [Secretaría de Cultura](https://www.gob.mx/cultura/prensa/el-indautor-da-a-conocer-el-esquema-tarifario-del-derecho-de-participacion-a-favor-de-las-personas-artistas-visuales), [Uhthoff](https://uhthoff.com.mx/en/nuevas-obligaciones-para-revendedores-de-obras-entendiendo-el-acuerdo-publicado-por-indautor-respecto-al-esquema-tarifario-del-derecho-de-seguimiento/), [DOF 19 ene 2023](https://dof.gob.mx/index_111.php?year=2023&month=01&day=19).
- NTAG 424 DNA: [Shop NFC 22 mm](https://shopnfc.com/en/nfc-stickers/487-nfc-stickers-ntag424-dna-d22mm.html), [Shop NFC 29 mm](https://shopnfc.com/en/nfc-stickers/313-nfc-stickers-ntag424-dna-29mm.html).
