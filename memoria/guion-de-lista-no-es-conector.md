---
name: guion-de-lista-no-es-conector
description: "Al revisar la regla de puntuación con una regex, quita antes las viñetas de lista ('- ', '> - [ ]'): ese guion no es un conector y la prueba falla en falso"
---

El 5 nov 2026 la prueba de puntuación de `app/pruebas/claims.test.ts` buscaba `\S - \S` para atrapar el guion usado como conector. Falló con `borradores-adulto.md` por una lista dentro de una cita (`> - [ ] Mi nombre.`): el `>` cuenta como carácter y la viñeta parecía un conector.

- Antes de aplicar la regex, quita al inicio de cada línea los `>` de cita y los marcadores de lista (`- `, `* `, `- [ ] `).
- Después del arreglo, mete un guion conector de verdad y confirma que la prueba todavía falla (`memoria/verificar-el-artefacto.md`).
