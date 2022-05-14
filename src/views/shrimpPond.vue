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
                                    <el-table-column prop="pondName" label="虾塘名称" align="center" width="300"></el-table-column>
                                    <el-table-column label="虾塘类型" align="center" width="100">
                                        <template slot-scope="scope">
                                           <el-tag effect="dark" :type="pondTypeTag[scope.row.pondType].type">{{ pondTypeTag[scope.row.pondType].name }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="pondVolume" label="虾塘面积/m²" align="center" width="100"></el-table-column>
                                    <el-table-column prop="depth" label="虾塘深度/m" align="center" width="100"></el-table-column>
                                    <el-table-column label="投放类型" align="center" width="100">
                                        <template slot-scope="scope">
                                           <el-tag effect="dark" :type="shrimpTypeTag[scope.row.species].type">{{ shrimpTypeTag[scope.row.species].name }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="投放尾数" align="center" width="100">
                                        <template slot-scope="scope">
                                            {{scope.row.inputNum ==0? '-' :scope.row.inputNum}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="投放状态" align="center" width="100">
                                         <template slot-scope="scope">
                                           <el-tag effect="dark" :type="deliveryStatusTag[scope.row.deliveryStatus].type">{{ deliveryStatusTag[scope.row.deliveryStatus].name }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="投放时间" align="center" width="100">
                                        <template slot-scope="scope">
                                            {{scope.row.launchDate.length ==0? '-' :scope.row.launchDate}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="捕获时间" align="center" width="100">
                                         <template slot-scope="scope">
                                            {{scope.row.harvestDate.length ==0? '-' :scope.row.harvestDate}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="所属基地" align="center" >
                                        <template slot-scope="scope">
                                           {{ getBaseName(scope.row.baseById) }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200" align="center">
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
            title="添加虾塘"
            :visible.sync="dialogVisible"
            width="1000px"
            >
            <div class="dialogDiv">
                <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
                    <el-form-item label="创建者id:">
                        {{addForm.createById}}
                    </el-form-item>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="虾塘名称" prop="pondName">
                                <el-input v-model="addForm.pondName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="所属基地" prop="baseById">
                                <!-- <el-input v-model="addForm.pondforBaseName"></el-input> -->
                                <el-select v-model="addForm.baseById">
                                    <el-option v-for="item in baseIdAndNameArr" :key="item._id" :label="item.baseName" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="虾塘类型">
                                <el-select v-model="addForm.pondType">
                                    <el-option v-for="item in pondTypeTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="虾塘面积">
                                <el-input v-model="addForm.pondVolume" type="Number">
                                    <template slot="append">平方米㎡</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="虾塘深度">
                                <el-input v-model="addForm.depth" type="Number">
                                    <template slot="append">米m</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="投放类型">
                                <!-- <el-input v-model="addForm.species"></el-input> -->
                                <el-select v-model="addForm.species" @change="speciesSelctByAdd">
                                    <el-option v-for="item in shrimpTypeTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="投放尾数">
                                <el-input v-model="addForm.inputNum" type="Number">
                                    <template slot="append">尾</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="投放状态">
                                <!-- <el-input v-model="addForm.deliveryStatus"></el-input> -->
                                <el-select v-model="addForm.deliveryStatus" disabled>
                                    <el-option v-for="item in deliveryStatusTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="投放时间">
                                <el-date-picker format="yyyy 年 MM 月 dd 日" v-model="addForm.launchDate" disabled type="date" placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="捕获时间">
                                <el-date-picker format="yyyy 年 MM 月 dd 日" v-model="addForm.harvestDate" :disabled="!Boolean(addForm.species)" type="date" placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="虾塘图片">
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
                <el-button type="primary" @click="addPond('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="修改虾塘信息"
            :visible.sync="dialogVisibleII"
            width="1000px"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" label-width="100px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="创建者id:">
                                {{updateForm.createById}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="虾塘id:">
                                {{updateForm._id}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="虾塘名称" prop="pondName">
                                <el-input v-model="updateForm.pondName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="所属基地" prop="baseById">
                                <!-- <el-input v-model="addForm.pondforBaseName"></el-input> -->
                                <el-select v-model="updateForm.baseById" disabled>
                                    <el-option v-for="item in baseIdAndNameArr" :key="item._id" :label="item.baseName" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="虾塘类型">
                                <el-select v-model="updateForm.pondType">
                                    <el-option v-for="item in pondTypeTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="虾塘面积">
                                <el-input v-model="updateForm.pondVolume" type="Number">
                                    <template slot="append">平方米㎡</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="虾塘深度">
                                <el-input v-model="updateForm.depth" type="Number">
                                    <template slot="append">米m</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="投放类型">
                                <!-- <el-input v-model="addForm.species"></el-input> -->
                                <el-select v-model="updateForm.species" :disabled="tagFlag" @change="speciesSelctByChange">
                                    <el-option v-for="item in shrimpTypeTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="投放尾数">
                                <el-input v-model="updateForm.inputNum" type="Number">
                                    <template slot="append">尾</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="投放状态">
                                <!-- <el-input v-model="addForm.deliveryStatus"></el-input> -->
                                <el-select v-model="updateForm.deliveryStatus" disabled>
                                    <el-option v-for="item in deliveryStatusTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="投放时间">
                                <el-date-picker format="yyyy 年 MM 月 dd 日" v-model="updateForm.launchDate" disabled type="date" placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="捕获时间">
                                <el-date-picker :editable="Boolean(false)" format="yyyy 年 MM 月 dd 日" v-model="harvestDateByChange" :disabled="!Boolean(updateForm.species)" type="date" placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="虾塘图片">
                       <el-upload
                            class="avatar-uploader"
                            action="http://121.196.247.161:8885/user/upload/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccessII"
                            :before-upload="beforeAvatarUploadII">
                            <img v-if="updateForm.pondPic" :src="updateForm.pondPic" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- {{updateForm.basePic}} -->
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleII = false">取 消</el-button>
                <el-button type="primary" @click="updatePondInfo">确 定</el-button>
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
                {name:'虾塘名称',value:'pondName'},
                {name:'虾塘面积',value:'pondVolume'},
                {name:'虾塘深度',value:'depth'},
                {name:'投放尾数',value:'inputNum'},
                {name:'投放时间',value:'launchDate'},
                {name:'捕获时间',value:'harvestDate'},
            ],//查询条件数组
            select:'',//选中的查询条件
            searchInput:'',//搜索关键词
            tableData:[],//表格展示数据
            //添加信息数据
            addForm: {
                baseById:'',//虾塘所属基地id
                pondName:'',//虾塘名称
                pondPic:'',//虾塘图片
                pondType:0,//虾塘类型
                pondVolume:0,//面积
                depth:0,//深度
                species:0,//投放类型（虾种类）
                inputNum:10,//投放尾数
                deliveryStatus:0,//投放状态 0-未投放 1-已投放
                launchDate:'',//投放时间
                harvestDate:'',//捕获时间（预计）
                createDate:'',//创建时间
            },
            //修改信息数据
            updateForm:{},
            //基地列表
            baseIdAndNameArr:[],
            //虾塘类型的tag
            pondTypeTag:[
                {
                    type:'success',
                    name:'海水1型',
                    value:0,
                },
                {
                    type:'',
                    name:'海水2型',
                    value:1,
                },
                {
                    type:'warning',
                    name:'实验型',
                    value:2,
                },
            ],
            //对虾类型的tag
            shrimpTypeTag:[
                {
                    type:'info',
                    name:'未投放',
                    value:0,
                },
                {
                    type:'success',
                    name:'中国对虾',
                    value:1,
                },
                {
                    type:'success',
                    name:'斑节对虾',
                    value:2,
                },
                {
                    type:'success',
                    name:'日本对虾',
                    value:3,
                },
                {
                    type:'success',
                    name:'墨吉对虾',
                    value:4,
                },
                {
                    type:'success',
                    name:'长毛对虾',
                    value:5,
                }
            ],
            //投放状态的tag
            deliveryStatusTag:[
                {
                    type:'info',
                    name:'未投放',
                    value:0,
                },
                {
                    type:'',
                    name:'已投放',
                    value:1,
                },
            ],
            tagFlag:false,
            harvestDateByChange:'',
            rules: {//传入el-form ，表单验证规则
                pondName: [
                    { required: true, message: '请输入名称', trigger: ['blur','change'] },
                    { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: ['blur','change'] }
                ],
                baseById:[
                    {required:true,message: '请选择基地', trigger:'change'}
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
        let node = document.querySelectorAll('.asd div')[2];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取基地列表
        this.getBaseIdAndName()
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[2];
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
        //添加虾塘的图片上传
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
        //修改虾塘信息的图片上传
        handleAvatarSuccessII(res, file) {
            console.log(res,file)
            if(res?.code == 200){
                this.$message.success(res?.message);
                this.updateForm.pondPic =  res?.url[0];
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
            //获取创建者id
            let {_id} = JSON.parse(window.localStorage.getItem('user'));
            this.addForm.createById = _id;
        },
        //添加虾塘
        async addPond(form){
            //表单验证
            await this.$refs[form].validate(async (valid) => {
                //验证不通过
                if(!valid){ this.$noticeInfo('error','表单验证失败','请检查输入！',1500); return;}
                //验证通过
                if(String(this.addForm.harvestDate).length>0){
                    this.addForm.harvestDate = new Date(this.addForm.harvestDate).toLocaleString().split(" ")[0].split("/").join("-");
                }
                console.log(this.addForm)
                let token = window.localStorage.getItem('token');
                let [err,res] = await this.$awaitTo(this.$axios.post(`${this.$baseUrl}/shrimpPond/addPond`,{
                    params:{
                        pg:this.curPg,
                    },
                    data:{
                        createById:this.addForm.createById,//创建者id
                        baseById:this.addForm.baseById,//虾塘所属基地id
                        pondName:this.addForm.pondName,//虾塘名称
                        pondPic:this.imageUrl,//虾塘图片
                        pondType:this.addForm.pondType,//虾塘类型
                        pondVolume:this.addForm.pondVolume,//面积
                        depth:this.addForm.depth,//深度
                        species:this.addForm.species,//投放类型（虾种类）
                        inputNum:this.addForm.inputNum,//投放尾数
                        deliveryStatus:this.addForm.deliveryStatus,//投放状态 0-未投放 1-已投放
                        launchDate:this.addForm.launchDate,//投放时间
                        harvestDate:this.addForm.harvestDate,//捕获时间（预计）
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
            this.harvestDateByChange = this.updateForm.harvestDate;
            this.getTagFlag();
            this.dialogVisibleII = true;
            console.log(this.updateForm)
        },
        //修改基地信息
        async updatePondInfo(){
            if(this.harvestDateByChange instanceof Date){
                this.harvestDateByChange = new Date(this.harvestDateByChange).toLocaleString().split(" ")[0].split("/").join("-");
            }
            //验证通过
            let token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.put(`${this.$baseUrl}/shrimpPond/modify`,{
                data:{
                    id:this.updateForm._id,
                    pondName:this.updateForm.pondName,//虾塘名称
                    pondPic:this.updateForm.pondPic,//虾塘图片
                    pondType:this.updateForm.pondType,//虾塘类型
                    pondVolume:this.updateForm.pondVolume,//面积
                    depth:this.updateForm.depth,//深度
                    species:this.updateForm.species,//投放类型
                    inputNum:this.updateForm.inputNum,//投放尾数
                    deliveryStatus:this.updateForm.deliveryStatus,//投放状态
                    launchDate:this.updateForm.launchDate,//投放时间
                    harvestDate:this.harvestDateByChange,//捕获时间（预计）
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
                            this.updateForm.launchDate = this.updateForm.launchDate instanceof Date ? this.updateForm.launchDate.toLocaleString().split(" ")[0].split("/").join("-") : this.updateForm.launchDate;
                            this.updateForm.harvestDate = this.harvestDateByChange instanceof Date ? this.harvestDateByChange.toLocaleString().split(" ")[0].split("/").join("-") : this.harvestDateByChange;
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
            let [err,res] = await this.$awaitTo(this.$axios.delete(`${this.$baseUrl}/shrimpPond/deletePond`,{
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
        speciesSelctByAdd(){
            this.addForm.deliveryStatus = this.addForm.species ? 1 :0;
            if(this.addForm.species){
                if(this.addForm.launchDate.length ==0){
                    this.addForm.launchDate = new Date().toLocaleString().split(" ")[0].split("/").join("-");
                }
            }else{
                this.addForm.launchDate = ''
            }
        },
        //修改对话框获取tagFlag
        getTagFlag(){
            let newObj = JSON.parse(JSON.stringify(this.updateForm))
            this.tagFlag = Boolean(newObj.species)
        },
        //修改对话框选择对虾类型
        speciesSelctByChange(){
            this.updateForm.deliveryStatus = this.updateForm.species ? 1 :0;
            if(this.updateForm.species){
                if(this.updateForm.launchDate.length ==0){
                    this.updateForm.launchDate = new Date().toLocaleString().split(" ")[0].split("/").join("-");
                }
            }else{
                this.updateForm.launchDate = ''
            }
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
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/shrimpPond/pondPage`,{
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
        },
        //获取对应基地名称
        getBaseName(id){
            let sp = this.baseIdAndNameArr.filter(item=>{
                return item._id == id
            })
            return sp[0]?.baseName
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/tabelPage.scss';
    @import '@/scss/upImg.scss';
</style>