<script lang="ts">
  import * as DataType from './Canvas/DataType';
  import SidebarChart from './Canvas/SibarChart.svelte';
  export let readings: DataType.Reading[];

  export let index = 0;

  let playInterval: Timer;
  let isSidebarVisible = false;

  function incrementIndex (){
    index++;
  }

  function decrementIndex (){
    index--;
  }
    
</script>

{#if readings.length != 0}
<div class="sidebar">
    <div class="grid-item">
        frame:  {readings[index].tid}
    </div>
    <div class="grid-item">posX:{readings[index].posX}</div>
    <div class="grid-item">posY:{readings[index].posY}</div>
    <div class="grid-item">posZ:{readings[index].posZ}</div>
</div>
<div>
    <div class='button forward'on:click={() => {incrementIndex()}}>+</div>
    <div class='button backward' on:click={() => {decrementIndex()}}>-</div>
    <div class='button play' on:click={() => {playInterval = setInterval(incrementIndex, 50)}}>play</div>
    <div class='button stop' on:click={() => {clearInterval(playInterval)}}>stop</div>
</div>
<div class="showSideBar">
    <div class='button showSideBarButton' on:click={() => {isSidebarVisible = !isSidebarVisible}}>show</div>
</div>
{/if}
{#if isSidebarVisible}
    <SidebarChart {readings} {index}/>
{/if}
<style lang="less">
    .sidebar {
        position: absolute;
        font-size: 10px;
        left:0;
        bottom: 0px;
        width: 200px;
        height: 100px;
        background-color: #f0f0f0;
        border-right: 1px solid #e0e0e0;
        display: grid;
        grid-template-columns: auto;
    }
    .grid-item{
        border: 1px solid #e1e1e1;
        background-color: rgba(215, 215, 215, 0);
    }
    .button{
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid rgb(62, 62, 62);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        background-color: rgb(199, 199, 199);
        color: white;
        cursor: pointer;
        transition: 1s;
    }
    }
    .forward{
        bottom: 30px;
        right: 30px;
    }
    .backward{
        bottom: 30px;
        right: 60px;
    }
    .play{
        font-size: 10px;
        width: 100px;
        bottom: 30px;
        right: 90px;
    }
    .stop{
        font-size: 10px;
        width: 100px;
        bottom: 30px;
        right: 190px;
    }
    .showSideBarButton{
        position: absolute;
        width: 100px;
        top: 30px;
        left: 30px;
    }
</style>
