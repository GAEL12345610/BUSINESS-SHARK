---
name: service-role-nunca-en-vite
description: "Nada con prefijo VITE_ salvo la URL y la anon key de Supabase; la service_role jamás en el frontend. Revisa el bundle después de publicar"
---

Todo lo que lleve `VITE_` termina en texto plano en el navegador. La `service_role` se salta todo el RLS: si se filtra, cualquiera lee y borra todo.

Checklist después de publicar (2 min):
1. Baja el JS de la página publicada (en DevTools, pestaña Network, el archivo `index-*.js`).
2. Busca el JWT de Supabase y decodifícalo: debe decir `"role":"anon"`. Si dice `service_role`: **STOP**, rota las llaves en Supabase y vuelve a publicar.
3. El panel de Supabase muestra las llaves juntas: es facilísimo copiar la equivocada. Un deploy verde no lo detecta.
