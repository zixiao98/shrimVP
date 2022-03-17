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
                                                <img src="@/assets/img/logo.png" alt="">
                                            </div>
                                            <div class="btn">
                                                <button class="photo" @click="dialogVisible = true">拍照</button>
                                                <button class="up">上传</button>
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
            title="进行照片操作"
            :visible.sync="dialogVisible"
            width="50%">
            <div id="photo">
                <video ref="video" id="video">浏览器不支持 Video</video>
                <canvas ref="canvas">
                    <img ref="photo" alt="拍照后的照片">
                </canvas>
            </div>
            <div class="pBtn">
                <button @click="this.openCamera" class="open">打开摄像头</button>
                <button class="shot">拍照</button>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="this.cancelPhoto">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,
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
            let canvas = this.$refs.canvas;
            let photo = this.$refs.photo;
            // let streaming =false;
            console.log(video)
            // 获取摄像头的视频流
            try {
                video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
                video.play()
            } catch (e) {
                console.error(e,canvas,photo)
            }
            
            // video.addEventListener('canplay', () => {
            //     if (!streaming) {
            //         // 按比例放大 videoHeight
            //         // video.height = video.videoHeight / (video.videoWidth / video.width);

            //         // 设置 video 的宽高
            //         video.setAttribute('width', video.videoWidth);
            //         video.setAttribute('height', video.videoHeight);
            //         // 设置 canvas 的宽高
            //         canvas.setAttribute('width', video.videoWidth);
            //         canvas.setAttribute('height', video.videoHeight);
            //         streaming = true;
            //     }
            // }, false)
        },
        //拍照
        takePhoto(video,canvas,photo){
            const ctx = canvas.getContext('2d')
            if(video.style.width && video.style.height){
                // 拿video元素的宽高
                canvas.width = video.style.width;
                canvas.height = video.style.height;

                ctx.drawImage(video,0,0,video.style.width,video.style.height)

                // 生成图片
                const data = ctx.toDataURL('image/png');
                photo.setAttribute('src',data)
            }else{
                console.log('123')
            }
        },
        //取消拍照
        cancelPhoto(){
             // 关闭视频流
             this.dialogVisible = false;
             if(this.$refs.video.srcObject){
                 console.log(this.$refs.video.srcObject)
                this.$refs.video.srcObject.getTracks()[0].stop();
                this.$refs.video.srcObject=null;
             }
            
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
    #photo{
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
        justify-content: space-around;
        padding: 10px;
        button{
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
    
</style>