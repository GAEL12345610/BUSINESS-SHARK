---
name: lint-de-frases-no-ve-el-contexto
description: "Una prueba que busca frases prohibidas no ve contradicciones de contexto: además, toma capturas de cada estado (antes y después de reclamar) y léelas"
---

El 5 nov 2026 `pruebas/claims.test.ts` pasaba en verde, pero la captura de la obra ya reclamada decía "Esta obra es tuya" sin aclarar que era una simulación. Ninguna frase prohibida, y aun así la página prometía de más.

- Un lint de texto solo encuentra lo que ya sabías buscar.
- Recorre el flujo en un navegador (Playwright) y **mira las capturas de cada estado**: vacío, con error, con éxito, con dueño.
- Cuando encuentres un hueco así, agrega la frase al lint para que no vuelva (se agregó `Esta obra es tuya\.`).
