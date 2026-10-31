---
name: scroll-suave-engana-pruebas
description: "Con scroll-behavior smooth, un script que hace scrollTo no llega a donde crees; en pruebas usa behavior instant antes de concluir que algo no aparece"
---

Al revisar la landing con capturas, media página salió en blanco. Parecía el bug de `animacion-de-entrada-con-barrido`, pero no: el CSS tiene `scroll-behavior: smooth` y el script de prueba hacía `scrollTo` cada 60 ms. Cada scroll se animaba y el siguiente lo interrumpía, así que la página nunca bajó.

- En scripts de prueba: `window.scrollTo({ top: y, behavior: 'instant' })`.
- Antes de "arreglar" algo que no aparece, prueba el caso real: salta al final y cuenta cuántos `.revela` siguen sin `.visible`. Si es 0, el fallo era de la prueba.
