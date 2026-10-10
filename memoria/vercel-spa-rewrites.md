---
name: vercel-spa-rewrites
description: "Toda SPA de Vite en Vercel necesita vercel.json con rewrite a index.html ANTES del primer deploy, o las subrutas dan 404"
---

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
Sin esto, `/` carga pero `/o/7KQ2X` da 404 de Vercel. Para Brai es crítico: **todos los sellos NFC apuntan a una subruta.**
