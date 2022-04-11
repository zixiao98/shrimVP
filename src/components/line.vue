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
                title: {
                    text: '近年对虾养殖户增长率',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis: {
                    name:'年份',
                    type: 'category',
                    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                    offset:5,
                    nameTextStyle:{
                        color:'#fff',
                        align:'center',
                    },
                    axisLabel: {
                        color: '#e9eef3',
                        fontSize: 12
                    }
                    
                },
                yAxis: {
                    type: 'value',
                    name:'增长率%',
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
                    data: [1.29, 1.33, 1.32,0.82, 0.93, 0.61, 0.98, ],
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
    },
    beforeDestroy(){
         // 解绑事件
        window.removeEventListener('resize',this.adaptChart)
    }

}
</script>

<style lang="scss" scoped>

</style>