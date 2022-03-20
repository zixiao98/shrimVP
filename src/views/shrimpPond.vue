<template>
    <!-- 首页 -->
    <div id="shrimpPondPage">
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
                                    <el-table-column prop="pondName" label="虾塘名称" align="center" ></el-table-column>
                                    <el-table-column prop="pondType" label="虾塘类型" align="center" width="100"></el-table-column>
                                    <el-table-column prop="pondVolume" label="虾塘面积/m²" align="center" width="100"></el-table-column>
                                    <el-table-column prop="depth" label="虾塘深度/m" align="center" width="100"></el-table-column>
                                    <el-table-column prop="species" label="投放类型" align="center" width="100"></el-table-column>
                                    <el-table-column prop="inputNum" label="投放尾数" align="center" width="100"></el-table-column>
                                    <el-table-column prop="deliveryStatus" label="投放状态" align="center" width="100"></el-table-column>
                                    <el-table-column prop="launchDate" label="投放时间" align="center" width="150"></el-table-column>
                                    <el-table-column prop="harvestDate" label="捕获时间" align="center" width="150"></el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
                                        <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>
                                        <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                    :current-page="1"
                                    :page-size=5
                                    layout="total, sizes, prev, pager, next, jumper"
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
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
                <el-form-item label="虾塘名称">
                    <el-input v-model="ruleForm.pondName"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="虾塘类型">
                            <el-input v-model="ruleForm.pondType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="虾塘面积">
                            <el-input v-model="ruleForm.pondVolume"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="虾塘深度">
                            <el-input v-model="ruleForm.depth"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="投放类型">
                            <el-input v-model="ruleForm.species"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="投放尾数">
                            <el-input v-model="ruleForm.inputNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="投放状态">
                            <el-input v-model="ruleForm.deliveryStatus"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :span="12">
                        <el-form-item label="投放时间">
                            <el-date-picker v-model="ruleForm.launchDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="捕获时间">
                            <el-date-picker v-model="ruleForm.harvestDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                
               
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,
            optionValue:[
                {
                    name:'创建时间',
                    value:1,
                },
                {
                    name:'虾塘名称',
                    value:2,
                },
                {
                    name:'虾塘面积',
                    value:3,
                },
                {
                    name:'虾塘深度',
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
            ],
            searchInput:'',
            select:null,
            tableData: [
                {
                    createDate:'2016-05-02',//创建时间
                    pondName:'穗-一号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-二号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-三号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-四号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-五号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-六号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-七号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-八号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-九号塘',//虾塘名称
                    pondType:1,//虾塘类型
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
                    pondName:'穗-十号塘',//虾塘名称
                    pondType:1,//虾塘类型
                    pondVolume:'321',//面积
                    depth:'5',//深度
                    species:'中国对虾',//投放类型（虾种类）
                    inputNum:12312,//投放尾数
                    deliveryStatus:1,//投放状态 0-未投放 1-已投放
                    launchDate:'2016-08-02',//投放时间
                    harvestDate:'2016-08-02',//捕获时间（预计）
                },
            ],
            ruleForm: {
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
            },
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/shrimpPond.scss';
</style>