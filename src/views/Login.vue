<template>
<!-- 登录 -->
 <div class="login-container">
    <div class="login-box">
      <!-- logo区域 -->
      <div class="avatar-box left">
        <img src="@/assets/img/logo/logo_transparent.png"  alt="logo_transparent.png"/>
        <p class="account-copyright">2022 © shrimp culture by lzj</p>
      </div>
      <div class="right">
        <div class="title">
          <div class="outSide">
            <div>
                <img src="@/assets/img/logo/logo_transparent2.png" alt="logo_transparent2.png">
                <span>登录 </span>login
            </div>
            <span class="other">
                <el-link :underline="false" class="otherLeft" @click="register">邮箱注册</el-link>|
                <el-link :underline="false" class="otherRight" @click="forgetpassword">忘记密码</el-link>
            </span>
          </div>
        </div>
        <!-- 登录表单区域 -->
        <!-- 表单区域 -->
        <el-form :model="form" :rules="rules" ref="form">
            <div class="id">
                <el-form-item prop="accNumber">
                    <el-input v-model="form.accNumber" placeholder="邮箱"></el-input>
                </el-form-item>
            </div>
            <div class="psw">
                 <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="form.password" show-password></el-input>
                </el-form-item>
            </div>
            <div class="vCode">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item prop="vCode">
                            <el-input placeholder="验证码" v-model="form.vCode" maxlength="4" show-word-limit></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <span>{{vCode}}</span>
                        <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
                    </el-col>
                </el-row>
            </div>
            <div class="btn-login">
                <button class="login-btn" @click.prevent="login('form')">登录</button>
            </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            labelPosition:'left',
            form: {
                accNumber:'2568624492@qq.com',
                password:'123456',
                vCode:''
            },
             rules: {//传入el-form ，表单验证规则
                accNumber: [
                    { type:'email',required: true, message: '请输入有效邮箱', trigger: ['blur','change'] },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: ['blur','change'] },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: ['blur','change'] },
                ],
                vCode:[
                    { required: true, message: '请输入验证码', trigger: ['blur','change'] },
                    { min: 4,message: '请输入完整验证码', trigger: ['blur','change'] }
                ]
            },
            //从服务器接收的验证码
            vCode:'',
        }
    },
    methods:{
       //刷新验证码
        async refreshVcode(){
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/vCode`))
            this.vCode = res.data.vCode;//展示验证码
            if(err){
                this.$notice('error',err,1500,false)
            }else{
                this.$notice('success',res,1500,true)
            }
        },
        //登录，登录成功跳到首页homepage
        login(form){
            this.$refs[form].validate(async (valid) => {
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
                //验证通过
                if(this.form.vCode !== this.vCode){//输入验证码错误
                    this.$noticeInfo('error','验证码错误','请输入新的验证码',3000)
                    this.refreshVcode();//刷新验证吗
                    this.form.vCode=''; //将输入框置空
                    return ;
                }
                //所有验证通过，发送请求
                let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/login`,{
                    params:{
                        accNumber:this.form.accNumber,
                        password:this.form.password
                    }    
                }))
                if(res?.status ===200){ 
                    //保存数据
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    await this.$router.push('/home')
                    this.$message({
                        type: 'success',
                        message:'登录成功！',
                        duration:2800
                    })
                }
                if(err !== null){
                    this.refreshVcode();//刷新验证吗
                    this.form.vCode='';//将输入框置空
                    if(err.response.status ===401){this.$notice('error',err,3000,false);return;}
                    this.$notice('warning',err,3000,false)
                }
            });
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
       this.refreshVcode();
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/login.scss';//引入样式
</style>