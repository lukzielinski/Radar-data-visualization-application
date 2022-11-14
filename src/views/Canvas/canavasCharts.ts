import * as DataType from './DataType'

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let currentPointIndex = 0
const readingsUpdated: DataType.Reading[] = []
const gridSpacing = 50
const maxZoom = 20

export let cameraZoom = 2
const scrollSensitivity = 0.003
const minZoom = 1

export function initCharts (canvasElement: HTMLCanvasElement, index: number) {
  canvas = canvasElement
  currentPointIndex = index
  const ctxCandidate = canvas.getContext('2d')
  if (!ctxCandidate) { throw new Error('Could not get canvas context') }
  ctx = ctxCandidate
  draw();
}

export function updateReadings (readings: DataType.Reading[]) {
  readingsUpdated.push(...readings)
}

function draw (){
  ctx.save()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(cameraZoom, cameraZoom)
  ctx.translate(-canvas.width / 2, -canvas.height / 2)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  convertTimeStamp()
  drawBackground();
  drawPoints ('#e5e5e5')
  ctx.restore()
}

function convertTimeStamp (){
  if (readingsUpdated.length > 0){
    const newTimeInMicroseconds = ((readingsUpdated[currentPointIndex].tid - readingsUpdated[0].tid) * 0.12) / 86400;
    console.log(newTimeInMicroseconds);
  }
}


function drawPoints (fillStyle: string) {
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  const fontSize = 60 * (1.05 / cameraZoom)
  ctx.lineWidth = 5 * (1.25 / cameraZoom)
  ctx.strokeStyle = '#14213d'
  ctx.fillStyle = fillStyle
  if (readingsUpdated.length > 0){
    ctx.beginPath()
    ctx.font = `${fontSize}px bold`
    ctx.fillStyle = '#000000'
    ctx.fillText(
      `P${readingsUpdated[currentPointIndex].objectsId} (${readingsUpdated[currentPointIndex].posX},${readingsUpdated[currentPointIndex].posY })`,
      center.x + readingsUpdated[currentPointIndex].posX + 10,
      center.y - readingsUpdated[currentPointIndex].posY * 100 - 30
    )
    ctx.fillStyle = '#e5e5e5'
    ctx.arc(center.x + readingsUpdated[currentPointIndex].posX * 100, center.y + readingsUpdated[currentPointIndex].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    if (currentPointIndex > 6){
      ctx.beginPath()
      ctx.strokeStyle = '#cdb4db'
      ctx.fillStyle = '#cdb4db'
      ctx.lineWidth = 1
      ctx.moveTo(center.x + readingsUpdated[currentPointIndex - 4].posX * 100, center.y + readingsUpdated[currentPointIndex - 4].posY * - 10)
      ctx.arc(center.x + readingsUpdated[currentPointIndex - 4].posX * 100, center.y + readingsUpdated[currentPointIndex - 4].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      ctx.lineTo(center.x + readingsUpdated[currentPointIndex - 3].posX * 100, center.y + readingsUpdated[currentPointIndex - 3].posY * - 10)
      ctx.arc(center.x + readingsUpdated[currentPointIndex - 3].posX * 100, center.y + readingsUpdated[currentPointIndex - 3].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      ctx.lineTo(center.x + readingsUpdated[currentPointIndex - 2].posX * 100, center.y + readingsUpdated[currentPointIndex - 2].posY * - 10)
      ctx.arc(center.x + readingsUpdated[currentPointIndex - 2].posX * 100, center.y + readingsUpdated[currentPointIndex - 2].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      ctx.lineTo(center.x + readingsUpdated[currentPointIndex - 1].posX * 100, center.y + readingsUpdated[currentPointIndex - 1].posY * - 10)
      ctx.arc(center.x + readingsUpdated[currentPointIndex - 1].posX * 100, center.y + readingsUpdated[currentPointIndex - 1].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      if (readingsUpdated[currentPointIndex - 1].objectsId === readingsUpdated[currentPointIndex - 2].objectsId){
        ctx.arc(center.x + readingsUpdated[currentPointIndex - 1].posX * 100, center.y + readingsUpdated[currentPointIndex - 1].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
        ctx.lineTo(center.x + readingsUpdated[currentPointIndex].posX * 100, center.y + readingsUpdated[currentPointIndex].posY * - 10)
      } else {
        ctx.fillStyle = '#ffc300'
        ctx.arc(center.x + readingsUpdated[currentPointIndex].posX * 100, center.y + readingsUpdated[currentPointIndex].posY * - 10 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      }
      ctx.stroke()
      ctx.closePath()
    }
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
  wrtiteTheXandY()
  drawBottomGridHorizontally()
  drawTopGridHorizontally()
  drawRightGridVertically()
  drawLeftGridVertically()
  drawCoordinatesSystem()
}

function wrtiteTheXandY (){
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  ctx.beginPath()
  ctx.font = '30px bold'
  ctx.fillStyle = '#000000'
  ctx.fillText('X', center.x + canvas.width - 1530, center.y - 10)
  ctx.fillText('Y', center.x - 30, center.y - canvas.height + 1530)
  ctx.closePath()
}

function drawCoordinatesSystem () {
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  ctx.beginPath()
  ctx.lineWidth = 3
  ctx.strokeStyle = '#000000'
  ctx.moveTo(center.x, 0)
  ctx.lineTo(center.x, canvas.height)
  ctx.moveTo(0, center.y)
  ctx.lineTo(canvas.width, center.y)
  ctx.stroke()
  ctx.closePath()
}

function drawBottomGridHorizontally () {
  ctx.beginPath()

  for (let i = 0; i <= canvas.height * 2 * maxZoom; i = i + gridSpacing) {
    ctx.moveTo(-(maxZoom * canvas.width * 2), -i)

    ctx.lineTo(maxZoom * canvas.width * 2, -i)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawTopGridHorizontally () {
  ctx.beginPath()
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  for (let i = gridSpacing; i <= canvas.height * 2 * maxZoom; i = i + gridSpacing) {
    if (i === 100){
      ctx.fillText(`1`, center.x  + 100, center.y - 10)
    }
    ctx.moveTo(-(maxZoom * canvas.width * 2), i)
    ctx.lineTo(maxZoom * canvas.width * 2, i)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawRightGridVertically () {
  ctx.beginPath()

  for (let i = 0; i <= canvas.width * 2 * maxZoom; i = i + gridSpacing) {
    ctx.moveTo(i, -(maxZoom * canvas.height * 2))

    ctx.lineTo(i, maxZoom * canvas.height * 2)
  }
  ctx.stroke()
  ctx.closePath()
}

function drawLeftGridVertically () {
  ctx.beginPath()
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  for (let i = gridSpacing; i <= canvas.width * 2 * maxZoom; i = i + gridSpacing) {
    if (i === 100){
      ctx.fillText(`1`, center.x + 7, center.y - 103)
    }
    ctx.moveTo(-i, -(maxZoom * canvas.height * 2))

    ctx.lineTo(-i, maxZoom * canvas.height * 2)
  }
  ctx.stroke()
  ctx.closePath()
}


