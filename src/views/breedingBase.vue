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
                                    <el-table-column prop="createDate" label="创建日期" align="center" width="200"></el-table-column>
                                    <el-table-column prop="baseName" label="基地名称" align="center" width="200"></el-table-column>
                                    <el-table-column prop="hasPond" label="拥有虾塘数量" align="center" width="120"></el-table-column>
                                    <el-table-column prop="hasBE" label="拥有设备数量" align="center" width="120"></el-table-column>
                                    <el-table-column prop="baseRegion" label="基地地区" align="center" width="160"></el-table-column>
                                    <el-table-column prop="baseAddr" label="基地详细地址" align="center"></el-table-column>
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
            title="添加基地"
            :visible.sync="dialogVisible"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="addForm" ref="addForm" label-width="100px">
                    <el-form-item label="基地名称">
                        <el-input v-model="addForm.baseName"></el-input>
                    </el-form-item>
                    <el-form-item label="基地地区">
                        <!-- <el-input v-model="addForm.baseRegion"></el-input> -->
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="基地详细地址">
                        <el-input v-model="addForm.baseAddr"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="resetForm('addForm')">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="修改基地信息"
            :visible.sync="dialogVisibleII"
            width="50%"
            >
            <div class="dialogDiv">
                <el-form :model="updateForm" ref="updateForm" label-width="100px">
                    <el-form-item label="基地名称">
                        <el-input v-model="updateForm.baseName"></el-input>
                    </el-form-item>
                    <el-form-item label="基地地区">
                        <!-- <el-input v-model="updateForm.baseRegion"></el-input> -->
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="selectedOptionsChange"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="基地详细地址">
                        <el-input v-model="updateForm.baseAddr"></el-input>
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
import { regionData,CodeToText,TextToCode  } from 'element-china-area-data';
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
                    name:'基地名称',
                    value:'baseName',
                },
                {
                    name:'基地地区',
                    value:'baseRegion',
                },
                {
                    name:'基地详细地址',
                    value:'baseAddr',
                },
                {
                    name:'拥有虾塘数量',
                    value:'hasPond',
                },
                {
                    name:'拥有设备数量',
                    value:'hasBE',
                },
            ],//查询条件数组
            select:'',//选中的查询条件
            searchInput:'',//搜索关键词
            tableData: [
                 {
                    id:'127',//基地id
                    createDate:'2022/03/15 09:37:53',//创建时间
                    baseName:'粤-五号基地',//基地名称
                    basePic:'',//基地图片
                    baseRegion:'广东/广州',//基地地区
                    baseAddr:'海珠区仲恺路500号12312',//基地详细地址
                    hasPond:0,//拥有虾塘数量
                    hasBE:0,//拥有设备数量
                },
                {
                    id:'126',//基地id
                    createDate:'2022/03/13 20:27:31',//创建时间
                    baseName:'粤-四号基地',//基地名称
                    basePic:'',//基地图片
                    baseRegion:'广东/广州',//基地地区
                    baseAddr:'海珠区仲恺路500号122',//基地详细地址
                    hasPond:0,//拥有虾塘数量
                    hasBE:0,//拥有设备数量
                },
                {
                    id:'125',//基地id
                    createDate:'2022/03/12 14:37:33',//创建时间
                    baseName:'粤-三号基地',//基地名称
                    basePic:'',//基地图片
                    baseRegion:'广东/广州',//基地地区
                    baseAddr:'海珠区仲恺路500号33123',//基地详细地址
                    hasPond:0,//拥有虾塘数量
                    hasBE:0,//拥有设备数量
                },
                {
                    id:'124',//基地id
                    createDate:'2022/03/11 13:17:46',//创建时间
                    baseName:'粤-二号基地',//基地名称
                    basePic:'',//基地图片
                    baseRegion:'广东/广州',//基地地区
                    baseAddr:'海珠区仲恺路500号123123',//基地详细地址
                    hasPond:0,//拥有虾塘数量
                    hasBE:0,//拥有设备数量
                },
                {
                    id:'123',//基地id
                    createDate:'2022/03/11 13:15:46',//创建时间
                    baseName:'粤-一号基地',//基地名称
                    basePic:'',//基地图片
                    baseRegion:'广东/广州',//基地地区
                    baseAddr:'海珠区仲恺路500号',//基地详细地址
                    hasPond:0,//拥有虾塘数量
                    hasBE:0,//拥有设备数量
                },
                
            ],//表格展示数据
            addForm: {
                id:'',//基地id
                createDate:'',//创建时间
                baseName:'',//基地名称
                basePic:'',//基地图片
                baseRegion:'',//基地地区
                baseAddr:'',//基地详细地址
                hasPond:0,//拥有虾塘数量
                hasBE:0,//拥有设备数量
            },//添加信息数据
            updateForm:{
                id:'',//基地id
                createDate:'',//创建时间
                baseName:'',//基地名称
                basePic:'',//基地图片
                baseRegion:'',//基地地区
                baseAddr:'',//基地详细地址
                hasPond:0,//拥有虾塘数量
                hasBE:0,//拥有设备数量
            },//修改信息数据
            tableDatas:[],
            //省市区联动
            options: regionData,
            selectedOptions: [],
            selectedOptionsChange:['130000', '130400', '130404'],
        }
    },
    //生命周期函数
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
        //省市区联动
        handleChange () {
            console.log(this.selectedOptions);
            let s = this.selectedOptions;
            this.addForm.baseRegion = `${CodeToText[s[0]]}/${CodeToText[s[1]]}/${CodeToText[s[2]]}`
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
            console.log(TextToCode)
            let s = this.updateForm.baseRegion.split('/');
            this.selectedOptionsChange = [TextToCode[s[0]].code,TextToCode[s[0]][s[1]].code,TextToCode[s[0]][s[1]][s[2]].code]
            console.log(this.selectedOptionsChange)
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/tabelPage.scss';
</style>