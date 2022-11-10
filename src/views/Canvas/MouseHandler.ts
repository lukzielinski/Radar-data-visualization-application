import * as canvasCharts from './canavasCharts';

let canvas: HTMLCanvasElement

export function init (canvasElement: HTMLCanvasElement) {
  canvas = canvasElement
  canvas.addEventListener('wheel', onUserZoom, { passive: false })
}

function onUserZoom (event: WheelEvent) {
  canvasCharts.adjustZoom(event)
}
