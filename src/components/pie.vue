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
                    text: '2021年国内对虾种类养殖占比',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {d}%'
                },
                legend: {
                    orient: 'vertical',
                    left: '0',
                    bottom:'0',
                    textStyle:{
                        color:'#5dc3ea'
                    }
                },
                label:{
                    color:'#e9eef3',
                    formatter:function(e){
                        return `${e.data.name}`
                    }
                },  
                series: [
                    {
                        name: '养殖占比(%)',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '中国对虾' },
                            { value: 735, name: '斑节对虾' },
                            { value: 380, name: '日本对虾' },
                            { value: 584, name: '墨吉对虾' },
                            { value: 810, name: '长毛对虾' }
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
    },
    beforeDestroy(){
         // 解绑事件
        window.removeEventListener('resize',this.adaptChart)
    }

}
</script>

<style lang="scss" scoped>

</style>