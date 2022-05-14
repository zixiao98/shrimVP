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
            <el-form :model="userSecurityQuestion" :rules="rules" ref="userSecurityQuestion" label-width="85px">
                <div class="question">
                    <el-form-item label="密保问题:">
                        <span>{{question}}</span>
                    </el-form-item>
                </div>
                <div class="answer">
                    <el-form-item label="答案:" prop="answer">
                        <el-input v-model="userSecurityQuestion.answer" placeholder="答案"></el-input>
                    </el-form-item>
                </div>
                <div class="psw">
                    <el-form-item label="新密码:" prop="password">
                        <el-input v-model="userSecurityQuestion.password" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="psw">
                    <el-form-item label="确认密码:" prop="psws">
                        <el-input v-model="userSecurityQuestion.psws" show-password></el-input>
                    </el-form-item>
                </div>
                <div class="vCode">
                    <el-form-item label="验证码:"></el-form-item>
                    <el-input v-model="userSecurityQuestion.vCode"  maxlength="4" show-word-limit placeholder="验证码"></el-input>
                    <span>{{vCode}}</span>
                    <button @click.prevent='refreshVcode'><i class="el-icon-refresh"></i></button>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <button class='left' @click="dialogVisible = false">取 消</button>
                <button class='right' type="primary" @click.prevent="findBackByQuestion('userSecurityQuestion')">确 定</button>
            </span>
        </el-dialog>
        <div class="psw-box">
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
                        <span class="rights">{{accNumber}}</span>
                    </div>
                    <!-- <div class="btn-email">
                        <button class="check-btn" @click='toFindBackByEmail'>找回</button>by
                        <el-link :underline="false" class="link">邮箱验证</el-link>
                    </div> -->
                    <div class="btn-securityQuestion">
                        <button class="check-btn" @click='toFindBackByQuestion(1)'>找回</button>by
                        <el-link :underline="false" class="link">密保问题1</el-link>
                    </div>
                    <div class="btn-securityQuestion">
                        <button class="check-btn" @click='toFindBackByQuestion(2)'>找回</button>by
                        <el-link :underline="false" class="link">密保问题2</el-link>
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
export default {
    data(){
        //以下两个属性用于密码二次检验
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.userSecurityQuestion.psws !== '') {
                    this.$refs.userSecurityQuestion.validateField('psws');//触发确定密码的校验
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userSecurityQuestion.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            //要找回的账号
            accNumber: "2568624492@qq.com",
            //切换card的标识字段
            changeFlag:false,
            //密保问题
            question:'我的生日是几月几号？',
            //密保
            userSecurityQuestion:{
                question:'',
                answer:'',
                vCode:'',
                password:'',
                psws:'',
            },
            //对话框标识位
            dialogVisible:false,
            //从服务器接收的验证码
            vCode:'',
            pswData:{},
             rules: {//传入el-form ，表单验证规则
                answer: [
                    { required: true, message: '请输入密保答案', trigger: ['blur','change'] },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: ['blur','change'] },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: ['blur','change'] },
                    { validator: validatePass, trigger: ['blur','change'] }
                ],
                psws:[
                    { required: true, message: '请输入密码', trigger: ['blur','change'] },
                    { validator: validatePass2, trigger: ['blur','change'] }
                ]
            },
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
        //找回密码
        async toCheck(){
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/Psw/findAcAndPsw`,{
                    params:{accNumber:this.accNumber}    
                }))
                console.log(res?.status)
            if(res?.status == 204){
                console.log(res?.status)

                this.$noticeInfo('error',204,'该用户不存在',1500)
            }
            if(res?.status == 200){
                this.changeFlag = !this.changeFlag;
                this.pswData = res.data.data;
                console.log(this.pswData)
            }
            if(err){
                this.$notice('error',err,1500,false)
            }
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
        toFindBackByQuestion(n){
            this.dialogVisible = !this.dialogVisible;
            this.refreshVcode();
            if(n ==1){
                console.log(this.pswData.question1)
                this.question = this.pswData.question1;
                this.userSecurityQuestion.question = 'question1';
            }else{
                console.log(this.pswData.question2)
                this.question = this.pswData.question2;
                this.userSecurityQuestion.question = 'question2';
            }
        },
        //确定用密保问题找回密码
         findBackByQuestion(form){
            console.log(this.userSecurityQuestion)
            this.$refs[form].validate(async (valid) =>{
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
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
                }).then(async () => {//确定提交修改
                   //发送请求-验证密保是否正确
                    let [err,res] = await this.$awaitTo(this.$axios.post(`${this.$baseUrl}/user/Psw/valPsw`,{
                        data:{
                            createById:this.pswData.createById,
                            question:this.userSecurityQuestion.question,
                            answer:this.userSecurityQuestion.answer,
                            password:this.userSecurityQuestion.password,
                        }
                    }))
                    if(res?.status == 204){
                        this.$noticeInfo('error',204,'密保问题答案错误',1500)
                    }
                    if(res?.status == 200){
                        this.$message({
                            type: 'success',
                            message:'修改密码成功',
                            duration:1800
                        })
                        setTimeout(() => {this.backLogin();}, 2000);
                    }
                    if(err){
                        this.$notice('error',err,1500,false)
                    }
                    // this.dialogVisible = !this.dialogVisible;
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消操作'
                    });          
                });
            })
            
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