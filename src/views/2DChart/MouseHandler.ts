import * as canvasCharts from './2DChartCanvas';

let canvas: HTMLCanvasElement

export function init (canvasElement: HTMLCanvasElement) {
  canvas = canvasElement
  canvas.addEventListener('wheel', onUserZoom, { passive: false })
}

function onUserZoom (event: WheelEvent) {
  canvasCharts.adjustZoom(event)
}
