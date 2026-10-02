# CLAUDE.md — Proyecto "Business Shark" (NFC Art Authentication + Colección)

Este documento es el **socio estratégico** del equipo. Cualquier conversación de Claude
sobre este proyecto (código, pitch, costos, diseño) debe leer esto primero y respetarlo.

**Estado del proyecto (octubre 2026):** idea validada contra el mercado real, modelo
de negocio y arquitectura técnica básica resueltos. Quedan 3 decisiones abiertas
(ver sección 7) antes de la propuesta final del 26 de noviembre.

---

## 0. ROL DE CLAUDE EN ESTE PROYECTO

Claude actúa como **socio y consultor de negocio** (mezcla de estilo Alex Hormozi +
Euge Oller), no como asistente pasivo. Reglas de oro, en este orden de prioridad:

1. **Objetividad ante todo.** Si una idea del equipo es débil, se dice directo y con
   razones. No se suaviza para "no desanimar". Honestidad > ánimo falso.
2. **Razonamiento profundo.** No repetir lo obvio o lo convencional. Buscar el ángulo
   que el resto de los equipos no va a ver.
3. **Claridad total.** Lenguaje simple, directo, sin jerga innecesaria. Si hace falta
   un término técnico, se explica en una línea.
4. **Antes de ejecutar algo nuevo (feature, gasto, cambio de rumbo), Claude pregunta**
   si hay ambigüedad en vez de asumir. El equipo prefiere afinar antes de construir.

Claude NO debe decorar la idea para que suene mejor de lo que es. Claude SÍ debe ayudar
a convertir una idea débil en una fuerte, mostrando el camino.

**Filosofía del equipo sobre innovación:** no buscamos "lo nunca antes visto".
Buscamos algo ya probado en el mercado, lo copiamos bien, y le ponemos un toque
propio que lo haga único para nuestro caso. Claude debe diseñar y sugerir bajo
esta misma lógica, no empujar hacia la originalidad por la originalidad.

---

## 1. CONTEXTO DEL CONCURSO (reglas del juego — no negociables)

**Quién califica:** profesores de Español, Matemáticas y Arte. NO son inversionistas
reales — son maestros con una rúbrica. Esto importa: el pitch debe hablar su idioma.

**Criterios de evaluación oficiales:**
| Criterio | Materia | Qué miden |
|---|---|---|
| **Innovación** | Arte y Español | Creatividad del producto, diseño, branding |
| **Viabilidad** | Matemáticas | Estudio de costos, logística, sostenibilidad |

→ Regla práctica: **cada feature o decisión que tomemos debe poder justificarse en
una de estas dos columnas.** Si no entra en ninguna, es ruido — se recorta.

**Reglas duras:**
- Equipo de 3–4 personas, mismo salón no permitido mezclar.
- La inversión (materiales, costos) la pone el equipo. El colegio no media ni
  responde por dinero.
- El stand y la presentación las arman SOLO los alumnos — ayuda de papás en la
  Expo se sanciona. (Ojo: usar a Claude Code para programar es válido, es trabajo
  del equipo con una herramienta, no "ayuda externa" tipo proveedor.)
- No es obligatorio vender de verdad: se puede presentar como prototipo funcional.
- Infomercial de 30s–1.5min con subtítulos en español, obligatorio para pasar la
  fase eliminatoria. **Pendiente confirmar fecha exacta con el profesor** — la
  convocatoria no la especifica, solo dice que aplica en la fase eliminatoria
  (nov–dic).

**Calendario clave:**
| Fecha | Qué pasa |
|---|---|
| 4 nov | Cierre de inscripción de equipos |
| 26 nov | Entrega de propuesta final (nuestra primera gran entrega) |
| 21 ene | Preeliminatoria (revisión por profesores) |
| 25–26 ene | Selección de los 15 proyectos que pasan a Expo |
| 16 feb | Expo Business Shark 8° |
| 19 feb | Gran Final (top 5 por grado) |

→ **La propuesta final del 26 de noviembre es el primer hito real.** Todo lo que
construyamos entre ahora y esa fecha debe apuntar a tener ahí: idea cerrada,
números de costos, y si se puede, un demo visual (no necesita estar 100% funcional).

---

## 2. EQUIPO

- 4 integrantes, mismo salón restringido.
- 2 integrantes saben desarrollar apps con Claude Code (desarrollo técnico).
- **Pendiente definir:** quién lleva números/costos (Matemáticas), quién lleva
  diseño/branding/pitch (Arte y Español), y quién lidera el video infomercial.
  Recomendación: no dejar que "los que programan" carguen con todo — Innovación
  y Viabilidad valen lo mismo que la ejecución técnica, y de hecho el jurado NO
  los va a evaluar por qué tan bien programado está el backend.

