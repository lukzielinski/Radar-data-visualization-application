import * as DataType from './DataType'

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
const readingsUpdated: DataType.Reading[] = []
const gridSpacing = 10
const maxZoom = 90

export let cameraZoom = 2
const scrollSensitivity = 0.003
const minZoom = 0.3

export function initCharts (canvasElement: HTMLCanvasElement) {
  canvas = canvasElement
  const ctxCandidate = canvas.getContext('2d')
  if (!ctxCandidate) { throw new Error('Could not get canvas context') }
  ctx = ctxCandidate
  draw();
}

export function updateReadings (readings: DataType.Reading[]) {
  readingsUpdated.push(...readings)
}

function draw (){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBackground();
  drawPoints ()
}


function drawPoints () {
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  const fontSize = 20 * (1.05 / cameraZoom)
  ctx.lineWidth = 5 * (1.25 / cameraZoom)
  ctx.strokeStyle = '#14213d'
  ctx.fillStyle = '#e5e5e5'
  console.log(readingsUpdated.length)
  for (let i = 0; i < readingsUpdated.length; i++) {
    ctx.beginPath()
    ctx.font = `${fontSize}px bold`
    ctx.fillStyle = '#000000'
    ctx.fillStyle = '#e5e5e5'
    ctx.arc(center.x + readingsUpdated[i].posX * 100, center.y + readingsUpdated[i].posX , 8 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
  }
  ctx.fill()
}


export function adjustZoom (e: WheelEvent) {
  const zoomAmount = e.deltaY * scrollSensitivity
  if (zoomAmount) {
    cameraZoom -= zoomAmount
  }
  cameraZoom = Math.min(cameraZoom, maxZoom)
  cameraZoom = Math.max(cameraZoom, minZoom)
  draw()
}


function drawBackground () {
  ctx.lineWidth = 2
  ctx.strokeStyle = '#c9c5c5'
  drawBottomGridHorizontally()
  drawTopGridHorizontally()
  drawRightGridVertically()
  drawLeftGridVertically()
}
function drawBottomGridHorizontally () {
  ctx.beginPath()

  for (let i = 0; i <= canvas.height * 4 * maxZoom; i = i + gridSpacing) {
    ctx.moveTo(-(maxZoom * canvas.width * 4), -i)

    ctx.lineTo(maxZoom * canvas.width * 4, -i)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawTopGridHorizontally () {
  ctx.beginPath()

  for (let i = gridSpacing; i <= canvas.height * 4 * maxZoom; i = i + gridSpacing) {
    ctx.moveTo(-(maxZoom * canvas.width * 4), i)

    ctx.lineTo(maxZoom * canvas.width * 4, i)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawRightGridVertically () {
  ctx.beginPath()

  for (let i = 0; i <= canvas.width * 4 * maxZoom; i = i + gridSpacing) {
    ctx.moveTo(i, -(maxZoom * canvas.height * 4))

    ctx.lineTo(i, maxZoom * canvas.height * 4)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawLeftGridVertically () {
  ctx.beginPath()

  for (let i = gridSpacing; i <= canvas.width * 4 * maxZoom; i = i + gridSpacing) {
    ctx.moveTo(-i, -(maxZoom * canvas.height * 4))

    ctx.lineTo(-i, maxZoom * canvas.height * 4)
  }
  ctx.stroke()
  ctx.closePath()
}




