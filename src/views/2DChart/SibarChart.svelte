<script lang="ts">
    import * as glChart from '../3DChart/3DChartCanvas';
    import * as DataType from '../FileEditor/DataType';
    
    export let readings: DataType.Reading[] = [];
    export let index: number;

    $: if (readings.length > 0){
      glChart.draw2DChart(readings, index,1);
      glChart.draw2DChart(readings, index,2);
      glChart.draw2DChart(readings, index,3);
    }
</script>

<div class="sidebarChart">
    <div id="chart"></div>
</div>

<style lang="less">
    .sidebarChart{
        position: absolute;
        font-size: 10px;
        right: 0;
        top: 0px;
        width: 0px;
        height: 100vh;
        background-color: #f0f0f0;
        z-index: 100;
    }
</style>