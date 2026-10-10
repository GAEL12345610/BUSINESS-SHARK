---
name: ui-frontend-brai
description: "Construye la UI de Brai (landing, página de la obra, panel del artista) para que no se vea hecha por IA. Prohibiciones duras más dos direcciones: EDITORIAL (landing y página de la obra) o PRODUCTO (panel del artista). Gatillos: diseña la interfaz, arma la pantalla, que no parezca de IA, la UI se ve genérica."
---

# UI Frontend Brai: buen gusto por defecto

> **La marca manda.** Color, tipografía y logo salen de `brand/BRAND.md` y `brand/kit.html`. Esta skill es sobre *gusto*, no sobre identidad. Si algo de aquí choca con la marca, gana la marca.

## Paso 0: elige dirección (obligatorio, no mezcles)

| | **EDITORIAL** | **PRODUCTO** |
|---|---|---|
| Para | Landing de Brai, página de la obra (cédula), página del artista | Panel del artista, registrar obra, transferir |
| Tipografía | Fraunces en títulos + Schibsted Grotesk en texto + IBM Plex Mono en ficha | Schibsted Grotesk sola + IBM Plex Mono en IDs y fechas |
| Color | Lienzo `#F6F1EA`, tinta, terracota como acento | Blanco y lienzo, tinta, terracota botón como único acento |
| Densidad | Baja: mucho aire, una idea por bloque | Media: la información manda |
| Movimiento | Fundidos suaves de 600 ms | Mínimo; respuesta inmediata al tocar |

**Serif en un formulario del panel es un error. Sans sola en la página de la obra la aplana.**

## Prohibiciones (las dos direcciones)

1. **Nada de lila ni degradados neón.** Ni glassmorphism.
2. **Un solo acento: terracota.** El dorado SOLO aparece en el momento "obra registrada". Nunca dorado como texto.
3. **Nada de Inter, Roboto ni Open Sans.** Las fuentes son las de `brand/BRAND.md`.
4. **Nada de `shadow-md/lg/xl`.** Bordes de 1 px o sombra ultra difusa (opacidad menor a 0.05).
5. **Nada de emojis** en UI, títulos ni `alt`. Íconos de UNA sola librería (Lucide o Phosphor).
6. **Nada de relleno genérico:** ni "John Doe", ni "Lorem ipsum". Nombres y obras creíbles, marcados como ejemplo.
7. **Nada de copy de IA:** "Eleva", "Impulsa", "Revoluciona", "De nueva generación". Puntuación humana: sin guion largo, sin puntos suspensivos, sin barra entre palabras.
8. **Nunca negro absoluto** para texto: tinta `#2B2622`.
9. **Nunca `h-screen`.** Siempre `min-h-[100dvh]`.
10. **Nada de "todo es una card".** Separa con espacio o un borde superior fino.
11. **Rompe el centro.** Alinea a la izquierda; centrado solo en la portada.
12. **Mobile first.** El 100% de los escaneos NFC pasan en un celular: diseña a 390 px y luego crece.

## Reglas de construcción

- **Dependencias:** antes de importar una librería, lee `package.json`. Si no está, primero `pnpm add <paquete>`. **Nunca `npm`.** El código vive en `C:\dev\brai`, fuera de OneDrive.
- **Stack:** React + Vite + Tailwind + Supabase, desplegado en Vercel. Es SPA, no Next.js.
- **Estados:** skeletons, no spinners. Estados vacíos con texto útil.
- **Formularios:** label arriba del input, alineado a la izquierda. El código de dueño se escribe en un input grande, monoespaciado, sin autocorrector.
- **Accesibilidad:** botones reales (`<button>`), contraste AA (los pares ya auditados están en `brand/BRAND.md`).
- **Rendimiento:** la referencia es `vercel-react-best-practices` (ignora sus reglas de Next).

## Protocolo

1. Di la dirección en voz alta antes de escribir código.
2. Toma los tokens de `brand/kit.html` (`:root`), no inventes hex.
3. Espaciado grande primero, luego contenido.
4. Tipografía completa antes de detallar componentes.
5. Revisa las 12 prohibiciones contra lo que escribiste. La 2 y la 6 son las que más se cuelan.
