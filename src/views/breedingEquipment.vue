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
                                    <el-table-column prop="bEName" label="设备名称" align="center"  width="260"></el-table-column>
                                    <el-table-column prop="bEType" label="设备类型" align="center" width="100"></el-table-column>
                                    <el-table-column label="设备状态" align="center" width="100">
                                         <template slot-scope="scope">
                                           <el-tag effect="dark" :type="bEStatusTag[scope.row.bEStatus].type">{{ bEStatusTag[scope.row.bEStatus].value }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="bEPrice" label="设备金额" align="center" width="100"></el-table-column>
                                    <el-table-column prop="bEBuyBy" label="购买设备人员" align="center"  width="160"></el-table-column>
                                    <el-table-column prop="bERepairTimes" label="修理次数" align="center" width="100"></el-table-column>
                                    <el-table-column prop="bEforBaseName" label="所属基地" align="center" ></el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
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
            title="添加设备"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="addForm" ref="addForm" label-width="150px">
                    <el-form-item label="设备名称">
                        <el-input v-model="addForm.bEName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型">
                        <el-input v-model="addForm.bEType"></el-input>
                    </el-form-item>
                    <el-form-item label="设备金额">
                        <el-input v-model="addForm.bEPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="购买设备人员">
                        <el-input v-model="addForm.bEBuyBy"></el-input>
                    </el-form-item>
                    <el-form-item label="所属基地">
                        <el-input v-model="addForm.bEforBaseName"></el-input>
                    </el-form-item>
                    <el-form-item>
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
            title="修改设备信息"
            :visible.sync="dialogVisibleII"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" label-width="150px">
                    <el-form-item label="设备名称">
                        <el-input v-model="updateForm.bEName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型">
                        <el-input v-model="updateForm.bEType"></el-input>
                    </el-form-item>
                    <el-form-item label="设备金额">
                        <el-input v-model="updateForm.bEPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="购买设备人员">
                        <el-input v-model="updateForm.bEBuyBy"></el-input>
                    </el-form-item>
                    <el-form-item label="设备状态">
                        <!-- <el-input v-model="updateForm.bEStatus"></el-input> -->
                        <el-select v-model="updateForm.bEStatus">
                            <el-option v-for="item in bEStatusTag" :key="item.data" :label="item.value" :value="item.data"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="修理次数">
                        <el-input v-model="updateForm.bERepairTimes"></el-input>
                    </el-form-item>
                    <el-form-item label="所属基地">
                        <el-input v-model="updateForm.bEforBaseName"></el-input>
                    </el-form-item>
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
                    name:'添加时间',
                    value:'createDate',
                },
                {
                    name:'设备名称',
                    value:'bEName',
                },
                {
                    name:'设备类型',
                    value:'bEType',
                },
                {
                    name:'设备状态',
                    value:'bEStatus',
                },
                {
                    name:'修理次数',
                    value:'bERepairTimes',
                },
                {
                    name:'设备金额',
                    value:'bEPrice',
                },
                {
                    name:'购买设备人员',
                    value:'bEBuyBy',
                },
                {
                    name:'所属基地',
                    value:'bEforBaseName',
                }
            ],//查询条件数组
            select:'',//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [
                {
                    id:'128',//设备id
                    createDate:'2022/03/15 21:08:11',//添加时间
                    bEName:'12测试',//设备名称
                    bEType:'精密型',//设备类型
                    bEPrice:4123,//设备金额
                    bEBuyBy:'王五',//购买设备人员
                    bEStatus:0,//设备状态
                    bERepairTimes:0,//设备修理次数
                    bEforBaseId:0,//设备所属基地id
                    bEforBaseName:'12312',//设备所属基地名称
                },
                {
                    id:'127',//设备id
                    createDate:'2022/03/15 22:21:13',//添加时间
                    bEName:'测试测试',//设备名称
                    bEType:'精密型',//设备类型
                    bEPrice:1355,//设备金额
                    bEBuyBy:'果园',//购买设备人员
                    bEStatus:1,//设备状态
                    bERepairTimes:1,//设备修理次数
                    bEforBaseId:0,//设备所属基地id
                    bEforBaseName:'12314122',//设备所属基地名称
                },
                {
                    id:'126',//设备id
                    createDate:'2022/03/14 20:27:31',//添加时间
                    bEName:'测试1231',//设备名称
                    bEType:'精密型',//设备类型
                    bEPrice:7561,//设备金额
                    bEBuyBy:'假果园',//购买设备人员
                    bEStatus:2,//设备状态
                    bERepairTimes:4,//设备修理次数
                    bEforBaseId:0,//设备所属基地id
                    bEforBaseName:'12测试312',//设备所属基地名称
                },
                {
                    id:'125',//设备id
                    createDate:'2022/03/13 20:31:21',//添加时间
                    bEName:'123测试123',//设备名称
                    bEType:'精密型',//设备类型
                    bEPrice:6531,//设备金额
                    bEBuyBy:'张五',//购买设备人员
                    bEStatus:2,//设备状态
                    bERepairTimes:0,//设备修理次数
                    bEforBaseId:0,//设备所属基地id
                    bEforBaseName:'12421312',//设备所属基地名称
                },
                {
                    id:'124',//设备id
                    createDate:'2022/03/13 20:30:31',//添加时间
                    bEName:'1测试23123',//设备名称
                    bEType:'精密型',//设备类型
                    bEPrice:4122,//设备金额
                    bEBuyBy:'梁二',//购买设备人员
                    bEStatus:0,//设备状态
                    bERepairTimes:6,//设备修理次数
                    bEforBaseId:0,//设备所属基地id
                    bEforBaseName:'1122312',//设备所属基地名称
                },
                {
                    id:'123',//设备id
                    createDate:'2022/03/13 20:29:21',//添加时间
                    bEName:'123123测试',//设备名称
                    bEType:'精密型',//设备类型
                    bEPrice:2312,//设备金额
                    bEBuyBy:'张三',//购买设备人员
                    bEStatus:0,//设备状态
                    bERepairTimes:0,//设备修理次数
                    bEforBaseId:0,//设备所属基地id
                    bEforBaseName:'121测试312',//设备所属基地名称
                },
                
            ],//表格展示数据
            addForm: {
                id:'',//设备id
                createDate:'',//添加时间
                bEName:'',//设备名称
                bEType:1,//设备类型
                bEPrice:0,//设备金额
                bEBuyBy:'',//购买设备人员
                bEStatus:0,//设备状态
                bERepairTimes:0,//设备修理次数
                bEforBaseId:0,//设备所属基地id
                bEforBaseName:'',//设备所属基地名称
            },//添加信息数据
            updateForm:{
                id:'',//设备id
                createDate:'',//添加时间
                bEName:'',//设备名称
                bEType:1,//设备类型
                bEPrice:0,//设备金额
                bEBuyBy:'',//购买设备人员
                bEStatus:0,//设备状态
                bERepairTimes:0,//设备修理次数
                bEforBaseId:0,//设备所属基地id
                bEforBaseName:'',//设备所属基地名称
            },//修改信息数据
            //设备状态
            bEStatusTag:[
                {
                    type:'success',
                    value:'正常',
                    data:0,
                },
                {
                    type:'warning',
                    value:'异常',
                    data:1,
                },
                {
                    type:'danger',
                    value:'故障',
                    data:2,
                },
                {
                    type:'info',
                    value:'维修中',
                    data:3,
                },
            ]
        }
    },
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[3];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        // this.userName = window.localStorage.getItem('userName');
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/tabelPage.scss';
</style>