// Tema del artista (white label). El artista elige UN color de acento.
// Regla de marca (brand/BRAND.md, sección 9): si su color no da 4.5:1 sobre
// lienzo, el botón usa una versión oscurecida. El dorado nunca es de un artista.
import type { CSSProperties } from 'react'

const LIENZO = '#F6F1EA'

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function luminancia(hex: string) {
  const [r, g, b] = rgb(hex).map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contraste(a: string, b: string) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

function oscurecer(hex: string, factor: number) {
  return '#' + rgb(hex).map((c) => Math.round(c * factor).toString(16).padStart(2, '0')).join('')
}

/** Acento que pasa AA (4.5:1) como fondo de botón con texto lienzo. */
export function acentoSeguro(hex: string) {
  let color = hex
  for (let f = 0.95; contraste(color, LIENZO) < 4.5 && f > 0.3; f -= 0.05) color = oscurecer(hex, f)
  return color
}

/** Variables CSS que pinta la página de la obra. */
export function varsTema(acento: string): CSSProperties {
  return { '--acento': acento, '--acento-texto': acentoSeguro(acento) } as CSSProperties
}
