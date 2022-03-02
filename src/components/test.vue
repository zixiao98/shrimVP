<template>
  <div class="lzj-container">
      <div class="lzj-chart"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    mounted()
    {
        this.intChart()
    },
    methods:{
        intChart(){
            var myChart =  this.$echarts.init(document.querySelector('.lzj-chart'));
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            })

        }
    }
}
</script>

<style>

</style>