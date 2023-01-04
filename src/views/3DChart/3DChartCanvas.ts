import * as d3 from 'd3'
import * as DataType from '../FileEditor/DataType';
import Plotly from 'plotly.js/dist/plotly'

let currentPointIndex = 0
let color: string

const objectIdArray: number[] = []
const colors: string[] = []
const a = []; 
const b = []; 
const c = [];

export function checkColor (objectId: number) {
  let isObject = false
  for (let i = 0; i < objectIdArray.length; i++) {
    if (objectIdArray[i] === objectId) {
      color = colors[i]
      isObject = true
      break
    }
  }
  if (isObject) {
    color = colors[objectIdArray.indexOf(objectId)]
  } else {
    objectIdArray.push(objectId)
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    colors.push(color)
  }
  return color
}



export function updateReadings (readings: DataType.Reading[]) {
  for (let i = 0; i < readings.length; i++){
    a.push(readings[i].posX)
    b.push(readings[i].posY)
    c.push(readings[i].posZ)
  }
  console.log(readings)
}

export function drawChart (index: number) {
  currentPointIndex = index
  console.log(currentPointIndex)
  draw();
}

function draw () {
  console.log()
}