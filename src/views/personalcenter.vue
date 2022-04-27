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
                                        <i class="el-icon-s-tools elIcon" @click="openDialogChangeInfo">用户信息</i>
                                        <div class="topLeft">
                                            <div class="pasw">
                                                <i class="el-icon-menu elIcon" @click="openDialogSettingPsw">密保问题</i>
                                            </div>
                                            <div class="img">
                                                <img :src="userPic" alt="个人中心的头像" ref="myPhoto">
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
                                                    <div v-if="personalInfoKeyValue[index]=='性别'" class="val">{{userInfo[key]?'男':'女'}}</div>
                                                    <div v-else class="val">{{userInfo[key]}}</div>
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
                                    <div class="weatherDiv"
                                        v-loading="weatherChartLoading" 
                                        element-loading-text="拼命加载中"
                                        element-loading-spinner="el-icon-loading"
                                        element-loading-background="rgba(20,20,20,.4)">
                                        <div class="weatherTitle">
                                            <el-cascader
                                                placeholder="地区"
                                                size="mini"
                                                :options="options"
                                                v-model="weatherLoction"
                                                @change="handleChanges">
                                            </el-cascader>
                                            <i>来源：{{wRefer}}</i>
                                            <i>更新：{{weather.obsTime}}</i>
                                        </div>
                                        <div class="weatherInfo">
                                            <div class="weatherIcon">
                                                <i :class="icon" style="font-size:100px;"></i><br/>
                                                <i>{{weather.text}}</i>
                                            </div>  
                                            <div class="item">
                                                <div>实时温度：<i>{{weather.temp}}℃</i></div>
                                                <div>体感温度：<i>{{weather.feelsLike}}℃</i></div>
                                                <div>露点温度：<i>{{weather.dew}}℃</i></div>
                                                <div>相对湿度：<i>{{weather.humidity}}%</i></div>
                                            </div>
                                            <div class="item">
                                                <div>云量：<i>{{weather.cloud}}%</i></div>
                                                <div>风向：<i>{{weather.windDir}}</i></div>
                                                <div>风速：<i>{{weather.windSpeed}}km/h</i></div>
                                                <div>风力等级：<i>{{weather.windScale}}级</i></div>
                                            </div>
                                            <div class="item">
                                                <div>降雨量：<i>{{weather.precip}}mm/h</i></div>
                                                <div>能见度：<i>{{weather.vis}}km</i></div>
                                                <div>大气压强：<i>{{weather.pressure}}hPa</i></div>
                                                
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
            width="600px"
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
            width="500px"
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
        <!-- 修改用户资料 -->
        <el-dialog
            title="修改用户资料"
            :visible.sync="dialogVisibleIII"
            width="600px"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" :rules="rules" label-width="100px">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="updateForm.name"></el-input>
                    </el-form-item>
                    <el-row :gutter="24">
                         <el-col :span="14">
                            <el-form-item label="年龄" prop="age">
                                <el-input v-model.number="updateForm.age"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="性别">
                                <el-radio-group v-model="updateForm.sex">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="0">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="地区" prop="region">
                        <el-cascader
                            placeholder="地区"
                            size="large"
                            :options="options"
                            v-model="updateForm.region"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="updateForm.addres"></el-input>
                    </el-form-item>
                    <el-row :gutter="24">
                        <el-col :span="14">
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="updateForm.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="手机">
                                <el-input v-model="updateForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleIII = false">取 消</el-button>
                <el-button type="primary" @click="modifyUserInfo('updateForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 设置密保问题 -->
        <el-dialog
            title="设置密保问题"
            :visible.sync="dialogVisibleIV"
            width="600px"
            >
            <div class="dialogDiv">
                <el-form :model="pswForm" label-width="100px">
                    <el-form-item label="问题一" prop="name">
                        <el-input v-model="pswForm.question1"></el-input>
                    </el-form-item>
                    <el-form-item label="答案一" prop="name">
                        <el-input v-model="pswForm.answer1"></el-input>
                    </el-form-item>
                    <el-form-item label="问题二" prop="name">
                        <el-input v-model="pswForm.question2"></el-input>
                    </el-form-item>
                    <el-form-item label="答案二" prop="name">
                        <el-input v-model="pswForm.answer2"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleIV = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisibleIV = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import PieIII from '../components/personalcenter/pieIII.vue'
