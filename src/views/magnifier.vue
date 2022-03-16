<template>
    <div id="homepage" ref="homepage">
        <div class="page-box">
            <div class="left">
                <div class="leftTop">
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
                        <PieII></PieII>
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
                        <RadarII></RadarII>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <BarII></BarII>
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
                                <el-dropdown trigger="click">
                                    <p>其他对虾资料<i class="el-icon-arrow-down el-icon--right"></i></p>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>中国对虾</el-dropdown-item>
                                        <el-dropdown-item>斑节对虾</el-dropdown-item>
                                        <el-dropdown-item>日本对虾</el-dropdown-item>
                                        <el-dropdown-item disabled>墨吉对虾</el-dropdown-item>
                                        <el-dropdown-item divided>长毛对虾</el-dropdown-item>
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
            // 
            shrimpData:{
                name:'中国对虾',
                engName:'fenneropenaeus chinensis',
                otherName:'大虾、对虾、肉虾、黄虾(雄)、青虾(雌虾)、明虾',
                textString:'主要分布于我国黄渤海和朝鲜西部沿海。我国的辽宁、河北、山东省及天津市沿海是对虾的重要产地。捕捞季节过去每年有春、秋两季，4～6月份为春汛；8～10月份为秋汛。10月中下旬为旺汛期。目前在我国沿海北自辽宁丹东市，南至海南沿海均开展了中国对虾养殖生产，养殖年产量约20万吨，大大超过自然海域的捕捞量。对虾肉质鲜嫩味美，营养丰富。每百克虾肉含蛋白质20.6克，脂肪0.7克，并含有多种维生素及人体必须的微量元素，系高蛋白营养水产品。鲜食可烹调红焖大虾、煎明虾、溜虾段、琵琶大虾、炒虾仁等。加工干制成虾干、虾米等为上乘的海味品。',
            },
            textArr:[],
            
        }
    },
    components:{
        PieII,
        BarII,
        RadarII,
    },
    //生命周期函数
    mounted(){
        this.textArr = this.shrimpData.textString.split('。')
        this.textArr.pop()
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[0];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        // this.userName = window.localStorage.getItem('userName');
        // 获取原先展示图片的div，并绑定鼠标事件，并在之后卸载时解绑
        const leftTop = document.querySelector('.leftTop')
        leftTop.addEventListener('mouseenter',this.showMagnifier)
        leftTop.addEventListener('mouseleave',this.hiddenMagnifier)
        leftTop.addEventListener('mousemove',this.moveMagnifier)
        window.addEventListener('resize',this.resize)
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[0];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
        const leftTop = document.querySelector('.leftTop')
        // 事件解绑
        leftTop.removeEventListener('mouseenter',this.showMagnifier)
        leftTop.removeEventListener('mouseleave',this.hiddenMagnifier)
        leftTop.removeEventListener('mousemove',this.moveMagnifier)
        window.removeEventListener('resize',this.resize)
    },
    methods:{
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
            padding: 10px 20px;
            text-align: right;
            p{
                font-size: 18px;
                margin:0;
                color: #fff;
                cursor: pointer;
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
            height: calc(100% - 15% - 3% - 60px);
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
                    font-size: 22px;
                    line-height: 2;
                    padding-left: 22px;
                }
            }
        }
    }
</style>