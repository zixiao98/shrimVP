<template>
    <!-- 忘记密码 -->
    <div class="psw-container">
        <el-dialog
            title="by 密保问题-找回密码"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            width="35%"
            center
            :before-close="handleClose">
            <el-form :model="userSecurityQuestion" ref="userSecurityQuestion" label-width="80px">
                <div class="question">
                    <el-form-item label="密保问题:">
                        <span>{{question}}</span>
                    </el-form-item>
                </div>
                <div class="answer">
                    <el-form-item label="密保答案:">
                        <el-input v-model="userSecurityQuestion.answer" placeholder="答案"></el-input>
                    </el-form-item>
                </div>
                <div class="vCode">
                    <el-form-item label="验证码:"></el-form-item>
                    <el-input v-model="userSecurityQuestion.vCode"  maxlength="4" show-word-limit placeholder="验证码"></el-input>
                    <span>{{vCode}}</span>
                    <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button class='left' @click="dialogVisible = false">取 消</button>
                <button class='right' type="primary" @click="findBackByQuestion">确 定</button>
            </span>
        </el-dialog>
        <div class="psw-box">
        <!-- logo区域 -->
        <div class="avatar-box left">
            <img src="@/assets/img/logo.png" alt="logo"/>
            <p class="account-copyright">2022 © shrimp culture by lzj</p>
        </div>
        <div class="right">
            <div class="title">
            <div class="outSide">
                <div>
                    <img src="@/assets/img/logo2.png" alt="logo2">
                    <span>重置 </span>reset
                </div>
                <span class="other">
                    <el-link :underline="false" class="otherRight" @click.native.prevent='backLogin'>返回登录</el-link>
                </span>
            </div>
            </div>
            <!-- 表单区域 -->
            <div class="box-card" v-if="!changeFlag">
                <div class="card-left">
                    <div class="words">
                        请输入你需要找回密码的账号！
                    </div>
                </div>
                <div class="card-right">
                    <div class="accNumber">
                        <el-input v-model="accNumber" placeholder="账号"></el-input>
                    </div>
                    <div class="btn-check">
                        <button class="check-btn" @click='toCheck'>查询</button>
                    </div>
                </div>
            </div>
            <div class="box-card" v-if="changeFlag">
                <div class="card-left">
                    <div class="words">
                        请选择你需要找回密码的方式！
                    </div>
                </div>
                <div class="card-right">
                    <div class="accNumber">
                        <span class="left">你的账号：</span>
                        <span class="right">{{accNumber}}</span>
                    </div>
                    <div class="btn-email">
                        <button class="check-btn" @click='toFindBackByEmail'>找回</button>by
                        <el-link :underline="false" class="link">邮箱验证</el-link>
                    </div>
                    <div class="btn-securityQuestion">
                        <button class="check-btn" @click='toFindBackByQuestion'>找回</button>by
                        <el-link :underline="false" class="link">密保问题</el-link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <!-- <div id="login">
        <el-dialog
            title="by 密保问题-找回密码"
            :visible.sync="dialogVisible"
            width="35%"
            :before-close="handleClose">
            <el-form :model="userSecurityQuestion" ref="userSecurityQuestion" label-width="80px">
                <div class="question">
                    <el-form-item label="密保问题:">
                        <span>{{question}}</span>
                    </el-form-item>
                </div>
                <div class="answer">
                    <el-form-item label="密保答案:">
                        <el-input v-model="userSecurityQuestion.answer" placeholder="答案"></el-input>
                    </el-form-item>
                </div>
                <div class="vCode">
                    <el-form-item label="验证码:"></el-form-item>
                    <el-input v-model="userSecurityQuestion.vCode"  maxlength="4" show-word-limit placeholder="验证码"></el-input>
                    <span>{{vCode}}</span>
                    <button @click='refreshVcode'><i class="el-icon-refresh"></i></button>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button class='left' @click="dialogVisible = false">取 消</button>
                <button class='right' type="primary" @click="findBackByQuestion">确 定</button>
            </span>
        </el-dialog>
        <el-card class="box-card" v-if="!changeFlag">
            <div class="card-left">
                <div class="title">
                    <span>找回密码</span>
                </div>
                <div class="tips">
                    <span>YourPswLAss-你的密码小助手</span>
                </div>
                <div class="words">
                    请输入你需要找回密码的账号
                </div>
            </div>
            <div class="card-right">
                <div class="accNumber">
                    <el-input v-model="accNumber" placeholder="账号"></el-input>
                </div>
                <div class="btn-check">
                    <button class="check-btn" @click='toCheck'>查询</button>|
                    <el-link :underline="false" class="login-link" @click.native.prevent='backLogin'>返回登录</el-link>
                </div>
            </div>
        </el-card>
        <el-card class="box-card" v-if="changeFlag">
            <div class="card-left">
                <div class="title">
                    <span>找回密码</span>
                </div>
                <div class="tips">
                    <span>YourPswLAss-你的密码小助手</span>
                </div>
                <div class="words">
                    请选择你需要找回密码的方式
                </div>
            </div>
            <div class="card-right">
                <div class="accNumber">
                    <span class="left">账号：</span>
                    <span class="right">{{accNumber}}</span>
                </div>
                <div class="btn-email">
                    <button class="check-btn" @click='toFindBackByEmail'>找回</button>by
                    <el-link :underline="false" class="link">邮箱验证</el-link>
                </div>
                <div class="btn-securityQuestion">
                    <button class="check-btn" @click='toFindBackByQuestion'>找回</button>by
                    <el-link :underline="false" class="link">密保问题</el-link>
                </div>
            </div>
            <div class="bottom">
                <el-link :underline="false" class="login-link" @click.native.prevent='backLogin'>返回登录</el-link>
            </div>
        </el-card>
    </div> -->
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
            //要找回的账号
            accNumber: "",
            //切换card的标识字段
            changeFlag:false,
            //密保问题
            question:'',
            //密保
            userSecurityQuestion:{
                question:'',
                answer:'',
                vCode:''
            },
            //对话框标识位
            dialogVisible:false,
            //从服务器接收的验证码
            vCode:''
        }
    },
    methods:{
        //刷新验证码
        refreshVcode(){
            zx_axios.get('/vCode').then(res=>{
                //展示验证码
                this.vCode = res.data.vCode;
            }).catch(err=>{
                this.$notify({
                    type: 'error',
                    title: `状态码：${err.response.status}`,
                    message: `${err.response.data.errors[0].msg}`,
                    duration:1500
                });
            })
        },
        //找回密码
        toCheck(){
            this.changeFlag = !this.changeFlag;
            // zx_axios.get('/accNumber',{
            //     params:{
            //         accNumber:this.accNumber
            //     }
            // }).then(res=>{
            //     //切换
            //     this.changeFlag = !this.changeFlag;
            //     //存储密保问题
            //     this.question = res.data.question;
            //     console.log(this.question)
            // }).catch(err=>{
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
        },
        //通过邮箱验证找回
        toFindBackByEmail(){
            this.$notify({
                type: 'warning',
                title: '此功能暂时未上线',
                message: '敬请期待',
                duration:1500
            });
        },
        //通过密保问题找回
        toFindBackByQuestion(){
            this.dialogVisible = !this.dialogVisible;
            this.refreshVcode();
            this.userSecurityQuestion.question = this.question;
        },
        //确定用密保问题找回密码
        findBackByQuestion(){
            console.log(this.userSecurityQuestion)
             //先判断验证码是否一致
            if(this.userSecurityQuestion.vCode ===''){//输入验证码为空
                this.$notify({
                    type: 'warning',
                    title: `验证码不能为空`,
                    message: `请输入新的验证码`,
                    duration:1500
                });
                //停止下面代码执行
                return console.log('验证码不能为空');
            }else if(this.userSecurityQuestion.vCode.length<4){//输入验证码位数小于4
                this.$notify({
                    type: 'warning',
                    title: `验证码错误`,
                    message: `请输入4位有效的验证码`,
                    duration:1500
                });
                return console.log('请输入4位有效的验证码');
            }else if(this.userSecurityQuestion.vCode !== this.vCode){//输入验证码错误
                this.$notify({
                    type: 'error',
                    title: `验证码错误`,
                    message: `请输入新的验证码`,
                    duration:1500
                });
                //刷新验证吗
                this.refreshVcode();
                //将输入框置空
                this.userSecurityQuestion.vCode='';
                //停止下面代码执行
                return console.log('验证码不一致');
            }
            this.$confirm('是否提交修改', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(() => {//确定提交修改
                   //发送请求-验证密保是否正确
                    zx_axios.post('/verifySecurityQuestion',{
                        params:{
                            accNumber:this.accNumber,
                            question:this.userSecurityQuestion.question,
                            answer:this.userSecurityQuestion.answer
                        }
                    }).then(res=>{
                        console.log(res)
                        this.$notify({
                            type: 'success',
                            title: `状态码：${res.status}`,
                            message: `${res.data.tips}`,
                            duration:3000,
                            offset:68
                        });
                        //关闭对话框
                        this.dialogVisible = !this.dialogVisible;
                        //返回登录页
                        setTimeout(() => {
                            this.$router.replace('/');
                        }, 1000);
                    }).catch(err=>{
                        console.log(err)
                        //刷新验证码
                        this.refreshVcode();
                        //将输入框置空
                        this.userSecurityQuestion.vCode='';
                        this.$notify({
                            type: 'error',
                            title: `状态码：${err.response.status}`,
                            message: `${err.response.data.tips}`,
                            duration:1500
                        });
                    })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消操作'
                    });          
                });
        },
        backLogin(){//返回登录页面
            this.$router.push('/')
        }, 
        //关闭对话框
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_=> {
                done();
                console.log(_)
            }).catch(_=> {console.log(_)});
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/forgetpassword'
</style>