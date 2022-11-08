<script lang="ts">
  import * as canvasCharts from './canavasCharts';
  import * as DataType from './DataType';
  
  export let readings: DataType.Reading[] = [];
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  $:if (canvas){
    console.log(canvas)
    canvasCharts.updateReadings(readings);
    const ctxCandidate = canvas.getContext('2d');
    if (!ctxCandidate) throw new Error('Could not get context');
    ctx = ctxCandidate;
    canvasCharts.initCharts(canvas);
  }
</script>

<canvas bind:this={canvas} width="2000px" height="2000px" class="canvas" style="height: 80vh; width: 80vh" id="myChart1"></canvas>

<style lang="less">
.canvas{
  width: 900px;
  height: 100%;
  background-color: aliceblue;
}
.button{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
