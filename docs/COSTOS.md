# Mesa de costos de Brai (para Viabilidad)

Fecha: 10 oct 2026. **Tipo de cambio supuesto: 18.5 MXN por USD** (actualízalo con Banxico antes de entregar). Lo marcado *estimado* hay que cotizarlo en México.

## 1. Costo de una obra registrada

| Pieza | Costo | Fuente |
|---|---|---|
| Sticker NFC NTAG213 | ~2 a 6 MXN | eBay: 50 piezas por ~4.99 EUR; Alibaba: 0.06 a 0.12 EUR al mayoreo. *Cotizar en MercadoLibre.* |
| Etiqueta de raspadita | ~1 a 3 MXN | *estimado, cotizar* |
| Tarjeta de dueño impresa | ~3 a 8 MXN | *estimado, cotizar en imprenta* |
| **Total por obra** | **~20 MXN (conservador)** | |
| NTAG 424 DNA (versión 2) | ~46 a 92 MXN | Elechouse: 2.50 a 5 USD por pieza |

## 2. Costos fijos

| Concepto | Prototipo (concurso) | Comercial (con clientes que pagan) |
|---|---|---|
| Hosting web (Vercel) | 0 (plan Hobby) | ~370 MXN al mes (Pro, 20 USD). **Hobby no permite uso comercial.** |
| Base de datos (Supabase) | 0 (plan Free) | ~463 MXN al mes (Pro, 25 USD). **Free se pausa tras 7 días sin uso.** |
| Dominio `brai.art` | ~70 MXN el primer año | ~390 MXN al año (renovación ~21 USD) |
| **Total** | **~70 MXN al año** | **~10,380 MXN al año** |

Prototipo: los 50 stickers ya están comprados. Costo total del prototipo, con impresión: **menos de 500 MXN** (estimado).

## 3. Ingreso por cliente

| | Año 1 | Año 2 en adelante |
|---|---|---|
| Setup | 7,500 | 0 |
| Mantenimiento (990 × 12) | 11,880 | 11,880 |
| **Total** | **19,380 MXN** | **11,880 MXN** |
| Materiales (20 obras del setup + ~10 nuevas al año) | ~600 | ~200 |

## 4. Tres escenarios del año 1 (modo comercial)

| Clientes | Ingreso | Costo fijo + materiales | Utilidad |
|---|---|---|---|
| 1 | 19,380 | 10,380 + 600 = 10,980 | **8,400** |
| 5 | 96,900 | 10,380 + 3,000 = 13,380 | **83,520** |
| 15 | 290,700 | 10,380 + 9,000 = 19,380 | **271,320** |

**Punto de equilibrio:** la infraestructura cuesta ~865 MXN al mes. **Un solo cliente pagando 990 al mes la cubre.**

**Lo que NO está contado (y un buen profesor lo va a preguntar):** las horas del equipo. Un setup estimado son ~8 horas (fotos, fichas, grabar sellos, imprimir). 5 clientes = ~40 horas.

## 5. Tamaño del mercado (para la diapositiva de crecimiento)

- **8,870** pintores, dibujantes artísticos, escultores y escenógrafos en Jalisco; **127,000** en México (DataMéxico, ENOE 2025-T1).
- *Hipótesis sin validar:* si el 2% cumple el perfil de cliente (vende 10+ obras al año a 10k+), son **~177 artistas en Jalisco**. Con todos a precio de año 1: ~3.4 millones MXN. Es un techo teórico, no una meta.
- 69% de los coleccionistas ya compró directo al artista, ~19 a 20% de su gasto (Art Basel y UBS, 2025 y 2026): el canal donde vive Brai crece.

## Fuentes
- [DataMéxico, subgrupo 216](https://www.economia.gob.mx/datamexico/es/profile/occupation/pintores-disenadores-y-dibujantes-artisticos-escultores-y-escenografos)
- [Vercel, plan Hobby](https://vercel.com/docs/plans/hobby) · [Supabase, límites del plan Free (JetAdmin)](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/)
- [Precios .art (domainoffer)](https://domainoffer.net/price-compare-art) · [NTAG 424 DNA (Elechouse)](https://www.elechouse.com/product/ntag424-dna-13-56mhz-white-pvc-nfc-card-42x26mm/) · [NTAG213 x50 (eBay)](https://www.ebay.de/itm/116812241108)
- [Survey of Global Collecting (Ocula)](https://ocula.com/magazine/art-news/2025-art-basel-ubs-survey-global-collecting/)
