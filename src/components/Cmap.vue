<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myCmap'></div>
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
            this.myChartsInstance = this.$echarts.init(this.$refs.myCmap)//用获取实例来注册
            // 获取地图数据（mapData.data）
            let mapData = await this.$axios.get('http://localhost:8088/static/map/china.json')
            // 注册地图
            this.$echarts.registerMap('china',mapData.data)
            // 配置项
            const initOption = {
                geo:{
                    type:'map',
                    map:'china'
                }
            }
            // 设置配置项
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