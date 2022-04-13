<template>
    <!-- 邮箱注册 -->
    <div class="register-container">
    <div class="register-box">
      <!-- logo区域 -->
      <div class="avatar-box left">
        <img src="@/assets/img/logo/logo_transparent.png" alt="logo_transparent.png"/>
        <p class="account-copyright">2022 © shrimp culture by lzj</p>
      </div>
      <div class="right">
        <div class="title">
          <div class="outSide">
            <div>
                <img src="@/assets/img/logo/logo_transparent2.png" alt="logo_transparent2.png">
                <span>注册 </span>register
            </div>
            <span class="other">
                <el-link :underline="false" class="otherRight" @click='backLogin'>返回登录</el-link>
            </span>
          </div>
        </div>
        <!-- 表单区域 -->
        <el-form :model="userForm" :rules="rules" ref="userForm">
                <!-- <div class="name">
                    <el-form-item prop="name">
                        <el-input v-model="userForm.name" placeholder="昵称"></el-input>
                    </el-form-item>
                </div> -->
                <div class="id">
                    <el-form-item prop="accNumber">
                        <el-input v-model="userForm.accNumber" placeholder="邮箱"></el-input>
                    </el-form-item>
                </div>
                <div class="vCode">
                    <el-input placeholder="验证码" v-model="userForm.vCode" maxlength="4" show-word-limit></el-input>
                    <span>{{vCode}}</span>
                    <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
                </div>
                <div class="psw">
                    <el-form-item prop="password">
                        <el-input placeholder="密码" v-model="userForm.password" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="psw">
                    <el-form-item prop="psws">
                        <el-input placeholder="确认密码" v-model="userForm.psws" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="btn-register">
                    <button class="register-btn" @click="register('userForm')">注册</button>
                </div>
            </el-form>
      </div>
    </div>
  </div>
    <!-- <div id="login">
        <el-card class="box-card">
            <el-form :model="userForm" :rules="rules" ref="userForm">
                <div class="title">
                    <span>注册-Register</span>
                </div>
                <div class="tips">
                    <span>你的密码小助手</span>
                </div>
                <div class="name">
                    <el-form-item prop="name">
                        <el-input v-model="userForm.name" placeholder="昵称"></el-input>
                    </el-form-item>
                </div>
                <div class="id">
                    <el-form-item prop="accNumber">
                        <el-input v-model="userForm.accNumber" placeholder="邮箱"></el-input>
                    </el-form-item>
                </div>
                <div class="vCode">
                    <el-input placeholder="验证码" v-model="userForm.vCode" maxlength="4" show-word-limit></el-input>
                    <span>{{vCode}}</span>
                    <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
                </div>
                <div class="psw">
                    <el-form-item prop="password">
                        <el-input placeholder="密码" v-model="userForm.password" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="psw">
                    <el-form-item prop="psws">
                        <el-input placeholder="密码" v-model="userForm.psws" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="btn-register">
                    <button class="register-btn" @click="register('userForm')">注册</button>
                </div>
                <div class="other">
                    <el-link :underline="false" class="left" @click='backLogin'>返回登录</el-link>
                </div>
            </el-form>
        </el-card>
    </div> -->
</template>

<script>
import axios from "axios";
const zx_axios = axios.create({
    baseURL:'http://localhost:3000/user'
})
export default {
    name:'login',
    data(){
        //以下两个属性用于密码二次检验
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userForm.psws !== '') {
                    this.$refs.userForm.validateField('psws');//触发确定密码的校验
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userForm: {//传入el-form ，表单数据
                name:'',
                accNumber: '',
                password:'',
                psws:'',
                vCode:'',
            },
            rules: {//传入el-form ，表单验证规则
                name: [
                    { required: true, message: '请输入你的名称', trigger: ['blur','change'] },
                    { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: ['blur','change'] }
                ],
                accNumber: [
                    { type:'email',required: true, message: '请输入有效邮箱', trigger: ['blur','change'] },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: ['blur','change'] },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: ['blur','change'] },
                    { validator: validatePass, trigger: ['blur','change'] }
                ],
                psws:[
                    { validator: validatePass2, trigger: ['blur','change'] }
                ]
            },
            //从服务器接受的验证码
            vCode:'',
        }
    },
    methods:{
        //刷新验证码
        refreshVcode(){
            zx_axios.get('/vCode').then(res=>{
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
        //注册账号
        register(form){
            //表单验证
            this.$refs[form].validate((valid) => {
                //验证通过
                if (valid) {
                    //判断验证码是否通过
                    if(this.userForm.vCode ===''){//输入验证码为空
                        this.$notify({
                            type: 'warning',
                            title: `验证码不能为空`,
                            message: `请输入新的验证码`,
                            duration:1500
                        });
                        //停止下面代码执行
                        return console.log('验证码不能为空');
                    }else if(this.userForm.vCode.length<4){//输入验证码位数小于4
                        this.$notify({
                            type: 'warning',
                            title: `验证码错误`,
                            message: `请输入4位有效的验证码`,
                            duration:1500
                        });
                        return console.log('请输入4位有效的验证码');
                    }else if(this.userForm.vCode !== this.vCode){//输入验证码错误
                        this.$notify({
                            type: 'error',
                            title: `验证码错误`,
                            message: `请输入新的验证码`,
                            duration:1500
                        });
                        //刷新验证吗
                        this.refreshVcode();
                        //将输入框置空
                        this.userForm.vCode='';
                        //停止下面代码执行
                        return console.log('验证码不一致');
                    }
                    //所有验证通过，发送请求
                    zx_axios.post('/register',{
                        data:{
                            name:this.userForm.name,
                            accNumber:this.userForm.accNumber,
                            password:this.userForm.password
                        }
                    }).then(res=>{
                        if(res.status ===201){ //
                            this.$message({
                                type: 'success',
                                message:'注册成功,三秒后跳转至 登录 页面',
                                duration:2800
                            })
                            setTimeout(() => {
                                this.backLogin();
                            }, 1000);
                        }
                    }).catch(err => {
                        console.log(err)
                        console.log(this.userForm)
                        //刷新验证吗
                        this.refreshVcode();
                        //将输入框置空
                        this.userForm.vCode='';
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
                } else {
                    this.$notify({
                        type: 'error',
                        title: `表单验证失败`,
                        message: `请检查输入！`,
                        duration:1500
                    });
                    return false;
                }
            });
        },
        backLogin(){//返回登录页面
            this.$router.push('/')
        }
    },
    mounted(){
        //获取验证码
        zx_axios.get('/vCode').then(res=>{
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
    @import '@/scss/register';
</style>