<template>
    <!-- 首页 -->
    <div id="homepage">
        <div class="page-box">
            <div class="left">
                <div class="leftTop">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Test></Test>
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Pie></Pie>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="centerC">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Cmap></Cmap>
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
                        <Lines></Lines>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="box">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                        <span class="four"></span>
                        <Radar></Radar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Test from '@/components/test.vue'
import Cmap from '@/components/Cmap.vue'
import Pie from '@/components/pie.vue'
import Lines from '@/components/line.vue'//不能用Line,会报错：Do not use built-in or reserved HTML elements as component id: Line
import Radar from '@/components/radar.vue'
export default {
    data(){
        return {
            
        }
    },
    components:{
        Test,
        Cmap,
        Pie,
        Lines,
        Radar,
    },
    name: "homepage",
    //生命周期函数
    mounted(){
        //让侧边栏功能固化hover的效果
        let node = document.querySelectorAll('.asd div')[0];
        node.style.color = '#fff';
        node.style.backgroundColor = '#303133';
        //获取user
        // this.userName = window.localStorage.getItem('userName');
    },
    beforeDestroy(){
        //让侧边栏功能'取消'固化hover的效果
        try {
            let node = document.querySelectorAll('.asd div')[0];
            node.style.color = '';
            node.style.backgroundColor = '';
        } catch (error) {
            //console.log(err)
            //在退出登录时候，此处有一个报错
        }
        
    }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/homepage.scss';
</style>