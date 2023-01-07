<script lang="ts">
  import * as DataType from '../DataType'
  import Fa from 'svelte-fa/src/fa.svelte'
  import ScaleComponent from '../../AppComponents/ScaleAxcis.svelte'
  import * as icons from '@fortawesome/free-solid-svg-icons'

  export let readings: DataType.Reading[]
  export let cords: DataType.CordsType

  export let index = 0
  let min = 0
  let stopActive = true
  let max = 100
  let timeout = 50
  $: if (readings.length > 0) {
    max = readings.length - 1
  }
  let playInterval: Timer
  let fileInput: HTMLInputElement
  let files: FileList | null = null

  import { createEventDispatcher } from 'svelte'

  $: dispatch = createEventDispatcher<{
    file: File
  }>()

  function setTimeoutDown () {
    if (timeout > 10) {
      timeout -= 10
    } else {
      timeout = 10
    }
  }

  $: file = files && files[0]

  $: if (file) {
    dispatch('onFile', { file })
  }

  function incrementIndex () {
    if (index === readings.length - 2) {
      clearInterval(playInterval)
      return
    }
    index++
  }

  function decrementIndex () {
    index--
  }
</script>


<div class="sidebar-container animate__animated animate__fadeIn">
  <div class="grid-item header-container">
    {#if file}
      <div class="file-name">
        File name: {file.name}
      </div>
    {/if}
  </div>
  <div class="grid-item {file ? 'file-content' : 'file-loader'}">
    {#if !file}
      <div class="file-load-option-item">
        <button
          class="icon"
          on:click={() => {
            fileInput.click()
          }}
        >
          <Fa icon={icons.faFileArrowUp} />
        </button>
        <button
          class="file-loader"
          on:click={() => {
            fileInput.click()
          }}
        >
          {file !== null ? file.name : 'Click To Load File'}
        </button>
        <input
          class="file-input"
          bind:files
          bind:this={fileInput}
          placeholder="Select file"
          type="file"
          accept=".csv, .dat"
        />
      </div>
    {:else}
      <div class="grid-item-file">
        <div class="scale-container">
          <div class="input-element">
            <button
              class="button"
              on:click={() => setTimeoutDown()}
              on:click={() => clearInterval(playInterval)}
            >
              -
            </button>
            <div class="output">Timestamp: {timeout}</div>
            <button
              class="button"
              on:click={() => (timeout += 10)}
              on:click={() => clearInterval(playInterval)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="grid-item-file">
        <ScaleComponent bind:scale_cords={cords} />
      </div>
      <div
        class="grid-item-file buttons-section animate__animated animate__fadeIn"
      >
      {#if stopActive}
        <button
          class="button play"
          on:click={() => {
            playInterval = setInterval(incrementIndex, timeout)
            stopActive = false
          }}
        >
          <Fa icon={icons.faPlay} />
        </button>
        {:else}
        <button
          class="button stop"
          on:click={() => {
            clearInterval(playInterval)
            stopActive = true
          }}
        >
        <Fa icon={icons.faStop} />
      </button>
      {/if}
        <button
          class="button forward"
          on:click={() => {
            incrementIndex()
          }}
        >
          <Fa icon={icons.faPlus} />
        </button>
        <button
          class="button backward"
          on:click={() => {
            decrementIndex()
          }}
        >
          <Fa icon={icons.faMinus} />
        </button>
      </div>
      <div class="grid-item-file animate__animated animate__fadeIn">
        <input type="range" bind:value={index} step={1} {min} {max} />
      </div>
    {/if}
  </div>
  <div class="grid-item reload-section">
    {#if file}
      <button
        class="file-loader"
        on:click={() => {
          fileInput.click()
        }}
      >
        {file !== null ? 'Click To Reload File' : 'SelectFile File'}
      </button>
      <input
        class="file-input"
        bind:files
        bind:this={fileInput}
        placeholder="Select file"
        type="file"
        accept=".csv, .dat"
      />
    {/if}
  </div>
</div>

<style lang="less">
  .sidebar-container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 300px;
    height: 100vh;
    background-color: #f0f0f0;
    display: grid;
    grid-template-rows: 10% auto 10%;
    border-right: 1px solid rgba(0, 0, 0, 0.153);
  }
  .input-element {
    width: 300px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .file-name{
    max-width: 300px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .scale-container {
    height: 10px;
    width: 300px;
    display: grid;
    grid-template-rows: 25% 50% 25%;
  }
  .header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
  .file-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  .file-content {
    display: grid;
    grid-template-rows: 10% auto 10% 10%;
    font-size: 20px;
    font-weight: bold;
  }
  .reload-section {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
  .grid-item-file {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
  .icon {
    font-size: 60px;
    margin-bottom: 20px;
    color: #c0c0c0;
    outline: none;
    border: none;
    &:hover {
      cursor: pointer;
      color: #3bb7ffab;
      transition: 1s;
    }
  }
  .file-input {
    display: none;
  }
  /* CSS */
  .button {
    appearance: button;
    background-color: transparent;
    background-image: linear-gradient(to bottom, #fff, #f8eedb);
    border: 0 solid #e5e7eb;
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: #482307;
    cursor: pointer;
    display: flex;
    font-size: 90%;
    font-weight: 800;
    line-height: 24px;
    margin: 10px;
    outline: 2px solid transparent;
    padding: 0.7rem 0.7rem;
    text-align: center;
    text-transform: none;
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    box-shadow: -6px 8px 10px rgba(81, 41, 10, 0.1),
      0px 2px 2px rgba(81, 41, 10, 0.2);
  }

  .button:active {
    background-color: #f3f4f6;
    box-shadow: -1px 2px 5px rgba(81, 41, 10, 0.15),
      0px 1px 1px rgba(81, 41, 10, 0.15);
    transform: translateY(0.125rem);
  }

  .button:focus {
    box-shadow: rgba(72, 35, 7, 0.46) 0 0 0 2px,
      -6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2);
  }
  .button {
    &:hover {
      cursor: pointer;
    }
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 70%;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 90%;
    height: 4.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #f3f4f6;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 26px;
    width: 12px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -11px;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #e3e3e3;
  }
  input[type='range']::-moz-range-track {
    width: 90%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #0491ae;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type='range']::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
</style>
