<template>
  <div class="lzj-container"
    v-loading="loading" 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(20,20,20,.4)">
      <div class="lzj-chart" ref='myPh'></div>
  </div>
</template>

<script>
export default {
    props:["pondId","weatherTemp"],
    data(){
        return {
            loading:true,
            timer:null,//定时器id
        }
    },
     watch:{
        "weatherTemp":function(newVal,oldVal){
            console.log(newVal,oldVal)
            if(newVal&&this.pondId){
                this.updateChart({data:[6.3, 4.5, 3.8, 5.8, 7.2, 8.1],subtext:'更新频率：4小时/次'})
            }
        },
    },
    async mounted(){
        await this.intChart()
        if(this.pondId){
            this.updateChart({data:[6.3, 4.5, 3.8, 5.8, 7.2, 8.1],subtext:'更新频率：4小时/次'})
        }
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 初始化echart
        async intChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myPh,'customed');
            var data = [0, 0, 0, 0, 0, 0,];
            var data1 = [14, 14, 14, 14, 14, 14,];
            var xdata = ['过去24h', '过去20h', '过去16h', '过去12h', '过去8h', '过去4h'];
            let option = {
                title:[
                     {
                        show: true,
                        x: "center",
                        subtext:'未连接',
                        subtextStyle:{
                            fontSize:16,
                            color: "#ddd",
                        }
                    },
                    {
                    text:'虾塘过去24时PH值',
                    left:'center',
                    bottom:20,
                }],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label:{
                            // formatter: '123'
                        }
                    }
                },
                grid: {
                    left: "5%",
                    containLabel: true
                },
                xAxis: {
                    name:'时间',
                    offset:5,
                    nameTextStyle:{
                        color:'#fff',
                        align:'center',
                    },
                    data: xdata,
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 12
                    }
                },
                yAxis: {
                    name:'PH',
                    nameTextStyle:{
                        color:'#fff'
                    },
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E6E9F0',
                            type:'dashed'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        color: '#1F2E4D',
                        fontSize: 12
                    }
                },
                series: [{
                        type: 'bar',
                        animation: false,
                        barWidth: 15,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data,
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            color: '#ccc',
                            opacity: .3,
                            borderRadius : [100, 100, 100, 100]
                        },
                        zlevel: 11
                    },
                    { // For shadow
                        type: 'bar',
                        barWidth: 15,
                        itemStyle: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#CC0033' // 0% 处的颜色  
                            }, {
                                offset: 0.5,
                                color: '#339933' // 50% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#663366' // 100% 处的颜色
                            }], false),
                                borderRadius : [100, 100, 100, 100],
                        },
                        barGap:'-100%',
                        barCategoryGap:'40%',
                        data: data1,
                        animation: false
                    },
                    {
                        type: 'scatter',
                        data: data,
                        symbolSize: 18,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor:'#ccc',
                            color: '#5dc3ea',
                        },
                        zlevel: 12
                    }

                ]
            };

            this.myChartsInstance.setOption(option)
            let timer =  setTimeout(()=>{
                this.loading = false;
                clearTimeout(timer)
            },300)
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(data){
            let option ={
                title:[{subtext:data.subtext}],
                series:[
                    {data:data.data},
                    {data:[14, 14, 14, 14, 14, 14]},
                    {data:data.data}
                ]
            };
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myPh.offsetWidth /100 *3.6;
            console.log(this.fontSize)
            let option = {
                label:{
                   fontSize:this.fontSize
                }
            }
            this.myChartsInstance.setOption(option)
            this.myChartsInstance.resize()//echarts实例图表自适应方法
        },
        //销毁实例
        disposeChart(){
            this.myChartsInstance.dispose();
        },
    },
    beforeDestroy(){
        // 解绑事件
        window.addEventListener('resize',this.adaptChart)
        this.disposeChart();
    }
}
</script>

<style lang="scss" scoped>
</style>