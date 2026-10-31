# Mesa de costos de Brai (para Viabilidad)

**Actualizada: 31 oct 2026** con cotizaciones reales (antes eran estimados del 10 oct).
**Tipo de cambio:** 18.80 MXN por USD (FIX de Banxico del 30 oct 2026: 18.7962). **21 MXN por EUR** es supuesto: confirmar con el banco antes de entregar.
Lo que dice `?` no se pudo cotizar en México todavía. **Antes del 26 nov alguien del equipo entra a MercadoLibre y llena los `?` con captura de pantalla.**

## 1. Costo de una obra registrada

### Versión 1: NTAG213 (los 50 stickers que ya tenemos)

| Pieza | Costo por obra | De dónde sale |
|---|---|---|
| Sticker NFC NTAG213 | **3.40 MXN** | MercadoLibre México: lotes de 100 entre 238 y 337 MXN (oct 2026). Tomamos el caro. |
| Etiqueta raspadita | **1.60 MXN** | MercadoLibre México: 300 etiquetas rascables en 477.80 MXN (también hay 300 en 119.82 con descuento). Tomamos el caro. |
| Etiqueta antidesprendible (VOID) para el sello | **~3.50 MXN** `?` | Referencia de MercadoLibre Argentina: 500 por 92 USD. Falta cotización en México. |
| Tarjeta de dueño impresa | **~5 MXN** `?` | Sin cotización mexicana. Opción barata: imprimir en casa en cartulina opalina. Pedir precio a 2 imprentas de Guadalajara. |
| QR impreso | **~1 MXN** | Se imprime en la misma hoja de etiquetas. |
| **Total por obra** | **~15 MXN** | Antes estimábamos ~20. |

### Versión 2: NTAG 424 DNA (sello que no se puede copiar)

| Pieza | Costo por obra | De dónde sale |
|---|---|---|
| Sticker NTAG 424 DNA 22 mm | **~18.50 MXN** | Shop NFC (Italia): 0.88 EUR por pieza en lote de 50. |
| Envío a México | `?` | Cotizar en el carrito de Shop NFC. Si es caro, buscar en AliExpress (~1.09 USD la pieza). |
| Resto (raspadita, VOID, tarjeta, QR) | ~11 MXN | Igual que la versión 1. |
| **Total por obra** | **~30 MXN + envío** | |

**El dato que cambia todo:** el sello seguro cuesta ~15 MXN más que el barato, no 40 a 90 como creíamos. Ver `COMPETENCIA.md` sección 4.

## 2. Costos fijos

| Concepto | Prototipo (concurso) | Comercial (con clientes que pagan) |
|---|---|---|
| Hosting web (Vercel) | 0 (plan Hobby) | **376 MXN al mes** (Pro, 20 USD). **Hobby no permite uso comercial.** |
| Base de datos (Supabase) | 0 (plan Free) | **470 MXN al mes** (Pro, 25 USD por organización, incluye 10 USD de cómputo). **Free se pausa tras 7 días sin uso.** |
| Dominio `brai.art` | **~49 MXN** el primer año (Porkbun, 2.60 USD con cupón) | **~395 MXN al año** (renovación ~21 USD) |
| **Total** | **~49 MXN al año** | **~10,550 MXN al año (~880 al mes)** |

Costo total del prototipo, con impresión: **menos de 500 MXN.** Si compramos 50 NTAG 424 DNA para la Expo: +925 MXN más envío.

## 3. Ingreso por cliente: dos ofertas

La **Oferta A** es la vigente (`OFERTA.md`). La **Oferta B** es la que vamos a probar en las entrevistas porque la competencia cobra por obra (ver `COMPETENCIA.md`).

Supuesto: el artista registra **10 obras al año** (5 en el arranque y 5 después en el año 1).

| | Oferta A (setup + mensualidad) | Oferta B (por obra) |
|---|---|---|
| Cómo se cobra | 7,500 de setup (hasta 20 obras) + 990 al mes | 2,500 de arranque (incluye 5 obras) + 450 por obra adicional, sin mensualidad |
| **Año 1** | **19,380 MXN** | **4,750 MXN** |
| **Año 2 en adelante** | **11,880 MXN** | **4,500 MXN** |
| % de lo que vende el artista (10 obras de 12,000) | 16% el año 1, 10% después | 4% el año 1 y después |
| Materiales (versión 1) | ~150 al año | ~150 al año |

