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
brand/             marca v2: BRAND.md, kit.html, logos SVG
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

## Pendientes ya

- [ ] Entrevista con José Luis Malo (con un adulto presente).
- [ ] Definir roles del equipo (`docs/CONCURSO.md`).
- [ ] Revisar el tipo de los 50 stickers NFC con NFC Tools.
- [ ] Cotizar en MercadoLibre: stickers antidesprendibles, raspadita, tarjetas.
- [ ] Confirmar con el profesor la fecha del infomercial.
- [ ] Publicar en Vercel: Root Directory `app`, preset Vite, sin variables.
- [ ] Correo normal del proyecto para "Quiero registrar mis obras" y el aviso de privacidad (hoy apunta a `hola@brai.art`, que no existe). Nunca el personal de un integrante.
- [ ] Comprar `brai.art` (~49 MXN el primer año en Porkbun) antes de grabar y bloquear el primer sello.
- [ ] Que un adulto lea el aviso de privacidad (`app/public/privacidad.html`).
- [ ] Permiso por escrito de José Luis Malo antes de publicar la demo con su nombre.
- [ ] En la entrevista, presentar Oferta A y B y anotar cuál escoge el artista.
- [ ] Llenar los `?` de `docs/COSTOS.md` con captura de MercadoLibre: etiquetas VOID y tarjetas.
- [ ] Cotizar el envío de 50 NTAG 424 DNA (Shop NFC o AliExpress).
- [ ] Crear el proyecto en Supabase y correr `app/supabase/migrations/` en orden (`docs/PROTOTIPO.md`), con un adulto.
- [ ] Grabar el infomercial (`pitch/infomercial_guion.md`) y asignar quién graba cada escena.
- [ ] Comprar etiquetas de raspadita y papel adhesivo para imprimir `/imprimir/7KQ2X`.
- [x] Subir los wireframes a `docs/wireframes/`.
