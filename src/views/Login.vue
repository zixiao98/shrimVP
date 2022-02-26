<template>
    <!-- 登录 -->
    <div id="login">
        <el-card class="box-card">
            <div class="title">
                <span>对虾养殖可视化平台</span>
            </div>
            <div class="tips">
                <span>Shrimp visualization platform</span>
            </div>
            <div class="id">
                <el-input v-model="form.accNumber" placeholder="邮箱"></el-input>
            </div>
            <div class="psw">
                <el-input placeholder="密码" v-model="form.password" show-password></el-input>
            </div>
            <div class="vCode">
                <el-input placeholder="验证码" v-model="form.vCode" maxlength="4" show-word-limit></el-input>
                <span>{{vCode}}</span>
                <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
            </div>
            <div class="btn-login">
                <button class="login-btn" @click='login'>登录</button>
            </div>
            <div class="other">
                <el-link :underline="false" class="left" @click="register">邮箱注册</el-link>|
                <el-link :underline="false" class="right" @click="forgetpassword">忘记密码</el-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';
const zx_axios = axios.create({
    baseURL:'http://localhost:3000/user'
})
export default {
    name:'login',
    data(){
        return {
            form: {
                accNumber:'2568624492@qq.com',
                password:'12345678',
                vCode:''
            },
            //从服务器接收的验证码
            vCode:'',
        }
    },
    methods:{
        //刷新验证码
        refreshVcode(){
            zx_axios.get('/vCode').then(res=>{
            console.log(res)
            //展示验证码
            this.vCode = res.data.vCode;
            }).catch(err=>{
                console.log(err.response)
                this.$notify({
                    type: 'error',
                    title: `状态码：${err.response.status}`,
                    message: `${err.response.data.errors[0].msg}`,
                    duration:1500
                });
            })
        },
        login(){//登录，登录成功跳到首页homepage
            //先判断验证码是否一致
            if(this.form.vCode ===''){//输入验证码为空
                this.$notify({
                    type: 'warning',
                    title: `验证码不能为空`,
                    message: `请输入新的验证码`,
                    duration:1500
                });
                //停止下面代码执行
                return console.log('验证码不能为空');
            }else if(this.form.vCode.length<4){//输入验证码位数小于4
                this.$notify({
                    type: 'warning',
                    title: `验证码错误`,
                    message: `请输入4位有效的验证码`,
                    duration:1500
                });
                return console.log('请输入4位有效的验证码');
            }else if(this.form.vCode !== this.vCode){//输入验证码错误
                this.$notify({
                    type: 'error',
                    title: `验证码错误`,
                    message: `请输入新的验证码`,
                    duration:1500
                });
                //刷新验证吗
                this.refreshVcode();
                //将输入框置空
                this.form.vCode='';
                //停止下面代码执行
                return console.log('验证码不一致');
            }
            //发生登录请求
            zx_axios.get('/login',{
                params:{
                    accNumber:this.form.accNumber,
                    password:this.form.password
                    }
                }).then(res=>{
                    console.log(res)
                    //获取token&user，并且保存到localStorage中
                    const token = res.data.token;
                    const user = res.data.user;
                    const userName = res.data.name;
                    window.localStorage.setItem('token', token);
                    window.localStorage.setItem('user', user);
                    window.localStorage.setItem('userName', userName);
                    if(res.status == 200){
                        this.$message({
                            type: 'success',
                            message:res.data.tips,
                            duration:2800
                        })
                        setTimeout(() => {
                        this.$router.push('/homepage')
                        },500);
                    }
                    }).catch(err=>{
                        //刷新验证吗
                        this.refreshVcode();
                        //将输入框置空
                        this.form.vCode='';
                        if(err.response.status ===401){
                            this.$notify({
                                type: 'error',
                                title: `状态码：${err.response.status}`,
                                message: `${err.response.data.tips}`,
                                duration:1500
                            });
                        }else{
                            this.$notify({
                                type: 'warning',
                                title: `状态码：${err.response.status}`,
                                message: `${err.response.data.errors[0].msg}`,
                                duration:1500
                            });
                        }
                    })
        },
        register(){//跳转到 账号注册 页面
            this.$router.push('/register')
        },
        forgetpassword(){//跳转到 忘记密码 页面
            this.$router.push('/forgetpassword')
        }
    },
    mounted(){
        //获取验证码
        zx_axios.get('/vCode').then(res=>{
            console.log(res)
            //展示验证码
            this.vCode = res.data.vCode;
        }).catch(err=>{
            console.log(err.response)
            this.$notify({
                type: 'error',
                title: `状态码：${err.response.status}`,
                message: `${err.response.data.errors[0].msg}`,
                duration:1500
            });
        })
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/login.scss';//引入样式
</style>