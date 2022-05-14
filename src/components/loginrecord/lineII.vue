<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myLineII' v-loading="Loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"  element-loading-background="rgba(20,20,20,.4)"></div>
  </div>
</template>

<script>
import get7days from '../../js/get7days';
export default {
    data(){
        return{
            Loading:true,
            LineIIData:[],//暂存数据
        }
    },
    async mounted(){
        let {date,dateSum} = await this.beforeEightDaysData();
        console.log(date,dateSum)
        if(date.length<8){//补充
            date = get7days().slice(1,8-date.length).concat(date)
            let len = dateSum.length
            for(let i=0;i<8-len-1;i++){
                dateSum.unshift((i-1)*2+3)
            }
        }
        this.initChart(date,dateSum)
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 初始化echart
        async initChart(date=[],dateSum=[]){
             // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance = this.$echarts.init(this.$refs.myLineII,'customed')//用获取实例来注册
            const option = {
                title: {
                    text: "近来8天登录次数",
                    left: "center",
                    top: "5%",
                },
                grid: {
                    top: '18%',
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    name:'周',
                    nameLocation:'start',
                    nameTextStyle:{
                        color:'#fff'
                    },
                    boundaryGap: false,
                    data: date,
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
                    name:'次数',
                    position: 'right',
                    nameTextStyle:{
                        align:'left',
                    },
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
                        color: "#CCC", // 线条颜色
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
                    data: dateSum,
                }]
            };
            this.myChartsInstance.setOption(option)
        },
        // 获取数据
        async beforeEightDaysData(){
            let token = localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/loginrecord/beforeEightDays`,{headers: {'Authorization': 'Bearer '+token,}}))
            if(res?.status === 200){
                res.data.data.filter(item=>{
                    this.LineIIData.push(new Date(item.loginTime).toLocaleString())
                })
                return this.dealData(this.LineIIData)
            }
            if(err){
                this.$noticeInfo('error','失败','获取数据失败！！',3000)
            }
        },
        // 更新数据
        updateChart(){
            let option ={
                xAxis: {
                    data: ['前7','前6','前5','前4', '前3', '前2', '前1', '本周'],
                },
                series: [
                    {
                        data:[33, 48, 45, 31, 69, 84, 87, 100, 110, 120],
                    },
                    
                ]
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.myChartsInstance.resize()//echarts实例图表自适应方法
        },
        //数据处理
        dealData(arr){
            let newArr = arr.map(item=>{
                return item.split(" ")[0].split('/').slice(1).join('-')
            })
            return this.census(newArr)
        },
        //统计出现次数的函数
        census(arr){
            let obj = {};
            for (const item of arr) {
                if(Object.hasOwnProperty.call(obj,item)){
                    obj[item] +=1; 
                }else{
                    obj[item] =1; 
                }
            }
            let date = [];
            let dateSum = [];
            for (const index in obj) {
                date.push(index)
                dateSum.push(obj[index])
            }
            return {date,dateSum}
        }
    },
    beforeDestroy(){
         // 解绑事件
        window.removeEventListener('resize',this.adaptChart)
    }

}
</script>

<style lang="scss" scoped>

</style>