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
            let option = {
                title: {
                    text: '对虾种类养殖数量占比分布',
                    subtext: '近5年数据',
                    left: 'center',
                },
                 legend: {
                    orient: 'vertical',
                    left: '0',
                    bottom:'0'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {d}%'
                },
                label:{
                    color:'#fff',
                    formatter:function(e){
                        return `${e.data.name}`
                    }
                },  
                series: [
                    {
                        name: '对虾养殖占比',
                        type: 'pie',
                        radius: [20, 120],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: [
                            { value: 135, name: '中国对虾' },
                            { value: 125, name: '班节对虾' },
                            { value: 118, name: '墨吉对虾' },
                            { value: 48, name: '日本对虾' },
                            { value: 82, name: '长毛对虾' }
                        ]
                    }
                ]
                };
            this.myChartsInstance.setOption(option)
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(data){
            let option ={ series: [ { data: data.pieII.series.data } ] }
            this.myChartsInstance.setOption(option)
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