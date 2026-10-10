---
name: animacion-de-entrada-con-barrido
description: "Las animaciones de aparecer al hacer scroll se hacen con un barrido, no solo con IntersectionObserver, o hay secciones que quedan invisibles"
---

El observer solo dispara si el elemento entra al viewport. Si alguien salta al final (ancla, flick en el celular), las secciones de en medio nunca reciben la clase y **se quedan en `opacity:0` para siempre**.

Solución: en cada scroll, revela todo lo que entró **o ya pasó** (`getBoundingClientRect().top < innerHeight * 0.92`). Y respeta `prefers-reduced-motion`.
