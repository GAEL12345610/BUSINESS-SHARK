// Pinturas de EJEMPLO generadas en SVG. No son obra de ningún artista real.
// Las "fotos huella" son recortes de la misma imagen: así la demo enseña de
// verdad la idea de comparar un detalle con el cuadro que tienes enfrente.

type Pincel = (r: () => number) => string;

function azar(semilla: number) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FILTROS = `
<filter id="oleo" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="r"/>
  <feDisplacementMap in="SourceGraphic" in2="r" scale="14"/>
</filter>
<filter id="grano">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
  <feColorMatrix values="0 0 0 0 0.17  0 0 0 0 0.15  0 0 0 0 0.13  0 0 0 0.16 0"/>
</filter>`;

function trazos(r: () => number, n: number, colores: string[], zona: [number, number, number, number], ancho: [number, number]) {
  const [x0, y0, x1, y1] = zona;
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0);
    const y = y0 + r() * (y1 - y0);
    const w = ancho[0] + r() * (ancho[1] - ancho[0]);
    const h = 6 + r() * 14;
    const a = -18 + r() * 36;
    const c = colores[Math.floor(r() * colores.length)];
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(h / 2).toFixed(1)}" fill="${c}" opacity="${(0.35 + r() * 0.5).toFixed(2)}" transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return s;
}

const tlaquepaque: Pincel = (r) => {
  let fachadas = "";
  const colores = ["#C06E52", "#D9A35B", "#E8D7BC", "#8C4932", "#B9825E", "#E3B98A"];
  let x = -20;
  while (x < 820) {
    const w = 110 + r() * 90;
    const h = 260 + r() * 140;
    const c = colores[Math.floor(r() * colores.length)];
    fachadas += `<rect x="${x.toFixed(0)}" y="${(1000 - 260 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 40).toFixed(0)}" fill="${c}"/>`;
    const arcos = Math.max(1, Math.floor(w / 60));
    for (let i = 0; i < arcos; i++) {
      const ax = x + 16 + i * (w - 20) / arcos;
      const aw = (w - 40) / arcos;
      fachadas += `<path d="M${ax.toFixed(0)} ${(1000 - 260).toFixed(0)} v-70 a${(aw / 2).toFixed(0)} ${(aw / 2).toFixed(0)} 0 0 1 ${aw.toFixed(0)} 0 v70z" fill="#2B2622" opacity="0.55"/>`;
    }
    x += w;
  }
  return `
  <defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#E9B97A"/><stop offset="0.55" stop-color="#E7956C"/><stop offset="1" stop-color="#C06E52"/>
  </linearGradient></defs>
  <rect width="800" height="1000" fill="url(#cielo)"/>
  <circle cx="560" cy="250" r="92" fill="#F6E3B4" opacity="0.92"/>
  <g filter="url(#oleo)">${trazos(r, 70, ["#F3D3A0", "#E7956C", "#F6F1EA"], [0, 60, 800, 470], [60, 180])}${fachadas}
  <rect x="0" y="740" width="800" height="260" fill="#5E4A3C"/>
  ${trazos(r, 90, ["#8C4932", "#2B2622", "#C06E52", "#D9A35B"], [0, 740, 800, 1000], [40, 140])}</g>`;
};

const tonala: Pincel = (r) => `
  <rect width="800" height="1000" fill="#3A2E26"/>
  <g filter="url(#oleo)">
  ${trazos(r, 140, ["#4A3B30", "#5E4A3C", "#2B2622", "#6B5444"], [0, 0, 800, 1000], [80, 260])}
  <path d="M400 210 C 250 220 200 330 230 420 C 160 520 170 760 280 840 C 340 885 460 885 520 840 C 630 760 640 520 570 420 C 600 330 550 220 400 210 Z" fill="#B66A45"/>
  <ellipse cx="400" cy="222" rx="96" ry="22" fill="#8C4932"/>
  ${trazos(r, 120, ["#C9814F", "#9E5636", "#D79A66", "#E3B98A", "#7A3F28"], [210, 260, 590, 860], [50, 150])}
  <path d="M250 520 C 330 500 470 500 550 520" stroke="#F6F1EA" stroke-width="10" fill="none" opacity="0.8"/>
  <path d="M262 560 C 340 545 460 545 538 560" stroke="#2B2622" stroke-width="6" fill="none" opacity="0.7"/>
  </g>`;

const lluvia: Pincel = (r) => {
  let lineas = "";
  for (let i = 0; i < 160; i++) {
    const x = r() * 900 - 50;
    const y = r() * 1000;
    lineas += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l-26 70" stroke="#E5DDCF" stroke-width="${(1 + r() * 2).toFixed(1)}" opacity="${(0.25 + r() * 0.4).toFixed(2)}"/>`;
  }
  return `
  <defs><linearGradient id="gris" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#6F7868"/><stop offset="1" stop-color="#3F4739"/>
  </linearGradient></defs>
  <rect width="800" height="1000" fill="url(#gris)"/>
  <g filter="url(#oleo)">
  ${trazos(r, 120, ["#5E6C52", "#47533D", "#7E8B6F", "#2F3829"], [-40, 80, 840, 620], [70, 210])}
  <rect x="0" y="640" width="800" height="360" fill="#2B2622"/>
  ${trazos(r, 60, ["#C9A24B", "#E9B97A", "#5E6C52"], [0, 660, 800, 990], [20, 90])}
  </g>${lineas}`;
};

const PINCELES: Record<string, { pincel: Pincel; semilla: number; huellas: [number, number][] }> = {
  "Tarde en Tlaquepaque": { pincel: tlaquepaque, semilla: 17, huellas: [[520, 170], [120, 520], [600, 780]] },
  "Barro de Tonalá": { pincel: tonala, semilla: 29, huellas: [[310, 180], [300, 470], [420, 700]] },
  "Lluvia sobre Chapultepec": { pincel: lluvia, semilla: 41, huellas: [[80, 200], [420, 640], [200, 820]] },
};

function svg(nombre: string, viewBox: string): string {
  const p = PINCELES[nombre];
  const cuerpo = p.pincel(azar(p.semilla));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice"><defs>${FILTROS}</defs>${cuerpo}<rect width="800" height="1000" filter="url(#grano)"/></svg>`;
}

const aUri = (s: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`;

export function pinturaEjemplo(nombre: string): { foto: string; huellas: string[] } {
  const p = PINCELES[nombre];
  if (!p) return { foto: "", huellas: [] };
  return {
    foto: aUri(svg(nombre, "0 0 800 1000")),
    huellas: p.huellas.map(([x, y]) => aUri(svg(nombre, `${x} ${y} 150 150`))),
  };
}
