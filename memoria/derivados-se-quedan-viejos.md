---
name: derivados-se-quedan-viejos
description: "Cuando cambies un texto de la app, regenera TODO lo que sale de ella (clips, GIF, PNG, PDF) con visuales/regenerar-todo.sh; un video o GIF viejo sigue mostrando la promesa que ya quitaste"
---

El 5 nov 2026 se quitaron de la app "Entrar" y "Sabes que es de verdad", y se regeneró `visuales/`. Pero `pitch/clips/escena-sello-9x16.mp4` se graba con otro script y se quedó viejo. Peor: `visuales/generar.cjs` saca el GIF **de ese clip**, así que el GIF "nuevo" también traía los textos viejos. Se notó al ver un cuadro del animatic.

- Un archivo derivado (PNG, PDF, GIF, MP4) no se entera de que su fuente cambió.
- Usa `bash visuales/regenerar-todo.sh`: corre todo en el orden correcto (el clip va antes del GIF).
- Después, abre 2 o 3 archivos y míralos (`memoria/verificar-el-artefacto.md`).
