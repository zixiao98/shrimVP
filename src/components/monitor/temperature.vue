<template>
  <div class="lzj-container"
    v-loading="loading" 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(20,20,20,.4)">
      <div class="lzj-chart" ref='myTemperature'></div>
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
                this.updateChart({data:(Number(this.weatherTemp) +  Math.random()).toFixed(2),subtext:'更新频率：5秒/次'})
                this.dyncData(this.weatherTemp)
            }
        },
    },
    async mounted(){
        await this.intChart()
        if(this.pondId){
            this.updateChart({data:(Number(this.weatherTemp) +  Math.random()).toFixed(2),subtext:'更新频率：5秒/次'})
            this.dyncData(this.weatherTemp)
        }
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
            this.myChartsInstance =  this.$echarts.init(this.$refs.myTemperature,'customed');
            var gauge_value = 0; //能力值取代码置于值于此处
            let color = [ [0.3, '#5470c6'],[0.7, '#5dc3ea'],[1, '#ee6666']];
            let changeColor = this.getColor(gauge_value,color);
            let option = {
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
                        show: true,
                        left: 10,
                        top: 10,
                        text: '虾塘水温',
                        fontWeight: 'bolder',
                        color: changeColor
                    }
                ],
                tooltip: {
                    show: true,
                    formatter: "{a}{b}：{c}℃",
                    backgroundColor: changeColor,
                    borderColor: changeColor,
                    borderWidth: '1px',
                    fontWeight: 'bolder',
                    textStyle:{
                        color: '#fff'
                    }
                },
                series: [{
                    name: '水温',
                    type: 'gauge',
                    // startAngle: 180,
                    // endAngle: 0,
                    splitNumber: 6, //刻度数量
                    min: -10,
                    max: 50,
                    radius: '80%', //图表尺寸
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 8,
                            shadowBlur: 0,
                            color: color
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: "#fac858",
                            width: 2
                        },
                        length: 10,
                        splitNumber: 2
                    },
                    splitLine: {
                        show: true,
                        length: 20,
                        lineStyle: {
                            color: '#fac858'
                        }
                    },
                    axisLabel: {
                        distance: 12,
                        color: "#E9EEF3",
                        fontSize: 18,
                        formatter: function(e) {
                            return e;
                        }
                    },
                    pointer: {
                        show: true,
                        itemStyle:{
                            color: changeColor
                        }
                    },
                    detail: { //指针评价
                        formatter: function(e) {
                            return `${e}℃`;
                        },
                        show: true,
                        offsetCenter: [0, 40],
                        fontSize: 26,
                        color: changeColor

                    },
                    title: {
                        fontSize: 30,
                        fontWeight: 'bolder',
                        fontStyle: 'normal',
                        color: changeColor,
                        offsetCenter: [0, 15]
                    },
                    data: [{
                        name: "",
                        value: gauge_value,
                    }]
                }]
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
                title:[{subtext: data.subtext}],
                series: [{ data: [{ value: data.data}]}]
            }
            this.myChartsInstance.setOption(option)
        },
         //销毁实例
        disposeChart(){
            this.myChartsInstance.dispose();
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myTemperature.offsetWidth /100 *3.6;
            console.log(this.fontSize)
            let option = {
                label:{
                   fontSize:this.fontSize
                }
            }
            this.myChartsInstance.setOption(option)
            this.myChartsInstance.resize()//echarts实例图表自适应方法
        },
        //动态数据
        dyncData(temp){
            if(this.timer){
                clearInterval(this.timer)
            }
            //清除定时器
            let self = this;
            this.timer = setInterval(()=>{
                let temps = (Number(temp) +  Math.random()).toFixed(2);
                self.updateChart({data:temps,subtext:'更新频率：5秒/次'})
            },5000)
            
        }
    },
    beforeDestroy(){
        // 解绑事件
        window.addEventListener('resize',this.adaptChart)
        this.disposeChart();
        clearInterval(this.timer)//清除定时器
    }
}
</script>

<style lang="scss" scoped>
</style>