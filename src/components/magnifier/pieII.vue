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
                    text: '海水养殖产量占比分布',
                    subtext: '近5年数据',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    bottom: 'bottom',
                },
                label:{
                    color:'#fff',
                    formatter:function(e){
                        return `${e.data.name} ${e.data.value}%`
                    }
                },               
                series: [
                    {
                        name: '产量占比(%)',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 35, name: '广东' },
                            { value: 25, name: '广西' },
                            { value: 18, name: '海南' },
                            { value: 8, name: '山东' },
                            { value: 12, name: '其他' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
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