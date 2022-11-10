<script lang="ts">
    import * as canvasCharts from './canavasCharts';
    import * as DataType from './DataType';
    import * as MouseHandler from './MouseHandler';
    import * as glCharts from './glChart';
    
    export let readings: DataType.Reading[] = [];
    export let index: number;
    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext;
  
    $:if (canvas) {
      const glCandidate = canvas.getContext('webgl');
      if (!glCandidate) throw new Error('Could not get context');
      gl = glCandidate;
      index = 1;
      glCharts.initCharts(canvas);
    }
    // $:if (index){
    //   MouseHandler.init(canvas);
    //   canvasCharts.initCharts(canvas,index);
    // }
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
  