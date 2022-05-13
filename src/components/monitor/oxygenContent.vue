<template>
    <div class="lzj-container"
        v-loading="loading" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(20,20,20,.4)">
        <div class="lzj-chart" ref='myCircle'></div>
    </div>
</template>

<script>
import 'echarts-liquidfill'
export default {
    props:["pondId","weatherTemp"],
    data(){
        return {
            loading:true,
            timer:null,//定时器id
            newDate:0.67,
            color: [
                "#67C23A",//80%以上
                "#99CC66",//60%~79%
                "#E6A23C",//40%~59%
                "#F56C6C",//20%~39%
                "#c93232",//20%(不包括)以下
            ],
        }
    },
    watch:{
        "weatherTemp":function(newVal,oldVal){
            console.log(newVal,oldVal)
            if(newVal&&this.pondId){
                let num =  Number(this.weatherTemp)*3/100 + Math.random()/10/3.5
                this.updateChart(num,'更新频率：10秒/次')
                this.dyncData(this.weatherTemp)
            }
        }
    },
    async mounted(){
        await this.intChart()
        if(this.pondId){
            let num =  Number(this.weatherTemp)*3/100 + Math.random()/10/3.5
            this.updateChart(num,'更新频率：10秒/次')
            this.dyncData(this.weatherTemp)
        }
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 下拉菜单回调函数
        async dropdownClick(){
            let {name,data} ={name:'中国对虾',data:0.68};
            let color = this.getColor(data)
            this.updateChart(name,data,color)
        },
        //判断水球图颜色
        getColor(data){
            let color=undefined;
            switch(true){//判断大小时，需要传入true
                case data>=0.8:color = this.color[0];break;
                case data>=0.6:color = this.color[1];break;
                case data>=0.4:color = this.color[2];break;
                case data>=0.2:color = this.color[3];break;
                case data<0.2:color = this.color[4];break;
                default:break;
            }
            return color;
        },
        // 初始化echart
        async intChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myCircle,'customed');
            let option = {
                title: [
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
                        text: '含氧量',
                        x: 'center',
                        y: '35%',
                        textStyle: {
                            color: '#CCFFFF',
                            fontWeight:'normal',
                        },
                    },
                    {
                        text: '虾塘含氧量',
                        left:'center',
                        bottom:20,
                    },
                   
                ],
                series:[
                    {
                        type: 'liquidFill',
                        // waveAnimation:0,//禁用动画
                        animationDuration: 800,
                        animationDurationUpdate: 800,
                        radius: '70%',
                        center: ['50%', '45%'],
                        color: [this.getColor(0)],
                        data: [0],//data个数代表波浪数
                       
                        backgroundStyle: {
                            borderWidth: 0,
                            color: 'rgba(51, 66, 127, 0.4)',
                        },
                        label: {
                            fontSize: 18,
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontWeight:'normal',
                        },
                        outline: {
                            show: true,
                            borderDistance: 10,
                            itemStyle: {
                                borderWidth: 3,
                                borderColor: this.getColor(0),
                            },
                        },
                       
                    },
                ],
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
        updateChart(data,subtext){
             let option ={
                title:[{subtext: subtext}],
                series: [{ 
                    color: [this.getColor(data)],
                    data: [data],
                    outline: {
                        itemStyle: {
                            borderColor: this.getColor(data),
                        },
                    },
                }]
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myCircle.offsetWidth /100 *3.6;
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
        //动态数据
        dyncData(temp){
            if(this.timer){
                clearInterval(this.timer)
            }
            //清除定时器
            let self = this;
            this.timer = setInterval(()=>{
                let num =  Number(temp)*3/100 + Math.random()/10/3.5
                self.updateChart(num,'更新频率：10秒/次')
            },10000)
            
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