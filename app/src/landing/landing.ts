// La landing es HTML crudo (lo leen Google y los bots de IA sin JavaScript).
// Este archivo solo trae los estilos y la animación de entrada.
import "../estilos/base.css";
import "./landing.css";

// Barrido, no solo IntersectionObserver: si alguien salta al final, las
// secciones de en medio también se revelan (memoria/animacion-de-entrada-con-barrido.md).
const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pendientes = new Set(document.querySelectorAll<HTMLElement>(".aparecer"));

function barrer() {
  const limite = innerHeight * 0.92;
  for (const el of pendientes) {
    if (el.getBoundingClientRect().top < limite) {
      el.classList.add("visible");
      pendientes.delete(el);
    }
  }
  if (pendientes.size === 0) removeEventListener("scroll", alScroll);
}

let programado = false;
function alScroll() {
  if (programado) return;
  programado = true;
  requestAnimationFrame(() => {
    programado = false;
    barrer();
  });
}

// Al imprimir o guardar como PDF, todo visible.
addEventListener("beforeprint", () => pendientes.forEach((el) => el.classList.add("visible")));

if (quieto) {
  pendientes.forEach((el) => el.classList.add("visible"));
} else {
  document.documentElement.classList.add("con-animacion");
  barrer();
  addEventListener("scroll", alScroll, { passive: true });
  addEventListener("resize", alScroll, { passive: true });
}
