<template>
    <div class="lzj-container">
      <div class="switch">
            <el-dropdown trigger="click" @command='this.dropdownClick' >
                <p>选择时间段<i class="el-icon-arrow-down el-icon--right"></i></p>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in this.pieIIIDate" :key="index" :command='index' >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
      </div>
      <div class="lzj-chart" ref='myPie'></div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:["pieIIIDate"],
    mounted(){
        this.initChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
         // 下拉菜单回调函数
        async dropdownClick(c){
            let {name,data} =await this.pieIIIDate[c];
            this.updateChart(name,data)
        },
        // 初始化echart
        async initChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance = this.$echarts.init(this.$refs.myPie,'customed')//用获取实例来注册
            let option = {
                title: {
                    text: `${this.pieIIIDate[0].name} 对虾养殖数量占比分布`,
                    subtext: '可查看近3年数据',
                    left: 'center',
                },
                 legend: {
                    orient: 'vertical',
                    left: '0',
                    bottom:'0',
                    textStyle:{
                        color:'#5dc3ea'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {d}%'
                },
                label:{
                    color:'#e9eef3',
                    formatter:function(e){
                        return `${e.data.name}`
                    }
                },  
                series: [
                    {
                        name: '对虾养殖占比',
                        type: 'pie',
                        radius: [20, 120],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: [
                            { value: 135, name: '中国对虾' },
                            { value: 125, name: '班节对虾' },
                            { value: 118, name: '墨吉对虾' },
                            { value: 48, name: '日本对虾' },
                            { value: 82, name: '长毛对虾' }
                        ]
                    }
                ]
                };
            this.myChartsInstance.setOption(option)
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(name,data){
            let option ={ 
                 title: {
                    text: `${name} 对虾养殖数量占比分布`,
                },
                series: [ { data: data } ] 
            }
            this.myChartsInstance.setOption(option)
        },
        // 图表自适应
        adaptChart(){
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
.switch{
    position: absolute;
    right: 0;
    bottom:10px;
    z-index: 1000;
    height: 20px;
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