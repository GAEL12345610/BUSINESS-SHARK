---
name: commit-sin-push-no-es-respaldo
description: "Un commit sin push vive solo en tu disco; al cerrar, confirma que git log origin/main..HEAD sale vacío"
---

`git status` "clean" solo dice que no hay cambios sin commitear, no que estén en GitHub. `C:\dev\brai` no lo respalda OneDrive: **GitHub es la única red.**

```
git log origin/main..HEAD --oneline    # vacío = de verdad está subido
```
Si el repo está conectado a Vercel, push a `main` = deploy. Si el código nuevo necesita una variable de entorno, **primero la variable en Vercel, después el push.**
