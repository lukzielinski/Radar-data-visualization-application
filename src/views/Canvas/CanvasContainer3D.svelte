<script lang="ts">
    import * as canvasCharts from './canavasCharts';
    import * as DataType from './DataType';
    import * as MouseHandler from './MouseHandler';
    import * as glCharts from './glChart';
    
    export let readings: DataType.Reading[] = [];
    export let index: number;
    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext;

    glCharts.initCharts();
    // $:if (index) {
    //   const glCandidate = canvas.getContext('webgl');
    //   if (!glCandidate) throw new Error('Could not get context');
    //   gl = glCandidate;
    //   glCharts.initCharts();
    // }
    // $:if (index){
    //   MouseHandler.init(canvas);
    //   canvasCharts.initCharts(canvas,index);
    // }
  </script>
  
  <div id="my_dataviz"></div>

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
  