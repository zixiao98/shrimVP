<template>
    <div class="lzj-container">
        <div class="switch">
                <el-dropdown trigger="click" @command='this.dropdownClick' >
                    <p>选择时间段<i class="el-icon-arrow-down el-icon--right"></i></p>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in this.pieIIDate" :key="index" :command='index' >{{item.name}}</el-dropdown-item>
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
    props:["pieIIDate"],
    mounted(){
        this.initChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
         // 下拉菜单回调函数
        async dropdownClick(c){
            let {name,data} =await this.pieIIDate[c];
            this.updateChart(name,data)
        },
        // 初始化echart
        async initChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance = this.$echarts.init(this.$refs.myPie,'customed')//用获取实例来注册
            this.myChartsInstance.setOption({
                title: {
                    text: `${this.pieIIDate[0].name} 海水养殖产量占比分布`,
                    subtext: '可查看近6年数据',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {d}%'
                },
                legend: {
                    orient: 'vertical',
                    left: '0',
                    bottom:'0',
                    textStyle:{
                        color:'#5dc3ea'
                    }
                },
                label:{
                    color:'#e9eef3',
                    formatter:function(e){
                        return `${e.data.name}${e.percent}%`
                    }
                },               
                series: [
                    {
                        name: '产量占比(%)',
                        type: 'pie',
                        radius: '50%',
                        data: this.pieIIDate[0].data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                    }
                ]
            })
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(name,data){
            let option ={ 
                 title: {
                    text: `${name} 海水养殖产量占比分布`,
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