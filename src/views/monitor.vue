<template>
    <div id="homepage" ref="homepage">
        <div class="page-box">
            <div class="center">
                <div class="centerC">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <div class="mainBox">
                            <div class="mainDiv">
                                <div class="top">
                                    <div class="topDiv">
                                        <div class="topLeft">
                                            <div class="switch">
                                                <el-select v-model="baseSelectId" @change="handelSelect">
                                                    <el-option v-for="item in baseInfoArr" :key="item._id" :label="item.baseName" :value="item._id"></el-option>
                                                </el-select>
                                            </div>
                                            <div class="img">
                                                <img :src="this.chosedBase.basePic" alt="个人中心的头像" ref="myPhoto">
                                            </div>
                                        </div>
                                        <div class="topRight">
                                            <div class="informationItem">
                                                <div class="iItemDiv">
                                                    <div class="key">名称:</div>
                                                    <div class="val">{{chosedBase.baseName}}</div>
                                                </div>
                                            </div>
                                            <div class="informationItem">
                                                 <div class="iItemDiv">
                                                    <div class="key">虾塘:</div>
                                                    <div class="val">{{chosedBase.hasPond}}</div>
                                                </div>
                                            </div>
                                             <div class="informationItem">
                                                <div class="iItemDiv">
                                                    <div class="key">设备:</div>
                                                    <div class="val">{{chosedBase.hasBE}}</div>
                                                </div>
                                            </div>
                                             <div class="informationItem">
                                                <div class="iItemDiv">
                                                    <div class="key">地区:</div>
                                                    <div class="val">{{chosedBase.baseRegion}}</div>
                                                </div>
                                            </div>
                                             <div class="informationItem">
                                                <div class="iItemDiv">
                                                    <div class="key">地址:</div>
                                                    <div class="val">{{chosedBase.baseAddr}}</div>
                                                </div>
                                            </div>   
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                     <div class="bottomDiv">
                                        <div class="box">
                                            <span class="one"></span>
                                            <span class="two"></span>
                                            <span class="three"></span>
                                            <span class="four"></span>
                                            <div class="header">
                                                <div class="weatherTitle">
                                                    <i>更新：{{weather.obsTime}}</i>
                                                    <i>来源：{{wRefer}}</i>
                                                </div>
                                                <div class="shrimpPound">
                                                    <el-select v-model="pondSelectId" placeholder="请选择" size="small">
                                                        <el-option v-for="item in pondInfoArr" :key="item._id" :label="item.pondName" :value="item._id"></el-option>
                                                    </el-select>
                                                    <i>虾塘监测信息(右侧)</i>
                                                </div>
                                            </div>
                                            <div class="weather"
                                                v-loading="weatherChartLoading" 
                                                element-loading-text="拼命加载中"
                                                element-loading-spinner="el-icon-loading"
                                                element-loading-background="rgba(20,20,20,.4)">
                                                <div class="weatherInfo">
                                                    <div class="location">
                                                        <i>{{this.location}}</i>
                                                    </div>
                                                    <div style="text-align:center;height:100px;">
                                                        <i :class="icon" style="font-size:88px;"></i>
                                                    </div>                                                    
                                                    <div class="item"><div>天气</div>：{{weather.text}}</div>
                                                    <div class="item"><div>降雨量</div>：{{weather.precip}}mm/h</div>
                                                    <div class="item"><div>实时温度</div>：{{weather.temp}}℃</div>
                                                    <div class="item"><div>体感温度</div>：{{weather.feelsLike}}℃</div>
                                                    <div class="item"><div>露点温度</div>：{{weather.dew}}℃</div>
                                                    <div class="item"><div>相对湿度</div>：{{weather.humidity}}%</div>
                                                    <div class="item"><div>风向</div>：{{weather.windDir}}</div>
                                                    <div class="item"><div>风力等级</div>：{{weather.windScale}}级</div>
                                                    <div class="item"><div>风速</div>：{{weather.windSpeed}}km/h</div>
                                                    <div class="item"><div>能见度</div>：{{weather.vis}}km</div>
                                                    <div class="item"><div>大气压强</div>：{{weather.pressure}}hPa</div>
                                                    <div class="item"><div>云量</div>：{{weather.cloud}}%</div>
                                                </div>
                                                <div class="weatherChart">
                                                    <div class="echart">
                                                         <TemperatureVc :TemperatureVcData="myEchart_TemperatureVcData"></TemperatureVc>
                                                    </div>
                                                    <div class="list">
                                                        <div v-for=" item,index in weather7d" :key="index">
                                                            <i :class="'qi-'+item.iconDay" style="font-size:18px;"></i>
                                                            <i>{{item.textDay}}</i><br/>
                                                            <i :class="'qi-'+item.iconNight" style="font-size:18px;"></i>
                                                            <i>{{item.textNight}}</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left">
                <div class="leftTop">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Temperature :weatherTemp="toTemperatureTemp" :pondId="pondSelectId"></Temperature>
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Ph :weatherTemp="toTemperatureTemp" :pondId="pondSelectId"></Ph>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="rightTop">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Density :weatherTemp="toTemperatureTemp" :pondId="pondSelectId"></Density>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                         <OxygenContent :weatherTemp="toTemperatureTemp" :pondId="pondSelectId"></OxygenContent>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TemperatureVc from '../components/monitor/TemperatureVc.vue';
import Temperature from '../components/monitor/temperature.vue';
import Ph from '../components/monitor/ph.vue';
import OxygenContent from '../components/monitor/oxygenContent.vue';
import Density from '../components/monitor/density.vue';
import { CodeToText,TextToCode } from 'element-china-area-data';
export default {
    data(){
        return {
            //以上是测试数据
            wRefer:null,//天气来源
            weather:{},
            location:'',
            icon:'',
            weatherChartLoading:true,
            weather7d:[],
            myEchart_TemperatureVcData:[],//基地气象信息预测
            baseSelectId:'',//被选中的基地的id
            baseInfoArr:[],//获取的基地信息
            chosedBase:{},//被选中的基地
            pondSelectId:'',//被选中的虾塘的id
            pondInfoArr:[],//被选中的虾塘信息(id&name)

            toTemperatureTemp:'',//props ->Temperature
           
            
            
        }
    },
    components:{
        TemperatureVc,
        Temperature,
        Ph,
        OxygenContent,
        Density,
    },
    //生命周期函数
    async mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[5];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取基地列表
        await this.getBaseAll()
        this.chosedBase = this.baseInfoArr[0];
        //获取虾塘信息
        this.getPondIdAndName(this.baseSelectId)
        //获取天气信息
        this.getWeatherLocaltion()
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[5];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
    },
    methods:{
        //获取基地列表
        async getBaseAll(){
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/breedingBase/baseAll`,{
                headers: {'Authorization': 'Bearer '+token,}
            }))
            console.log(res,err)
            if(res?.status ===200){ 
                this.$noticeInfo('success',res?.status,res.data.tips,1500)
                this.baseInfoArr = res.data.data;
                this.baseSelectId = this.baseInfoArr[0]._id;//获取第一个
            }
            if(err){this.$noticeInfo('error','失败','获取基地列表失败！！',1500)}
        },
        //获取基地id对应的虾塘列表(id&name)
        async getPondIdAndName(id){
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/shrimpPond/pondIdAndName`,{
                params:{baseById:id},
                headers: {'Authorization': 'Bearer '+token,}
            }))
            console.log(res,err)
            if(res?.status ===200){ 
                this.$noticeInfo('success',res?.status,res.data.tips,1500)
                this.pondInfoArr = res.data.data;
                this.pondSelectId = this.pondInfoArr[0]?._id;//获取第一个
            }
            if(err){this.$noticeInfo('error','失败','获取基地列表失败！！',1500)}
        },
        //获取地理位置
        getWeatherLocaltion(){
            let l = this.chosedBase.baseRegion.split('/');
            this.location = `${l[1]}-${l[2]}`;
            this.location =this.location.replace(/市/,'').replace(/区/,'')
            let s = [TextToCode[l[0]].code,TextToCode[l[0]][l[1]].code,TextToCode[l[0]][l[1]][l[2]].code]
            let loction = CodeToText[s[2]]
            if( loction=='市辖区'||loction =='城区'){loction = CodeToText[s[1]]}
            if( loction=='市辖区'||loction =='城区'){loction = CodeToText[s[0]]}
            // this.weatherChartLoading = true;
            this.getWeatherData(loction)
        },
        // 获取天气信息
        async getWeatherData(location){
            //获取地理位置id
            let [err,res] = await this.$awaitTo(this.$axios.get('https://geoapi.qweather.com/v2/city/lookup',{
                params:{
                    location :location,
                    key :'1f4c41416a1a49d5aedf98c7601424c1',
                }
            }))
            console.log(res)
            if(res?.data.code ==="200"){
                //24小时天气
                let [error,result]= await this.$awaitTo(this.$axios.get('https://devapi.qweather.com/v7/weather/now',{
                    params:{
                        location :res.data.location[0].id,
                        key :'1f4c41416a1a49d5aedf98c7601424c1',
                    }
                }))
                if(result){
                    this.weather = result.data.now;
                    this.toTemperatureTemp = this.weather.temp;
                    this.wRefer = result.data.refer.sources.join(' ');
                    this.weather.obsTime = new Date(this.weather.obsTime).toLocaleString()
                    this.icon = `qi-${this.weather.icon}`
                }
                if(error){this.$noticeInfo('error','出现错误！','',3000)}
                //7天天气
                let [errors,results]= await this.$awaitTo(this.$axios.get('https://devapi.qweather.com/v7/weather/7d',{
                    params:{
                        location :res.data.location[0].id,
                        key :'1f4c41416a1a49d5aedf98c7601424c1',
                    }
                }))
                if(results){
                    let daily = this.getWeather(results.data.daily);//日期
                    let tempMax = this.getWeatherItem(results.data.daily,'tempMax');//最高温
                    let tempMin = this.getWeatherItem(results.data.daily,'tempMin');//最低温
                    let tempAverage =  this.getAverageTemp(tempMax,tempMin);//平均温
                    let humidity = this.getWeatherItem(results.data.daily,'humidity')//获取相对湿度
                    this.myEchart_TemperatureVcData = [daily,tempMax,tempMin,tempAverage,humidity];
                    this.weather7d = this.getWeather7d(results.data.daily);
                }
                if(errors){this.$noticeInfo('error','出现错误！','',3000)}
            }
            if(err){
                this.$noticeInfo('error','出现错误！','',3000)
            }
        },
        //处理气象返回的日期
        getWeather(arr){
            return arr.map(item => {
                return item.fxDate.split('-').slice(1).join('月')+'号';
            });
        },
        //处理气象返回的属性
        getWeatherItem(arr,flag){
            return arr.map(item => {
                return item[flag];
            });
        },
        //计算平均气温
        getAverageTemp(maxArr,minArr){
            let len = maxArr.length;
            let res = [];
            for(let i=0;i<len;i++){
                res.push((Number(maxArr[i])+Number(minArr[2]))/2)
            }
            return res;
        },
        //获取7天天气预测
        getWeather7d(arr){
            let res = [];
            arr.forEach((item)=>{
                let obj = {};
                obj.iconDay = item.iconDay;
                obj.iconNight = item.iconNight;
                obj.textDay = item.textDay;
                obj.textNight = item.textNight;
                res.push(obj)
            })
            return res;
        },
        //
        handelSelect(val){
            let arr =  this.baseInfoArr.filter(item => item._id == val)
            this.chosedBase = arr[0];
            //重新获取虾塘列表
            this.getPondIdAndName(val)
            //重新获取天气信息
            this.getWeatherLocaltion()
        },
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    @import '@/scss/monitor.scss';
</style>