import * as d3 from 'd3'
import * as DataType from '../FileEditor/DataType';
import Plotly from 'plotly.js/dist/plotly'

let currentPointIndex = 0


const a = []; 
const b = []; 
const c = [];

const colors: Map<number, string> = new Map()

function getRandomColor () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export function checkColor (objectId: number) {
  if (colors.has(objectId)) {
    return colors.get(objectId)!
  } else {
    const color = getRandomColor()
    colors.set(objectId, color)
    return color
  }
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

}