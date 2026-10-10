---
name: verificar-el-artefacto
description: "Compilar o que un script termine sin error NO es verificar: abre lo que produjo y pregunta si tu prueba vería el fallo"
---

Un build verde, un deploy exitoso o un script sin error solo prueban que corrió. No que el resultado esté bien.

- **Verifica el artefacto:** abre la página publicada, toca el sello real, lee el archivo que salió.
- **¿Esta prueba vería el fallo?** Antes de fiarte de una comprobación, piensa qué error buscas y si esa prueba lo detectaría.
- **Verde una vez no prueba nada, rojo una vez tampoco.** Un error aislado justo después de publicar se repite antes de investigarlo.
- **Un detector que marca el 100% no encontró nada:** sospecha del detector.
- "No hay logs" no es prueba de que no pasó.
