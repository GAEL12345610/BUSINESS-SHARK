---
name: excalidraw-diagram
description: Modela y crea diagramas de Excalidraw en JSON que hacen fuertes argumentos visuales. Úsala cuando el usuario requiera abstraer visualmente procesos, arquitecturas o conceptos lógicos.
---

# Creador de Diagramas de Excalidraw

Genera diagramas `.excalidraw` en formato JSON que **argumenten visualmente**, no solo muestren cajas encadenadas.

## Filosofía Principal

**Los diagramas deben ARGUMENTAR, no solo MOSTRAR.**

Un diagrama no es texto con formato. Es un argumento visual que muestra relaciones, causalidad y flujos que las puras palabras no pueden lograr. La forma DEBE expresar el mensaje o significado.

**La prueba isomorfa**: Si eliminaras todo el texto, ¿la estructura geométrica seguiría comunicando el objetivo y su arquitectura mental? Si no, re-diséñalo.
**La prueba de la enseñanza**: ¿Puede alguien aprender de tu diagrama estudiando partes concretas o simplemente está rotulando cajas en color base? Introduce casos reales.

## Documentos y Dependencias de Evidencia
(Excusivo para Diagramas Técnicos Reales, de Código o Servidores). Cuando modelas tecnología debes incluir casos reales. Añade cajas de fondos oscuros con estructuras de Datos JSON reales, bloques o pedazos de código demostrativo, eventos reales de carga y estados de servidor interactivos. El diagrama debe **reemplazar a la terminal o IDE** a la hora de enseñar y ejemplificar un concepto técnico.

## La Arquitectura Multinivel (Multi-Zoom)
Un diagrama útil permite varias vistas a escalas diversas de información:
1. **Flujo Cero:** Un macro flujo que demuestra el camino fácil y lineal, ej: `Entrada -> Sistema -> Base de Datos`.
2. **Límites de Grupos:** Regiones lógicas agrupadas (Cajas envolviendo zonas que digan "Frontend" y "Backend" separados).
3. **Casusa y Detalle (Zoom máximo):** Adentro de estas cajas grandes, inyectemos la información de Evidencia Técnica explicada en puntos previos con componentes reales informativos y técnicos asertivos.

No empaquetemos absolutamente todo. El **Texto Libre** flotante sirve y es utilísimo si la configuración tipográfica tiene colores acentuados o buen tamaño. 

## El Proceso de Construcción (Antes del JSON)

1. Mapea Mentalmente la necesidad técnica del cliente.
2. Define los Puntos Focales: Usa Nivel 0 y el Multi-Zoom para crear cajas generales. Si algo se dispara usa una forma de "Abanico" de fechas. Si algo colisiona o se sincroniza, usa formato "Convergencia" (embudo). Usa "Líneas de Ensamblaje" o un "Árbol" para jerarquía vertical y elipse o "Nubes" para memorias inestables del agente.
3. El Patrón debe ser único. Mezclar formas genéricas confunde.
4. Exporta las estructuras a JSON con sus coordenadas relativas.

## Directrices Extremas (LIMITACIONES) **Obligatorio para la Generación**

Dado que los archivos JSON pueden ser inusualmente amplios:
Jamás modelar de una ráfaga el 100% de la arquitectura en la primera iteración de chat. 
Si el diagrama es sustancial, debes **seccionarlo**. Escribe en tu primer intento la plantilla JSON vacía junto al Bloque (Sección 1) e interconecta con la sección 2 consecutivamente en posteriores pases. No generes todo el árbol y luego busques parchear y unir al final porque agotarás mis límites de Tokens de Output y el documento JSON quedará roto por recorte y error.

## Lenguaje y Formas

| Concepto | Forma a modelar | Importancia |
|--|--|--|
| Claves de información libre | **Ninguna (Texto libre)** | El espaciado tipográfico habla por sí solo |
| Líneas de tiempo | `Pequeños nodos esféricos o ellipsis (10px)` | Anclajes asertivos visuales. |
| Focos de orígenes/salidas | `Grandes círculos o elipses completas` | Claros identificadores de arranque/detención. | 
| Ramificaciones o nodos | Texto Libre con líneas conectadas | Limpieza. No encerrarlos en rectángulos pesados. |

**Atajos Visuales Elegantes:**
- Configura `roughness: 0` si buscas ser altamente profesional de sistemas, y usa `roughness: 1` si simulas brainstorming informales en pizarras dinámicas de startup.
- Siempre usa 100% de Opacidad `opacity: 100` y maneja las asimetrías usando líneas más tenues o densas (`strokeWidth`).
- Aglutina espacio libre: Usa espaciados generosos entre áreas dispares (hasta 200px) para dejar al ojo respirar en composiciones grandes.

## Validador geométrico (OBLIGATORIO)

Al salvar el `.excalidraw`, NUNCA des el trabajo por terminado a ciegas. El fallo
habitual es un recuadro pisando texto u otro objeto. Córrelo siempre:

```bash
python -X utf8 scripts/excalidraw_audit.py <tu-diagrama.excalidraw>
```

Sale con código 1 si hay defectos GRAVES. Si reporta algo, **desplaza las coordenadas
en el JSON y vuelve a correrlo** hasta que diga limpio. No entregues con graves abiertos.

Qué distingue:
- **Solape parcial** = defecto. Un elemento a medio salir de otro nunca se ve bien.
- **Contención total** = intencional (zona que agrupa, etiqueta dentro de su caja). No lo toca.
- **Conectores** (`arrow`, `line`, `freedraw`) se ignoran: cruzan cosas por diseño.
- **Texto ligado** (`containerId`) se juzga por si CABE, no por si se solapa.

### Antes de colocar algo nuevo en un board existente

Mide, no asumas que hay hueco al centro:

```bash
python -X utf8 scripts/excalidraw_audit.py <diagrama> --bandas
```

Reporta por franja horizontal hasta dónde llega lo ocupado y desde qué `x` hay aire.

### Ver el resultado

Los `.excalidraw` abren nativo en el editor (extensión `pomdtr.excalidraw-editor`).
Clic al archivo, no hace falta arrastrarlo a excalidraw.com.

Al embeber imágenes, el `fileId` debe ser `hashlib.sha1(png_bytes).hexdigest()` o el
visor sirve el PNG viejo desde caché.
