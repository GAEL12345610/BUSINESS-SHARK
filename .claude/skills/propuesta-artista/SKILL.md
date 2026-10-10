---
name: propuesta-artista
description: "Propuesta comercial de Brai para un artista: traduce lo que dijo en la entrevista en su dolor real, aplica el precio vigente, calcula cuántas ventas extra pagan el servicio y saca un markdown de 1 página. Gatillos: hazme la propuesta para X, arma la oferta para el artista, cotización para X."
---

# Propuesta para un artista

Conviertes lo que sabemos de un artista en una propuesta que **vende sin sonar a plantilla**: nombra su dolor, presenta la oferta y deja el número tan claro que el "no" cueste más que el "sí".

## 1. Contexto mínimo (de `docs/CLIENTES.md` y la entrevista)

- Nombre, cómo vende hoy (taller, IG, galería, encargos).
- **Obras al año y precio promedio.** Sin esto no hay propuesta: pídelo.
- ¿Sabe quién tiene sus obras? ¿Ha perdido contacto con compradores?
- ¿Tiene audiencia en redes?

Si falta un dato, **no lo inventes**: pregúntalo con AskUserQuestion.

## 2. La oferta (dueño único: `docs/OFERTA.md`, léelo, los números pueden haber cambiado)

- **Setup** (página del artista, catálogo de obras previas, tarjeta de dueño diseñada, primeros tags) + **mantenimiento mensual**.
- **Cliente fundador** solo para los primeros casos: condiciones en `docs/OFERTA.md`.

## 3. El número que importa

Con datos del artista:
- Costo anual = setup + 12 × mantenimiento.
- Ventas extra para pagarlo = costo anual ÷ precio promedio de su obra.
- Frase ancla: *"Con vender [N] obra más al año a alguien que ya te compró, Brai se paga solo."*
- Si el artista vende a través de galería: compara contra la comisión (suele ser 40 a 50%). Marca este dato como referencia de industria, no de su galería.
- Derecho de reventa (LFDA art. 92 bis): menciónalo como beneficio, sin prometer montos.

## 4. Documento (`propuestas/propuesta_<artista>_<fecha>.md`, máximo 1 página)

```markdown
# Brai para [Artista]
[Fecha]

## Lo que nos contaste
[2 o 3 frases con SUS palabras de la entrevista.]

## Lo que hacemos
[1 párrafo: su obra con registro, historia y dueño; él sabe dónde está cada pieza.]

## Inversión
[Setup + mensualidad. Qué incluye.]

## El número
[Cálculo del paso 3.]

## Cómo arrancamos
1. Sesión de registro de obras (fotos y fichas).
2. Grabamos sellos y tarjetas.
3. Primera entrega con tarjeta a un comprador.

## Siguiente paso
[Un solo CTA, con fecha.]
```

## Reglas

- Voz de `marca-brai`. Puntuación humana.
- No prometer "anti-falsificación". Sí "registro de propiedad y procedencia".
- No bajar el precio para cerrar; si duda, ofrece la condición de fundador o agradece.
- Ofrece convertirla en slides con `brai-slides`.
- **Toda reunión con el artista va con un adulto presente.**
