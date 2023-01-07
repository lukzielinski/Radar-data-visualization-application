import * as DataType from '../FileEditor/DataType'
import { checkColor } from '../3DChart/3DChartCanvas'

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let currentPointIndex = 0
let color: string


const ghostPoints: DataType.Reading[] = []
const readingsUpdated: DataType.Reading[] = []
const pointsOnScreen: DataType.Reading[] = []
const gridSpacing = 50
const maxZoom = 20
const scrollSensitivity = 0.003
const minZoom = 1

export let cameraZoom = 2

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

function draw () {
  ctx.save()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(cameraZoom, cameraZoom)
  ctx.translate(-canvas.width / 2, -canvas.height / 2)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBackground();
  drawPoint()
  ctx.restore()
}

function drawPoint () {
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  const fontSize = 60 * (1.05 / cameraZoom)
  ctx.lineWidth = 5 * (1.25 / cameraZoom)
  if (readingsUpdated.length > 0) {
    const scaledX = Math.round(readingsUpdated[currentPointIndex].posX * 100)
    const scaledY = Math.round(readingsUpdated[currentPointIndex].posY * 100)
    ctx.beginPath()
    ctx.font = `${fontSize}px bold`
    ctx.fillStyle = '#e5e5e5'
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    if ((readingsUpdated[currentPointIndex].tid !== readingsUpdated[currentPointIndex + 1].tid) && readingsUpdated[currentPointIndex].tid !== readingsUpdated[currentPointIndex - 1].tid) {
      ctx.beginPath()
      ctx.fill()
      ctx.fillStyle = '#000000'
      ctx.fillText(
        `P${readingsUpdated[currentPointIndex].objectId} (${scaledX / 100},${scaledY / 100})`,
        center.x + readingsUpdated[currentPointIndex].posX * 110,
        center.y + readingsUpdated[currentPointIndex].posY * - 80
      )
      ctx.fill()
      ctx.beginPath()
      checkColor(readingsUpdated[currentPointIndex].objectId)
      ghostPoints.push(readingsUpdated[currentPointIndex])
      drawGhostPoints()
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(center.x + readingsUpdated[currentPointIndex].posX * 100, center.y + readingsUpdated[currentPointIndex].posY * - 100, 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      ctx.fillStyle = color
      ctx.fill()
    } else {
      ghostPoints.push(readingsUpdated[currentPointIndex])
      drawManyPoints()
    }
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }


  function drawManyPoints () {
    drawGhostPoints()
    for (let i = 0; i < readingsUpdated.length; i++) {
      ctx.beginPath()
      if (readingsUpdated[currentPointIndex].tid === readingsUpdated[i].tid) {
        ctx.arc(center.x + readingsUpdated[i].posX * 100, center.y + readingsUpdated[i].posY * - 100, 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
        ctx.fillStyle = color
        ctx.fill()
        ctx.stroke()
      }
      ctx.closePath()
    }
  }

  function drawGhostPoints () {
    for (let i = 0; i < ghostPoints.length; i++) {
      const color = checkColor(ghostPoints[i].objectId)
      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(center.x + ghostPoints[i].posX * 100, center.y + ghostPoints[i].posY * - 100, 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }
    setTimeout(() => {
      ghostPoints.shift()
      pointsOnScreen.shift()
    }, 1000)
    drawBackLines()
  }

  function drawBackLines () {
    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    }
    for (let i = 1; i < ghostPoints.length; i++) {
      if (ghostPoints[i].objectId === ghostPoints[i - 1].objectId) {
        const color = checkColor(ghostPoints[i].objectId)
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.moveTo(center.x + ghostPoints[i - 1].posX * 100, center.y + ghostPoints[i - 1].posY * - 100)
        ctx.lineTo(center.x + ghostPoints[i].posX * 100, center.y + ghostPoints[i].posY * - 100)
        ctx.stroke()
        ctx.strokeStyle = color
        ctx.fill()
        ctx.closePath()
      } else {
        ctx.moveTo(center.x + ghostPoints[i].posX * 100, center.y + ghostPoints[i].posY * - 100)
      }
    }
  }
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
  // wrtiteTheXandY()
  drawBottomGridHorizontally()
  drawTopGridHorizontally()
  drawRightGridVertically()
  drawLeftGridVertically()
  drawCoordinatesSystem()
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
    if (i === 100) {
      ctx.fillText(`1`, center.x + 100, center.y - 10)
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
    if (i === 100) {
      ctx.fillText(`1`, center.x + 7, center.y - 103)
    }
    ctx.moveTo(-i, -(maxZoom * canvas.height * 2))

    ctx.lineTo(-i, maxZoom * canvas.height * 2)
  }
  ctx.stroke()
  ctx.closePath()
}


