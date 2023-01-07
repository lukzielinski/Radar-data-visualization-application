<script lang="ts">
  import * as canvasCharts from './2DChartCanvas'
  import * as DataType from '../FileEditor/DataType'
  import * as MouseHandler from './MouseHandler'

  export let readings: DataType.Reading[] = []
  export let index: number
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  $: if (canvas) {
    canvasCharts.updateReadings(readings)
    const ctxCandidate = canvas.getContext('2d')
    if (!ctxCandidate) throw new Error('Could not get context')
    ctx = ctxCandidate
    index = 1
  }

  $: if (index) {
    MouseHandler.init(canvas)
    canvasCharts.initCharts(canvas, index)
  }
</script>

<canvas
  bind:this={canvas}
  width="2000px"
  height="2000px"
  class="canvas"
  style="height: 40vw; width: 40vw"
  id="myChart1"
/>

<style lang="less">
  .canvas {
    background-color: white;
  }
</style>
