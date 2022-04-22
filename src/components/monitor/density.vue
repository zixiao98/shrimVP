<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myDensity'></div>
  </div>
</template>

<script>
export default {
    props:["pondId","weatherTemp"],
    data(){
        return{
            timer:null,//定时器id
            initData:[0, 0, 0, 0, 0, 0, 0, 0],
        }
    },
     watch:{
        "weatherTemp":function(newVal,oldVal){
            console.log(newVal,oldVal)
            if(newVal){
                this.initData[7] =Number(this.weatherTemp) + Math.floor(Math.random()*10);
                // this.$set(this.initData,7,Number(this.weatherTemp) + Math.floor(Math.random()*10))
                this.updateChart({data:this.initData,subtext:'更新频率：10秒/次'})
                this.dyncData(this.weatherTemp)
            }else{
                this.updateChart({data:this.initData,subtext:'未连接'})
            }
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
            this.myChartsInstance = this.$echarts.init(this.$refs.myDensity,'customed')//用获取实例来注册
            const option = {
                title:[
                    {
                        show: true,
                        x: "center",
                        y: "85%",
                        subtext:'未连接',
                        subtextStyle:{
                            fontSize:16,
                            color: "#ddd",
                        }
                    },
                    {
                        text: "对虾密度",
                        left: 10,
                        top: 10,
                    },
                ] ,
                grid: {
                    top: '20%',
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    name:'秒',
                    nameLocation:'start',
                    nameTextStyle:{
                        color:'#fff'
                    },
                    boundaryGap: false,
                    data: ['前80','前70','前60','前50', '前40', '前30', '前20', '前10'],
                    axisLabel: {
                        margin: 30,
                        color: '#ffffff63'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: true,
                        length: 25,
                        lineStyle: {
                            color: "#ffffff1f"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff1f'
                        }
                    }
                },
                yAxis: [{
                    type: 'value',
                    name:'尾/m²',
                    position: 'right',
                    axisLabel: {
                        margin: 20,
                        color: '#ffffff63'
                    },

                    axisTick: {
                        show: true,
                        length: 15,
                        lineStyle: {
                            color: "#ffffff1f",
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff1f'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            width: 2
                        }
                    }
                }],
                series: [{
                    name: '登录次数',
                    type: 'line',
                    smooth: true, //是否平滑曲线显示
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: {
                        color: "#fff", // 线条颜色
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: "#5dc3ea"
                    },
                    itemStyle: {
                        color: "#c93232",
                        borderColor: "#fff",
                        borderWidth: 3
                    },
                    tooltip: {
                        show: false
                    },
                    areaStyle: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#eb64fb'
                            },
                            {
                                offset: 1,
                                color: '#3fbbff0d'
                            }
                        ], false),
                    },
                    data: this.initData
                }]
            };
            this.myChartsInstance.setOption(option)
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(data){
             let option ={
                title:[{subtext: data.subtext}],
                series: [{ data:data.data}]
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.myChartsInstance.resize()//echarts实例图表自适应方法
        },
        //销毁实例
        disposeChart(){
            this.myChartsInstance.dispose();
        },
        //动态数据
        dyncData(temp){
            if(this.timer){
                clearInterval(this.timer)
            }
            //清除定时器
            let self = this;
            this.timer = setInterval(()=>{
                let num = Number(temp) + Math.floor(Math.random()*10);
                this.initData.shift();
                this.initData.push(num)
                self.updateChart({data:this.initData,subtext:'更新频率：10秒/次'})
            },10000)
            
        }
    },
    beforeDestroy(){
        // 解绑事件
        window.removeEventListener('resize',this.adaptChart)
        this.disposeChart();
        clearInterval(this.timer)//清除定时器
    }

}
</script>

<style lang="scss" scoped>

</style>