import BarIII from '../components/personalcenter/barIII.vue'
import Circles from '../components/personalcenter/circle.vue'
import PolarGraph from '../components/personalcenter/polarGraph.vue'
import { regionData,CodeToText,TextToCode } from 'element-china-area-data';
export default {
    data(){
        return {
            userPic:'123',//用户头像
            dialogVisible:false,//拍照对话框
            photoFlag:false,//是否有拍摄好的拍照的标志
            imgFlag:false,//是否有上传好的图片的标志
            dialogVisibleII:false,//上传照片对话框
            fileList:[],//上传照片list
            upPhoto:false,//控制上传照片显示隐藏的字段
            imgSrc:'#',//图片url
            imgType:["image/png","image/jpeg"],//图片类型接收范围
            dialogVisibleIII:false,//修改用户资料对话框
            dialogVisibleIV:false,//设置密保问题对话框
            picture:'',
            updateForm:{
                region:[],
            },
            rules: {//传入el-form ，表单验证规则
                name: [
                    { required: true, message: '请输入你的名称', trigger: ['blur','change'] },
                    { min: 2, max: 18,message: '长度在 2 到 18 个字符', trigger: ['blur','change'] }
                ],
                age:[
                    { required: true, message: '请输入年龄', trigger: ['blur','change'] },
                    { type:'number',min: 18, max: 120, message: '18-120', trigger: ['blur','change'] }
                ],
                region:[
                    {required:true,message: '请选择你的地区', trigger:'change'}
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: ['blur', 'change']},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            },
            //省市区联动
            options: regionData,
            selectedOptions: '',

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
            //用户信息
            userInfo:{},
            //天气
            weatherChartLoading:true,
            weather:{},
            wRefer:null,
            icon:'',
            weatherLoction:'',
            //密保问题
            pswForm:{
                question1:'',
                answer1:'',
                question2:'',
                answer2:'',
            }
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
    //初始化用户信息，天气
    this.getUserInfo()
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
        //获取用户信息
        async getUserInfo(){
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/userInfo`,{
                    headers: {'Authorization': 'Bearer '+token,}
            }))
            if(res?.status === 200){
                this.$noticeInfo('success',res?.status,res?.data.tips,3000)
                //保存数据
                localStorage.setItem('user',JSON.stringify(res.data.user))
                //更新数据
                let user=  localStorage.getItem('user');
                await this.dealInitUserData(user)//user
                await this.getWeatherLocaltion()//weather
            }
            if(err){
                    this.$noticeInfo('error','出现错误！','',3000)
            }
        },
        //数据初始化处理
        dealInitUserData(data){
            this.userInfo =JSON.parse(data);
            //数据处理
            this.userInfo.shrimpNum =this.userInfo.shrimpNum + '尾'
            this.userInfo.equipmentInvestment =this.userInfo.equipmentInvestment + '￥'
            let time =  new Date(this.userInfo.loginTime)
            this.userInfo.loginTime = time.toLocaleString().split(" ")[1];
            this.userInfo.registerTime = this.userInfo.registerTime.split("T")[0];
            this.userPic = this.userInfo.pic
        },
        //获取地理位置
        getWeatherLocaltion(){
            let l = this.userInfo.region.split('/');
            this.weatherLoction =  [TextToCode[l[0]].code,TextToCode[l[0]][l[1]].code,TextToCode[l[0]][l[1]][l[2]].code]
            let s = this.weatherLoction;
            let loction = CodeToText[s[2]]
            if( loction=='市辖区'||loction =='城区'){loction = CodeToText[s[1]]}
            if( loction=='市辖区'||loction =='城区'){loction = CodeToText[s[0]]}
            this.weatherChartLoading = true;
            this.getWeatherData(loction)
        },
        //获取天气信息 -location(Text)
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
                    console.log(result)
                    this.weather = result.data.now;
                    this.wRefer = result.data.refer.sources.join(' ');
                    this.weather.obsTime = new Date(this.weather.obsTime).toLocaleString()
                    this.icon = `qi-${this.weather.icon}`
                    this.weatherChartLoading = false
                }
                if(error){this.$noticeInfo('error','出现错误！','',3000)}
            }
            if(err){
                this.$noticeInfo('error','出现错误！','',3000)
            }
            
        },
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
        //使用拍摄好的照片
        putPhoto(){
            this.dialogVisible = false;
            if(!this.photoFlag){return false}
            window.localStorage.setItem('personnalPhoto',this.$refs.photo.getAttribute('src'))
            // this.$refs.myPhoto.src = window.localStorage.getItem('personnalPhoto')
            this.userPic = window.localStorage.getItem('personnalPhoto')
            this.photoFlag = false;
            this.picture = window.localStorage.getItem('personnalPhoto');
            //更新头像
            this.updateUserImg()
        },
        //关闭视频流
        closeCamera(){
             if(this.$refs.video.srcObject){
                this.$refs.video.srcObject.getTracks()[0].stop();
                this.$refs.video.srcObject=null;
             }
        },
        //清空图片-将拍摄好的图片清空
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
        //关闭对话框--拍照
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
            // this.$refs.myPhoto.src = window.localStorage.getItem('personnalPhoto')
            this.userPic = window.localStorage.getItem('personnalPhoto')
            this.imgFlag = false;
            this.picture = window.localStorage.getItem('personnalPhoto');
            //更新头像
            this.updateUserImg()
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
                    //判断文件大小是不是超过100kb
                    if(files.size>1024*1024/10-1000){
                        this.$message({
                            message:"请选择大小 90kb 以下的图片",
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
        //上传头像
        async updateUserImg(){
            console.log(this.picture)
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.put(`${this.$baseUrl}/user/modifyPic`,{
                    data:{
                        pic:this.picture
                    },
                },{headers: {'Authorization': 'Bearer '+token,}}))
            if(res?.status === 200){
                this.$noticeInfo('success',res?.status,res?.data.tips,3000)
                //保存数据
                localStorage.setItem('user',JSON.stringify(res.data.user))
            }
            if(err){
                this.$nextTick(()=>{
                    let user = JSON.parse(window.localStorage.getItem('user'))
                    this.userPic = user.pic;
                    console.log(this.userPic)
                })
               
                this.$noticeInfo('error','图片上传失败','',3000)
            }
        },
        //打开修改用户信息dialog
        openDialogChangeInfo(){
            this.dialogVisibleIII = true;
            this.updateForm =JSON.parse(localStorage.getItem('user'))
            //code -省市区
            let s = this.updateForm.region.split('/');
            this.updateForm.region =  [TextToCode[s[0]].code,TextToCode[s[0]][s[1]].code,TextToCode[s[0]][s[1]][s[2]].code]
            //Text -省市区
            let l = this.updateForm.region;
            this.selectedOptions = `${CodeToText[l[0]]}/${CodeToText[l[1]]}/${CodeToText[l[2]]}`
        },
        //修改用户信息
        modifyUserInfo(form){
            //表单验证
            this.$refs[form].validate(async (valid) => {
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
                let newUserData = await this.dealUpdateUserInfo();
                let token = window.localStorage.getItem('token');
                let [err,res] = await this.$awaitTo(this.$axios.put(`${this.$baseUrl}/user/modify`,{
                        data:{
                            updateForm:newUserData
                        },
                    },{headers: {'Authorization': 'Bearer '+token,}}))
                if(res?.status === 200){
                    this.$noticeInfo('success',res?.status,res?.data.tips,3000)
                    //保存数据
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    //更新数据
                    let user=  localStorage.getItem('user');
                    await this.dealInitUserData(user)//user
                    await this.getWeatherLocaltion()//weather
                }
                if(err){
                     this.$noticeInfo('error','出现错误！','',3000)
                }
                 this.dialogVisibleIII = false;
            });
        },
        //打开设置密保问题dialog
        openDialogSettingPsw(){
            this.dialogVisibleIV = true;
        },
        //省市区联动 ---修改用户信息
        handleChange(){
            let s = this.updateForm.region;
            this.selectedOptions = `${CodeToText[s[0]]}/${CodeToText[s[1]]}/${CodeToText[s[2]]}`
        },
        //省市区联动 ---获取地理位置天气
        handleChanges(){
            let s = this.weatherLoction;
            let loction = CodeToText[s[2]]
            if( loction=='市辖区'||loction =='城区'){loction = CodeToText[s[1]]}
            if( loction=='市辖区'||loction =='城区'){loction = CodeToText[s[0]]}
            this.weatherChartLoading = true;
            this.getWeatherData(loction)
        },
        //处理要更新的用户信息
        dealUpdateUserInfo(){
            let newInfoForm = {};
            newInfoForm.name = this.updateForm.name;
            newInfoForm.age = this.updateForm.age;
            newInfoForm.sex = this.updateForm.sex;
            newInfoForm.age = this.updateForm.age;
            newInfoForm.addres = this.updateForm.addres;
            newInfoForm.email = this.updateForm.email;
            newInfoForm.phone = this.updateForm.phone;
            newInfoForm.region = this.selectedOptions;
            return newInfoForm 
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    @import '@/scss/personalcenter.scss';
</style>