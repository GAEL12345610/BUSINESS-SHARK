# Plan de piloto (borrador con huecos)

**No hay piloto acordado con nadie.** Este documento solo existe para que, si un artista dice que le interesa, el equipo y un adulto sepan qué falta decidir antes de prometer nada. Todo lo que dice `?` está pendiente.

## Qué queremos aprender
| Pregunta | Cómo se mediría | Meta | Dato hoy |
|---|---|---|---|
| ¿Los compradores reclaman su obra? | Obras reclamadas entre obras entregadas | ? | Sin datos |
| ¿El artista vuelve a escribirles? | Mensajes enviados desde el panel | ? | Sin datos |
| ¿Alguien vuelve a comprar? | Lo reporta el artista; no se puede atribuir a Brai | ? | Sin datos |
| ¿Qué opción de precio prefieren? | 2 de 3 artistas entrevistados (DECISIONES #26) | 3 entrevistas | 0 entrevistas |

Ninguna de estas metas está definida. Las define el equipo después de las primeras entrevistas, no antes.

## Alcance propuesto
| Concepto | Propuesta | Estado |
|---|---|---|
| Artistas | 1 a 3 fundadores (`docs/OFERTA.md`) | Ninguno ha aceptado |
| Obras por artista | 3 a 5 reales | ? |
| Duración | ? (los 3 meses de fundador son una propuesta) | Pendiente |
| Precio durante el piloto | Gratis para fundadores | Propuesta de `docs/OFERTA.md`; mes 4 con Opción B **por definir** |
| Fecha de inicio | ? | Antes, todo lo de "Bloqueos" |

## Bloqueos antes de usar una sola obra real
1. **Permiso por escrito** del artista, redactado y revisado por un adulto. No existe plantilla.
2. **Correo del proyecto** (no personal de un integrante, DECISIONES #37). No existe.
3. **Aviso de privacidad** real, revisado por un adulto. Hoy solo hay un borrador marcado como no vigente (`app/public/privacidad.html`).
4. **Base de datos conectada** y probada en producción (proyecto de Supabase creado por un adulto, `docs/PROTOTIPO.md`). Hoy las migraciones solo se probaron en un Postgres local.
5. **Login del artista** y panel conectado. No existe.
6. **Revisión de seguridad** con el agente `app-security-auditor` antes de guardar datos reales.
7. **Dominio `brai.art`** comprado antes de grabar o bloquear cualquier sello (regla 4).
8. **Materiales** (sellos, VOID, raspaditas, tarjetas) cotizados y comprados por un adulto. Costos en `docs/COSTOS.md`, con `?` por llenar.
9. **Quitar el aviso de DEMO** solo cuando todo lo anterior sea cierto, y cambiar la página `/demo` en el mismo commit.

## Quién decide qué
| Decisión | Quién |
|---|---|
| Si se hace un piloto y con quién | Equipo, con el adulto responsable |
| Texto del permiso y del aviso de privacidad | Adulto |
| Compras de materiales y dominio | Adulto |
| Precio final | Equipo, con lo que digan 3 artistas (DECISIONES #26) |
