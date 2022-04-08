<template>
    <div class="lzj-container">
      <div class="switch">
            <el-dropdown trigger="click" @command='this.dropdownClick' >
                <p>选择时间段<i class="el-icon-arrow-down el-icon--right"></i></p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in this.barIIIDate" :key="index" :command='index' >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
      </div>
      <div class="lzj-chart" ref='myBarIII'></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            monthArrI:['1', '2', '3', '4', '5','6'],
            monthArrII:['7', '8', '9', '10', '11','12'],
        }
    },
    props:["barIIIDate"],
    mounted()
    {
        this.intChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 下拉菜单回调函数
        async dropdownClick(c){
            let {name,data} =await this.barIIIDate[c];
            let monthArr = this.getMonthArr(name)
            console.log(name,data,monthArr)
            this.updateChart(name,data,monthArr)
        },
        //判断月份
        getMonthArr(name){
            let arr = Array.from(name);//转成数组
            return arr.includes('上') ? this.monthArrI : this.monthArrII;
        },
        // 初始化echart
        async intChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance =  this.$echarts.init(this.$refs.myBarIII,'customed');
            this.myChartsInstance.setOption({
                title: {
                    text: `${this.barIIIDate[0].name} 对虾产量变化`,
                    subtext: '可查看近3年数据',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                xAxis: {
                    name:'月',
                    offset:2,
                    data: ['1', '2', '3', '4', '5','6'],
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLabel:{//坐标轴刻度
                        color:'#ccc',
                    },
                },
                yAxis: {
                    name:'千万吨',
                    offset:2,
                    nameTextStyle:{
                        color:'#fff'
                    },
                    axisLabel:{//坐标轴刻度
                        color:'#ccc',
                    },
                    splitLine:{//分割横线
                        lineStyle:{
                            color:'#ccc',
                            type:'dashed'
                        }
                    },
                },
                series: [
                    {
                        name: '产量(千万吨)',
                        type: 'bar',
                        data: [49.24, 62.12, 71.23, 80.23,56.23,61.31],
                    },
                    
                ]
            })

        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(name,data,monthArr){
            console.log(name)
            let option ={
                title: {
                    text: `${name} 对虾产量变化`,
                },
                xAxis: {
                    data: monthArr,
                },
                series: [
                    {
                        data:data,
                    },
                    
                ]
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
            this.fontSize = this.$refs.myBarIII.offsetWidth /100 *3.6;
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
.switch{
    z-index: 1000;
    height: 25px;
    padding: 10px 20px 0 20px;
    p{
        width: 100%;
        font-size: 16px;
        margin:0;
        color: #5dc3ea;
        cursor: pointer;
    }
}
/deep/.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
            background-color: #5dc3ea;
            color:#fff;
        }
</style>