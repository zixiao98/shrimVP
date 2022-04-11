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
                                    <div class="search">
                                        <el-select v-model="select" slot="prepend" placeholder="请选择查询依据" @change='this.SelectClick'>
                                            <el-option v-for="item in optionValue" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                        </el-select>
                                        <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select"></el-input>
                                        <i class="el-icon-search" @click.stop="lookUp"></i>
                                        <i class="el-icon-refresh-left" @click.stop="lookBack"></i>
                                    </div>
                                </div>
                                <el-table :data="tableData" style="width: 100%">
                                    <el-table-column prop="loginId" label="登录账号" align="center" width="200"></el-table-column>
                                    <el-table-column label="登录状态" align="center" width="150">
                                        <template slot-scope="scope">
                                            {{scope.row.loginStatus ? '成功' :'失败'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="loginRegion" label="登录地区" align="center" width="200"></el-table-column>
                                    <el-table-column prop="createDate" label="登录时间" align="center"></el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
                                         <template slot-scope="scope">
                                            <el-button size="small" type="primary" icon="el-icon-view" @click="handleDetails(scope.row)">查看</el-button>
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
            <div class="right">
                <div class="rightTop">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <LineII></LineII>
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
         <el-dialog
            title="修改基地信息"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="showForm" ref="showForm" label-width="100px">
                    <el-form-item label="登录账号">
                        <el-input v-model="showForm.loginId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录地区">
                        <el-input v-model="showForm.loginRegion" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录时间">
                        <el-input v-model="showForm.createDate" disabled></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="resetForm('addForm')">重置</el-button> -->
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
import LineII from '../components/loginrecord/lineII.vue'
import PolarGraphII from '../components/loginrecord/polarGraphII.vue'
export default {
    data(){
        return {
            pss:[10],//分页尺寸数组
            ps:10,//当前分页尺寸
            dialogVisible:false,//添加信息对话框
            dialogVisibleII:false,//修改信息对话框
            optionValue:[
                {
                    name:'登录账号',
                    value:'loginId',
                },
                {
                    name:'登录地区',
                    value:'loginRegion',
                },
                {
                    name:'登录时间',
                    value:'createDate',
                },
            ],//查询条件数组
            select:null,//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [
                {
                    id:'129',//登录记录id
                    createDate:'2022/03/11 01:16:12',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'128',//登录记录id
                    createDate:'2022/04/10 19:22:35',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'127',//登录记录id
                    createDate:'2022/03/26 22:31:14',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'126',//登录记录id
                    createDate:'2022/03/25 21:46:38',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'125',//登录记录id
                    createDate:'2022/03/24 16:31:14',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'125',//登录记录id
                    createDate:'2022/03/22 20:19:25',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'124',//登录记录id
                    createDate:'2022/03/17 16:16:23',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
                {
                    id:'123',//登录记录id
                    createDate:'2022/03/16 21:12:33',//登录时间
                    loginId:'2568624492@qq.com',//登录账号
                    loginStatus:1,//登录状态
                    loginRegion:'广东广州',//登录地区
                },
            ],//表格展示数据
            addForm: {
                id:'',//登录记录id
                createDate:'',//登录时间
                loginId:'',//登录账号
                loginStatus:1,//登录状态
                loginRegion:0,//登录地区
            },
            showForm: {
                id:'',//登录记录id
                createDate:'',//登录时间
                loginId:'',//登录账号
                loginStatus:1,//登录状态
                loginRegion:0,//登录地区
            },
        }
    },
    components:{
        LineII,
        PolarGraphII,
    },
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[7];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[7];
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
        handleDetails(row){
            this.showForm = row;
            this.dialogVisible = true;
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    @import '@/scss/loginrecord.scss'
</style>