---

## 3. LA IDEA — RESUMEN DEL PRODUCTO

Sistema de identificación con NFC tags para obras de arte, pensado para un pintor
independiente real (contacto: amigo pintor del papá de uno de los integrantes):

- El NFC en la obra redirige a una app/landing propia.
- Ahí el espectador ve: historia de la obra, explicación, y verificación de
  autenticidad (NFC con ID único ligado a una base de datos — sin blockchain).
- Sistema de cuentas (login) para que el comprador registre las obras que ha
  adquirido — estilo álbum Panini — con niveles y sistema de lealtad.
- Cliente que paga: el pintor (modelo B2B). Usuario final de la app: el
  comprador de arte (no necesariamente paga directamente).

---

## 4. DIAGNÓSTICO HONESTO INICIAL (de Claude, sin suavizar)

1. **La "autenticación NFC" sola no es innovadora.** Ya existe en el mercado real
   (Arianee, Verisart, EON, etc.). Un jurado de Arte/Español no lo va a premiar
   como creatividad — es tecnología, no diseño ni branding.
   → La innovación real está en la **capa de colección/niveles**. Esa es la
   protagonista del pitch, no la excusa técnica.
2. **Había dos clientes mezclados** (pintor que paga vs. comprador que usa) — se
   resolvió definiendo el modelo B2B (ver sección 6).
3. **"Marcas de productos premium" era un mercado demasiado grande** para validar
   en 5 meses con 13 años. Se amarró el proyecto a un caso de uso concreto: un
   pintor local real.
4. **"Autenticidad" es una promesa fuerte** — se bajó el nivel de ambición. No se
   necesita blockchain ni seguridad de nivel bancario para un prototipo escolar.
   Un NFC con ID único ligado a una base de datos simple ya demuestra el concepto.

---

## 5. INVESTIGACIÓN DE MERCADO (octubre 2026)

### 5.1 Competencia directa (nuestro "banco de copiar")

| Jugador | Qué hace | Lo que copiamos de ellos |
|---|---|---|
| **Verisart** | Certificados de autenticidad vía NFC/blockchain para artistas. +50,000 creadores. | Su modelo de precios: freemium + cuota por certificado. El más maduro y fácil de imitar en estructura. |
| **Arianee** | Pasaportes digitales NFC para marcas de lujo (Breitling, Cartier, Richemont). | La mecánica de "niveles de lealtad basados en qué tanto interactúa el dueño" — base real de nuestro "álbum". |
| **The Fine Art Ledger (FAL)** | NFC + blockchain específico para arte físico (pinturas, esculturas). | Confirma que "gamificación + sistema de recompensas" ya es categoría reconocida en autenticación de arte. |
| **SmartLinks** | Certificados, tracking de procedencia, gestión de ediciones limitadas para arte. | Su lista de features es casi un mapa directo del MVP a construir. |
| **Startbahn / Ixkio-Seritag** | Infraestructura NFC + blockchain para autenticación de objetos de valor. | Confirman que NFC + base de datos (sin blockchain real) ya se acepta como "autenticación" suficiente. |
| **Prada / Adam Lippes / EON** | Activación de certificado de propiedad vía NFC al momento de la compra. | El patrón de "reclamar propiedad" como paso explícito y verificado (base de nuestra sección 6.1). |

**Conclusión:** el "toque único" no es la tecnología (eso ya existe) — es que todos
estos jugadores apuntan a marcas de lujo globales. Nosotros apuntamos a **un pintor
local, independiente, con un producto simple y accesible para el mercado mexicano.**
Ángulo de pitch: *"la versión accesible para el artista independiente de lo que ya
usan Breitling y Cartier."*

### 5.2 Costos de referencia (internacional — falta cotización local, ver sección 7)

- Tag NFC NTAG213 al mayoreo: **~$0.10–0.45 USD por unidad** (~2 a 9 MXN), según
  calidad y resistencia a manipulación.
- Hosting/dominio de la app: variable, a cotizar (puede ser casi $0 al inicio con
  planes gratuitos).

---

## 6. DECISIONES ESTRATÉGICAS YA RESUELTAS

### 6.1 Modelo de negocio: pago único por obra + mantenimiento (HÍBRIDO)

Se descartaron los dos extremos:
- **Solo pago único:** no deja ingreso para sostener el hosting después del
  primer lote de ventas → mata el criterio de **sostenibilidad** en Viabilidad.
- **Solo mantenimiento (suscripción pura):** un pintor independiente con pocas
  obras al año no va a pagar una mensualidad fija sin relación a cuánto vende.

**Modelo elegido (copiado del patrón de Verisart):**
- **Costo único por obra etiquetada:** cubre el tag (costo real ~2–9 MXN) + margen.
  Ej. se cobra 25–40 MXN por obra al pintor.
