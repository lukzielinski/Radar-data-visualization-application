<script lang="ts">
  import CanvasContainer2D from './views/2DChart/CanvasContainer2D.svelte'
  import * as DataType from './views/FileEditor/DataType'
  import logo from './assets/logo-1.png'
  import Sidebar from './views/FileEditor/Sidebar/Sidebar.svelte'
  import CanvasContainer3D from './views/3DChart/CanvasContainer3D.svelte'

  let currentFile: File | null = null
  let cords: DataType.CordsType
  let index: number
  let blurSite = true

  $: if (currentFile) {
    void readFile(currentFile)
    blurSite = false
  }

  let readings: DataType.Reading[] = []

  async function readFile (file: File) {
    const arrayBuffer = await file.arrayBuffer()
    const decoder = new TextDecoder()
    const fileText = decoder.decode(arrayBuffer)

    readings = []

    fileText.split('\n').forEach((line) => {
      const numbers: number[] = []
      line.split(';').forEach((digitString) => {
        const digit = parseFloat(digitString)
        numbers.push(digit)
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
          confidence_level: numbers[11],
        }
        readings.push(reading)
      }
    })
  }
</script>

<svelte:head>
	<title> People counting tracker analyzer</title>
	<meta name=" People counting tracker analyzer"/>
	<html lang="en" />
</svelte:head>

<main>
  <Sidebar
    bind:readings
    bind:cords
    bind:index
    on:onFile={(e) => {
      currentFile = e.detail.file
    }}
  />
  {#if blurSite}
    <div class="blured" />
    <div class="app-header">
      <div class="animate__animated animate__fadeIn animate__delay-1s">
        People counting tracker analyzer
      </div>
      <img
        class="logo animate__animated animate__fadeIn animate__delay-2s"
        src={logo}
        alt="logo"
      />
    </div>
  {:else if readings.length > 0}
    <div class="grid-container">
      <div class="main-content">
        <div class="grid-item">
          <CanvasContainer2D bind:readings bind:index />
        </div>
        <div class="grid-item">
          <CanvasContainer3D bind:readings bind:index bind:cords />
        </div>
      </div>
    </div>
  {/if}
</main>

<style lang="less">
  .grid-container {
    display: grid;
    grid-gap: 10px;
    height: 99vh;
    margin-left: 300px;
    display: flex;
  }
  :global(body) {
    padding: 0;
    margin: 0 auto;
    font-size: 18px;
    @media (max-width: 500px) {
      font-size: 13px;
    }
  }

  .main-content {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
  }
  .side-menu {
    display: table-cell;
    vertical-align: top;
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .blured {
    display: block;
    position: absolute;
    width: calc(100vw - 300px);
    height: calc(100vh);
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.459);
    backdrop-filter: blur(10px);
    left: 300px;
  }
  .app-header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    z-index: 3;
    position: absolute;
    width: calc(100vw - 300px);
    height: 10vh;
    left: 300px;
    top: 45vh;
  }
  .logo {
    width: 160px;
    height: 120px;
    margin-left: 20px;
    margin-top: 10px;
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
