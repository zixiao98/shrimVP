<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myTest'></div>
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
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 初始化echart
        async intChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myTest,'customed');
            this.myChartsInstance.setOption({
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

        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(){

        },
        // 图表自适应
        adaptChart(){
            this.myChartsInstance.resize()//echarts实例图表自适应方法
        },
    }
}
</script>

<style lang="scss" scoped>
</style>