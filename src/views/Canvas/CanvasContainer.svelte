<script lang="ts">
  import * as canvasCharts from './canavasCharts';
  import * as DataType from './DataType';
  import * as MouseHandler from './MouseHandler';
  
  export let readings: DataType.Reading[] = [];
  export let index: number;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  $:if (canvas) {
    canvasCharts.updateReadings(readings);
    const ctxCandidate = canvas.getContext('2d');
    if (!ctxCandidate) throw new Error('Could not get context');
    ctx = ctxCandidate;
    index = 1;
  }
  $:if (index){
    MouseHandler.init(canvas);
    canvasCharts.initCharts(canvas,index);
  }
</script>

<canvas bind:this={canvas} width="2000px" height="2000px" class="canvas" style="height: 86vh; width: 86vh" id="myChart1"></canvas>

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
