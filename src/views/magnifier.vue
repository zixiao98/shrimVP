<template>
    <div id="homepage" ref="homepage">
        <div class="page-box">
            <div class="left">
                <div class="leftTop" ref="leftTop">
                    <div class="box" ref="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <img src="../assets/img/1.jpg" alt="" ref="smallImg">
                        <div class="magnifier" ref="magnifier"></div>
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <PieII ref="pieII"></PieII>
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
                        <RadarII ref="radarII"></RadarII>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <BarII ref="barII"></BarII>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="centerC">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <div class="text">
                            <div class="swith">
                                <i class="tips">/*以下资料来自于互联网*/</i>
                                <el-dropdown trigger="click" @command='this.dropdownClick' >
                                    <p>其他对虾资料<i class="el-icon-arrow-down el-icon--right"></i></p>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command='1' >中国对虾</el-dropdown-item>
                                        <el-dropdown-item command='2'>斑节对虾</el-dropdown-item>
                                        <el-dropdown-item command='3'>日本对虾</el-dropdown-item>
                                        <el-dropdown-item command='4'>墨吉对虾</el-dropdown-item>
                                        <el-dropdown-item command='5' divided>长毛对虾</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="name">
                                <div class="nameDiv">
                                    <div class="spn left">
                                        <div>名称:<p>name</p></div>
                                    </div>
                                    <div class="spn right">
                                        <div>{{this.shrimpData.name}}<i>（<i class="engName">{{this.shrimpData.engName}}</i>）</i></div>
                                        <div class="otherName">又名：<i>{{this.shrimpData.otherName}}</i></div>
                                    </div>
                                </div>
                            </div>
                             <div class="details">
                                <div class="detailsDiv">
                                    <p v-for="(val,index) in this.textArr" :key="index">{{val}}。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bigMagnifier">
                <span class="one"></span>
                <span class="two"></span>
                <span class="three"></span>
                <span class="four"></span>
                <div class="bgDiv">
                    <img src="../assets/img/1.jpg" alt="" ref="bigImg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import evt from '@/js/evt.js';
