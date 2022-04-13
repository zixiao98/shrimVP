<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myTemperatureVc'></div>
  </div>
</template>

<script>
export default {
    props:["TemperatureVcData"],
    data(){
        return {
            
        }
    },
    watch:{
        "TemperatureVcData":function(newVal){
            this.updateChart(newVal)
            this.$parent.weatherChartLoading = false;
            
        }
    },
    mounted(){
        this.intChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        getColor(value,color){
            if(value > 32){
                return color[2][1];
            }else if(value >8){
                return color[1][1];
            }else{
                return color[0][1];
            }
        },
        // 初始化echart
        async intChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myTemperatureVc,'customed');
            let option = {
                title: {
                    text: '近7天的温度预测',
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3',
                    left: '6%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['最高温度', '平均温度', '最低温度'],
                    right: '4%',
                    fontSize: 12,
                    color: '#F1F1F3'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    // data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
                }],
                yAxis: [{
                    type: 'value',
                    name: '单位（℃）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },{
                    type: 'value',
                    name: '单位（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },{
                    type: 'value',
                    name: '单位（hPa）',
                    offset: 10,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '最高温度',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                            width: 1
                    },
                    areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 50, 51, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(219, 50, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10

                    },
                    itemStyle: {

                            color: 'rgb(219,50,51)',
                            borderColor: 'rgba(219,50,51,0.2)',
                            borderWidth: 12
                    },
                    // data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
                }, {
                    name: '平均温度',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                            width: 1
                    },
                    areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(137, 189, 27, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(137, 189, 27, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                    },
                    itemStyle: {
                            color: 'rgb(137,189,27)',
                            borderColor: 'rgba(137,189,2,0.27)',
                            borderWidth: 12

                    },
                    
                    // data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
                }, {
                    name: '最低温度',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                            width: 1
                    },
                    areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                    },
                    itemStyle: {
                            color: 'rgb(0,136,212)',
                            borderColor: 'rgba(0,136,212,0.2)',
                            borderWidth: 12

                    },
                    
                    // data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
                }, ]
            };

            this.myChartsInstance.setOption(option)

        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(data){
            let option ={
                xAxis: [
                    {data: data[0]}
                ],
                series: [
                    { data: data[1]}, 
                    { data: data[3]}, 
                    { data: data[2]}, 
                ]
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myTemperatureVc.offsetWidth /100 *3.6;
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