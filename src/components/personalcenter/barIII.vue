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
                    text: '近年来年产量变化',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis: {
                    name:'年',
                    data: ['2016', '2017', '2018', '2019', '2020','2021'],
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLabel:{//坐标轴刻度
                        color:'#ccc',
                    },
                },
                yAxis: {
                    name:'千万吨',
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLabel:{//坐标轴刻度
                        color:'#ccc',
                    },
                    splitLine:{//分割横线
                        lineStyle:{
                            color:'#ccc',
                            type:'dashed'
                        }
                    },
                },
                series: [
                    {
                        name: '产量(千万吨)',
                        type: 'bar',
                        data: [49.24, 62.12, 71.23, 80.23,56.23,61.31],
                    },
                    
                ]
            })

        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(data){
            let option ={
                xAxis: {
                    data: data.barII.xAxis.data,
                },
                series: [
                    {
                        data:data.barII.series.data,
                    },
                    
                ]
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myTest.offsetWidth /100 *3.6;
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
        window.addEventListener('resize',this.adaptChart)
    }
}
</script>

<style lang="scss" scoped>
</style>