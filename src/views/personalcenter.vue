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
                                            <div class="img">
                                                <img src="@/assets/img/logo.png" alt="个人中心的头像" ref="myPhoto">
                                            </div>
                                            <div class="btn">
                                                <button class="photo" @click="dialogVisible = true">拍照</button>
                                                <button class="up" @click="dialogVisibleII = true">上传</button>
                                                <button class="down">下载</button>
                                            </div>
                                        </div>
                                        <div class="topRight">
                                            <div class="name">
                                                <i>名称：</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="bottomDiv"></div>
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
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
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
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="进行拍照操作"
            :visible.sync="dialogVisible"
            width="50%"
            @close = 'this.closeDialog'
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
                <button @click="this.openCamera" class="open">打开摄像头</button>
                <button class="shot" @click="this.takePhoto" >拍照</button>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="this.cancelPhoto">取 消</el-button>
                <el-button type="primary" @click="this.putPhoto">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="进行上传操作"
            :visible.sync="dialogVisibleII"
            width="30%"
            >
            <div id="top">
                <div>预览</div>
            </div>
            <div class="upPhoto">
                <img src="" alt="" id="upImg">
            </div>
            <div class="upInput">
                <input type="file" accept="image/png, image/jpeg" id="inputFile" @change="inputChange">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleII = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleII = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,//拍照对话框
            photoFlag:false,//是否有拍摄好的拍照的标志
            dialogVisibleII:false,//上传照片对话框
            fileList:[],//上传照片list
        }
    },
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[7];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[7];
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
        inputChange(){
            //获取文件引用
            let files =document.getElementById('inputFile').files[0];
            let reader = new FileReader();
            reader.onload = function(e){
                let dataBase64 = e.target.result;
                document.getElementById('upImg').src  = dataBase64;
            }
            reader.readAsDataURL(files)
            console.log(files)
            
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    .center{
        background-color: #343a40a4 !important;
        .mainBox{
            height:calc(100% - 20px);
            padding: 10px;
            .mainDiv{//个人资料主体div
                height:100%;
                .top{//个人资料上部
                    height: calc(45% - 16px);;
                    padding: 8px;
                    .topDiv{
                        height: 100%;
                        border-radius: 8px;
                        background-color: rgba(255, 255, 255, 0.507);
                        display: flex;
                        align-items: center;
                        .topLeft{//个人资料上部-左-头像
                            height: calc(100% - 56px);
                            width: 43%;
                            padding: 48px 0 8px 0;
                            // background-color: #fff; 
                            .img{//头像
                                height: calc(70% - 10px);
                                padding: 5px;
                                img{
                                    width: calc(100% - 4px);
                                    height: calc(100% - 4px);
                                    border:2px solid #ccc;
                                    border-radius: 8px;
                                    object-fit: contain;
                                    background-color: #343a40a4;
                                } 
                            }
                            .btn{
                                height: calc(25% - 10px);
                                padding: 5px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                button{
                                    width: 25%;
                                    height: 50%;
                                    border-radius: 5px;
                                    border: none;
                                    color: #fff;
                                    font-weight: 700;
                                    &:hover{
                                        cursor: pointer;
                                        box-shadow: 5px 5px 15px #292e33a4;
                                    }
                                }
                                .photo{
                                    background-color: #409EFF;
                                }
                                .up{
                                    background-color: #E6A23C;
                                }
                                .down{
                                    background-color: #67C23A;
                                }
                            } 
                        }
                        .topRight{//个人资料上部-右
                            height: 95%;
                            box-sizing: border-box;
                            width: 57%;
                            animation: rotate cubic-bezier(.48,.52,1,.2) forwards .3s;
                            @keyframes rotate{
                                0%{
                                    border-left: 2px solid #343a40a4;
                                }
                                20%{
                                    border-left: 2px solid rgb(206, 128, 128)232;
                                }
                                50%{
                                    border-left: 2px solid rgb(182, 87, 87)232;
                                }
                                70%{
                                    border-left: 2px solid rgb(180, 60, 60)232;
                                }
                                100%{
                                    border-left: 2px solid #c93232;
                                }
                            }
                        }
                    }
                }
                .bottom{//个人资料下部
                    height: calc(55% - 16px);;
                    padding: 8px;
                    .bottomDiv{
                        height: 100%;
                        border-radius: 8px;
                        background-color: rgba(255, 255, 255, 0.507);
                    }
                }
            }
        }
    }
    #top{
        width: 100%;
        display: flex;
        justify-content: space-around;
        font-size: 24px;
        padding: 5px;
    }
    #photoDiv{
        display: flex;
        video {
            width: calc(50% - 10px);
            margin: 0 5px;
            box-sizing: border-box;
            border: 4px solid #ffaabb;
        }
        canvas {
            width: calc(50% - 10px);
            margin: 0 5px;
            box-sizing: border-box;
            border: 4px solid #aabbff;
        }
    }
    .pBtn{
        width: calc(50% - 20px);
        display: flex;
        justify-content: center;
        padding: 10px;
        button{
            margin: 5px 15px;
            width: 100px;
            height: 40px;
            border-radius: 5px;
            border: none;
            color: #fff;
            font-weight: 700;
            &:hover{
                cursor: pointer;
                box-shadow: 5px 5px 15px #4b545ca4;
            }  
        }
        .open{
            background-color: #409EFF;
        }
        .shot{
            background-color: #67C23A;
        }
    }
    .upPhoto{
        height: 28vh;
        margin: 0 5px;
        box-sizing: border-box;
        border: 4px solid #aabbff;
        #upImg{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .upInput{
        margin: 10px 5px;
        box-sizing: border-box;
    }
    
</style>