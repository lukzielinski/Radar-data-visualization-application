<script lang="ts">
  import * as DataType from '../FileEditor/DataType'
  import * as glCharts from './3DChartCanvas'
  import { onMount } from 'svelte'
  // import stream from 'stream'
  // const temp = stream.Transform.prototype
  export let readings: DataType.Reading[] = []
  export let index: number
  export let cords: DataType.CordsType = { x: 0, y: 0, z: 0 }

  import Plotly from 'plotly.js/dist/plotly'
  import { timer, type Timer } from 'd3'

  let color: string

  $: if (index) {
    color = glCharts.checkColor(readings[index].objectId)
  }

  type point = {
    x: number
    y: number
    z: number
  }

  let dataPoints: point[] = []

  let keepDimensionsTrace = {
    x: [ cords.x, -10, -10, 10, 10 ],
    y: [ cords.y, -10, 10, -10, 10 ],
    z: [ 0, cords.z, 0, 0, 0 ],
    mode: 'markers',
    marker: {
      size: 1,
      line: {
        color: color,
        width: 1,
      },
      opacity: 0,
      color: color
    },
    type: 'scatter3d',
  }

  type Trace = {
    x: number[]
    y: number[]
    z: number[]
    mode: string
    marker: {
      size: number
      line: {
        color: string
        width: number
      }
      color: string
      opacity: number
    }
    type: string,
    timer: NodeJS.Timeout | null,
    resetTimer: () => void
  }

  function createTrace (): Trace {
    return {
      x: [ ],
      y: [ ],
      z: [ ],
      mode: 'lines+markers',
      marker: {
        size: 5,
        line: {
          color: '#000000',
          width: 1,
        },
        color: '#000000',
        opacity: 1,
      },
      type: 'scatter3d',
      timer: null,
      resetTimer: function () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.x = [ ]
          this.y = [ ]
          this.z = [ ]
        }, 1000)
      }

    }
  }

  // maps object id to trace
  let traces: Map<number, Trace> = new Map()

  let data = [ keepDimensionsTrace, ...traces ]

  let layout = {
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
    },
    xaxis: {
      autorange: false,
      range: [ -12, 12 ],
      type: 'date',
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
      tickcolor: color,
      type: 'linear',
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
      type: 'linear',
    },
  }


  onMount(() => {
    Plotly.newPlot('myDiv', data, layout)
  })

  // keep dimensions trace in sync, changes when user presses the buttons
  $: if (cords) {
    keepDimensionsTrace.x[4] = cords.x
    keepDimensionsTrace.y[2] = cords.y
    keepDimensionsTrace.y[3] = cords.y
    keepDimensionsTrace.z[1] = cords.z
  }

  // drawing loop
  $: if (index) {
    const reading = readings[index]
    const objectId = reading.objectId

    if (!traces.has(objectId)) {
      const trace = createTrace()
      traces.set(objectId, trace)
      trace.marker.color = glCharts.checkColor(objectId)
      // trace.marker.line.color = glCharts.checkColor(objectId)
    }

    const trace = traces.get(objectId)!
    trace.resetTimer()

    trace.x = [ ...trace.x, reading.posX ]
    trace.y = [ ...trace.y, reading.posY ]
    trace.z = [ ...trace.z, reading.posZ ]

    // remove elements from the beginning of the array
    // to make sure that length <= 10
    if (trace.x.length > 10) {
      trace.x.shift()
      trace.y.shift()
      trace.z.shift()
    }
    
    data.length = 1;
    data.push(...traces.values())
    
    Plotly.update('myDiv', data, layout)
  }
</script>

<div class="canv3d-container" id="myDiv" />

<style lang="less">
  .canv3d-container {
    position: absolute;
    right: 40px;
    top: 12%;
    width: 40vw;
    height: 40vw;
  }
</style>