import PieII from '@/components/magnifier/pieII.vue';
import BarII from '@/components/magnifier/barII.vue';
import RadarII from '@/components/magnifier/radarII.vue';
export default {
    data(){
        return {
            x:null,
            y:null,
            commandIndex:0,
            // 数据
            shrimpData:{
                name:'中国对虾',
                engName:'fenneropenaeus chinensis',
                otherName:'大虾、对虾、肉虾、黄虾(雄)、青虾(雌虾)、明虾',
                textString:'主要分布于我国黄渤海和朝鲜西部沿海。我国的辽宁、河北、山东省及天津市沿海是对虾的重要产地。捕捞季节过去每年有春、秋两季，4～6月份为春汛；8～10月份为秋汛。10月中下旬为旺汛期。目前在我国沿海北自辽宁丹东市，南至海南沿海均开展了中国对虾养殖生产，养殖年产量约20万吨，大大超过自然海域的捕捞量。对虾肉质鲜嫩味美，营养丰富。每百克虾肉含蛋白质20.6克，脂肪0.7克，并含有多种维生素及人体必须的微量元素，系高蛋白营养水产品。鲜食可烹调红焖大虾、煎明虾、溜虾段、琵琶大虾、炒虾仁等。加工干制成虾干、虾米等为上乘的海味品',
            },
            textArr:[],
            arr:[
                {
                    name:'中国对虾',
                    engName:'fenneropenaeus chinensis',
                    otherName:'大虾、对虾、肉虾、黄虾(雄)、青虾(雌虾)、明虾',
                    textString:'主要分布于我国黄渤海和朝鲜西部沿海。我国的辽宁、河北、山东省及天津市沿海是对虾的重要产地。捕捞季节过去每年有春、秋两季，4～6月份为春汛；8～10月份为秋汛。10月中下旬为旺汛期。目前在我国沿海北自辽宁丹东市，南至海南沿海均开展了中国对虾养殖生产，养殖年产量约20万吨，大大超过自然海域的捕捞量。对虾肉质鲜嫩味美，营养丰富。每百克虾肉含蛋白质20.6克，脂肪0.7克，并含有多种维生素及人体必须的微量元素，系高蛋白营养水产品。鲜食可烹调红焖大虾、煎明虾、溜虾段、琵琶大虾、炒虾仁等。加工干制成虾干、虾米等为上乘的海味品',
                    data:{
                        barII:{
                            xAxis:{
                                data:['2016', '2017', '2018', '2019', '2020','2021'],
                            },
                            series:{
                                data:[49.24, 62.12, 71.23, 80.23,56.23,61.31],
                            }
                        },
                        pieII:{
                            series:{
                                data:[
                                    { value: 35, name: '广东' },
                                    { value: 25, name: '广西' },
                                    { value: 18, name: '海南' },
                                    { value: 8, name: '山东' },
                                    { value: 12, name: '其他' }
                                ],
                            }
                        },
                        radarII:{
                            series:{
                                data:{
                                    value:[42, 60, 77, 35, 50, 78],
                                }
                            }
                        }
                    }
                },
                {
                    name:'斑节对虾',
                    engName:'penaeus monodon',
                    otherName:'草虾、花虾、牛形对虾',
                    textString:'体被黑褐色、土黄色相间的横斑花纹。分布区域甚广，由日本南部、南朝鲜、我国沿海、菲律宾、印尼、澳大利亚、泰国、印度至非洲东部沿岸均有分布。我国沿海每年有2～4月份和8～11月份两个产卵期。 为当前世界上养殖最普遍的品种。我国南方沿海可以养两茬。该虾生长快，适应性强，食性杂，且可耐受较长时间的干露，故易于活运销。该虾是对虾中个体最大的一种，发现的最大个体长达33厘米，体重500～600克。成熟虾一般体长22．5—32厘米，体重137～211克，是深受消费者欢迎的名贵虾类。营养价值与其他主要虾类相近',
                    data:{
                        barII:{
                            xAxis:{
                                data:['2016', '2017', '2018', '2019', '2020','2021'],
                            },
                            series:{
                                data:[62.12, 49.24, 71.23, 56.23,80.23,61.31],
                            }
                        },
                        pieII:{
                            series:{
                                data:[
                                    { value: 18, name: '广东' },
                                    { value: 25, name: '广西' },
                                    { value: 35, name: '海南' },
                                    { value: 12, name: '山东' },
                                    { value: 12, name: '其他' }
                                ],
                            }
                        },
                        radarII:{
                            series:{
                                data:{
                                    value:[ 72, 45,42, 55, 82, 75],
                                }
                            }
                        }
                    }
                },
                {
                    name:'日本对虾',
                    engName:'Penaeus japonicus',
                    otherName:'花虾、竹节虾、花尾虾、斑节虾、车虾',
                    textString:'体被蓝褐色横斑花纹，尾尖为鲜艳的蓝色。日本对虾分布极广，日本北海道以南、中国沿海、东南亚、澳大利亚北部、非洲东部及红海等均有栖息。我国沿海1～3月份及9～10月份均可捕到亲虾，产卵盛期为每年12月～翌年3月份。虾汛旺季为1～3月份。常与斑节对虾、宽沟对虾混栖。 日本对虾是日本最重要的对虾养殖品种，在日本养到25克左右出售价格最高，主要销售活虾。我国福建、广东等南方沿海近年来也已开始养殖。养殖180天体重可达20～25克。产卵群体体长为12～20厘米，体重为20～95克。该虾甲壳较厚，耐干露，适于活体运销，利润较高。营养价值与其他主要虾类相近',
                    data:{
                        barII:{
                            xAxis:{
                                data:['2016', '2017', '2018', '2019', '2020','2021'],
                            },
                            series:{
                                data:[52.12, 59.24, 61.23, 52.23,66.23,71.31],
                            }
                        },
                        pieII:{
                            series:{
                                data:[
                                    { value: 28, name: '广东' },
                                    { value: 15, name: '广西' },
                                    { value: 25, name: '海南' },
                                    { value: 22, name: '山东' },
                                    { value: 12, name: '其他' }
                                ],
                            }
                        },
                        radarII:{
                            series:{
                                data:{
                                    value:[ 62, 55,72, 45, 62, 65],
                                }
                            }
                        }
                    }
                },
                {
                    name:'墨吉对虾',
                    engName:'Penaeus merguiensis',
                    otherName:'大虾、明虾、黄虾、大白虾、大明虾',
                    textString:'体淡棕黄色，透明甲壳较薄。墨吉对虾分布甚广，在南半球自东非至澳大利亚；在北半球东南亚及印度洋；在我国广东、海南及广西沿海均有分布。主要产卵期为3～6月份，产卵盛期为4～5月份。渔汛旺季为10月至翌年1月份。我国广东湛江市沿海为主要产区。目前是广东沿海的主要养殖品种。 墨吉对虾是我国南方的对虾养殖对象之一。可养一茬，也可养两茬。生长较快，160～180天，体长可达12厘米以上。自然捕捞大者体长20厘米，体重100克。该虾虾体离水后很快死亡，销售活虾较难，主要为冷冻虾。营养价值与其他主要虾类相近',
                    data:{
                        barII:{
                            xAxis:{
                                data:['2016', '2017', '2018', '2019', '2020','2021'],
                            },
                            series:{
                                data:[67.12, 46.24, 51.23, 56.23,60.23,61.31],
                            }
                        },
                        pieII:{
                            series:{
                                data:[
                                    { value: 28, name: '广东' },
                                    { value: 20, name: '广西' },
                                    { value: 25, name: '海南' },
                                    { value: 15, name: '山东' },
                                    { value: 12, name: '其他' }
                                ],
                            }
                        },
                        radarII:{
                            series:{
                                data:{
                                    value:[ 62, 49,52, 66, 74, 79],
                                }
                            }
                        }
                    }
                },
                {
                    name:'长毛对虾',
                    engName:'penaeus penicillatus',
                    otherName:'大虾、白虾、红尾虾、红虾、大明虾',
                    textString:'体淡棕黄色，额角基部侧视比中国对虾高，比墨吉对虾低。额角后脊伸至头胸甲后缘附近，无中央沟。第一触角鞭比头胸甲稍长，雄虾第三领足末节有毛笔状长毛，其长度为末第二节的1.2～2.7倍。额角脊上有断续的凹点。雌交接器前片顶端的疣突比墨吉对虾小。我国福建、台湾及广东东部沿海最为常见。海捕渔汛为每年10月至翌年1月份。目前是福建、广东、广西、海南等沿海地区的主要养殖对象。我国南方沿海养殖120～150天，体长可达12厘米以上。该虾较其他南方虾种更耐低温，在较低温度下生长较快，所以养殖区域较广，是南方较好的晚季养殖品种，经济效益较好。长毛对虾壳较薄，易受机械损伤。营养价值与其他虾类相近',
                    data:{
                        barII:{
                            xAxis:{
                                data:['2016', '2017', '2018', '2019', '2020','2021'],
                            },
                            series:{
                                data:[42.12, 49.24, 61.23, 56.23,65.82,58.31],
                            }
                        },
                        pieII:{
                            series:{
                                data:[
                                    { value: 26, name: '广东' },
                                    { value: 24, name: '广西' },
                                    { value: 30, name: '海南' },
                                    { value: 15, name: '山东' },
                                    { value: 10, name: '其他' }
                                ],
                            }
                        },
                        radarII:{
                            series:{
                                data:{
                                    value:[ 42, 55,72, 52, 66, 91],
                                }
                            }
                        }
                    }
                },
            ],
        }
    },
    components:{
        PieII,
        BarII,
        RadarII,
    },
    //生命周期函数
    mounted(){
        // 更新对虾介绍
            this.shrimpData = this.arr[0];
            this.textArr = this.shrimpData.textString.split('。')
        // 更新echart图表信息
            console.log(this.$refs)
            // this.$refs.barII.updateChart(this.shrimpData.data)
            // this.$refs.pieII.updateChart(this.shrimpData.data)
            // this.$refs.radarII.updateChart(this.shrimpData.data)
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[4];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        // this.userName = window.localStorage.getItem('userName');
        // 获取原先展示图片的div，并绑定鼠标事件，并在之后卸载时解绑
        // const leftTop = document.querySelector('.leftTop')
        this.$refs.leftTop.addEventListener('mouseenter',this.showMagnifier)
        this.$refs.leftTop.addEventListener('mouseleave',this.hiddenMagnifier)
        this.$refs.leftTop.addEventListener('mousemove',this.moveMagnifier)
        window.addEventListener('resize',this.resize)
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[4];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
        // const leftTop = document.querySelector('.leftTop') **这里不能使用document.querySelector('.leftTop')，因为在跳转之后获取不到这个元素
        // 事件解绑
        this.$refs.leftTop.removeEventListener('mouseenter',this.showMagnifier)
        this.$refs.leftTop.removeEventListener('mouseleave',this.hiddenMagnifier)
        this.$refs.leftTop.removeEventListener('mousemove',this.moveMagnifier)
        window.removeEventListener('resize',this.resize)
    },
    methods:{
        // 下拉菜单回调函数
        async dropdownClick(c){
            if(this.commandIndex == c-1){
                console.log('重复点击')
                return false
            }
            this.commandIndex = c-1;
            // 更新对虾介绍
            this.shrimpData = await this.arr[c-1];
            this.textArr = this.shrimpData.textString.split('。')
            // 更新echart图表信息
            this.$refs.barII.updateChart(this.shrimpData.data)
            this.$refs.pieII.updateChart(this.shrimpData.data)
            this.$refs.radarII.updateChart(this.shrimpData.data)
        },
        //鼠标移入显示放大镜
        showMagnifier(){
            const magnifier = document.querySelector('.magnifier')
            const bigMagnifier = document.querySelector('.bigMagnifier')
            magnifier.style.display = 'block';
            bigMagnifier.style.display = 'block';
        },
        // 鼠标移入隐藏放大镜
        hiddenMagnifier(){
            const magnifier = document.querySelector('.magnifier')
            const bigMagnifier = document.querySelector('.bigMagnifier')
            magnifier.style.display = 'none';
            bigMagnifier.style.display = 'none';    
        },
        // 鼠标移动观察图片细节
        moveMagnifier(event){
            if(evt.getPageX(event) - this.Mx < this.minLeftX){
                this.x = this.minLeftX
            }else if(evt.getPageX(event) - this.Mx > this.maxRightX){
                this.x = this.maxRightX
            }else{
                this.x = evt.getPageX(event) - this.Mx
            }
            if(evt.getPageY(event) - this.My < this.minLeftY){
                this.y = this.minLeftY
            }else if(evt.getPageY(event) - this.My > this.maxRightY){
                this.y = this.maxRightY
            }else{
                this.y = evt.getPageY(event) - this.My
            }
            this.$refs.magnifier.style.left =this.x -this.minLeftX +'px';
            this.$refs.magnifier.style.top =this.y -this.minLeftY +'px';
            this.$refs.bigImg.style.left =-((this.x-this.minLeftX)*3)+ 'px';
            this.$refs.bigImg.style.top =-((this.y-this.minLeftY)*3)+ 'px';
        },
        // 页面大小变化（待完成）
        resize(){
            console.log('=========');
        }
    },
    computed:{
        Mx:function(){
            return this.$refs.homepage.offsetLeft;
        },
        My:function(){
            return this.$refs.homepage.offsetTop;
        },
        minLeftX:function(){
            return this.$refs.box.offsetLeft + this.$refs.magnifier.offsetWidth/2;
        },
        maxRightX:function(){
            return this.$refs.box.offsetLeft + this.$refs.box.offsetWidth -this.$refs.magnifier.offsetWidth/2;
        },
        minLeftY:function(){
            return this.$refs.box.offsetTop + this.$refs.magnifier.offsetHeight/2;
        },
        maxRightY:function(){
            return this.$refs.box.offsetTop + this.$refs.box.offsetHeight -this.$refs.magnifier.offsetHeight/2;
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    .leftTop{
        .box{
            overflow: hidden;
            .magnifier{
                display: none;
                position: absolute;
                background-color: rgba(101, 132, 226, 0.3);
                width: 50%;
                height: 50%;
                border-radius: 5px;
                cursor: move;
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .page-box{
        position: relative;
        .bigMagnifier{
            display: none;
            width: 39%;
            height: 75%;
            padding: 1px;
            position: absolute;
            left: calc(26% + 5px);
            top: 5px;
            background: url('../assets/img/line.png');
            background-color: #343a40;
            .bgDiv{
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    transform-origin:0 0;
                    transform: scale(2);
                }
            }
        }
    }
    .text{
        width: 100%;
        height: 100%;
        background-color: #343a40a4;
        .swith{
            height: 3%;
            padding: 10px 20px 0 20px;
            display: flex;
            justify-content: space-between;
            p{
                width: 100%;
                font-size: 18px;
                margin:0;
                color: #fff;
                cursor: pointer;
            }
            .tips{
                font-size: 12px;
                color: #ccc;
            }
        }
        .name{
            height: 15%;
            padding: 10px 20px;
            .nameDiv{
                height: 100%;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.281);
                .left{
                    width: 200px !important;
                    font-size: 36px;
                    position: relative;
                    div{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        p{
                            font-size: 14px;
                            margin: 0;
                            line-height: 1;
                            text-align: center;
                            color: #343a40;
                            font-weight: 700;
                        }
                    }
                }
                .right{
                    width: calc(100% - 200px) !important;
                    font-size: 28px;
                    position: relative;
                    div{
                        position: absolute;
                        top: calc(50% - 6px);
                        transform: translateY(-50%);
                        .engName{
                            color: #343a40;
                            font-size: 22px;
                        }
                    }
                    .otherName{
                        position: absolute;
                        top: calc(50% + 28px);
                        transform: translateY(-50%);
                        font-size: 16px;

                    }
                }
                    
            }
        }
        .details{
            height: calc(100% - 15% - 3% - 50px);
            padding: 10px 20px;
            .detailsDiv{
                height: calc(100% - 40px);
                padding: 20px 0px;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.281);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                p{
                    margin: 0;
                    font-size: 18px;
                    line-height: 2;
                    padding-left: 22px;
                }
            }
        }
    }
    /deep/.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
                background-color: #c93232c9;
                color:#fff;
            }
</style>