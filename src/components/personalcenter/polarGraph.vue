<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myPolarGraph'></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            colors: [
                "#67C23A",//80%以上
                "#99CC66",//60%~79%
                "#E6A23C",//40%~59%
                "#F56C6C",//20%~39%
                "#c93232",//20%(不包括)以下
            ],
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
            let that = this;//暂存vue实例
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myPolarGraph,'customed');
            let option = {
                title: [
                    {
                        text: '即将进入收获期的对虾',
                        left:'center'
                    }
                ],
                polar: {
                    radius: '70%'
                },
                radiusAxis: {
                    // max: 4
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#5470c6',
                        }
                    },
                     axisLabel: {
                        textStyle: {
                            fontSize: 11,
                            color: '#61d9fb',
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                },
                angleAxis: {
                    type: 'category',
                    data: ['四个月内', '三个月内','两个月内','一个月内','两周内',],
                    startAngle: 0,
                    axisLabel: {
                        interval: 0,
                        fontSize: 14,
                        color: '#fff',
                        fontFamily: 'Microsoft YaHei',
                    },
                },
                tooltip: {},
                series: {
                    type: 'bar',
                    data: [2.9, 10.2, 12.4, 8.6, 4.1],
                    coordinateSystem: 'polar',
                    itemStyle:{
                        color: function(params){
                            return that.colors[params.dataIndex];
                        },
                        // opacity:0.85,
                    }
                },
            };
            this.myChartsInstance.setOption(option)

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
            this.fontSize = this.$refs.myPolarGraph.offsetWidth /100 *3.6;
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