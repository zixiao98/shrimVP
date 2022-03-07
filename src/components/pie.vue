<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myPie'></div>
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
            this.myChartsInstance = this.$echarts.init(this.$refs.myPie,'customed')//用获取实例来注册
            this.myChartsInstance.setOption({
                title: {
                    text: 'my pie',
                    subtext: 'Fake Data',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: 'xx对虾1' },
                            { value: 735, name: 'xx对虾2' },
                            { value: 580, name: 'xx对虾3' },
                            { value: 484, name: 'xx对虾4' },
                            { value: 300, name: 'xx对虾5' }
                        ],
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
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