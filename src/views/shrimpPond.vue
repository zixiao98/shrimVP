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
                                        <i class="el-icon-search" @click.stop="lookUp"></i>
                                        <i class="el-icon-refresh-left" @click.stop="lookBack"></i>
                                    </div>
                                </div>
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="createDate" label="创建日期" align="center" width="150"></el-table-column>
                                    <el-table-column prop="pondName" label="虾塘名称" align="center" ></el-table-column>
                                    <el-table-column prop="pondType" label="虾塘类型" align="center" width="100"></el-table-column>
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
                                    <el-table-column prop="pondforBaseName" label="所属基地" align="center"></el-table-column>
                                    <el-table-column label="操作" width="200" align="center">
                                         <template slot-scope="scope">
                                            <el-button size="small" type="primary" icon="el-icon-edit" @click="handleClick(scope.row)">编辑</el-button>
                                            <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                                <el-pagination
                                    :current-page="1"
                                    :page-sizes="pss"
                                    :page-size="ps"
                                    layout="sizes,total, prev, pager, next, jumper"
                                    :total="tableData.length"
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
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="addForm" ref="addForm" label-width="100px">
                <el-form-item label="虾塘名称">
                    <el-input v-model="addForm.pondName"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="虾塘类型">
                            <el-input v-model="addForm.pondType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="虾塘面积">
                            <el-input v-model="addForm.pondVolume"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="虾塘深度">
                            <el-input v-model="addForm.depth"></el-input>
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
                            <el-input v-model="addForm.inputNum"></el-input>
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
                <el-form-item label="所属基地">
                    <el-input v-model="addForm.pondforBaseName"></el-input>
                </el-form-item>
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
                <el-form-item>
                    <!-- <el-button type="primary" >立即创建</el-button> -->
                    <!-- <el-button @click="resetForm('addForm')">重置</el-button> -->
                </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="修改虾塘信息"
            :visible.sync="dialogVisibleII"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" label-width="100px">
                <el-form-item label="虾塘名称">
                    <el-input v-model="updateForm.pondName"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="虾塘类型">
                            <el-input v-model="updateForm.pondType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="虾塘面积">
                            <el-input v-model="updateForm.pondVolume"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="虾塘深度">
                            <el-input v-model="updateForm.depth"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="投放类型">
                            <!-- <el-input v-model="updateForm.species"></el-input> -->
                            <el-select v-model="updateForm.species" :disabled="tagFlag" @change="speciesSelctByChange">
                                <el-option v-for="item in shrimpTypeTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="投放尾数">
                            <el-input v-model="updateForm.inputNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="投放状态">
                            <!-- <el-input v-model="updateForm.deliveryStatus"></el-input> -->
                            <el-select v-model="updateForm.deliveryStatus" disabled>
                                <el-option v-for="item in deliveryStatusTag" :key="item.value" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-form-item label="所属基地">
                    <el-input v-model="updateForm.pondforBaseName"></el-input>
                </el-form-item>
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
                <el-form-item>
                    <!-- <el-button @click="resetForm('addForm')">重置</el-button> -->
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
            pss:[10],//分页尺寸数组
            ps:10,//当前分页尺寸
            dialogVisible:false,//添加信息对话框
            dialogVisibleII:false,//修改信息对话框
            optionValue:[
                {
                    name:'创建时间',
                    value:'createDate',
                },
                {
                    name:'虾塘名称',
                    value:'pondName',
                },
                {
                    name:'虾塘面积',
                    value:'pondVolume',
                },
                {
                    name:'虾塘深度',
                    value:'depth',
                },
                {
                    name:'投放尾数',
                    value:'inputNum',
                },
                {
                    name:'投放时间',
                    value:'launchDate',
                },
                {
                    name:'捕获时间',
                    value:'harvestDate',
                },
                {
                    name:'所属基地',
                    value:'pondforBaseName',
                },
            ],//查询条件数组
            select:'',//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [
                {
                    id:'127',//虾塘id
                    createDate:'2022/03/21 19:23:43',//创建时间
                    pondName:'测试测试测试',//虾塘名称
                    pondType:1,//虾塘类型
                    pondVolume:97,//面积
                    depth:4.5,//深度
                    species:1,//投放类型（虾种类）
                    inputNum:9252,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2022-03-24',//投放时间
                    harvestDate:'2022-07-24',//捕获时间（预计）
                    pondforBaseId:3,//虾塘所属基地id
                    pondforBaseName:'测试11测试1121',//虾塘所属基地名称
                },
                {
                    id:'126',//虾塘id
                    createDate:'2022/03/21 19:23:43',//创建时间
                    pondName:'测试测试测试',//虾塘名称
                    pondType:1,//虾塘类型
                    pondVolume:93,//面积
                    depth:3.5,//深度
                    species:0,//投放类型（虾种类）
                    inputNum:0,//投放尾数
                    deliveryStatus:0,//投放状态 0-未投放 1-已投放
                    launchDate:'',//投放时间
                    harvestDate:'',//捕获时间（预计）
                    pondforBaseId:0,//虾塘所属基地id
                    pondforBaseName:'测试测试1121',//虾塘所属基地名称
                },
                {
                    id:'125',//虾塘id
                    createDate:'2022/03/15 21:19:19',//创建时间
                    pondName:'123测试123',//虾塘名称
                    pondType:1,//虾塘类型
                    pondVolume:133,//面积
                    depth:5,//深度
                    species:3,//投放类型（虾种类）
                    inputNum:13214,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2022-03-21',//投放时间
                    harvestDate:'2022-07-18',//捕获时间（预计）
                    pondforBaseId:1,//虾塘所属基地id
                    pondforBaseName:'测试测试',//虾塘所属基地名称
                },
                {
                    id:'124',//虾塘id
                    createDate:'2022/03/15 21:13:23',//创建时间
                    pondName:'测试11123',//虾塘名称
                    pondType:1,//虾塘类型
                    pondVolume:87,//面积
                    depth:4,//深度
                    species:0,//投放类型（虾种类）
                    inputNum:0,//投放尾数
                    deliveryStatus:0,//投放状态 0-未投放 1-已投放
                    launchDate:'',//投放时间
                    harvestDate:'',//捕获时间（预计）
                    pondforBaseId:4,//虾塘所属基地id
                    pondforBaseName:'测试测试123',//虾塘所属基地名称
                },
                {
                    id:'123',//虾塘id
                    createDate:'2022/03/15 21:12:33',//创建时间
                    pondName:'测试123',//虾塘名称
                    pondType:1,//虾塘类型
                    pondVolume:123,//面积
                    depth:5,//深度
                    species:1,//投放类型（虾种类）
                    inputNum:123131,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2022-03-18',//投放时间
                    harvestDate:'2022-06-15',//捕获时间（预计）
                    pondforBaseId:3,//虾塘所属基地id
                    pondforBaseName:'测试测试',//虾塘所属基地名称
                },
                
            ],//表格展示数据
            addForm: {
                id:'',//虾塘id
                createDate:'',//创建时间
                pondName:'',//虾塘名称
                pondType:1,//虾塘类型
                pondVolume:0,//面积
                depth:0,//深度
                species:0,//投放类型（虾种类）
                inputNum:0,//投放尾数
                deliveryStatus:0,//投放状态 0-未投放 1-已投放
                launchDate:'',//投放时间
                harvestDate:'',//捕获时间（预计）
                pondforBaseId:0,//虾塘所属基地id
                pondforBaseName:'',//虾塘所属基地名称
            },//添加信息数据
            updateForm:{
                id:'',//虾塘id
                createDate:'',//创建时间
                pondName:'',//虾塘名称
                pondType:1,//虾塘类型
                pondVolume:0,//面积
                depth:0,//深度
                species:1,//投放类型（虾种类）
                inputNum:0,//投放尾数
                deliveryStatus:0,//投放状态 0-未投放 1-已投放
                launchDate:'',//投放时间
                harvestDate:'',//捕获时间（预计）
                bEforBaseId:0,//虾塘所属基地id
                bEforBaseName:'',//虾塘所属基地名称
            },//修改信息数据
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
            //投放状态地tag
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
        }
    },
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[2];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        // this.userName = window.localStorage.getItem('userName');
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
        },
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
            this.harvestDateByChange = this.updateForm.harvestDate;
            this.getTagFlag();
        },
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
        handleDelete(row){
             this.$confirm('是否删除该组数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                            //删除
                            this.tableData = this.tableData.filter((item)=>item.id !== row.id)
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/tabelPage.scss';
</style>