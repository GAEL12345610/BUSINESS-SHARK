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
| **Precio** | Setup 7,500 MXN + 990 MXN al mes. Primer cliente: fundador, gratis a cambio de un caso documentado. |
| **Diferencia vs Verisart** | Ellos venden software para certificar. Nosotros, un ritual de entrega, hecho contigo, en español. |

## Cómo está organizado

```
CLAUDE.md          instrucciones para Claude Code (léelo primero)
docs/              todo lo del negocio
  ANALISIS.md        análisis con datos y fuentes
  DECISIONES.md      qué decidimos y por qué
  OFERTA.md          precio, cliente ideal, fundador, club
  COSTOS.md          mesa de costos (Viabilidad)
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
app/               la app: landing, obra, reclamar, artista, imprimir y la base de datos (ver app/README.md)
pitch/             guion y subtítulos del infomercial
```

## Para empezar a trabajar

1. Clona el repo **fuera de OneDrive**: `git clone <url> C:\dev\brai`.
2. Ábrelo en VS Code con Claude Code. Claude lee `CLAUDE.md` y las skills solo.
3. Ve la marca: abre `brand/kit.html` en el navegador.
4. Antes de decidir algo: `docs/DECISIONES.md`. Para afilar una idea: `/grill-brai`.

## Pendientes ya

- [ ] Entrevista con José Luis Malo (con un adulto presente).
- [ ] Definir roles del equipo (`docs/CONCURSO.md`).
- [ ] Revisar el tipo de los 50 stickers NFC con NFC Tools.
- [ ] Cotizar en MercadoLibre: stickers antidesprendibles, raspadita, tarjetas.
- [ ] Confirmar con el profesor la fecha del infomercial.
- [ ] Comprar `brai.art`.
- [x] Subir los wireframes a `docs/wireframes/`.
- [ ] Correo del equipo para "Quiero registrar mis obras" (hoy apunta a `hola@brai.art`, que no existe).
- [ ] Aviso de privacidad antes de guardar correos reales.
- [ ] Permiso por escrito de José Luis Malo antes de publicar la demo con su nombre.
- [ ] Crear el proyecto en Supabase y correr `app/supabase/schema.sql`.
- [ ] Grabar el infomercial (`pitch/infomercial_guion.md`) y asignar quién graba cada escena.
- [ ] Comprar etiquetas de raspadita y papel adhesivo para imprimir `/imprimir/7KQ2X`.
