---
name: pnpm-fuera-de-onedrive
description: "El código JS vive en C:/dev/brai, nunca en OneDrive; siempre pnpm, nunca npm, con packageManager y onlyBuiltDependencies fijados"
---

OneDrive sincroniza decenas de miles de archivos de `node_modules` y rompe los symlinks de pnpm (causa del `EPERM` de Vite).

- Proyecto nuevo: `cd C:\dev\brai` y `pnpm create vite@latest app`.
- En `package.json`: `"packageManager": "pnpm@<versión>"` y `"pnpm": { "onlyBuiltDependencies": ["esbuild"] }`. pnpm 10 no corre los `postinstall` de las dependencias y solo avisa.
- Nunca dejes `package-lock.json` junto a `pnpm-lock.yaml`: Vercel puede elegir el gestor equivocado.
- Dependabot: alertas sí, PRs automáticos no (con pnpm fallan en bucle).
