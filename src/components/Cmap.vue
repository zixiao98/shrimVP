<template>
  <div class="lzj-container">
      <div class="lzj-chart" ref='myCmap'></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 地图坐标点（省会/直辖市）
            geoCoordMap :{
                台湾: [121.5135, 25.0308],
                黑龙江: [127.9688, 45.368],
                内蒙古: [110.3467, 41.4899],
                吉林: [125.8154, 44.2584],
                北京市: [116.4551, 40.2539],
                辽宁: [123.1238, 42.1216],
                河北: [114.4995, 38.1006],
                天津: [117.4219, 39.4189],
                山西: [112.3352, 37.9413],
                陕西: [109.1162, 34.2004],
                甘肃: [103.5901, 36.3043],
                宁夏: [106.3586, 38.1775],
                青海: [101.4038, 36.8207],
                新疆: [87.9236, 43.5883],
                西藏: [91.11, 29.97],
                四川: [103.9526, 30.7617],
                重庆: [108.384366, 30.439702],
                山东: [117.1582, 36.8701],
                河南: [113.4668, 34.6234],
                江苏: [118.8062, 31.9208],
                安徽: [117.29, 32.0581],
                湖北: [114.3896, 30.6628],
                浙江: [119.5313, 29.8773],
                福建: [119.4543, 25.9222],
                江西: [116.0046, 28.6633],
                湖南: [113.0823, 28.2568],
                贵州: [106.6992, 26.7682],
                云南: [102.9199, 25.4663],
                广东: [113.12244, 23.009505],
                广西: [108.479, 23.1152],
                海南: [110.3893, 19.8516],
                上海: [121.4648, 31.2891],
            },
            // 数据
            data:[
                { name: "北京", value: 199 },
                { name: "天津", value: 42 },
                { name: "河北", value: 102 },
                { name: "山西", value: 81 },
                { name: "内蒙古", value: 47 },
                { name: "辽宁", value: 67 },
                { name: "吉林", value: 82 },
                { name: "黑龙江", value: 123 },
                { name: "上海", value: 24 },
                { name: "江苏", value: 92 },
                { name: "浙江", value: 114 },
                { name: "安徽", value: 109 },
                { name: "福建", value: 116 },
                { name: "江西", value: 91 },
                { name: "山东", value: 119 },
                { name: "河南", value: 137 },
                { name: "湖北", value: 116 },
                { name: "湖南", value: 114 },
                { name: "重庆", value: 91 },
                { name: "四川", value: 125 },
                { name: "贵州", value: 62 },
                { name: "云南", value: 83 },
                { name: "西藏", value: 9 },
                { name: "陕西", value: 80 },
                { name: "甘肃", value: 56 },
                { name: "青海", value: 10 },
                { name: "宁夏", value: 18 },
                { name: "新疆", value: 180 },
                { name: "广东", value: 123 },
                { name: "广西", value: 59 },
                { name: "海南", value: 14 },
                { name: "台湾", value: '暂无' },
            ]
        }
    },
    mounted(){
        this.initChart()
        window.addEventListener('resize',this.adaptChart)
    },
    methods:{
        // 整合散点图数据
        converData(data,geoCoordMap){
            var res = [];
            for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                    });
                }
            }
            console.log(res)
            return res;
            
        },
        // 初始化echart
        async initChart(){
            // 获取主题
            let theme = await this.$axios.get('http://localhost:8088/static/theme/customed.json')
            // 注册主题
            this.$echarts.registerTheme('customed',theme.data)
            this.myChartsInstance = this.$echarts.init(this.$refs.myCmap,'customed')//用获取实例来注册
            // 获取地图数据（mapData.data）
            let mapData = await this.$axios.get('http://localhost:8088/static/map/china.json')
            // 注册地图
            this.$echarts.registerMap('china',mapData.data)
            // 配置项
            const initOption = {
                title:{
                        text:'对虾xxxxxxxxxxxxx',
                        x:'center',
                        top:20,
                },
                tooltip:{},
                toolbox: {
                    feature: {
                        restore:{
                            show:true,
                        }
                    }
                },
                geo:{
                    type:'map',
                    map:'china',
                    roam:true,
                    scaleLimit:{
                        min:1.25,
                        max:2.5
                    },
                    tooltip:{
                        backgroundColor:'#343a40',
                        textStyle:{
                            color:'#fff'
                        },
                        formatter:(val)=>{
                            for (const {name,value} of this.data) {
                                if(val.name ==name){
                                    return `${name}:${value}`
                                }
                            }
                        }
                    }
                },
                series:[
                    {
                        type:'scatter',
                        symbolSize:5,
                        coordinateSystem:'geo',
                        data:this.converData(this.data,this.geoCoordMap),
                        itemStyle:{
                            color:'#fff'
                        },
                        label:{
                            show:true,
                            position:"right",
                            formatter:'{b}',
                            textStyle:{
                                color:"#fff"
                            }
                        }
                    },
                    {
                        type:'scatter',
                        coordinateSystem:'geo',
                        symbol:'pin',
                        symbolSize:[50,50],
                        data:this.converData(this.data,this.geoCoordMap),
                        itemStyle:{
                            color:'#c93223'
                        },
                        label:{
                            show:true,
                            formatter:(val)=>{
                                return val.data.value[2]
                            }
                        }
                    },
                ]
            }
            // 设置配置项
            this.myChartsInstance.setOption(initOption)
        },
        // 获取数据
        getData(){

        },
        // 更新数据
        updateChart(){

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

</style>