**La verdad sin suavizar:** B es mucho más fácil de vender (4% se parece a lo que ya pagan en comisiones de tarjeta, 16% no). Pero con B necesitas **4 veces más clientes** para ganar lo mismo. Ninguna de las dos está validada: la entrevista decide.

## 4. Escenarios del año 1 (modo comercial)

Costo fijo comercial: 10,550 MXN al año.

| Clientes | Oferta A ingreso | Oferta A utilidad | Oferta B ingreso | Oferta B utilidad |
|---|---|---|---|---|
| 1 | 19,380 | **8,680** | 4,750 | **-5,950** |
| 5 | 96,900 | **85,600** | 23,750 | **12,450** |
| 15 | 290,700 | **277,900** | 71,250 | **58,450** |

(Utilidad = ingreso − 10,550 − materiales de 150 por cliente.)

**Punto de equilibrio:**
- Oferta A: **1 cliente** cubre la infraestructura (990 > 880 al mes).
- Oferta B: **3 clientes** en el año 1 (3 × 4,750 = 14,250 > 10,550 + 450).

**Lo que NO está contado (y un buen profesor lo va a preguntar):** las horas del equipo. Un setup son ~8 horas (fotos, fichas, grabar sellos, imprimir). 5 clientes = ~40 horas. Si a esas horas les ponemos un precio de 100 MXN la hora, son 4,000 MXN: con Oferta A sigue ganando, con Oferta B se come un tercio de la utilidad.

## 5. Tamaño del mercado (para la diapositiva de crecimiento)

- **8,870** pintores, dibujantes artísticos, escultores y escenógrafos en Jalisco; **127,000** en México (DataMéxico, ENOE 2025-T1).
- *Hipótesis sin validar:* si el 2% cumple el perfil de cliente (vende 10+ obras al año a 10k+), son **~177 artistas en Jalisco**. Con Oferta A, año 1: ~3.4 millones MXN. Con Oferta B: ~840,000 MXN. Es un techo teórico, no una meta.
- 69% de los coleccionistas ya compró directo al artista, ~19 a 20% de su gasto (Art Basel y UBS, 2025 y 2026): el canal donde vive Brai crece.

## Fuentes
- Tipo de cambio: [Milenio, FIX 30 oct 2026](https://www.milenio.com/negocios/precio-del-dolar-hoy-30-octubre-2026-a-cuanto-cotiza-en-vivo-atm), [Banxico](https://www.banxico.org.mx/apps/dao-web/4/52/Fix48.html).
- NTAG213: [MercadoLibre, sticker NTAG213](https://listado.mercadolibre.com.mx/sticker-ntag213), [nfc ntag213](https://listado.mercadolibre.com.mx/nfc-ntag213).
- Raspadita: [MercadoLibre, 300 etiquetas rascables](https://articulo.mercadolibre.com.mx/MLM-3325917384--300-etiquetas-adhesivas-rascables-rasca-y-gana-sticker-_JM), [etiquetas rascables](https://listado.mercadolibre.com.mx/etiquetas-rascables).
- VOID (referencia): [500 etiquetas void](https://latinafy.com/products/500-security-labels-void-30x22-eggshell-holograms/).
- NTAG 424 DNA: [Shop NFC 22 mm](https://shopnfc.com/en/nfc-stickers/487-nfc-stickers-ntag424-dna-d22mm.html), [AliExpress](https://www.aliexpress.us/item/3256812450805762.html).
- Supabase y Vercel: [JetAdmin, Supabase 2026](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/), [JetAdmin, Vercel vs Supabase](https://www.jetadmin.io/blog/vercel-vs-supabase/amp/), [Vercel, plan Hobby](https://vercel.com/docs/plans/hobby).
- Dominio: [domainoffer, Porkbun .art](https://domainoffer.net/tld/art/porkbun), [comparador .art](https://domainoffer.net/price-compare-art).
- Mercado: [DataMéxico, subgrupo 216](https://www.economia.gob.mx/datamexico/es/profile/occupation/pintores-disenadores-y-dibujantes-artisticos-escultores-y-escenografos), [Survey of Global Collecting (Ocula)](https://ocula.com/magazine/art-news/2025-art-basel-ubs-survey-global-collecting/).
