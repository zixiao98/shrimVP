<template>
    <div id="homepage" ref="homepage">
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
                                        <el-select v-model="select" slot="prepend" placeholder="请选择查询依据">
                                            <el-option v-for="item in optionValue" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                        </el-select>
                                        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select"></el-input>
                                        <i class="el-icon-search"></i>
                                    </div>
                                </div>
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="createDate" label="创建日期" align="center" width="150"></el-table-column>
                                    <el-table-column prop="inputNum" label="投放尾数" align="center" width="100"></el-table-column>
                                    <el-table-column prop="deliveryStatus" label="投放状态" align="center" width="100"></el-table-column>
                                    <el-table-column prop="launchDate" label="投放时间" align="center" width="150"></el-table-column>
                                    <el-table-column prop="harvestDate" label="捕获时间" align="center" width="150"></el-table-column>
                                    <el-table-column label="操作" width="230" align="center" fixed="right">
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
                                    :total="123"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="rightTop">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <PolarGraphII></PolarGraphII>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import PolarGraphII from '../components/loginrecord/polarGraphII.vue'
export default {
    data(){
        return {
            pss:[5,10],//分页尺寸数组
            ps:10,//当前分页尺寸
            dialogVisible:false,//添加信息对话框
            dialogVisibleII:false,//修改信息对话框
            optionValue:[
                {
                    name:'创建时间',
                    value:1,
                },
                {
                    name:'基地名称',
                    value:2,
                },
                {
                    name:'基地面积',
                    value:3,
                },
                {
                    name:'基地深度',
                    value:4,
                },
                {
                    name:'投放尾数',
                    value:5,
                },
                {
                    name:'投放时间',
                    value:6,
                },
                {
                    name:'捕获时间',
                    value:7,
                }
            ],//查询条件数组
            select:null,//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [
                {
                    createDate:'2016-05-02',//创建时间
                    pondName:'穗-一号塘',//基地名称
                    pondType:1,//基地类型
                    pondVolume:'321',//面积
                    depth:'5',//深度
                    species:'中国对虾',//投放类型（虾种类）
                    inputNum:12312,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2016-08-02',//投放时间
                    harvestDate:'2016-08-02',//捕获时间（预计）
                },
                {
                    createDate:'2016-05-02',//创建时间
                    pondName:'穗-二号塘',//基地名称
                    pondType:1,//基地类型
                    pondVolume:'321',//面积
                    depth:'5',//深度
                    species:'中国对虾',//投放类型（虾种类）
                    inputNum:12312,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2016-08-02',//投放时间
                    harvestDate:'2016-08-02',//捕获时间（预计）
                },
                {
                    createDate:'2016-05-02',//创建时间
                    pondName:'穗-三号塘',//基地名称
                    pondType:1,//基地类型
                    pondVolume:'321',//面积
                    depth:'5',//深度
                    species:'中国对虾',//投放类型（虾种类）
                    inputNum:12312,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2016-08-02',//投放时间
                    harvestDate:'2016-08-02',//捕获时间（预计）
                },
                {
                    createDate:'2016-05-02',//创建时间
                    pondName:'穗-四号塘',//基地名称
                    pondType:1,//基地类型
                    pondVolume:'321',//面积
                    depth:'5',//深度
                    species:'中国对虾',//投放类型（虾种类）
                    inputNum:12312,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2016-08-02',//投放时间
                    harvestDate:'2016-08-02',//捕获时间（预计）
                },
                {
                    createDate:'2016-05-02',//创建时间
                    pondName:'穗-五号塘',//基地名称
                    pondType:1,//基地类型
                    pondVolume:'321',//面积
                    depth:'5',//深度
                    species:'中国对虾',//投放类型（虾种类）
                    inputNum:12312,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2016-08-02',//投放时间
                    harvestDate:'2016-08-02',//捕获时间（预计）
                },
                
            ],//表格展示数据
            addForm: {
                createDate:'',//创建时间
                pondName:'',//基地名称
                pondType:1,//基地类型
                pondVolume:0,//面积
                depth:0,//深度
                species:1,//投放类型（虾种类）
                inputNum:0,//投放尾数
                deliveryStatus:0,//投放状态 0-未投放 1-已投放
                launchDate:'',//投放时间
                harvestDate:'',//捕获时间（预计）
            },//添加信息数据
            updateForm:{
                createDate:'',//创建时间
                pondName:'',//基地名称
                pondType:1,//基地类型
                pondVolume:0,//面积
                depth:0,//深度
                species:1,//投放类型（虾种类）
                inputNum:0,//投放尾数
                deliveryStatus:0,//投放状态 0-未投放 1-已投放
                launchDate:'',//投放时间
                harvestDate:'',//捕获时间（预计）
            },//修改信息数据
        }
    },
    components:{
        PolarGraphII,
    },
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[8];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[8];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
    },
    methods:{
        // 跳转到添加页面
        addContent(){
            this.dialogVisible = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(row){
            this.updateForm = row;
            this.dialogVisibleII = true;
        },
        handleDelete(row){
            console.log(row)
             this.$confirm('是否删除该组数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
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
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    @import '@/scss/loginrecord.scss'
</style>