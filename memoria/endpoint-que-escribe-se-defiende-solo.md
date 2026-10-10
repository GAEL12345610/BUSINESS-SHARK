---
name: endpoint-que-escribe-se-defiende-solo
description: "Cada función en app/api que escribe datos o gasta dinero valida auth adentro, falla cerrada y saca el usuario del token, nunca del body"
---

En una SPA no hay servidor que proteja rutas. Cada archivo de `api/` se defiende solo:
1. Rechaza métodos ajenos (405).
2. Auth **fail-closed**: si falta el secreto o el token, 500 o 401. Nunca dejar pasar.
3. Límite de intentos en lo público (reclamar obra: máximo 5 por hora por obra).
4. CORS específico, nunca `*` en algo que escribe.
5. El usuario sale del JWT verificado. Nunca confíes en un `owner_id` o `email` que mande el navegador.
