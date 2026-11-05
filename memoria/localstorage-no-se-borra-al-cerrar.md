---
name: localstorage-no-se-borra-al-cerrar
description: "localStorage sigue ahí al cerrar la pestaña (sessionStorage no): documenta la persistencia según la API que usa el código, nunca de memoria"
---

`app/README.md` decía que los reclamos de la demo "se borran al cerrar la pestaña", pero `src/data/demo.ts` los guarda en `localStorage`, que persiste hasta que alguien lo borra. Se cambió a `localStorage` a propósito (para que el panel vea lo que se reclamó en otra pestaña) y la documentación se quedó con lo anterior.

- `sessionStorage`: muere al cerrar la pestaña. `localStorage`: se queda en ese navegador.
- Antes de escribir "se borra" o "no se guarda", busca en el código qué API se usa (`grep -n "Storage" src`).
- Si cambias de una a otra, cambia en el mismo commit cada texto que lo describe (README, `/demo`, aviso de privacidad).
