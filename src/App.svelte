<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import CanvasContainer from './views/Canvas/CanvasContainer.svelte'
  import * as DataType from './views/Canvas/DataType'
  import Sidebar from './views/Sidebar.svelte'
  import { beforeUpdate } from 'svelte';
  import OpenFile from './views/OpenFile.svelte';

  let currentFile: File | null = null;

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
          posX: numbers[1],
          posY: numbers[2],
          posZ: numbers[3],
          velX: numbers[4],
          velY: numbers[5],
          velZ: numbers[6],
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
  <Sidebar bind:readings={readings}/>
  <OpenFile on:onFile={(e) => { currentFile = e.detail.file; }}/>
  <CanvasContainer bind:readings={readings}/>
</main>

<style lang="less">
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
