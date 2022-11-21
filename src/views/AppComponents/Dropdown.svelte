<script lang="ts">
      import * as icons from '@fortawesome/free-solid-svg-icons'
      import Fa from 'svelte-fa/src/fa.svelte'

let optionsVisible = false
let selected: number
let placeholder = 'Select point'

function selectRobot () {
        console.log(optionsVisible)
}

function toggleVisibility () {
        optionsVisible = !optionsVisible
}
</script>

<div class="dropdown-container">
    <div class="dropdown" on:click={() => toggleVisibility()}>
        <div class="dropdown-row">
            <div class="grid-item">
                {selected ? selected : placeholder}
            </div>
            <div class="grid-item">
                <Fa icon={icons.faAngleDown} />
            </div>
        </div>
    </div>
    {#if optionsVisible}
        <div class="section-dropdown">
            <!-- {#each elements as element}
                <div class="dropdown-element" on:click={() => selectRobot(element)} on:click={() => toggleVisibility()}>{element.name}</div>
            {/each} -->
        </div>
    {/if}
</div>

<style lang="less">
    .dropdown-container {
        max-width: 200px;
        text-align: center;
    }
    .dropdown {
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 15px;
        line-height: 2;
        height: 50px;
        transition: all 200ms linear;
        border-radius: 4px;
        width: 200px;
        letter-spacing: 1px;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        justify-content: left;
        -ms-flex-pack: center;
        text-align: center;
        border: none;
        background-color: #d6d6d6;
        cursor: pointer;
        color: #5f5f5f;
        box-shadow: 0 12px 35px 0 rgba(255, 235, 167, 0.15);
    }
    .dropdown-row {
        display: grid;
        width: 100%;
        grid-template-columns: 95% 5%;
        margin-left: 10px;
    }
    .borderBottom {
        border-bottom: 2px solid rgba(228, 24, 24, 0.76) !important;
    }
    .section-dropdown {
        margin-top: -12px;
        position: relative;
        cursor: pointer;
        align-items: center;
        border: 1px solid rgb(153, 153, 153);
        background-color: #e5e5e5 !important;
        width: 100%;
        border-radius: 4px;
        display: block;
        box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);
        transform: translateY(20px);
        transition: all 200ms linear;
    }

    .dropdown-element {
        position: relative;
        cursor: pointer;
        color: #646464;
        height: 20px;
        transition: all 200ms linear;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 15px;
        border-radius: 2px;
        padding-right: 10px;
        padding: 5px 0;
        text-decoration: none;
        align-items: center;
        justify-content: space-between;
        -ms-flex-pack: distribute;
        cursor: pointer;
    }
    .dropdown-element:hover {
        color: #ffffff;
        background-color: #979797;
    }
</style>
