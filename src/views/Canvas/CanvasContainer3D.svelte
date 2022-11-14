<script lang="ts">
  import * as DataType from './DataType';
  import * as glCharts from './glChart';
  
  export let readings: DataType.Reading[] = [];
  export let index: number;
  

  $:if (index){
    void glCharts.initCharts(readings,index);
  }
</script>

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
  