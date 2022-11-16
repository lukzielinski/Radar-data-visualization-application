<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import CanvasContainer from './views/Canvas/CanvasContainer.svelte'
  import * as DataType from './views/Canvas/DataType'
  import Sidebar from './views/Sidebar.svelte'
  import CanvasContainer3D from './views/Canvas/CanvasContainer3D.svelte';
  import { beforeUpdate } from 'svelte';
  import OpenFile from './views/OpenFile.svelte';

  let currentFile: File | null = null;
  let index: number;

  $: if (currentFile) {
    void readFile(currentFile);
  }

  let readings: DataType.Reading[] = [];

  async function readFile (file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const decoder = new TextDecoder();
    const fileText = decoder.decode(arrayBuffer);

    readings = [];

    fileText.split('\n').forEach((line) => {
      const numbers: number[] = [];

      line.split(';').forEach((digitString) => {
        const digit = parseFloat(digitString); 
        numbers.push(digit);
      })

      if (numbers.length >= 12) {
        const reading: DataType.Reading = {
          tid: numbers[0],
          timeStamp: numbers[1],
          objectsId: numbers[2],
          objectId: numbers[3],
          posX: numbers[4],
          posZ: numbers[5],
          posY: numbers[6],
          accX: numbers[7],
          accY: numbers[8],
          accZ: numbers[9],
          g: numbers[10],
          confidence_level: numbers[11]
        }

        readings.push(reading);

      }
    });
    console.log(readings);
  }
</script>

<main>
<div class="grid-container">
  <div class="grid-item">
    <Sidebar bind:readings={readings} bind:index={index}/>
    <OpenFile on:onFile={(e) => { currentFile = e.detail.file; }}/>
  </div>
  <div class="grid-item charts-container">
    <div class="chart-item">
      <CanvasContainer bind:readings={readings} bind:index={index}/>
    </div>
    <div class="chart-item">
      <CanvasContainer3D bind:readings={readings} bind:index={index}/>
    </div>
    <!-- <CanvasContainer bind:readings={readings} bind:index={index}/> -->
  </div>
</div>
</main>

<style lang="less">
  .grid-container { 
    display: grid;
    grid-template-rows: 10vh 80vh auto;
    grid-gap: 10px;
  }
  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .charts-container {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  :global(:root) {
    --mobile-screen: 864px;
    --yellow: #ffb703;
    --dark-gray: rgb(105, 105, 105);
    --light-gray: rgb(194, 194, 194);
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #dbdbdb;
    color: #4e4e4e;
  }
  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
  }

  :global(body) {
    padding: 0;
    margin: 0 auto;
    font-size: 18px;
    @media (max-width: 500px) {
      font-size: 13px;
    }
  }
</style>
