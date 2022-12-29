<script lang="ts">
  import * as DataType from '../FileEditor/DataType';
  import * as glCharts from './3DChartCanvas';
  import { onMount } from 'svelte';
  // import stream from 'stream'
  // const temp = stream.Transform.prototype
  export let readings: DataType.Reading[] = [];
  export let index: number;
  export let cords: DataType.CordsType = { x: 0, y: 0, z: 0 };

  import Plotly from 'plotly.js/dist/plotly'

  type point = {
    x: number,
    y: number,
    z: number,
    timer: Timeout | null
  }
  
  let dataPoints: point[]  = []

  let trace1 = {
    x: [  cords.x, -10, -10, 10, 10 ],
    y: [ cords.y, -10, 10, -10, 10 ], 
    z: [ 0, cords.z, 0, 0, 0 ],
    mode: 'markers',
    marker: {
      size: 1,
      line: {
        color: 'rgba(217, 217, 217, 0.14)',
        width: 1 },
      opacity: 1 },
    type: 'scatter3d'
};

let trace2 = {
    x: [  cords.x, -10, -10, 10, 10 ],
    y: [ 4, -10, 10, -10, 10 ], 
    z: [ 0, 0, 0, 0, 0 ],
    mode: 'markers',
    marker: {
      size: 10,
      line: {
        color: 'rgba(217, 217, 217, 0.14)',
        width: 1 },
      opacity: 1 },
    type: 'scatter3d'
};

let data = [ trace1 , trace2 ];
let layout = 
{   
    width: 800,
    height: 695,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    },
    xaxis: {
      autorange: false,
      range: [ -12, 12 ],
      type: 'date'
    },
    yaxis: {
      autorange: false,
      range: [ -12, 12 ],
      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 0.25,
      ticklen: 8,
      tickwidth: 4,
      tickcolor: '#000',
      type: 'linear'
    },
    zaxis: {
      autorange: false,
      range: [ -12, 12 ],
      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 0.25,
      ticklen: 8,
      tickwidth: 4,
      tickcolor: '#000',
      type: 'linear'
    }
};


let t = 0;


onMount(()=> {
    Plotly.newPlot('myDiv', data, layout);
})

$: if (cords) {
    trace1.x[4] = cords.x;
    trace1.y[2] = cords.y;
    trace1.y[3] = cords.y;
    trace1.z[1] = cords.z;
  }
  
  $:if (index){
    const reading = readings[index];
    const objectId = reading.objectsId;
    
    if (dataPoints[objectId]) {
      clearTimeout(dataPoints[objectId].timer)
    }
    dataPoints[objectId] = {
      x: reading.posX,
      y: reading.posY,
      z: reading.posZ,
      timer: null
    }
    dataPoints[objectId].timer = setTimeout(()=>{
      dataPoints = dataPoints.filter(point => point !== dataPoints[objectId])
    }, 100)
    
    trace2.x = [ ...(dataPoints.map(point => point.x)) ]
    trace2.y = [ ...(dataPoints.map(point => point.y)) ]
    trace2.z = [ ...(dataPoints.map(point => point.z)) ]
    Plotly.update('myDiv', data, layout);
  }
</script>

<div class="canv3d-container" id="myDiv"></div>

<style lang="less">
  .canv3d-container{
    position: absolute;
    right: 10px;
    top: 12%;
  }
</style>
  