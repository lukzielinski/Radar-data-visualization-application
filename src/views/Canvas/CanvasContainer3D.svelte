<script lang="ts">
  import * as DataType from './DataType';
  import * as glCharts from './glChart';
  import { onMount } from 'svelte';
  // import stream from 'stream'
  // const temp = stream.Transform.prototype
  export let readings: DataType.Reading[] = [];
  export let index: number;

  import Plotly from 'plotly.js/dist/plotly'

  let basePointsX = [ -10, -10, 10, 10 ]
  let basePointsY = [ -10, 10, -10, 10 ]
  let basePointsZ = [ 4, 1, 1, 1 ]

  type point = {
    x: number,
    y: number,
    z: number,
    timer: Timeout | null
  }
  
  let dataPoints: point[]  = []

  let trace1 = {
    x: [ 1, -10, -10, 10, 10 ],
    y: [ 1, -10, 10, -10, 10 ], 
    z: [ 1, 4, 1, 1, 1 ],
    mode: 'markers',
    marker: {
      size: 12,
      line: {
        color: 'rgba(217, 217, 217, 0.14)',
        width: 0.5 },
      opacity: 0.8 },
    type: 'scatter3d'
};

let data = [ trace1 ];
let layout = 
{ 
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    },
    xaxis: {
      autorange: false,
      range: [ -2, 2 ],
      type: 'date'
    },
    yaxis: {
      autorange: false,
      range: [ -2, 2 ],
      type: 'linear'
    },
    zaxis: {
      autorange: false,
      range: [ -2, 2 ],
      type: 'linear'
    }
};


let t = 0;


onMount(()=> {
    Plotly.newPlot('myDiv', data, layout);
    // setInterval(()=>{
    //   t += 0.1;

    //   trace1.x[0] = Math.cos(t);
    //   trace1.y[0] = Math.sin(t);

    //   Plotly.update('myDiv', data, layout);
    // }, 10)
})

  
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

    trace1.x = [ ...basePointsX, ...(dataPoints.map(point => point.x)) ]
    trace1.y = [ ...basePointsY, ...(dataPoints.map(point => point.y)) ]
    trace1.z = [ ...basePointsZ, ...(dataPoints.map(point => point.z)) ]

    Plotly.update('myDiv', data, layout);

    // void glCharts.initCharts(readings,index);
  }
</script>

<div id="myDiv"></div>

<style lang="less">
.canvas{
  width: 1000px;
  height: 100%;
  background-color: aliceblue;
}
.button{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
  