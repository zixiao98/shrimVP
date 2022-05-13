<template>
    <!-- 首页 -->
    <div id="tabelPage">
        <div class="page-box">
            <div class="center">
                <div class="centerC">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <div class="boxContent">
                            <div class="trueContent">
                                <div class="tool">
                                    <el-button size="small" icon="el-icon-plus" class="add" @click="addContent">添加</el-button>
                                    <div class="search">
                                        <el-select v-model="select" slot="prepend" placeholder="选择查询条件"  @change='this.SelectClick'>
                                            <el-option v-for="item in optionValue" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                        </el-select>
                                        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select"></el-input>
                                        <i class="el-icon-search" @click.stop="lookUp"></i>
                                        <i class="el-icon-refresh-left" @click.stop="lookBack"></i>
                                    </div>
                                </div>
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="createDate" label="添加时间" align="center"  width="200"></el-table-column>
                                    <el-table-column prop="eqName" label="设备名称" align="center"  width="260"></el-table-column>
                                    <el-table-column prop="eqType" label="设备类型" align="center" width="100"></el-table-column>
                                    <el-table-column label="设备状态" align="center" width="100">
                                         <template slot-scope="scope">
                                           <el-tag effect="dark" :type="eqStatusTag[scope.row.eqStatus].type">{{ eqStatusTag[scope.row.eqStatus].value }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="eqPayfor" label="设备金额" align="center" width="100"></el-table-column>
                                    <el-table-column prop="eqBuyBy" label="购买设备人员" align="center"  width="160"></el-table-column>
                                    <el-table-column prop="eqFixedTime" label="修理次数" align="center" width="100"></el-table-column>
                                    <el-table-column prop="baseById" label="所属基地" align="center" ></el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
                                        <template slot-scope="scope">
                                            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleClick(scope.row)">编辑</el-button>
                                            <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                                <el-pagination
                                    :hide-on-single-page="singlePage"
                                    @current-change="pageChange"
                                    :current-page="curPg"
                                    :page-sizes="pss"
                                    :page-size="ps"
                                    layout="sizes,total, prev, pager, next, jumper"
                                    :total="count"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="添加设备"
            :visible.sync="dialogVisible"
            width="1000px"
            >
            <div class="dialogDiv">
                <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px">
                    <el-form-item label="创建者id:">
                        {{addForm.createById}}
                    </el-form-item>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="设备名称" prop="eqName">
                                <el-input v-model="addForm.eqName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="所属基地" prop="baseById">
                                <el-select v-model="addForm.baseById">
                                    <el-option v-for="item in baseIdAndNameArr" :key="item._id" :label="item.baseName" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="设备类型">
                                <el-select v-model="addForm.eqType">
                                    <el-option v-for="item in eqTypeTag" :key="item.data" :label="item.value" :value="item.data"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买金额">
                                <el-input v-model="addForm.eqPayfor" type="Number">
                                    <template slot="append">人民币￥</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="购买人员" prop="eqBuyBy">
                                <el-input v-model="addForm.eqBuyBy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="设备状态">
                                <el-select v-model="addForm.eqStatus" disabled>
                                    <el-option v-for="item in eqStatusTag" :key="item.data" :label="item.value" :value="item.data"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修理次数">
                                <el-input v-model="addForm.eqFixedTime" type="Number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     
                    <el-form-item label="设备图片">
                       <el-upload
                            class="avatar-uploader"
                            action="http://121.196.247.161:8885/user/upload/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- {{imageUrl}} -->
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEq('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="修改设备信息"
            :visible.sync="dialogVisibleII"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" label-width="150px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="创建者id:">
                                {{updateForm.createById}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="设备id:">
                                {{updateForm.baseById}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="14">
                            <el-form-item label="设备名称" prop="eqName">
                                <el-input v-model="updateForm.eqName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="所属基地" prop="baseById">
                                <el-select v-model="updateForm.baseById">
                                    <el-option v-for="item in baseIdAndNameArr" :key="item._id" :label="item.baseName" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="设备类型">
                                <el-select v-model="updateForm.eqType">
                                    <el-option v-for="item in eqTypeTag" :key="item.data" :label="item.value" :value="item.data"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买金额">
                                <el-input v-model="updateForm.eqPayfor" type="Number">
                                    <template slot="append">人民币￥</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="购买人员" prop="eqBuyBy">
                                <el-input v-model="updateForm.eqBuyBy" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="设备状态">
                                <el-select v-model="updateForm.eqStatus">
                                    <el-option v-for="item in eqStatusTag" :key="item.data" :label="item.value" :value="item.data"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修理次数">
                                <el-input v-model="updateForm.eqFixedTime" type="Number"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="设备图片">
                       <el-upload
                            class="avatar-uploader"
                            action="http://121.196.247.161:8885/user/upload/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="updateForm.eqPic" :src="updateForm.eqPic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- {{updateForm.eqPic}} -->
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleII = false">取 消</el-button>
                <el-button type="primary" @click="submitChangeForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            imageUrl: '',//图片预览

            singlePage:true,
            curPg:1,//当前页数
            pss:[10],//分页尺寸数组
            ps:10,//当前分页尺寸
            count:0,//数据条数
            flag:false,//是否处于查询状态的标志
            updateIndex:0,//修改信息的表格index

            dialogVisible:false,//添加信息对话框
            dialogVisibleII:false,//修改信息对话框
            optionValue:[
                {name:'设备名称',value:'eqName'},
                {name:'设备类型',value:'eqType'},
                {name:'设备状态',value:'eqStatus'},
                {name:'修理次数',value:'eqFixedTime'},
                {name:'设备金额',value:'eqPayfor'},
                {name:'购买设备人员',value:'eqBuyBy'},
            ],//查询条件数组
            select:'',//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [],//表格展示数据
            //添加信息数据
            addForm: {
                createById:'',//创建者id
                baseById:'',//所属基地id
                eqName:'',//设备名称
                eqPic:'',//设备图片
                eqType:0,//设备类型
                eqStatus:0,//设备状态
                eqPayfor:0,//购买设备金额
                eqBuyBy:'',//购买设备人员
                eqFixedTime:0,//修理次数
            },
            //修改信息数据
            updateForm:{},
            //基地列表
            baseIdAndNameArr:[],
            //设备类型的tag
            eqTypeTag:[
                {type:'info',value:'普通型',data:0},
                {type:'',value:'精密型',data:1},
                {type:'success',value:'实验型',data:2},
            ],
            //设备状态的tag
            eqStatusTag:[
                {type:'success',value:'正常',data:0},
                {type:'warning',value:'异常',data:1},
                {type:'danger',value:'故障',data:2},
                {type:'info',value:'维修中',data:3},
            ],
             rules: {//传入el-form ，表单验证规则
                eqName: [
                    { required: true, message: '请输入名称', trigger: ['blur','change'] },
                    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: ['blur','change'] }
                ],
                baseById:[
                    {required:true,message: '请选择基地', trigger:'change'}
                ],
                eqBuyBy: [
                    { required: true, message: '请输入名称', trigger: ['blur','change'] },
                    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: ['blur','change'] }
                ],
            },
        }
    },
    //生命周期函数
    created(){
        this.initData()
    },
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[3];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取基地列表
        this.getBaseIdAndName()
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[3];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
        
    },
    methods:{
        //获取基地列表
        async getBaseIdAndName(){
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/breedingBase/baseIdAndName`,{
                headers: {'Authorization': 'Bearer '+token,}
            }))
            console.log(res,err)
            if(res?.status ===200){ 
                this.$noticeInfo('success',res?.status,res.data.tips,3000)
                // this.tableData[this.updateIndex] = res.data.data;//xxxxxx!!!!
                this.baseIdAndNameArr = res.data.data;
            }
            if(err){this.$noticeInfo('error','失败','获取基地列表失败！！',3000)}
        },
        //添加设备信息的图片上传
        handleAvatarSuccess(res, file) {
            console.log(res,file)
            if(res?.code == 200){
                this.$message.success(res?.message);
                this.imageUrl =  res?.url[0];
                return;
            }
            this.$message.error('上传图片失败!');
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //修改设备信息的图片上传
        handleAvatarSuccessII(res, file) {
            console.log(res,file)
            if(res?.code == 200){
                this.$message.success(res?.message);
                this.updateForm.eqPic =  res?.url[0];
                return;
            }
            this.$message.error('上传图片失败!');
        },
        beforeAvatarUploadII(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        SelectClick(c){
            console.log(c)
        },
        lookUp(){
            console.log(this.select,this.searchInput)
            if(this.select.length ===0){
                this.$notify({
                        type: 'warning',
                        title: '警告!!!',
                        message: '请选择查找条件',
                        offset:68,
                        duration:1500
                    });
                return;
            }
            if(this.searchInput.length ===0){
                 this.$notify({
                        type: 'warning',
                        title: '警告!!!',
                        message: '请输入查找内容',
                        offset:68,
                        duration:1500
                    });
                return;
            }
            this.tableDatas = JSON.parse(JSON.stringify(this.tableData));
            this.tableData=this.tableData.filter(item=>{
                return String(item[this.select]).includes(this.searchInput)
            })
            console.log()
            if(this.tableData.length){
                this.$message({
                    type: 'success',
                    message: '查找成功!'
                });
            }else{
                this.$message({
                    message: '无匹配数据!'
                });
            }
            
        },
        lookBack(){
            this.tableData = JSON.parse(JSON.stringify(this.tableDatas));
            this.select ='';
            this.searchInput='';
        },
        // 跳转到添加页面
        addContent(){
            this.dialogVisible = true;
            //获取创建者id
            let {_id} = JSON.parse(window.localStorage.getItem('user'));
            this.addForm.createById = _id;
        },
        //添加设备
        async addEq(form){
            //表单验证
            await this.$refs[form].validate(async (valid) => {
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
                //验证通过
                console.log(this.addForm,this.imageUrl)
                let token = window.localStorage.getItem('token');
                let [err,res] = await this.$awaitTo(this.$axios.post(`${this.$baseUrl}/breedingEq/addEq`,{
                    params:{
                        pg:this.curPg,
                    },
                    data:{
                        createById:this.addForm.createById,//创建者id
                        baseById:this.addForm.baseById,//设备所属基地id
                        eqName:this.addForm.eqName,//设备名称
                        eqPic:this.imageUrl,//设备图片
                        eqType:this.addForm.eqType,//设备类型
                        eqStatus:this.addForm.eqStatus,//设备状态
                        eqPayfor:this.addForm.eqPayfor,//购买金额
                        eqBuyBy:this.addForm.eqBuyBy,//购买人员
                        eqFixedTime:this.addForm.eqFixedTime,//修理次数
                    }
                },{headers: {'Authorization': 'Bearer '+token,}}))
                console.log(res,err)
                if(res?.status ===201){ 
                    this.dialogVisible = false;
                    if(this.flag == true){
                        this.lookBack();
                        return;
                    }
                    this.$noticeInfo('success',res?.status,res.data.tips,3000)
                    this.tableData = res.data.data;
                    for (const item of this.tableData) {
                        item.createDate = new Date(item.createDate).toLocaleString();
                    }
                    this.count = res.data.count;
                }
                if(err){this.$noticeInfo('error','失败','添加数据失败！！',3000)}
            });
            
        },
        //待删除
        submitForm() {
            // this.$refs[formName].validate((valid) => {
            // if (valid) {
            //     alert('submit!');
            // } else {
            //     console.log('error submit!!');
            //     return false;
            // }
            // });
            this.$confirm('是否添加该组数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                            //添加
                            let time = new Date();
                            this.addForm.id = time.getTime();
                            this.addForm.createDate = time.toLocaleString();
                            console.log(this.addForm)
                            this.tableData.unshift(this.addForm)
                            this.dialogVisible = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消操作'
                            });          
                });   
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(row){
            this.updateForm = row;
            this.dialogVisibleII = true;
        },
        submitChangeForm(){
            console.log(this.updateForm)
            this.$confirm('是否修改该组数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                            //修改
                            this.tableData.filter((item)=>{
                                if(item.id === this.updateForm.id){
                                    item = this.updateForm
                                }
                            })
                            this.dialogVisibleII = false;
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消操作'
                            });          
                });
        },
        handleDelete(row){
            console.log(row)
             this.$confirm('是否删除该组数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                            //删除
                            this.tableData = this.tableData.filter((item)=>item.id !== row.id)
                            console.log(this.tableData)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消操作'
                            });          
                });
        },

        //
        //初始化数据
        initData(){
            //即获取第一页数据
            this.getDataByPage(1)
        },
        //分页变化
        async pageChange(pg){
            if(this.flag){this.getDataByPageOptions(pg);return;}
            this.getDataByPage(pg)
        },
        //分页查询
        async getDataByPage(pg){
            const token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/breedingEq/EqPage`,{
                params: {
                    pg: pg
                },
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            }))
            if(res?.status === 200){
                this.tableData = res.data.data;
                for (const item of this.tableData) {
                    item.createDate = new Date(item.createDate).toLocaleString();
                }
                this.count = res.data.count;
                this.curPg = pg;
                if(this.count>0){
                    this.$message({
                        type: 'success',
                        message:'获取数据成功！',
                        duration:2800
                    })
                }else{
                    this.$message({
                        type: 'warning',
                        message:'暂无数据!',
                        duration:2800
                    })
                }
            }
            if(err){this.$noticeInfo('error','失败','获取数据失败！！',3000)}
        },
        //条件分页查询
        async getDataByPageOptions(pg){
            console.log(pg)
            console.log(this.select,this.searchInput)
            let that = this;
            const token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/shrimpPond/pondPageOptions`,{
                params: {
                    pg: pg,
                    [that.select]:that.searchInput,
                },
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            }))
            console.log(err,res)
            if(res?.status === 200){
                this.tableData = res.data.data;
                for (const item of this.tableData) {
                    item.createDate = new Date(item.createDate).toLocaleString();
                }
                this.count = res.data.count;
                this.curPg = pg;
                if(this.count>0){
                    this.$message({
                        type: 'success',
                        message:'获取数据成功！',
                        duration:2800
                    })
                }else{
                    this.$message({
                        type: 'warning',
                        message:'无匹配数据!',
                        duration:2800
                    })
                }
            }
            if(err){
                this.$noticeInfo('error','失败','获取数据失败！！',3000)
            }
        },
        //表单置空
        resetAddBaseForm(obj){
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    obj[key] = Array.isArray(obj[key]) ? [] :'';
                }
            }
            this.imageUrl = '';
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/tabelPage.scss';
    @import '@/scss/upImg.scss';
</style>