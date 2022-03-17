<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myRadar'></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            source :{
                indicator: [
                    { name: '水质', max: 100},
                    { name: '温度', max: 100},
                    { name: '酸碱度', max: 100},
                    { name: '含氧量', max: 100},
                    { name: '密度', max: 100},
                    { name: '饲料', max: 100},
                ]
            },
            fontSize:null,
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
            this.myChartsInstance = this.$echarts.init(this.$refs.myRadar,'customed')//用获取实例来注册
            const initOption = {
                title: {
                    text: '养殖各项需求指标',
                    left: 'left',
                },
                color: '#73c0de',
                tooltip: {},
                radar: {
                    // shape: 'circle',
                    splitNumber: 5,
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: .8
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: .8
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: 'rgba(127,95,132,.3)',
                            opacity: 1,
                            shadowBlur: 45,
                            shadowColor: 'rgba(0,0,0,.5)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 15,
                        }
                    },
                    indicator: this.source.indicator,
                },
                series: [
                    {
                        type: 'radar',
                        symbolSize: 0,
                        areaStyle: {
                            shadowBlur: 13,
                            shadowColor: 'rgba(0,0,0,.2)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 10,
                            opacity: .9
                        },
                        data: [
                            {
                            value: [42, 60, 77, 35, 50, 78],
                            name: '各项指标(100封顶)'
                            },
                        ]
                    }
                ]     
            };
            this.myChartsInstance.setOption(initOption)
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(data){
            console.log(this.myChartsInstance)
            let value = data.radarII.series.data.value;
            let option ={
                series: [
                    { data:[{value: value,name: '各项指标(100封顶)'},] }
                ]     
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myRadar.offsetWidth /100 *3.6;
            console.log(this.fontSize)
            let option = {
                label:{
                   fontSize:this.fontSize
                }
            }
            this.myChartsInstance.setOption(option)
            this.myChartsInstance.resize()//echarts实例图表自适应方法
        },
    },
    beforeDestroy(){
         // 解绑事件
        window.removeEventListener('resize',this.adaptChart)
    }

}
</script>

<style lang="scss" scoped>

</style>