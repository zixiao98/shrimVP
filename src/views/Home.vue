<template>
    <!-- 系统页 -->
    <div id="home">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width='280px'>
                <div class="title">
                    <span class='name'>YourPswLAss</span>
                    <span class="tips">你的密码小助手</span>
                </div>
                <div class="option">
                    <div class="asd">
                        <div @click="navigation(1)"><i class="el-icon-monitor"></i><span>首页</span></div>
                    </div>
                    <div class="asd">
                        <span>密码</span>
                        <div @click="navigation(2)"><i class="el-icon-key"></i><span>密码箱</span></div>
                        <div @click="navigation(3)"><i class="el-icon-delete"></i><span>回收站</span></div>
                    </div>
                    <div class="asd">
                        <span>备忘录</span>
                        <div @click="navigation(4)"><i class="el-icon-coffee"></i><span>工作</span></div>
                        <div @click="navigation(5)"><i class="el-icon-milk-tea"></i><span>生活</span></div>
                    </div>
                    <div class="asd">
                        <span>回忆</span>
                        <div @click="navigation(6)"><i class="el-icon-sugar"></i><span>甜蜜</span></div>
                        <div @click="navigation(7)"><i class="el-icon-light-rain"></i><span>苦涩</span></div>
                    </div>
                    <div class="asd">
                        <span>用户</span>
                        <div @click="navigation(8)"><i class="el-icon-user-solid"></i><span>个人中心</span></div>
                        <div @click="navigation(9)"><i class="el-icon-view"></i><span>登录记录</span></div>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header height="80px">
                    <!-- 日期时间 -->
                    <div class="time"></div>
                    <!-- 右上角点击下拉菜单 -->
                    <el-dropdown trigger="click" @command='handleCommand'>
                        <span class="el-dropdown-link">
                            <i class="el-icon-user-solid"></i> {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item command='personalcenter' icon="el-icon-user-solid">个人中心</el-dropdown-item>
                            <el-dropdown-item command='exit' icon="el-icon-error">登出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <!-- 主体 -->
                <el-main>
                    <!-- 组件展示区 -->
                    <router-view />
                </el-main>
                <!-- 底部 -->
                <el-footer height="80px">
                    <div class='left'>
                        <span>YourPswLAss v 0.1.0</span>
                    </div>
                    <div class='right'>
                        <i class="el-icon-check"></i>
                        <span>你的密码小助手</span>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:'',//用户名
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
                case 2://密码箱
                    if(this.$router.history.current.name !== 'passwordbox'){//避免已经是当前页的情况
                        this.$router.push('/passwordbox')
                    }
                    break;
                case 3://回收站
                    if(this.$router.history.current.name !== 'recyclebin'){//避免已经是当前页的情况
                        this.$router.push('/recyclebin')
                    }
                    break;
                case 8://个人中心
                    if(this.$router.history.current.name !== 'personalcenter'){//避免已经是当前页的情况
                        this.$router.push('/personalcenter')
                    }
                    break;
                case 9://登录记录
                    if(this.$router.history.current.name !== 'loginrecord'){//避免已经是当前页的情况
                        this.$router.push('/loginrecord')
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
        this.name= window.localStorage.getItem('user');
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