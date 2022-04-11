<template>
    <!-- 系统页 -->
    <div id="home">
        <div class="home-box">
            <el-container>
            <!-- 侧边栏 -->
            <el-aside width='240px'>
                <div class="title">
                    <img src="@/assets/img/logo.png" alt="">
                </div>
                <div class="option">
                    <div class="asd">
                        <div @click="navigation(1)"><i class="el-icon-monitor"></i><span>首页</span></div>
                    </div>
                    <div class="asd">
                        <span>管理模块</span>
                        <div @click="navigation(2)"><i class="el-icon-key"></i><span>基地管理</span></div>
                        <div @click="navigation(3)"><i class="el-icon-delete"></i><span>虾塘管理</span></div>
                        <div @click="navigation(4)"><i class="el-icon-delete"></i><span>设备管理</span></div>
                    </div>
                    <div class="asd">
                        <span>资料模块</span>
                        <div @click="navigation(5)"><i class="el-icon-coffee"></i><span>对虾资料</span></div>
                    </div>
                    <div class="asd">
                        <span>监测模块</span>
                        <div @click="navigation(6)"><i class="el-icon-sugar"></i><span>环境监测</span></div>
                        <!-- <div @click="navigation(7)"><i class="el-icon-light-rain"></i><span>xxx</span></div> -->
                    </div>
                    <div class="asd">
                        <span>个人模块</span>
                        <div @click="navigation(8)"><i class="el-icon-user-solid"></i><span>个人主页</span></div>
                        <div @click="navigation(9)"><i class="el-icon-view"></i><span>登录记录</span></div>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header height="80px">
                    <!-- 日期时间 -->
                    <div class="time">{{this.time}}</div>
                    <div class="webName">
                        对虾养殖可视化平台
                    </div>
                    <!-- 右上角点击下拉菜单 -->
                    <div>
                        <el-dropdown trigger="click" @command='handleCommand'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-user-solid"></i>
                                 <span class="userName">{{name}}</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command='personalcenter' icon="el-icon-user-solid">个人中心</el-dropdown-item>
                                <el-dropdown-item command='exit' icon="el-icon-error">登出系统</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--logo2  -->
                        <div class="logo">
                            <img src="@/assets/img/logo2.png" alt="">
                        </div>
                    </div>
                </el-header>
                <!-- 主体 -->
                <el-main>
                    <!-- 组件展示区 -->
                    <router-view />
                </el-main>
                <!-- 底部 -->
                <el-footer height="28px">
                    <div class='center'>
                        <i class="el-icon-check"></i>
                        <span>Shrimp culture visualization platform 对虾养殖可视化平台 2022 © shrimp culture by lzj</span>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
        </div>
        <div id="starry-box">
            <vue-particles
                color="#c93232"
                :particleOpacity="0.7"
                :particlesNumber="120"
                shapeType="circle"
                :particleSize="3"
                linesColor="#fff"
                :linesWidth="1"
                :lineOpacity="0.4"
                :linesDistance="80"
                :moveSpeed="1"
                :hoverEffect="false"
                :clickEffect="false">
            </vue-particles>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:'2568624492@qq.com1241112312312341231111111111111111111111',//用户名
            time:'',//时间
            timer:null,//定时器
        }
    },
    methods:{
        //侧边栏功能导航函数
        navigation(i){
            switch(i){//使用switch开关语句
                case 1://首页
                    if(this.$router.history.current.name !== 'homepage'){//避免已经是当前页的情况
                        this.$router.push('/homepage')
                    }
                    break;
                case 2://基地管理
                    if(this.$router.history.current.name !== 'breedingBase'){//避免已经是当前页的情况
                        this.$router.push('/breedingBase')
                    }
                     break;
                case 3://虾塘管理
                    if(this.$router.history.current.name !== 'shrimpPond'){//避免已经是当前页的情况
                        this.$router.push('/shrimpPond')
                    }
                     break;
                 case 4://设备管理
                    if(this.$router.history.current.name !== 'breedingEquipment'){//避免已经是当前页的情况
                        this.$router.push('/breedingEquipment')
                    }
                     break;
                case 5://放大镜
                    if(this.$router.history.current.name !== 'magnifier'){//避免已经是当前页的情况
                        this.$router.push('/magnifier')
                    }
                    break;
                case 6://环境监测
                    if(this.$router.history.current.name !== 'monitor'){//避免已经是当前页的情况
                        this.$router.push('/monitor')
                    }
                    break;
                case 8://个人中心
                    if(this.$router.history.current.name !== 'personalCenter'){//避免已经是当前页的情况
                        this.$router.push('/personalCenter')
                    }
                    break;
                case 9://登录记录
                    if(this.$router.history.current.name !== 'loginRecord'){//避免已经是当前页的情况
                        this.$router.push('/loginRecord')
                    }
                    break;
                default:
                    this.$notify({
                        type: 'warning',
                        title: '此功能暂时未上线',
                        message: '敬请期待',
                        offset:68,
                        duration:1500
                    });
                    break;
            }
        },
        handleCommand(c){
            switch(c){
                case 'personalcenter':
                    console.log(this.$router.history.current.name)
                    if(this.$router.history.current.name !== 'personalcenter'){//避免已经是当前页的情况
                        this.$router.push('/personalcenter')
                    }
                    break;
                case 'exit':
                    this.$confirm('是否确定退出登录？', '提示', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {//确定提交修改
                        console.log(this.$router.history.current.name)
                        if(this.$router.history.current.name !== 'login'){//避免已经是当前页的情况
                            this.$router.push('/')
                            window.localStorage.removeItem('token')
                            window.localStorage.removeItem('user')
                            window.localStorage.removeItem('userName')
                        }
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消操作'
                        });          
                    });
                    
                    break;
            }
        }
        
    },
    //生命周期函数
    mounted(){
        //获取用户
        // this.name= window.localStorage.getItem('user');
        //让时间第一时间显示出来
        this.time = (new Date()).toLocaleString();
        this.timer =setInterval(() => {
            let time = new Date();
            this.time = time.toLocaleString()//调整为本地字符串格式
        },1000)
    },
    beforeDestroy(){//在组件生命周期的最后销毁计时器
        if(this.timer){
            clearInterval(this.timer);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/home.scss';//引入样式
</style>