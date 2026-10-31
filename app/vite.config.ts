import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Dos páginas: la landing (index.html, HTML crudo que leen Google y los bots de IA)
// y la app (app.html, React) que atiende /o, /a y /panel.
// En Vercel lo mismo lo hacen los rewrites de vercel.json.
const RUTAS_APP = /^\/(o|a|panel)(\/|$|\?)/;

function rutasDeLaApp(): Plugin {
  const reescribir = (req: { url?: string }, _res: unknown, next: () => void) => {
    if (req.url && RUTAS_APP.test(req.url)) req.url = "/app.html";
    next();
  };
  return {
    name: "brai-rutas-app",
    configureServer(server) {
      server.middlewares.use(reescribir);
    },
    configurePreviewServer(server) {
      server.middlewares.use(reescribir);
    },
  };
}

export default defineConfig({
  plugins: [rutasDeLaApp(), react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        landing: resolve(__dirname, "index.html"),
        app: resolve(__dirname, "app.html"),
        privacidad: resolve(__dirname, "privacidad.html"),
      },
    },
  },
});
