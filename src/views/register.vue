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
                <div>
                    <el-row :gutter="24">
                        <el-col :span="16">
                            <el-form-item prop="accNumber">
                                <el-input v-model="userForm.accNumber" placeholder="邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-radio-group v-model="userForm.sex">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="0">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="name">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item prop="name">
                                <el-input v-model="userForm.name" placeholder="昵称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item prop="region">
                                <!-- <el-input v-model="userForm.name" placeholder="昵称"></el-input> -->
                                 <el-cascader
                                    placeholder="地区"
                                    size="large"
                                    :options="options"
                                    v-model="userForm.region"
                                    @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                 <div class="vCode">
                      <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item prop="vCode">
                                <el-input placeholder="验证码" v-model="userForm.vCode" maxlength="4" show-word-limit></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <span>{{vCode}}</span>
                            <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
                        </el-col>
                      </el-row>
                </div>
                <div class="btn-register">
                    <button class="register-btn" @click.prevent="register('userForm')">注册</button>
                </div>
            </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData,CodeToText } from 'element-china-area-data';
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
                accNumber: '123@qq.com',
                password:'123456',
                psws:'123456',//辅助字段
                name:'1231231',
                sex:1,
                region:[],
                vCode:'',//辅助字段
            },
            rules: {//传入el-form ，表单验证规则
                name: [
                    { required: true, message: '请输入你的名称', trigger: ['blur','change'] },
                    { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: ['blur','change'] }
                ],
                region:[
                    {required:true,message: '请选择你的地区', trigger:'change'}
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
                ],
                vCode:[
                    { required: true, message: '请输入验证码', trigger: ['blur','change'] },
                    { min: 4,message: '请输入完整验证码', trigger: ['blur','change'] }
                ]
            },
            //从服务器接受的验证码
            vCode:'',
            //省市区联动
            options: regionData,
            selectedOptions: '',
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
        //省市区联动
        handleChange () {
            let s = this.userForm.region;
            this.selectedOptions = `${CodeToText[s[0]]}/${CodeToText[s[1]]}/${CodeToText[s[2]]}`
        },
        //注册账号
        register(form){
            //表单验证
            this.$refs[form].validate(async (valid) => {
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
                //验证通过
                if(this.userForm.vCode !== this.vCode){//输入验证码错误
                    this.$noticeInfo('error','验证码错误','请输入新的验证码',3000)
                    this.refreshVcode();//刷新验证吗
                    this.userForm.vCode=''; //将输入框置空
                    return ;
                }
                console.log(this.userForm)
                //所有验证通过，发送请求
                let [err,res] = await this.$awaitTo(this.$axios.post(`${this.$baseUrl}/user/register`,{
                    data:{
                        accNumber:this.userForm.accNumber,
                        name:this.userForm.name,
                        password:this.userForm.password,
                        sex:this.userForm.sex,
                        region:this.selectedOptions,
                    }
                }))
                console.log(res,err)
                if(res.status ===201){ 
                    this.$message({
                        type: 'success',
                        message:'注册成功,两秒后跳转至 登录 页面',
                        duration:1800
                    })
                    setTimeout(() => {this.backLogin();}, 2000);
                }
                if(err){
                    this.refreshVcode();//刷新验证吗
                    this.userForm.vCode='';//将输入框置空
                    if(err.response.status ===401){this.$notice('error',err,3000,false);return;}
                    this.$notice('warning',err,3000,false)
                }
                // this.$axios.post(`${this.$baseUrl}/register`,{
                //     data:{
                //         name:this.userForm.name,
                //         accNumber:this.userForm.accNumber,
                //         password:this.userForm.password
                //     }
                // }).then(res=>{
                //     if(res.status ===201){ //
                //         this.$message({
                //             type: 'success',
                //             message:'注册成功,三秒后跳转至 登录 页面',
                //             duration:2800
                //         })
                //         setTimeout(() => {
                //             this.backLogin();
                //         }, 1000);
                //     }
                // }).catch(err => {
                //     console.log(err)
                //     console.log(this.userForm)
                //     //刷新验证吗
                //     this.refreshVcode();
                //     //将输入框置空
                //     this.userForm.vCode='';
                //     if(err.response.status ===401){
                //         this.$notify({
                //             type: 'error',
                //             title: `状态码：${err.response.status}`,
                //             message: `${err.response.data.tips}`,
                //             duration:1500
                //         });
                //     }else{
                //         this.$notify({
                //             type: 'warning',
                //             title: `状态码：${err.response.status}`,
                //             message: `${err.response.data.errors[0].msg}`,
                //             duration:1500
                //         });
                //     }
                // })
            });
        },
        backLogin(){//返回登录页面
            this.$router.push('/')
        }
    },
    mounted(){
        //获取验证码
        this.refreshVcode();
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/register';
</style>