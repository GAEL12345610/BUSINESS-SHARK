# Demo honesta: qué dice la app de sí misma y cómo se protege

**Desde el 5 nov 2026**, publicado en `braiart.vercel.app` el 6 nov 2026. Lista que ve el visitante: la página `/demo` (`app/src/pages/Demo.tsx`). Este archivo es para el equipo: por qué existe, qué se cambió y qué prueba que no se rompa.

## La regla
La app publicada **no tiene backend**. Mientras eso sea cierto, cada página dice que es una demo, que las personas son ficticias y que nada sale del navegador. **Si un día se conecta Supabase, se cambia el aviso y `/demo` en el mismo commit. No se borra el aviso antes.**

## Qué se encontró y qué se hizo

| Hallazgo (auditoría del 5 nov) | Estaba en | Qué se hizo |
|---|---|---|
| El banner de Lucía decía "todavía no registra obras" y su obra decía "Registrada por el artista" con fecha y dueño | `Obra.tsx`, `demo.ts` | Lucía queda rotulada **ficticia** en banner, encabezado, bio, eventos (empiezan con "Ejemplo:") y panel |
| `/entrar` mandaba al panel como si fuera un login | `App.tsx` | `/entrar` dice "Todavía no hay cuentas" (`Entrar.tsx`). El botón de la landing dice "Panel de ejemplo" |
| El formulario de reclamar pedía "Tu correo" y aceptaba cualquiera | `Reclamar.tsx`, `demo.ts` | Solo acepta correos `@example.com` (dominio reservado, RFC 2606). Viene uno escrito |
| El aviso de privacidad hablaba de Supabase y de `hola@brai.art`, que no existen | `public/privacidad.html` | Dice lo que pasa hoy (nada sale del navegador). El texto para la versión real queda como **borrador no vigente** |
| "Dos ventas extra pagan Brai" y "Se paga con N ventas extra" | `Landing.tsx`, `Recorrido.tsx` | Cambiado a "equivale al precio de venta de N obras", con aviso de que es bruto, ilustrativo y no causal. La cifra "1 venta paga Brai" se cambió por un dato con fuente (StatCounter) |
| Precio sin estado | Landing, recorrido | A = "Precio publicado, sin validar". B = "Alternativa en prueba" |
| "Mandar" correo a coleccionistas | `Panel.tsx` | "Simular envío", y el resultado dice que no se mandó nada |
| "El código sirve una sola vez" sin aclarar que el de la demo es público | Reclamar, recorrido, landing, impresión | Dicho en cada lugar. La hoja de impresión pone DEMO en la tarjeta y el sello |
| La huella parecía prueba de autenticidad | `Obra.tsx` | "Huella de muestra calculada en tu navegador: no prueba autenticidad ni quién es el dueño legal" |
| Éxito del reclamo: "Esta obra ya es tuya" | `Reclamar.tsx`, `Obra.tsx` | "Así se ve cuando la obra es tuya", "Simulación: la reclamaste en este navegador" |
| README decía que los reclamos se borran al cerrar la pestaña | `app/README.md` | Corregido: `localStorage` persiste hasta Reiniciar demo |
| El recorrido personalizado (`?para=Nombre`) con un nombre real habría mostrado "X es una artista ficticia" | `Obra.tsx`, `demo.ts` | Con nombre personalizado el aviso dice "demo personalizada" y no "ficticia" (`ES_FICTICIA`) |
| CTA principal llevaba a una obra suelta; el recorrido de 5 minutos estaba escondido | Landing | CTA principal: "Recorrer la demo en 5 minutos". Obra y panel tienen "Volver al recorrido" |
| La raspadita no se podía usar con teclado | `interaccion.tsx` | Se enfoca con Tab y se revela con Enter o espacio |
| Texto chico con `tinta/60` y `tinta/50` (3.9:1) y kicker verde sobre arena (4.3:1) | Varias páginas | Subidos a `tinta/70` y tinta, AA aproximado |
| Kit de marca con versiones distintas (v2.2, v2.3, v2.4) | `/marca`, `brand/kit.html`, `BRAND.md` | Todo dice v2.4 |

## Lo que prueba que no vuelva
| Prueba | Qué falla si alguien rompe la regla | Archivo |
|---|---|---|
| `pnpm test` (34 pruebas) | Correos reales aceptados, eventos ficticios sin "Ejemplo", dueños o fotos inventados en el modo José Luis, frases prohibidas en `src/` o en los materiales de reunión, `/entrar` como login, aviso de DEMO desmontado | `app/pruebas/*.test.ts` |
| `node app/scripts/e2e/recorrido.cjs <carpeta>` | Recorrido completo en un iPhone 13 emulado: aviso, CTA, raspadita con teclado, correo real rechazado, reclamo simulado, panel, `/entrar`, `/demo`, Reiniciar demo, modo José Luis, sin scroll horizontal, cero peticiones a otros dominios y cero errores de consola. Necesita `pnpm preview` corriendo | `app/scripts/e2e/` |
| `node app/scripts/e2e/contraste.cjs` | Modo `?para=Nombre` sin "ficticia" y contraste aproximado AA en 8 rutas | `app/scripts/e2e/` |
| `pnpm build` | Al final corre `scripts/verificar-dist.mjs`: si el HTML publicado no trae el aviso de DEMO, el CTA, el estado del precio o trae `hola@brai.art`, el build falla y Vercel no publica | `app/scripts/verificar-dist.mjs` |

Las pruebas se comprobaron metiendo el defecto a propósito (aceptar Gmail, volver a "Ver una obra registrada"): fallaron, y al quitarlo pasaron.

## Lo que este cambio NO resuelve
- La demo sigue sin backend, sin login, sin envío de correos y sin NFC. Solo dice la verdad sobre eso.
- El modo José Luis (`/jose-luis`, DECISIONES #42) sigue publicado. Ahora dice que él no lo revisó ni aprobó, y se puede apagar con `VITE_DEMO_JOSE_LUIS=0` (`docs/DEMO_JOSE_LUIS.md`). Si se apaga o no lo decide el equipo con un adulto (`docs/DECISIONES.md`, propuestas del 5 nov).
- Contraste: se corrigió texto chico a 3.9:1 y un kicker a 4.3:1; el chequeo automático aproximado pasa en 8 rutas (no incluye `/marca` ni `/imprimir`). **No** es una auditoría formal. Lector de pantalla y celulares reales: sin probar. Solo un iPhone 13 emulado en Chromium.
