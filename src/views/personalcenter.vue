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
                                            <div class="informationItem">
                                                <div>
                                                    <i>名称：</i>
                                                </div>
                                            </div>
                                            <div class="informationItem">
                                               <div>
                                                    <i>名称：</i>
                                                </div>
                                            </div>
                                            <div class="informationItem">
                                                <div>
                                                    <i>名称：</i>
                                                </div>
                                            </div>
                                            <div class="informationItem">
                                                <div>
                                                    <i>名称：</i>
                                                </div>
                                            </div>
                                            <div class="informationItem">
                                                <div>
                                                    <i>名称：</i>
                                                </div>
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
        </div>
        <!-- 拍照对话框 -->
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
        <!-- 上传照片对话框 -->
        <el-dialog
            title="进行上传操作"
            :visible.sync="dialogVisibleII"
            width="30%"
            >
            <div id="top">
                <div>预览</div>
            </div>
            <div class="upPhoto">
                <img src="#" alt="请上传图片" id="upImg">
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
    @import '@/scss/personalcenter.scss';
</style>