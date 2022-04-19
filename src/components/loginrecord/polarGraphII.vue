<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myPolarGraph' v-loading="Loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"  element-loading-background="rgba(20,20,20,.4)"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            Loading:true,
            colors: [
                "#67C23A",//80%以上
                "#99CC66",//60%~79%
                "#E6A23C",//40%~59%
                "#F56C6C",//20%~39%
                "#c93232",//20%(不包括)以下
            ],
            polarGraphIIData:[],//暂存数据
            hours:['0时', '晚1时', '晚2时', '晚3时', '早4时', '早5时', '早6时',
                    '早7时', '早8时', '早9时','早10时','早11时',
                    '12时', '午1时', '午2时', '午3时', '午4时', '午5时',
                    '晚6时', '晚7时', '晚8时', '晚9时', '晚10时', '晚11时'],
            days:['周一','周二','周三','周四','周五','周六', '周日'],
            fristData:[[0,0,0],[0,1,0],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,0],[0,12,0],[0,13,0],[0,14,0],[0,15,0],[0,16,0],[0,17,0],[0,18,0],[0,19,0],[0,20,0],[0,21,0],[0,22,0],[0,23,0],
                        [1,0,0],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,0],[1,11,0],[1,12,0],[1,13,0],[1,14,0],[1,15,0],[1,16,0],[1,17,0],[1,18,0],[1,19,0],[1,20,0],[1,21,0],[1,22,0],[1,23,0],
                        [2,0,0],[2,1,0],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,0],[2,11,0],[2,12,0],[2,13,0],[2,14,10],[2,15,0],[2,16,0],[2,17,0],[2,18,0],[2,19,0],[2,20,0],[2,21,0],[2,22,0],[2,23,0],
                        [3,0,0],[3,1,0],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,0],[3,9,0],[3,10,0],[3,11,0],[3,12,0],[3,13,0],[3,14,0],[3,15,0],[3,16,0],[3,17,0],[3,18,0],[3,19,0],[3,20,0],[3,21,0],[3,22,0],[3,23,0],
                        [4,0,0],[4,1,0],[4,2,0],[4,3,0],[4,4,0],[4,5,0],[4,6,0],[4,7,0],[4,8,0],[4,9,0],[4,10,0],[4,11,0],[4,12,0],[4,13,0],[4,14,0],[4,15,0],[4,16,0],[4,17,0],[4,18,0],[4,19,0],[4,20,0],[4,21,0],[4,22,0],[4,23,0],
                        [5,0,0],[5,1,0],[5,2,0],[5,3,0],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,0],[5,9,0],[5,10,0],[5,11,0],[5,12,0],[5,13,0],[5,14,0],[5,15,0],[5,16,10],[5,17,0],[5,18,0],[5,19,0],[5,20,0],[5,21,0],[5,22,0],[5,23,0],
                        [6,0,0],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,0],[6,11,0],[6,12,0],[6,13,0],[6,14,0],[6,15,0],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,0],[6,21,0],[6,22,0],[6,23,0]],
            dataModel:[  //星期几 几点 多少次
                [[0,0,0],[0,1,0],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,0],[0,12,0],[0,13,0],[0,14,0],[0,15,0],[0,16,0],[0,17,0],[0,18,0],[0,19,0],[0,20,0],[0,21,0],[0,22,0],[0,23,0]],
                [[1,0,0],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,0],[1,11,0],[1,12,0],[1,13,0],[1,14,0],[1,15,0],[1,16,0],[1,17,0],[1,18,0],[1,19,0],[1,20,0],[1,21,0],[1,22,0],[1,23,0]],
                [[2,0,0],[2,1,0],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,0],[2,11,0],[2,12,0],[2,13,0],[2,14,0],[2,15,0],[2,16,0],[2,17,0],[2,18,0],[2,19,0],[2,20,0],[2,21,0],[2,22,0],[2,23,0]],
                [[3,0,0],[3,1,0],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,0],[3,9,0],[3,10,0],[3,11,0],[3,12,0],[3,13,0],[3,14,0],[3,15,0],[3,16,0],[3,17,0],[3,18,0],[3,19,0],[3,20,0],[3,21,0],[3,22,0],[3,23,0]],
                [[4,0,0],[4,1,0],[4,2,0],[4,3,0],[4,4,0],[4,5,0],[4,6,0],[4,7,0],[4,8,0],[4,9,0],[4,10,0],[4,11,0],[4,12,0],[4,13,0],[4,14,0],[4,15,0],[4,16,0],[4,17,0],[4,18,0],[4,19,0],[4,20,0],[4,21,0],[4,22,0],[4,23,0]],
                [[5,0,0],[5,1,0],[5,2,0],[5,3,0],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,0],[5,9,0],[5,10,0],[5,11,0],[5,12,0],[5,13,0],[5,14,0],[5,15,0],[5,16,0],[5,17,0],[5,18,0],[5,19,0],[5,20,0],[5,21,0],[5,22,0],[5,23,0]],
                [[6,0,0],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,0],[6,11,0],[6,12,0],[6,13,0],[6,14,0],[6,15,0],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,0],[6,21,0],[6,22,0],[6,23,0]]],
        }
    },
    async mounted(){   
        this.fristData = await this.getData()//获取最终处理好的数据
        this.intChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 初始化echart
        async intChart(){
            let that = this;
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myPolarGraph,'customed');
            let option = {
                title: {
                    text: '登录时间段统计',
                },
                polar: {},
                tooltip: {
                    formatter: function (params) {
                        // return days[params.value[0]] + hours[params.value[1]] +  ' 有 '+ params.value[2] + ' 次登录 ';
                        return `${that.days[params.value[0]]} (${that.hours[params.value[1]]}) ${params.value[2]}次`;
                    }
                },
                angleAxis: {
                    type: 'category',
                    data: this.hours,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.15)',
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color:"#5dc3ea"
                    }
                },
                radiusAxis: {
                    type: 'category',
                    data: this.days,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        rotate: -45,
                         fontSize: 11,
                            color: "#fc8452",
                    }
                },
                series: [{
                    name: 'Punch Card',
                    type: 'scatter',
                    coordinateSystem: 'polar',
                    symbolSize: function (val) {
                        return val[2] * 2;
                    },
                    data: this.fristData,
                    itemStyle:{
                        color: '#c93232',
                        // opacity:0.85,
                    }
                }]
            };
            this.myChartsInstance.setOption(option) 
        },
        // 获取数据
        async getData(){
            let token = localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/loginrecord/all`,{headers: {'Authorization': 'Bearer '+token,}}))
            if(res?.status === 200){
                res.data.data.filter(item=>{
                    let time = new Date(item.loginTime).toString().replace(' GMT+0800 (中国标准时间)','')
                    this.polarGraphIIData.push(time)
                })
                this.polarGraphIIData.push('Tue Apr 18 2022 01:28:01')
                return this.dealData(this.classify())
            }
            if(err){
                this.$noticeInfo('error','失败','获取数据失败！！',3000)
            }
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
        //将周一到周日的登录时间点剥离到数组中 eg:['19','19']方便之后用census方法统计每个时间段登录的次数
        filterByDays(day,arr){
            let reg = new RegExp(day)
            let newArr =  arr.filter(item=>{
                return item.match(reg) 
            })
            return newArr.map(item=>{
                return item.split(" ")[4].split(":")[0]
            })
        },
        //分类 --- 将周一到周日的的各个时间段登录次数用object(key-value) 返回数组，下标从0-6分布表示周一到周日
        classify(){
            let Mon = this.census(this.filterByDays('Mon',this.polarGraphIIData)); 
            let Tue = this.census(this.filterByDays('Tue',this.polarGraphIIData));
            let Wed = this.census(this.filterByDays('Wed',this.polarGraphIIData));
            let Thur = this.census(this.filterByDays('Thur',this.polarGraphIIData));
            let Fri = this.census(this.filterByDays('Fri',this.polarGraphIIData));
            let Sat = this.census(this.filterByDays('Sat',this.polarGraphIIData));
            let Sun = this.census(this.filterByDays('Sun',this.polarGraphIIData));
            return [Mon,Tue,Wed,Thur,Fri,Sat,Sun]
        },
        //数据处理
        dealData(arr){
            arr.map((item,index)=>{
                // if(Object.keys(item)>0)
                for (const key in item) {
                    if (Object.hasOwnProperty.call(item, key)) {
                        let keys = Number(key)
                        let arrIitem = this.dataModel[index][keys];
                        arrIitem[2] = item[key]
                    }
                }
            })
            console.log(this.dataModel)
            return this.dataModel.reduce((pre,cur)=>{
                return pre.concat(cur)
            },[])
            
        },
        //统计一天每个时间段登录的次数
        census(arr){
            let obj = {};
            for (const item of arr) {
                if(Object.hasOwnProperty.call(obj,item)){
                    obj[item] +=1; 
                }else{
                    obj[item] =1; 
                }
            }
            return obj
        }
    },
    beforeDestroy(){
        // 解绑事件
        window.addEventListener('resize',this.adaptChart)
    }
}
</script>

<style lang="scss" scoped>
</style>