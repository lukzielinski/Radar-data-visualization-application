<script lang="ts">

    let new_cords = {
      x: 10,
      y: 10,
      z: 4,
    }
    
    export let scale_cords = {
      x: 10,
      y: 10,
      z: 4,
    }
</script>


<div class="scale-container">
    <div class="grid-item">Scale 3D acis</div>
    <div class="grid-item">
        <div class="input-element">
            <button class="button"  on:click={() => scale_cords.x = new_cords.x - 1}  on:click={ () => new_cords.x -= 1}> - </button>
            <div class="output">X: {new_cords.x}</div>
            <button class="button" on:click={() => scale_cords.x = new_cords.x + 1}  on:click={ () => new_cords.x += 1}> + </button>
        </div>
    </div>
    <div class="grid-item">
        <div class="input-element">
            <button class="button" on:click={() => scale_cords.y = new_cords.y - 1}  on:click={ () => new_cords.y -= 1}> - </button>
            <div class="output">Y: {new_cords.y}</div>
            <button class="button" on:click={() => scale_cords.y = new_cords.y + 1}  on:click={ () => new_cords.y += 1}> + </button>
        </div>
    </div>
    <div class="grid-item">
        <div class="input-element">
            <button class="button" on:click={() => scale_cords.z = new_cords.z - 1}  on:click={ () => new_cords.z -= 1}> - </button>
            <div class="output">Z: {new_cords.z}</div>
            <button class="button" on:click={() => scale_cords.z = new_cords.z + 1}  on:click={ () => new_cords.z += 1}> + </button>
        </div>
    </div>
</div>



<style lang="less">
    .input-element{
        width: 300px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .scale-container{
        height: 350px;
        width: 300px;
        display: grid;
        grid-template-rows: 20% 20% 20% 20%;
    }
    .grid-item{
        display: flex;
        justify-content: center;
        align-items: center;
    }

.button {
  appearance: button;
  background-color: transparent;
  background-image: linear-gradient(to bottom, rgb(228, 228, 228), #e1e1e1);
  border: 0 solid #e5e7eb;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #482307;
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 20px;
  outline: 2px solid transparent;
  padding: 0.4rem 2rem;
  text-align: center;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: -6px 8px 10px rgba(81,41,10,0.1),0px 2px 2px rgba(81,41,10,0.2);
}

.button:active {
  background-color: #f3f4f6;
  box-shadow: -1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15);
  transform: translateY(0.125rem);
}

.button:focus {
  box-shadow: rgba(72, 35, 7, .46) 0 0 0 2px, -3px 6px 1px rgba(81,41,10,0.1), 0px 1px 1px rgba(81,41,10,0.2);
}
  .button{
    &:hover {
      cursor: pointer;
    }
  }
</style>
