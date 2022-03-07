<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myLine'></div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.initChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 初始化echart
        async initChart(){
             // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance = this.$echarts.init(this.$refs.myLine,'customed')//用获取实例来注册
            const initOption= {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    }
                ]
            };
            this.myChartsInstance.setOption(initOption)
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