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
                                    <el-table-column prop="accNumber" label="登录账号" align="center" width="200"></el-table-column>
                                    <el-table-column label="登录状态" align="center" width="150">
                                        <template slot-scope="scope">
                                            <el-tag effect="dark" :type="tagType[scope.row.status].type">{{ tagType[scope.row.status].name }}</el-tag>
                                            <!-- {{scope.row.status ? '失败' :'成功'}} -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="region" label="登录地区" align="center" width="200"></el-table-column>
                                    <el-table-column prop="loginTime" label="登录时间" align="center"></el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
                                         <template slot-scope="scope">
                                            <el-button size="small" type="primary" icon="el-icon-view" @click="handleDetails(scope.row)">查看</el-button>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                                <el-pagination
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
                    <el-form-item label="id">
                        <el-input v-model="showForm._id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-input v-model="showForm.accNumber" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录地区">
                        <el-input v-model="showForm.region" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录时间">
                        <el-input v-model="showForm.loginTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="登录状态">
                        <el-input v-model="showForm.status" disabled></el-input>
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
            curPg:1,//当前页数
            curPgFreeze:1,//冻结页数
            pss:[10],//分页尺寸数组
            ps:10,//当前分页尺寸
            dialogVisible:false,//添加信息对话框
            dialogVisibleII:false,//修改信息对话框
            optionValue:[
                {
                    name:'登录状态',
                    value:'status',
                },
                {
                    name:'登录地区',
                    value:'region',
                },
                {
                    name:'登录时间',
                    value:'loginTime',
                },
            ],//查询条件数组
            select:null,//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [],//表格展示数据
            tableDatas:[],//搜索时暂存已经展示的数据
            tagType:[
                {
                    type:'success',
                    name:'成功',
                },
                {
                    type:'warning',
                    name:'失败',
                },
            ],//登录记录tag
            count:0,//数据条数
            showForm: {},//查看数据
        }
    },
    components:{
        LineII,
        PolarGraphII,
    },
    created(){
        this.initData()
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
        //初始化数据
        async initData(){
            //即获取第一页数据
            this.getDataByPage(1)
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
            //通过查询
            this.getDataByPageOptions(1)
            // this.tableDatas = JSON.parse(JSON.stringify(this.tableData));
            // this.tableData=this.tableData.filter(item=>{
            //     return String(item[this.select]).includes(this.searchInput)
            // })
            // this.count = this.tableData;
            // this.curPg = 1;
            // if(this.tableData.length){
            //     this.$message({
            //         type: 'success',
            //         message: '查找成功!'
            //     });
            // }else{
            //     this.$message({
            //         message: '无匹配数据!'
            //     });
            // }
            
        },
        lookBack(){
            // this.tableData = JSON.parse(JSON.stringify(this.tableDatas));
            this.getDataByPage(this.curPgFreeze)
            this.curPg = Number(this.curPgFreeze);
            this.select ='';
            this.searchInput='';
        },
        //显示详情
        handleDetails(row){
            this.showForm = row;
            this.showForm.status =  this.showForm.status ? '失败' : '成功';
            this.dialogVisible = true;
        },
        //分页变化
        async pageChange(pg){
            this.curPgFreeze = pg
            console.log(pg,this.curPgFreeze)
            this.getDataByPage(pg)
        },
        //分页查询
        async getDataByPage(pg){
            const token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/loginrecord/page`,{
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
                    item.loginTime = new Date(item.loginTime).toLocaleString();
                }
                this.count = res.data.count;
                this.$message({
                    type: 'success',
                    message:'获取数据成功！',
                    duration:2800
                })
            }
            if(err){
                this.$noticeInfo('error','失败','获取数据失败！！',3000)
            }
        },
        //条件分页查询
        async getDataByPageOptions(pg){
            console.log(this.select,this.searchInput)
            let that = this;
            const token = window.localStorage.getItem('token');
            let [err,res] = await this.$awaitTo(this.$axios.get(`${this.$baseUrl}/user/loginrecord/pageOptions`,{
                params: {
                    pg: pg,
                    [that.select]:that.searchInput,
                },
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            }))
            if(res?.status === 200){
                this.tableData = res.data.data;
                for (const item of this.tableData) {
                    item.loginTime = new Date(item.loginTime).toLocaleString();
                }
                this.count = res.data.count;
                this.$message({
                    type: 'success',
                    message:'获取数据成功！',
                    duration:2800
                })
            }
            if(err){
                this.$noticeInfo('error','失败','获取数据失败！！',3000)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
    @import '@/scss/loginrecord.scss'
</style>