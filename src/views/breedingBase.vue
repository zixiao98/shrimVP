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
                                        <el-select v-model="select" slot="prepend" placeholder="选择查询条件" @change='this.SelectClick'>
                                            <el-option v-for="item in optionValue" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                        </el-select>
                                        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select"></el-input>
                                        <el-tooltip class="item" effect="dark" content="条件搜索" placement="bottom-start">
                                                <i class="el-icon-search" @click.stop="lookUp"></i>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="原始数据" placement="bottom-start">
                                                <i class="el-icon-refresh-left" @click.stop="lookBack"></i>
                                        </el-tooltip>
                                    </div>
                                    <i v-show="flag" class="tipsInfo">查询数据如下：</i>
                                </div>
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="createDate" label="创建日期" align="center" width="200"></el-table-column>
                                    <el-table-column prop="baseName" label="基地名称" align="center" width="250"></el-table-column>
                                    <el-table-column prop="hasPond" label="拥有虾塘数量" align="center" width="120"></el-table-column>
                                    <el-table-column prop="hasBE" label="拥有设备数量" align="center" width="120"></el-table-column>
                                    <el-table-column prop="baseRegion" label="基地地区" align="center" width="300"></el-table-column>
                                    <el-table-column prop="baseAddr" label="基地详细地址" align="center"></el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
                                         <template slot-scope="scope">
                                            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleClick(scope.row,scope.$index)">编辑</el-button>
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
            title="添加基地"
            :visible.sync="dialogVisible"
            width="600px"
            >
            <div class="dialogDiv">
                <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
                    <el-form-item label="创建者id:">
                        {{addForm.createById}}
                    </el-form-item>
                    <el-form-item label="基地名称" prop="baseName">
                        <el-input v-model="addForm.baseName"></el-input>
                    </el-form-item>
                    <el-form-item label="基地地区" prop="baseRegion">
                        <!-- <el-input v-model="addForm.baseRegion"></el-input> -->
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="addForm.baseRegion"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="addForm.baseAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="基地图片">
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
                <el-button type="primary"  @click="addBase('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="修改基地信息"
            :visible.sync="dialogVisibleII"
            width="800px"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" label-width="100px">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="创建者id:">
                                {{updateForm.createById}}
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="基地id:">
                                {{updateForm._id}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="基地名称">
                                <el-input v-model="updateForm.baseName"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item label="基地地区">
                                <!-- <el-input v-model="updateForm.baseRegion"></el-input> -->
                                <el-cascader
                                    size="large"
                                    :options="options"
                                    v-model="updateForm.baseRegion"
                                    @change="handleChanges">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                   <el-row :gutter="10">
                        <el-col :span="16">
                            <el-form-item label="基地详细地址">
                                <el-input v-model="updateForm.baseAddr"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                           <el-form-item label="创建时间:">
                                {{updateForm.createDate}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="基地图片">
                       <el-upload
                            class="avatar-uploader"
                            action="http://121.196.247.161:8885/user/upload/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccessII"
                            :before-upload="beforeAvatarUploadII">
                            <img v-if="updateForm.basePic" :src="updateForm.basePic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- {{updateForm.basePic}} -->
                    </el-form-item>
                    <el-row :gutter="10">
                        <el-col :span="7">
                            <el-form-item label="拥有虾塘:">
                                {{updateForm.hasPond}}
                            </el-form-item>
                        </el-col>
                         <el-col :span="7">
                            <el-form-item label="拥有设备:">
                                {{updateForm.hasBE}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            
                        </el-col>
                    </el-row>
                    
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleII = false">取 消</el-button>
                <el-button type="primary" @click="updateBaseInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { regionData,CodeToText,TextToCode  } from 'element-china-area-data';
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
                // {name:'创建时间',value:'createDate'},
                {name:'基地名称',value:'baseName'},
                {name:'基地地区',value:'baseRegion'},
                {name:'基地详细地址',value:'baseAddr'},
                {name:'拥有虾塘数量',value:'hasPond'},
                {name:'拥有设备数量',value:'hasBE'},
            ],//查询条件数组
            select:'',//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [],//表格展示数据
            //添加基地
            addForm: {
                createById:'',//创建者id
                baseName:'',//基地名称
                baseRegion:[],//基地地区
                baseAddr:'',//基地详细地址
                basePic:'',//基地图片
            },
            //修改基地
            updateForm:{},
            tableDatas:[],
            //省市区联动
            options: regionData,
            selectedOptions: '',
            selectedOptionsChange:'',
            rules: {//传入el-form ，表单验证规则
                baseName: [
                    { required: true, message: '请输入名称', trigger: ['blur','change'] },
                    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: ['blur','change'] }
                ],
                baseRegion:[
                    {required:true,message: '请选择地区', trigger:'change'}
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
        let node = document.querySelectorAll('.asd div')[1];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        // this.userName = window.localStorage.getItem('userName');
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[1];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
        
    },
    methods:{
        //添加基地的图片上传
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
        //修改基地信息的图片上传
        handleAvatarSuccessII(res, file) {
            console.log(res,file)
            if(res?.code == 200){
                this.$message.success(res?.message);
                this.updateForm.basePic =  res?.url[0];
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

        //省市区联动 --添加基地
        handleChange () {
            console.log(this.addForm.baseRegion);
            let s = this.addForm.baseRegion;
            this.selectedOptions = `${CodeToText[s[0]]}/${CodeToText[s[1]]}/${CodeToText[s[2]]}`
            console.log(this.selectedOptions)
        },
        //省市区联动 --修改基地信息
        handleChanges () {
            console.log(this.addForm.baseRegion);
            let s = this.updateForm.baseRegion;
            this.selectedOptionsChange = `${CodeToText[s[0]]}/${CodeToText[s[1]]}/${CodeToText[s[2]]}`
            console.log(this.selectedOptionsChange)
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
            //条件分页查询
            this.getDataByPageOptions(1)
            this.flag = true;//显示“查询数据如下”
        },
        lookBack(){
            //复原
            this.initData();
            this.select ='';
            this.searchInput='';
            this.flag = false;
        },
        // 跳转到添加页面
        addContent(){
            //置空
            this.resetAddBaseForm(this.addForm)
            this.dialogVisible = true;
            let {_id} = JSON.parse(window.localStorage.getItem('user'));
            this.addForm.createById = _id;
        },
        //添加基地
        async addBase(form){
            //表单验证
            await this.$refs[form].validate(async (valid) => {
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
                //验证通过
                let token = window.localStorage.getItem('token');
                let [err,res] = await this.$awaitTo(this.$axios.post(`${this.$baseUrl}/breedingBase/addBase`,{
                    params:{
                        pg:this.curPg,
                    },
                    data:{
                        createById:this.addForm.createById,
                        baseName:this.addForm.baseName,
                        baseRegion:this.selectedOptions,
                        baseAddr:this.addForm.baseAddr,
                        basePic:this.imageUrl,
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
        handleClick(row,index){
            this.updateIndex = index;
            this.updateForm = JSON.parse(JSON.stringify(row));
            this.selectedOptionsChange = this.updateForm.baseRegion;
            let s = this.updateForm.baseRegion.split('/');
            this.updateForm.baseRegion = [TextToCode[s[0]].code,TextToCode[s[0]][s[1]].code,TextToCode[s[0]][s[1]][s[2]].code]
            console.log(this.updateForm.baseRegion)
            this.dialogVisibleII = true;
        },
        //修改基地信息
        async updateBaseInfo(){
            //验证通过
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.put(`${this.$baseUrl}/breedingBase/modify`,{
                data:{
                    id:this.updateForm._id,
                    baseName:this.updateForm.baseName,
                    baseRegion:this.selectedOptionsChange,
                    baseAddr:this.updateForm.baseAddr,
                    basePic:this.updateForm.basePic,
                }
            },{headers: {'Authorization': 'Bearer '+token,}}))
            console.log(res,err)
            if(res?.status ===200){ 
                this.$noticeInfo('success',res?.status,res.data.tips,3000)
                // this.tableData[this.updateIndex] = res.data.data;//xxxxxx!!!!
                //Vue中，不能通过直接索引来改变某一项的值而达到响应式的目的，需要用// Vue.set Vue.set(vm.items, indexOfItem, newValue) 或者 vue重写的 splice方法
                this.$set(this.tableData,this.updateIndex,res.data.data)
                this.tableData[this.updateIndex].createDate = new Date(this.tableData[this.updateIndex].createDate).toLocaleString();
                this.dialogVisibleII = false;
            }
            if(err){this.$noticeInfo('error','失败','修改数据失败！！',3000)}
        },
        //待删除
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
        //删除基地信息
        async deleteBase(id){
            //验证通过
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.delete(`${this.$baseUrl}/breedingBase/deleteBase`,{
                data:{//delete方法只有两个参数，params需要放在data里
                    params:{
                        id:id,
                        pg:this.curPg
                    },
                },
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            }))
            console.log(res,err)
            if(res?.status ===200){ 
                this.$noticeInfo('success',res?.status,res.data.tips,3000)
                if(this.flag){
                    console.log(this.count%10,this.curPg)
                    if(this.count%10==1&&this.curPg>1){//一页删空时候，查询上一页
                        console.log(true)
                        this.getDataByPageOptions(this.curPg-1);
                        return;
                    }
                    this.getDataByPageOptions(this.curPg);
                    return;
                }
                this.tableData = res.data.data;
                for (const item of this.tableData) {
                    item.createDate = new Date(item.createDate).toLocaleString();
                }
                this.count = res.data.count;
            }
            if(err){this.$noticeInfo('error','失败','删除数据失败！！',3000)}
        },
        handleDelete(row){
             this.$confirm('是否删除该组数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //删除
                        this.deleteBase(row._id)
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
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/breedingBase/basePage`,{
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
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/breedingBase/basePageOptions`,{
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