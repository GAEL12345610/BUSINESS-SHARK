# Brai

**Cada obra sabe de dónde viene.**

Brai pone un sello NFC detrás de cada obra de un artista independiente. Al acercar el celular, cualquiera ve la historia de la obra, que la registró el propio artista y quién es su dueño. El artista se ve como una marca seria y nunca pierde de vista a quien le compró.

Proyecto para **Business Shark 8°**. Primera entrega: **26 de noviembre de 2026**.

---

## En 30 segundos

| | |
|---|---|
| **Problema** | El artista vende una obra y nunca vuelve a saber de ella: no puede volver a venderle a quien ya le compró ni cobrar su derecho de reventa (LFDA art. 92 bis). |
| **Solución** | Sello NFC + QR detrás del cuadro, tarjeta de dueño firmada a mano con código bajo raspadita, y una página de la obra tipo cédula de museo. |
| **Cliente** | Artista que vende obra original directo: 10+ obras al año a 10k+ MXN, o con audiencia propia. |
| **Precio** | En prueba: A (setup 7,500 + 990 al mes) contra B (2,500 de arranque + 450 por obra). Primeros 3: fundadores, gratis a cambio de un caso documentado. |
| **Diferencia vs Verisart** | Ellos venden software para certificar. Nosotros, un ritual de entrega, hecho contigo, en español. Ver `docs/COMPETENCIA.md`. |

## Cómo está organizado

```
CLAUDE.md          instrucciones para Claude Code (léelo primero)
docs/              todo lo del negocio
  ANALISIS.md        análisis con datos y fuentes
  DECISIONES.md      qué decidimos y por qué
  OFERTA.md          precio, cliente ideal, fundador, club
  COSTOS.md          mesa de costos (Viabilidad), cotizada
  COMPETENCIA.md     ingeniería inversa de Verisart, Tagsmart y otros
  SEGURIDAD_OBRA.md  cómo se protege una obra y cómo se graba un NFC
  PROTOTIPO.md       qué construimos y con qué
  CONCURSO.md        rúbrica, calendario, roles
  CLIENTES.md        artistas prospecto
  ENTREVISTAS.md     guiones
  wireframes/
brand/             marca: BRAND.md, kit.html, logos SVG
visuales/          TODO lo visual en PNG, PDF, PPTX y GIF (para la Chromebook)
memoria/           lecciones aprendidas, una por archivo
.claude/skills/    skills de Claude Code adaptadas a Brai
.claude/agents/    auditores de seguridad y rendimiento
app/               la app: landing, obra, reclamar, artista, imprimir y el backend de Supabase (ver app/README.md)
pitch/             guion y subtítulos del infomercial
```

## Para empezar a trabajar

1. Clona el repo **fuera de OneDrive**: `git clone <url> C:\dev\brai`.
2. Ábrelo en VS Code con Claude Code. Claude lee `CLAUDE.md` y las skills solo.
3. Ve la marca: abre `brand/kit.html` en el navegador.
4. Antes de decidir algo: `docs/DECISIONES.md`. Para afilar una idea: `/grill-brai`.

## Probar la app en 3 minutos
```
cd app
pnpm install
pnpm dev
```
Abre `http://localhost:5173`. Rutas y código de dueño de ejemplo en `app/README.md`.

## Qué falta
Todo lo pendiente, con quién lo hace y dónde, vive en **[`TODO.md`](TODO.md)**. Ese es el único lugar.

## Rutas de la app (mismo link de Vercel)
| Ruta | Qué es |
|---|---|
| `/` | Landing |
| `/o/7KQ2X` | Página de una obra de ejemplo (código de dueño `4K7P-9QX2`) |
| `/a/ejemplo` | Página de la artista de ejemplo |
| `/panel` | Panel del artista (ejemplo) |
| `/recorrido?para=Nombre` | Recorrido de 5 minutos para enseñárselo a un artista |
| `/marca` | Kit de marca vivo y la mascota Punto |
| `/imprimir/7KQ2X` | Tarjeta, sello y QR en tamaño real |
| `/privacidad` | Aviso de privacidad |
