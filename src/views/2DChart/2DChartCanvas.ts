import * as DataType from '../FileEditor/DataType'

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
  drawPoints ()
  ctx.restore()
}

function convertTimeStamp (){
  if (readingsUpdated.length > 0){
    const newTimeInMicroseconds = ((readingsUpdated[currentPointIndex].tid - readingsUpdated[0].tid) * 0.12) / 86400;
  }
}

function drawPoints () {
  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  const fontSize = 60 * (1.05 / cameraZoom)
  ctx.lineWidth = 5 * (1.25 / cameraZoom)
  if (readingsUpdated.length > 0){
    const scaledX = Math.round(readingsUpdated[currentPointIndex].posX * 100)
    const scaledY = Math.round(readingsUpdated[currentPointIndex].posY * 100)
    ctx.beginPath()
    ctx.font = `${fontSize}px bold`
    ctx.fillStyle = '#e5e5e5'
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    for (let i = 0; i < currentPointIndex; i++){
      if (readingsUpdated[currentPointIndex].objectsId === readingsUpdated[currentPointIndex + 1].objectsId){
        ctx.beginPath()
        // ctx.fillStyle = '#e5e5e5'
        ctx.fill()
        ctx.fillStyle = '#000000'
        ctx.fillText(
          `P${readingsUpdated[currentPointIndex].objectsId} (${scaledX / 100},${scaledY / 100})`,
          center.x + readingsUpdated[currentPointIndex].posX * 110,
          center.y + readingsUpdated[currentPointIndex].posY * - 80
        )
        ctx.fill()
        ctx.fillStyle = '#e5e5e5'
        ctx.beginPath()
        ctx.fillStyle = '#a9def9'
        ctx.arc(center.x + readingsUpdated[currentPointIndex].posX * 100, center.y + readingsUpdated[currentPointIndex].posY * - 100 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = '#caf0f8'
        ctx.arc(center.x + readingsUpdated[currentPointIndex - i - 1].posX * 100, center.y + readingsUpdated[currentPointIndex - i - 1].posY * - 100 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
        drawLineForPoints()
      } else {
        drawManyPoints()
      }
    }
  }

  function drawManyPoints () {
    let pointsElements = 0
    while (readingsUpdated[currentPointIndex + pointsElements].objectsId - readingsUpdated[currentPointIndex + pointsElements + 1].objectsId < 0){
      pointsElements++; 
    }
    for (let i = 0; i < pointsElements + 1; i++){
      const scaledX = Math.round(readingsUpdated[currentPointIndex].posX * 100)
      const scaledY = Math.round(readingsUpdated[currentPointIndex].posY * 100)
      ctx.beginPath()
      ctx.fillStyle = '#22223b'
      ctx.fillText(
        `P${readingsUpdated[currentPointIndex + i].objectsId} (${scaledX / 100},${scaledY / 100})`,
        center.x + readingsUpdated[currentPointIndex + i].posX * 110,
        center.y + readingsUpdated[currentPointIndex + i].posY * - 80
      )
      ctx.fill()
      ctx.fillStyle = '#a9def9'
      ctx.arc(center.x + readingsUpdated[currentPointIndex + i].posX * 100, center.y + readingsUpdated[currentPointIndex + i].posY * - 100 , 10 * (1.25 / cameraZoom), 0, 2 * Math.PI, false)
      ctx.stroke()
      ctx.fill()
      ctx.closePath()
    }
  }

  function drawLineForPoints (){
    if (currentPointIndex  > 16){
      for (let j = 16; j > 0; j--){
        ctx.beginPath()
        ctx.moveTo(center.x + readingsUpdated[currentPointIndex - j].posX * 100, center.y + readingsUpdated[currentPointIndex - j].posY * - 100)
        ctx.lineTo(center.x + readingsUpdated[currentPointIndex - j + 1].posX * 100, center.y + readingsUpdated[currentPointIndex - j + 1].posY * - 100)
        ctx.strokeStyle = '#e9c46a';
        ctx.stroke();
      } 
      ctx.closePath()
    } else {
      for ( let j = 1; j < currentPointIndex - 1; j++){
        ctx.beginPath()
        ctx.moveTo(center.x + readingsUpdated[currentPointIndex - j].posX * 100, center.y + readingsUpdated[currentPointIndex - j].posY * - 100)
        ctx.lineTo(center.x + readingsUpdated[currentPointIndex - j - 1].posX * 100, center.y + readingsUpdated[currentPointIndex - j - 1].posY * - 100)
        ctx.strokeStyle = '#e9c46a';
        ctx.stroke();
      }
    }
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
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

// function wrtiteTheXandY (){
//   const center = {
//     x: canvas.width / 2,
//     y: canvas.height / 2,
//   }
//   ctx.beginPath()
//   ctx.font = '30px bold'
//   ctx.fillStyle = '#000000'
//   ctx.fillText('X', (canvas.width / 8) * cameraZoom, center.y - 10)
//   ctx.fillText('Y', center.x - 30, (canvas.width / 8) + 290)
//   ctx.closePath()
// }

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


