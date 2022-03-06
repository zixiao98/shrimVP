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
                    text: '图一'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子','帽子']
                },
                yAxis: {},
                series: [
                    {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20,1]
                    }
                ]
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.lzj-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
// charts
.lzj-chart{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>