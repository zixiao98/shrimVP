<template>
    <div id="homepage" ref="homepage">
        <div class="page-box">
            <div class="left">
                <div class="leftTop">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <BarIII :barIIIDate="myEchart_barIIIDate"></BarIII>
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <PieIII :pieIIIDate="myEchart_pieIIIDate"></PieIII>
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
                        <Circles :circleDate="myEchart_circleDate"></Circles>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <PolarGraph></PolarGraph>
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
                        <div class="mainBox">
                            <div class="mainDiv">
                                <div class="top">
                                    <div class="topDiv">
                                        <div class="topLeft">
                                            <div class="img">
                                                <img src="@/assets/img/logo.png" alt="个人中心的头像" ref="myPhoto">
                                            </div>
                                            <div class="btn">
                                                <button class="photo" @click="dialogVisible = true">拍照</button>
                                                <button class="up" @click="dialogVisibleII = true">上传</button>
                                                <button class="down" @click="downloadImg">下载</button>
                                            </div>
                                        </div>
                                        <div class="topRight">
                                            <div v-for="(key,index) in personalInfoKey" :key="index" class="informationItem">
                                                <div class="iItemDiv">
                                                    <div class="key">{{personalInfoKeyValue[index]}}:</div>
                                                    <div class="val">{{userInfo[key]}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="bottomDiv">
                                        <div v-for="(key,index) in personalInfoKeyII" :key="index" class="informationItems">
                                            <div class="iItemDivs">
                                                <div v-for="(keys,indexs) in key" :key="indexs" class="iItemBox">
                                                    <div class="keys">{{personalInfoKeyIIValue[index][indexs]}}:</div>
                                                    <div class="vals">{{userInfo[keys]}}</div>
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
        <!-- 拍照对话框 -->
        <el-dialog
            title="进行拍照操作"
            :visible.sync="dialogVisible"
            width="50%"
            @close = 'closeDialog'
            >
            <div id="top">
                <div>相机</div>
                <div>样张</div>
            </div>
            <div id="photoDiv">
                <video ref="video" id="video">浏览器不支持 Video</video>
                <canvas ref="canvas" id="canvas">
                    <img ref="photo" alt="拍照后的照片">
                </canvas>
            </div>
            <div class="pBtn">
                <button @click="openCamera" class="open">打开摄像头</button>
                <button class="shot" @click="takePhoto" >拍照</button>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="this.cancelPhoto">取 消</el-button>
                <el-button type="primary" @click="putPhoto">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 上传照片对话框 -->
        <el-dialog
            title="进行上传操作"
            :visible.sync="dialogVisibleII"
            width="30%"
             @close = 'closeUPimgDialog'
            >
            <div id="top">
                <div>预览</div>
            </div>
            <div class="upPhoto" v-show="upPhoto" @click="chooseImg">
                <img :src="imgSrc" alt="" ref="upImg" id="upImg">
            </div>
            <div class="upInput" v-show="!upPhoto" @click="chooseImg">
                <input ref="upInput" type="file" accept="image/png, image/jpeg" @change="inputChange">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleII = false">取 消</el-button>
                <el-button type="primary" @click="putImg">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import PieIII from '../components/personalcenter/pieIII.vue'
import BarIII from '../components/personalcenter/barIII.vue'
import Circles from '../components/personalcenter/circle.vue'
import PolarGraph from '../components/personalcenter/polarGraph.vue'
export default {
    data(){
        return {
            dialogVisible:false,//拍照对话框
            photoFlag:false,//是否有拍摄好的拍照的标志
            imgFlag:false,//是否有上传好的图片的标志
            dialogVisibleII:false,//上传照片对话框
            fileList:[],//上传照片list
            upPhoto:false,//控制上传照片显示隐藏的字段
            imgSrc:'#',//图片url
            imgType:["image/png","image/jpeg"],//图片类型接收范围
            personalInfoKey:["name","sex","age","region","addres"],//个人资料key
            personalInfoKeyValue:['姓名','性别','年龄','地区','地址'],
            personalInfoKeyII:[["baseNum","pondNum","equipmentNum",],["shrimpNum","equipmentInvestment","email",],["phone","registerTime","loginTime"]],
            personalInfoKeyIIValue:[['拥有基地','拥有虾塘','拥有设备'],['虾苗投入','设备投入','邮箱',],['手机','注册日期','近期登录',]],
            myEchart_circleDate:[
                {name:'中国对虾',data:0.18},
                {name:'斑节对虾',data:0.34},
                {name:'日本对虾',data:0.56},
                {name:'墨吉对虾',data:0.68},
                {name:'长毛对虾',data:0.81},
            ],
            myEchart_barIIIDate:[
                {name:'2022-上半年',data:[49.24, 62.12, 71.23, 80.23,56.23,61.31],},
                {name:'2021-下半年',data:[49.24, 80.23,62.12, 71.23,61.31 ,56.23],},
                {name:'2021-上半年',data:[39.24, 22.12, 71.23, 80.23,56.23,71.31],},
                {name:'2020-下半年',data:[49.24, 32.12, 61.23, 80.23,56.23,81.31],},
                {name:'2020-上半年',data:[49.24, 42.12, 71.23, 70.23,46.23,41.31],},
                {name:'2019-下半年',data:[29.24, 52.12, 71.23, 56.23,56.23,43.31],},
            ],
            myEchart_pieIIIDate:[
                {name:'2022-上半年',data:[{name:'中国对虾',value: 135,},
                {name:'斑节对虾',value: 125,},
                {name:'日本对虾',value: 118,},
                {name:'墨吉对虾',value: 48,},
                {name:'长毛对虾',value: 82,},],},
                {name:'2021-下半年',data:[{name:'中国对虾',value: 125,},
                {name:'斑节对虾',value: 135,},
                {name:'日本对虾',value: 118,},
                {name:'墨吉对虾',value: 82,},
                {name:'长毛对虾',value: 48,},],},
                {name:'2021-上半年',data:[{name:'中国对虾',value: 118,},
                {name:'斑节对虾',value: 123,},
                {name:'日本对虾',value: 48,},
                {name:'墨吉对虾',value: 135,},
                {name:'长毛对虾',value: 82,},],},
                {name:'2020-下半年',data:[{name:'中国对虾',value: 125,},
                {name:'斑节对虾',value: 122,},
                {name:'日本对虾',value: 62,},
                {name:'墨吉对虾',value: 82,},
                {name:'长毛对虾',value: 102,},],},
                {name:'2020-上半年',data:[{name:'中国对虾',value: 82,},
                {name:'斑节对虾',value: 112,},
                {name:'日本对虾',value: 48,},
                {name:'墨吉对虾',value: 89,},
                {name:'长毛对虾',value: 135,},],},
                {name:'2019-下半年',data:[{name:'中国对虾',value: 102,},
                {name:'斑节对虾',value: 62,},
                {name:'日本对虾',value: 32,},
                {name:'墨吉对虾',value: 92,},
                {name:'长毛对虾',value: 112,},],},
            ],


            userInfo:null,
        }
    },
    components:{
        PieIII,
        BarIII,
        Circles,
        PolarGraph,
    },
    //生命周期函数
    beforeMount(){
        this.userInfo =JSON.parse(localStorage.getItem('user')) 
        console.log(this.userInfo)
    },
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[6];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[6];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
    },
    methods:{
        // 打开摄像头
        async openCamera(){
            let video = this.$refs.video;
            // 获取摄像头的视频流
            try {
                // 十分重要
                video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
                video.play()
            } catch (e) {
                console.error(e)
            }
        },
        //拍照
        takePhoto(){
            let video = this.$refs.video;
            // 如果没有打开摄像头，不执行下面代码，改为提示
            if(!video.srcObject){
                this.$notify({
                    title: '警告',
                    message: '请先打开摄像头!!!',
                    type: 'warning'
                });
                return false 
            }
            let canvas = document.getElementById('canvas');
            let photo = this.$refs.photo;
            const ctx = canvas.getContext('2d')
            // 获取样式
            let styleObj = window.getComputedStyle ? getComputedStyle(video,null) : video.currentStyle;
            let width =styleObj.width.split('px')[0];
            let height =styleObj.height.split('px')[0];
            if(width && height){
                //拿video元素的宽高,使得canvas上面图像和video上的比例一致
                canvas.width = width;
                canvas.height = height;
                //画图
                ctx.drawImage(video,0,0,width,height)
                //生成图片(注意此处的toDataURL方法是在canvas实例上的，而不是ctx)
                let data = canvas.toDataURL('image/png');
                photo.setAttribute('src',data);
                if(!this.photoFlag){
                    this.photoFlag = true;
                }
            }else{
                this.clearPhoto()
            }
        },
        //取消拍照
        cancelPhoto(){
            if(this.photoFlag){
                this.$confirm('是否放弃拍摄好的照片并退出?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '退出成功!'
                            });
                            this.photoFlag = false;
                            this.dialogVisible = false;
                        }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消操作'
                            });          
                });
                return false
            }
            this.dialogVisible = false;  
        },
        // 使用拍摄好的照片
        putPhoto(){
            this.dialogVisible = false;
            if(!this.photoFlag){return false}
            window.localStorage.setItem('personnalPhoto',this.$refs.photo.getAttribute('src'))
            this.$refs.myPhoto.src = window.localStorage.getItem('personnalPhoto')
            this.photoFlag = false;
        },
        // 关闭视频流
        closeCamera(){
             if(this.$refs.video.srcObject){
                this.$refs.video.srcObject.getTracks()[0].stop();
                this.$refs.video.srcObject=null;
             }
        },
        // 清空图片-将拍摄好的图片清空
        clearPhoto(){
            let ctx = this.$refs.canvas.getContext('2d')
            let styleObj = window.getComputedStyle ? getComputedStyle(this.$refs.canvas,null) : this.$refs.canvas.currentStyle;
            let width = styleObj.width.split('px')[0];
            let height = styleObj.height.split('px')[0];
            ctx.fillStyle= '#fff'
            ctx.fillRect(0,0,width,height)
            const data = this.$refs.canvas.toDataURL('image/png');
            this.$refs.photo.setAttribute('src', data);
        },
        // 关闭对话框--拍照
        closeDialog(){
            this.closeCamera()
            this.clearPhoto()
        },
        //关闭对话框--上传图片
        closeUPimgDialog(){
            this.upPhoto = false;
            this.imgSrc  = "#";
        },
        //点击上传图片
        chooseImg(){
            this.$refs.upInput.click()
        },
        //使用上传好的图片
        putImg(){
            this.dialogVisibleII = false;
            if(!this.imgFlag){return false}
            window.localStorage.setItem('personnalPhoto',this.imgSrc)
            this.$refs.myPhoto.src = window.localStorage.getItem('personnalPhoto')
            this.imgFlag = false;
        },
        //input-file变化
        inputChange(){
            let self = this;
            //获取文件引用
            let files =this.$refs.upInput.files[0];
            //创建文件阅读器
            let reader = new FileReader();
            //文件阅读器的回调函数
            reader.onload = function(e){
                let dataBase64 = e.target.result;
                self.upPhoto = true;
                //获取异步更新后的dom
                self.$nextTick(function(){
                    self.imgSrc  = dataBase64;
                    self.imgFlag = true;
                })
            }
            reader.onerror = function(e){
                console.log(e)
            }
            reader.onloadend = function(e){
                console.log(e)
            }
            //判断是否在文件选择器中选择了文件
            if(files){
                //判断选中的文件类型是不是在范围中
                if(this.imgType.includes(files.type)){
                    //判断文件大小是不是超过1m
                    if(files.size>1024*1024){
                        this.$message({
                            message:"请选择大小 1m 以下的图片",
                            type:'warning',
                            duration:"3000"
                        })
                        return;
                    }
                    //使用文件阅读器阅读文件
                    reader.readAsDataURL(files);
                }else{
                    this.$message({
                        message:"请选择 .png 或 .jpeg/.jpg 类型后缀的图片",
                        type:'warning',
                        duration:"3000"
                    })
                }
            }
        },
        //下载图片
        downloadImg(){
            //模拟a标签下载(js下载图片常用方式之一)
            let aLink = document.createElement('a');
            //download属性，h5新增,指将下载url资源，而不是导航到它，如果download有值，这个值是下载时候的文件名
            aLink.download = '对虾养殖可视化平台_个人中心_头像';
            aLink.href = this.$refs.myPhoto.src;
            aLink.click();
            aLink.remove();
        },
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    @import '@/scss/personalcenter.scss';
</style>