---
name: gitignore-sin-comentarios-inline
description: "En .gitignore el # solo comenta al inicio de la línea; un comentario al final rompe la regla en silencio. Verifica con git check-ignore -v"
---

```
app/.env.local   # esto NO ignora nada
```
El patrón incluye el comentario y no coincide con ningún archivo. No da error: simplemente no protege, y tu `.env` entra al siguiente commit.

- El comentario va en su propia línea, arriba.
- Verifica cada regla: `git check-ignore -v app/.env.local` debe imprimir la regla que lo ignora.
