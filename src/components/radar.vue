<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myRadar'></div>
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
            this.myChartsInstance = this.$echarts.init(this.$refs.myRadar,'customed')//用获取实例来注册
            const initOption = {
                title: {
                    text: 'Basic Radar Chart'
                },
                legend: {
                    data: ['Allocated Budget', 'Actual Spending']
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                    { name: 'Sales', max: 6500 },
                    { name: 'Administration', max: 16000 },
                    { name: 'Information Technology', max: 30000 },
                    { name: 'Customer Support', max: 38000 },
                    { name: 'Development', max: 52000 },
                    { name: 'Marketing', max: 25000 }
                    ]
                },
                series: [
                    {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                        },
                        {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending'
                        }
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