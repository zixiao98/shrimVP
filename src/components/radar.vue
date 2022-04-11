<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myRadar'></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dataMax : 60,
            source :{
                data: [43, 10, 28, 35, 50, 19],
                indicator: [
                    { name: '学生饭堂', max: this.dataMax},
                    { name: '网购', max: this.dataMax},
                    { name: '零售', max: this.dataMax},
                    { name: '酒店收购', max: this.dataMax},
                    { name: '出口海外', max: this.dataMax},
                    { name: '企业收购', max: this.dataMax},
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
        // 处理数据
        buildSeries(data){
            const helper = data.map((item, index) => {
                const arr = new Array(data.length);
                arr.splice(index, 1, item);
                return arr;
            })

            return [data, ...helper].map((item, index) => {
                return {
                    type: 'radar',
                    itemStyle: {
                        color: '#31e586'
                    },
                    lineStyle: {
                        color: index === 0 ? '#31e586' : 'transparent'
                    },
                    areaStyle: {
                        color: index === 0 ? '#31e586' : 'transparent',
                        opacity: 0.3
                    },
                    tooltip: {
                        show: index === 0 ? false : true,
                        formatter: function() {
                            return this.source.indicator[index - 1].name + '不满意度：' + this.source.data[index - 1]+'%';
                        }
                    },
                    z: index === 0 ? 1 : 2,
                    data: [item]
                }
            })
        },
        // 初始化echart
        async initChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance = this.$echarts.init(this.$refs.myRadar,'customed')//用获取实例来注册
            const initOption = {
                title: {
                    text: '2021年对虾销售方向',
                    left: 'center',
                },
                tooltip: {},
                radar: {
                // shape: 'circle',
                splitNumber: 7,
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(12,62,129,0)','rgba(12,62,129,0.3)','rgba(12,62,129,0)','#c93232']
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                indicator: this.source.indicator,
                
                },
                series: this.buildSeries(this.source.data)      
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