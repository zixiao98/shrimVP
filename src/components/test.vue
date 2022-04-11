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
                    text: '2021年对虾种类产量',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis: {
                    name:'种类',
                    data: ['中国对虾', '斑节对虾', '日本对虾', '墨吉对虾', '长毛对虾'],
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
                    data: [262.12, 171.23, 80.23,156.23,221.31]
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
    },
    beforeDestroy(){
        // 解绑事件
        window.addEventListener('resize',this.adaptChart)
    }
}
</script>

<style lang="scss" scoped>
</style>