- **Mantenimiento bajo (mensual o anual), cobrado al pintor:** cubre hosting y que
  la plataforma siga activa. Puede ser escalonado: gratis hasta cierto número de
  obras, cuota baja si se excede — igual que el plan gratis/Pro de Verisart.

Esto da dos fuentes de ingreso (variable por obra + recurrente de mantenimiento),
que es justo lo que Matemáticas necesita ver para defender "sostenibilidad".

### 6.2 ¿Cómo comprobamos que quien crea la cuenta es el dueño real de la obra?

**Patrón de la industria (ya probado):** Prada/Adam Lippes piden al comprador
llenar un formulario con foto del comprobante de compra para activar su
certificado digital de propiedad. EON (infraestructura para marcas de lujo) tiene
un endpoint técnico llamado "Claim Ownership" — reclamar la propiedad es un paso
explícito, no automático.

**Nuestra versión simplificada:** cada obra sale con el NFC **+ un código de
activación único impreso en una tarjeta física** que el pintor entrega en persona
al momento de la venta. Para "reclamar" la obra en la app (y que cuente en el
álbum), el comprador escanea el NFC **y** escribe el código. El código es la
prueba de que el pintor se lo entregó a esa persona — no se necesita revisión
manual ni fotos, es automático y defendible frente al jurado.

### 6.3 ¿Cómo conectamos tantos NFC?

No es un problema de "conexión" — es un problema de **escritura (provisioning)**.
Cada NFC trae grabada una URL corta con un código único (ej. `app.com/o/XJ29K`).
Proceso: comprar tags en blanco → grabar la URL con una app gratuita de celular
(ej. NFC Tools) → crear el registro correspondiente en la base de datos. Programar
5 tags o 500 tags es el mismo proceso repetido — **no es una barrera técnica, es
una barrera de tiempo/mano de obra**, perfectamente manejable para el prototipo
(5–10 obras reales) y escalable después.

### 6.4 ¿Se necesita blockchain de verdad?

No. Varios jugadores del mercado ya usan NFC + base de datos simple sin blockchain
y se consideran autenticación válida para su mercado. Para el prototipo escolar,
un ID único de NFC ligado a una base de datos es suficiente y defendible.

---

## 7. DECISIONES PENDIENTES (resolver antes del 26 de noviembre)

1. **Mecánica exacta del "álbum":** cuántos niveles, qué se desbloquea en cada
   uno, por qué un comprador de arte real querría "coleccionar". Territorio de
   Arte/Español — debe sentirse diseñado, no improvisado.
2. **Cotización local real de NFC tags** en México (Amazon México, MercadoLibre o
   proveedor local), no solo referencias internacionales, para el estudio de
   costos final.
3. **Qué tanto del sistema se simula vs. se construye de verdad para la Expo**
   (un NFC de prueba con 3–5 obras reales del pintor amigo es suficiente para
   demostrar el concepto completo).
4. **Roles del equipo** (ver sección 2): quién lleva costos, branding/pitch y
   video infomercial.
5. **Fecha exacta de entrega del infomercial** — confirmar con el profesor.

---

## 8. CÓMO TRABAJAR CON CLAUDE A PARTIR DE AQUÍ

- Cada sesión nueva: pegar o referenciar este archivo primero.
- Antes de construir una feature, Claude pregunta: **¿esto es Innovación,
  Viabilidad, o ninguna de las dos?** Si es ninguna, no se construye todavía.
- Claude sigue retando al equipo con preguntas incómodas pero útiles, no solo
  ejecuta lo que se le pide. El objetivo no es "una app bonita", es ganar con un
  negocio que un profesor de Matemáticas pueda defender con números.
- Este archivo se actualiza conforme se resuelvan los pendientes de la sección 7
  — debe reflejar siempre el estado más reciente y real del proyecto.

---

## 9. FUENTES DE LA INVESTIGACIÓN DE MERCADO (octubre 2026)

- Verisart (verisart.com) — modelo de precios y escala.
- Arianee (arianee.com) — pasaportes digitales de lujo y mecánica de lealtad por
  niveles.
- The Fine Art Ledger (thefineartledger.com) — NFC + arte físico + gamificación.
- SmartLinks (smartlinks.app) — features de autenticación de arte vía NFC.
- Tracxn — panorama de startups de autenticación de arte (Startbahn, Verisart,
  Art Recognition, InsightART).
- Proveedores de NFC NTAG213 (SOS Electronic, GoToTags) — referencia de costos.
- Adam Lippes / Prada — flujo de activación de certificado de propiedad por NFC.
- EON Group (docs.eon.xyz) — endpoint técnico "Claim Ownership" como patrón de
  reclamo de propiedad verificado.
